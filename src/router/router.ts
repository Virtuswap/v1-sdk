import { ethers } from 'ethers';

import { Token, TokenWithBalance } from '../entities/token';
import { Pair, PairReserve } from '../entities/pair';
import { Chain } from '../entities/chain';
import { Address } from '../entities/utils';
import { getBlockNumber, getBlockTimestamp } from '../dal/meta';
import { getAllPairs } from '../dal/pairs';
import { abi as vRouterAbi } from '../artifacts/vRouter.json';
import * as _ from 'lodash';

export enum SwapType {
    UNDEFINED,
    DIRECT,
    TRIANGULAR,
    VIRTUAL,
};

export type RouteNode = {
    path: Array<Address>;
    type: SwapType;
    amountInBn: ethers.BigNumber;
    amountOutBn: ethers.BigNumber;
    minAmountOutBn: ethers.BigNumber;
};

export type Route = {
    tokenIn: TokenWithBalance;
    tokenOut: TokenWithBalance;
    minTokenOut: TokenWithBalance;
    amountInUsd: string;
    amountOutUsd: string;
    steps: Array<RouteNode>;
};

export type SwapOptions = {
    slippage: number;
};

export default class Router {
    swapOptions: SwapOptions;

    constructor(slippage = 1000) {
        this.swapOptions = {
            slippage,
        }
        this.pairsCache = new Array();
        this.directedPairsCache = new Map();
    }

    async getRoute(tokenIn: TokenWithBalance, tokenOut: Token, chain: Chain, swapOptions?: SwapOptions): Promise<Route> {
        if (swapOptions)
            this.swapOptions = swapOptions;
        const blockNumber = await ((chain === Chain.ARBITRUM_MAINNET || chain === Chain.ARBITRUM_TESTNET) ? getBlockTimestamp() : getBlockNumber());
        this.pairsCache = await getAllPairs();

        const candidates = this.getSwapCandidates(tokenIn, tokenOut, blockNumber);
        let maxRoute = new Array<ethers.BigNumber>(candidates.length).fill(
            ethers.BigNumber.from(0)
        );
        maxRoute[maxRoute.length - 1] = tokenIn.balanceBN;
        let maxAmountOut = this.calculateRouteAmountsOut(
            candidates,
            maxRoute
        ).reduce((current, sum) => sum.add(current), ethers.BigNumber.from(0));

        let step = tokenIn.balanceBN.div(2);
        while (!step.isZero()) {
            let nextMaxAmountOut = ethers.BigNumber.from(0);
            let [from, to] = [0, 0];
            for (let i = 0; i < candidates.length; ++i) {
                if (maxRoute[i].lt(step)) continue;
                for (let j = 0; j < candidates.length; ++j) {
                    if (i != j) {
                        maxRoute[i] = maxRoute[i].sub(step);
                        maxRoute[j] = maxRoute[j].add(step);
                        let nextAmountOut = this.calculateRouteAmountsOut(
                            candidates,
                            maxRoute
                        ).reduce(
                            (current, sum) => sum.add(current),
                            ethers.BigNumber.from(0)
                        );
                        if (nextAmountOut.gt(nextMaxAmountOut)) {
                            nextMaxAmountOut = nextAmountOut;
                            from = i;
                            to = j;
                        }
                        maxRoute[i] = maxRoute[i].add(step);
                        maxRoute[j] = maxRoute[j].sub(step);
                    }
                }
            }
            if (nextMaxAmountOut.gt(maxAmountOut)) {
                maxAmountOut = nextMaxAmountOut;
                maxRoute[from] = maxRoute[from].sub(step);
                maxRoute[to] = maxRoute[to].add(step);
            } else {
                step = step.div(2);
            }
        }
        const amountsOut = this.calculateRouteAmountsOut(candidates, maxRoute);
        const minAmountsOut = amountsOut.map((amount) =>
            amount.sub(amount.div(this.swapOptions.slippage))
        );
        return {
            tokenIn,
            tokenOut: TokenWithBalance.fromBigNumber(tokenOut, amountsOut.reduce((sum, prev) => sum.add(prev), ethers.BigNumber.from('0'))),
            minTokenOut: TokenWithBalance.fromBigNumber(tokenOut, minAmountsOut.reduce((sum, prev) => sum.add(prev), ethers.BigNumber.from('0'))),
            // TODO: add tokens prices
            amountInUsd: '0',
            amountOutUsd: '0',
            steps: candidates
                .map((candidate, index) =>
                    candidate.routeNode(
                        maxRoute[index],
                        amountsOut[index],
                        minAmountsOut[index]
                    )
                )
                .filter((routerNode) => !routerNode.amountInBn.isZero())
        };
    }

