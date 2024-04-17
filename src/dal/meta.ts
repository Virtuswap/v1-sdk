import { queryMeta } from './utils/execute';
import { Chain } from '../entities/chain';

export async function getBlockNumber(chain: Chain): Promise<number> {
    const meta = await queryMeta(chain);
    return meta.block.number;
}

export async function getBlockTimestamp(chain: Chain): Promise<number> {
    const meta = await queryMeta(chain);
    return meta.block.timestamp!;
}
