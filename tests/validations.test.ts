import {
    isAddressValid,
    isDecimalBalanceValid,
} from '../src/utils/validations';

describe('Validations', () => {
    test("wrong addresses aren't passed", async () => {
        const wrongAddresses = [
            '5aAeb6053F3E94C9b9A09f33669435E7Ef1BeAed',
            '0x5aAeb6053F3E94C9b9A09f33669435E7Ef1BeA',
            '0x5aAeb6053F3E94C9b9A09f33669435E7Ef1BeAed00',
            '0x5aAeb6053F3E94C9b9A09f33669435E7Ef1BeAeG',
            '0x5aAeb6053F3E94C9b9A09f33-669435E7Ef1BeAed',
        ];
        for (const wrongAddress of wrongAddresses) {
            expect(isAddressValid(wrongAddress)).toBe(false);
        }
    });

    test('correct addresses are passed', async () => {
        const correctAddresses = [
            '0x5aaeb6053F3E94C9b9A09f33669435E7Ef1BeAed',
            '0x5aAeb6053F3E94C9b9A09f33669435E7Ef1BeAed',
            '0xfB6916095ca1df60bB79Ce92cE3Ea74c37c5d359',
            '0x000000000000000000000000000000000000dEaD',
            '0x5aAeb6053F3E94C9b9A09f33669435E7Ef1BeAed',
            '0xfb6916095ca1df60bb79ce92ce3ea74c37c5d359',
        ];
        for (const correctAddress of correctAddresses) {
            expect(isAddressValid(correctAddress)).toBe(true);
        }
    });

    test("wrong balances aren't passed", async () => {
        const wrongBalances = [
            { balance: '01234.56', decimals: 2 },
            { balance: '00.01', decimals: 2 },
            //{ balance: '0.0', decimals: 18 }, // trailing zeros are OK, so this balance is not wrong
            { balance: '-123.45', decimals: 2 },
            { balance: '123.45', decimals: 1 },
            { balance: '123.a45', decimals: 3 },
            { balance: '123.45b', decimals: 3 },
            { balance: '123.', decimals: 0 },
            { balance: '123.', decimals: 2 },
            { balance: '0.123.123', decimals: 18 },
            { balance: '-0.01', decimals: 2 },
            { balance: '0,123', decimals: 18 },
        ];
        for (const wrongBalance of wrongBalances) {
            expect(
                isDecimalBalanceValid(
                    wrongBalance.balance,
                    wrongBalance.decimals
                )
            ).toBe(false);
        }
    });

    test('correct balances are passed', async () => {
        const correctBalances = [
            { balance: '.56', decimals: 2 },
            { balance: '1234', decimals: 0 },
            { balance: '0', decimals: 0 },
            { balance: '0.1234', decimals: 4 },
            { balance: '0.1234', decimals: 5 },
            { balance: '1234.5678', decimals: 9 },
            { balance: '1234.5678', decimals: 9 },
            { balance: '1234568912091902.5', decimals: 1 },
            { balance: '0.000000000000000001', decimals: 18 },
        ];
        for (const correctBalance of correctBalances) {
            expect(
                isDecimalBalanceValid(
                    correctBalance.balance,
                    correctBalance.decimals
                )
            ).toBe(true);
        }
    });
});
