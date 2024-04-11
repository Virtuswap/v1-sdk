import { ethers } from 'ethers';

import { Address } from './utils';

export class Token {
    readonly address: Address;
    readonly decimals: number;

    constructor(address: string, decimals: number) {
        this.address = new Address(address);
        this.decimals = decimals;
    }
}

export class TokenWithBalance extends Token {
    private _balance: string;

    private constructor(address: string, decimals: number, balance: string) {
        super(address, decimals);
        this._balance = balance;
    }

    static fromBigNumber(
        token: Token,
        balance: ethers.BigNumberish
    ): TokenWithBalance {
        return new TokenWithBalance(
            token.address.toString(),
            token.decimals,
            ethers.utils.formatUnits(balance, token.decimals)
        );
    }

    static fromDecimal(token: Token, balance: string): TokenWithBalance {
        return new TokenWithBalance(
            token.address.toString(),
            token.decimals,
            balance
        );
    }

    get balanceBN(): ethers.BigNumber {
        return ethers.utils.parseUnits(this._balance, this.decimals);
    }

    get balance(): string {
        return this._balance;
    }

    set balanceBN(balanceBN: ethers.BigNumber) {
        this._balance = ethers.utils.formatUnits(balanceBN, this.decimals);
    }

    set balance(balance: string) {
        this._balance = balance;
    }
}
