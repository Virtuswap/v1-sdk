import { BigIntMath } from './BigIntMath';

const THRESHOLD = BigInt('1000000000000000000000000000000000000');

// Function to perform a lossy reduction: approximate num/den with a fixed denominator.
function reduceLossy(num: bigint, den: bigint, maxDenom: bigint = THRESHOLD): { num: bigint; den: bigint } {
    // Compute: approx = round((num/den) * maxDenom) / maxDenom.
    // We simulate rounding by adding half of den before doing integer division.
    let approxNum = (num * maxDenom + den / BigInt(2)) / den;
    return { num: approxNum, den: maxDenom };
}

export class BigIntRational {
    readonly num: bigint;
    readonly den: bigint;
    constructor(num: bigint = BigInt(0), den: bigint = BigInt(1)) {
        if (den === BigInt(0)) throw new Error("Denominator cannot be 0");
        // Normalize so that denominator is positive.
        if (den < BigInt(0)) {
            num = -num;
            den = -den;
        }
        if ((BigIntMath.abs(num) > THRESHOLD && den > BigInt(1)) || den > THRESHOLD) {
            const r = reduceLossy(num, den);
            num = r.num;
            den = r.den;
        }
        this.num = num;
        this.den = den;
    }
    add(other: BigIntRational): BigIntRational {
        if (this.den === other.den) return new BigIntRational(this.num + other.num, this.den);
        return new BigIntRational(this.num * other.den + other.num * this.den, this.den * other.den);
    }
    sub(other: BigIntRational): BigIntRational {
        if (this.den === other.den) return new BigIntRational(this.num - other.num, this.den);
        return new BigIntRational(this.num * other.den - other.num * this.den, this.den * other.den);
    }
    mul(other: BigIntRational): BigIntRational {
        return new BigIntRational(this.num * other.num, this.den * other.den);
    }
    div(other: BigIntRational): BigIntRational {
        return new BigIntRational(this.num * other.den, this.den * other.num);
    }
    // Convert to (approximate) JavaScript number.
    toNumber(): number {
        return Number(this.num) / Number(this.den);
    }
    // Convert to (approximate) JavaScript bigint.
    toBigInt(): bigint {
        return this.num / this.den;
    }
    toString(): string {
        return `${this.num.toString()}/${this.den.toString()}`;
    }
    // Square of this number.
    square(): BigIntRational {
        return this.mul(this);
    }
    // Reciprocal.
    inv(): BigIntRational {
        return new BigIntRational(this.den, this.num);
    }
    // Negative.
    neg(): BigIntRational {
        return new BigIntRational(-this.num, this.den);
    }
}
