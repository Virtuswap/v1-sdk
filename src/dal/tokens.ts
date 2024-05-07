import { Token } from '../entities/token';
import { Chain } from '../entities/chain';
import { queryAllTokens, RawToken } from './utils/execute';

export async function getAllTokens(chain: Chain): Promise<Array<Token>> {
    const tokens = await queryAllTokens(chain);
    return tokens.map((token: RawToken) => new Token(token.id, token.decimals));
}
