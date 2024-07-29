import { ethers } from 'ethers';
import { TransactionResponse } from '@ethersproject/abstract-provider';

import { SwapType, ReserveRouteNode, Route, SwapOptions } from './entities';

import { getRoute } from '../utils';
import { Chain, chainInfo, Token } from '../entities';
import vRouterAbi from '../artifacts/vRouterAbi.json';

const routerInterface = new ethers.utils.Interface(vRouterAbi);

export class Router {
    swapOptions: SwapOptions;

    constructor(swapOptions?: Partial<SwapOptions>) {
        this.swapOptions = {
            isExactInput: swapOptions?.isExactInput ?? true,
            slippage: swapOptions?.slippage ?? 1000,
            timeoutMs: swapOptions?.timeoutMs ?? 500,
        };
    }

    async getRoute(
        tokenIn: string | Token,
        tokenOut: string | Token,
        amount: ethers.BigNumberish,
        chain: Chain,
        swapOptions?: Partial<SwapOptions>,
        loadTokensInfo?: boolean
    ): Promise<Route> {
        const localSwapOptions: SwapOptions = {
            isExactInput:
                swapOptions?.isExactInput ?? this.swapOptions.isExactInput,
            slippage: swapOptions?.slippage ?? this.swapOptions.slippage,
            timeoutMs: swapOptions?.timeoutMs ?? this.swapOptions.timeoutMs,
        };
        return await getRoute(
            {
                chain,
                tokenIn:
                    typeof tokenIn === 'string' ? tokenIn : tokenIn.address,
                tokenOut:
                    typeof tokenOut === 'string' ? tokenOut : tokenOut.address,
                amount: amount.toString(),
                ...localSwapOptions,
            },
            loadTokensInfo
        );
    }

    private getRouterFunctionName(
        isVirtual: boolean,
        isExactInput: boolean,
        isFromNative: boolean,
        isToNative: boolean
    ): string {
        return `swap${isVirtual ? 'Reserve' : ''}${isExactInput ? 'Exact' : ''}${
            isFromNative ? 'ETH' : 'Tokens'
        }For${isExactInput ? '' : 'Exact'}${isToNative ? 'ETH' : 'Tokens'}`;
    }

    async generateMulticallData(
        route: Route,
        userAddress: string,
        maxExecutionTime?: number
    ): Promise<string[]> {
        const deadline =
            Math.floor(Date.now() / 1000) + (maxExecutionTime ?? 100000);
        const isFromNative = route.tokenIn.isNative;
        const isToNative = route.tokenOut.isNative;
        const multicallData = route.steps.map((step) => {
            let functionName = 'undefined';
            let params: any[] = [];
            switch (step.type) {
                case SwapType.DIRECT:
                case SwapType.TRIANGULAR:
                    functionName = this.getRouterFunctionName(
                        false,
                        route.isExactInput,
                        isFromNative,
                        isToNative
                    );
                    params = [
                        step.path.map((value) => value.address),
                        route.isExactInput ? step.amountInBn : step.amountOutBn,
                        step.slippageThresholdAmountBn,
                        userAddress,
                        deadline,
                    ];
                    break;
                case SwapType.VIRTUAL:
                    functionName = this.getRouterFunctionName(
                        true,
                        route.isExactInput,
                        isFromNative,
                        isToNative
                    );
                    params = [
                        step.path[2].address,
                        step.path[1].address,
                        (step as ReserveRouteNode).ikPair,
                        route.isExactInput ? step.amountInBn : step.amountOutBn,
                        step.slippageThresholdAmountBn,
                        userAddress,
                        deadline,
                    ];
                    break;
            }
            return routerInterface.encodeFunctionData(functionName, params);
        });

        if (isFromNative)
            multicallData.push(routerInterface.encodeFunctionData('refundETH'));

        return multicallData;
    }

    async generateTransactionData(
        route: Route,
        userAddress: string,
        maxExecutionTime?: number
    ): Promise<ethers.providers.TransactionRequest> {
        const calldata = await this.generateMulticallData(
            route,
            userAddress,
            maxExecutionTime
        );

        const data = routerInterface.encodeFunctionData('multicall', [
            calldata,
        ]);

        return {
            chainId: route.chain,
            from: userAddress,
            to: chainInfo[route.chain].routerAddress,
            data,
            value: route.tokenIn.isNative
                ? route.isExactInput
                    ? route.tokenIn.balanceBN
                    : route.slippageThresholdAmount.balanceBN
                : '0',
        };
    }

    async executeMulticall(
        chain: Chain,
        multicallData: string[],
        signer: ethers.Signer,
        value?: ethers.BigNumber
    ): Promise<TransactionResponse> {
        const routerContract = new ethers.Contract(
            chainInfo[chain].routerAddress,
            vRouterAbi,
            signer
        );
        return await routerContract.multicall(multicallData, {
            value: value ?? ethers.BigNumber.from('0'),
        });
    }
}
