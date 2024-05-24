import { Address } from './utils';

export enum Chain {
    POLYGON_MAINNET = 137,
    ARBITRUM_MAINNET = 42161,

    POLYGON_TESTNET = 80001,
    ARBITRUM_TESTNET = 421614,
}

export interface ChainInfoItem {
    routerAddress: Address;
    useBlockTimestamp: boolean;
}

export interface ChainInfo {
    [key: number]: ChainInfoItem;
}

export const chainInfo: ChainInfo = {
    /*** MAINNET ***/
    // POLYGON
    137: {
        routerAddress: new Address(
            '0x3E3d15ea98429E546f30215AEfBB69A4244A8Ea9'
        ),
        useBlockTimestamp: false,
    },
    // ARBITRUM
    42161: {
        routerAddress: new Address(
            '0xB455da5a32E7E374dB6d1eDfdb86C167DD983f40'
        ),
        useBlockTimestamp: true,
        coingeckoId: 'arbitrum-one',
    },
    /*** TESTNET ***/
    // POLYGON
    80001: {
        routerAddress: new Address(
            '0x67502dEa89Be276f3E0a2bB5864fa946d3471c38'
        ),
        useBlockTimestamp: false,
    },
    // ARBITRUM
    421614: {
        routerAddress: new Address(
            '0x1754C18C9cdA03ACcEF2D28aCe85Dab8dC433533'
        ),
        useBlockTimestamp: true,
    },
};
