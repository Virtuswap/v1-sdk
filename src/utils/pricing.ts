import axios from 'axios';

import { Chain, chainInfo } from '../entities/chain';

export async function getTokenPriceUsd(
    chain: Chain,
    tokenAddress: string
): Promise<number> {
    if (chainInfo[chain].coingeckoId) {
        const params = new URLSearchParams({
            contract_addresses: tokenAddress,
            vs_currencies: 'usd',
        });
        try {
            let response = await axios.get(
                `https://api.coingecko.com/api/v3/simple/token_price/${chainInfo[chain].coingeckoId}?${params}`
            );
            return response.status === 200
                ? response.data[tokenAddress.toLowerCase()].usd
                : 0;
        } catch (e) {
            console.log(
                `Error fetching usd price of token ${tokenAddress}: ${e}`
            );
            return 0;
        }
    } else {
        return 0;
    }
}

export async function getMultipleTokensPriceUsd(
    chain: Chain,
    tokensAddresses: Array<string>
): Promise<Array<number>> {
    if (chainInfo[chain].coingeckoId) {
        const params = new URLSearchParams({
            tokensAddresses: tokensAddresses.toString(),
            chainId: chain.toString(),
        });

        try {
            let response = await axios.get(
                `https://api.virtuswap.io/tokensPricesUsd?${params}`
            );
            return response.status === 200 ? response.data : [];
        } catch (e) {
            console.log(`Error fetching usd price: ${e}`);
            return [];
        }
    } else {
        return [];
    }
}
