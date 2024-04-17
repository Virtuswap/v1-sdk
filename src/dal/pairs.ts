import { Pair, PairReserve } from '../entities/pair';
import { Token, TokenWithBalance } from '../entities/token';
import { Address } from '../entities/utils';
import { Chain } from '../entities/chain';
import {
    queryAllPairs,
    RawPair,
    RawPairReserve,
    RawPairWhitelist,
} from './utils/execute';

export async function getAllPairs(chain: Chain): Promise<Array<Pair>> {
    const pairs = await queryAllPairs(chain);
    return pairs.map((pair: RawPair) => {
        const pairToken0 = new Token(pair.token0.id, pair.token0.decimals);
        const pairToken1 = new Token(pair.token1.id, pair.token1.decimals);
        return new Pair(
            new Address(pair.id),
            TokenWithBalance.fromDecimal(pairToken0, pair.balance0),
            TokenWithBalance.fromDecimal(pairToken1, pair.balance1),
            parseInt(pair.blocksDelay),
            parseInt(pair.lastSwapBlock),
            parseInt(pair.lastSwapTimestamp),
            parseInt(pair.fee),
            parseInt(pair.vFee),
            parseInt(pair.maxReserveRatio),
            parseInt(pair.reserveRatio),
            pair.whitelist.map(
                (whitelistEntry: RawPairWhitelist) =>
                    new Address(whitelistEntry.token.id)
            ),
            pair.pairReserves.map((reserve: RawPairReserve) => {
                return new PairReserve(
                    TokenWithBalance.fromDecimal(pairToken0, reserve.baseValue),
                    TokenWithBalance.fromDecimal(
                        new Token(reserve.token.id, reserve.token.decimals),
                        reserve.balance
                    )
                );
            })
        );
    });
}
