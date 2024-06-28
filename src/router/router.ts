import { ethers } from 'ethers';
import { TransactionResponse } from '@ethersproject/abstract-provider';

import { DirectedPair } from './internal/directedPair';
import {
    SwapCandidate,
    DirectCandidate,
    TriangularCandidate,
    ReserveCandidate,
} from './internal/swapCandidates';

import { SwapType, ReserveRouteNode, Route, SwapOptions } from './entities';

import { Token, TokenWithBalance } from '../entities/token';
import { Pair, PairReserve } from '../entities/pair';
import { getBlockTimestamp, getBlockNumber } from '../dal/meta';
import { Chain, chainInfo } from '../entities/chain';
import { getAllPairs } from '../dal/pairs';
import vRouterAbi from '../artifacts/vRouterAbi.json';
import { getMultipleTokensPriceUsd } from '../utils/pricing';

export class Router {
    swapOptions: SwapOptions;

    constructor(swapOptions?: Partial<SwapOptions>) {
        this.swapOptions = {
            isExactInput: swapOptions?.isExactInput ?? true,
            slippage: swapOptions?.slippage ?? 1000,
            timeoutMs: swapOptions?.timeoutMs ?? 5000,
        };
        this.pairsCache = new Array();
        this.directedPairsCache = new Map();
    }