    async executeRoute(route: Route, signer: ethers.Signer): Promise<void> {
        // TODO: add router address
        const routerContract = new ethers.Contract('', vRouterAbi, signer);
        const futureTs = await getBlockTimestamp() + 100000;
        const multicallData = route.steps.map((step) => {
            let functionName = 'undefined';
            let params: any[] = [];
            // TODO: add native tokens support
            switch (step.type) {
                case SwapType.DIRECT:
                case SwapType.TRIANGULAR:
                    functionName = 'swapExactTokensForTokens';
                    params = [step.path.map((value) => value.toString()), step.amountInBn, step.minAmountOutBn, signer.getAddress(), futureTs];
                    break;
                case SwapType.VIRTUAL:
                    functionName = 'swapReserveExactTokensForTokens'; 
                    params = [step.path.map((value) => value.toString()), step.amountInBn, step.minAmountOutBn, signer.getAddress(), futureTs];
                    break;
                default:
            }
            return routerContract.interface.encodeFunctionData(functionName, params);
        });
        await routerContract.multicall(multicallData);
    }

    private pairsCache: Array<Pair>;
    private directedPairsCache: Map<string, DirectedPair>;

    private getSwapCandidates(tokenIn: Token, tokenOut: Token, blockNumber: number): Array<SwapCandidate> {
        return this.getVirtualSwapPairs(tokenIn, tokenOut, blockNumber).map(
            ([jkPool, ikPool]) => 
            new ReserveCandidate(jkPool, ikPool) as SwapCandidate
        ).concat(this.getTriangularSwapPairs(tokenIn, tokenOut).map(
            ([triangularPool0, triangularPool1]) => 
            new TriangularCandidate(triangularPool0, triangularPool1) as SwapCandidate
        )).concat(this.getDirectSwapPairs(tokenIn, tokenOut).map((directedPool) =>
            new DirectCandidate(directedPool) as SwapCandidate
        ));
    }

    private getOrCreateDirectedPair(
        address: Address,
        token0: TokenWithBalance,
        token1: TokenWithBalance,
        referenceToken: Token,
        fee: number,
        vFee: number,
        maxReserveRatio: number,
        reserves: Array<PairReserve>,
    ): DirectedPair {
        if (!this.directedPairsCache.has(address.address)) {
            const newDirectedPair = new DirectedPair(
                address,
                token0,
                token1,
                referenceToken,
                reserves,
                maxReserveRatio,
                fee,
                vFee,
            );
            this.directedPairsCache.set(address.address, newDirectedPair);
        }
        return this.directedPairsCache.get(address.address)!;
    }

    private getDirectSwapPairs(tokenIn: Token, tokenOut: Token): Array<DirectedPair> {
        return this.pairsCache
            .filter(
                (pair) =>
                    pair.hasTokenWithAddress(tokenIn.address) &&
                    pair.hasTokenWithAddress(tokenOut.address)
            )
            .map((pair) => this.getOrCreateDirectedPair(
                        pair.address,
                        tokenIn.address.eq(pair.token0.address) ? pair.token0 : pair.token1,
                        tokenOut.address.eq(pair.token0.address) ? pair.token0 : pair.token1,
                        pair.token0,
                        pair.fee,
                        pair.vFee,
                        pair.maxReserveRatio,
                        pair.reserves,
                    ));
    }

