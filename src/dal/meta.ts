import { MetadataDocument, execute } from './.graphclient';

export async function getBlockNumber(): Promise<number> {
    const meta = await execute(MetadataDocument, {});
    return meta.data._meta.block.number;
}

export async function getBlockTimestamp(): Promise<number> {
    const meta = await execute(MetadataDocument, {});
    return meta.data._meta.block.timestamp;
}
