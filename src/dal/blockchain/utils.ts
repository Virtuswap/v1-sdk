import { MultiResult } from './utils/MulticallWrapper';
import { BytesLike, ethers } from 'ethers';
import {
    addressDecode,
    booleanDecode,
    extractSuccessAndValue,
    generalDecoder,
    stringDecode,
} from './utils/decoders';
import { parseInt } from 'lodash';

class AbiCoderResultParser<TResult> {
    constructor(
        readonly decoderFactory: (
            type?: string
        ) => (val: MultiResult<BytesLike> | BytesLike) => TResult
    ) {}

    create<TName extends string>(name: TName, type: string) {
        return {
            name,
            type,
            decodeFunction: this.decoderFactory(type),
        } as const;
    }
}

export const abiCoderParsers = {
    Address: new AbiCoderResultParser(() => addressDecode),

    String: new AbiCoderResultParser(() => stringDecode),

    BigInt: new AbiCoderResultParser(
        (type?: string) =>
            (result: MultiResult<BytesLike> | BytesLike): bigint =>
                generalDecoder(
                    result,
                    [type ?? 'uint256'],
                    BigInt(0),
                    (value) => value[0].toBigInt()
                )
    ),

    BigNumber: new AbiCoderResultParser(
        (type?: string) =>
            (result: MultiResult<BytesLike> | BytesLike): ethers.BigNumber =>
                generalDecoder(
                    result,
                    [type ?? 'uint256'],
                    ethers.constants.Zero,
                    (value) => ethers.BigNumber.from(value[0].toBigInt())
                )
    ),

    Int: new AbiCoderResultParser(
        (type?: string) =>
            (result: MultiResult<BytesLike> | BytesLike): number => {
                const [isSuccess, toDecode] = extractSuccessAndValue(result);
                if (!isSuccess) return 0;
                return parseInt(
                    ethers.utils.defaultAbiCoder.decode(
                        [type ?? 'uint256'],
                        toDecode
                    )[0],
                    10
                );
            }
    ),

    Bool: new AbiCoderResultParser(() => booleanDecode),
} as const;
