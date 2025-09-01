import {
    chunk,
    fromPairs,
    groupBy,
    keys,
    last,
    map,
    mapValues,
    uniq,
    zipObject,
} from 'lodash';
import vPair from '../../artifacts/vPair.json';
import erc20 from '../../artifacts/ERC20.json';
import { Interface } from '@ethersproject/abi';
import { MulticallParams, MulticallWrapper } from './utils/MulticallWrapper';
import { abiCoderParsers } from './utils';
import { ethers } from 'ethers';

type Erc20Info<UseExtendedInfo> = UseExtendedInfo extends true
    ? { decimals: number; symbol: string; name: string }
    : { decimals: number; symbol: undefined; name: undefined };

export type PoolState = {
    token0: string;
    token1: string;
    pairBalance0: ethers.BigNumber;
    pairBalance1: ethers.BigNumber;
    decimals0: number;
    decimals1: number;
    symbol0?: string;
    symbol1?: string;
    name0?: string;
    name1?: string;
    fee: number;
    vFee: number;
    lastSwapBlock: number;
    blocksDelay: number;
    reservesBaseValueSum: ethers.BigNumber;
    maxReserveRatio: ethers.BigNumber;
    rRatio: ethers.BigNumber;
    reserves: Record<
        string,
        {
            balance: ethers.BigNumber;
            baseValue: ethers.BigNumber;
            decimals: number;
        }
    >;
};

export class vPool {
    static readonly vPairInterface = new Interface(vPair.abi);
    static readonly erc20Interface = new Interface(erc20.abi);
    static readonly contractStateFunctionsParsers = [
        abiCoderParsers.Address.create('token0', 'address'),
        abiCoderParsers.Address.create('token1', 'address'),
        abiCoderParsers.BigNumber.create('pairBalance0', 'uint112'),
        abiCoderParsers.BigNumber.create('pairBalance1', 'uint112'),
        abiCoderParsers.Int.create('fee', 'uint16'),
        abiCoderParsers.Int.create('vFee', 'uint16'),
        abiCoderParsers.Int.create('lastSwapBlock', 'uint128'),
        abiCoderParsers.Int.create('blocksDelay', 'uint128'),
        abiCoderParsers.BigNumber.create('reservesBaseValueSum', 'uint256'),
        abiCoderParsers.BigNumber.create('maxReserveRatio', 'uint256'),
        abiCoderParsers.BigNumber.create('calculateReserveRatio', 'uint256'),
        abiCoderParsers.Int.create('allowListLength', 'uint256'),
    ] as const;
    static readonly contractAllowListAddressParser =
        abiCoderParsers.Address.create('allowList', 'address');
    static readonly contractReservesBaseValueParser =
        abiCoderParsers.BigNumber.create('reservesBaseValue', 'uint256');
    static readonly contractReservesParser = abiCoderParsers.BigNumber.create(
        'reserves',
        'uint256'
    );
    static readonly erc20DecimalsParser = abiCoderParsers.Int.create(
        'decimals',
        'uint8'
    );
    static readonly erc20SymbolParser = abiCoderParsers.String.create(
        'symbol',
        'string'
    );
    static readonly erc20NameParser = abiCoderParsers.String.create(
        'name',
        'string'
    );
    static readonly erc20StateFunctionsParsers = [
        this.erc20DecimalsParser,
        this.erc20SymbolParser,
        this.erc20NameParser,
    ] as const;

