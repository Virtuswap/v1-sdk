import { Result } from '@ethersproject/abi';
import { BytesLike, BigNumber as EthersBigNumber, ethers } from 'ethers';
import { parseInt } from 'lodash';
import { MultiResult } from './MulticallWrapper';

const isMultiResult = (
    result: MultiResult<BytesLike> | BytesLike
): result is MultiResult<BytesLike> => {
    return (
        typeof result === 'object' &&
        result !== null &&
        'success' in result &&
        'returnData' in result
    );
};

export const extractSuccessAndValue = (
    result: MultiResult<BytesLike> | BytesLike
): [boolean, BytesLike] => {
    return isMultiResult(result)
        ? [result.success, result.returnData]
        : [true, result];
};

export function generalDecoder<T>(
    result: MultiResult<BytesLike> | BytesLike,
    types: string[],
    defaultValue: T | undefined,
    parser?: (v: Result) => T
): T {
    const [isSuccess, toDecode] = extractSuccessAndValue(result);

    if (!isSuccess || toDecode === '0x') {
        if (defaultValue === undefined) {
            throw new Error(`Failed to decode result: ${result}`);
        }
        return defaultValue;
    }

    const decoded = ethers.utils.defaultAbiCoder.decode(types, toDecode);
    return parser ? parser(decoded) : decoded[0];
}

export const uint128ToBigNumber = (
    result: MultiResult<BytesLike> | BytesLike
): EthersBigNumber => {
    return generalDecoder(
        result,
        ['uint128'],
        ethers.constants.Zero,
        (value) => value[0]
    );
};

export const uint256DecodeToNumber = (
    result: MultiResult<BytesLike> | BytesLike
): number => {
    const [isSuccess, toDecode] = extractSuccessAndValue(result);

    if (!isSuccess) {
        return 0;
    }
    return parseInt(
        ethers.utils.defaultAbiCoder.decode(['uint256'], toDecode)[0],
        10
    );
};

export const uin256DecodeToFloat = (
    result: MultiResult<BytesLike> | BytesLike
): number => {
    const [isSuccess, toDecode] = extractSuccessAndValue(result);

    if (!isSuccess) {
        return 0;
    }
    return parseFloat(
        ethers.utils.defaultAbiCoder.decode(['uint256'], toDecode)[0]
    );
};

export const uin128DecodeToFloat = (
    result: MultiResult<BytesLike> | BytesLike
): number => {
    const [isSuccess, toDecode] = extractSuccessAndValue(result);

    if (!isSuccess) {
        return 0;
    }
    return parseFloat(
        ethers.utils.defaultAbiCoder.decode(['uint128'], toDecode)[0]
    );
};

export const uin128DecodeToInt = (
    result: MultiResult<BytesLike> | BytesLike
): number => {
    const [isSuccess, toDecode] = extractSuccessAndValue(result);

    if (!isSuccess) {
        return 0;
    }
    return parseInt(
        ethers.utils.defaultAbiCoder.decode(['uint128'], toDecode)[0],
        10
    );
};

export const booleanDecode = (
    result: MultiResult<BytesLike> | BytesLike
): boolean => {
    const [isSuccess, toDecode] = extractSuccessAndValue(result);

    if (!isSuccess) {
        return false;
    }
    return ethers.utils.defaultAbiCoder.decode(['bool'], toDecode)[0];
};

export const addressDecode = (
    result: MultiResult<BytesLike> | BytesLike
): string => {
    return generalDecoder(
        result,
        ['address'],
        ethers.constants.AddressZero,
        (v) => v[0].toLowerCase()
    );
};

export const addressArrayDecode = (
    result: MultiResult<BytesLike> | BytesLike
): string => {
    return generalDecoder(result, ['address[]'], [], (v) =>
        v[0].map((a: string) => a.toLowerCase())
    );
};

export const stringDecode = (
    result: MultiResult<BytesLike> | BytesLike
): string => {
    return generalDecoder(result, ['string'], '');
};

export const bytes32ToString = (
    result: MultiResult<BytesLike> | BytesLike
): string => {
    return generalDecoder(result, ['bytes32'], '', (value) =>
        value[0].toLowerCase()
    );
};

export const uint8ToNumber = (
    result: MultiResult<BytesLike> | BytesLike
): number => {
    return generalDecoder(result, ['uint8'], 0, (value) =>
        parseInt(value[0].toString(), 10)
    );
};

export const uint24ToNumber = (
    result: MultiResult<BytesLike> | BytesLike
): number => {
    return generalDecoder(result, ['uint24'], 0, (value) =>
        parseInt(value[0].toString(), 10)
    );
};
