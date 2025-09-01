import { chunk } from 'lodash';
import { BytesLike, ethers } from 'ethers';
import { Signer } from '@ethersproject/abstract-signer';
import { Provider } from '@ethersproject/abstract-provider';
import Multicall3ABI from '../../../artifacts/Multicall3ABI.json';

export type MultiResult<T> = {
    success: boolean;
    returnData: T;
};

export type MulticallParams<T> = {
    target: string;
    callData: string;
    decodeFunction: (str: MultiResult<BytesLike> | BytesLike) => T;
    cb?: (data: T) => void;
};

export class MulticallWrapper {
    static readonly defaultAddress =
        '0xcA11bde05977b3631167028862bE2a173976CA11';
    private readonly multi: ethers.Contract;
    readonly defaultBatchSize: number;

    constructor(
        signerOrProvider?: Signer | Provider,
        contractAddress = MulticallWrapper.defaultAddress
    ) {
        this.multi = new ethers.Contract(
            contractAddress,
            Multicall3ABI,
            signerOrProvider
        );
        this.defaultBatchSize = 500;
    }

    async aggregate<T>(
        calls: MulticallParams<T>[],
        signerOrProvider?: Signer | Provider | null,
        batchSize: number = this.defaultBatchSize
    ): Promise<T[]> {
        const contract = signerOrProvider
            ? this.multi.connect(signerOrProvider)
            : this.multi;
        const aggregatedResult = await Promise.all(
            chunk(calls, batchSize).map(async (batch) =>
                contract.callStatic.aggregate(batch)
            )
        );

        let globalInd = 0;
        const resultsUndecoded: string[] = new Array(calls.length);
        for (const res of aggregatedResult) {
            for (const element of res.returnData) {
                resultsUndecoded[globalInd++] = element;
            }
        }

        const results: T[] = new Array(resultsUndecoded.length);
        for (const [i, undecodedElement] of resultsUndecoded.entries()) {
            results[i] = calls[i].decodeFunction(undecodedElement);
            calls[i].cb?.(results[i]);
        }
        return results;
    }

    async tryAggregate<T>(
        mandatory: boolean,
        calls: MulticallParams<T>[],
        signerOrProvider?: Signer | Provider | null,
        batchSize: number = this.defaultBatchSize,
        reportFails: boolean = true
    ): Promise<MultiResult<T>[]> {
        const contract = signerOrProvider
            ? this.multi.connect(signerOrProvider)
            : this.multi;
        const allCalls = new Array(Math.ceil(calls.length / batchSize));
        for (let i = 0; i < calls.length; i += batchSize) {
            allCalls[Math.floor(i / batchSize)] = calls.slice(i, i + batchSize);
        }

        const aggregatedResult = await Promise.all(
            allCalls.map((batch) =>
                contract.callStatic.tryAggregate(mandatory, batch)
            )
        );

        let globalInd = 0;
        const resultsUndecoded: MultiResult<string>[] = new Array(calls.length);
        for (const res of aggregatedResult) {
            for (const element of res) {
                resultsUndecoded[globalInd++] = element;
            }
        }

        const results: MultiResult<T>[] = new Array(resultsUndecoded.length);
        for (const [i, undecodedElement] of resultsUndecoded.entries()) {
            if (!undecodedElement.success) {
                if (reportFails) {
                    console.error(
                        `Multicall request number ${i} for ${calls[i].target} failed`
                    );
                }

                results[i] = {
                    success: false,
                } as MultiResult<T>;
                continue;
            }

            results[i] = {
                success: true,
                returnData: calls[i].decodeFunction(
                    undecodedElement.returnData
                ),
            } as MultiResult<T>;

            calls[i].cb?.(results[i].returnData);
        }

        return results;
    }
}