    /**
     * Get initial data and allowListLength of the pools
     * @param pools - Array of pool addresses
     * @param multiWrapper - MultiWrapper instance
     * @param vPairIface - Interface for the vPair contract
     * @returns Initial states of the pools (without reserves) and allowList lengths
     * @private
     */
    private static async getPoolsInitialStates(
        pools: string[],
        multiWrapper: MulticallWrapper,
        vPairIface: Interface = vPool.vPairInterface
    ) {
        const initialMultiCallParams = pools.flatMap((poolAddress) =>
            vPool.contractStateFunctionsParsers.map(
                ({ name, decodeFunction }) =>
                    ({
                        target: poolAddress,
                        callData: vPairIface.encodeFunctionData(name),
                        decodeFunction,
                    }) as MulticallParams<ReturnType<typeof decodeFunction>>
            )
        );

        const poolsInitialReturnData = await multiWrapper.aggregate(
            initialMultiCallParams
        );

        const chunkedInitialReturnData = chunk(
            poolsInitialReturnData,
            vPool.contractStateFunctionsParsers.length
        );

        type stateFunctionParserType =
            (typeof vPool.contractStateFunctionsParsers)[number];

        const poolsInitialStates = chunkedInitialReturnData.map(
            (initialReturnData) =>
                fromPairs(
                    vPool.contractStateFunctionsParsers
                        .filter(({ name }) => name !== 'allowListLength')
                        .map(({ name }, i) => [
                            name === 'calculateReserveRatio' ? 'rRatio' : name,
                            initialReturnData[i],
                        ])
                ) as Pick<
                    PoolState,
                    | Exclude<
                          stateFunctionParserType['name'],
                          'calculateReserveRatio' | 'allowListLength'
                      >
                    | 'rRatio'
                >
        );

        const allowListsLengths = chunkedInitialReturnData.map(
            (initialReturnData) => last(initialReturnData) as number
        );

        return {
            poolsInitialStates,
            allowListsLengths,
        };
    }

    /**
     * Get tokens infos (decimals and symbol with name if required) of the pools
     * @template T - Boolean flag controlling whether to fetch token names and symbols:
     *  if `true`, the result will include `name` and `symbol` for each token,
     *  if `false`, only `decimals` are fetched
     * @param pools - Array of pools infos (tokens of pools)
     * @param multiWrapper - MultiWrapper instance
     * @param fetchTokenNamesAndSymbols - Whether to fetch token names and symbols for ERC20 tokens
     * @param erc20Iface - Interface for the ERC20 contract
     * @returns Dictionary of tokens infos
     * @private
     */
    private static async getPoolsTokensInfos<T extends boolean>(
        pools: { token0: string; token1: string }[],
        multiWrapper: MulticallWrapper,
        fetchTokenNamesAndSymbols: T,
        erc20Iface: Interface = vPool.erc20Interface
    ): Promise<Record<string, Erc20Info<T>>> {
        const tokens = uniq(
            pools.flatMap(({ token0, token1 }) => [token0, token1])
        );

        if (fetchTokenNamesAndSymbols) {
            const initialMultiCallParams = tokens.flatMap((tokenAddress) =>
                vPool.erc20StateFunctionsParsers.map(
                    ({ name, decodeFunction }) =>
                        ({
                            target: tokenAddress,
                            callData: erc20Iface.encodeFunctionData(name),
                            decodeFunction,
                        }) as MulticallParams<ReturnType<typeof decodeFunction>>
                )
            );

            const tokensInitialReturnData = await multiWrapper.aggregate(
                initialMultiCallParams
            );

            const chunkedInitialReturnData = chunk(
                tokensInitialReturnData,
                vPool.erc20StateFunctionsParsers.length
            );

            const tokensInfosArr = chunkedInitialReturnData.map(
                (initialReturnData) =>
                    fromPairs(
                        vPool.erc20StateFunctionsParsers.map(({ name }, i) => [
                            name,
                            initialReturnData[i],
                        ])
                    ) as Erc20Info<T>
            );

            return zipObject(tokens, tokensInfosArr);
        } else {
            const decimalsMultiCallParams = tokens.flatMap(
                (tokenAddress) =>
                    ({
                        target: tokenAddress,
                        callData: erc20Iface.encodeFunctionData('decimals'),
                        decodeFunction:
                            vPool.erc20DecimalsParser.decodeFunction,
                    }) as MulticallParams<number>
            );

            const tokensInfosArr = (
                await multiWrapper.aggregate(decimalsMultiCallParams)
            ).map((decimals) => ({ decimals }) as Erc20Info<T>);

            return zipObject(tokens, tokensInfosArr);
        }
    }

