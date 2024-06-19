import { ethers } from 'ethers';

import { isAddressValid, isDecimalBalanceValid } from '../utils/validations';

export abstract class BaseToken {
    public abstract isNative: boolean;
    public abstract isErc20: boolean;
    public readonly chainId: number;
    public readonly decimals: number;
    public readonly name?: string;
    public readonly symbol?: string;

    public abstract eq(other: Token): boolean;

    protected constructor(chainId: number, decimals: number, symbol?: string, name?: string) {
        this.chainId = chainId;
        this.decimals = decimals;
        this.symbol = symbol;
        this.name = name;
    }
}

export class Erc20Token extends BaseToken {
    public readonly isNative = false;
    public readonly isErc20 = true;
    public readonly address: string;

    public constructor(chainId: number, address: string, decimals: number, symbol?: string, name?: string) {
        super(chainId, decimals, symbol, name);
        if (!isAddressValid(address)) {
            throw new Error(`address ${address} is not valid`);
        }
        // translate to checksum address
        this.address = ethers.utils.getAddress(address);
    }

    public eq(other: Token): boolean {
        return other.isErc20 && this.chainId === other.chainId && this.address === other.address;
    }
}

export class NativeToken extends BaseToken {
    public readonly isNative = true;
    public readonly isErc20 = false;

    public constructor(chainId: number, decimals: number, symbol?: string, name?: string) {
        super(chainId, decimals, symbol, name);
    }

    public eq(other: Token): boolean {
        return other.isNative && this.chainId === other.chainId;
    }
}

export class TokenWithBalance<T extends BaseToken> {
    public readonly token: T;
    private _balance: string;

    private constructor(token: T, balance: string) {
        this.token = token;
        console.log(isDecimalBalanceValid(balance, token.decimals));
        if (!isDecimalBalanceValid(balance, token.decimals)) {
            throw new Error(`balance ${balance} is not valid`);
        }
        this._balance = balance;
    }

    static fromBigNumber<T extends BaseToken>(token: T, balance: ethers.BigNumberish): TokenWithBalance<T> {
        return new TokenWithBalance(token, ethers.utils.formatUnits(balance, token.decimals));
    }

    static fromDecimal<T extends BaseToken>(token: T, balance: string): TokenWithBalance<T> {
        return new TokenWithBalance(token, balance);
    }

    get balanceBN(): ethers.BigNumber {
        return ethers.utils.parseUnits(this._balance, this.token.decimals);
    }

    get balance(): string {
        return this._balance;
    }

    set balanceBN(balanceBN: ethers.BigNumber) {
        this._balance = ethers.utils
            .formatUnits(balanceBN, this.token.decimals)
            .toString();
    }

    set balance(balance: string) {
        this._balance = balance;
    }
}

export type Token = NativeToken | Erc20Token;