    async getRoute(
        tokenIn: Token,
        tokenOut: Token,
        amount: ethers.BigNumberish,
        chain: Chain,
        swapOptions?: Partial<SwapOptions>
    ): Promise<Route> {
        const t0 = performance.now();
        let localSwapOptions: SwapOptions = {
            isExactInput:
                swapOptions?.isExactInput ?? this.swapOptions.isExactInput,
            slippage: swapOptions?.slippage ?? this.swapOptions.slippage,
            timeoutMs: swapOptions?.timeoutMs ?? this.swapOptions.timeoutMs,
        };
        this.pairsCache = await getAllPairs(chain);
        this.directedPairsCache.clear();
        const amountBN = ethers.BigNumber.from(amount);

        const candidates = await this.getSwapCandidates(
            tokenIn,
            tokenOut,
            chain
        );
        let optimalRoute = new Array<ethers.BigNumber>(candidates.length).fill(
            ethers.BigNumber.from(0)
        );
        if (!localSwapOptions.isExactInput) {
            let localAmountBN = ethers.BigNumber.from(amountBN);
            for (
                let i = candidates.length - 1;
                i >= 0 && !localAmountBN.isZero();
                --i
            ) {
                const candidateMaxAmountOut = candidates[i].getMaxAmountOut();
                optimalRoute[i] = localAmountBN.gt(candidateMaxAmountOut)
                    ? candidateMaxAmountOut
                    : localAmountBN;
                localAmountBN = localAmountBN.sub(optimalRoute[i]);
                if (!optimalRoute[i].isZero())
                    candidates[i].emulateTrade(
                        optimalRoute[i],
                        localSwapOptions.isExactInput
                    );
            }
            for (let i = candidates.length - 1; i >= 0; --i) {
                if (!optimalRoute[i].isZero()) candidates[i].revert();
            }
            if (!localAmountBN.isZero()) {
                optimalRoute.fill(ethers.BigNumber.from(0));
            }
        } else {
            optimalRoute[optimalRoute.length - 1] = amountBN;
        }
        let optimalAmount = this.calculateRouteAmounts(
            candidates,
            optimalRoute,
            localSwapOptions.isExactInput
        ).reduce((current, sum) => sum.add(current), ethers.BigNumber.from(0));
        if (!localSwapOptions.isExactInput)
            optimalAmount = this.negateBigNumber(optimalAmount);

        let step = amountBN;
        while (!step.isZero()) {
            let nextOptimalAmount = ethers.BigNumber.from(
                '-99999999999999999999999999999999'
            );
            let [from, to] = [0, 0];
            for (let i = 0; i < candidates.length; ++i) {
                if (optimalRoute[i].lt(step)) continue;
                for (let j = 0; j < candidates.length; ++j) {
                    if (
                        i == j ||
                        (!localSwapOptions.isExactInput &&
                            optimalRoute[j]
                                .add(step)
                                .gt(candidates[j].getMaxAmountOut()))
                    )
                        continue;
                    optimalRoute[i] = optimalRoute[i].sub(step);
                    optimalRoute[j] = optimalRoute[j].add(step);
                    let nextAmount = this.calculateRouteAmounts(
                        candidates,
                        optimalRoute,
                        localSwapOptions.isExactInput
                    ).reduce(
                        (current, sum) => sum.add(current),
                        ethers.BigNumber.from(0)
                    );
                    if (!localSwapOptions.isExactInput)
                        nextAmount = this.negateBigNumber(nextAmount);
                    if (nextAmount.gt(nextOptimalAmount)) {
                        nextOptimalAmount = nextAmount;
                        from = i;
                        to = j;
                    }
                    optimalRoute[i] = optimalRoute[i].add(step);
                    optimalRoute[j] = optimalRoute[j].sub(step);
                }
            }
            if (nextOptimalAmount.gt(optimalAmount)) {
                optimalAmount = nextOptimalAmount;
                optimalRoute[from] = optimalRoute[from].sub(step);
                optimalRoute[to] = optimalRoute[to].add(step);
            } else {
                step = step.div(2);
            }
            const t1 = performance.now();
            if (t1 - t0 >= localSwapOptions.timeoutMs) break;
        }
        let amounts = this.calculateRouteAmounts(
            candidates,
            optimalRoute,
            localSwapOptions.isExactInput
        );
        const slippageThresholdAmounts = amounts.map((amount) =>
            localSwapOptions.isExactInput
                ? amount.sub(amount.div(localSwapOptions.slippage))
                : amount.add(amount.div(localSwapOptions.slippage))
        );
        const slippageThresholdAmountsSum = slippageThresholdAmounts.reduce(
            (sum, prev) => sum.add(prev),
            ethers.BigNumber.from('0')
        );
        const tokenOutWithBalance = TokenWithBalance.fromBigNumber(
            tokenOut,
            localSwapOptions.isExactInput
                ? amounts.reduce(
                      (sum, prev) => sum.add(prev),
                      ethers.BigNumber.from('0')
                  )
                : amountBN
        );
        const tokenInWithBalance = TokenWithBalance.fromBigNumber(
            tokenIn,
            localSwapOptions.isExactInput
                ? amountBN
                : amounts.reduce(
                      (sum, prev) => sum.add(prev),
                      ethers.BigNumber.from('0')
                  )
        );
        const [tokenInPriceUsd, tokenOutPriceUsd] =
            await getMultipleTokensPriceUsd(chain, [
                tokenIn.isNative
                    ? chainInfo[chain].weth9Address
                    : tokenIn.address,
                tokenOut.isNative
                    ? chainInfo[chain].weth9Address
                    : tokenOut.address,
            ]);
        return {
            isExactInput: localSwapOptions.isExactInput,
            chain,
            tokenIn: tokenInWithBalance,
            tokenOut: tokenOutWithBalance,
            slippageThresholdAmount: TokenWithBalance.fromBigNumber(
                localSwapOptions.isExactInput ? tokenOut : tokenIn,
                slippageThresholdAmountsSum
            ),
            amountInUsd:
                parseFloat(tokenInWithBalance.balance) * tokenInPriceUsd,
            amountOutUsd:
                parseFloat(tokenOutWithBalance.balance) * tokenOutPriceUsd,
            steps: candidates
                .map((candidate, index) =>
                    candidate.routeNode(
                        localSwapOptions.isExactInput
                            ? optimalRoute[index]
                            : amounts[index],
                        localSwapOptions.isExactInput
                            ? amounts[index]
                            : optimalRoute[index],
                        slippageThresholdAmounts[index]
                    )
                )
                .filter((routerNode) => !routerNode.amountInBn.isZero()),
        };
    }

    private getRouterFunctionName(
        isVirtual: boolean,
        isExactInput: boolean,
        isFromNative: boolean,
        isToNative: boolean
    ): string {
        return `swap${isVirtual ? 'Reserve' : ''}${isExactInput ? 'Exact' : ''}${
            isFromNative ? 'ETH' : 'Tokens'
        }For${isExactInput ? '' : 'Exact'}${isToNative ? 'ETH' : 'Tokens'}`;
    }

