import type { BigIntRational } from './utils/BigIntRational';

export type FConstants = {
    a_i: bigint;
    b_i: bigint;
    f_i: bigint;
    b_j: bigint;
    c_j: bigint;
    f_j: bigint;
    a_v: bigint;
    c_v: bigint;
    f_v: bigint;
}

export type FPair = {
    x: bigint;
    y: bigint;
};

export type FMaximums = {
  max_x: bigint;
  max_y: bigint;
};

export type AutoBaseFunction = (amount: bigint, c: FConstants, max: FMaximums) => bigint;

export type BaseFunction = (x: bigint, y: bigint, c: FConstants) => [bigint, bigint];

export type DerivativeFunction = (x: bigint, y: bigint, c: FConstants) => BigIntRational;

export type GradientFunctions = {
    Fdx: DerivativeFunction;
    Fdy: DerivativeFunction;
};

export type HessianFunctions = {
    Fdxx: DerivativeFunction;
    Fdxy: DerivativeFunction;
    Fdyy: DerivativeFunction;
}
