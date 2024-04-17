import { getTokenPriceUsd } from '../src/utils/pricing';
import { Chain } from '../src/entities/chain';

describe('Pricing', () => {
    test('Price fetching works', async () => {
        const priceUsd = await getTokenPriceUsd(
            Chain.POLYGON_MAINNET,
            '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174'
        );
        expect(priceUsd).toBeGreaterThan(0);
    });

    test('Price fetching fails if wrong address is specified', async () => {
        const priceUsd = await getTokenPriceUsd(
            Chain.POLYGON_MAINNET,
            '0x0000000000000000000000000000000000000000'
        );
        expect(priceUsd).toEqual(0);
    });
});
