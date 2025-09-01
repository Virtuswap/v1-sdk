import { ethers } from 'ethers';

import { DirectedPair } from './directedPair';

import { PairReserve, TokenWithBalance } from '../../entities';
import {
    RouteNode,
    BaseRouteNode,
    ReserveRouteNode,
    SwapType,
} from '../entities';

export interface SwapCandidate {
    readonly pair: DirectedPair;
    readonly type: SwapType;

    getMaxAmountOut(): ethers.BigNumber;

    getAmountOut(amountIn: ethers.BigNumber): ethers.BigNumber;

    getAmountIn(amountIn: ethers.BigNumber): ethers.BigNumber;

    emulateTrade(amount: ethers.BigNumber, isExactInput: boolean): void;

    revert(): void;

    routeNode(
        amountIn: ethers.BigNumber,
        amountOut: ethers.BigNumber,
        slippageThresholdAmount: ethers.BigNumber,
        calculateMetrics?: boolean,
        weight?: number
    ): RouteNode;
}

export class DirectCandidate implements SwapCandidate {
    readonly pair: DirectedPair;

    constructor(directedPair: DirectedPair) {
        this.pair = directedPair;
    }

    get type() {
        return SwapType.DIRECT;
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
        slippageThresholdAmount: ethers.BigNumber,
        calculateMetrics = false,
        weight?: number
    ): BaseRouteNode {
        return {
            amountInBn: amountIn,
            amountOutBn: amountOut,
            slippageThresholdAmountBn: slippageThresholdAmount,
            type: this.type,
            path: [this.pair.token0, this.pair.token1],
            metrics: calculateMetrics
                ? this.calculateNativeTradeMetrics(amountIn)
                : undefined,
            weight,
        };
    }

