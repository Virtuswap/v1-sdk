import { Chain } from '../../entities/chain';
import {
    Pair as PairPolygonTestnet,
    PairReserve as PairReservePolygonTestnet,
    PairWhitelist as PairWhitelistPolygonTestnet,
    Token as TokenPolygonTestnet,
    PairsDocument as PairsDocumentPolygonTestnet,
    MetadataDocument as MetadataDocumentPolygonTestnet,
    execute as ExecutePolygonTestnet,
    _Meta_ as MetaPolygonTestnet,
} from '../graphclients/polygon-testnet/.graphclient';
import {
    PairsDocument as PairsDocumentArbitrumTestnet,
    MetadataDocument as MetadataDocumentArbitrumTestnet,
    execute as ExecuteArbitrumTestnet,
} from '../graphclients/arbitrum-testnet/.graphclient';

export type RawPair = PairPolygonTestnet;
export type RawToken = TokenPolygonTestnet;
export type RawPairReserve = PairReservePolygonTestnet;
export type RawPairWhitelist = PairWhitelistPolygonTestnet;
export type RawMeta = MetaPolygonTestnet;

export async function queryAllPairs(chain: Chain): Promise<Array<RawPair>> {
    let pairs: Array<RawPair>;
    switch (chain) {
        case Chain.POLYGON_TESTNET:
            pairs =
                (await ExecutePolygonTestnet(PairsDocumentPolygonTestnet, {}))
                    ?.data?.pairs ?? [];
            break;
        case Chain.ARBITRUM_TESTNET:
            pairs =
                (await ExecuteArbitrumTestnet(PairsDocumentArbitrumTestnet, {}))
                    ?.data?.pairs ?? [];
            break;
        default:
            pairs = [];
    }
    return pairs;
}

export async function queryMeta(chain: Chain): Promise<RawMeta> {
    let meta: RawMeta | null;
    switch (chain) {
        case Chain.POLYGON_TESTNET:
            meta = (
                await ExecutePolygonTestnet(MetadataDocumentPolygonTestnet, {})
            )?.data?._meta;
            break;
        case Chain.ARBITRUM_TESTNET:
            meta = (
                await ExecuteArbitrumTestnet(
                    MetadataDocumentArbitrumTestnet,
                    {}
                )
            )?.data?._meta;
            break;
        default:
            meta = null;
    }
    if (!meta) {
        throw 'ERROR: Unable to get metadata from Subgraph';
    }
    return meta;
}