    private getTriangularSwapPairs(tokenIn: Token, tokenOut: Token) {
        let result: Array<Array<DirectedPair>> = [];
        const candidatesIn = this.pairsCache.filter((pair) => pair.hasTokenWithAddress(tokenIn.address));
        const candidatesOut = this.pairsCache.filter((pair) => pair.hasTokenWithAddress(tokenOut.address));
        candidatesIn.forEach((pair0) => {
            candidatesOut.forEach((pair1) => {
                if (pair0.address.neq(pair1.address) && pair0.hasCommonTokenWith(pair1)) {
                    const commonToken = pair0.getCommonToken(pair1)!;
                    const triangularSwapPair0 =
                        this.getOrCreateDirectedPair(
                            pair0.address,
                            tokenIn.address.eq(pair0.token0.address) ? pair0.token0 : pair0.token1,
                            commonToken.address.eq(pair0.token0.address) ? pair0.token0 : pair0.token1,
                            pair0.token0,
                            pair0.fee,
                            pair0.vFee,
                            pair0.maxReserveRatio,
                            pair0.reserves,
                        );
                    const triangularSwapPair1 =
                        this.getOrCreateDirectedPair(
                            pair1.address,
                            commonToken.address.eq(pair1.token0.address) ? pair1.token0 : pair1.token1,
                            tokenOut.address.eq(pair1.token0.address) ? pair1.token0 : pair1.token1,
                            pair1.token0,
                            pair1.fee,
                            pair1.vFee,
                            pair1.maxReserveRatio,
                            pair1.reserves,
                        );
                    result.push([
                        triangularSwapPair0,
                        triangularSwapPair1,
                    ]);
                }
            });
        });
        return result;
    }

    private getVirtualSwapPairs(tokenIn: Token, tokenOut: Token, blockNumber: number) {
        let result: [DirectedPair, DirectedPair][] = [];
        const jkCandidates = this.pairsCache
            .filter(
                (pair) =>
                    pair.allowsTokenAsReserve(tokenIn.address) &&
                    pair.hasTokenWithAddress(tokenOut.address)
            );
        const ikCandidates = this.pairsCache
                    .filter(
                        (pair) =>
                            pair.hasTokenWithAddress(tokenIn.address) &&
                            !pair.hasTokenWithAddress(tokenOut.address) &&
                            !pair.isBlockedForVirtualTrading(blockNumber)
                    );

        jkCandidates.forEach((jkPair) => {
                ikCandidates.forEach((ikPair) => {
                    if (ikPair.hasCommonTokenWith(jkPair)) {
                        const commonToken = ikPair.getCommonToken(jkPair)!;
                        if (commonToken.address.neq(tokenIn.address)) {
                            result.push([
                                this.getOrCreateDirectedPair(
                                    jkPair.address,
                                    commonToken.address.eq(jkPair.token0.address) ? jkPair.token0 : jkPair.token1,
                                    tokenOut.address.eq(jkPair.token0.address) ? jkPair.token0 : jkPair.token1,
                                    jkPair.token0,
                                    jkPair.fee,
                                    jkPair.vFee,
                                    jkPair.maxReserveRatio,
                                    jkPair.reserves,
                                ),
                                this.getOrCreateDirectedPair(
                                    ikPair.address,
                                    tokenIn.address.eq(ikPair.token0.address) ? ikPair.token0 : ikPair.token1,
                                    commonToken.address.eq(ikPair.token0.address) ? ikPair.token0 : ikPair.token1,
                                    ikPair.token0,
                                    ikPair.fee,
                                    ikPair.vFee,
                                    ikPair.maxReserveRatio,
                                    ikPair.reserves,
                                ),
                            ]);
                        }
                    }
                });
            });
        return result;
    }

    private calculateRouteAmountsOut(
        candidates: Array<SwapCandidate>,
        route: Array<ethers.BigNumber>
    ): Array<ethers.BigNumber> {
        let localCandidates = _.cloneDeep(candidates);
        let amountsOut = new Array(candidates.length).fill(
            ethers.BigNumber.from(0)
        );
        try {
            for (let k = 0; k < localCandidates.length; ++k) {
                if (!route[k].isZero()) {
                    amountsOut[k] = localCandidates[k].getAmountOut(route[k]);
                    localCandidates[k].emulateTrade(route[k]);
                }
            }
        } catch (e) {
            amountsOut = amountsOut.fill(ethers.BigNumber.from(0));
        }
        return amountsOut;
    }
}

interface SwapCandidate {
    readonly pair: DirectedPair;

    getAmountOut(amountIn: ethers.BigNumber): ethers.BigNumber;

    emulateTrade(amountIn: ethers.BigNumber): void;

    routeNode(amountIn: ethers.BigNumber, amountOut: ethers.BigNumber, minAmountOut: ethers.BigNumber): RouteNode;
}

class DirectCandidate implements SwapCandidate {
    readonly pair: DirectedPair;

    constructor(directedPair: DirectedPair) {
        this.pair = directedPair;
    }

