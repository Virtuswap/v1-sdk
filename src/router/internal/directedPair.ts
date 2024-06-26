import { ethers } from 'ethers';

import { Token, TokenWithBalance } from '../../entities/token';
import { PairReserve } from '../../entities/pair';

type DirectedPairMutablePairReserve = {
    index: number;
    value: PairReserve;
};

type DirectedPairMutableFields = {
    token0BalanceBN?: ethers.BigNumber;
    token1BalanceBN?: ethers.BigNumber;
    reserve?: DirectedPairMutablePairReserve;
};

export class DirectedPair {
    static PRICE_FEE_FACTOR = 1000;
    static RESERVE_RATIO_FACTOR = 100000;

    readonly address: string;
    readonly token0: TokenWithBalance;
    readonly token1: TokenWithBalance;
    readonly referenceToken: Token;
    readonly reserves: Array<PairReserve>;
    readonly maxReserveRatio: number;
    readonly fee: number;
    readonly vFee: number;

    private initialValues: DirectedPairMutableFields = {};

    constructor(
        address: string,
        token0: TokenWithBalance,
        token1: TokenWithBalance,
        referenceToken: Token,
        reserves: Array<PairReserve>,
        maxReserveRatio: number,
        fee: number,
        vFee: number
    ) {
        this.address = ethers.utils.getAddress(address);
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
    ): [PairReserve, ethers.BigNumber] | never[] {
        const emptyReserve: PairReserve = PairReserve.empty(
            this.referenceToken,
            reserveToken
        );
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
                (res) => res.reserveToken.address === reserveToken.address
            ) ?? emptyReserve;

        const rbvSum = this.reserves
            .reduce(
                (result, current) => result.add(current.baseToken.balanceBN),
                ethers.BigNumber.from('0')
            )
            .sub(currentRes.baseToken.balanceBN)
            .add(updatedReserve.baseToken.balanceBN);

        const newReserveRatio = rbvSum
            .mul(DirectedPair.RESERVE_RATIO_FACTOR)
            .div(
                (this.token0.address === this.referenceToken.address
                    ? this.token0.balanceBN
                    : updatedBalance1
                ).mul(2)
            );

        return newReserveRatio.lte(this.maxReserveRatio)
            ? ([updatedReserve, updatedBalance1] as const)
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

    getAmountIn(amountOut: ethers.BigNumber): ethers.BigNumber {
        return amountOut
            .mul(this.token0.balanceBN)
            .mul(DirectedPair.PRICE_FEE_FACTOR)
            .div(this.token1.balanceBN.sub(amountOut).mul(this.fee))
            .add(1);
    }

    revert() {
        if (this.initialValues.token0BalanceBN) {
            this.token0.balanceBN = this.initialValues.token0BalanceBN;
            this.initialValues.token0BalanceBN = undefined;
        }
        if (this.initialValues.token1BalanceBN) {
            this.token1.balanceBN = this.initialValues.token1BalanceBN;
            this.initialValues.token1BalanceBN = undefined;
        }
        if (this.initialValues.reserve) {
            this.reserves[this.initialValues.reserve.index] =
                this.initialValues.reserve.value;
            this.initialValues.reserve = undefined;
        }
    }

    swapExactInput(amountIn: ethers.BigNumber): ethers.BigNumber {
        const amountOut = this.getAmountOut(amountIn);
        if (amountOut.gt(this.token1.balanceBN))
            throw new Error('AmountOut is greater than balance1');
        if (!this.initialValues.token0BalanceBN) {
            this.initialValues.token0BalanceBN = this.token0.balanceBN;
        }
        if (!this.initialValues.token1BalanceBN) {
            this.initialValues.token1BalanceBN = this.token1.balanceBN;
        }
        this.token0.balanceBN = this.token0.balanceBN.add(amountIn);
        this.token1.balanceBN = this.token1.balanceBN.sub(amountOut);
        return amountOut;
    }

    swapExactOutput(amountOut: ethers.BigNumber): ethers.BigNumber {
        const amountIn = this.getAmountIn(amountOut);
        if (amountOut.gt(this.token1.balanceBN))
            throw new Error('AmountOut is greater than balance1');
        if (!this.initialValues.token0BalanceBN) {
            this.initialValues.token0BalanceBN = this.token0.balanceBN;
        }
        if (!this.initialValues.token1BalanceBN) {
            this.initialValues.token1BalanceBN = this.token1.balanceBN;
        }
        this.token0.balanceBN = this.token0.balanceBN.add(amountIn);
        this.token1.balanceBN = this.token1.balanceBN.sub(amountOut);
        return amountOut;
    }

    swapReserveToNative(
        reserveToken: TokenWithBalance,
        virtualPool: DirectedPair
    ): void {
        const ret = this.trySwapReserveToNative(reserveToken, virtualPool);
        if (ret.length > 0) {
            const idx = this.reserves.findIndex(
                (reserve) =>
                    reserve.reserveToken.address === reserveToken.address
            );
            if (!this.initialValues.token1BalanceBN) {
                this.initialValues.token1BalanceBN = this.token1.balanceBN;
            }
            if (!this.initialValues.reserve) {
                this.initialValues.reserve = {
                    index: idx == -1 ? this.reserves.length - 1 : idx,
                    value:
                        idx == -1
                            ? PairReserve.empty(
                                  this.referenceToken,
                                  reserveToken
                              )
                            : this.reserves[idx],
                };
            }
            this.reserves.splice(idx, idx == -1 ? 0 : 1, ret[0]);
            this.token1.balanceBN = ret[1];
        } else {
            throw new Error('Failed to swap reserve to native');
        }
    }

    private calculateUpdatedReservesBalance(
        reserveToken: TokenWithBalance,
        virtualPair: DirectedPair
    ): PairReserve {
        let currentReserves = PairReserve.empty(
            this.referenceToken,
            reserveToken
        );
        const prevReserves = this.reserves.find((reserve) =>
            reserve.reserveToken.address === reserveToken.address
        );
        currentReserves.reserveToken.balanceBN = reserveToken.balanceBN.add(
            prevReserves
                ? prevReserves.reserveToken.balanceBN
                : ethers.BigNumber.from(0)
        );
        currentReserves.baseToken.balanceBN = virtualPair.token1.balanceBN
            .mul(currentReserves.reserveToken.balanceBN)
            .div(virtualPair.token0.balanceBN);
        if (virtualPair.token1.address !== this.referenceToken.address) {
            currentReserves.baseToken.balanceBN =
                currentReserves.baseToken.balanceBN
                    .mul(this.token0.balanceBN)
                    .div(this.token1.balanceBN);
        }
        return currentReserves;
    }
}
