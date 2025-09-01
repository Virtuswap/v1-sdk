import { ethers } from 'ethers';

import { Token, TokenWithBalance } from '../entities/token';
import { Chain } from '../entities/chain';

export enum SwapType {
    DIRECT,
    TRIANGULAR,
    VIRTUAL,
}

export type RouteNodeMetrics = {
    priceImpact: number;
    fee: number;
    vSwapSavings?: number;
};

export type BaseRouteNode = {
    path: Array<Token>;
    type: SwapType;
    amountInBn: ethers.BigNumber;
    amountOutBn: ethers.BigNumber;
    slippageThresholdAmountBn: ethers.BigNumber;
    weight?: number;
    metrics?: RouteNodeMetrics;
};

export type ReserveRouteNode = BaseRouteNode & {
    ikPair: string;
    jkPair: string;
};

export type RouteNode = BaseRouteNode | ReserveRouteNode;

export type RouteMetrics = {
    realPoolPCT: number;
    vPoolPCT: number;
    triangularPCT: number;
    price0: number;
    price1: number;
    totalSavings: number;
    priceImpact: number;
    avgFee: number;
};

export type Route = {
    isExactInput: boolean;
    tokenIn: TokenWithBalance;
    tokenOut: TokenWithBalance;
    slippageThresholdAmount: TokenWithBalance;
    chain: Chain;
    steps: Array<RouteNode>;
    metrics?: RouteMetrics;
};

export type SwapOptions = {
    slippage: number;
    isExactInput: boolean;
    timeoutMs: number;
    calculateMetrics: boolean;
};
