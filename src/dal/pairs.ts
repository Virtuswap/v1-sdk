import { Pair, PairReserve } from '../entities/pair';
import { Token, TokenWithBalance } from '../entities/token';
import { Chain } from '../entities/chain';
import {
    queryAllPairs,
    RawPair,
    RawPairReserve,
    RawPairWhitelist,
} from './utils/execute';
import { getMultipleTokensPriceUsd } from '../utils/pricing';
import { getAllTokens } from './tokens';
import { ethers } from 'ethers';

export async function getAllPairs(chain: Chain): Promise<Array<Pair>> {
    const pairs = await queryAllPairs(chain);
    return pairs.map((pair: RawPair) => {
        const pairToken0 = new Token(
            chain,
            pair.token0.id,
            pair.token0.decimals,
            pair.token0.symbol,
            pair.token0.name
        );
        const pairToken1 = new Token(
            chain,
            pair.token1.id,
            pair.token1.decimals,
            pair.token1.symbol,
            pair.token1.name
        );
        return new Pair(
            pair.id,
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
                (whitelistEntry: RawPairWhitelist) => whitelistEntry.token.id
            ),
            pair.pairReserves.map((reserve: RawPairReserve) => {
                return new PairReserve(
                    TokenWithBalance.fromDecimal(pairToken0, reserve.baseValue),
                    TokenWithBalance.fromDecimal(
                        new Token(
                            chain,
                            reserve.token.id,
                            reserve.token.decimals
                        ),
                        reserve.balance
                    )
                );
            })
        );
    });
}

export async function getTopPairsForToken(
    chain: Chain,
    tokenAddress: string,
    count: number
): Promise<Array<Pair>> {
    tokenAddress = ethers.utils.getAddress(tokenAddress);
    const pairs = await getAllPairs(chain);
    const tokensAddresses = (await getAllTokens(chain)).map((t) => t.address);
    const tokensPriceUsd = await getMultipleTokensPriceUsd(
        chain,
        tokensAddresses
    );

    const tokensWithUsdPrices = tokensAddresses.map((t, i) => {
        return { token: t, priceUsd: tokensPriceUsd[i] };
    });

    return pairs
        .filter(
            (p) =>
                p.token0.address === tokenAddress ||
                p.token1.address === tokenAddress
        )
        .sort((a, b) => {
            const a0Price = tokensWithUsdPrices.find(
                (t) => t.token == a.token0.address
            )!.priceUsd;
            const a1Price = tokensWithUsdPrices.find(
                (t) => t.token == a.token1.address
            )!.priceUsd;
            const b0Price = tokensWithUsdPrices.find(
                (t) => t.token == b.token0.address
            )!.priceUsd;
            const b1Price = tokensWithUsdPrices.find(
                (t) => t.token == b.token1.address
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
