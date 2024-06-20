import { ethers } from 'ethers';

import { Chain, chainInfo } from './chain';
import { TokenWithBalance, Token } from './token';
import { isAddressValid } from '../utils/validations';

export class PairReserve {
    public readonly reserveToken: TokenWithBalance;
    public readonly baseToken: TokenWithBalance;

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
    public readonly address: string;
    public readonly token0: TokenWithBalance;
    public readonly token1: TokenWithBalance;
    public readonly blocksDelay: number;
    public readonly lastSwapBlock: number;
    public readonly lastSwapTimestamp: number;
    public readonly fee: number;
    public readonly vFee: number;
    public readonly maxReserveRatio: number;
    public readonly reserveRatio: number;
    public readonly allowList: Array<string>;
    public readonly reserves: Array<PairReserve>;

    constructor(
        address: string,
        token0: TokenWithBalance,
        token1: TokenWithBalance,
        blocksDelay: number,
        lastSwapBlock: number,
        lastSwapTimestamp: number,
        fee: number,
        vFee: number,
        maxReserveRatio: number,
        reserveRatio: number,
        allowList: Array<string>,
        reserves: Array<PairReserve>
    ) {
        if (!isAddressValid(address)) {
            throw new Error(`address ${address} is not valid`);
        }
        // translate to checksum address
        this.address = ethers.utils.getAddress(address);
        this.token0 = token0;
        this.token1 = token1;
        this.blocksDelay = blocksDelay;
        this.lastSwapBlock = lastSwapBlock;
        this.lastSwapTimestamp = lastSwapTimestamp;
        this.fee = fee;
        this.vFee = vFee;
        if (reserveRatio > maxReserveRatio) {
            throw new Error(
                'reserveRatio ratio is greater than maxReserveRatio'
            );
        }
        this.maxReserveRatio = maxReserveRatio;
        this.reserveRatio = reserveRatio;
        this.allowList = allowList.map((address) =>
            ethers.utils.getAddress(address)
        );
        this.reserves = reserves;
    }

    hasCommonTokenWith(pair: Pair): boolean {
        return this.getCommonToken(pair) != null;
    }

    getCommonToken(pair: Pair): Token | null {
        return this.token0.eq(pair.token0)
            ? this.token0
            : this.token1.eq(pair.token0)
              ? this.token1
              : this.token0.eq(pair.token1)
                ? this.token0
                : this.token1.eq(pair.token1)
                  ? this.token1
                  : null;
    }

    isBlockedForVirtualTrading(chain: Chain, blockNumber: number): boolean {
        return (
            blockNumber <
            this.blocksDelay +
                (chainInfo[chain].useBlockTimestamp
                    ? this.lastSwapTimestamp
                    : this.lastSwapBlock)
        );
    }

    hasTokenWithAddress(tokenAddress: string): boolean {
        tokenAddress = ethers.utils.getAddress(tokenAddress);
        return (
            this.token0.address === tokenAddress ||
            this.token1.address === tokenAddress
        );
    }

    allowsTokenAsReserve(tokenAddress: string): boolean {
        tokenAddress = ethers.utils.getAddress(tokenAddress);
        return this.allowList.some((token) => token === tokenAddress);
    }
}
