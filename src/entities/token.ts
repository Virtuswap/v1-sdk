import { ethers } from 'ethers';

import { isAddressValid, isDecimalBalanceValid } from '../utils/validations';
import { Chain } from './chain';

export type TokenParams = {
    chainId: number;
    address: string;
    decimals: number;
    symbol?: string;
    name?: string;
};

export class Token {
    public readonly chainId: Chain;
    public readonly address: string;
    public readonly decimals: number;
    public readonly name?: string;
    public readonly symbol?: string;

    public constructor(
        chainId: Chain,
        address: string,
        decimals: number,
        symbol?: string,
        name?: string
    ) {
        this.chainId = chainId;
        this.decimals = decimals;
        this.symbol = symbol;
        this.name = name;
        if (!isAddressValid(address)) {
            throw new Error(`address ${address} is not valid`);
        }
        // translate to checksum address
        this.address = ethers.utils.getAddress(address);
    }

    static from(params: TokenParams) {
        return new Token(
            params.chainId,
            params.address,
            params.decimals,
            params.symbol,
            params.name
        );
    }

    get isNative(): boolean {
        return (
            this.address === ethers.constants.AddressZero ||
            this.address === '0x0000000000000000000000000000000000001010' ||
            this.address === '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE'
        );
    }

    get isErc20(): boolean {
        return !this.isNative;
    }

    public eq(other: Token): boolean {
        return this.chainId === other.chainId && this.address === other.address;
    }
}

export class TokenWithBalance extends Token {
    private _balance: string;

    private constructor(token: TokenParams, balance: string) {
        super(
            token.chainId,
            token.address,
            token.decimals,
            token.symbol,
            token.name
        );
        if (!isDecimalBalanceValid(balance, token.decimals)) {
            throw new Error(`balance ${balance} is not valid`);
        }
        this._balance = balance;
    }

    static fromBigNumber(
        token: TokenParams,
        balance: ethers.BigNumberish
    ): TokenWithBalance {
        return new TokenWithBalance(
            token,
            ethers.utils.formatUnits(balance, token.decimals)
        );
    }

    static fromDecimal(token: TokenParams, balance: string): TokenWithBalance {
        return new TokenWithBalance(token, balance);
    }

    get balanceBN(): ethers.BigNumber {
        return ethers.utils.parseUnits(this._balance, this.decimals);
    }

    get balance(): string {
        return this._balance;
    }

    set balanceBN(balanceBN: ethers.BigNumber) {
        this._balance = ethers.utils
            .formatUnits(balanceBN, this.decimals)
            .toString();
    }

    set balance(balance: string) {
        this._balance = balance;
    }
}
