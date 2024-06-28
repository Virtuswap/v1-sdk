import { ethers } from 'ethers';

import { DirectedPair } from './directedPair';

import { TokenWithBalance } from '../../entities/token';
import {
    RouteNode,
    BaseRouteNode,
    ReserveRouteNode,
    SwapType,
} from '../entities';

export interface SwapCandidate {
    readonly pair: DirectedPair;

    getMaxAmountOut(): ethers.BigNumber;

    getAmountOut(amountIn: ethers.BigNumber): ethers.BigNumber;

    getAmountIn(amountIn: ethers.BigNumber): ethers.BigNumber;

    emulateTrade(amount: ethers.BigNumber, isExactInput: boolean): void;

    revert(): void;

    routeNode(
        amountIn: ethers.BigNumber,
        amountOut: ethers.BigNumber,
        minAmountOut: ethers.BigNumber
    ): RouteNode;
}

export class DirectCandidate implements SwapCandidate {
    readonly pair: DirectedPair;

    constructor(directedPair: DirectedPair) {
        this.pair = directedPair;
    }

    getMaxAmountOut(): ethers.BigNumber {
        const maxAmountOut = this.pair.token1.balanceBN;
        return maxAmountOut.isZero() ? maxAmountOut : maxAmountOut.sub(1);
    }

    getAmountOut(amountIn: ethers.BigNumber): ethers.BigNumber {
        return this.pair.getAmountOut(amountIn);
    }

    getAmountIn(amountOut: ethers.BigNumber): ethers.BigNumber {
        return this.pair.getAmountIn(amountOut);
    }

    emulateTrade(amount: ethers.BigNumber, isExactInput: boolean): void {
        isExactInput
            ? this.pair.swapExactInput(amount)
            : this.pair.swapExactOutput(amount);
    }

    revert(): void {
        this.pair.revert();
    }

    routeNode(
        amountIn: ethers.BigNumber,
        amountOut: ethers.BigNumber,
        slippageThresholdAmountBn: ethers.BigNumber
    ): BaseRouteNode {
        return {
            amountInBn: amountIn,
            amountOutBn: amountOut,
            slippageThresholdAmountBn: slippageThresholdAmountBn,
            type: SwapType.DIRECT,
            path: [this.pair.token0, this.pair.token1],
        };
    }
}

export class TriangularCandidate implements SwapCandidate {
    readonly pair: DirectedPair;
    readonly secondaryPair: DirectedPair;

    constructor(pair0: DirectedPair, pair1: DirectedPair) {
        this.pair = pair0;
        this.secondaryPair = pair1;
    }

    getMaxAmountOut(): ethers.BigNumber {
        const maxAmountOutSecPair = this.secondaryPair.token1.balanceBN;
        const maxAmountOutPrimPair = this.pair.token1.balanceBN;

        const maxAmountOut = maxAmountOutSecPair.gt(maxAmountOutPrimPair)
            ? maxAmountOutPrimPair
            : maxAmountOutSecPair;

        return maxAmountOut.isZero() ? maxAmountOut : maxAmountOut.sub(1);
    }

    getAmountOut(amountIn: ethers.BigNumber): ethers.BigNumber {
        return this.secondaryPair.getAmountOut(
            this.pair.getAmountOut(amountIn)
        );
    }

    getAmountIn(amountOut: ethers.BigNumber): ethers.BigNumber {
        return this.pair.getAmountIn(this.secondaryPair.getAmountIn(amountOut));
    }

    emulateTrade(amount: ethers.BigNumber, isExactInput: boolean): void {
        isExactInput
            ? this.secondaryPair.swapExactInput(
                  this.pair.swapExactInput(amount)
              )
            : this.pair.swapExactOutput(
                  this.secondaryPair.swapExactOutput(amount)
              );
    }

    revert(): void {
        this.pair.revert();
        this.secondaryPair.revert();
    }

    routeNode(
        amountIn: ethers.BigNumber,
        amountOut: ethers.BigNumber,
        slippageThresholdAmount: ethers.BigNumber
    ): BaseRouteNode {
        return {
            amountInBn: amountIn,
            amountOutBn: amountOut,
            slippageThresholdAmountBn: slippageThresholdAmount,
            type: SwapType.TRIANGULAR,
            path: [
                this.pair.token0,
                this.pair.token1,
                this.secondaryPair.token1,
            ],
        };
    }
}

export class ReserveCandidate implements SwapCandidate {
    readonly pair: DirectedPair;
    readonly referencePair: DirectedPair;

    constructor(jkPair: DirectedPair, ikPair: DirectedPair) {
        this.referencePair = ikPair;
        this.pair = jkPair;
    }

    getMaxAmountOut(): ethers.BigNumber {
        let l = ethers.BigNumber.from(0);
        let r = this.virtualPair.token1.balanceBN.sub(1);
        while (r.sub(l).gt(1)) {
            const mid = l.add(r).div(2);
            if (!this.getAmountIn(mid).isZero()) l = mid;
            else r = mid;
        }
        return l;
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

    getAmountIn(amountOut: ethers.BigNumber): ethers.BigNumber {
        const ret = this.pair.trySwapReserveToNative(
            TokenWithBalance.fromBigNumber(
                this.referencePair.token0,
                amountOut
            ),
            this.virtualPair
        );
        return ret.length == 0
            ? ethers.BigNumber.from(0)
            : this.virtualPair.getAmountIn(amountOut);
    }

    emulateTrade(amount: ethers.BigNumber, isExactInput: boolean): void {
        this.pair.swapReserveToNative(
            TokenWithBalance.fromBigNumber(
                this.referencePair.token0,
                isExactInput ? amount : this.virtualPair.getAmountIn(amount)
            ),
            this.virtualPair
        );
    }

    revert(): void {
        this.pair.revert();
        this.referencePair.revert();
    }

    routeNode(
        amountIn: ethers.BigNumber,
        amountOut: ethers.BigNumber,
        slippageThresholdAmount: ethers.BigNumber
    ): ReserveRouteNode {
        return {
            amountInBn: amountIn,
            amountOutBn: amountOut,
            slippageThresholdAmountBn: slippageThresholdAmount,
            type: SwapType.VIRTUAL,
            ikPair: this.referencePair.address,
            jkPair: this.pair.address,
            path: [
                this.referencePair.token0,
                this.pair.token0,
                this.pair.token1,
            ],
        };
    }

    private get virtualPair() {
        const minCommonTokenBalance = this.referencePair.token1.balanceBN.lt(
            this.pair.token0.balanceBN
        )
            ? this.referencePair.token1.balanceBN
            : this.pair.token0.balanceBN;
        return new DirectedPair(
            ethers.constants.AddressZero,
            TokenWithBalance.fromBigNumber(
                this.referencePair.token0,
                this.referencePair.token0.balanceBN
                    .mul(minCommonTokenBalance)
                    .div(this.referencePair.token1.balanceBN)
            ),
            TokenWithBalance.fromBigNumber(
                this.pair.token1,
                this.pair.token1.balanceBN
                    .mul(minCommonTokenBalance)
                    .div(this.pair.token0.balanceBN)
            ),
            this.pair.token1,
            [],
            0,
            this.pair.vFee,
            this.pair.vFee
        );
    }
}
