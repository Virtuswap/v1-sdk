import { keys, zipObject } from 'lodash';
import { vFactory } from './vFactory';
import { PoolState, vPool } from './vPool';
import { Chain, chainInfo } from '../../entities';
import { MulticallWrapper } from './utils/MulticallWrapper';
import { ethers } from 'ethers';
import { Interface } from '@ethersproject/abi';

class DEX {
    private multicalls: Record<string, MulticallWrapper> = {};

    constructor() {
        const chainNames = Object.keys(Chain).filter(
            (k) => typeof Chain[k as any] === 'number'
        );
        const chainIds = chainNames.map((k) => +Chain[k as any]);

        for (const chainId of chainIds) {
            const network = chainInfo[chainId];
            if (!network.factoryAddress) continue;
            const provider = new ethers.providers.StaticJsonRpcProvider(
                network.rpcUrl,
                chainId
            );
            this.multicalls[chainId] = new MulticallWrapper(provider);
        }
    }

    get erc20Interface(): Interface {
        return vPool.erc20Interface;
    }

    get vPairInterface(): Interface {
        return vPool.vPairInterface;
    }

    get vPairFactoryInterface(): Interface {
        return vFactory.vPairFactoryInterface;
    }

    getSupportedChains(): Chain[] {
        return Object.keys(this.multicalls).map((chainId) => +chainId as Chain);
    }

    async generatePoolsStates(
        chain: Chain,
        fetchTokenNamesAndSymbols?: boolean,
        poolsAddresses?: string[]
    ): Promise<Record<string, PoolState>> {
        const multicall = this.multicalls[chain];

        if (!poolsAddresses) {
            console.debug(`Chain ${chain}, generating all pools states`);
            const factoryAddress = chainInfo[chain].factoryAddress;
            const { pools } = await vFactory.generateFactoryState(
                factoryAddress,
                multicall
            );
            poolsAddresses = pools;
        } else {
            console.debug(
                `Chain ${chain}, generating pools states: ${poolsAddresses.join(', ')}`
            );
        }

        const poolsStates = await vPool.generateManyPoolsStates(
            poolsAddresses ?? [],
            multicall,
            fetchTokenNamesAndSymbols
        );
        return zipObject(poolsAddresses, poolsStates);
    }

    async regeneratePoolsStates(
        chain: Chain,
        poolsStates: Record<string, PoolState>
    ): Promise<Record<string, PoolState>> {
        const multicall = this.multicalls[chain];
        console.debug(
            `Chain ${chain}, regenerating pools states: ${keys(poolsStates).join(', ')}`
        );

        try {
            return await vPool.regenerateManyPoolsStates(
                poolsStates,
                multicall
            );
        } catch (e: any) {
            console.warn(e instanceof Error ? e.message : '' + e);

            const poolsAddresses = keys(poolsStates);
            const newPoolsStates = await vPool.generateManyPoolsStates(
                poolsAddresses,
                multicall
            );
            return zipObject(poolsAddresses, newPoolsStates);
        }
    }
}

export const dex = new DEX();
