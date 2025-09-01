import { PRICE_FEE_FACTOR as PFF } from '../constants';
import { FConstants, FMaximums } from '../types';
import { BigIntRational } from '../utils/BigIntRational';
import { BigIntMath } from '../utils/BigIntMath';
import { getAmountOut } from './base';

// Get output for x virtual/direct input and y triangular input
export function F(x: bigint, y: bigint, c: FConstants): [bigint, bigint] {
    const {
        a_i, b_i, f_i,
        b_j, c_j, f_j,
        a_v, c_v, f_v,
    } = c;

    const out_t = getAmountOut(y, a_i, b_i, f_i);

    const out_1 = getAmountOut(x, a_v, c_v, f_v);

    const c_j_2 = c_j - out_1;

    const out_2 = getAmountOut(out_t, b_j, c_j_2, f_j);

    return [out_1, out_2];
}

export function autoF(amount: bigint, c: FConstants, max: FMaximums): bigint {
    const x = BigIntMath.min(amount, max.max_x);
    const y = amount - x;

    const [out_1, out_2] = F(x, y, c);

    return out_1 + out_2;
}

export function Fdx(x: bigint, y: bigint, c: FConstants): BigIntRational {
    const {
        a_i, b_i, f_i,
        b_j, c_j, f_j,
        a_v, c_v, f_v,
    } = c;

    if (a_v <= BigInt(0) || c_v <= BigInt(0) || f_v <= BigInt(0)) return new BigIntRational();

    if (a_i <= BigInt(0) || b_i <= BigInt(0) || f_i <= BigInt(0) || b_j <= BigInt(0) || c_j <= BigInt(0) || f_j <= BigInt(0)) {
        const part = f_v * x + PFF * a_v;
        return new BigIntRational((PFF * a_v * c_v * f_v), (part * part));
    }

    const part = f_v * x + PFF * a_v;
    return new BigIntRational((PFF * PFF * a_v * b_j * c_v * f_v * (f_i * y + PFF * a_i)), (((b_i * f_i * f_j + PFF * b_j * f_i) * y + PFF * PFF * a_i * b_j) * (part * part)));
}

export function Fdy(x: bigint, y: bigint, c: FConstants): BigIntRational {
    const {
        a_i, b_i, f_i,
        b_j, c_j, f_j,
        a_v, c_v, f_v,
    } = c;

    if (a_v <= BigInt(0) || c_v <= BigInt(0) || f_v <= BigInt(0)) {
        const part = (b_i * f_i * f_j + PFF * b_j * f_i) * y + PFF * PFF * a_i * b_j;
        return new BigIntRational((PFF * PFF * a_i * b_i * b_j * c_j * f_i * f_j), (part * part));
    } else {
        if (a_i <= BigInt(0) || b_i <= BigInt(0) || f_i <= BigInt(0) || b_j <= BigInt(0) || c_j <= BigInt(0) || f_j <= BigInt(0)) return new BigIntRational();
        const part = (b_i * f_i * f_j + PFF * b_j * f_i) * y + PFF * PFF * a_i * b_j;
        return new BigIntRational(-(PFF * PFF * a_i * b_i * b_j * f_i * f_j * ((c_v - c_j) * f_v * x - PFF * a_v * c_j)), ((f_v * x + PFF * a_v) * (part * part)));
    }
}

export function Fdxx(x: bigint, y: bigint, c: FConstants): BigIntRational {
    const {
        a_i, b_i, f_i,
        b_j, c_j, f_j,
        a_v, c_v, f_v,
    } = c;

    if (a_v <= BigInt(0) || c_v <= BigInt(0) || f_v <= BigInt(0)) return new BigIntRational();

    if (a_i <= BigInt(0) || b_i <= BigInt(0) || f_i <= BigInt(0) || b_j <= BigInt(0) || c_j <= BigInt(0) || f_j <= BigInt(0)) {
        const part = f_v * x + PFF * a_v;
        return new BigIntRational(-(BigInt(2) * PFF * a_v * c_v * f_v * f_v), (part * part * part));
    }

    const part = f_v * x + PFF * a_v;
    return new BigIntRational(-(BigInt(2) * PFF * PFF * a_v * b_j * c_v * f_v * f_v * (f_i * y + PFF * a_i)), (((b_i * f_i * f_j + PFF * b_j * f_i) * y + PFF * PFF * a_i * b_j) * (part * part * part)));
}

export function Fdxy(x: bigint, y: bigint, c: FConstants): BigIntRational {
    const {
        a_i, b_i, f_i,
        b_j, c_j, f_j,
        a_v, c_v, f_v,
    } = c;

    if (a_v <= BigInt(0) || c_v <= BigInt(0) || f_v <= BigInt(0)) return new BigIntRational();

    if (a_i <= BigInt(0) || b_i <= BigInt(0) || f_i <= BigInt(0) || b_j <= BigInt(0) || c_j <= BigInt(0) || f_j <= BigInt(0)) return new BigIntRational();

    const part1 = f_v * x + PFF * a_v;
    const part2 = (b_i * f_i * f_j + PFF * b_j * f_i) * y + PFF * PFF * a_i * b_j;
    return new BigIntRational(-(PFF * PFF * PFF * a_i * a_v * b_i * b_j * c_v * f_i * f_j * f_v), ((part1 * part1) * (part2 * part2)));
}

export function Fdyy(x: bigint, y: bigint, c: FConstants): BigIntRational {
    const {
        a_i, b_i, f_i,
        b_j, c_j, f_j,
        a_v, c_v, f_v,
    } = c;

    if (a_v <= BigInt(0) || c_v <= BigInt(0) || f_v <= BigInt(0)) {
        const part = (b_i * f_i * f_j + PFF * b_j * f_i) * y + PFF * PFF * a_i * b_j;
        return new BigIntRational(-(BigInt(2) * PFF * PFF * a_i * b_i * b_j * c_j * f_i * f_i * f_j * (b_i * f_j + PFF * b_j)), (part * part * part));
    } else {
        if (a_i <= BigInt(0) || b_i <= BigInt(0) || f_i <= BigInt(0) || b_j <= BigInt(0) || c_j <= BigInt(0) || f_j <= BigInt(0)) return new BigIntRational();
        const part = (b_i * f_i * f_j + PFF * b_j * f_i) * y + PFF * PFF * a_i * b_j;
        return new BigIntRational((BigInt(2) * PFF * PFF * a_i * b_i * b_j * f_i * f_i * f_j * (b_i * f_j + PFF * b_j) * ((c_v - c_j) * f_v * x - PFF * a_v * c_j)), ((f_v * x + PFF * a_v) * (part * part * part)));
    }
}