    async generateMulticallData(
        route: Route,
        signerAddress: string
    ): Promise<string[]> {
        const routerInterface = new ethers.utils.Interface(vRouterAbi);
        const futureTs = (await getBlockTimestamp(route.chain)) + 100000;
        const isFromNative = route.tokenIn.isNative;
        const isToNative = route.tokenOut.isNative;
        const multicallData = route.steps.map((step) => {
            let functionName = 'undefined';
            let params: any[] = [];
            switch (step.type) {
                case SwapType.DIRECT:
                case SwapType.TRIANGULAR:
                    functionName = this.getRouterFunctionName(
                        false,
                        route.isExactInput,
                        isFromNative,
                        isToNative
                    );
                    params = [
                        step.path.map((value) => value.address),
                        route.isExactInput ? step.amountInBn : step.amountOutBn,
                        step.slippageThresholdAmountBn,
                        signerAddress,
                        futureTs,
                    ];
                    break;
                case SwapType.VIRTUAL:
                    functionName = this.getRouterFunctionName(
                        true,
                        route.isExactInput,
                        isFromNative,
                        isToNative
                    );
                    params = [
                        step.path[2].address,
                        step.path[1].address,
                        (step as ReserveRouteNode).ikPair,
                        route.isExactInput ? step.amountInBn : step.amountOutBn,
                        step.slippageThresholdAmountBn,
                        signerAddress,
                        futureTs,
                    ];
                    break;
            }
            return routerInterface.encodeFunctionData(functionName, params);
        });

        if (isFromNative)
            multicallData.push(routerInterface.encodeFunctionData('refundETH'));

        return multicallData;
    }

    async executeMulticall(
        chain: Chain,
        multicallData: string[],
        signer: ethers.Signer,
        value?: ethers.BigNumber
    ): Promise<TransactionResponse> {
        const routerContract = new ethers.Contract(
            chainInfo[chain].routerAddress,
            vRouterAbi,
            signer
        );
        return await routerContract.multicall(multicallData, {
            value: value ?? ethers.BigNumber.from('0'),
        });
    }

    private pairsCache: Array<Pair>;
    private directedPairsCache: Map<string, DirectedPair>;

    private async getSwapCandidates(
        tokenIn: Token,
        tokenOut: Token,
        chain: Chain
    ): Promise<Array<SwapCandidate>> {
        if (tokenIn.isNative)
            tokenIn = new Token(
                chain,
                chainInfo[chain].weth9Address,
                18,
                tokenIn.symbol ? 'W' + tokenIn.symbol : undefined,
                tokenIn.name ? 'Wrapped ' + tokenIn.name : undefined
            );
        if (tokenOut.isNative)
            tokenOut = new Token(
                chain,
                chainInfo[chain].weth9Address,
                18,
                tokenOut.symbol ? 'W' + tokenOut.symbol : undefined,
                tokenOut.name ? 'Wrapped ' + tokenOut.name : undefined
            );

        return (await this.getVirtualSwapPairs(tokenIn, tokenOut, chain))
            .map(
                ([jkPool, ikPool]) =>
                    new ReserveCandidate(jkPool, ikPool) as SwapCandidate
            )
            .concat(
                this.getTriangularSwapPairs(tokenIn, tokenOut).map(
                    ([triangularPool0, triangularPool1]) =>
                        new TriangularCandidate(
                            triangularPool0,
                            triangularPool1
                        ) as SwapCandidate
                )
            )
            .concat(
                this.getDirectSwapPairs(tokenIn, tokenOut).map(
                    (directedPool) =>
                        new DirectCandidate(directedPool) as SwapCandidate
                )
            );
    }

    private getOrCreateDirectedPair(
        address: string,
        token0: TokenWithBalance,
        token1: TokenWithBalance,
        referenceToken: Token,
        fee: number,
        vFee: number,
        maxReserveRatio: number,
        reserves: Array<PairReserve>
    ): DirectedPair {
        address = ethers.utils.getAddress(address);
        if (!this.directedPairsCache.has(address)) {
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
            this.directedPairsCache.set(address, newDirectedPair);
        }
        return this.directedPairsCache.get(address)!;
    }

    private getDirectSwapPairs(
        tokenIn: Token,
        tokenOut: Token
    ): Array<DirectedPair> {
        return this.pairsCache
            .filter(
                (pair) =>
                    pair.hasTokenWithAddress(tokenIn.address) &&
                    pair.hasTokenWithAddress(tokenOut.address)
            )
            .map((pair) =>
                this.getOrCreateDirectedPair(
                    pair.address,
                    tokenIn.address === pair.token0.address
                        ? pair.token0
                        : pair.token1,
                    tokenOut.address === pair.token0.address
                        ? pair.token0
                        : pair.token1,
                    pair.token0,
                    pair.fee,
                    pair.vFee,
                    pair.maxReserveRatio,
                    pair.reserves
                )
            );
    }

