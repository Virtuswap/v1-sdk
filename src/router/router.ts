import { ethers } from 'ethers';
import { TransactionResponse } from '@ethersproject/abstract-provider';
import cloneDeep from 'lodash/cloneDeep';

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
import { Address } from '../entities/utils';
import { getAllPairs } from '../dal/pairs';
import vRouterAbi from '../artifacts/vRouterAbi.json';
import { getMultipleTokensPriceUsd } from '../utils/pricing';

export class Router {
    swapOptions: SwapOptions;

    constructor(swapOptions?: SwapOptions) {
        this.swapOptions = {
            isExactInput: swapOptions?.isExactInput ?? true,
            slippage: swapOptions?.slippage ?? 1000,
        };
        this.pairsCache = new Array();
        this.directedPairsCache = new Map();
    }

    async getRoute(
        tokenIn: Token,
        tokenOut: Token,
        amount: ethers.BigNumberish,
        chain: Chain,
        swapOptions?: SwapOptions
    ): Promise<Route> {
        this.swapOptions = {
            isExactInput: swapOptions?.isExactInput ?? true,
            slippage: swapOptions?.slippage ?? 1000,
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
        optimalRoute[optimalRoute.length - 1] = amountBN;
        let optimalAmount = this.calculateRouteAmounts(
            candidates,
            optimalRoute,
            this.swapOptions.isExactInput!
        ).reduce((current, sum) => sum.add(current), ethers.BigNumber.from(0));
        if (!this.swapOptions.isExactInput!)
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
                    if (i != j) {
                        optimalRoute[i] = optimalRoute[i].sub(step);
                        optimalRoute[j] = optimalRoute[j].add(step);
                        let nextAmount = this.calculateRouteAmounts(
                            candidates,
                            optimalRoute,
                            this.swapOptions.isExactInput!
                        ).reduce(
                            (current, sum) => sum.add(current),
                            ethers.BigNumber.from(0)
                        );
                        if (!this.swapOptions.isExactInput!)
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
            }
            if (nextOptimalAmount.gt(optimalAmount)) {
                optimalAmount = nextOptimalAmount;
                optimalRoute[from] = optimalRoute[from].sub(step);
                optimalRoute[to] = optimalRoute[to].add(step);
            } else {
                step = step.div(2);
            }
        }
        let amounts = this.calculateRouteAmounts(
            candidates,
            optimalRoute,
            this.swapOptions.isExactInput!
        );
        const slippageThresholdAmounts = amounts.map((amount) =>
            amount.sub(amount.div(this.swapOptions.slippage!))
        );
        const slippageThresholdAmountsSum = slippageThresholdAmounts.reduce(
            (sum, prev) => sum.add(prev),
            ethers.BigNumber.from('0')
        );
        const tokenOutWithBalance = TokenWithBalance.fromBigNumber(
            tokenOut,
            this.swapOptions.isExactInput
                ? amounts.reduce(
                      (sum, prev) => sum.add(prev),
                      ethers.BigNumber.from('0')
                  )
                : amountBN
        );
        const tokenInWithBalance = TokenWithBalance.fromBigNumber(
            tokenIn,
            this.swapOptions.isExactInput
                ? amountBN
                : amounts.reduce(
                      (sum, prev) => sum.add(prev),
                      ethers.BigNumber.from('0')
                  )
        );
        const [tokenInPriceUsd, tokenOutPriceUsd] =
            await getMultipleTokensPriceUsd(chain, [
                tokenIn.address.toString(),
                tokenOut.address.toString(),
            ]);
        return {
            isExactInput: this.swapOptions.isExactInput!,
            chain,
            tokenIn: tokenInWithBalance,
            tokenOut: tokenOutWithBalance,
            slippageThresholdAmount: TokenWithBalance.fromBigNumber(
                this.swapOptions.isExactInput ? tokenOut : tokenIn,
                slippageThresholdAmountsSum
            ),
            amountInUsd:
                parseFloat(tokenInWithBalance.balance) * tokenInPriceUsd,
            amountOutUsd:
                parseFloat(tokenOutWithBalance.balance) * tokenOutPriceUsd,
            steps: candidates
                .map((candidate, index) =>
                    candidate.routeNode(
                        this.swapOptions.isExactInput!
                            ? optimalRoute[index]
                            : amounts[index],
                        this.swapOptions.isExactInput!
                            ? amounts[index]
                            : optimalRoute[index],
                        slippageThresholdAmounts[index]
                    )
                )
                .filter((routerNode) => !routerNode.amountInBn.isZero()),
        };
    }

