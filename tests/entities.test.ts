import { ethers } from 'ethers';
import { Token, TokenWithBalance } from '../src/entities/token';
import { Pair, PairReserve } from '../src/entities/pair';
import { Chain, chainInfo } from '../src/entities/chain';

describe('Chain parameters', () => {
    test('chain id is set correctly', async () => {
        expect(Chain.POLYGON_MAINNET).toEqual(137);
        expect(Chain.POLYGON_TESTNET).toEqual(80002);
        expect(Chain.ARBITRUM_MAINNET).toEqual(42161);
        expect(Chain.ARBITRUM_TESTNET).toEqual(421614);
        expect(Chain.ZENCHAIN_TESTNET).toEqual(8408);
    });

    test('useBlockTimestamp parameter is set correctly', async () => {
        expect(chainInfo[Chain.ZENCHAIN_TESTNET].useBlockTimestamp).toBeTruthy;
        expect(chainInfo[Chain.ARBITRUM_TESTNET].useBlockTimestamp).toBeTruthy;
        expect(chainInfo[Chain.ARBITRUM_MAINNET].useBlockTimestamp).toBeTruthy;
        expect(chainInfo[Chain.POLYGON_TESTNET].useBlockTimestamp).toBeFalsy;
        expect(chainInfo[Chain.POLYGON_TESTNET].useBlockTimestamp).toBeFalsy;
    });

    test('router2Address is set', async () => {
        expect(chainInfo[Chain.ZENCHAIN_TESTNET].router2Address).toBeDefined;
        expect(chainInfo[Chain.ARBITRUM_TESTNET].router2Address).toBeDefined;
        expect(chainInfo[Chain.ARBITRUM_MAINNET].router2Address).toBeDefined;
        expect(chainInfo[Chain.POLYGON_TESTNET].router2Address).toBeDefined;
        expect(chainInfo[Chain.POLYGON_TESTNET].router2Address).toBeDefined;
    });

    test('router3Address is set', async () => {
        expect(chainInfo[Chain.ZENCHAIN_TESTNET].router3Address).toBeDefined;
        expect(chainInfo[Chain.ARBITRUM_TESTNET].router3Address).toBeDefined;
        expect(chainInfo[Chain.ARBITRUM_MAINNET].router3Address).toBeDefined;
        expect(chainInfo[Chain.POLYGON_TESTNET].router3Address).toBeDefined;
        expect(chainInfo[Chain.POLYGON_TESTNET].router3Address).toBeDefined;
    });
});

describe('Token', () => {
    const token = new Token(
        Chain.ARBITRUM_TESTNET,
        '0x0123456789ABCDEF0123456789ABCDEF01234567',
        18
    );

    test('passing wrong address fails', async () => {
        const wrongAddresses = [
            // without 0x
            '0000000000000000000000000000000000000000',
            // less than 42 symbols
            '0x00000000000000000000000000000000000000',
            // invalid hex values
            '0x00000000K0000000000000000000000000000000',
            '0x00000000,0000000000000000000000000000000',
            '0X0000000000000000000000000000000000000000',
            '1x0000000000000000000000000000000000000000',
            '0a0000000000000000000000000000000000000000',
        ];
        for (const wrongAddress of wrongAddresses) {
            expect(
                () => new Token(Chain.ARBITRUM_TESTNET, wrongAddress, 18)
            ).toThrow(`address ${wrongAddress} is not valid`);
        }
    });

    test('constructors work', async () => {
        const tokenWithBalance = TokenWithBalance.fromDecimal(
            token,
            '0.123456789123456789'
        );
        expect(tokenWithBalance.balanceBN.eq('123456789123456789')).toBeTruthy;
        expect(tokenWithBalance.balance).toEqual('0.123456789123456789');
    });

    test('tokenWithBalance constructor fails if wrong balance is passed', async () => {
        const wrongBalances = ['00.123', '0,123', '01.123', '1.'];
        for (const wrongBalance of wrongBalances) {
            expect(() =>
                TokenWithBalance.fromDecimal(token, wrongBalance)
            ).toThrow(`balance ${wrongBalance} is not valid`);
        }
    });

    test('getters work', async () => {
        const token1WithBalance1 = TokenWithBalance.fromDecimal(
            token,
            '0.123456789123456789'
        );
        const token1WithBalance2 = TokenWithBalance.fromBigNumber(
            token,
            '123456789123456789'
        );
        expect(token1WithBalance1.balanceBN.eq(token1WithBalance2.balanceBN))
            .toBeTruthy;
        expect(token1WithBalance1.balance).toEqual(token1WithBalance2.balance);
    });

    test('setters works', async () => {
        const tokenWithBalance = TokenWithBalance.fromDecimal(
            token,
            '0.123456789123456789'
        );
        tokenWithBalance.balanceBN = ethers.BigNumber.from('987654321');
        expect(tokenWithBalance.balance).toEqual('0.000000000987654321');
        tokenWithBalance.balance = '0.12345678';
        expect(tokenWithBalance.balanceBN.eq('123456780000000000'));
    });
});

