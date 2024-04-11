import { PairsDocument, execute } from './.graphclient';
import { Pair, PairReserve } from '../entities/pair';
import { Token, TokenWithBalance } from '../entities/token';
import { Address } from '../entities/utils';

export async function getAllPairs(): Promise<Array<Pair>> {
    const pairs = await execute(PairsDocument, {});
    return pairs.data.pairs.map((pair: any) => {
        const pairToken0 = new Token(pair.token0.id, pair.token0.decimals);
        const pairToken1 = new Token(pair.token1.id, pair.token1.decimals);
        return new Pair(
            new Address(pair.id),
            TokenWithBalance.fromDecimal(pairToken0, pair.balance0),
            TokenWithBalance.fromDecimal(pairToken1, pair.balance1),
            parseInt(pair.blocksDelay),
            parseInt(pair.lastSwapBlock),
            parseInt(pair.fee),
            parseInt(pair.vFee),
            parseInt(pair.maxReserveRatio),
            parseInt(pair.reserveRatio),
            pair.whitelist.map((token: any) => new Address(token.id)),
            pair.reserves.map(
                (reserve: any) =>
                    new PairReserve(
                        TokenWithBalance.fromDecimal(
                            pairToken0,
                            reserve.baseBalance
                        ),
                        TokenWithBalance.fromDecimal(
                            new Token(reserve.token.id, reserve.token.decimals),
                            reserve.balance
                        )
                    )
            )
        );
    });
}
