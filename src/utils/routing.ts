import axios from 'axios';

import {
    Chain,
    chainInfo,
    MainnetChain,
    TestnetChain,
    TokenParams,
    TokenWithBalance,
} from '../entities';
import { Route } from '../router';
import { ethers } from 'ethers';
import { getAllTokens } from '../dal';

type RouteParams = {
    chain: Chain;
    tokenIn: string;
    tokenOut: string;
    amount: string;
    slippage?: number;
    isExactInput?: boolean;
    timeoutMs?: number;
    calculateMetrics?: boolean;
};

const mainnetDomain = 'api.virtuswap.io';
const testnetDomain = 'api-integration.virtuswap.io';

const getNativeNameAndSymbolFromWrapped = (token?: TokenParams) => {
    if (!token) return undefined;

    return {
        name:
            token.name && token.name.startsWith('Wrapped ')
                ? token.name.substring(8)
                : token.name,
        symbol:
            token.symbol && token.symbol.startsWith('W')
                ? token.symbol.substring(1)
                : token.symbol,
    };
};

export async function getRoute(
    {
        chain,
        tokenIn,
        tokenOut,
        amount,
        slippage,
        isExactInput,
        timeoutMs,
        calculateMetrics,
    }: RouteParams,
    loadTokensInfo?: boolean
): Promise<Route> {
    let domain: string;
    if (chain in MainnetChain) {
        domain = mainnetDomain;
    } else if (chain in TestnetChain) {
        domain = testnetDomain;
    } else {
        throw new Error('Unsupported chain: ' + chain);
    }

    const urlParams = new URLSearchParams({
        chain: chain.toString(),
        tokenIn: tokenIn.toString(),
        tokenOut: tokenOut.toString(),
        amount: amount.toString(),
        slippage: (slippage ?? 1000).toString(),
        isExactInput: (isExactInput ?? true).toString(),
        timeoutMs: (timeoutMs ?? 500).toString(),
        calculateMetrics: (calculateMetrics ?? false).toString(),
    });

    try {
        const routePromise = axios.get<{ route: any }>(
            `https://${domain}/sdk/v1/route?${urlParams}`
        );
        const tokensPromise = loadTokensInfo
            ? getAllTokens(chain)
            : Promise.resolve([]);

        const [routeResponse, tokensResponse] = await Promise.all([
            routePromise,
            tokensPromise,
        ]);
        const route = routeResponse.data.route;
        if (!route || !route.steps?.length) throw new Error('Cannot get route');
        const restoreToken = loadTokensInfo
            ? (token: TokenParams & { _balance: string }) =>
                  TokenWithBalance.fromDecimal(
                      token.address === ethers.constants.AddressZero
                          ? {
                                ...token,
                                ...getNativeNameAndSymbolFromWrapped(
                                    tokensResponse.find(
                                        ({ address }) =>
                                            address ===
                                            chainInfo[chain].weth9Address
                                    )
                                ),
                            }
                          : tokensResponse.find(
                                ({ address }) => address === token.address
                            ) ?? token,
                      token._balance
                  )
            : (token: TokenParams & { _balance: string }) =>
                  TokenWithBalance.fromDecimal(token, token._balance);
        return {
            ...route,
            tokenIn: restoreToken(route.tokenIn),
            tokenOut: restoreToken(route.tokenOut),
            slippageThresholdAmount: restoreToken(
                route.slippageThresholdAmount
            ),
            steps: route.steps.map((step: any) => ({
                ...step,
                amountInBn: ethers.BigNumber.from(step.amountInBn),
                amountOutBn: ethers.BigNumber.from(step.amountOutBn),
                slippageThresholdAmountBn: ethers.BigNumber.from(
                    step.slippageThresholdAmountBn
                ),
                path: step.path.map((token: any) => restoreToken(token)),
            })),
        };
    } catch (e) {
        if (axios.isAxiosError(e)) {
            const data = e.response?.data;
            throw new Error(typeof data === 'string' ? data : e.message);
        } else {
            throw e;
        }
    }
}