    getAmountOut(amountIn: ethers.BigNumber): ethers.BigNumber {
        return this.pair.getAmountOut(amountIn);
    }

    emulateTrade(amountIn: ethers.BigNumber): void {
        this.pair.swapExactInput(amountIn);
    }

    routeNode(amountIn: ethers.BigNumber, amountOut: ethers.BigNumber, minAmountOut: ethers.BigNumber): RouteNode {
        return {
            amountInBn: amountIn,
            amountOutBn: amountOut,
            minAmountOutBn: minAmountOut,
            type: SwapType.DIRECT,
            path: [this.pair.token0.address, this.pair.token1.address],
        };
    }
}

class TriangularCandidate implements SwapCandidate {
    readonly pair: DirectedPair;
    readonly secondaryPair: DirectedPair;

    constructor(pair0: DirectedPair, pair1: DirectedPair) {
        this.pair = pair0;
        this.secondaryPair = pair1;
    }

    getAmountOut(amountIn: ethers.BigNumber): ethers.BigNumber {
        return this.secondaryPair.getAmountOut(
            this.pair.getAmountOut(amountIn)
        );
    }

    emulateTrade(amountIn: ethers.BigNumber): void {
        this.secondaryPair.swapExactInput(this.pair.swapExactInput(amountIn));
    }

    routeNode(amountIn: ethers.BigNumber, amountOut: ethers.BigNumber, minAmountOut: ethers.BigNumber): RouteNode {
        return {
            amountInBn: amountIn,
            amountOutBn: amountOut,
            minAmountOutBn: minAmountOut,
            type: SwapType.TRIANGULAR,
            path: [this.pair.token0.address, this.pair.token1.address, this.secondaryPair.token1.address],
        };
    }
}

class ReserveCandidate implements SwapCandidate {
    readonly pair: DirectedPair;
    readonly referencePair: DirectedPair;

    constructor(jkPair: DirectedPair, ikPair: DirectedPair) {
        this.referencePair = ikPair;
        this.pair = jkPair;
    }

    getAmountOut(amountIn: ethers.BigNumber): ethers.BigNumber {
        const ret = this.pair.trySwapReserveToNative(
            TokenWithBalance.fromBigNumber(this.referencePair.token0, amountIn),
            this.virtualPair
        );
        return ret.length == 0
            ? ethers.BigNumber.from(0)
            : this.virtualPair.getAmountOut(amountIn);
    }

    emulateTrade(amountIn: ethers.BigNumber): void {
        this.pair.swapReserveToNative(
            TokenWithBalance.fromBigNumber(this.referencePair.token0, amountIn),
            this.virtualPair
        );
    }

    routeNode(amountIn: ethers.BigNumber, amountOut: ethers.BigNumber, minAmountOut: ethers.BigNumber): RouteNode {
        return {
            amountInBn: amountIn,
            amountOutBn: amountOut,
            minAmountOutBn: minAmountOut,
            type: SwapType.VIRTUAL,
            path: [this.referencePair.token0.address, this.pair.token0.address, this.pair.token1.address],
        };
    }

    private get virtualPair() {
        const minCommonTokenBalance = this.referencePair.token1.balanceBN.lt(
            this.pair.token0.balanceBN
        )
            ? this.referencePair.token1.balanceBN
            : this.pair.token0.balanceBN;
        return new DirectedPair(
            new Address(''),
            TokenWithBalance.fromBigNumber(this.referencePair.token0, this.referencePair.token0.balanceBN.mul(minCommonTokenBalance).div(this.referencePair.token1.balanceBN)),
            TokenWithBalance.fromBigNumber(this.pair.token1, this.pair.token1.balanceBN.mul(minCommonTokenBalance).div(this.pair.token0.balanceBN)),
            this.pair.token1,
            [],
            0,
            this.pair.vFee,
            this.pair.vFee,
        );
    }
}


class DirectedPair {
    static PRICE_FEE_FACTOR = 1000;
    static RESERVE_RATIO_FACTOR = 100000;

    readonly address: Address;
    readonly token0: TokenWithBalance;
    readonly token1: TokenWithBalance;
    readonly referenceToken: Token;
    readonly reserves: Array<PairReserve>;
    readonly maxReserveRatio: number;
    readonly fee: number;
    readonly vFee: number;

