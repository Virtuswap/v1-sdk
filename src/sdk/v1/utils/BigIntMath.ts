export class BigIntMath {
    static max(...args: bigint[]): bigint {
        return args.reduce((m, e) => (e > m ? e : m));
    }

    static min(...args: bigint[]): bigint {
        return args.reduce((m, e) => (e < m ? e : m));
    }

    static abs(value: bigint) {
        return value < BigInt(0) ? -value : value;
    }

    static divRoundAwayFromZero(n: bigint, d: bigint) {
        const q = n / d;
        if (q * d === n) return q;
        return (n > BigInt(0) === d > BigInt(0)) ? q + BigInt(1) : q - BigInt(1);
    }

    static divRoundClosest(n: bigint, d: bigint): bigint {
        return ((n < BigInt(0)) === (d < BigInt(0))) ?
            ((n + d / BigInt(2)) / d) :
            ((n - d / BigInt(2)) / d);
    }
}
