export type RawToken = {
    id: string;
    symbol: string;
    name: string;
    decimals: string;
};

export type RawPairReserve = {
    id: string;
    pair: RawPair;
    token: RawToken;
    balance: string;
    baseValue: string;
};

export type RawPairWhitelist = {
    id: string;
    token: RawToken;
    pair: RawPair;
};

export type RawPair = {
    id: string;
    token0: RawToken;
    token1: RawToken;
    balance0: string;
    balance1: string;
    fee: string;
    vFee: string;
    maxReserveRatio: string;
    reserveRatio: string;
    totalSupply: string;
    blocksDelay: string;
    totalMu: string;
    totalStaked: string;
    lastSwapBlock: string;
    lastSwapTimestamp: string;
    whitelist: Array<RawPairWhitelist>;
    allocationPoints: string;
    token0Price: string;
    token1Price: string;
    pairReserves: Array<RawPairReserve>;
    createdAtTimestamp: string;
    createdAtBlockNumber: string;
};
