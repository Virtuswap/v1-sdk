import axios from 'axios';
import { Chain, chainInfo } from '../../../entities';

let id = 0;

const CACHE_TIME_MS = 1000;

const blockNumbersCache = {} as Record<
    Chain,
    { blockNumber: number; lastUpdate: number }
>;
const blockNumbersFetchQueue = {} as Record<Chain, Promise<number>>;

export async function getBlockNumber(chain: Chain): Promise<number> {
    const currentTime = Date.now();
    if (
        currentTime <=
        (blockNumbersCache[chain]?.lastUpdate ?? 0) + CACHE_TIME_MS
    )
        return blockNumbersCache[chain].blockNumber;
    const blockNumberPromise =
        blockNumbersFetchQueue[chain] ??
        axios
            .post(
                chainInfo[chain]?.rpcUrl,
                {
                    id: id++,
                    jsonrpc: '2.0',
                    method: 'eth_blockNumber',
                    params: [],
                },
                {
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                }
            )
            .then(({ data }) => {
                const blockNumber = Number(data.result);
                if (blockNumbersFetchQueue[chain] === blockNumberPromise) {
                    blockNumbersCache[chain] = {
                        lastUpdate: currentTime,
                        blockNumber,
                    };
                }
                return blockNumber;
            })
            .finally(() => {
                if (blockNumbersFetchQueue[chain] === blockNumberPromise) {
                    delete blockNumbersFetchQueue[chain];
                }
            });
    blockNumbersFetchQueue[chain] ??= blockNumberPromise;
    return await blockNumberPromise;
}

export async function getBlockTimestamp(
    chain: Chain,
    fetchBlock = false
): Promise<number> {
    if (!fetchBlock) return Math.floor(Date.now() / 1000);
    const { data } = await axios.post(
        chainInfo[chain]?.rpcUrl,
        {
            id: id++,
            jsonrpc: '2.0',
            method: 'eth_getBlockByNumber',
            params: ['latest', false],
        },
        {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        }
    );
    return Number(data.result.timestamp);
}