describe('PairReserve', () => {
    const token1 = new Token(
        Chain.ARBITRUM_TESTNET,
        '0x0123456789ABCDEF0123456789ABCDEF01234567',
        18
    );
    const token2 = new Token(
        Chain.ARBITRUM_TESTNET,
        '0x76543210FEDCBA9876543210FEDCBA9876543210',
        6
    );
    const token1WithBalance = TokenWithBalance.fromDecimal(
        token1,
        '0.123456789123456789'
    );
    const token2WithBalance = TokenWithBalance.fromDecimal(token2, '0.123456');

    test('constructors works', async () => {
        const emptyPairReserve = PairReserve.empty(token1, token2);
        expect(emptyPairReserve.baseToken.balanceBN.eq('0')).toBeTruthy;
        expect(emptyPairReserve.reserveToken.balanceBN.eq('0')).toBeTruthy;
        expect(emptyPairReserve.baseToken.address).toEqual(
            ethers.utils.getAddress(
                '0x0123456789abcdef0123456789abcdef01234567'
            )
        );
        expect(emptyPairReserve.reserveToken.address).toEqual(
            ethers.utils.getAddress(
                '0x76543210fedcba9876543210fedcba9876543210'
            )
        );

        const pairReserve = new PairReserve(
            token1WithBalance,
            token2WithBalance
        );
        expect(pairReserve.baseToken.balanceBN.eq('123456789123456789'))
            .toBeTruthy;
        expect(pairReserve.reserveToken.balanceBN.eq('123456')).toBeTruthy;
        expect(pairReserve.baseToken.address).toEqual(
            ethers.utils.getAddress(
                '0x0123456789abcdef0123456789abcdef01234567'
            )
        );
        expect(pairReserve.reserveToken.address).toEqual(
            ethers.utils.getAddress(
                '0x76543210fedcba9876543210fedcba9876543210'
            )
        );
    });
});

