import { ethers } from 'ethers';

import { Chain, chainInfo } from './chain';
import { TokenWithBalance, Erc20Token } from './token';
import { isAddressValid } from '../utils/validations';

export class PairReserve {
    public readonly reserveToken: TokenWithBalance<Erc20Token>;
    public readonly baseToken: TokenWithBalance<Erc20Token>;

    constructor(
        baseToken: TokenWithBalance<Erc20Token>,
        reserveToken: TokenWithBalance<Erc20Token>
    ) {
        this.reserveToken = reserveToken;
        this.baseToken = baseToken;
    }

    static empty(baseToken: Erc20Token, reserveToken: Erc20Token): PairReserve {
        return new PairReserve(
            TokenWithBalance.fromDecimal(baseToken, '0'),
            TokenWithBalance.fromDecimal(reserveToken, '0')
        );
    }
}

export class Pair {
    public readonly address: string;
    public readonly token0: TokenWithBalance<Erc20Token>;
    public readonly token1: TokenWithBalance<Erc20Token>;
    public readonly blocksDelay: number;
    public readonly lastSwapBlock: number;
    public readonly lastSwapTimestamp: number;
    public readonly fee: number;
    public readonly vFee: number;
    public readonly maxReserveRatio: number;
    public readonly reserveRatio: number;
    public readonly allowList: Array<Erc20Token>;
    public readonly reserves: Array<PairReserve>;

    constructor(
        address: string,
        token0: TokenWithBalance<Erc20Token>,
        token1: TokenWithBalance<Erc20Token>,
        blocksDelay: number,
        lastSwapBlock: number,
        lastSwapTimestamp: number,
        fee: number,
        vFee: number,
        maxReserveRatio: number,
        reserveRatio: number,
        allowList: Array<Erc20Token>,
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
        this.allowList = allowList;
        this.reserves = reserves;
    }

    hasCommonTokenWith(pair: Pair): boolean {
        return this.getCommonToken(pair) != null;
    }

    getCommonToken(pair: Pair): Erc20Token | null {
        return this.token0.token.eq(pair.token0.token)
            ? this.token0.token
            : this.token1.token.eq(pair.token0.token)
              ? this.token1.token
              : this.token0.token.eq(pair.token1.token)
                ? this.token0.token
                : this.token1.token.eq(pair.token1.token)
                  ? this.token1.token
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
        return (
            this.token0.token.address.toLowerCase() === tokenAddress.toLowerCase() ||
            this.token1.token.address.toLowerCase() === tokenAddress.toLowerCase()
        );
    }

    allowsTokenAsReserve(tokenAddress: string): boolean {
        return !!this.allowList.find(
            (token) => token.address.toLowerCase() === tokenAddress.toLowerCase()
        );
    }
}