    /**
     * Get allowLists of the pools
     * @param pools - Array of pool addresses
     * @param poolsInitialStates - Array of pools infos (tokens of pools)
     * @param allowListsLengths - Array of lengths of allowLists
     * @param multiWrapper - MultiWrapper instance
     * @param vPairIface - Interface for the vPair contract
     * @private
     */
    private static async getPoolsAllowLists(
        pools: string[],
        poolsInitialStates: { token0: string; token1: string }[],
        allowListsLengths: number[],
        multiWrapper: MulticallWrapper,
        vPairIface: Interface = vPool.vPairInterface
    ) {
        const allowListsTargetsAndInputs = pools.flatMap((poolAddress, i) =>
            Array.from({ length: allowListsLengths[i] }, (_, j) => ({
                poolAddress,
                index: j,
            }))
        );

        const allowedAddressesMultiCallParams = allowListsTargetsAndInputs.map(
            ({ poolAddress, index }) =>
                ({
                    target: poolAddress,
                    callData: vPairIface.encodeFunctionData('allowList', [
                        index,
                    ]),
                    decodeFunction:
                        vPool.contractAllowListAddressParser.decodeFunction,
                }) as MulticallParams<string>
        );

        const allowedAddresses = await multiWrapper.aggregate(
            allowedAddressesMultiCallParams
        );

        const poolsAllowLists = mapValues(
            groupBy(
                map(
                    allowedAddresses,
                    (address, i) =>
                        [
                            allowListsTargetsAndInputs[i].poolAddress,
                            address,
                        ] as const
                ),
                ([poolAddress]) => poolAddress
            ),
            (pairs) => map(pairs, ([, address]) => address)
        );

        return pools.map((poolAddress, index) => ({
            poolAddress,
            reservesAddresses: poolsAllowLists[poolAddress].filter(
                (address) =>
                    address !== poolsInitialStates[index].token0 &&
                    address !== poolsInitialStates[index].token1
            ),
        }));
    }

    /**
     * The function is called to fetch reserves of multiple pools
     * @param pools - Array of pool addresses and their allowed reserve tokens
     * @param multiWrapper - MultiWrapper instance
     * @param vPairIface - Interface for the vPair contract
     * @returns Reserves of the pools
     */
    protected static async fetchManyPoolsReserves(
        pools: { poolAddress: string; reservesAddresses: string[] }[],
        multiWrapper: MulticallWrapper,
        vPairIface: Interface = vPool.vPairInterface
    ): Promise<PoolState['reserves'][]> {
        const targetsAndInputs = pools.flatMap(
            ({ poolAddress, reservesAddresses }) =>
                reservesAddresses.map((reserveAddress) => ({
                    poolAddress,
                    reserveAddress,
                }))
        );
        const reservesMultiCallParams = targetsAndInputs.flatMap(
            ({ poolAddress, reserveAddress }) =>
                [
                    {
                        target: poolAddress,
                        callData: vPairIface.encodeFunctionData(
                            'reservesBaseValue',
                            [reserveAddress]
                        ),
                        decodeFunction:
                            vPool.contractReservesBaseValueParser
                                .decodeFunction,
                    },
                    {
                        target: poolAddress,
                        callData: vPairIface.encodeFunctionData('reserves', [
                            reserveAddress,
                        ]),
                        decodeFunction:
                            vPool.contractReservesParser.decodeFunction,
                    },
                ] as MulticallParams<ethers.BigNumber>[]
        );

        const tokens = uniq(
            pools.flatMap(({ reservesAddresses }) => reservesAddresses)
        );
        const decimalsMultiCallParams = tokens.flatMap(
            (tokenAddress) =>
                ({
                    target: tokenAddress,
                    callData:
                        this.erc20Interface.encodeFunctionData('decimals'),
                    decodeFunction: this.erc20DecimalsParser.decodeFunction,
                }) as MulticallParams<number>
        );

        const [reservesReturnData, tokensDecimalsArr] = await Promise.all([
            multiWrapper.aggregate(reservesMultiCallParams),
            multiWrapper.aggregate(decimalsMultiCallParams),
        ]);

        const tokensDecimals = zipObject(tokens, tokensDecimalsArr);

        const reservesByPools = mapValues(
            groupBy(
                map(
                    chunk(reservesReturnData, 2),
                    ([baseValue, balance], index) =>
                        [
                            targetsAndInputs[index],
                            {
                                baseValue,
                                balance,
                                decimals:
                                    tokensDecimals[
                                        targetsAndInputs[index].reserveAddress
                                    ],
                            },
                        ] as const
                ),
                ([{ poolAddress }]) => poolAddress
            ),
            (pairs) =>
                fromPairs(
                    map(pairs, ([{ reserveAddress }, data]) => [
                        reserveAddress,
                        data,
                    ])
                )
        );

        return map(pools, ({ poolAddress }) => reservesByPools[poolAddress]);
    }