describe('Pair', () => {
    const token1 = new Token(
        Chain.ARBITRUM_TESTNET,
        '0x0123456789ABCDEF0123456789ABCDEF01234567',
        18
    );
    const token2 = new Token(
        Chain.ARBITRUM_TESTNET,
        '0x76543210FEDCBA9876543210FEDCBA9876543210',
        6
    );
    const token3 = new Token(
        Chain.ARBITRUM_TESTNET,
        '0x1000000000000000000000000000000000000003',
        8
    );
    const token4 = new Token(
        Chain.ARBITRUM_TESTNET,
        '0x1000000000000000000000000000000000000004',
        4
    );
    const pair1 = new Pair(
        '0xabacabadaba0123456789abacabadaba01234567',
        TokenWithBalance.fromDecimal(token1, '0.123456789123456789'),
        TokenWithBalance.fromDecimal(token2, '0.123456'),
        40,
        1,
        123,
        997,
        997,
        2000,
        100,
        [token1.address, token2.address, token3.address],
        []
    );
    const pair2 = new Pair(
        '0x0000000000000000000000000000000000000002',
        TokenWithBalance.fromDecimal(token2, '0.123456'),
        TokenWithBalance.fromDecimal(token3, '0.12345678'),
        40,
        1,
        123,
        997,
        997,
        2000,
        100,
        [token1.address],
        []
    );
    const pair3 = new Pair(
        '0x0000000000000000000000000000000000000003',
        TokenWithBalance.fromDecimal(token1, '0.123456789987654321'),
        TokenWithBalance.fromDecimal(token3, '0.12345678'),
        40,
        1,
        123,
        997,
        997,
        2000,
        100,
        [],
        []
    );
    const pair4 = new Pair(
        '0x0000000000000000000000000000000000000004',
        TokenWithBalance.fromDecimal(token1, '0.123456789987654321'),
        TokenWithBalance.fromDecimal(token4, '0.1234'),
        40,
        1,
        123,
        997,
        997,
        2000,
        100,
        [],
        []
    );

    test('hasCommonTokenWith works', async () => {
        expect(pair1.hasCommonTokenWith(pair2)).toBeTruthy;
        expect(pair1.hasCommonTokenWith(pair3)).toBeTruthy;
        expect(pair2.hasCommonTokenWith(pair3)).toBeTruthy;
        expect(pair2.hasCommonTokenWith(pair4)).toBeFalsy;
    });

    test('getCommonToken works', async () => {
        expect(pair1.getCommonToken(pair2)?.address).toEqual(token2.address);
        expect(pair1.getCommonToken(pair3)?.address).toEqual(token1.address);
        expect(pair2.getCommonToken(pair3)?.address).toEqual(token3.address);
        expect(pair2.getCommonToken(pair1)?.address).toEqual(token2.address);
        expect(pair3.getCommonToken(pair4)).toBeNull;
    });

    test('isBlockedForVirtualTrading works for arbitrum-testnet', async () => {
        expect(pair1.isBlockedForVirtualTrading(Chain.ARBITRUM_TESTNET, 123))
            .toBeTruthy;
        expect(pair1.isBlockedForVirtualTrading(Chain.ARBITRUM_TESTNET, 3))
            .toBeTruthy;
        expect(pair1.isBlockedForVirtualTrading(Chain.ARBITRUM_TESTNET, 163))
            .toBeTruthy;
        expect(pair1.isBlockedForVirtualTrading(Chain.ARBITRUM_TESTNET, 164))
            .toBeFalsy;
        expect(pair1.isBlockedForVirtualTrading(Chain.ARBITRUM_TESTNET, 200))
            .toBeFalsy;
    });

    test('isBlockedForVirtualTrading works for polygon-testnet', async () => {
        expect(pair1.isBlockedForVirtualTrading(Chain.POLYGON_TESTNET, 1))
            .toBeTruthy;
        expect(pair1.isBlockedForVirtualTrading(Chain.POLYGON_TESTNET, 0))
            .toBeTruthy;
        expect(pair1.isBlockedForVirtualTrading(Chain.POLYGON_TESTNET, 41))
            .toBeTruthy;
        expect(pair1.isBlockedForVirtualTrading(Chain.POLYGON_TESTNET, 42))
            .toBeFalsy;
        expect(pair1.isBlockedForVirtualTrading(Chain.POLYGON_TESTNET, 50))
            .toBeFalsy;
    });

    test('hasTokenWithAddress works', async () => {
        expect(pair1.hasTokenWithAddress(token1.address)).toBeTruthy;
        expect(pair1.hasTokenWithAddress(token2.address)).toBeTruthy;
        expect(pair1.hasTokenWithAddress(token3.address)).toBeFalsy;
    });

    test('allowsTokenAsReserve works', async () => {
        expect(pair1.allowsTokenAsReserve(token1.address)).toBeTruthy;
        expect(pair1.allowsTokenAsReserve(token2.address)).toBeTruthy;
        expect(pair1.allowsTokenAsReserve(token3.address)).toBeTruthy;
        expect(pair1.allowsTokenAsReserve(token4.address)).toBeFalsy;
    });
});