    constructor(address: Address, token0: TokenWithBalance, token1: TokenWithBalance, referenceToken: Token, reserves: Array<PairReserve>, maxReserveRatio: number, fee: number, vFee: number) {
        this.address = address;
        this.token0 = token0;
        this.token1 = token1;
        this.referenceToken = referenceToken;
        this.reserves = reserves;
        this.maxReserveRatio = maxReserveRatio;
        this.fee = fee;
        this.vFee = vFee;
    }

    trySwapReserveToNative(
        reserveToken: TokenWithBalance,
        virtualPair: DirectedPair
    ): Array<any> {
        const emptyReserve: PairReserve = PairReserve.empty(this.referenceToken, reserveToken);
        const amountOut = virtualPair.getAmountOut(reserveToken.balanceBN);
        if (amountOut.gt(this.token1.balanceBN))
            throw new Error('AmountOut is greater than balance1');

        const updatedBalance1 = this.token1.balanceBN.sub(amountOut);

        const updatedReserve = this.calculateUpdatedReservesBalance(
            reserveToken,
            virtualPair
        );

        const currentRes =
            this.reserves.find(
                (res) =>
                    res.reserveToken.address.eq(reserveToken.address)) ?? emptyReserve;

        const rbvSum = this.reserves
            .reduce(
                (result, current) => result.add(current.baseToken.balanceBN),
                ethers.BigNumber.from('0')
            )
            .sub(currentRes.baseToken.balanceBN)
            .add(updatedReserve.baseToken.balanceBN);

        const newReserveRatio = rbvSum
            .mul(DirectedPair.RESERVE_RATIO_FACTOR)
            .div((this.token0.address.eq(this.referenceToken.address)
                    ? this.token0.balanceBN
                    : updatedBalance1).mul(2)
            );

        return newReserveRatio.lte(this.maxReserveRatio)
            ? [
                  updatedReserve,
                  updatedBalance1,
              ]
            : [];
    }

    getAmountOut(amountIn: ethers.BigNumber): ethers.BigNumber {
        return amountIn
            .mul(this.fee)
            .mul(this.token1.balanceBN)
            .div(
                this.token0.balanceBN
                    .mul(DirectedPair.PRICE_FEE_FACTOR)
                    .add(amountIn.mul(this.fee))
            );
    }

    swapExactInput(amountIn: ethers.BigNumber): ethers.BigNumber {
        const amountOut = this.getAmountOut(amountIn);
        if (amountOut.gt(this.token1.balanceBN))
            throw new Error('AmountOut is greater than balance1');
        this.token0.balanceBN = this.token1.balanceBN.add(amountIn);
        this.token1.balanceBN = this.token1.balanceBN.sub(amountOut);
        return amountOut;
    }

    swapReserveToNative(
        reserveToken: TokenWithBalance,
        virtualPool: DirectedPair
    ): void {
        const ret = this.trySwapReserveToNative(
            reserveToken,
            virtualPool
        );
        if (ret.length > 0) {
            const idx = this.reserves.findIndex(
                (reserve) =>
                    reserve.reserveToken.address.eq(reserveToken.address)
            );
            this.reserves.splice(idx, idx == -1 ? 0 : 1, ret[0])
            this.token1.balanceBN = ret[1];
        } else {
            throw new Error('Failed to swap reserve to native');
        }
    }

    private calculateUpdatedReservesBalance(
        reserveToken: TokenWithBalance,
        virtualPair: DirectedPair
    ): PairReserve {
        const emptyReserve: PairReserve = PairReserve.empty(this.referenceToken, reserveToken);
        const currentReserves =
            this.reserves.find(
                (reserve) =>
                    reserve.reserveToken.address.eq(reserveToken.address)
            ) ?? emptyReserve;
        currentReserves.reserveToken.balanceBN = reserveToken.balanceBN.add(currentReserves.reserveToken.balanceBN);
        currentReserves.baseToken.balanceBN = virtualPair.token1.balanceBN
            .mul(currentReserves.reserveToken.balanceBN)
            .div(virtualPair.token0.balanceBN);
        if (virtualPair.token1.address.neq(this.referenceToken.address)) {
            currentReserves.baseToken.balanceBN = currentReserves.baseToken.balanceBN
                .mul(this.token0.balanceBN)
                .div(this.token1.balanceBN);
        }
        return currentReserves;
    }
}
