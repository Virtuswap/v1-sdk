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
import { getMultipleTokensPriceUsd } from '../utils/pricing';
import { getAllTokens } from './tokens';

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

export async function getTopPairsForToken(
    chain: Chain,
    tokenAddress: Address,
    count: number
): Promise<Array<Pair>> {
    const pairs = await getAllPairs(chain);
    const tokensAddresses = (await getAllTokens(chain)).map((t) =>
        t.address.toString()
    );
    const tokensPriceUsd = await getMultipleTokensPriceUsd(
        chain,
        tokensAddresses
    );

    if (tokensAddresses.length != tokensPriceUsd.length) return [];

    const tokensWithUsdPrices = tokensAddresses.map((t, i) => {
        return { token: t, priceUsd: tokensPriceUsd[i] };
    });

    return pairs
        .filter(
            (p) =>
                p.token0.address.eq(tokenAddress) ||
                p.token1.address.eq(tokenAddress)
        )
        .sort((a, b) => {
            const a0Price = tokensWithUsdPrices.find(
                (t) => t.token == a.token0.address.toString()
            )!.priceUsd;
            const a1Price = tokensWithUsdPrices.find(
                (t) => t.token == a.token1.address.toString()
            )!.priceUsd;
            const b0Price = tokensWithUsdPrices.find(
                (t) => t.token == b.token0.address.toString()
            )!.priceUsd;
            const b1Price = tokensWithUsdPrices.find(
                (t) => t.token == b.token1.address.toString()
            )!.priceUsd;
            const tvlA =
                parseFloat(a.token0.balance) * a0Price +
                parseFloat(a.token1.balance) * a1Price;
            const tvlB =
                parseFloat(b.token0.balance) * b0Price +
                parseFloat(b.token1.balance) * b1Price;
            return tvlA > tvlB ? -1 : tvlA < tvlB ? 1 : 0;
        })
        .slice(0, count);
}
