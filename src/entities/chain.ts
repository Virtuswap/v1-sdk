export enum MainnetChain {
    POLYGON_MAINNET = 137,
    ARBITRUM_MAINNET = 42161,
}

export enum TestnetChain {
    POLYGON_TESTNET = 80002,
    ARBITRUM_TESTNET = 421614,
    ZENCHAIN_TESTNET = 8408,
}

export type Chain = MainnetChain | TestnetChain;

export const Chain = { ...MainnetChain, ...TestnetChain } as const;

export interface ChainInfoItem {
    router2Address: string;
    router3Address: string;
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
        router2Address: '0xe724A2195320f74Ff36075a26F12828A5920Af68',
        router3Address: '0x71AFe81B4f4c3Ac191F74A2a0C5e284Efb0F20a4',
        weth9Address: '0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270',
        useBlockTimestamp: false,
    },
    // ARBITRUM
    42161: {
        router2Address: '0x8917BF335BF484da1CfEAcdE4A057A104372B76c',
        router3Address: '0x07047dC59e8958227B61d112915B889ED696c024',
        weth9Address: '0x82aF49447D8a07e3bd95BD0d56f35241523fBab1',
        useBlockTimestamp: true,
    },
    /*** TESTNET ***/
    // POLYGON
    80002: {
        router2Address: '0xc2Eddfd8fb1fb918C621d81F22115B0161e9d154', //TODO: deploy new router from https://github.com/Virtuswap/v1-core/tree/multicall
        router3Address: '', //TODO
        weth9Address: '', //TODO
        useBlockTimestamp: false,
    },
    // ARBITRUM
    421614: {
        router2Address: '0x59EA964982d009CD79592038cB41aa95BfBD3283',
        router3Address: '0xD52fd13f56c3C16a7156Fa29D49f83cfaF45Fa25',
        weth9Address: '0xf5A74196CfA5fb26c70A1eC755A07635758dd9DD',
        useBlockTimestamp: true,
    },
    // ZENCHAIN
    8408: {
        router2Address: '0x68748818983CD5B4cD569E92634b8505CFc41FE8',
        router3Address: '0xD694285B88D2bBdbBe03616Bb850728581a9b0c0',
        weth9Address: '0x818E9bc39c0a5755aB6dC1d3e0c53a0929580602',
        useBlockTimestamp: true,
    },
};
