import { Chain } from '../src/entities/chain';
import { mockTokensPricesResponse } from './mocks';
import { getMultipleTokensPriceUsd } from '../src/utils/pricing';

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
                case 'https://api.virtuswap.io/tokenspricesusd': {
                    const tokensAddresses = params.get('tokensAddresses');
                    if (!tokensAddresses) {
                        errResponse.data = {
                            error: "missing required parameter 'tokens_addresses'",
                        };
                        return errResponse;
                    }
                    response.data = mockTokensPricesResponse
                        .filter((t) =>
                            tokensAddresses
                                .split(',')
                                .find(
                                    (addr) =>
                                        addr.toLowerCase() == t.id.toLowerCase()
                                )
                        )
                        .map((t) => parseFloat(t.priceUsd));
                    break;
                }
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

describe('Pricing', () => {
    test('Price fetching works', async () => {
        for (const chain of Object.values(Chain)) {
            const prices = await getMultipleTokensPriceUsd(chain as Chain, [
                '0x0a9bc7c7721297da60e9510a1682fca347bf70e5',
                '0x4303d1d547fafa114f90b85356275c89465a60bf',
            ]);
            expect(prices).toEqual(
                [mockTokensPricesResponse[0], mockTokensPricesResponse[2]].map(
                    (p) => parseFloat(p.priceUsd)
                )
            );
        }
    });

    test('Price fetching returns empty array if any error occurs', async () => {
        let prices = await getMultipleTokensPriceUsd(123456789 as Chain, [
            '0x0a9bc7c7721297da60e9510a1682fca347bf70e5',
            '0x4303d1d547fafa114f90b85356275c89465a60bf',
        ]);
        expect(prices).toEqual([]);
        prices = await getMultipleTokensPriceUsd(987654321 as Chain, [
            '0x0a9bc7c7721297da60e9510a1682fca347bf70e5',
            '0x4303d1d547fafa114f90b85356275c89465a60bf',
        ]);
        prices = await getMultipleTokensPriceUsd(Chain.POLYGON_TESTNET, [
            '0x0000000000000000000000000000000000000000',
            '0x4303d1d547fafa114f90b85356275c89465a60bf',
        ]);
        expect(prices).toEqual([]);
    });
});
