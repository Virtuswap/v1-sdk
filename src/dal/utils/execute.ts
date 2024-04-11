import { Chain } from '../../entities/chain';
import {
    PairsDocument as PairsDocumentPolygonTestnet,
    MetadataDocument as MetadataDocumentPolygonTestnet,
    execute as ExecutePolygonTestnet,
} from '../graphclients/polygon-testnet/.graphclient';
import {
    PairsDocument as PairsDocumentArbitrumTestnet,
    MetadataDocument as MetadataDocumentArbitrumTestnet,
    execute as ExecuteArbitrumTestnet,
} from '../graphclients/arbitrum-testnet/.graphclient';

export async function queryAllPairs(chain: Chain) {
    let pairs: any;
    switch (chain) {
        case Chain.POLYGON_TESTNET:
            pairs = await ExecutePolygonTestnet(
                PairsDocumentPolygonTestnet,
                {}
            );
            break;
        case Chain.ARBITRUM_TESTNET:
            pairs = await ExecuteArbitrumTestnet(
                PairsDocumentArbitrumTestnet,
                {}
            );
            break;
        default:
            pairs = {};
    }
    return pairs;
}

export async function queryMeta(chain: Chain) {
    let meta: any;
    switch (chain) {
        case Chain.POLYGON_TESTNET:
            meta = await ExecutePolygonTestnet(
                MetadataDocumentPolygonTestnet,
                {}
            );
            break;
        case Chain.ARBITRUM_TESTNET:
            meta = await ExecuteArbitrumTestnet(
                MetadataDocumentArbitrumTestnet,
                {}
            );
            break;
        default:
            meta = {};
    }
    return meta;
}