    async generateMulticallData(
        route: Route,
        signer: ethers.Signer
    ): Promise<string[]> {
        const routerInterface = new ethers.utils.Interface(vRouterAbi);
        const futureTs = (await getBlockTimestamp(route.chain)) + 100000;
        const signerAddress = await signer.getAddress();
        return route.steps.map((step) => {
            let functionName = 'undefined';
            let params: any[] = [];
            // TODO: add native tokens support
            switch (step.type) {
                case SwapType.DIRECT:
                case SwapType.TRIANGULAR:
                    functionName = route.isExactInput
                        ? 'swapExactTokensForTokens'
                        : 'swapTokensForExactTokens';
                    params = [
                        step.path.map((value) => value.address.toString()),
                        route.isExactInput ? step.amountInBn : step.amountOutBn,
                        step.slippageThresholdAmountBn,
                        signerAddress,
                        futureTs,
                    ];
                    break;
                case SwapType.VIRTUAL:
                    functionName = route.isExactInput
                        ? 'swapReserveExactTokensForTokens'
                        : 'swapReserveTokensForExactTokens';
                    params = [
                        step.path[2].address.toString(),
                        step.path[1].address.toString(),
                        (step as ReserveRouteNode).ikPair.toString(),
                        route.isExactInput ? step.amountInBn : step.amountOutBn,
                        step.slippageThresholdAmountBn,
                        signerAddress,
                        futureTs,
                    ];
                    break;
            }
            return routerInterface.encodeFunctionData(functionName, params);
        });
    }

    async executeMulticall(
        chain: Chain,
        multicallData: string[],
        signer: ethers.Signer
    ): Promise<TransactionResponse> {
        const routerContract = new ethers.Contract(
            chainInfo[chain].routerAddress.toString(),
            vRouterAbi,
            signer
        );
        return await routerContract.multicall(multicallData);
    }

    private pairsCache: Array<Pair>;
    private directedPairsCache: Map<string, DirectedPair>;

    private async getSwapCandidates(
        tokenIn: Token,
        tokenOut: Token,
        chain: Chain
    ): Promise<Array<SwapCandidate>> {
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
        address: Address,
        token0: TokenWithBalance,
        token1: TokenWithBalance,
        referenceToken: Token,
        fee: number,
        vFee: number,
        maxReserveRatio: number,
        reserves: Array<PairReserve>
    ): DirectedPair {
        if (!this.directedPairsCache.has(address.toString())) {
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
            this.directedPairsCache.set(address.toString(), newDirectedPair);
        }
        return this.directedPairsCache.get(address.toString())!;
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
                    tokenIn.address.eq(pair.token0.address)
                        ? pair.token0
                        : pair.token1,
                    tokenOut.address.eq(pair.token0.address)
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
                    pair0.address.neq(pair1.address) &&
                    commonToken.address.neq(tokenIn.address) &&
                    commonToken.address.neq(tokenOut.address)
                ) {
                    const triangularSwapPair0 = this.getOrCreateDirectedPair(
                        pair0.address,
                        tokenIn.address.eq(pair0.token0.address)
                            ? pair0.token0
                            : pair0.token1,
                        commonToken.address.eq(pair0.token0.address)
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
                        commonToken.address.eq(pair1.token0.address)
                            ? pair1.token0
                            : pair1.token1,
                        tokenOut.address.eq(pair1.token0.address)
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
                    if (commonToken.address.neq(tokenIn.address)) {
                        result.push([
                            this.getOrCreateDirectedPair(
                                jkPair.address,
                                commonToken.address.eq(jkPair.token0.address)
                                    ? jkPair.token0
                                    : jkPair.token1,
                                tokenOut.address.eq(jkPair.token0.address)
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
                                tokenIn.address.eq(ikPair.token0.address)
                                    ? ikPair.token0
                                    : ikPair.token1,
                                commonToken.address.eq(ikPair.token0.address)
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
        let localCandidates = cloneDeep(candidates);
        let amounts = new Array(candidates.length).fill(
            ethers.BigNumber.from(0)
        );
        try {
            for (let k = 0; k < localCandidates.length; ++k) {
                if (!route[k].isZero()) {
                    amounts[k] = isExactInput
                        ? localCandidates[k].getAmountOut(route[k])
                        : localCandidates[k].getAmountIn(route[k]);
                    localCandidates[k].emulateTrade(route[k], isExactInput);
                }
            }
        } catch (e) {
            amounts = amounts.fill(ethers.BigNumber.from(0));
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
