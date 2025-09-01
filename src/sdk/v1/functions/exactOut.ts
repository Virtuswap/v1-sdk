import { PRICE_FEE_FACTOR as PFF } from '../constants';
import { FConstants, FMaximums } from '../types';
import { BigIntRational } from '../utils/BigIntRational';
import { BigIntMath } from '../utils/BigIntMath';
import { getAmountIn } from './base';

// Get input for x virtual/direct output and y triangular output
export function F(x: bigint, y: bigint, c: FConstants): [bigint, bigint] {
    const {
        a_i, b_i, f_i,
        b_j, c_j, f_j,
        a_v, c_v, f_v,
    } = c;

    const in_t = getAmountIn(y, b_j, c_j - x, f_j);

    const in_2 = getAmountIn(in_t, a_i, b_i, f_i);

    const in_1 = getAmountIn(x, a_v, c_v, f_v);

    return [in_1, in_2];
}

export function autoF(amount: bigint, c: FConstants, max: FMaximums): bigint {
    const x = BigIntMath.min(amount, max.max_x);
    const y = amount - x;

    const [in_1, in_2] = F(x, y, c);

    return in_1 + in_2;
}

export function Fdx(x: bigint, y: bigint, c: FConstants): BigIntRational {
    const {
        a_i, b_i, f_i,
        b_j, c_j, f_j,
        a_v, c_v, f_v,
    } = c;

    if (a_v <= BigInt(0) || c_v <= BigInt(0) || f_v <= BigInt(0)) return new BigIntRational();

    if (a_i <= BigInt(0) || b_i <= BigInt(0) || f_i <= BigInt(0) || b_j <= BigInt(0) || c_j <= BigInt(0) || f_j <= BigInt(0)) {
        const part = x - c_v;
        return new BigIntRational((PFF * a_v * c_v), (f_v * (part * part)));
    }

    const PFF2_ai_bj_y = PFF * PFF * a_i * b_j * y;
    const x_y_cj_diff = -x - y + c_j;
    const x_y_cj_2 = x_y_cj_diff * x_y_cj_diff;
    const common_rational = new BigIntRational((PFF * b_j * y), (f_j * (x_y_cj_diff)));
    const bi_min1 = b_i - BigInt(1);
    const bi_min1_min_common = new BigIntRational(bi_min1).sub(common_rational);

    const cv_min_x = c_v - x;
    const PFF_av = PFF * a_v;
    const rational_1 = new BigIntRational((PFF_av * x), (f_v * (cv_min_x * cv_min_x)));

    const PFF2_ai_bj_y_BIR = new BigIntRational(PFF2_ai_bj_y);
    const f_i_f_j_x_y_cj_2_BIR = new BigIntRational(f_i * f_j * x_y_cj_2);

    const num_2 = ((common_rational.add(new BigIntRational(BigInt(1)))).mul(PFF2_ai_bj_y_BIR));
    const den_2 = ((bi_min1_min_common.square()).mul(f_i_f_j_x_y_cj_2_BIR));
    const rational_2 = num_2.div(den_2);

    const num_3 = PFF2_ai_bj_y_BIR;
    const den_3 = ((bi_min1_min_common).mul(f_i_f_j_x_y_cj_2_BIR));
    const rational_3 = num_3.div(den_3);

    const rational_4 = new BigIntRational((PFF_av), (f_v * (cv_min_x)));

    return rational_1.add(rational_2).add(rational_3).add(rational_4);
}

export function Fdy(x: bigint, y: bigint, c: FConstants): BigIntRational {
    const {
        a_i, b_i, f_i,
        b_j, c_j, f_j,
    } = c;

    if (a_i <= BigInt(0) || b_i <= BigInt(0) || f_i <= BigInt(0) || b_j <= BigInt(0) || c_j <= BigInt(0) || f_j <= BigInt(0)) return new BigIntRational();

    const part = (((b_i - BigInt(1)) * f_j + PFF * b_j) * y + (b_i - BigInt(1)) * f_j * x + (BigInt(1) - b_i) * c_j * f_j);
    return new BigIntRational(-(PFF * PFF * a_i * b_i * b_j * f_j * (x - c_j)), (f_i * (part * part)));
}

