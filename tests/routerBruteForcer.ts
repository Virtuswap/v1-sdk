import { ethers } from 'ethers';
import cloneDeep from 'lodash/cloneDeep';

import { DirectedPair } from '../src/router/internal/directedPair';
import {
    SwapCandidate,
    DirectCandidate,
    TriangularCandidate,
    ReserveCandidate,
} from '../src/router/internal/swapCandidates';

import { SwapOptions, RouteNode } from '../src/router/entities';

import { Token, TokenWithBalance } from '../src/entities/token';
import { Pair, PairReserve } from '../src/entities/pair';
import { getAllPairs } from '../src/dal/pairs';
import { getBlockTimestamp, getBlockNumber } from '../src/dal/meta';
import { Chain, chainInfo } from '../src/entities/chain';

export class Router {
    swapOptions: SwapOptions;

    constructor(swapOptions?: SwapOptions) {
        this.swapOptions = {
            isExactInput: swapOptions?.isExactInput ?? true,
            slippage: swapOptions?.slippage ?? 1000,
        };
        this.pairsCache = new Array();
        this.directedPairsCache = new Map();
        this.maxAmountOut = ethers.BigNumber.from(
            '-99999999999999999999999999999999'
        );
        this.maxRoute = new Array();
    }

    async getRoute(
        tokenIn: Token,
        tokenOut: Token,
        amount: ethers.BigNumberish,
        chain: Chain,
        swapOptions?: SwapOptions
    ): Promise<Array<RouteNode>> {
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
        this.maxRoute = new Array<ethers.BigNumber>(candidates.length).fill(
            ethers.BigNumber.from(0)
        );

        this.maxAmountOut = ethers.BigNumber.from(
            '-99999999999999999999999999999999'
        );
        this.bruteForce(
            amountBN,
            0,
            ethers.BigNumber.from(0),
            new Array<ethers.BigNumber>(),
            candidates
        );
        let amounts = this.calculateRouteAmounts(
            candidates,
            this.maxRoute,
            this.swapOptions.isExactInput!
        );
        if (!this.swapOptions.isExactInput!)
            amounts = amounts.map((amount) => this.negateBigNumber(amount));
        const slippageThresholdAmounts = amounts.map((amount) =>
            amount.sub(amount.div(this.swapOptions.slippage!))
        );
        return candidates
            .map((candidate, index) =>
                candidate.routeNode(
                    this.swapOptions.isExactInput!
                        ? this.maxRoute[index]
                        : amounts[index],
                    this.swapOptions.isExactInput!
                        ? amounts[index]
                        : this.maxRoute[index],
                    slippageThresholdAmounts[index]
                )
            )
            .filter((routerNode) => !routerNode.amountInBn.isZero());
    }

    private bruteForce(
        amount: ethers.BigNumber,
        depth: number,
        sumSoFar: ethers.BigNumber,
        route: Array<ethers.BigNumber>,
        candidates: Array<SwapCandidate>
    ) {
        if (depth + 1 == candidates.length) {
            route.push(amount.sub(sumSoFar));
            const amountOut = this.calculateRouteAmounts(
                candidates,
                route,
                this.swapOptions.isExactInput!
            ).reduce(
                (current: ethers.BigNumber, sum: ethers.BigNumber) =>
                    sum.add(current),
                ethers.BigNumber.from(0)
            );
            if (amountOut.gt(this.maxAmountOut)) {
                this.maxAmountOut = amountOut;
                this.maxRoute = cloneDeep(route);
            }
            route.pop();
            return;
        }
        for (let i = ethers.BigNumber.from(0); i.lte(amount); i = i.add(1)) {
            route.push(i);
            this.bruteForce(
                amount,
                depth + 1,
                sumSoFar.add(i),
                route,
                candidates
            );
            route.pop();
        }
    }

    private maxAmountOut: ethers.BigNumber;
    private maxRoute: Array<ethers.BigNumber>;
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
        let localCandidates = cloneDeep(candidates);
        let amounts = new Array(candidates.length).fill(
            ethers.BigNumber.from(0)
        );
        try {
            for (let k = 0; k < localCandidates.length; ++k) {
                if (!route[k].isZero()) {
                    amounts[k] = isExactInput
                        ? localCandidates[k].getAmountOut(route[k])
                        : this.negateBigNumber(
                              localCandidates[k].getAmountIn(route[k])
                          );
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
