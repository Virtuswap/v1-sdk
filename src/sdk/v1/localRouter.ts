import { ethers } from 'ethers';

import { DirectedPair } from '../../router/internal/directedPair';
import {
    DirectCandidate,
    ReserveCandidate,
    SwapCandidate,
    TriangularCandidate,
} from '../../router/internal/swapCandidates';

import { Route, RouteMetrics, SwapOptions, SwapType } from '../../router';

import {
    Chain,
    chainInfo,
    Pair,
    PairReserve,
    Token,
    TokenWithBalance,
} from '../../entities';
import { getBlockNumber, getBlockTimestamp, getPairsWithTokens } from './dal';
import _ from 'lodash';
import { optimize } from './optimizer';
import { BigIntMath } from './utils/BigIntMath';
import { FConstants, FMaximums } from './types';
import { MAX_UINT256 } from './constants';

export class LocalRouter {
    swapOptions: SwapOptions;

    constructor(swapOptions?: Partial<SwapOptions>) {
        this.swapOptions = {
            isExactInput: swapOptions?.isExactInput ?? true,
            slippage: swapOptions?.slippage ?? 1000,
            timeoutMs: swapOptions?.timeoutMs ?? 500,
            calculateMetrics: swapOptions?.calculateMetrics ?? false,
        };
    }

    private static getTokenInfoFromCache(
        pairsCache: Array<Pair>,
        chain: Chain,
        tokenAddress: string
    ): Token {
        const tmpToken = new Token(chain, tokenAddress, 18);
        const erc20TokenAddress = tmpToken.isErc20
            ? tmpToken.address
            : chainInfo[chain].weth9Address;
        const pairWithToken = pairsCache.find(
            (pair) =>
                pair.token0.address === erc20TokenAddress ||
                pair.token1.address === erc20TokenAddress
        );
        let cachedToken: Token;
        if (pairWithToken) {
            cachedToken =
                pairWithToken.token0.address === erc20TokenAddress
                    ? pairWithToken.token0
                    : pairWithToken.token1;
        } else {
            const pairWithTokenReserve = pairsCache.find((pair) =>
                pair.reserves.some(
                    (reserves) =>
                        reserves.reserveToken.address === erc20TokenAddress
                )
            );
            if (!pairWithTokenReserve)
                throw new Error(
                    'Cannot find token with address ' + tmpToken.address
                );
            cachedToken = pairWithTokenReserve.reserves.find(
                (reserves) =>
                    reserves.reserveToken.address === erc20TokenAddress
            )!.reserveToken;
        }

        return new Token(chain, tmpToken.address, cachedToken.decimals);
    }

