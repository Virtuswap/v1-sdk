import { getBlockNumber, getBlockTimestamp } from '../src/dal/meta';
import { getAllPairs } from '../src/dal/pairs';
import { queryAllPairs, queryMeta } from '../src/dal/utils/execute';
import { Chain } from '../src/entities/chain';

describe('DAL: queries', () => {
    test('queryAllPairs works with polygon-testnet', async () => {
        const pairs = await queryAllPairs(Chain.POLYGON_TESTNET);
        expect(pairs.length).toBeGreaterThan(0);
    });
    test('queryMeta works with polygon-testnet', async () => {
        const meta = await queryMeta(Chain.POLYGON_TESTNET);
        expect(meta?.block.timestamp).not.toBeNull;
        expect(meta?.block.number).not.toBeNull;
    });
    test('queryAllPairs works with arbitrum-testnet', async () => {
        const pairs = await queryAllPairs(Chain.ARBITRUM_TESTNET);
        expect(pairs.length).toBeGreaterThan(0);
    });
    test('queryMeta works with arbitrum-testnet', async () => {
        const meta = await queryMeta(Chain.ARBITRUM_TESTNET);
        expect(meta?.block.timestamp).not.toBeNull;
        expect(meta?.block.number).not.toBeNull;
    });
});

describe('DAL: Metadata', () => {
    /* TODO: redeploy polygon on Amoy testnet
    test('getBlockNumber works with polygon-testnet', async () => {
        const blockNumber = await getBlockNumber(Chain.POLYGON_TESTNET);
        expect(blockNumber).toBeGreaterThan(48141038);
    });
    test('getBlockTimestamp works with polygon-testnet', async () => {
        const blockTimestamp = await getBlockTimestamp(Chain.POLYGON_TESTNET);
        expect(blockTimestamp).toBeGreaterThan(1712929630);
    });
    */
    test('getBlockNumber works with arbitrum-testnet', async () => {
        const blockNumber = await getBlockNumber(Chain.ARBITRUM_TESTNET);
        expect(blockNumber).toBeGreaterThan(32943564);
    });
    test('getBlockTimestamp works with arbitrum-testnet', async () => {
        const blockTimestamp = await getBlockTimestamp(Chain.ARBITRUM_TESTNET);
        expect(blockTimestamp).toBeGreaterThan(1712929569);
    });
});

describe('DAL: Pairs', () => {
    test('getAllPairs works with polygon-testnet', async () => {
        const pairs = await getAllPairs(Chain.POLYGON_TESTNET);
        expect(pairs.length).toBeGreaterThan(0);
    });
    test('getAllPairs works with arbitrum-testnet', async () => {
        const pairs = await getAllPairs(Chain.ARBITRUM_TESTNET);
        expect(pairs.length).toBeGreaterThan(0);
    });
});
