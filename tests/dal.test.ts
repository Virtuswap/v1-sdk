import { getBlockNumber, getBlockTimestamp } from '../src/dal/meta';
import { getAllPairs, getTopPairsForToken } from '../src/dal/pairs';
import { getAllTokens } from '../src/dal/tokens';
import {
    queryAllPairs,
    queryMeta,
    queryAllTokens,
} from '../src/dal/utils/execute';
import { Chain } from '../src/entities/chain';
import {
    mockAllPairsResponse,
    mockAllTokensResponse,
    mockMetadataResponse,
    mockTokensPricesResponse,
} from './mocks';

jest.mock('../src/utils/pricing', () => {
    return {
        getMultipleTokensPriceUsd: jest.fn(
            (_: Chain, tokensAddresses: Array<string>) => {
                return mockTokensPricesResponse
                    .filter((t) =>
                        tokensAddresses.find(
                            (addr) => addr.toLowerCase() == t.id.toLowerCase()
                        )
                    )
                    .map((t) => parseFloat(t.priceUsd));
            }
        ),
    };
});

jest.mock('axios', () => {
    return {
        get: jest.fn((urlString: string) => {
            const url = new URL(urlString);
            const params = new URLSearchParams(url.search);
            let errResponse = {
                status: 400,
                statusText: 'Bad Request',
                data: {},
            };
            if (!params.has('chainId')) {
                errResponse.data = {
                    error: "missing required parameter 'chainId'",
                };
                return errResponse;
            }
            const chainId = parseInt(params.get('chainId')!);
            // hardcoded statuses for testing purposes
            if (chainId == 987654321) {
                throw new Error('axios mock error');
            } else if (chainId == 123456789) {
                errResponse.data = { error: 'test code 400' };
                return errResponse;
            }

            let response = {
                status: 200,
                statusText: 'OK',
                data: {},
            };
            const urlWithoutParams = url.origin + url.pathname;
            switch (urlWithoutParams.toLowerCase()) {
                case 'https://api.virtuswap.io/graph/pairs':
                    response.data = mockAllPairsResponse;
                    break;
                case 'https://api.virtuswap.io/graph/meta':
                    response.data = mockMetadataResponse;
                    break;
                case 'https://api.virtuswap.io/graph/tokens':
                    response.data = mockAllTokensResponse;
                    break;
                default:
                    errResponse.status = 404;
                    errResponse.statusText = 'Not Found';
                    errResponse.data = {
                        message: 'Route not found',
                        error: 'Not Found',
                        statusCode: 404,
                    };
                    return errResponse;
            }
            return response;
        }),
    };
});

describe('DAL: queries', () => {
    test('queryAllPairs works', async () => {
        for (const chain of Object.values(Chain)) {
            let pairs = await queryAllPairs(chain as Chain);
            expect(pairs.length).toEqual(mockAllPairsResponse.length);
        }
    });
    test('queryAllPairs returns empty array if unsupported chain id is provided', async () => {
        let pairs = await queryAllPairs(123456789 as Chain);
        expect(pairs.length).toEqual(0);
        pairs = await queryAllPairs(987654321 as Chain);
        expect(pairs.length).toEqual(0);
    });
    test('queryMeta works', async () => {
        for (const chain of Object.values(Chain)) {
            let meta = await queryMeta(chain as Chain);
            expect(meta!.block.timestamp).toEqual(
                mockMetadataResponse.block.timestamp
            );
            expect(meta!.block.number).toEqual(
                mockMetadataResponse.block.number
            );
        }
    });
    test('queryMeta returns null if unsupported chain id is provided', async () => {
        let meta = await queryMeta(123456789 as Chain);
        expect(meta).toBeNull;
        meta = await queryMeta(987654321 as Chain);
        expect(meta).toBeNull;
    });
    test('queryAllTokens works', async () => {
        for (const chain of Object.values(Chain)) {
            let tokens = await queryAllTokens(chain as Chain);
            expect(tokens.length).toEqual(mockAllTokensResponse.length);
        }
    });
    test('queryAllTokens returns empty array if unsupported chain id is provided', async () => {
        let tokens = await queryAllTokens(123456789 as Chain);
        expect(tokens.length).toEqual(0);
        tokens = await queryAllTokens(987654321 as Chain);
        expect(tokens.length).toEqual(0);
    });
});

describe('DAL: Metadata', () => {
    test('getBlockNumber works', async () => {
        for (const chain of Object.values(Chain)) {
            let blockNumber = await getBlockNumber(chain as Chain);
            expect(blockNumber).toEqual(40);
        }
        let blockNumber = await getBlockNumber(123456789 as Chain);
        expect(blockNumber).toEqual(0);
    });
    test('getBlockTimestamp works', async () => {
        for (const chain of Object.values(Chain)) {
            let blockTimestamp = await getBlockTimestamp(chain as Chain);
            expect(blockTimestamp).toEqual(400);
        }
        let blockTimestamp = await getBlockTimestamp(123456789 as Chain);
        expect(blockTimestamp).toEqual(0);
    });
});

