import { TokenWithBalance, Token } from './token';
import { Address } from './utils';

export class PairReserve {
    readonly reserveToken: TokenWithBalance;
    readonly baseToken: TokenWithBalance;

    constructor(baseToken: TokenWithBalance, reserveToken: TokenWithBalance) {
        this.reserveToken = reserveToken;
        this.baseToken = baseToken;
    }

    static empty(baseToken: Token, reserveToken: Token): PairReserve {
        return new PairReserve(
            TokenWithBalance.fromDecimal(baseToken, '0'),
            TokenWithBalance.fromDecimal(reserveToken, '0')
        );
    }
}

export class Pair {
    readonly address: Address;
    readonly token0: TokenWithBalance;
    readonly token1: TokenWithBalance;
    readonly blocksDelay: number;
    readonly lastSwapBlock: number;
    readonly lastSwapTimestamp: number;
    readonly fee: number;
    readonly vFee: number;
    readonly maxReserveRatio: number;
    readonly reserveRatio: number;
    readonly allowList: Array<Address>;
    readonly reserves: Array<PairReserve>;

    constructor(
        address: Address,
        token0: TokenWithBalance,
        token1: TokenWithBalance,
        blocksDelay: number,
        lastSwapBlock: number,
        lastSwapTimestamp: number,
        fee: number,
        vFee: number,
        maxReserveRatio: number,
        reserveRatio: number,
        allowList: Array<Address>,
        reserves: Array<PairReserve>
    ) {
        this.address = address;
        this.token0 = token0;
        this.token1 = token1;
        this.blocksDelay = blocksDelay;
        this.lastSwapBlock = lastSwapBlock;
        this.lastSwapTimestamp = lastSwapTimestamp;
        this.fee = fee;
        this.vFee = vFee;
        this.maxReserveRatio = maxReserveRatio;
        this.reserveRatio = reserveRatio;
        this.allowList = allowList;
        this.reserves = reserves;
    }

    hasCommonTokenWith(pair: Pair): boolean {
        return (
            this.token0.address.eq(pair.token0.address) ||
            this.token1.address.eq(pair.token0.address) ||
            this.token0.address.eq(pair.token1.address) ||
            this.token1.address.eq(pair.token1.address)
        );
    }

    getCommonToken(pair: Pair): Token | null {
        return this.token0.address.eq(pair.token0.address)
            ? (this.token0 as Token)
            : this.token1.address.eq(pair.token0.address)
              ? (this.token1 as Token)
              : this.token0.address.eq(pair.token1.address)
                ? (this.token0 as Token)
                : this.token1.address.eq(pair.token1.address)
                  ? (this.token1 as Token)
                  : null;
    }

    isBlockedForVirtualTrading(blockNumber: number): boolean {
        // TODO: for arbitrum compare lastSwapTimestamp
        return blockNumber < this.blocksDelay + this.lastSwapBlock;
    }

    hasTokenWithAddress(tokenAddress: Address): boolean {
        return (
            this.token0.address.eq(tokenAddress) ||
            this.token1.address.eq(tokenAddress)
        );
    }

    allowsTokenAsReserve(tokenAddress: Address): boolean {
        return !!this.allowList.find((address) => address.eq(tokenAddress));
    }
}