    private calculateNativeTradeMetrics(amountInBn: ethers.BigNumber) {
        const reverseFee = this.pair.fee / DirectedPair.PRICE_FEE_FACTOR;
        const fee =
            (DirectedPair.PRICE_FEE_FACTOR - this.pair.fee) /
            DirectedPair.PRICE_FEE_FACTOR;

        const amountIn = parseFloat(
            ethers.utils.formatUnits(amountInBn, this.pair.token0.decimals)
        );
        const vLiqA = parseFloat(this.pair.token0.balance);
        const vLiqB = parseFloat(this.pair.token1.balance);

        const impliedAmountOutV = amountIn * (vLiqB / vLiqA);

        const amountOutV =
            (amountIn * reverseFee * vLiqB) / (amountIn * reverseFee + vLiqA);

        const priceImpact =
            (impliedAmountOutV - amountOutV) / impliedAmountOutV - fee;

        return {
            impliedAmountOutV,
            amountOutV,
            priceImpact,
            fee,
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

    get type() {
        return SwapType.TRIANGULAR;
    }

    getMaxAmountOut(): ethers.BigNumber {
        const maxAmountOut1 = this.pair.token1.balanceBN;
        return maxAmountOut1.isZero()
            ? ethers.constants.Zero
            : this.secondaryPair.getAmountOut(maxAmountOut1.sub(1));
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
        slippageThresholdAmount: ethers.BigNumber,
        calculateMetrics = false,
        weight?: number
    ): BaseRouteNode {
        return {
            amountInBn: amountIn,
            amountOutBn: amountOut,
            slippageThresholdAmountBn: slippageThresholdAmount,
            type: this.type,
            path: [
                this.pair.token0,
                this.pair.token1,
                this.secondaryPair.token1,
            ],
            metrics: calculateMetrics
                ? this.calculateTriangularTradeMetrics(amountIn)
                : undefined,
            weight,
        };
    }

    private calculateTriangularTradeMetrics(amountInBn: ethers.BigNumber) {
        const amountIn = parseFloat(
            ethers.utils.formatUnits(amountInBn, this.pair.token0.decimals)
        );

        const reverseFee0 = this.pair.fee / DirectedPair.PRICE_FEE_FACTOR;
        const fee0 =
            (DirectedPair.PRICE_FEE_FACTOR - this.pair.fee) /
            DirectedPair.PRICE_FEE_FACTOR;
        const reverseFee1 =
            this.secondaryPair.fee / DirectedPair.PRICE_FEE_FACTOR;
        const fee1 =
            (DirectedPair.PRICE_FEE_FACTOR - this.secondaryPair.fee) /
            DirectedPair.PRICE_FEE_FACTOR;

        const poolABalance0 = parseFloat(this.pair.token0.balance);
        const poolABalance1 = parseFloat(this.pair.token1.balance);
        const poolBBalance0 = parseFloat(this.secondaryPair.token0.balance);
        const poolBBalance1 = parseFloat(this.secondaryPair.token1.balance);

        const amountOutLeg0 =
            (amountIn * reverseFee0 * poolABalance1) /
            (amountIn * reverseFee0 + poolABalance0);

        const amountOutLeg1 =
            (amountOutLeg0 * reverseFee1 * poolBBalance1) /
            (amountOutLeg0 * reverseFee1 + poolBBalance0);

        const feeWithImpact =
            1 -
            amountOutLeg1 /
                (amountIn *
                    (poolABalance1 / poolABalance0) *
                    (poolBBalance1 / poolBBalance0));

        const totalFee =
            amountIn > 0
                ? (amountIn * fee0 +
                      amountOutLeg0 * (poolABalance0 / poolABalance1) * fee1) /
                  amountIn
                : fee0 + fee1;

        const priceImpact = feeWithImpact - totalFee;

        return { feeWithImpact, fee: totalFee, priceImpact };
    }
}

export class ReserveCandidate implements SwapCandidate {
    readonly pair: DirectedPair;
    readonly referencePair: DirectedPair;

    constructor(jkPair: DirectedPair, ikPair: DirectedPair) {
        this.referencePair = ikPair;
        this.pair = jkPair;
    }

    get type() {
        return SwapType.VIRTUAL;
    }

    getMaxVirtualTradeAmountRtoN(): ethers.BigNumber {
        const vPair = this.virtualPair;
        const fee = ethers.BigNumber.from(vPair.fee);
        const [referenceBalance, secondBalance] =
            this.pair.token0.address === this.pair.referenceToken.address
                ? [this.pair.token0.balanceBN, this.pair.token1.balanceBN]
                : [this.pair.token1.balanceBN, this.pair.token0.balanceBN];
        const vBalance0 = vPair.token0.balanceBN;
        const vBalance1 = vPair.token1.balanceBN;
        const reserveRatioFactor = ethers.BigNumber.from(
            DirectedPair.RESERVE_RATIO_FACTOR
        );
        const priceFeeFactor = ethers.BigNumber.from(
            DirectedPair.PRICE_FEE_FACTOR
        );
        const maxReserveRatio = ethers.BigNumber.from(
            this.pair.maxReserveRatio
        );
        const pairReserve =
            this.pair.reserves.find(
                (r) => r.reserveToken.address === vPair.token0.address
            ) ?? PairReserve.empty(this.pair.referenceToken, vPair.token0);
        const reserves = pairReserve.reserveToken.balanceBN;
        const reservesBaseValueSum = this.pair.reserves
            .reduce(
                (result, current) => result.add(current.baseToken.balanceBN),
                ethers.constants.Zero
            )
            .sub(pairReserve.baseToken.balanceBN);

        if (
            referenceBalance.lte(0) ||
            secondBalance.lte(0) ||
            vBalance0.lte(0) ||
            vBalance1.lte(0)
        ) {
            return ethers.constants.Zero;
        }

        // reserves are full, the answer is 0
        if (
            reservesBaseValueSum.gte(
                referenceBalance.mul(maxReserveRatio).mul(2)
            )
        )
            return ethers.constants.Zero;

        let maxAmountIn: ethers.BigNumber;
        if (this.pair.referenceToken.address === vPair.token1.address) {
            if (vBalance1.gt(referenceBalance)) return ethers.constants.Zero;
            const a = vBalance1.mul(reserveRatioFactor);
            const b = vBalance0
                .mul(
                    referenceBalance
                        .mul(maxReserveRatio)
                        .mul(-2)
                        .add(
                            vBalance1
                                .mul(
                                    maxReserveRatio
                                        .mul(2)
                                        .add(
                                            priceFeeFactor
                                                .mul(reserveRatioFactor)
                                                .div(fee)
                                        )
                                )
                                .add(
                                    reserveRatioFactor.mul(reservesBaseValueSum)
                                )
                        )
                )
                .add(reserves.mul(reserveRatioFactor).mul(vBalance1));

            const c = priceFeeFactor
                .mul(vBalance0)
                .div(fee)
                .mul(
                    referenceBalance
                        .mul(maxReserveRatio)
                        .mul(vBalance0)
                        .mul(2)
                        .sub(
                            reserveRatioFactor.mul(
                                reserves
                                    .mul(vBalance1)
                                    .add(reservesBaseValueSum.mul(vBalance0))
                            )
                        )
                );

            maxAmountIn = vBalance0;

            // Newton's method
            for (let i = 0; i < 7; i++) {
                const oldMaxAmountIn = maxAmountIn;
                const derivative = a.mul(2).mul(maxAmountIn).add(b);

                maxAmountIn = a
                    .mul(maxAmountIn.mul(maxAmountIn))
                    .add(c)
                    .div(derivative);

                if (oldMaxAmountIn.sub(maxAmountIn).isZero()) break;
            }
        } else {
            if (vBalance1.gt(secondBalance)) return ethers.constants.Zero;
            maxAmountIn = secondBalance
                .mul(vBalance0)
                .mul(
                    referenceBalance
                        .mul(maxReserveRatio)
                        .mul(2)
                        .sub(reserveRatioFactor.mul(reservesBaseValueSum))
                )
                .div(referenceBalance.mul(reserveRatioFactor).mul(vBalance1))
                .sub(reserves);
        }
        if (maxAmountIn.isNegative()) return ethers.constants.Zero;
        return maxAmountIn;
    }

    getMaxAmountOut(): ethers.BigNumber {
        const maxAmountIn = this.getMaxVirtualTradeAmountRtoN();
        return this.getAmountOut(maxAmountIn);
    }

    getAmountOut(amountIn: ethers.BigNumber): ethers.BigNumber {
        if (amountIn.isZero()) return ethers.constants.Zero;
        const ret = this.pair.trySwapReserveToNative(
            TokenWithBalance.fromBigNumber(this.referencePair.token0, amountIn),
            this.virtualPair
        );
        return ret.length == 0
            ? ethers.constants.Zero
            : this.virtualPair.getAmountOut(amountIn);
    }

    getAmountIn(amountOut: ethers.BigNumber): ethers.BigNumber {
        const amountIn = this.virtualPair.getAmountIn(amountOut);
        const ret = this.pair.trySwapReserveToNative(
            TokenWithBalance.fromBigNumber(this.referencePair.token0, amountIn),
            this.virtualPair
        );
        return ret.length == 0 ? ethers.constants.Zero : amountIn;
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
        slippageThresholdAmount: ethers.BigNumber,
        calculateMetrics = false,
        weight?: number
    ): ReserveRouteNode {
        return {
            amountInBn: amountIn,
            amountOutBn: amountOut,
            slippageThresholdAmountBn: slippageThresholdAmount,
            type: this.type,
            ikPair: this.referencePair.address,
            jkPair: this.pair.address,
            path: [
                this.referencePair.token0,
                this.pair.token0,
                this.pair.token1,
            ],
            metrics: calculateMetrics
                ? this.calculateVirtualTradeMetrics(amountIn)
                : undefined,
            weight,
        };
    }

    private calculateVirtualTradeMetrics(amountInBn: ethers.BigNumber) {
        const vPair = this.virtualPair;

        const vLiqA = parseFloat(vPair.token0.balance);
        const vLiqC = parseFloat(vPair.token1.balance);

        const reverseFeeV = vPair.fee / DirectedPair.PRICE_FEE_FACTOR;
        const feeV =
            (DirectedPair.PRICE_FEE_FACTOR - vPair.fee) /
            DirectedPair.PRICE_FEE_FACTOR;

        const amountIn = parseFloat(
            ethers.utils.formatUnits(
                amountInBn,
                this.referencePair.token0.decimals
            )
        );

        const reverseFee0 =
            this.referencePair.fee / DirectedPair.PRICE_FEE_FACTOR;
        const reverseFee1 = this.pair.fee / DirectedPair.PRICE_FEE_FACTOR;

        const poolABalance0 = parseFloat(this.referencePair.token0.balance);
        const poolABalance1 = parseFloat(this.referencePair.token1.balance);
        const poolBBalance0 = parseFloat(this.pair.token0.balance);
        const poolBBalance1 = parseFloat(this.pair.token1.balance);

        const impliedAmountOutV = amountIn * (vLiqC / vLiqA);

        const amountOutV =
            (amountIn * reverseFeeV * vLiqC) / (amountIn * reverseFeeV + vLiqA);

        const tradeCostV = impliedAmountOutV - amountOutV;

        const impliedAmountOutU =
            amountIn *
            (poolABalance1 / poolABalance0) *
            (poolBBalance1 / poolBBalance0);

        const output1 =
            (amountIn * reverseFee0 * poolABalance1) /
            (amountIn * reverseFee0 + poolABalance0);

        const amountOutU =
            (output1 * reverseFee1 * poolBBalance1) /
            (output1 * reverseFee1 + poolBBalance0);

        const TradeCostU = impliedAmountOutU - amountOutU;

        let vSwapSavings = ((TradeCostU - tradeCostV) / TradeCostU) * 100;

        const priceImpact =
            (impliedAmountOutV - amountOutV) / impliedAmountOutV - feeV;

        if (vSwapSavings < 0) vSwapSavings = 0;

        return {
            impliedAmountOutV,
            amountOutV,
            tradeCostV,
            impliedAmountOutU,
            output1,
            amountOutU,
            TradeCostU,
            vSwapSavings,
            priceImpact,
            fee: feeV,
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
