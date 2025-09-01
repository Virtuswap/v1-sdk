import { MAX_UINT256, PRICE_FEE_FACTOR as PFF } from '../constants';

export function getAmountOut(amountIn: bigint, balanceIn: bigint, balanceOut: bigint, fee: bigint): bigint {
    if (balanceIn <= BigInt(0) || balanceOut <= BigInt(0) || amountIn <= BigInt(0)) return BigInt(0);
    const amountInWithFee = amountIn * fee;
    return  (amountInWithFee * balanceOut) / (balanceIn * PFF + amountInWithFee);
}

export function getAmountIn(amountOut: bigint, balanceIn: bigint, balanceOut: bigint, fee: bigint): bigint {
    if (balanceIn <= BigInt(0) || balanceOut <= BigInt(0) || amountOut <= BigInt(0)) return BigInt(0);
    const numerator = (balanceIn * amountOut) * PFF;
    const denominator = (balanceOut - amountOut) * fee;
    if (denominator <= BigInt(0)) return MAX_UINT256;
    return (numerator / denominator) + BigInt(1);
}
