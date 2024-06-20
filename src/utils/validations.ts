export function isAddressValid(address: string): boolean {
    // a valid address must be a hexadecimal string with length 42 (including '0x')
    const validAddressRegex = new RegExp('^0x[0-9a-fA-F]{40}$');
    return validAddressRegex.test(address);
}

export function isDecimalBalanceValid(
    balance: string,
    decimals: number
): boolean {
    // a valid balance must be non-negative decimal value without leading zeros
    const validBalanceRegex = new RegExp(
        decimals > 0
            ? `^(?!0\\d)\\d*(?:\\.\\d{1,${decimals}})?$`
            : `^(?!0\\d)\\d*$`
    );
    return validBalanceRegex.test(balance);
}
