import { ethers } from 'ethers';
import { TransactionResponse } from '@ethersproject/abstract-provider';

import { SwapType, ReserveRouteNode, Route, SwapOptions } from './entities';

import { getRoute } from '../utils';
import { Chain, chainInfo, Token } from '../entities';
import vRouter2Abi from '../artifacts/vRouter2Abi.json';
import vRouter3Abi from '../artifacts/vRouter3Abi.json';

const routerV2Interface = new ethers.utils.Interface(vRouter2Abi);
const routerV3Interface = new ethers.utils.Interface(vRouter3Abi);

export class Router {
    swapOptions: SwapOptions;

    constructor(swapOptions?: Partial<SwapOptions>) {
        this.swapOptions = {
            isExactInput: swapOptions?.isExactInput ?? true,
            slippage: swapOptions?.slippage ?? 1000,
            timeoutMs: swapOptions?.timeoutMs ?? 500,
            calculateMetrics: swapOptions?.calculateMetrics ?? false,
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
            calculateMetrics:
                swapOptions?.calculateMetrics ??
                this.swapOptions.calculateMetrics,
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

    private getRouterV2FunctionName(
        isVirtual: boolean,
        isExactInput: boolean,
        isFromNative: boolean,
        isToNative: boolean
    ): string {
        return `swap${isVirtual ? 'Reserve' : ''}${isExactInput ? 'Exact' : ''}${
            isFromNative ? 'ETH' : 'Tokens'
        }For${isExactInput ? '' : 'Exact'}${isToNative ? 'ETH' : 'Tokens'}`;
    }

    private getRouterV3FunctionName(
        isExactInput: boolean,
        isFromNative: boolean,
        isToNative: boolean
    ): string {
        return `multiSwap${isExactInput ? 'Exact' : ''}${
            isFromNative ? 'ETH' : 'Tokens'
        }For${isExactInput ? '' : 'Exact'}${isToNative ? 'ETH' : 'Tokens'}`;
    }

    generateMulticallDataV2(
        route: Route,
        userAddress: string,
        maxExecutionTime?: number
    ): string[] {
        const routerAddress = chainInfo[route.chain].router2Address;

        if (!routerAddress)
            throw new Error(`Cannot find routerV2 for chain ${route.chain}`);

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
                    functionName = this.getRouterV2FunctionName(
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
                    functionName = this.getRouterV2FunctionName(
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
            return routerV2Interface.encodeFunctionData(functionName, params);
        });

        if (isFromNative)
            multicallData.push(
                routerV2Interface.encodeFunctionData('refundETH')
            );

        return multicallData;
    }

    private getRealRouteV3Data(
        transitStartIndex: number,
        transitLength: number,
        amount: ethers.BigNumber
    ) {
        return ethers.BigNumber.from(transitStartIndex)
            .shl(192)
            .or(ethers.BigNumber.from(transitLength).shl(128))
            .or(amount);
    }

    private getVirtualRouteV3Data(
        transitStartIndex: number,
        amount: ethers.BigNumber
    ) {
        return ethers.BigNumber.from(transitStartIndex)
            .shl(192)
            .or(ethers.BigNumber.from(1).shl(64).sub(1).shl(128))
            .or(amount);
    }

    generateMultiSwapDataV3(
        route: Route,
        userAddress: string,
        maxExecutionTime?: number
    ): string {
        const routerAddress = chainInfo[route.chain].router3Address;

        if (!routerAddress)
            throw new Error(`Cannot find routerV3 for chain ${route.chain}`);

        const deadline = ethers.BigNumber.from(
            Math.floor(Date.now() / 1000) + (maxExecutionTime ?? 100000)
        );
        const isFromNative = route.tokenIn.isNative;
        const isToNative = route.tokenOut.isNative;

        const functionName = this.getRouterV3FunctionName(
            route.isExactInput,
            isFromNative,
            isToNative
        );

        const routeData: ethers.BigNumber[] = [];
        const transitTokens: string[] = [];

        for (const routeStep of route.steps) {
            const amount = route.isExactInput
                ? routeStep.amountInBn
                : routeStep.amountOutBn;
            switch (routeStep.type) {
                case SwapType.DIRECT:
                    routeData.push(this.getRealRouteV3Data(0, 0, amount));
                    break;
                case SwapType.TRIANGULAR:
                    const transitTokenAddress = routeStep.path[1].address;
                    let transitIndex =
                        transitTokens.indexOf(transitTokenAddress);
                    if (transitIndex < 0) {
                        transitIndex =
                            transitTokens.push(transitTokenAddress) - 1;
                    }
                    routeData.push(
                        this.getRealRouteV3Data(transitIndex, 1, amount)
                    );
                    break;
                case SwapType.VIRTUAL:
                    const commonTokenAddress = routeStep.path[1].address;
                    let commonIndex = transitTokens.indexOf(commonTokenAddress);
                    if (commonIndex < 0) {
                        commonIndex =
                            transitTokens.push(commonTokenAddress) - 1;
                    }
                    routeData.push(
                        this.getVirtualRouteV3Data(commonIndex, amount)
                    );
                    break;
                default:
                    const stepTransitTokens = routeStep.path
                        .slice(1, routeStep.path.length - 1)
                        .map((token) => token.address);
                    const startIndex = transitTokens.length;
                    transitTokens.push(...stepTransitTokens);
                    routeData.push(
                        this.getRealRouteV3Data(
                            startIndex,
                            stepTransitTokens.length,
                            amount
                        )
                    );
                    break;
            }
        }

        const params: any[] = [deadline, routeData, transitTokens];
        if (!isFromNative) params.push(route.tokenIn.address);
        if (!isToNative) params.push(route.tokenOut.address);
        params.push(userAddress);
        params.push(route.slippageThresholdAmount.balanceBN);

        return routerV3Interface.encodeFunctionData(functionName, params);
    }

    generateTransactionDataV2(
        route: Route,
        userAddress: string,
        maxExecutionTime?: number
    ): ethers.providers.TransactionRequest {
        const calldata = this.generateMulticallDataV2(
            route,
            userAddress,
            maxExecutionTime
        );

        const data = routerV2Interface.encodeFunctionData('multicall', [
            calldata,
        ]);

        return {
            chainId: route.chain,
            from: userAddress,
            to: chainInfo[route.chain].router2Address!,
            data,
            value: route.tokenIn.isNative
                ? route.isExactInput
                    ? route.tokenIn.balanceBN
                    : route.slippageThresholdAmount.balanceBN
                : '0',
        };
    }

    generateTransactionDataV3(
        route: Route,
        userAddress: string,
        maxExecutionTime?: number
    ): ethers.providers.TransactionRequest {
        const data = this.generateMultiSwapDataV3(
            route,
            userAddress,
            maxExecutionTime
        );

        return {
            chainId: route.chain,
            from: userAddress,
            to: chainInfo[route.chain].router3Address!,
            data,
            value: route.tokenIn.isNative
                ? route.isExactInput
                    ? route.tokenIn.balanceBN
                    : route.slippageThresholdAmount.balanceBN
                : '0',
        };
    }

    async executeMulticallV2(
        chain: Chain,
        multicallData: string[],
        signer: ethers.Signer,
        value?: ethers.BigNumber
    ): Promise<TransactionResponse> {
        const routerAddress = chainInfo[chain].router2Address;

        if (!routerAddress)
            throw new Error(`Cannot find routerV2 for chain ${chain}`);

        const routerContract = new ethers.Contract(
            routerAddress,
            vRouter2Abi,
            signer
        );
        return await routerContract.multicall(multicallData, {
            value: value ?? ethers.BigNumber.from('0'),
        });
    }

    async executeMultiSwapV3(
        chain: Chain,
        multiswapData: string,
        signer: ethers.Signer,
        value?: ethers.BigNumber
    ): Promise<TransactionResponse> {
        const routerAddress = chainInfo[chain].router3Address;

        if (!routerAddress)
            throw new Error(`Cannot find routerV3 for chain ${chain}`);

        return await signer.sendTransaction({
            chainId: chain,
            to: routerAddress,
            data: multiswapData,
            value: value ?? ethers.BigNumber.from('0'),
        });
    }
}
