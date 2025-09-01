import _ from 'lodash';
import { PoolState } from '../blockchain/vPool';
import { Chain } from '../../entities';

export class PoolsCache {
    private readonly pools: Record<string, Record<string, Readonly<PoolState>>>;
    private readonly lastUpdates: Record<string, Date>;

    constructor() {
        this.pools = {};
        this.lastUpdates = {};
    }

    updateManyPools(poolsToUpdate: Record<string, Record<string, PoolState>>) {
        for (const chain in poolsToUpdate) {
            this.pools[chain] ??= {};
            this.lastUpdates[chain] = new Date();
            const chainPoolsToUpdate = poolsToUpdate[chain];
            for (const poolAddress in chainPoolsToUpdate) {
                this.pools[chain][poolAddress] = {
                    ...(this.pools[chain][poolAddress] ?? {}),
                    ...chainPoolsToUpdate[poolAddress],
                };
            }
        }
    }

    filterAndMapPools<T>(
        chain: Chain,
        filter: (address: string, pool: PoolState) => boolean,
        map: (address: string, pool: PoolState) => T
    ): T[] {
        return _.entries(this.pools[chain] ?? {})
            .filter(([address, state]) => filter(address, state))
            .map(([address, state]) => map(address, state));
    }

    mapPools<T>(
        chain: Chain,
        callback: (address: string, pool: PoolState) => T
    ): T[] {
        return _.entries(this.pools[chain] ?? {}).map(([address, state]) =>
            callback(address, state)
        );
    }

    getPool<T>(
        chain: Chain,
        address: string,
        callback: (pool?: PoolState) => T
    ): T {
        return callback(this.pools[chain]?.[address]);
    }

    includes(chain: Chain, address: string): boolean {
        return !!this.pools[chain]?.[address];
    }

    getLastUpdate(chain: Chain) {
        return this.lastUpdates[chain] || new Date(0);
    }
}

export const poolsCache = new PoolsCache();
