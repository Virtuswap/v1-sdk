export enum Chain {
    POLYGON_MAINNET = 137,
    ARBITRUM_MAINNET = 42161,

    POLYGON_TESTNET = 80002,
    ARBITRUM_TESTNET = 421614,
}

export interface ChainInfoItem {
    routerAddress: string;
    weth9Address: string;
    useBlockTimestamp: boolean;
}

export interface ChainInfo {
    [key: number]: ChainInfoItem;
}

export const chainInfo: ChainInfo = {
    /*** MAINNET ***/
    // POLYGON
    137: {
        routerAddress: '0x3E3d15ea98429E546f30215AEfBB69A4244A8Ea9', //TODO: deploy new router from https://github.com/Virtuswap/v1-core/tree/multicall
        weth9Address: '0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270',
        useBlockTimestamp: false,
    },
    // ARBITRUM
    42161: {
        routerAddress: '0xB455da5a32E7E374dB6d1eDfdb86C167DD983f40', //TODO: deploy new router from https://github.com/Virtuswap/v1-core/tree/multicall
        weth9Address: '0x82aF49447D8a07e3bd95BD0d56f35241523fBab1',
        useBlockTimestamp: true,
    },
    /*** TESTNET ***/
    // POLYGON
    80002: {
        routerAddress: '0xc2Eddfd8fb1fb918C621d81F22115B0161e9d154', //TODO: deploy new router from https://github.com/Virtuswap/v1-core/tree/multicall
        weth9Address: '', //TODO
        useBlockTimestamp: false,
    },
    // ARBITRUM
    421614: {
        routerAddress: '0x59EA964982d009CD79592038cB41aa95BfBD3283',
        weth9Address: '0xf5A74196CfA5fb26c70A1eC755A07635758dd9DD',
        useBlockTimestamp: true,
    },
};
