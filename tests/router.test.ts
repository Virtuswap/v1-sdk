import { ethers } from 'ethers';
import { Router } from '../src/router/router';
import { Router as RouterBF } from './routerBruteForcer';
import { Token, TokenWithBalance } from '../src/entities/token';
import { Chain } from '../src/entities/chain';
import {
    mockAllPairsResponse,
    mockMetadataResponse,
    mockTokensPricesResponse,
} from './mocks';

const multicallMock = jest.fn(async (_) => {});

jest.mock('axios', () => {
    return {
        get: jest.fn((urlString: string) => {
            const url = new URL(urlString);
            const params = new URLSearchParams(url.search);
            let response = {
                status: 200,
                statusText: 'OK',
                data: {},
            };
            const urlWithoutParams = url.origin + url.pathname;
            switch (urlWithoutParams.toLowerCase()) {
                case 'https://api.virtuswap.io/tokenspricesusd': {
                    const tokensAddresses = params.get('tokensAddresses');
                    response.data = mockTokensPricesResponse
                        .filter((t) =>
                            tokensAddresses!
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
            }
            return response;
        }),
    };
});

jest.mock('../src/dal/utils/execute', () => {
    return {
        queryMeta: jest.fn((_: Chain) => mockMetadataResponse),
        queryAllPairs: jest.fn((_: Chain) => mockAllPairsResponse),
    };
});

jest.mock('@ethersproject/contracts', () => {
    return {
        Contract: jest.fn().mockImplementation(() => {
            return {
                multicall: multicallMock,
            };
        }),
    };
});

describe('Router', () => {
    test('getRoute for exact input works', async () => {
        const tokenOut = new Token(
            Chain.ARBITRUM_TESTNET,
            '0x4303d1d547fafa114f90b85356275c89465a60bf',
            6
        );
        const tokenIn = new Token(
            Chain.ARBITRUM_TESTNET,
            '0x0a9bc7c7721297da60e9510a1682fca347bf70e5',
            8
        );
        const tokenInWithAmount = TokenWithBalance.fromBigNumber(
            tokenIn,
            '500'
        );
        const routerBF = new RouterBF();
        const router = new Router();
        const bfResult = await routerBF.getRoute(
            tokenIn,
            tokenOut,
            tokenInWithAmount.balanceBN,
            Chain.ARBITRUM_TESTNET
        );
        const result = await router.getRoute(
            tokenIn,
            tokenOut,
            tokenInWithAmount.balanceBN,
            Chain.ARBITRUM_TESTNET
        );

        const bestAmountIn = bfResult.reduce(
            (sum, cur) => sum.add(cur.amountInBn),
            ethers.BigNumber.from(0)
        );
        const bestAmountOut = bfResult.reduce(
            (sum, cur) => sum.add(cur.amountOutBn),
            ethers.BigNumber.from(0)
        );
        const resAmountIn = result.steps.reduce(
            (sum, cur) => sum.add(cur.amountInBn),
            ethers.BigNumber.from(0)
        );
        const resAmountOut = result.steps.reduce(
            (sum, cur) => sum.add(cur.amountOutBn),
            ethers.BigNumber.from(0)
        );

        expect(
            resAmountIn.sub(bestAmountIn).abs().toNumber()
        ).toBeLessThanOrEqual(1);
        expect(
            resAmountOut.sub(bestAmountOut).abs().toNumber()
        ).toBeLessThanOrEqual(1);
    });

    test('getRoute for exact output works', async () => {
        const tokenOut = new Token(
            Chain.ARBITRUM_TESTNET,
            '0x4303d1d547fafa114f90b85356275c89465a60bf',
            6
        );
        const tokenIn = new Token(
            Chain.ARBITRUM_TESTNET,
            '0x0a9bc7c7721297da60e9510a1682fca347bf70e5',
            8
        );
        const tokenInWithAmount = TokenWithBalance.fromBigNumber(
            tokenIn,
            '1000'
        );
        const routerBF = new RouterBF();
        const router = new Router();
        const bfResult = await routerBF.getRoute(
            tokenIn,
            tokenOut,
            tokenInWithAmount.balanceBN,
            Chain.ARBITRUM_TESTNET,
            { isExactInput: false }
        );
        const result = await router.getRoute(
            tokenIn,
            tokenOut,
            tokenInWithAmount.balanceBN,
            Chain.ARBITRUM_TESTNET,
            { isExactInput: false }
        );
        const bestAmountIn = bfResult.reduce(
            (sum, cur) => sum.add(cur.amountInBn),
            ethers.BigNumber.from(0)
        );
        const bestAmountOut = bfResult.reduce(
            (sum, cur) => sum.add(cur.amountOutBn),
            ethers.BigNumber.from(0)
        );
        const resAmountIn = result.steps.reduce(
            (sum, cur) => sum.add(cur.amountInBn),
            ethers.BigNumber.from(0)
        );
        const resAmountOut = result.steps.reduce(
            (sum, cur) => sum.add(cur.amountOutBn),
            ethers.BigNumber.from(0)
        );

        expect(
            resAmountIn.sub(bestAmountIn).abs().toNumber()
        ).toBeLessThanOrEqual(1);
        expect(
            resAmountOut.sub(bestAmountOut).abs().toNumber()
        ).toBeLessThanOrEqual(1);
    });

    test('getRoute for exact input works (direct)', async () => {
        const tokenOut = new Token(
            Chain.ARBITRUM_TESTNET,
            '0x4303d1d547fafa114f90b85356275c89465a60bf',
            6
        );
        const tokenIn = new Token(
            Chain.ARBITRUM_TESTNET,
            '0x220db2b860f817d43b6ee2733735274e51e7a491',
            6
        );
        const tokenInWithAmount = TokenWithBalance.fromBigNumber(
            tokenIn,
            '500'
        );
        const routerBF = new RouterBF();
        const router = new Router();
        const bfResult = await routerBF.getRoute(
            tokenIn,
            tokenOut,
            tokenInWithAmount.balanceBN,
            Chain.ARBITRUM_TESTNET
        );
        const result = await router.getRoute(
            tokenIn,
            tokenOut,
            tokenInWithAmount.balanceBN,
            Chain.ARBITRUM_TESTNET
        );

        const bestAmountIn = bfResult.reduce(
            (sum, cur) => sum.add(cur.amountInBn),
            ethers.BigNumber.from(0)
        );
        const bestAmountOut = bfResult.reduce(
            (sum, cur) => sum.add(cur.amountOutBn),
            ethers.BigNumber.from(0)
        );
        const resAmountIn = result.steps.reduce(
            (sum, cur) => sum.add(cur.amountInBn),
            ethers.BigNumber.from(0)
        );
        const resAmountOut = result.steps.reduce(
            (sum, cur) => sum.add(cur.amountOutBn),
            ethers.BigNumber.from(0)
        );

        expect(
            resAmountIn.sub(bestAmountIn).abs().toNumber()
        ).toBeLessThanOrEqual(1);
        expect(
            resAmountOut.sub(bestAmountOut).abs().toNumber()
        ).toBeLessThanOrEqual(1);
    });

    test('getRoute for exact output works (direct)', async () => {
        const tokenOut = new Token(
            Chain.ARBITRUM_TESTNET,
            '0x4303d1d547fafa114f90b85356275c89465a60bf',
            6
        );
        const tokenIn = new Token(
            Chain.ARBITRUM_TESTNET,
            '0x220db2b860f817d43b6ee2733735274e51e7a491',
            6
        );
        const tokenInWithAmount = TokenWithBalance.fromBigNumber(
            tokenIn,
            '1000'
        );
        const routerBF = new RouterBF();
        const router = new Router();
        const bfResult = await routerBF.getRoute(
            tokenIn,
            tokenOut,
            tokenInWithAmount.balanceBN,
            Chain.ARBITRUM_TESTNET,
            { isExactInput: false }
        );
        const result = await router.getRoute(
            tokenIn,
            tokenOut,
            tokenInWithAmount.balanceBN,
            Chain.ARBITRUM_TESTNET,
            { isExactInput: false }
        );
        const bestAmountIn = bfResult.reduce(
            (sum, cur) => sum.add(cur.amountInBn),
            ethers.BigNumber.from(0)
        );
        const bestAmountOut = bfResult.reduce(
            (sum, cur) => sum.add(cur.amountOutBn),
            ethers.BigNumber.from(0)
        );
        const resAmountIn = result.steps.reduce(
            (sum, cur) => sum.add(cur.amountInBn),
            ethers.BigNumber.from(0)
        );
        const resAmountOut = result.steps.reduce(
            (sum, cur) => sum.add(cur.amountOutBn),
            ethers.BigNumber.from(0)
        );

        expect(
            resAmountIn.sub(bestAmountIn).abs().toNumber()
        ).toBeLessThanOrEqual(1);
        expect(
            resAmountOut.sub(bestAmountOut).abs().toNumber()
        ).toBeLessThanOrEqual(1);
    });

    test('Check for slippage change', async () => {
        const tokenIn = new Token(
            Chain.ARBITRUM_TESTNET,
            '0x58e948c6e48d3EbC909332e22972101425109Bf4',
            18
        );
        const tokenOut = new Token(
            Chain.ARBITRUM_TESTNET,
            '0x94b47ebE537C9ac7B37BDF7A5F68E7b6A1F16eAb',
            18
        );
        const tokenInWithAmount = TokenWithBalance.fromDecimal(tokenIn, '1');
        const router = new Router();

        const slippage = 20000;
        const route = await router.getRoute(
            tokenIn,
            tokenOut,
            tokenInWithAmount.balanceBN,
            Chain.ARBITRUM_TESTNET,
            {
                slippage,
            }
        );
        const expectedAmountOutBN = ethers.BigNumber.from('14722346352068');
        expect(route.steps.length).toEqual(1);
        expect(route.steps[0].type).toEqual(1);
        expect(route.tokenOut.balanceBN).toEqual(expectedAmountOutBN);
        expect(route.slippageThresholdAmount.balanceBN).toEqual(
            expectedAmountOutBN.sub(expectedAmountOutBN.div(slippage))
        );
    });

    test('Check for two subsequent quotes', async () => {
        const tokenIn = new Token(
            Chain.ARBITRUM_TESTNET,
            '0x58e948c6e48d3EbC909332e22972101425109Bf4',
            18
        );
        const tokenOut = new Token(
            Chain.ARBITRUM_TESTNET,
            '0x94b47ebE537C9ac7B37BDF7A5F68E7b6A1F16eAb',
            18
        );
        const tokenInWithAmount = TokenWithBalance.fromDecimal(tokenIn, '1');
        const router = new Router();
        let route = await router.getRoute(
            tokenIn,
            tokenOut,
            tokenInWithAmount.balanceBN,
            Chain.ARBITRUM_TESTNET
        );
        const expectedAmountOutBN = ethers.BigNumber.from('14722346352068');
        const slippage = 1000;
        expect(route.steps.length).toEqual(1);
        expect(route.steps[0].type).toEqual(1);
        expect(route.tokenOut.balanceBN).toEqual(expectedAmountOutBN);
        expect(route.slippageThresholdAmount.balanceBN).toEqual(
            expectedAmountOutBN.sub(expectedAmountOutBN.div(slippage))
        );

        const tokenIn2 = new Token(
            Chain.ARBITRUM_TESTNET,
            '0x4303d1d547fafa114f90b85356275c89465a60bf',
            6
        );
        const tokenOut2 = new Token(
            Chain.ARBITRUM_TESTNET,
            '0x94b47ebe537c9ac7b37bdf7a5f68e7b6a1f16eab',
            18
        );
        const tokenInWithAmount2 = TokenWithBalance.fromDecimal(tokenIn2, '1');
        route = await router.getRoute(
            tokenIn2,
            tokenOut2,
            tokenInWithAmount2.balanceBN,
            Chain.ARBITRUM_TESTNET
        );

        const expectedAmountOutBN2 = ethers.BigNumber.from('376246353196503');
        const slippage2 = '1000';
        expect(route.steps.length).toEqual(1);
        expect(route.steps[0].type).toEqual(2);
        expect(route.tokenOut.balanceBN).toEqual(expectedAmountOutBN2);
        expect(route.slippageThresholdAmount.balanceBN).toEqual(
            expectedAmountOutBN2.sub(expectedAmountOutBN2.div(slippage2))
        );
    });

    test('generateMulticallData works #1', async () => {
        const tokenIn = new Token(
            Chain.ARBITRUM_TESTNET,
            '0x4303d1d547fafa114f90b85356275c89465a60bf',
            6
        );
        const tokenOut = new Token(
            Chain.ARBITRUM_TESTNET,
            '0x94b47ebe537c9ac7b37bdf7a5f68e7b6a1f16eab',
            18
        );
        const tokenInWithAmount = TokenWithBalance.fromDecimal(tokenIn, '1');
        const router = new Router();
        const route = await router.getRoute(
            tokenIn,
            tokenOut,
            tokenInWithAmount.balanceBN,
            Chain.ARBITRUM_TESTNET
        );
        const expectedMulticallData =
            '0x5caf6ff000000000000000000000000094b47ebe537c9ac7b37bdf7a5f68e7b6a1f16eab000000000000000000000000220db2b860f817d43b6ee2733735274e51e7a491000000000000000000000000d0b12762620af08ddcf9c72f61d0d54c865b46ef00000000000000000000000000000000000000000000000000000000000f4240000000000000000000000000000000000000000000000000000155da143338ab0000000000000000000000008fd379246834eac74b8419ffda202cf8051f7a030000000000000000000000000000000000000000000000000000000000018830';
        const signer = new ethers.Wallet(
            'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
            new ethers.providers.JsonRpcProvider(
                'https://public.stackup.sh/api/v1/node/arbitrum-sepolia'
            )
        );
        expect(await router.generateMulticallData(route, signer)).toEqual([
            expectedMulticallData,
        ]);
    });

    test('generateMulticallData works #2', async () => {
        const tokenIn = new Token(
            Chain.ARBITRUM_TESTNET,
            '0x4303d1d547fafa114f90b85356275c89465a60bf',
            6
        );
        const tokenOut = new Token(
            Chain.ARBITRUM_TESTNET,
            '0x6C06aa45C300A55a810B4b36C73d861Cc8708833',
            18
        );
        const tokenInWithAmount = TokenWithBalance.fromDecimal(tokenIn, '1');
        const router = new Router();
        const route = await router.getRoute(
            tokenIn,
            tokenOut,
            tokenInWithAmount.balanceBN,
            Chain.ARBITRUM_TESTNET
        );
        const expectedMulticallData =
            '0x5804636200000000000000000000000000000000000000000000000000000000000000a000000000000000000000000000000000000000000000000000000000000f42400000000000000000000000000000000000000000000000000dcb78c2ada97a7d0000000000000000000000008fd379246834eac74b8419ffda202cf8051f7a03000000000000000000000000000000000000000000000000000000000001883000000000000000000000000000000000000000000000000000000000000000020000000000000000000000004303d1d547fafa114f90b85356275c89465a60bf0000000000000000000000006c06aa45c300a55a810b4b36c73d861cc8708833';
        const signer = new ethers.Wallet(
            'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
            new ethers.providers.JsonRpcProvider(
                'https://public.stackup.sh/api/v1/node/arbitrum-sepolia'
            )
        );
        expect(await router.generateMulticallData(route, signer)).toEqual([
            expectedMulticallData,
        ]);
    });

    test('generateMulticallData works #3', async () => {
        const tokenIn = new Token(
            Chain.ARBITRUM_TESTNET,
            '0x58e948c6e48d3EbC909332e22972101425109Bf4',
            18
        );
        const tokenOut = new Token(
            Chain.ARBITRUM_TESTNET,
            '0x94b47ebE537C9ac7B37BDF7A5F68E7b6A1F16eAb',
            18
        );
        const tokenInWithAmount = TokenWithBalance.fromDecimal(tokenIn, '1');
        const router = new Router();
        const route = await router.getRoute(
            tokenIn,
            tokenOut,
            tokenInWithAmount.balanceBN,
            Chain.ARBITRUM_TESTNET
        );
        const expectedMulticallData =
            '0x5804636200000000000000000000000000000000000000000000000000000000000000a00000000000000000000000000000000000000000000000000de0b6b3a764000000000000000000000000000000000000000000000000000000000d6062b450540000000000000000000000008fd379246834eac74b8419ffda202cf8051f7a030000000000000000000000000000000000000000000000000000000000018830000000000000000000000000000000000000000000000000000000000000000300000000000000000000000058e948c6e48d3ebc909332e22972101425109bf4000000000000000000000000220db2b860f817d43b6ee2733735274e51e7a49100000000000000000000000094b47ebe537c9ac7b37bdf7a5f68e7b6a1f16eab';
        const signer = new ethers.Wallet(
            'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
            new ethers.providers.JsonRpcProvider(
                'https://public.stackup.sh/api/v1/node/arbitrum-sepolia'
            )
        );
        expect(await router.generateMulticallData(route, signer)).toEqual([
            expectedMulticallData,
        ]);
    });
    test('executeMulticall works', async () => {
        const router = new Router();
        const signer = new ethers.Wallet(
            'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
            new ethers.providers.JsonRpcProvider(
                'https://public.stackup.sh/api/v1/node/arbitrum-sepolia'
            )
        );
        const expectedMulticallData =
            '0x5804636200000000000000000000000000000000000000000000000000000000000000a00000000000000000000000000000000000000000000000000de0b6b3a764000000000000000000000000000000000000000000000000000000000d6062b450540000000000000000000000008fd379246834eac74b8419ffda202cf8051f7a030000000000000000000000000000000000000000000000000000000000018830000000000000000000000000000000000000000000000000000000000000000300000000000000000000000058e948c6e48d3ebc909332e22972101425109bf4000000000000000000000000220db2b860f817d43b6ee2733735274e51e7a49100000000000000000000000094b47ebe537c9ac7b37bdf7a5f68e7b6a1f16eab';
        await router.executeMulticall(
            Chain.ARBITRUM_TESTNET,
            [expectedMulticallData],
            signer
        );
        expect(multicallMock).toHaveBeenLastCalledWith([expectedMulticallData]);
    });
});