    private getTriangularSwapPairs(tokenIn: Token, tokenOut: Token) {
        let result: Array<Array<DirectedPair>> = [];
        const candidatesIn = this.pairsCache.filter((pair) =>
            pair.hasTokenWithAddress(tokenIn.address)
        );
        const candidatesOut = this.pairsCache.filter((pair) =>
            pair.hasTokenWithAddress(tokenOut.address)
        );
        candidatesIn.forEach((pair0) => {
            candidatesOut.forEach((pair1) => {
                const commonToken = pair0.getCommonToken(pair1);
                if (
                    commonToken &&
                    pair0.address !== pair1.address &&
                    commonToken.address !== tokenIn.address &&
                    commonToken.address !== tokenOut.address
                ) {
                    const triangularSwapPair0 = this.getOrCreateDirectedPair(
                        pair0.address,
                        tokenIn.address === pair0.token0.address
                            ? pair0.token0
                            : pair0.token1,
                        commonToken.address === pair0.token0.address
                            ? pair0.token0
                            : pair0.token1,
                        pair0.token0,
                        pair0.fee,
                        pair0.vFee,
                        pair0.maxReserveRatio,
                        pair0.reserves
                    );
                    const triangularSwapPair1 = this.getOrCreateDirectedPair(
                        pair1.address,
                        commonToken.address === pair1.token0.address
                            ? pair1.token0
                            : pair1.token1,
                        tokenOut.address === pair1.token0.address
                            ? pair1.token0
                            : pair1.token1,
                        pair1.token0,
                        pair1.fee,
                        pair1.vFee,
                        pair1.maxReserveRatio,
                        pair1.reserves
                    );
                    result.push([triangularSwapPair0, triangularSwapPair1]);
                }
            });
        });
        return result;
    }

    private async getVirtualSwapPairs(
        tokenIn: Token,
        tokenOut: Token,
        chain: Chain
    ): Promise<Array<[DirectedPair, DirectedPair]>> {
        let result: [DirectedPair, DirectedPair][] = [];
        const jkCandidates = this.pairsCache.filter(
            (pair) =>
                pair.allowsTokenAsReserve(tokenIn.address) &&
                pair.hasTokenWithAddress(tokenOut.address)
        );
        const blockNumber = await (chainInfo[chain].useBlockTimestamp
            ? getBlockTimestamp(chain)
            : getBlockNumber(chain));
        const ikCandidates = this.pairsCache.filter(
            (pair) =>
                pair.hasTokenWithAddress(tokenIn.address) &&
                !pair.hasTokenWithAddress(tokenOut.address) &&
                !pair.isBlockedForVirtualTrading(chain, blockNumber)
        );

        jkCandidates.forEach((jkPair) => {
            ikCandidates.forEach((ikPair) => {
                if (ikPair.hasCommonTokenWith(jkPair)) {
                    const commonToken = ikPair.getCommonToken(jkPair)!;
                    if (commonToken.address !== tokenIn.address) {
                        result.push([
                            this.getOrCreateDirectedPair(
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
                            ),
                            this.getOrCreateDirectedPair(
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
                            ),
                        ]);
                    }
                }
            });
        });
        return result;
    }

    private calculateRouteAmounts(
        candidates: Array<SwapCandidate>,
        route: Array<ethers.BigNumber>,
        isExactInput: boolean
    ): Array<ethers.BigNumber> {
        let amounts = new Array(candidates.length).fill(
            ethers.BigNumber.from(0)
        );
        try {
            for (let k = 0; k < candidates.length; ++k) {
                if (!route[k].isZero()) {
                    amounts[k] = isExactInput
                        ? candidates[k].getAmountOut(route[k])
                        : candidates[k].getAmountIn(route[k]);
                    candidates[k].emulateTrade(route[k], isExactInput);
                }
            }
        } catch (e) {
            amounts = amounts.fill(
                ethers.BigNumber.from(
                    isExactInput ? '0' : '99999999999999999999999999999999'
                )
            );
        } finally {
            for (let k = 0; k < candidates.length; ++k) {
                candidates[k].revert();
            }
        }
        return amounts;
    }

    private negateBigNumber(x: ethers.BigNumber): ethers.BigNumber {
        if (x.toString().startsWith('-')) {
            return ethers.BigNumber.from(x.toString().slice(1));
        } else {
            return ethers.BigNumber.from('-' + x.toString());
        }
    }
}
