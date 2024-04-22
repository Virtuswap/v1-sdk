# VirtuSwap V1 SDK
The SDK could be used to obtain info about pairs on VirtuSwap and execute trades. Full documentation will be available soon.

## Installation
```bash
$ npm install @virtuswap/v1-sdk
```

## Basic usage
### Find and execute swap through VirtuSwap
```typescript
import { Router, TokenWithBalance, Token, Chain } from '@virtuswap/v1-sdk';
import { ethers } from 'ethers';

async function findAndExecuteRoute() {
  const router = new Router();
  const tokenIn = TokenWithBalance.fromDecimal(new Token('0xd1E094CabC5aCB9D3b0599C3F76f2D01fF8d3563', 18), '4');
  const tokenOut = new Token('0x82aF49447D8a07e3bd95BD0d56f35241523fBab1', 18);
  // Get route for swapping 4 VRSW to WETH on VirtuSwap
  const route = await router.getRoute(tokenIn, tokenOut, Chain.ARBITRUM_MAINNET);
  const signer = new ethers.Wallet(/* your wallet's private key */, /* ethers provider */);
  await router.executeRoute(route, signer);
}
```
### Get info about VirtuSwap pairs
```typescript
import { getAllPairs, Pair, Chain } from '@virtuswap/v1-sdk';

async function getPairs(chain: Chain): Promise<Array<Pair>> {
  return await getAllPairs(Chain.POLYGON_MAINNET);
}
```