export function Fdxx(x: bigint, y: bigint, c: FConstants): BigIntRational {
    const {
        a_i, b_i, f_i,
        b_j, c_j, f_j,
        a_v, c_v, f_v,
    } = c;

    if (a_v <= BigInt(0) || c_v <= BigInt(0) || f_v <= BigInt(0)) return new BigIntRational();

    const BI_1 = BigInt(1);
    const BI_2 = BigInt(2);

    if (a_i <= BigInt(0) || b_i <= BigInt(0) || f_i <= BigInt(0) || b_j <= BigInt(0) || c_j <= BigInt(0) || f_j <= BigInt(0)) {
        const part = x - c_v;
        return new BigIntRational(-(BI_2 * PFF * a_v * c_v), (f_v * (part * part * part)));
    }

    const cv_min_x = c_v - x;
    const cv_min_x_2 = cv_min_x * cv_min_x;
    const cv_min_x_3 = cv_min_x_2 * cv_min_x;

    const BI2_PFF_av = BI_2 * PFF * a_v;

    const rational_1 = new BigIntRational((BI2_PFF_av * x), (f_v * cv_min_x_3));

    const PFF_bj_y = PFF * b_j * y;

    const BI2_PFF_2_ai_bj_y = BI_2 * PFF * a_i * PFF_bj_y;
    const BI2_PFF_3_ai_bj_2_y_2 = BI2_PFF_2_ai_bj_y * PFF_bj_y;

    const BIR2_PFF_2_ai_bj_y = new BigIntRational(BI2_PFF_2_ai_bj_y);
    const BIR2_PFF_3_ai_bj_2_y_2 = new BigIntRational(BI2_PFF_3_ai_bj_2_y_2);

    const min_x_min_y_plus_cj = -x - y + c_j;
    const min_x_min_y_plus_cj_2 = min_x_min_y_plus_cj * min_x_min_y_plus_cj;
    const min_x_min_y_plus_cj_3 = min_x_min_y_plus_cj_2 * min_x_min_y_plus_cj;
    const min_x_min_y_plus_cj_4 = min_x_min_y_plus_cj_3 * min_x_min_y_plus_cj;
    const f_j_mul_min_x_min_y_plus_cj = f_j * (min_x_min_y_plus_cj);

    const fi_fj = f_i * f_j;
    const fj_2_fi = fi_fj * f_j;

    const fi_fj_min_x_min_y_plus_cj_3 = fi_fj * min_x_min_y_plus_cj_3;
    const fj_2_fi_min_x_min_y_plus_cj_4 = fj_2_fi * min_x_min_y_plus_cj_4;

    const b_i_min_1 = b_i - BI_1;

    const common_num_rational = new BigIntRational((PFF_bj_y), (f_j_mul_min_x_min_y_plus_cj)).add(new BigIntRational(BI_1));
    const common_den_rational = new BigIntRational(-(PFF_bj_y), (f_j_mul_min_x_min_y_plus_cj)).add(new BigIntRational(b_i_min_1));
    const common_den_rational_2 = common_den_rational.square();
    const common_den_rational_3 = common_den_rational_2.mul(common_den_rational);

    const BIR_fi_fj_min_x_min_y_plus_cj_3 = new BigIntRational(fi_fj_min_x_min_y_plus_cj_3);
    const BIR_fj_2_fi_min_x_min_y_plus_cj_4 = new BigIntRational(fj_2_fi_min_x_min_y_plus_cj_4);

    const num_2 = common_num_rational.mul(BIR2_PFF_2_ai_bj_y);
    const den_2 = (common_den_rational_2.mul(BIR_fi_fj_min_x_min_y_plus_cj_3));
    const rational_2 = num_2.div(den_2);

    const num_3 = BIR2_PFF_2_ai_bj_y;
    const den_3 = (common_den_rational.mul(BIR_fi_fj_min_x_min_y_plus_cj_3));
    const rational_3 = num_3.div(den_3);

    const num_4 = BIR2_PFF_3_ai_bj_2_y_2.mul(common_num_rational);
    const den_4 = (common_den_rational_3.mul(BIR_fj_2_fi_min_x_min_y_plus_cj_4));
    const rational_4 = num_4.div(den_4);

    const num_5 = BIR2_PFF_3_ai_bj_2_y_2;
    const den_5 = (common_den_rational_2.mul(BIR_fj_2_fi_min_x_min_y_plus_cj_4));
    const rational_5 = num_5.div(den_5);

    const rational_6 = new BigIntRational((BI2_PFF_av), (f_v * cv_min_x_2));

    return rational_1.add(rational_2).add(rational_3).add(rational_4).add(rational_5).add(rational_6);
}



export function Fdxy(x: bigint, y: bigint, c: FConstants): BigIntRational {
    const {
        a_i, b_i, f_i,
        b_j, c_j, f_j,
        a_v, c_v, f_v,
    } = c;

    if (a_v <= BigInt(0) || c_v <= BigInt(0) || f_v <= BigInt(0)) return new BigIntRational();

    if (a_i <= BigInt(0) || b_i <= BigInt(0) || f_i <= BigInt(0) || b_j <= BigInt(0) || c_j <= BigInt(0) || f_j <= BigInt(0)) return new BigIntRational();

    const BI_1 = BigInt(1);

    const part = ((b_i - BI_1) * f_j * x + ((b_i - BI_1) * f_j + PFF * b_j) * y + (BI_1 - b_i) * c_j * f_j);

    return new BigIntRational((PFF * PFF * a_i * b_i * b_j * f_j * ((b_i - BI_1) * f_j * x + ((BI_1 - b_i) * f_j - PFF * b_j) * y + (BI_1 - b_i) * c_j * f_j)), (f_i * (part * part * part)));
}

export function Fdyy(x: bigint, y: bigint, c: FConstants): BigIntRational {
    const {
        a_i, b_i, f_i,
        b_j, c_j, f_j,
    } = c;

    if (a_i <= BigInt(0) || b_i <= BigInt(0) || f_i <= BigInt(0) || b_j <= BigInt(0) || c_j <= BigInt(0) || f_j <= BigInt(0)) return new BigIntRational();

    const BI_1 = BigInt(1);
    const BI_2 = BigInt(2);

    const part = (((b_i - BI_1) * f_j + PFF * b_j) * y + (b_i - BI_1) * f_j * x + (BI_1 - b_i) * c_j * f_j);
    return new BigIntRational((BI_2 * PFF * PFF * a_i * b_i * b_j * f_j * ((b_i - BI_1) * f_j + PFF * b_j) * (x - c_j)), (f_i * (part * part * part)));
}
