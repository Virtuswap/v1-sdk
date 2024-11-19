# VirtuSwap V1 SDK
The SDK could be used to obtain info about pairs on VirtuSwap and execute trades.

## Installation
```bash
$ npm install @virtuswap/v1-sdk
```

## Quick Start
Firstly, create a new `Router` instance:
```typescript
import { Router } from '@virtuswap/v1-sdk';

const router = new Router();
```

Now you can request a route:
```typescript
const chain = 137; // Polygon (Mainnet)
const tokenIn = '0x0000000000000000000000000000000000000000'; // use zero address for native token (ETH, POL (MATIC), etc.)
const tokenOut = '0x57999936fC9A9EC0751a8D146CcE11901Be8beD0'; // VRSW on Polygon
const amount = '5000000000000000000'; // 5 POL (MATIC)

const route = await router.getRoute(tokenIn, tokenOut, amount, chain, { isExactInput: true });
```

The received `Route` object can be used to visualize the trading route steps, generate transaction data or execute the route.

A `TransactionRequest` object can be created using the `generateTransactionDataV3` method:
```typescript
// userAddress is the address that will receive tokens from the vRouter 1.3
const txRequest = router.generateTransactionDataV3(route, userAddress);
```
This object can be transferred to client and used to send a transaction using ethers.js v5:
```typescript
// signer is the wallet that will send the transaction to the vRouter 1.3
const tx = await signer.sendTransaction(txRequest);
await tx.wait();
```

You can also prepare the multiswap data and execute the multiswap on the client side:
```typescript
// userAddress is the address that will receive tokens from the vRouter 1.3
const multiSwapData = router.generateMultiSwapDataV3(route, userAddress);

// amount of native tokens to send
const value = route.tokenIn.isNative ? route.isExactInput ? route.tokenIn.balanceBN : route.slippageThresholdAmount.balanceBN : undefined;

// signer is the wallet that will send the transaction to the vRouter 1.3
const tx = await router.executeMultiSwapV3(route.chain, multiSwapData, signer, value);
await tx.wait();
```

## Examples
You can find our SDK usage examples in the following repositories: [frontend examples](https://github.com/Virtuswap/v1-sdk-frontend-example), [backend examples](https://github.com/Virtuswap/v1-sdk-backend-example).

## Documentation
Please check out the [SDK documentation](https://docs.virtuswap.io/virtuswap-documentation/technical-reference/typescript-sdk) for further information.
