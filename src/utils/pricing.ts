import axios from 'axios';

import { Chain } from '../entities/chain';

export async function getMultipleTokensPriceUsd(
    chain: Chain,
    tokensAddresses: Array<string>
): Promise<Array<number>> {
    const params = new URLSearchParams({
        tokensAddresses: tokensAddresses.toString(),
        chainId: chain.toString(),
    });

    try {
        let response = await axios.get(
            `https://api.virtuswap.io/tokensPricesUsd?${params}`
        );
        return response.data.length == tokensAddresses.length
            ? response.data
            : [];
    } catch (e) {
        console.log(`Error fetching usd price: ${e}`);
        return [];
    }
}
