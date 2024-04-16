import { ethers } from 'ethers';
import Router from '../src/router/router';
import { Token, TokenWithBalance } from '../src/entities/token';
import { Chain } from '../src/entities/chain';
import { mockAllPairsResponse, mockMetadataResponse } from './mocks';

const multicallMock = jest.fn(async (_) => {});

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
    test('Check for optimal reserve route', async () => {
        const tokenIn = new Token(
            '0x4303d1d547fafa114f90b85356275c89465a60bf',
            6
        );
        const tokenOut = new Token(
            '0x94b47ebe537c9ac7b37bdf7a5f68e7b6a1f16eab',
            18
        );
        const tokenInWithAmount = TokenWithBalance.fromDecimal(tokenIn, '1');
        const router = new Router();
        const route = await router.getRoute(
            tokenInWithAmount,
            tokenOut,
            Chain.ARBITRUM_TESTNET
        );
        const expectedAmountOutBN = ethers.BigNumber.from('376246353196503');
        const slippage = '1000';
        expect(route.steps.length).toEqual(1);
        expect(route.steps[0].type).toEqual(2);
        expect(route.tokenOut.balanceBN).toEqual(expectedAmountOutBN);
        expect(route.minTokenOut.balanceBN).toEqual(
            expectedAmountOutBN.sub(expectedAmountOutBN.div(slippage))
        );
    });

    test('Check for optimal direct route', async () => {
        const tokenIn = new Token(
            '0x4303d1d547fafa114f90b85356275c89465a60bf',
            6
        );
        const tokenOut = new Token(
            '0x6C06aa45C300A55a810B4b36C73d861Cc8708833',
            18
        );
        const tokenInWithAmount = TokenWithBalance.fromDecimal(tokenIn, '1');
        const router = new Router();
        const route = await router.getRoute(
            tokenInWithAmount,
            tokenOut,
            Chain.ARBITRUM_TESTNET
        );
        const expectedAmountOutBN = ethers.BigNumber.from('995015936234114303');
        const slippage = '1000';
        expect(route.steps.length).toEqual(1);
        expect(route.steps[0].type).toEqual(0);
        expect(route.tokenOut.balanceBN).toEqual(expectedAmountOutBN);
        expect(route.minTokenOut.balanceBN).toEqual(
            expectedAmountOutBN.sub(expectedAmountOutBN.div(slippage))
        );
    });

    test('Check for optimal triangular route', async () => {
        const tokenIn = new Token(
            '0x58e948c6e48d3EbC909332e22972101425109Bf4',
            18
        );
        const tokenOut = new Token(
            '0x94b47ebE537C9ac7B37BDF7A5F68E7b6A1F16eAb',
            18
        );
        const tokenInWithAmount = TokenWithBalance.fromDecimal(tokenIn, '1');
        const router = new Router();
        const route = await router.getRoute(
            tokenInWithAmount,
            tokenOut,
            Chain.ARBITRUM_TESTNET
        );
        const expectedAmountOutBN = ethers.BigNumber.from('14722346352068');
        const slippage = '1000';
        expect(route.steps.length).toEqual(1);
        expect(route.steps[0].type).toEqual(1);
        expect(route.tokenOut.balanceBN).toEqual(expectedAmountOutBN);
        expect(route.minTokenOut.balanceBN).toEqual(
            expectedAmountOutBN.sub(expectedAmountOutBN.div(slippage))
        );
    });

    test('Check for slippage change', async () => {
        const tokenIn = new Token(
            '0x58e948c6e48d3EbC909332e22972101425109Bf4',
            18
        );
        const tokenOut = new Token(
            '0x94b47ebE537C9ac7B37BDF7A5F68E7b6A1F16eAb',
            18
        );
        const tokenInWithAmount = TokenWithBalance.fromDecimal(tokenIn, '1');
        const router = new Router();

        const slippage = 20000;
        const route = await router.getRoute(
            tokenInWithAmount,
            tokenOut,
            Chain.ARBITRUM_TESTNET,
            {
                slippage,
            }
        );
        const expectedAmountOutBN = ethers.BigNumber.from('14722346352068');
        expect(route.steps.length).toEqual(1);
        expect(route.steps[0].type).toEqual(1);
        expect(route.tokenOut.balanceBN).toEqual(expectedAmountOutBN);
        expect(route.minTokenOut.balanceBN).toEqual(
            expectedAmountOutBN.sub(expectedAmountOutBN.div(slippage))
        );
    });

    test('Check for two subsequent quotes', async () => {
        const tokenIn = new Token(
            '0x58e948c6e48d3EbC909332e22972101425109Bf4',
            18
        );
        const tokenOut = new Token(
            '0x94b47ebE537C9ac7B37BDF7A5F68E7b6A1F16eAb',
            18
        );
        const tokenInWithAmount = TokenWithBalance.fromDecimal(tokenIn, '1');
        const router = new Router();
        let route = await router.getRoute(
            tokenInWithAmount,
            tokenOut,
            Chain.ARBITRUM_TESTNET
        );
        const expectedAmountOutBN = ethers.BigNumber.from('14722346352068');
        const slippage = 1000;
        expect(route.steps.length).toEqual(1);
        expect(route.steps[0].type).toEqual(1);
        expect(route.tokenOut.balanceBN).toEqual(expectedAmountOutBN);
        expect(route.minTokenOut.balanceBN).toEqual(
            expectedAmountOutBN.sub(expectedAmountOutBN.div(slippage))
        );

        const tokenIn2 = new Token(
            '0x4303d1d547fafa114f90b85356275c89465a60bf',
            6
        );
        const tokenOut2 = new Token(
            '0x94b47ebe537c9ac7b37bdf7a5f68e7b6a1f16eab',
            18
        );
        const tokenInWithAmount2 = TokenWithBalance.fromDecimal(tokenIn2, '1');
        route = await router.getRoute(
            tokenInWithAmount2,
            tokenOut2,
            Chain.ARBITRUM_TESTNET
        );
        const expectedAmountOutBN2 = ethers.BigNumber.from('376246353196503');
        const slippage2 = '1000';
        expect(route.steps.length).toEqual(1);
        expect(route.steps[0].type).toEqual(2);
        expect(route.tokenOut.balanceBN).toEqual(expectedAmountOutBN2);
        expect(route.minTokenOut.balanceBN).toEqual(
            expectedAmountOutBN2.sub(expectedAmountOutBN2.div(slippage2))
        );
    });

    test('executeRoute works #1', async () => {
        const tokenIn = new Token(
            '0x4303d1d547fafa114f90b85356275c89465a60bf',
            6
        );
        const tokenOut = new Token(
            '0x94b47ebe537c9ac7b37bdf7a5f68e7b6a1f16eab',
            18
        );
        const tokenInWithAmount = TokenWithBalance.fromDecimal(tokenIn, '1');
        const router = new Router();
        const route = await router.getRoute(
            tokenInWithAmount,
            tokenOut,
            Chain.ARBITRUM_TESTNET
        );
        const expectedMulticallData =
            '0x5caf6ff000000000000000000000000094b47ebe537c9ac7b37bdf7a5f68e7b6a1f16eab000000000000000000000000220db2b860f817d43b6ee2733735274e51e7a491000000000000000000000000d0b12762620af08ddcf9c72f61d0d54c865b46ef00000000000000000000000000000000000000000000000000000000000f4240000000000000000000000000000000000000000000000000000155da143338ab0000000000000000000000008fd379246834eac74b8419ffda202cf8051f7a030000000000000000000000000000000000000000000000000000000017d90aa0';
        await router.executeRoute(
            route,
            new ethers.Wallet(
                'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
                new ethers.providers.JsonRpcProvider(
                    'https://public.stackup.sh/api/v1/node/arbitrum-sepolia'
                )
            )
        );
        expect(multicallMock).toHaveBeenLastCalledWith([expectedMulticallData]);
    });

    test('executeRoute works #2', async () => {
        const tokenIn = new Token(
            '0x4303d1d547fafa114f90b85356275c89465a60bf',
            6
        );
        const tokenOut = new Token(
            '0x6C06aa45C300A55a810B4b36C73d861Cc8708833',
            18
        );
        const tokenInWithAmount = TokenWithBalance.fromDecimal(tokenIn, '1');
        const router = new Router();
        const route = await router.getRoute(
            tokenInWithAmount,
            tokenOut,
            Chain.ARBITRUM_TESTNET
        );
        const expectedMulticallData =
            '0x5804636200000000000000000000000000000000000000000000000000000000000000a000000000000000000000000000000000000000000000000000000000000f42400000000000000000000000000000000000000000000000000dcb78c2ada97a7d0000000000000000000000008fd379246834eac74b8419ffda202cf8051f7a030000000000000000000000000000000000000000000000000000000017d90aa000000000000000000000000000000000000000000000000000000000000000020000000000000000000000004303d1d547fafa114f90b85356275c89465a60bf0000000000000000000000006c06aa45c300a55a810b4b36c73d861cc8708833';
        await router.executeRoute(
            route,
            new ethers.Wallet(
                'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
                new ethers.providers.JsonRpcProvider(
                    'https://public.stackup.sh/api/v1/node/arbitrum-sepolia'
                )
            )
        );
        expect(multicallMock).toHaveBeenLastCalledWith([expectedMulticallData]);
    });

    test('executeRoute works #3', async () => {
        const tokenIn = new Token(
            '0x58e948c6e48d3EbC909332e22972101425109Bf4',
            18
        );
        const tokenOut = new Token(
            '0x94b47ebE537C9ac7B37BDF7A5F68E7b6A1F16eAb',
            18
        );
        const tokenInWithAmount = TokenWithBalance.fromDecimal(tokenIn, '1');
        const router = new Router();
        const route = await router.getRoute(
            tokenInWithAmount,
            tokenOut,
            Chain.ARBITRUM_TESTNET
        );
        const expectedMulticallData =
            '0x5804636200000000000000000000000000000000000000000000000000000000000000a00000000000000000000000000000000000000000000000000de0b6b3a764000000000000000000000000000000000000000000000000000000000d6062b450540000000000000000000000008fd379246834eac74b8419ffda202cf8051f7a030000000000000000000000000000000000000000000000000000000017d90aa0000000000000000000000000000000000000000000000000000000000000000300000000000000000000000058e948c6e48d3ebc909332e22972101425109bf4000000000000000000000000220db2b860f817d43b6ee2733735274e51e7a49100000000000000000000000094b47ebe537c9ac7b37bdf7a5f68e7b6a1f16eab';
        await router.executeRoute(
            route,
            new ethers.Wallet(
                'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
                new ethers.providers.JsonRpcProvider(
                    'https://public.stackup.sh/api/v1/node/arbitrum-sepolia'
                )
            )
        );
        expect(multicallMock).toHaveBeenLastCalledWith([expectedMulticallData]);
    });
});
