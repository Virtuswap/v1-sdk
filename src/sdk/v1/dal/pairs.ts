import {
    Pair,
    PairReserve,
    Token,
    TokenWithBalance,
    Chain,
} from '../../../entities';
import { poolsCache } from '../../../dal/cache/pools';
import { PoolState } from '../../../dal/blockchain/vPool';
import { ethers } from 'ethers';
import { dex } from '../../../dal/blockchain/dex';
import { uniqBy } from 'lodash';

const CACHE_TIME_MS = 2000;

function getPairFromPoolStateMapper(
    chain: Chain,
    reserveTokensToPick?: Set<string>
) {
    return (poolAddress: string, pool: PoolState) => {
        const pairToken0 = new Token(chain, pool.token0, pool.decimals0);
        const pairToken1 = new Token(chain, pool.token1, pool.decimals1);
        let reserves = Object.entries(pool.reserves);
        if (reserveTokensToPick)
            reserves = reserves.filter(
                ([address, { balance, baseValue }]) =>
                    reserveTokensToPick.has(address) ||
                    (!balance.isZero() && !baseValue.isZero())
            );
        return new Pair(
            poolAddress,
            TokenWithBalance.fromBigNumber(pairToken0, pool.pairBalance0),
            TokenWithBalance.fromBigNumber(pairToken1, pool.pairBalance1),
            pool.blocksDelay,
            pool.lastSwapBlock,
            pool.lastSwapBlock,
            pool.fee,
            pool.vFee,
            pool.maxReserveRatio.toNumber(),
            pool.rRatio.toNumber(),
            reserves.map(([address]) => ethers.utils.getAddress(address)),
            reserves.map(([tokenAddress, { balance, baseValue, decimals }]) => {
                return new PairReserve(
                    TokenWithBalance.fromBigNumber(pairToken0, baseValue),
                    TokenWithBalance.fromBigNumber(
                        new Token(chain, tokenAddress, decimals),
                        balance
                    )
                );
            })
        );
    };
}

async function tryUpdateCachedPools(
    chain: Chain,
    fetchTokenNamesAndSymbols = false
) {
    const lastUpdate = poolsCache.getLastUpdate(chain);
    const isOld = Date.now() > +lastUpdate + CACHE_TIME_MS;
    if (isOld || fetchTokenNamesAndSymbols) {
        const oldPoolStates = poolsCache.mapPools(
            chain,
            (a, p) => [a, p] as const
        );
        const isMissingData =
            fetchTokenNamesAndSymbols &&
            oldPoolStates.some(([_a, pool]) => !pool.symbol0 || !pool.symbol1);

        if (isOld || isMissingData) {
            const updatedPoolsStates =
                oldPoolStates.length > 0 && !isMissingData
                    ? await dex.regeneratePoolsStates(
                          chain,
                          Object.fromEntries(oldPoolStates)
                      )
                    : await dex.generatePoolsStates(
                          chain,
                          fetchTokenNamesAndSymbols
                      );
            poolsCache.updateManyPools({ [chain]: updatedPoolsStates });
        }
    }
}

export async function getPairsWithTokens(
    chain: Chain,
    tokens: string[]
): Promise<Array<Pair>> {
    await tryUpdateCachedPools(chain);
    const lowerCaseTokens = new Set(tokens.map((t) => t.toLowerCase()));
    return poolsCache.filterAndMapPools(
        chain,
        (_, pool) =>
            lowerCaseTokens.has(pool.token0) ||
            lowerCaseTokens.has(pool.token1),
        getPairFromPoolStateMapper(chain, lowerCaseTokens)
    );
}

export async function getAllPairs(chain: Chain): Promise<Array<Pair>> {
    await tryUpdateCachedPools(chain);
    return poolsCache.mapPools(chain, getPairFromPoolStateMapper(chain));
}

export async function getPairByAddress(
    chain: Chain,
    pairAddress: string
): Promise<Pair | undefined> {
    const poolAddress = pairAddress.toLowerCase();
    await tryUpdateCachedPools(chain);
    return poolsCache.getPool(chain, poolAddress, (pool) =>
        pool ? getPairFromPoolStateMapper(chain)(poolAddress, pool) : undefined
    );
}

export async function getAllTokens(
    chain: Chain,
    fetchTokenNamesAndSymbols = false
): Promise<Array<Token>> {
    await tryUpdateCachedPools(chain, fetchTokenNamesAndSymbols);
    return uniqBy(
        poolsCache
            .mapPools(
                chain,
                (_a, pool) =>
                    [
                        [pool.token0, pool.decimals0, pool.symbol0, pool.name0],
                        [pool.token1, pool.decimals1, pool.symbol1, pool.name1],
                    ] as [
                        string,
                        number,
                        string | undefined,
                        string | undefined,
                    ][]
            )
            .flat(),
        ([addr]) => addr
    ).map((params) => new Token(chain, ...params));
}
