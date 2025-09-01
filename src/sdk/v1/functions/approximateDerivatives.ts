import { AutoBaseFunction, BaseFunction, FConstants, FMaximums } from '../types';
import { BigIntRational } from '../utils/BigIntRational';

const sumF = ([x, y]: ReturnType<BaseFunction>) => x + y;

export function Fdx(x: bigint, y: bigint, c: FConstants, F: BaseFunction, step=BigInt(1)): BigIntRational {
    const fxp = sumF(F(x + step, y, c));
    const fxm = sumF(F(x - step, y, c));

    const numerator = fxp - fxm;
    const denominator = BigInt(2) * step;

    return new BigIntRational(numerator, denominator);
}

export function Fdy(x: bigint, y: bigint, c: FConstants, F: BaseFunction, step=BigInt(1)): BigIntRational {
    const fyp = sumF(F(x, y + step, c));
    const fym = sumF(F(x, y - step, c));

    const numerator = fyp - fym;
    const denominator = BigInt(2) * step;

    return new BigIntRational(numerator, denominator);
}

export function Fdxx(x: bigint, y: bigint, c: FConstants, F: BaseFunction, step=BigInt(1)): BigIntRational {
    const f = sumF(F(x, y, c));
    const fxp = sumF(F(x + step, y, c));
    const fxm = sumF(F(x - step, y, c));

    const numerator = fxp - BigInt(2) * f + fxm;
    const denominator = step * step;

    return new BigIntRational(numerator, denominator);
}

export function Fdxy(x: bigint, y: bigint, c: FConstants, F: BaseFunction, step=BigInt(1)): BigIntRational {
    const f = sumF(F(x, y, c));
    const fyp = sumF(F(x, y + step, c));
    const fym = sumF(F(x, y - step, c));

    const numerator = fyp - BigInt(2) * f + fym;
    const denominator = step * step;

    return new BigIntRational(numerator, denominator);
}

export function Fdyy(x: bigint, y: bigint, c: FConstants, F: BaseFunction, step=BigInt(1)): BigIntRational {
    const xp = x + step;
    const yp = y + step;
    const xm = x - step;
    const ym = y - step;

    const fxpyp = sumF(F(xp, yp, c));
    const fxpym = sumF(F(xp, ym, c));
    const fxmyp = sumF(F(xm, yp, c));
    const fxmym = sumF(F(xm, ym, c));

    const numerator = fxpyp - fxpym - fxmyp + fxmym;
    const denominator = BigInt(4) * step * step;

    return new BigIntRational(numerator, denominator);
}

function autoFdxLeft(amount: bigint, c: FConstants, max: FMaximums, autoF: AutoBaseFunction, step=BigInt(1)): BigIntRational {
    if (amount <= BigInt(0)) amount = BigInt(0);

    const xp = amount + step;
    const xm = amount - step;

    // At x=0, use a one-sided (right) difference.
    if (amount === BigInt(0)) {
        return new BigIntRational(autoF(xp, c, max) - autoF(amount, c, max), step);
    }

    // At the bending point, use a one-sided (left) difference.
    if (amount === max.max_x) {
        return new BigIntRational(autoF(amount, c, max) - autoF(xm, c, max), step);
    }

    // When x is left of the bending point.
    if (amount < max.max_x) {
        // If the rightward point (xp) would cross max_x, avoid it.
        if (xp > max.max_x) {
            // Use left (one-sided) difference.
            if (xm >= BigInt(0)) {
                return new BigIntRational(autoF(amount, c, max) - autoF(xm, c, max), step);
            } else {
                // Adjust step so that xp becomes exactly max_x.
                const step_adj = max.max_x - amount;
                // Note: For left derivative, we then use (F(x) - F(x - step_adj))/step_adj.
                return new BigIntRational(autoF(amount, c, max) - autoF(amount - step_adj, c, max), step_adj);
            }
        } else {
            // Both xm and xp are safely to the left of x_b.
            if (xm < BigInt(0)) {
                // If xm is out-of-domain, use a right difference (which is a forward difference).
                return new BigIntRational(autoF(xp, c, max) - autoF(amount, c, max), step);
            } else {
                // Use central difference: (F(xp) - F(xm))/(2*step).
                return new BigIntRational(autoF(xp, c, max) - autoF(xm, c, max), BigInt(2) * step);
            }
        }
    }
    // When x is right of the bending point.
    else { // x > max_x
        // If xm falls below the bending point, avoid crossing it.
        if (xm < max.max_x) {
            return new BigIntRational(autoF(amount, c, max) - autoF(xm, c, max), step);
        } else {
            // Use central difference.
            return new BigIntRational(autoF(xp, c, max) - autoF(xm, c, max), BigInt(2) * step);
        }
    }
}

function autoFdxRight(amount: bigint, c: FConstants, max: FMaximums, autoF: AutoBaseFunction, step=BigInt(1)): BigIntRational {
    if (amount <= BigInt(0)) amount = BigInt(0);

    const xp = amount + step;
    const xm = amount - step;

    if (amount === BigInt(0) || amount === max.max_x) {
        return new BigIntRational(autoF(xp, c, max) - autoF(amount, c, max), step);
    }

    // When x is to the left of the bending point (x < max_x):
    if (amount < max.max_x) {
        // If the forward point would cross max_x:
        if (xp > max.max_x) {
            // Prefer backward difference if the backward point is in-domain.
            if (xm >= BigInt(0)) {
                // Use backward difference: [F(x) - F(xm)]/step.
                return new BigIntRational(autoF(amount, c, max) - autoF(xm, c, max), step);
            } else {
                // Otherwise, adjust step so that xp becomes max_x.
                const step_adj = max.max_x - amount; // Now, xp = max_x.
                return new BigIntRational(autoF(amount + step_adj, c, max) - autoF(amount, c, max), step_adj);
            }
        } else {
            // If both xm and xp lie strictly to the left of max_x.
            if (xm < BigInt(0)) {
                // If x-step is out-of-domain, use forward difference.
                return new BigIntRational(autoF(xp, c, max) - autoF(amount, c, max), step);
            } else {
                // Use central difference: [F(xp) - F(xm)]/(2*step).
                return new BigIntRational(autoF(xp, c, max) - autoF(xm, c, max), BigInt(2) * step);
            }
        }
    }
    // When x is to the right of the bending point (x > max_x):
    else { // x > max_x
        // If the backward point falls below max_x, we must avoid crossing the kink.
        if (xm < max.max_x) {
            // Use a forward difference: [F(xp) - F(x)]/step.
            return new BigIntRational(autoF(xp, c, max) - autoF(amount, c, max), step);
        } else {
            // If both xm and xp lie on the right side of max_x, use central difference.
            return new BigIntRational(autoF(xp, c, max) - autoF(xm, c, max), BigInt(2) * step);
        }
    }
}

export function autoFdx(amount: bigint, c: FConstants, max: FMaximums, autoF: AutoBaseFunction, step=BigInt(1)): BigIntRational {
    return step >= BigInt(0) ?
        autoFdxRight(amount, c, max, autoF, step) :
        autoFdxLeft(amount, c, max, autoF, -step);
}