describe('DAL: Pairs', () => {
    test('getAllPairs works', async () => {
        for (const chain of Object.values(Chain)) {
            const pairs = await getAllPairs(chain as Chain);
            for (const [i, mockPair] of mockAllPairsResponse.entries()) {
                expect(mockPair.id.toLowerCase()).toEqual(
                    pairs[i].address.toLowerCase()
                );
                expect(mockPair.balance0).toEqual(pairs[i].token0.balance);
                expect(mockPair.balance1).toEqual(pairs[i].token1.balance);
                expect(mockPair.blocksDelay).toEqual(
                    pairs[i].blocksDelay.toString()
                );
                expect(mockPair.lastSwapBlock).toEqual(
                    pairs[i].lastSwapBlock.toString()
                );
                expect(mockPair.lastSwapTimestamp).toEqual(
                    pairs[i].lastSwapTimestamp.toString()
                );
                expect(mockPair.fee).toEqual(pairs[i].fee.toString());
                expect(mockPair.vFee).toEqual(pairs[i].vFee.toString());
                expect(mockPair.maxReserveRatio).toEqual(
                    pairs[i].maxReserveRatio.toString()
                );
                expect(mockPair.reserveRatio).toEqual(
                    pairs[i].reserveRatio.toString()
                );
                for (const [j, mockWhitelistEntry] of mockAllPairsResponse[
                    i
                ].whitelist.entries()) {
                    expect(mockWhitelistEntry.token.id.toLowerCase()).toEqual(
                        pairs[i].allowList[j].toLowerCase()
                    );
                }
                for (const [j, mockReserveEntry] of mockAllPairsResponse[
                    i
                ].pairReserves.entries()) {
                    expect(mockReserveEntry.token.id.toLowerCase()).toEqual(
                        pairs[i].reserves[j].reserveToken.address.toLowerCase()
                    );
                    expect(mockReserveEntry.token.decimals).toEqual(
                        pairs[i].reserves[j].reserveToken.decimals.toString()
                    );
                    expect(mockReserveEntry.balance).toEqual(
                        pairs[i].reserves[j].reserveToken.balance
                    );
                    expect(mockReserveEntry.baseValue).toEqual(
                        pairs[i].reserves[j].baseToken.balance
                    );
                }
            }
        }
        const pairs = await getAllPairs(123456789 as Chain);
        expect(pairs.length).toEqual(0);
    });
    test('getTopPairsForToken works', async () => {
        const expectedPairs = mockAllPairsResponse.filter(
            (p) =>
                p.id == '0xd0b12762620af08ddcf9c72f61d0d54c865b46ef' ||
                p.id == '0x4917459762e7fbb93cea11960198ffb3dd3572b6'
        )!;
        expect(expectedPairs.length).toEqual(2);
        for (const chain of Object.values(Chain)) {
            let pairs = await getTopPairsForToken(
                chain as Chain,
                '0x4303d1d547fafa114f90b85356275c89465a60bf',
                0
            );
            expect(pairs).toEqual([]);
            pairs = await getTopPairsForToken(
                chain as Chain,
                '0x4303d1d547fafa114f90b85356275c89465a60bf',
                1
            );
            expect(pairs[0].address.toLowerCase()).toEqual(expectedPairs[1].id);
            pairs = await getTopPairsForToken(
                chain as Chain,
                '0x4303d1d547fafa114f90b85356275c89465a60bf',
                2
            );
            expect(pairs[0].address.toLowerCase()).toEqual(expectedPairs[1].id);
            expect(pairs[1].address.toLowerCase()).toEqual(expectedPairs[0].id);
            pairs = await getTopPairsForToken(
                chain as Chain,
                '0x4303d1d547fafa114f90b85356275c89465a60bf',
                10
            );
            expect(pairs[0].address.toLowerCase()).toEqual(expectedPairs[1].id);
            expect(pairs[1].address.toLowerCase()).toEqual(expectedPairs[0].id);
        }
        const pairs = await getTopPairsForToken(
            123456789 as Chain,
            '0x4303d1d547fafa114f90b85356275c89465a60bf',
            10
        );
        expect(pairs.length).toEqual(0);
    });
});

describe('DAL: Tokens', () => {
    test('getAllTokens works', async () => {
        for (const chain of Object.values(Chain)) {
            const tokens = await getAllTokens(chain as Chain);
            for (const [i, mockToken] of mockAllTokensResponse.entries()) {
                expect(mockToken.id).toEqual(tokens[i].address.toLowerCase());
                expect(mockToken.decimals).toEqual(tokens[i].decimals);
            }
        }
        const tokens = await getAllTokens(123456789 as Chain);
        expect(tokens.length).toEqual(0);
    });
});
