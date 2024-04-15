export class Address {
    private readonly address: string;

    constructor(address: string) {
        this.address = address.toLowerCase();
    }

    eq(another: Address): boolean {
        return this.address === another.address;
    }

    neq(another: Address): boolean {
        return !this.eq(another);
    }

    toString(): string {
        return this.address;
    }
}