    /**
     * The function is called to generate states
     * of multiple pools using on-chain calls
     * @param pools - Array of pool addresses
     * should be generated
     * @param multiWrapper - MultiWrapper instance
     * @param fetchTokenNamesAndSymbols - Whether to fetch token names and symbols for ERC20 tokens
     * @param vPairIface - Interface for the vPair contract
     * @returns States of the pools
     */
    static async generateManyPoolsStates(
        pools: string[],
        multiWrapper: MulticallWrapper,
        fetchTokenNamesAndSymbols = false,
        vPairIface: Interface = vPool.vPairInterface
    ): Promise<Readonly<PoolState[]>> {
        const { poolsInitialStates, allowListsLengths } =
            await this.getPoolsInitialStates(pools, multiWrapper, vPairIface);

        const tokensDecimalsPromise = this.getPoolsTokensInfos(
            poolsInitialStates,
            multiWrapper,
            fetchTokenNamesAndSymbols
        );

        const allowLists = await this.getPoolsAllowLists(
            pools,
            poolsInitialStates,
            allowListsLengths,
            multiWrapper,
            vPairIface
        );

        const poolsReserves = await this.fetchManyPoolsReserves(
            allowLists,
            multiWrapper,
            vPairIface
        );

        const tokensDecimals = await tokensDecimalsPromise;

        return poolsInitialStates.map((initialState, index) => ({
            ...initialState,
            decimals0: tokensDecimals[initialState.token0].decimals,
            decimals1: tokensDecimals[initialState.token1].decimals,
            symbol0: tokensDecimals[initialState.token0].symbol,
            symbol1: tokensDecimals[initialState.token1].symbol,
            name0: tokensDecimals[initialState.token0].name,
            name1: tokensDecimals[initialState.token1].name,
            reserves: poolsReserves[index],
        }));
    }

    /**
     * The function is called to regenerate states
     * of multiple pools using on-chain calls.
     * Will return incomplete data if the allow lists changed.
     * @param pools - Dictionary of pool addresses and their states
     * @param multiWrapper - MultiWrapper instance
     * @param vPairIface - Interface for the vPair contract
     * @returns Updated states of the pools
     */
    static async regenerateManyPoolsStates(
        pools: Record<string, PoolState>,
        multiWrapper: MulticallWrapper,
        vPairIface: Interface = vPool.vPairInterface
    ): Promise<Readonly<Record<string, PoolState>>> {
        const poolsAddresses = keys(pools);

        const oldAllowLists = poolsAddresses.map((poolAddress) => ({
            poolAddress,
            reservesAddresses: keys(pools[poolAddress].reserves),
        }));

        const [{ poolsInitialStates }, poolsReserves] = await Promise.all([
            this.getPoolsInitialStates(
                poolsAddresses,
                multiWrapper,
                vPairIface
            ),
            this.fetchManyPoolsReserves(
                oldAllowLists,
                multiWrapper,
                vPairIface
            ),
        ]);

        return zipObject(
            poolsAddresses,
            poolsInitialStates.map((initialState, index) => {
                const { decimals0, decimals1 } = pools[poolsAddresses[index]];

                return {
                    ...initialState,
                    decimals0,
                    decimals1,
                    reserves: poolsReserves[index],
                };
            })
        );
    }
}