    async getRoute(
        _tokenIn: string | Token,
        _tokenOut: string | Token,
        amount: ethers.BigNumberish,
        chain: Chain,
        swapOptions?: Partial<SwapOptions>
    ): Promise<Route> {
        const tokenInAddress =
            typeof _tokenIn === 'string' ? _tokenIn : _tokenIn.address;
        const tokenOutAddress =
            typeof _tokenOut === 'string' ? _tokenOut : _tokenOut.address;
        const t0 = performance.now();
        const localSwapOptions: SwapOptions = {
            isExactInput:
                swapOptions?.isExactInput ?? this.swapOptions.isExactInput,
            slippage: swapOptions?.slippage ?? this.swapOptions.slippage,
            timeoutMs: swapOptions?.timeoutMs ?? this.swapOptions.timeoutMs,
            calculateMetrics:
                swapOptions?.calculateMetrics ??
                this.swapOptions.calculateMetrics,
        };
        const tMax =
            t0 +
            (localSwapOptions.timeoutMs >= 0
                ? localSwapOptions.timeoutMs
                : Number.POSITIVE_INFINITY);
        if (localSwapOptions.timeoutMs < 0) {
            localSwapOptions.timeoutMs = Infinity;
        }
        const blockNumberPromise = chainInfo[chain].useBlockTimestamp
            ? getBlockTimestamp(chain)
            : getBlockNumber(chain);
        const tmpTokenIn = new Token(chain, tokenInAddress, 18);
        const tmpTokenOut = new Token(chain, tokenOutAddress, 18);
        const erc20TokenInAddress = tmpTokenIn.isNative
            ? chainInfo[chain].weth9Address
            : tmpTokenIn.address;
        const erc20TokenOutAddress = tmpTokenOut.isNative
            ? chainInfo[chain].weth9Address
            : tmpTokenOut.address;
        if (erc20TokenInAddress === erc20TokenOutAddress)
            throw new Error(
                'Cannot get route: tokenIn and tokenOut must be different'
            );
        const pairsCache = await getPairsWithTokens(chain, [
            erc20TokenInAddress,
            erc20TokenOutAddress,
        ]);
        const amountBN = ethers.BigNumber.from(amount);

        const tokenIn = LocalRouter.getTokenInfoFromCache(
            pairsCache,
            chain,
            tokenInAddress
        );
        const tokenOut = LocalRouter.getTokenInfoFromCache(
            pairsCache,
            chain,
            tokenOutAddress
        );
        const blockNumber = await blockNumberPromise;

        const candidates = LocalRouter.getSwapCandidates(
            pairsCache,
            tokenIn,
            tokenOut,
            blockNumber
        );

        if (candidates.length === 0)
            throw new Error('Cannot get route: no pools available');

        if (candidates.length === 1) {
            const tokenInWithBalance = TokenWithBalance.fromBigNumber(
                tokenIn,
                localSwapOptions.isExactInput
                    ? amountBN
                    : candidates[0].getAmountIn(amountBN)
            );

            if (
                localSwapOptions.isExactInput &&
                tokenInWithBalance.balanceBN.gte(ethers.constants.MaxUint256)
            )
                throw new Error('Cannot get route: insufficient liquidity');

            const tokenOutWithBalance = TokenWithBalance.fromBigNumber(
                tokenOut,
                localSwapOptions.isExactInput
                    ? candidates[0].getAmountOut(amountBN)
                    : amountBN
            );

            const slippageThresholdToken = localSwapOptions.isExactInput
                ? tokenOutWithBalance
                : tokenInWithBalance;

            const slippageThresholdWithBalance = TokenWithBalance.fromBigNumber(
                slippageThresholdToken,
                slippageThresholdToken.balanceBN.sub(
                    slippageThresholdToken.balanceBN.div(
                        localSwapOptions.slippage
                    )
                )
            );

            const steps = [
                candidates[0].routeNode(
                    tokenInWithBalance.balanceBN,
                    tokenOutWithBalance.balanceBN,
                    slippageThresholdWithBalance.balanceBN,
                    localSwapOptions.calculateMetrics,
                    localSwapOptions.calculateMetrics ? 100 : undefined
                ),
            ];

            let metrics: RouteMetrics | undefined = undefined;
            if (localSwapOptions.calculateMetrics) {
                const realPoolPCT =
                    candidates[0].type === SwapType.DIRECT ? 100 : 0;
                const triangularPCT =
                    candidates[0].type === SwapType.TRIANGULAR ? 100 : 0;
                const vPoolPCT =
                    candidates[0].type === SwapType.VIRTUAL ? 100 : 0;

                const price0 = Number(
                    (
                        +tokenOutWithBalance.balance /
                        +tokenInWithBalance.balance
                    ).toFixed(6)
                );
                const price1 = Number(
                    (
                        +tokenInWithBalance.balance /
                        +tokenOutWithBalance.balance
                    ).toFixed(6)
                );

                const totalSavings =
                    candidates[0].type === SwapType.VIRTUAL
                        ? +steps[0].metrics!.vSwapSavings!
                        : 0;
                const priceImpact = steps[0].metrics!.priceImpact;

                const avgFee =
                    100 *
                    (steps[0].metrics!.fee ??
                        DirectedPair.PRICE_FEE_FACTOR -
                            (candidates[0].type === SwapType.DIRECT
                                ? candidates[0].pair.fee
                                : candidates[0].pair.vFee));

                metrics = {
                    realPoolPCT,
                    triangularPCT,
                    vPoolPCT,
                    price0,
                    price1,
                    totalSavings,
                    priceImpact,
                    avgFee,
                };
            }

            return {
                isExactInput: localSwapOptions.isExactInput,
                chain,
                tokenIn: tokenInWithBalance,
                tokenOut: tokenOutWithBalance,
                slippageThresholdAmount: slippageThresholdWithBalance,
                steps,
                metrics,
            };
        }

        const groupedCandidatesArr = _.values(
            _.groupBy(
                candidates,
                (c) => ((c as any).secondaryPair ?? c.pair).address
            )
        );

        const constantsAndMaxValues = groupedCandidatesArr.map<
            [FConstants, FMaximums]
        >(([candidate1, candidate2]) => {
            const rCandidate = (candidate2 ?? candidate1) as
                | TriangularCandidate
                | DirectCandidate;
            let a_i: bigint, b_i: bigint, f_i: bigint;
            let b_j: bigint, c_j: bigint, f_j: bigint;
            let a_v: bigint, c_v: bigint, f_v: bigint;
            let max_x: bigint, max_y: bigint;

            if (rCandidate.type === SwapType.TRIANGULAR) {
                const tCandidate = rCandidate as TriangularCandidate;
                a_i = BigInt(tCandidate.pair.token0.balanceBN.toString());
                b_i = BigInt(tCandidate.pair.token1.balanceBN.toString());
                f_i = BigInt(tCandidate.pair.fee);
                b_j = BigInt(
                    tCandidate.secondaryPair.token0.balanceBN.toString()
                );
                c_j = BigInt(
                    tCandidate.secondaryPair.token1.balanceBN.toString()
                );
                f_j = BigInt(tCandidate.secondaryPair.fee);
                max_y = localSwapOptions.isExactInput
                    ? MAX_UINT256
                    : BigInt(tCandidate.getMaxAmountOut().toString());
                if (candidate2) {
                    const vCandidate = candidate1 as ReserveCandidate;
                    const b_min = BigIntMath.min(b_i, b_j);
                    a_v = (a_i * b_min) / BigIntMath.max(b_i, BigInt(1));
                    c_v = (c_j * b_min) / BigIntMath.max(b_j, BigInt(1));
                    f_v = BigInt(vCandidate.pair.vFee);
                    max_x = localSwapOptions.isExactInput
                        ? BigInt(
                              vCandidate
                                  .getMaxVirtualTradeAmountRtoN()
                                  .toString()
                          )
                        : BigInt(vCandidate.getMaxAmountOut().toString());
                } else {
                    a_v = BigInt(0);
                    c_v = BigInt(0);
                    f_v = BigInt(0);
                    max_x = BigInt(0);
                }
            } else {
                a_i = BigInt(0);
                b_i = BigInt(0);
                f_i = BigInt(0);
                b_j = BigInt(0);
                c_j = BigInt(0);
                f_j = BigInt(0);
                a_v = BigInt(rCandidate.pair.token0.balanceBN.toString());
                c_v = BigInt(rCandidate.pair.token1.balanceBN.toString());
                f_v = BigInt(rCandidate.pair.fee);
                max_x = localSwapOptions.isExactInput
                    ? MAX_UINT256
                    : BigInt(rCandidate.getMaxAmountOut().toString());
                max_y = BigInt(0);
            }

            return [
                {
                    a_i,
                    b_i,
                    f_i,
                    b_j,
                    c_j,
                    f_j,
                    a_v,
                    c_v,
                    f_v,
                },
                { max_x, max_y },
            ];
        });

        const [constants, maxValues] = _.unzip(constantsAndMaxValues) as [
            FConstants[],
            FMaximums[],
        ];

        const tol = localSwapOptions.isExactInput
            ? BigInt(
                  ethers.utils
                      .parseUnits('1', Math.max(0, tokenIn.decimals - 8))
                      .toString()
              )
            : BigInt(
                  ethers.utils
                      .parseUnits('1', Math.max(0, tokenOut.decimals - 8))
                      .toString()
              ); // 8 decimals

        const { solution, values } = optimize(
            localSwapOptions.isExactInput,
            BigInt(amountBN.toString()),
            constants,
            maxValues,
            tMax,
            tol
        );

        const tokenInWithBalance = TokenWithBalance.fromBigNumber(
            tokenIn,
            localSwapOptions.isExactInput
                ? ethers.BigNumber.from(
                      solution.reduce((sum, { x, y }) => sum + x + y, BigInt(0))
                  )
                : ethers.BigNumber.from(
                      values.reduce((sum, { x, y }) => sum + x + y, BigInt(0))
                  )
        );
        if (tokenInWithBalance.balanceBN.gte(ethers.constants.MaxUint256))
            throw new Error('Cannot get route: insufficient liquidity');
        const tokenOutWithBalance = TokenWithBalance.fromBigNumber(
            tokenOut,
            localSwapOptions.isExactInput
                ? ethers.BigNumber.from(
                      values.reduce((sum, { x, y }) => sum + x + y, BigInt(0))
                  )
                : ethers.BigNumber.from(
                      solution.reduce((sum, { x, y }) => sum + x + y, BigInt(0))
                  )
        );
        const slippageThresholdToken = localSwapOptions.isExactInput
            ? tokenOutWithBalance
            : tokenInWithBalance;

        const amountInFormatted = parseFloat(tokenInWithBalance.balance);
        const amountOutFormatted = parseFloat(tokenOutWithBalance.balance);

        const steps = groupedCandidatesArr
            .flatMap((candidates, i) =>
                candidates.map((candidate) => {
                    const field =
                        candidate.type === SwapType.TRIANGULAR ? 'y' : 'x';
                    let amountIn: bigint,
                        amountOut: bigint,
                        slippageThresholdAmount: bigint;
                    if (localSwapOptions.isExactInput) {
                        amountIn = solution[i][field];
                        amountOut = values[i][field];
                        slippageThresholdAmount =
                            amountOut -
                            amountOut /
                                BigInt(localSwapOptions.slippage.toString());
                    } else {
                        amountIn = values[i][field];
                        amountOut = solution[i][field];
                        slippageThresholdAmount =
                            amountIn -
                            amountIn /
                                BigInt(localSwapOptions.slippage.toString());
                    }
                    const candidateAmountInBn = ethers.BigNumber.from(amountIn);
                    return candidate.routeNode(
                        candidateAmountInBn,
                        ethers.BigNumber.from(amountOut),
                        ethers.BigNumber.from(slippageThresholdAmount),
                        localSwapOptions.calculateMetrics,
                        localSwapOptions.calculateMetrics
                            ? (100 *
                                  +ethers.utils.formatUnits(
                                      candidateAmountInBn,
                                      tokenInWithBalance.decimals
                                  )) /
                                  amountInFormatted
                            : undefined
                    );
                })
            )
            .filter((routerNode) => !routerNode.amountInBn.isZero())
            .sort((a, b) => b.type - a.type);

        let metrics: RouteMetrics | undefined = undefined;
        if (localSwapOptions.calculateMetrics) {
            const directSteps = steps.filter((s) => s.type === SwapType.DIRECT);
            const triangularSteps = steps.filter(
                (s) => s.type === SwapType.TRIANGULAR
            );
            const virtualSteps = steps.filter(
                (s) => s.type === SwapType.VIRTUAL
            );

            const realPoolPCT = _.sumBy(directSteps, (s) => s.weight!);
            const triangularPCT = _.sumBy(triangularSteps, (s) => s.weight!);
            const vPoolPCT = _.sumBy(virtualSteps, (s) => s.weight!);

            const price0 = Number(
                (amountOutFormatted / amountInFormatted).toFixed(6)
            );
            const price1 = Number(
                (amountInFormatted / amountOutFormatted).toFixed(6)
            );

            const totalFee = steps.reduce(
                (sum, s) =>
                    sum +
                    s.metrics!.fee *
                        +ethers.utils.formatUnits(
                            s.amountInBn,
                            tokenInWithBalance.decimals
                        ),
                0
            );
            const avgFee = (100 * totalFee) / amountInFormatted;

            const totalSavings = virtualSteps.reduce(
                (sum, s) => sum + (s.metrics!.vSwapSavings! * s.weight!) / 100,
                0
            );

            const priceImpact = steps.reduce(
                (sum, s) => sum + s.metrics!.priceImpact * s.weight!,
                0
            );

            metrics = {
                realPoolPCT,
                triangularPCT,
                vPoolPCT,
                price0,
                price1,
                totalSavings,
                priceImpact,
                avgFee,
            };
        }

        return {
            isExactInput: localSwapOptions.isExactInput,
            chain,
            tokenIn: tokenInWithBalance,
            tokenOut: tokenOutWithBalance,
            slippageThresholdAmount: TokenWithBalance.fromBigNumber(
                slippageThresholdToken,
                slippageThresholdToken.balanceBN.sub(
                    slippageThresholdToken.balanceBN.div(
                        localSwapOptions.slippage
                    )
                )
            ),
            steps,
            metrics,
        };
    }

