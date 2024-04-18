import axios from 'axios';
import { Chain } from '../../entities/chain';
import {
    Pair as Pair,
    PairReserve as PairReserve,
    PairWhitelist as PairWhitelist,
    Token as Token,
    _Meta_ as Meta,
} from '../.graphclient';

export type RawPair = Pair;
export type RawToken = Token;
export type RawPairReserve = PairReserve;
export type RawPairWhitelist = PairWhitelist;
export type RawMeta = Meta;

export async function queryAllPairs(chain: Chain): Promise<Array<RawPair>> {
    try {
        let response = await axios.get(
            `https://api.virtuswap.io/graph/pairs?chainId=${chain}`
        );
        return response.status === 200 ? response.data : [];
    } catch (e) {
        console.log(`Error fetching pairs: ${e}`);
        return [];
    }
}

export async function queryMeta(chain: Chain): Promise<RawMeta | null> {
    try {
        let response = await axios.get(
            `https://api.virtuswap.io/graph/meta?chainId=${chain}`
        );
        return response.status === 200 ? response.data : null;
    } catch (e) {
        console.log(`Error fetching meta: ${e}`);
        return null;
    }
}
