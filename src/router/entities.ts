import { ethers } from 'ethers';

import { Token, TokenWithBalance } from '../entities/token';
import { Chain } from '../entities/chain';

export enum SwapType {
    DIRECT,
    TRIANGULAR,
    VIRTUAL,
}

export type BaseRouteNode = {
    path: Array<Token>;
    type: SwapType;
    amountInBn: ethers.BigNumber;
    amountOutBn: ethers.BigNumber;
    slippageThresholdAmountBn: ethers.BigNumber;
};

export type ReserveRouteNode = BaseRouteNode & {
    ikPair: string;
    jkPair: string;
};

export type RouteNode = BaseRouteNode | ReserveRouteNode;

export type Route = {
    isExactInput: boolean;
    tokenIn: TokenWithBalance;
    tokenOut: TokenWithBalance;
    slippageThresholdAmount: TokenWithBalance;
    amountInUsd: number;
    amountOutUsd: number;
    chain: Chain;
    steps: Array<RouteNode>;
};

export type SwapOptions = {
    slippage: number;
    isExactInput: boolean;
    timeoutMs: number;
};