    private static getSwapCandidates(
        pairsCache: Array<Pair>,
        tokenIn: Token,
        tokenOut: Token,
        blockNumber: number
    ): Array<SwapCandidate> {
        if (tokenIn.isNative)
            tokenIn = new Token(
                tokenIn.chainId,
                chainInfo[tokenIn.chainId].weth9Address,
                18
            );
        if (tokenOut.isNative)
            tokenOut = new Token(
                tokenOut.chainId,
                chainInfo[tokenOut.chainId].weth9Address,
                18
            );

        const directedPairsCache = new Map<string, DirectedPair>();
        const maxAmountsOut = new Map<SwapCandidate, ethers.BigNumber>();

        const reserveCandidates = new Array<ReserveCandidate>();
        const triangularCandidates = new Array<TriangularCandidate>();
        const directCandidates = new Array<DirectCandidate>();

        const candidatesIn = new Array<Pair>();
        const candidatesOut = new Array<Pair>();
        for (const pair of pairsCache) {
            if (pair.hasTokenWithAddress(tokenIn.address))
                candidatesIn.push(pair);
            if (pair.hasTokenWithAddress(tokenOut.address))
                candidatesOut.push(pair);
        }

        for (const ikPair of candidatesIn) {
            for (const jkPair of candidatesOut) {
                if (ikPair === jkPair) {
                    const directedPair = this.getOrCreateDirectedPair(
                        directedPairsCache,
                        ikPair.address,
                        tokenIn.address === ikPair.token0.address
                            ? ikPair.token0
                            : ikPair.token1,
                        tokenOut.address === ikPair.token0.address
                            ? ikPair.token0
                            : ikPair.token1,
                        ikPair.token0,
                        ikPair.fee,
                        ikPair.vFee,
                        ikPair.maxReserveRatio,
                        ikPair.reserves
                    );
                    const candidate = new DirectCandidate(directedPair);
                    const maxAmountOut = candidate.getMaxAmountOut();
                    if (!maxAmountOut.isZero()) {
                        maxAmountsOut.set(candidate, maxAmountOut);
                        directCandidates.push(candidate);
                    }
                } else {
                    const commonToken = ikPair.getCommonToken(jkPair);
                    if (
                        !commonToken ||
                        commonToken.address === tokenIn.address ||
                        commonToken.address === tokenOut.address
                    )
                        continue;
                    const ikPairDirected = this.getOrCreateDirectedPair(
                        directedPairsCache,
                        ikPair.address,
                        tokenIn.address === ikPair.token0.address
                            ? ikPair.token0
                            : ikPair.token1,
                        commonToken.address === ikPair.token0.address
                            ? ikPair.token0
                            : ikPair.token1,
                        ikPair.token0,
                        ikPair.fee,
                        ikPair.vFee,
                        ikPair.maxReserveRatio,
                        ikPair.reserves
                    );
                    const jkPairDirected = this.getOrCreateDirectedPair(
                        directedPairsCache,
                        jkPair.address,
                        commonToken.address === jkPair.token0.address
                            ? jkPair.token0
                            : jkPair.token1,
                        tokenOut.address === jkPair.token0.address
                            ? jkPair.token0
                            : jkPair.token1,
                        jkPair.token0,
                        jkPair.fee,
                        jkPair.vFee,
                        jkPair.maxReserveRatio,
                        jkPair.reserves
                    );

                    if (
                        !ikPair.isBlockedForVirtualTrading(
                            tokenIn.chainId,
                            blockNumber
                        ) &&
                        jkPair.allowsTokenAsReserve(tokenIn.address)
                    ) {
                        const candidate = new ReserveCandidate(
                            jkPairDirected,
                            ikPairDirected
                        );
                        const maxAmountOut = candidate.getMaxAmountOut();
                        if (!maxAmountOut.isZero()) {
                            maxAmountsOut.set(candidate, maxAmountOut);
                            reserveCandidates.push(candidate);
                        }
                    }

                    const candidate = new TriangularCandidate(
                        ikPairDirected,
                        jkPairDirected
                    );
                    const maxAmountOut = candidate.getMaxAmountOut();
                    if (!maxAmountOut.isZero()) {
                        maxAmountsOut.set(candidate, maxAmountOut);
                        triangularCandidates.push(candidate);
                    }
                }
            }
        }

        reserveCandidates.sort((a, b) =>
            maxAmountsOut.get(a)!.lt(maxAmountsOut.get(b)!) ? 1 : -1
        );
        triangularCandidates.sort((a, b) =>
            maxAmountsOut.get(a)!.lt(maxAmountsOut.get(b)!) ? 1 : -1
        );
        directCandidates.sort((a, b) =>
            maxAmountsOut.get(a)!.lt(maxAmountsOut.get(b)!) ? 1 : -1
        );

        return (reserveCandidates as SwapCandidate[])
            .concat(directCandidates as SwapCandidate[])
            .concat(triangularCandidates as SwapCandidate[]);
    }

    private static getOrCreateDirectedPair(
        directedPairsCache: Map<string, DirectedPair>,
        address: string,
        token0: TokenWithBalance,
        token1: TokenWithBalance,
        referenceToken: Token,
        fee: number,
        vFee: number,
        maxReserveRatio: number,
        reserves: Array<PairReserve>
    ): DirectedPair {
        address = address.toLowerCase();
        if (!directedPairsCache.has(address)) {
            const newDirectedPair = new DirectedPair(
                address,
                token0,
                token1,
                referenceToken,
                reserves,
                maxReserveRatio,
                fee,
                vFee
            );
            directedPairsCache.set(address, newDirectedPair);
        }
        return directedPairsCache.get(address)!;
    }
}
