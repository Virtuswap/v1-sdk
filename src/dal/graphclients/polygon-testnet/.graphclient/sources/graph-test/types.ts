// @ts-nocheck

import { InContextSdkMethod } from '@graphql-mesh/types';
import { MeshContext } from '@graphql-mesh/runtime';

export namespace GraphTestTypes {
    export type Maybe<T> = T | null;
    export type InputMaybe<T> = Maybe<T>;
    export type Exact<T extends { [key: string]: unknown }> = {
        [K in keyof T]: T[K];
    };
    export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
        [SubKey in K]?: Maybe<T[SubKey]>;
    };
    export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
        [SubKey in K]: Maybe<T[SubKey]>;
    };
    /** All built-in and custom scalars, mapped to their actual values */
    export type Scalars = {
        ID: string;
        String: string;
        Boolean: boolean;
        Int: number;
        Float: number;
        BigDecimal: any;
        BigInt: any;
        Bytes: any;
        Int8: any;
        Timestamp: any;
    };

    export type Aggregation_interval = 'hour' | 'day';

    export type BlockChangedFilter = {
        number_gte: Scalars['Int'];
    };

    export type Block_height = {
        hash?: InputMaybe<Scalars['Bytes']>;
        number?: InputMaybe<Scalars['Int']>;
        number_gte?: InputMaybe<Scalars['Int']>;
    };

    export type LiquidityPosition = {
        id: Scalars['ID'];
        user: User;
        pair: Pair;
        liquidityTokenBalance: Scalars['BigDecimal'];
    };

    export type LiquidityPosition_filter = {
        id?: InputMaybe<Scalars['ID']>;
        id_not?: InputMaybe<Scalars['ID']>;
        id_gt?: InputMaybe<Scalars['ID']>;
        id_lt?: InputMaybe<Scalars['ID']>;
        id_gte?: InputMaybe<Scalars['ID']>;
        id_lte?: InputMaybe<Scalars['ID']>;
        id_in?: InputMaybe<Array<Scalars['ID']>>;
        id_not_in?: InputMaybe<Array<Scalars['ID']>>;
        user?: InputMaybe<Scalars['String']>;
        user_not?: InputMaybe<Scalars['String']>;
        user_gt?: InputMaybe<Scalars['String']>;
        user_lt?: InputMaybe<Scalars['String']>;
        user_gte?: InputMaybe<Scalars['String']>;
        user_lte?: InputMaybe<Scalars['String']>;
        user_in?: InputMaybe<Array<Scalars['String']>>;
        user_not_in?: InputMaybe<Array<Scalars['String']>>;
        user_contains?: InputMaybe<Scalars['String']>;
        user_contains_nocase?: InputMaybe<Scalars['String']>;
        user_not_contains?: InputMaybe<Scalars['String']>;
        user_not_contains_nocase?: InputMaybe<Scalars['String']>;
        user_starts_with?: InputMaybe<Scalars['String']>;
        user_starts_with_nocase?: InputMaybe<Scalars['String']>;
        user_not_starts_with?: InputMaybe<Scalars['String']>;
        user_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
        user_ends_with?: InputMaybe<Scalars['String']>;
        user_ends_with_nocase?: InputMaybe<Scalars['String']>;
        user_not_ends_with?: InputMaybe<Scalars['String']>;
        user_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
        user_?: InputMaybe<User_filter>;
        pair?: InputMaybe<Scalars['String']>;
        pair_not?: InputMaybe<Scalars['String']>;
        pair_gt?: InputMaybe<Scalars['String']>;
        pair_lt?: InputMaybe<Scalars['String']>;
        pair_gte?: InputMaybe<Scalars['String']>;
        pair_lte?: InputMaybe<Scalars['String']>;
        pair_in?: InputMaybe<Array<Scalars['String']>>;
        pair_not_in?: InputMaybe<Array<Scalars['String']>>;
        pair_contains?: InputMaybe<Scalars['String']>;
        pair_contains_nocase?: InputMaybe<Scalars['String']>;
        pair_not_contains?: InputMaybe<Scalars['String']>;
        pair_not_contains_nocase?: InputMaybe<Scalars['String']>;
        pair_starts_with?: InputMaybe<Scalars['String']>;
        pair_starts_with_nocase?: InputMaybe<Scalars['String']>;
        pair_not_starts_with?: InputMaybe<Scalars['String']>;
        pair_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
        pair_ends_with?: InputMaybe<Scalars['String']>;
        pair_ends_with_nocase?: InputMaybe<Scalars['String']>;
        pair_not_ends_with?: InputMaybe<Scalars['String']>;
        pair_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
        pair_?: InputMaybe<Pair_filter>;
        liquidityTokenBalance?: InputMaybe<Scalars['BigDecimal']>;
        liquidityTokenBalance_not?: InputMaybe<Scalars['BigDecimal']>;
        liquidityTokenBalance_gt?: InputMaybe<Scalars['BigDecimal']>;
        liquidityTokenBalance_lt?: InputMaybe<Scalars['BigDecimal']>;
        liquidityTokenBalance_gte?: InputMaybe<Scalars['BigDecimal']>;
        liquidityTokenBalance_lte?: InputMaybe<Scalars['BigDecimal']>;
        liquidityTokenBalance_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
        liquidityTokenBalance_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
        /** Filter for the block changed event. */
        _change_block?: InputMaybe<BlockChangedFilter>;
        and?: InputMaybe<Array<InputMaybe<LiquidityPosition_filter>>>;
        or?: InputMaybe<Array<InputMaybe<LiquidityPosition_filter>>>;
    };

    export type LiquidityPosition_orderBy =
        | 'id'
        | 'user'
        | 'user__id'
        | 'user__vrswLockedPositionsNumber'
        | 'pair'
        | 'pair__id'
        | 'pair__balance0'
        | 'pair__balance1'
        | 'pair__fee'
        | 'pair__vFee'
        | 'pair__maxReserveRatio'
        | 'pair__reserveRatio'
        | 'pair__totalSupply'
        | 'pair__blocksDelay'
        | 'pair__totalMu'
        | 'pair__totalStaked'
        | 'pair__lastSwapBlock'
        | 'pair__lastSwapTimestamp'
        | 'pair__allocationPoints'
        | 'pair__token0Price'
        | 'pair__token1Price'
        | 'pair__createdAtTimestamp'
        | 'pair__createdAtBlockNumber'
        | 'liquidityTokenBalance';

    export type LpStakingPosition = {
        id: Scalars['ID'];
        user: User;
        pair: Pair;
        amount: Scalars['BigDecimal'];
        mu: Scalars['BigDecimal'];
    };

    export type LpStakingPosition_filter = {
        id?: InputMaybe<Scalars['ID']>;
        id_not?: InputMaybe<Scalars['ID']>;
        id_gt?: InputMaybe<Scalars['ID']>;
        id_lt?: InputMaybe<Scalars['ID']>;
        id_gte?: InputMaybe<Scalars['ID']>;
        id_lte?: InputMaybe<Scalars['ID']>;
        id_in?: InputMaybe<Array<Scalars['ID']>>;
        id_not_in?: InputMaybe<Array<Scalars['ID']>>;
        user?: InputMaybe<Scalars['String']>;
        user_not?: InputMaybe<Scalars['String']>;
        user_gt?: InputMaybe<Scalars['String']>;
        user_lt?: InputMaybe<Scalars['String']>;
        user_gte?: InputMaybe<Scalars['String']>;
        user_lte?: InputMaybe<Scalars['String']>;
        user_in?: InputMaybe<Array<Scalars['String']>>;
        user_not_in?: InputMaybe<Array<Scalars['String']>>;
        user_contains?: InputMaybe<Scalars['String']>;
        user_contains_nocase?: InputMaybe<Scalars['String']>;
        user_not_contains?: InputMaybe<Scalars['String']>;
        user_not_contains_nocase?: InputMaybe<Scalars['String']>;
        user_starts_with?: InputMaybe<Scalars['String']>;
        user_starts_with_nocase?: InputMaybe<Scalars['String']>;
        user_not_starts_with?: InputMaybe<Scalars['String']>;
        user_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
        user_ends_with?: InputMaybe<Scalars['String']>;
        user_ends_with_nocase?: InputMaybe<Scalars['String']>;
        user_not_ends_with?: InputMaybe<Scalars['String']>;
        user_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
        user_?: InputMaybe<User_filter>;
        pair?: InputMaybe<Scalars['String']>;
        pair_not?: InputMaybe<Scalars['String']>;
        pair_gt?: InputMaybe<Scalars['String']>;
        pair_lt?: InputMaybe<Scalars['String']>;
        pair_gte?: InputMaybe<Scalars['String']>;
        pair_lte?: InputMaybe<Scalars['String']>;
        pair_in?: InputMaybe<Array<Scalars['String']>>;
        pair_not_in?: InputMaybe<Array<Scalars['String']>>;
        pair_contains?: InputMaybe<Scalars['String']>;
        pair_contains_nocase?: InputMaybe<Scalars['String']>;
        pair_not_contains?: InputMaybe<Scalars['String']>;
        pair_not_contains_nocase?: InputMaybe<Scalars['String']>;
        pair_starts_with?: InputMaybe<Scalars['String']>;
        pair_starts_with_nocase?: InputMaybe<Scalars['String']>;
        pair_not_starts_with?: InputMaybe<Scalars['String']>;
        pair_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
        pair_ends_with?: InputMaybe<Scalars['String']>;
        pair_ends_with_nocase?: InputMaybe<Scalars['String']>;
        pair_not_ends_with?: InputMaybe<Scalars['String']>;
        pair_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
        pair_?: InputMaybe<Pair_filter>;
        amount?: InputMaybe<Scalars['BigDecimal']>;
        amount_not?: InputMaybe<Scalars['BigDecimal']>;
        amount_gt?: InputMaybe<Scalars['BigDecimal']>;
        amount_lt?: InputMaybe<Scalars['BigDecimal']>;
        amount_gte?: InputMaybe<Scalars['BigDecimal']>;
        amount_lte?: InputMaybe<Scalars['BigDecimal']>;
        amount_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
        amount_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
        mu?: InputMaybe<Scalars['BigDecimal']>;
        mu_not?: InputMaybe<Scalars['BigDecimal']>;
        mu_gt?: InputMaybe<Scalars['BigDecimal']>;
        mu_lt?: InputMaybe<Scalars['BigDecimal']>;
        mu_gte?: InputMaybe<Scalars['BigDecimal']>;
        mu_lte?: InputMaybe<Scalars['BigDecimal']>;
        mu_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
        mu_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
        /** Filter for the block changed event. */
        _change_block?: InputMaybe<BlockChangedFilter>;
        and?: InputMaybe<Array<InputMaybe<LpStakingPosition_filter>>>;
        or?: InputMaybe<Array<InputMaybe<LpStakingPosition_filter>>>;
    };

    export type LpStakingPosition_orderBy =
        | 'id'
        | 'user'
        | 'user__id'
        | 'user__vrswLockedPositionsNumber'
        | 'pair'
        | 'pair__id'
        | 'pair__balance0'
        | 'pair__balance1'
        | 'pair__fee'
        | 'pair__vFee'
        | 'pair__maxReserveRatio'
        | 'pair__reserveRatio'
        | 'pair__totalSupply'
        | 'pair__blocksDelay'
        | 'pair__totalMu'
        | 'pair__totalStaked'
        | 'pair__lastSwapBlock'
        | 'pair__lastSwapTimestamp'
        | 'pair__allocationPoints'
        | 'pair__token0Price'
        | 'pair__token1Price'
        | 'pair__createdAtTimestamp'
        | 'pair__createdAtBlockNumber'
        | 'amount'
        | 'mu';

    /** Defines the order direction, either ascending or descending */
    export type OrderDirection = 'asc' | 'desc';

    export type Pair = {
        id: Scalars['ID'];
        token0: Token;
        token1: Token;
        balance0: Scalars['BigDecimal'];
        balance1: Scalars['BigDecimal'];
        fee: Scalars['BigInt'];
        vFee: Scalars['BigInt'];
        maxReserveRatio: Scalars['BigInt'];
        reserveRatio: Scalars['BigInt'];
        totalSupply: Scalars['BigDecimal'];
        blocksDelay: Scalars['BigInt'];
        totalMu: Scalars['BigDecimal'];
        totalStaked: Scalars['BigDecimal'];
        lastSwapBlock: Scalars['BigInt'];
        lastSwapTimestamp: Scalars['BigInt'];
        whitelist: Array<PairWhitelist>;
        allocationPoints: Scalars['BigInt'];
        token0Price: Scalars['BigDecimal'];
        token1Price: Scalars['BigDecimal'];
        pairReserves: Array<PairReserve>;
        createdAtTimestamp: Scalars['BigInt'];
        createdAtBlockNumber: Scalars['BigInt'];
    };

    export type PairwhitelistArgs = {
        skip?: InputMaybe<Scalars['Int']>;
        first?: InputMaybe<Scalars['Int']>;
        orderBy?: InputMaybe<PairWhitelist_orderBy>;
        orderDirection?: InputMaybe<OrderDirection>;
        where?: InputMaybe<PairWhitelist_filter>;
    };

    export type PairpairReservesArgs = {
        skip?: InputMaybe<Scalars['Int']>;
        first?: InputMaybe<Scalars['Int']>;
        orderBy?: InputMaybe<PairReserve_orderBy>;
        orderDirection?: InputMaybe<OrderDirection>;
        where?: InputMaybe<PairReserve_filter>;
    };

    export type PairReserve = {
        id: Scalars['ID'];
        pair: Pair;
        token: Token;
        balance: Scalars['BigDecimal'];
        baseValue: Scalars['BigDecimal'];
    };

    export type PairReserve_filter = {
        id?: InputMaybe<Scalars['ID']>;
        id_not?: InputMaybe<Scalars['ID']>;
        id_gt?: InputMaybe<Scalars['ID']>;
        id_lt?: InputMaybe<Scalars['ID']>;
        id_gte?: InputMaybe<Scalars['ID']>;
        id_lte?: InputMaybe<Scalars['ID']>;
        id_in?: InputMaybe<Array<Scalars['ID']>>;
        id_not_in?: InputMaybe<Array<Scalars['ID']>>;
        pair?: InputMaybe<Scalars['String']>;
        pair_not?: InputMaybe<Scalars['String']>;
        pair_gt?: InputMaybe<Scalars['String']>;
        pair_lt?: InputMaybe<Scalars['String']>;
        pair_gte?: InputMaybe<Scalars['String']>;
        pair_lte?: InputMaybe<Scalars['String']>;
        pair_in?: InputMaybe<Array<Scalars['String']>>;
        pair_not_in?: InputMaybe<Array<Scalars['String']>>;
        pair_contains?: InputMaybe<Scalars['String']>;
        pair_contains_nocase?: InputMaybe<Scalars['String']>;
        pair_not_contains?: InputMaybe<Scalars['String']>;
        pair_not_contains_nocase?: InputMaybe<Scalars['String']>;
        pair_starts_with?: InputMaybe<Scalars['String']>;
        pair_starts_with_nocase?: InputMaybe<Scalars['String']>;
        pair_not_starts_with?: InputMaybe<Scalars['String']>;
        pair_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
        pair_ends_with?: InputMaybe<Scalars['String']>;
        pair_ends_with_nocase?: InputMaybe<Scalars['String']>;
        pair_not_ends_with?: InputMaybe<Scalars['String']>;
        pair_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
        pair_?: InputMaybe<Pair_filter>;
        token?: InputMaybe<Scalars['String']>;
        token_not?: InputMaybe<Scalars['String']>;
        token_gt?: InputMaybe<Scalars['String']>;
        token_lt?: InputMaybe<Scalars['String']>;
        token_gte?: InputMaybe<Scalars['String']>;
        token_lte?: InputMaybe<Scalars['String']>;
        token_in?: InputMaybe<Array<Scalars['String']>>;
        token_not_in?: InputMaybe<Array<Scalars['String']>>;
        token_contains?: InputMaybe<Scalars['String']>;
        token_contains_nocase?: InputMaybe<Scalars['String']>;
        token_not_contains?: InputMaybe<Scalars['String']>;
        token_not_contains_nocase?: InputMaybe<Scalars['String']>;
        token_starts_with?: InputMaybe<Scalars['String']>;
        token_starts_with_nocase?: InputMaybe<Scalars['String']>;
        token_not_starts_with?: InputMaybe<Scalars['String']>;
        token_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
        token_ends_with?: InputMaybe<Scalars['String']>;
        token_ends_with_nocase?: InputMaybe<Scalars['String']>;
        token_not_ends_with?: InputMaybe<Scalars['String']>;
        token_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
        token_?: InputMaybe<Token_filter>;
        balance?: InputMaybe<Scalars['BigDecimal']>;
        balance_not?: InputMaybe<Scalars['BigDecimal']>;
        balance_gt?: InputMaybe<Scalars['BigDecimal']>;
        balance_lt?: InputMaybe<Scalars['BigDecimal']>;
        balance_gte?: InputMaybe<Scalars['BigDecimal']>;
        balance_lte?: InputMaybe<Scalars['BigDecimal']>;
        balance_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
        balance_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
        baseValue?: InputMaybe<Scalars['BigDecimal']>;
        baseValue_not?: InputMaybe<Scalars['BigDecimal']>;
        baseValue_gt?: InputMaybe<Scalars['BigDecimal']>;
        baseValue_lt?: InputMaybe<Scalars['BigDecimal']>;
        baseValue_gte?: InputMaybe<Scalars['BigDecimal']>;
        baseValue_lte?: InputMaybe<Scalars['BigDecimal']>;
        baseValue_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
        baseValue_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
        /** Filter for the block changed event. */
        _change_block?: InputMaybe<BlockChangedFilter>;
        and?: InputMaybe<Array<InputMaybe<PairReserve_filter>>>;
        or?: InputMaybe<Array<InputMaybe<PairReserve_filter>>>;
    };

    export type PairReserve_orderBy =
        | 'id'
        | 'pair'
        | 'pair__id'
        | 'pair__balance0'
        | 'pair__balance1'
        | 'pair__fee'
        | 'pair__vFee'
        | 'pair__maxReserveRatio'
        | 'pair__reserveRatio'
        | 'pair__totalSupply'
        | 'pair__blocksDelay'
        | 'pair__totalMu'
        | 'pair__totalStaked'
        | 'pair__lastSwapBlock'
        | 'pair__lastSwapTimestamp'
        | 'pair__allocationPoints'
        | 'pair__token0Price'
        | 'pair__token1Price'
        | 'pair__createdAtTimestamp'
        | 'pair__createdAtBlockNumber'
        | 'token'
        | 'token__id'
        | 'token__symbol'
        | 'token__name'
        | 'token__decimals'
        | 'balance'
        | 'baseValue';

    export type PairWhitelist = {
        id: Scalars['ID'];
        token: Token;
        pair: Pair;
    };

    export type PairWhitelist_filter = {
        id?: InputMaybe<Scalars['ID']>;
        id_not?: InputMaybe<Scalars['ID']>;
        id_gt?: InputMaybe<Scalars['ID']>;
        id_lt?: InputMaybe<Scalars['ID']>;
        id_gte?: InputMaybe<Scalars['ID']>;
        id_lte?: InputMaybe<Scalars['ID']>;
        id_in?: InputMaybe<Array<Scalars['ID']>>;
        id_not_in?: InputMaybe<Array<Scalars['ID']>>;
        token?: InputMaybe<Scalars['String']>;
        token_not?: InputMaybe<Scalars['String']>;
        token_gt?: InputMaybe<Scalars['String']>;
        token_lt?: InputMaybe<Scalars['String']>;
        token_gte?: InputMaybe<Scalars['String']>;
        token_lte?: InputMaybe<Scalars['String']>;
        token_in?: InputMaybe<Array<Scalars['String']>>;
        token_not_in?: InputMaybe<Array<Scalars['String']>>;
        token_contains?: InputMaybe<Scalars['String']>;
        token_contains_nocase?: InputMaybe<Scalars['String']>;
        token_not_contains?: InputMaybe<Scalars['String']>;
        token_not_contains_nocase?: InputMaybe<Scalars['String']>;
        token_starts_with?: InputMaybe<Scalars['String']>;
        token_starts_with_nocase?: InputMaybe<Scalars['String']>;
        token_not_starts_with?: InputMaybe<Scalars['String']>;
        token_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
        token_ends_with?: InputMaybe<Scalars['String']>;
        token_ends_with_nocase?: InputMaybe<Scalars['String']>;
        token_not_ends_with?: InputMaybe<Scalars['String']>;
        token_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
        token_?: InputMaybe<Token_filter>;
        pair?: InputMaybe<Scalars['String']>;
        pair_not?: InputMaybe<Scalars['String']>;
        pair_gt?: InputMaybe<Scalars['String']>;
        pair_lt?: InputMaybe<Scalars['String']>;
        pair_gte?: InputMaybe<Scalars['String']>;
        pair_lte?: InputMaybe<Scalars['String']>;
        pair_in?: InputMaybe<Array<Scalars['String']>>;
        pair_not_in?: InputMaybe<Array<Scalars['String']>>;
        pair_contains?: InputMaybe<Scalars['String']>;
        pair_contains_nocase?: InputMaybe<Scalars['String']>;
        pair_not_contains?: InputMaybe<Scalars['String']>;
        pair_not_contains_nocase?: InputMaybe<Scalars['String']>;
        pair_starts_with?: InputMaybe<Scalars['String']>;
        pair_starts_with_nocase?: InputMaybe<Scalars['String']>;
        pair_not_starts_with?: InputMaybe<Scalars['String']>;
        pair_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
        pair_ends_with?: InputMaybe<Scalars['String']>;
        pair_ends_with_nocase?: InputMaybe<Scalars['String']>;
        pair_not_ends_with?: InputMaybe<Scalars['String']>;
        pair_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
        pair_?: InputMaybe<Pair_filter>;
        /** Filter for the block changed event. */
        _change_block?: InputMaybe<BlockChangedFilter>;
        and?: InputMaybe<Array<InputMaybe<PairWhitelist_filter>>>;
        or?: InputMaybe<Array<InputMaybe<PairWhitelist_filter>>>;
    };

    export type PairWhitelist_orderBy =
        | 'id'
        | 'token'
        | 'token__id'
        | 'token__symbol'
        | 'token__name'
        | 'token__decimals'
        | 'pair'
        | 'pair__id'
        | 'pair__balance0'
        | 'pair__balance1'
        | 'pair__fee'
        | 'pair__vFee'
        | 'pair__maxReserveRatio'
        | 'pair__reserveRatio'
        | 'pair__totalSupply'
        | 'pair__blocksDelay'
        | 'pair__totalMu'
        | 'pair__totalStaked'
        | 'pair__lastSwapBlock'
        | 'pair__lastSwapTimestamp'
        | 'pair__allocationPoints'
        | 'pair__token0Price'
        | 'pair__token1Price'
        | 'pair__createdAtTimestamp'
        | 'pair__createdAtBlockNumber';

    export type Pair_filter = {
        id?: InputMaybe<Scalars['ID']>;
        id_not?: InputMaybe<Scalars['ID']>;
        id_gt?: InputMaybe<Scalars['ID']>;
        id_lt?: InputMaybe<Scalars['ID']>;
        id_gte?: InputMaybe<Scalars['ID']>;
        id_lte?: InputMaybe<Scalars['ID']>;
        id_in?: InputMaybe<Array<Scalars['ID']>>;
        id_not_in?: InputMaybe<Array<Scalars['ID']>>;
        token0?: InputMaybe<Scalars['String']>;
        token0_not?: InputMaybe<Scalars['String']>;
        token0_gt?: InputMaybe<Scalars['String']>;
        token0_lt?: InputMaybe<Scalars['String']>;
        token0_gte?: InputMaybe<Scalars['String']>;
        token0_lte?: InputMaybe<Scalars['String']>;
        token0_in?: InputMaybe<Array<Scalars['String']>>;
        token0_not_in?: InputMaybe<Array<Scalars['String']>>;
        token0_contains?: InputMaybe<Scalars['String']>;
        token0_contains_nocase?: InputMaybe<Scalars['String']>;
        token0_not_contains?: InputMaybe<Scalars['String']>;
        token0_not_contains_nocase?: InputMaybe<Scalars['String']>;
        token0_starts_with?: InputMaybe<Scalars['String']>;
        token0_starts_with_nocase?: InputMaybe<Scalars['String']>;
        token0_not_starts_with?: InputMaybe<Scalars['String']>;
        token0_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
        token0_ends_with?: InputMaybe<Scalars['String']>;
        token0_ends_with_nocase?: InputMaybe<Scalars['String']>;
        token0_not_ends_with?: InputMaybe<Scalars['String']>;
        token0_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
        token0_?: InputMaybe<Token_filter>;
        token1?: InputMaybe<Scalars['String']>;
        token1_not?: InputMaybe<Scalars['String']>;
        token1_gt?: InputMaybe<Scalars['String']>;
        token1_lt?: InputMaybe<Scalars['String']>;
        token1_gte?: InputMaybe<Scalars['String']>;
        token1_lte?: InputMaybe<Scalars['String']>;
        token1_in?: InputMaybe<Array<Scalars['String']>>;
        token1_not_in?: InputMaybe<Array<Scalars['String']>>;
        token1_contains?: InputMaybe<Scalars['String']>;
        token1_contains_nocase?: InputMaybe<Scalars['String']>;
        token1_not_contains?: InputMaybe<Scalars['String']>;
        token1_not_contains_nocase?: InputMaybe<Scalars['String']>;
        token1_starts_with?: InputMaybe<Scalars['String']>;
        token1_starts_with_nocase?: InputMaybe<Scalars['String']>;
        token1_not_starts_with?: InputMaybe<Scalars['String']>;
        token1_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
        token1_ends_with?: InputMaybe<Scalars['String']>;
        token1_ends_with_nocase?: InputMaybe<Scalars['String']>;
        token1_not_ends_with?: InputMaybe<Scalars['String']>;
        token1_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
        token1_?: InputMaybe<Token_filter>;
        balance0?: InputMaybe<Scalars['BigDecimal']>;
        balance0_not?: InputMaybe<Scalars['BigDecimal']>;
        balance0_gt?: InputMaybe<Scalars['BigDecimal']>;
        balance0_lt?: InputMaybe<Scalars['BigDecimal']>;
        balance0_gte?: InputMaybe<Scalars['BigDecimal']>;
        balance0_lte?: InputMaybe<Scalars['BigDecimal']>;
        balance0_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
        balance0_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
        balance1?: InputMaybe<Scalars['BigDecimal']>;
        balance1_not?: InputMaybe<Scalars['BigDecimal']>;
        balance1_gt?: InputMaybe<Scalars['BigDecimal']>;
        balance1_lt?: InputMaybe<Scalars['BigDecimal']>;
        balance1_gte?: InputMaybe<Scalars['BigDecimal']>;
        balance1_lte?: InputMaybe<Scalars['BigDecimal']>;
        balance1_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
        balance1_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
        fee?: InputMaybe<Scalars['BigInt']>;
        fee_not?: InputMaybe<Scalars['BigInt']>;
        fee_gt?: InputMaybe<Scalars['BigInt']>;
        fee_lt?: InputMaybe<Scalars['BigInt']>;
        fee_gte?: InputMaybe<Scalars['BigInt']>;
        fee_lte?: InputMaybe<Scalars['BigInt']>;
        fee_in?: InputMaybe<Array<Scalars['BigInt']>>;
        fee_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
        vFee?: InputMaybe<Scalars['BigInt']>;
        vFee_not?: InputMaybe<Scalars['BigInt']>;
        vFee_gt?: InputMaybe<Scalars['BigInt']>;
        vFee_lt?: InputMaybe<Scalars['BigInt']>;
        vFee_gte?: InputMaybe<Scalars['BigInt']>;
        vFee_lte?: InputMaybe<Scalars['BigInt']>;
        vFee_in?: InputMaybe<Array<Scalars['BigInt']>>;
        vFee_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
        maxReserveRatio?: InputMaybe<Scalars['BigInt']>;
        maxReserveRatio_not?: InputMaybe<Scalars['BigInt']>;
        maxReserveRatio_gt?: InputMaybe<Scalars['BigInt']>;
        maxReserveRatio_lt?: InputMaybe<Scalars['BigInt']>;
        maxReserveRatio_gte?: InputMaybe<Scalars['BigInt']>;
        maxReserveRatio_lte?: InputMaybe<Scalars['BigInt']>;
        maxReserveRatio_in?: InputMaybe<Array<Scalars['BigInt']>>;
        maxReserveRatio_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
        reserveRatio?: InputMaybe<Scalars['BigInt']>;
        reserveRatio_not?: InputMaybe<Scalars['BigInt']>;
        reserveRatio_gt?: InputMaybe<Scalars['BigInt']>;
        reserveRatio_lt?: InputMaybe<Scalars['BigInt']>;
        reserveRatio_gte?: InputMaybe<Scalars['BigInt']>;
        reserveRatio_lte?: InputMaybe<Scalars['BigInt']>;
        reserveRatio_in?: InputMaybe<Array<Scalars['BigInt']>>;
        reserveRatio_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
        totalSupply?: InputMaybe<Scalars['BigDecimal']>;
        totalSupply_not?: InputMaybe<Scalars['BigDecimal']>;
        totalSupply_gt?: InputMaybe<Scalars['BigDecimal']>;
        totalSupply_lt?: InputMaybe<Scalars['BigDecimal']>;
        totalSupply_gte?: InputMaybe<Scalars['BigDecimal']>;
        totalSupply_lte?: InputMaybe<Scalars['BigDecimal']>;
        totalSupply_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
        totalSupply_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
        blocksDelay?: InputMaybe<Scalars['BigInt']>;
        blocksDelay_not?: InputMaybe<Scalars['BigInt']>;
        blocksDelay_gt?: InputMaybe<Scalars['BigInt']>;
        blocksDelay_lt?: InputMaybe<Scalars['BigInt']>;
        blocksDelay_gte?: InputMaybe<Scalars['BigInt']>;
        blocksDelay_lte?: InputMaybe<Scalars['BigInt']>;
        blocksDelay_in?: InputMaybe<Array<Scalars['BigInt']>>;
        blocksDelay_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
        totalMu?: InputMaybe<Scalars['BigDecimal']>;
        totalMu_not?: InputMaybe<Scalars['BigDecimal']>;
        totalMu_gt?: InputMaybe<Scalars['BigDecimal']>;
        totalMu_lt?: InputMaybe<Scalars['BigDecimal']>;
        totalMu_gte?: InputMaybe<Scalars['BigDecimal']>;
        totalMu_lte?: InputMaybe<Scalars['BigDecimal']>;
        totalMu_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
        totalMu_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
        totalStaked?: InputMaybe<Scalars['BigDecimal']>;
        totalStaked_not?: InputMaybe<Scalars['BigDecimal']>;
        totalStaked_gt?: InputMaybe<Scalars['BigDecimal']>;
        totalStaked_lt?: InputMaybe<Scalars['BigDecimal']>;
        totalStaked_gte?: InputMaybe<Scalars['BigDecimal']>;
        totalStaked_lte?: InputMaybe<Scalars['BigDecimal']>;
        totalStaked_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
        totalStaked_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
        lastSwapBlock?: InputMaybe<Scalars['BigInt']>;
        lastSwapBlock_not?: InputMaybe<Scalars['BigInt']>;
        lastSwapBlock_gt?: InputMaybe<Scalars['BigInt']>;
        lastSwapBlock_lt?: InputMaybe<Scalars['BigInt']>;
        lastSwapBlock_gte?: InputMaybe<Scalars['BigInt']>;
        lastSwapBlock_lte?: InputMaybe<Scalars['BigInt']>;
        lastSwapBlock_in?: InputMaybe<Array<Scalars['BigInt']>>;
        lastSwapBlock_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
        lastSwapTimestamp?: InputMaybe<Scalars['BigInt']>;
        lastSwapTimestamp_not?: InputMaybe<Scalars['BigInt']>;
        lastSwapTimestamp_gt?: InputMaybe<Scalars['BigInt']>;
        lastSwapTimestamp_lt?: InputMaybe<Scalars['BigInt']>;
        lastSwapTimestamp_gte?: InputMaybe<Scalars['BigInt']>;
        lastSwapTimestamp_lte?: InputMaybe<Scalars['BigInt']>;
        lastSwapTimestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
        lastSwapTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
        whitelist_?: InputMaybe<PairWhitelist_filter>;
        allocationPoints?: InputMaybe<Scalars['BigInt']>;
        allocationPoints_not?: InputMaybe<Scalars['BigInt']>;
        allocationPoints_gt?: InputMaybe<Scalars['BigInt']>;
        allocationPoints_lt?: InputMaybe<Scalars['BigInt']>;
        allocationPoints_gte?: InputMaybe<Scalars['BigInt']>;
        allocationPoints_lte?: InputMaybe<Scalars['BigInt']>;
        allocationPoints_in?: InputMaybe<Array<Scalars['BigInt']>>;
        allocationPoints_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
        token0Price?: InputMaybe<Scalars['BigDecimal']>;
        token0Price_not?: InputMaybe<Scalars['BigDecimal']>;
        token0Price_gt?: InputMaybe<Scalars['BigDecimal']>;
        token0Price_lt?: InputMaybe<Scalars['BigDecimal']>;
        token0Price_gte?: InputMaybe<Scalars['BigDecimal']>;
        token0Price_lte?: InputMaybe<Scalars['BigDecimal']>;
        token0Price_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
        token0Price_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
        token1Price?: InputMaybe<Scalars['BigDecimal']>;
        token1Price_not?: InputMaybe<Scalars['BigDecimal']>;
        token1Price_gt?: InputMaybe<Scalars['BigDecimal']>;
        token1Price_lt?: InputMaybe<Scalars['BigDecimal']>;
        token1Price_gte?: InputMaybe<Scalars['BigDecimal']>;
        token1Price_lte?: InputMaybe<Scalars['BigDecimal']>;
        token1Price_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
        token1Price_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
        pairReserves_?: InputMaybe<PairReserve_filter>;
        createdAtTimestamp?: InputMaybe<Scalars['BigInt']>;
        createdAtTimestamp_not?: InputMaybe<Scalars['BigInt']>;
        createdAtTimestamp_gt?: InputMaybe<Scalars['BigInt']>;
        createdAtTimestamp_lt?: InputMaybe<Scalars['BigInt']>;
        createdAtTimestamp_gte?: InputMaybe<Scalars['BigInt']>;
        createdAtTimestamp_lte?: InputMaybe<Scalars['BigInt']>;
        createdAtTimestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
        createdAtTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
        createdAtBlockNumber?: InputMaybe<Scalars['BigInt']>;
        createdAtBlockNumber_not?: InputMaybe<Scalars['BigInt']>;
        createdAtBlockNumber_gt?: InputMaybe<Scalars['BigInt']>;
        createdAtBlockNumber_lt?: InputMaybe<Scalars['BigInt']>;
        createdAtBlockNumber_gte?: InputMaybe<Scalars['BigInt']>;
        createdAtBlockNumber_lte?: InputMaybe<Scalars['BigInt']>;
        createdAtBlockNumber_in?: InputMaybe<Array<Scalars['BigInt']>>;
        createdAtBlockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
        /** Filter for the block changed event. */
        _change_block?: InputMaybe<BlockChangedFilter>;
        and?: InputMaybe<Array<InputMaybe<Pair_filter>>>;
        or?: InputMaybe<Array<InputMaybe<Pair_filter>>>;
    };

    export type Pair_orderBy =
        | 'id'
        | 'token0'
        | 'token0__id'
        | 'token0__symbol'
        | 'token0__name'
        | 'token0__decimals'
        | 'token1'
        | 'token1__id'
        | 'token1__symbol'
        | 'token1__name'
        | 'token1__decimals'
        | 'balance0'
        | 'balance1'
        | 'fee'
        | 'vFee'
        | 'maxReserveRatio'
        | 'reserveRatio'
        | 'totalSupply'
        | 'blocksDelay'
        | 'totalMu'
        | 'totalStaked'
        | 'lastSwapBlock'
        | 'lastSwapTimestamp'
        | 'whitelist'
        | 'allocationPoints'
        | 'token0Price'
        | 'token1Price'
        | 'pairReserves'
        | 'createdAtTimestamp'
        | 'createdAtBlockNumber';

    export type Query = {
        token?: Maybe<Token>;
        tokens: Array<Token>;
        pair?: Maybe<Pair>;
        pairs: Array<Pair>;
        user?: Maybe<User>;
        users: Array<User>;
        liquidityPosition?: Maybe<LiquidityPosition>;
        liquidityPositions: Array<LiquidityPosition>;
        pairWhitelist?: Maybe<PairWhitelist>;
        pairWhitelists: Array<PairWhitelist>;
        pairReserve?: Maybe<PairReserve>;
        pairReserves: Array<PairReserve>;
        tokenomicsParams?: Maybe<TokenomicsParams>;
        tokenomicsParams_collection: Array<TokenomicsParams>;
        lpStakingPosition?: Maybe<LpStakingPosition>;
        lpStakingPositions: Array<LpStakingPosition>;
        vrswStakingPosition?: Maybe<VrswStakingPosition>;
        vrswStakingPositions: Array<VrswStakingPosition>;
        /** Access to subgraph metadata */
        _meta?: Maybe<_Meta_>;
    };

    export type QuerytokenArgs = {
        id: Scalars['ID'];
        block?: InputMaybe<Block_height>;
        subgraphError?: _SubgraphErrorPolicy_;
    };

    export type QuerytokensArgs = {
        skip?: InputMaybe<Scalars['Int']>;
        first?: InputMaybe<Scalars['Int']>;
        orderBy?: InputMaybe<Token_orderBy>;
        orderDirection?: InputMaybe<OrderDirection>;
        where?: InputMaybe<Token_filter>;
        block?: InputMaybe<Block_height>;
        subgraphError?: _SubgraphErrorPolicy_;
    };

    export type QuerypairArgs = {
        id: Scalars['ID'];
        block?: InputMaybe<Block_height>;
        subgraphError?: _SubgraphErrorPolicy_;
    };

    export type QuerypairsArgs = {
        skip?: InputMaybe<Scalars['Int']>;
        first?: InputMaybe<Scalars['Int']>;
        orderBy?: InputMaybe<Pair_orderBy>;
        orderDirection?: InputMaybe<OrderDirection>;
        where?: InputMaybe<Pair_filter>;
        block?: InputMaybe<Block_height>;
        subgraphError?: _SubgraphErrorPolicy_;
    };

    export type QueryuserArgs = {
        id: Scalars['ID'];
        block?: InputMaybe<Block_height>;
        subgraphError?: _SubgraphErrorPolicy_;
    };

    export type QueryusersArgs = {
        skip?: InputMaybe<Scalars['Int']>;
        first?: InputMaybe<Scalars['Int']>;
        orderBy?: InputMaybe<User_orderBy>;
        orderDirection?: InputMaybe<OrderDirection>;
        where?: InputMaybe<User_filter>;
        block?: InputMaybe<Block_height>;
        subgraphError?: _SubgraphErrorPolicy_;
    };

    export type QueryliquidityPositionArgs = {
        id: Scalars['ID'];
        block?: InputMaybe<Block_height>;
        subgraphError?: _SubgraphErrorPolicy_;
    };

    export type QueryliquidityPositionsArgs = {
        skip?: InputMaybe<Scalars['Int']>;
        first?: InputMaybe<Scalars['Int']>;
        orderBy?: InputMaybe<LiquidityPosition_orderBy>;
        orderDirection?: InputMaybe<OrderDirection>;
        where?: InputMaybe<LiquidityPosition_filter>;
        block?: InputMaybe<Block_height>;
        subgraphError?: _SubgraphErrorPolicy_;
    };

    export type QuerypairWhitelistArgs = {
        id: Scalars['ID'];
        block?: InputMaybe<Block_height>;
        subgraphError?: _SubgraphErrorPolicy_;
    };

    export type QuerypairWhitelistsArgs = {
        skip?: InputMaybe<Scalars['Int']>;
        first?: InputMaybe<Scalars['Int']>;
        orderBy?: InputMaybe<PairWhitelist_orderBy>;
        orderDirection?: InputMaybe<OrderDirection>;
        where?: InputMaybe<PairWhitelist_filter>;
        block?: InputMaybe<Block_height>;
        subgraphError?: _SubgraphErrorPolicy_;
    };

    export type QuerypairReserveArgs = {
        id: Scalars['ID'];
        block?: InputMaybe<Block_height>;
        subgraphError?: _SubgraphErrorPolicy_;
    };

    export type QuerypairReservesArgs = {
        skip?: InputMaybe<Scalars['Int']>;
        first?: InputMaybe<Scalars['Int']>;
        orderBy?: InputMaybe<PairReserve_orderBy>;
        orderDirection?: InputMaybe<OrderDirection>;
        where?: InputMaybe<PairReserve_filter>;
        block?: InputMaybe<Block_height>;
        subgraphError?: _SubgraphErrorPolicy_;
    };

    export type QuerytokenomicsParamsArgs = {
        id: Scalars['ID'];
        block?: InputMaybe<Block_height>;
        subgraphError?: _SubgraphErrorPolicy_;
    };

    export type QuerytokenomicsParams_collectionArgs = {
        skip?: InputMaybe<Scalars['Int']>;
        first?: InputMaybe<Scalars['Int']>;
        orderBy?: InputMaybe<TokenomicsParams_orderBy>;
        orderDirection?: InputMaybe<OrderDirection>;
        where?: InputMaybe<TokenomicsParams_filter>;
        block?: InputMaybe<Block_height>;
        subgraphError?: _SubgraphErrorPolicy_;
    };

    export type QuerylpStakingPositionArgs = {
        id: Scalars['ID'];
        block?: InputMaybe<Block_height>;
        subgraphError?: _SubgraphErrorPolicy_;
    };

    export type QuerylpStakingPositionsArgs = {
        skip?: InputMaybe<Scalars['Int']>;
        first?: InputMaybe<Scalars['Int']>;
        orderBy?: InputMaybe<LpStakingPosition_orderBy>;
        orderDirection?: InputMaybe<OrderDirection>;
        where?: InputMaybe<LpStakingPosition_filter>;
        block?: InputMaybe<Block_height>;
        subgraphError?: _SubgraphErrorPolicy_;
    };

    export type QueryvrswStakingPositionArgs = {
        id: Scalars['ID'];
        block?: InputMaybe<Block_height>;
        subgraphError?: _SubgraphErrorPolicy_;
    };

    export type QueryvrswStakingPositionsArgs = {
        skip?: InputMaybe<Scalars['Int']>;
        first?: InputMaybe<Scalars['Int']>;
        orderBy?: InputMaybe<VrswStakingPosition_orderBy>;
        orderDirection?: InputMaybe<OrderDirection>;
        where?: InputMaybe<VrswStakingPosition_filter>;
        block?: InputMaybe<Block_height>;
        subgraphError?: _SubgraphErrorPolicy_;
    };

    export type Query_metaArgs = {
        block?: InputMaybe<Block_height>;
    };

    export type Subscription = {
        token?: Maybe<Token>;
        tokens: Array<Token>;
        pair?: Maybe<Pair>;
        pairs: Array<Pair>;
        user?: Maybe<User>;
        users: Array<User>;
        liquidityPosition?: Maybe<LiquidityPosition>;
        liquidityPositions: Array<LiquidityPosition>;
        pairWhitelist?: Maybe<PairWhitelist>;
        pairWhitelists: Array<PairWhitelist>;
        pairReserve?: Maybe<PairReserve>;
        pairReserves: Array<PairReserve>;
        tokenomicsParams?: Maybe<TokenomicsParams>;
        tokenomicsParams_collection: Array<TokenomicsParams>;
        lpStakingPosition?: Maybe<LpStakingPosition>;
        lpStakingPositions: Array<LpStakingPosition>;
        vrswStakingPosition?: Maybe<VrswStakingPosition>;
        vrswStakingPositions: Array<VrswStakingPosition>;
        /** Access to subgraph metadata */
        _meta?: Maybe<_Meta_>;
    };

    export type SubscriptiontokenArgs = {
        id: Scalars['ID'];
        block?: InputMaybe<Block_height>;
        subgraphError?: _SubgraphErrorPolicy_;
    };

    export type SubscriptiontokensArgs = {
        skip?: InputMaybe<Scalars['Int']>;
        first?: InputMaybe<Scalars['Int']>;
        orderBy?: InputMaybe<Token_orderBy>;
        orderDirection?: InputMaybe<OrderDirection>;
        where?: InputMaybe<Token_filter>;
        block?: InputMaybe<Block_height>;
        subgraphError?: _SubgraphErrorPolicy_;
    };

    export type SubscriptionpairArgs = {
        id: Scalars['ID'];
        block?: InputMaybe<Block_height>;
        subgraphError?: _SubgraphErrorPolicy_;
    };

    export type SubscriptionpairsArgs = {
        skip?: InputMaybe<Scalars['Int']>;
        first?: InputMaybe<Scalars['Int']>;
        orderBy?: InputMaybe<Pair_orderBy>;
        orderDirection?: InputMaybe<OrderDirection>;
        where?: InputMaybe<Pair_filter>;
        block?: InputMaybe<Block_height>;
        subgraphError?: _SubgraphErrorPolicy_;
    };

    export type SubscriptionuserArgs = {
        id: Scalars['ID'];
        block?: InputMaybe<Block_height>;
        subgraphError?: _SubgraphErrorPolicy_;
    };

    export type SubscriptionusersArgs = {
        skip?: InputMaybe<Scalars['Int']>;
        first?: InputMaybe<Scalars['Int']>;
        orderBy?: InputMaybe<User_orderBy>;
        orderDirection?: InputMaybe<OrderDirection>;
        where?: InputMaybe<User_filter>;
        block?: InputMaybe<Block_height>;
        subgraphError?: _SubgraphErrorPolicy_;
    };

    export type SubscriptionliquidityPositionArgs = {
        id: Scalars['ID'];
        block?: InputMaybe<Block_height>;
        subgraphError?: _SubgraphErrorPolicy_;
    };

    export type SubscriptionliquidityPositionsArgs = {
        skip?: InputMaybe<Scalars['Int']>;
        first?: InputMaybe<Scalars['Int']>;
        orderBy?: InputMaybe<LiquidityPosition_orderBy>;
        orderDirection?: InputMaybe<OrderDirection>;
        where?: InputMaybe<LiquidityPosition_filter>;
        block?: InputMaybe<Block_height>;
        subgraphError?: _SubgraphErrorPolicy_;
    };

    export type SubscriptionpairWhitelistArgs = {
        id: Scalars['ID'];
        block?: InputMaybe<Block_height>;
        subgraphError?: _SubgraphErrorPolicy_;
    };

    export type SubscriptionpairWhitelistsArgs = {
        skip?: InputMaybe<Scalars['Int']>;
        first?: InputMaybe<Scalars['Int']>;
        orderBy?: InputMaybe<PairWhitelist_orderBy>;
        orderDirection?: InputMaybe<OrderDirection>;
        where?: InputMaybe<PairWhitelist_filter>;
        block?: InputMaybe<Block_height>;
        subgraphError?: _SubgraphErrorPolicy_;
    };

    export type SubscriptionpairReserveArgs = {
        id: Scalars['ID'];
        block?: InputMaybe<Block_height>;
        subgraphError?: _SubgraphErrorPolicy_;
    };

    export type SubscriptionpairReservesArgs = {
        skip?: InputMaybe<Scalars['Int']>;
        first?: InputMaybe<Scalars['Int']>;
        orderBy?: InputMaybe<PairReserve_orderBy>;
        orderDirection?: InputMaybe<OrderDirection>;
        where?: InputMaybe<PairReserve_filter>;
        block?: InputMaybe<Block_height>;
        subgraphError?: _SubgraphErrorPolicy_;
    };

    export type SubscriptiontokenomicsParamsArgs = {
        id: Scalars['ID'];
        block?: InputMaybe<Block_height>;
        subgraphError?: _SubgraphErrorPolicy_;
    };

    export type SubscriptiontokenomicsParams_collectionArgs = {
        skip?: InputMaybe<Scalars['Int']>;
        first?: InputMaybe<Scalars['Int']>;
        orderBy?: InputMaybe<TokenomicsParams_orderBy>;
        orderDirection?: InputMaybe<OrderDirection>;
        where?: InputMaybe<TokenomicsParams_filter>;
        block?: InputMaybe<Block_height>;
        subgraphError?: _SubgraphErrorPolicy_;
    };

    export type SubscriptionlpStakingPositionArgs = {
        id: Scalars['ID'];
        block?: InputMaybe<Block_height>;
        subgraphError?: _SubgraphErrorPolicy_;
    };

    export type SubscriptionlpStakingPositionsArgs = {
        skip?: InputMaybe<Scalars['Int']>;
        first?: InputMaybe<Scalars['Int']>;
        orderBy?: InputMaybe<LpStakingPosition_orderBy>;
        orderDirection?: InputMaybe<OrderDirection>;
        where?: InputMaybe<LpStakingPosition_filter>;
        block?: InputMaybe<Block_height>;
        subgraphError?: _SubgraphErrorPolicy_;
    };

    export type SubscriptionvrswStakingPositionArgs = {
        id: Scalars['ID'];
        block?: InputMaybe<Block_height>;
        subgraphError?: _SubgraphErrorPolicy_;
    };

    export type SubscriptionvrswStakingPositionsArgs = {
        skip?: InputMaybe<Scalars['Int']>;
        first?: InputMaybe<Scalars['Int']>;
        orderBy?: InputMaybe<VrswStakingPosition_orderBy>;
        orderDirection?: InputMaybe<OrderDirection>;
        where?: InputMaybe<VrswStakingPosition_filter>;
        block?: InputMaybe<Block_height>;
        subgraphError?: _SubgraphErrorPolicy_;
    };

    export type Subscription_metaArgs = {
        block?: InputMaybe<Block_height>;
    };

    export type Token = {
        id: Scalars['ID'];
        symbol: Scalars['String'];
        name: Scalars['String'];
        decimals: Scalars['BigInt'];
    };

    export type Token_filter = {
        id?: InputMaybe<Scalars['ID']>;
        id_not?: InputMaybe<Scalars['ID']>;
        id_gt?: InputMaybe<Scalars['ID']>;
        id_lt?: InputMaybe<Scalars['ID']>;
        id_gte?: InputMaybe<Scalars['ID']>;
        id_lte?: InputMaybe<Scalars['ID']>;
        id_in?: InputMaybe<Array<Scalars['ID']>>;
        id_not_in?: InputMaybe<Array<Scalars['ID']>>;
        symbol?: InputMaybe<Scalars['String']>;
        symbol_not?: InputMaybe<Scalars['String']>;
        symbol_gt?: InputMaybe<Scalars['String']>;
        symbol_lt?: InputMaybe<Scalars['String']>;
        symbol_gte?: InputMaybe<Scalars['String']>;
        symbol_lte?: InputMaybe<Scalars['String']>;
        symbol_in?: InputMaybe<Array<Scalars['String']>>;
        symbol_not_in?: InputMaybe<Array<Scalars['String']>>;
        symbol_contains?: InputMaybe<Scalars['String']>;
        symbol_contains_nocase?: InputMaybe<Scalars['String']>;
        symbol_not_contains?: InputMaybe<Scalars['String']>;
        symbol_not_contains_nocase?: InputMaybe<Scalars['String']>;
        symbol_starts_with?: InputMaybe<Scalars['String']>;
        symbol_starts_with_nocase?: InputMaybe<Scalars['String']>;
        symbol_not_starts_with?: InputMaybe<Scalars['String']>;
        symbol_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
        symbol_ends_with?: InputMaybe<Scalars['String']>;
        symbol_ends_with_nocase?: InputMaybe<Scalars['String']>;
        symbol_not_ends_with?: InputMaybe<Scalars['String']>;
        symbol_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
        name?: InputMaybe<Scalars['String']>;
        name_not?: InputMaybe<Scalars['String']>;
        name_gt?: InputMaybe<Scalars['String']>;
        name_lt?: InputMaybe<Scalars['String']>;
        name_gte?: InputMaybe<Scalars['String']>;
        name_lte?: InputMaybe<Scalars['String']>;
        name_in?: InputMaybe<Array<Scalars['String']>>;
        name_not_in?: InputMaybe<Array<Scalars['String']>>;
        name_contains?: InputMaybe<Scalars['String']>;
        name_contains_nocase?: InputMaybe<Scalars['String']>;
        name_not_contains?: InputMaybe<Scalars['String']>;
        name_not_contains_nocase?: InputMaybe<Scalars['String']>;
        name_starts_with?: InputMaybe<Scalars['String']>;
        name_starts_with_nocase?: InputMaybe<Scalars['String']>;
        name_not_starts_with?: InputMaybe<Scalars['String']>;
        name_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
        name_ends_with?: InputMaybe<Scalars['String']>;
        name_ends_with_nocase?: InputMaybe<Scalars['String']>;
        name_not_ends_with?: InputMaybe<Scalars['String']>;
        name_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
        decimals?: InputMaybe<Scalars['BigInt']>;
        decimals_not?: InputMaybe<Scalars['BigInt']>;
        decimals_gt?: InputMaybe<Scalars['BigInt']>;
        decimals_lt?: InputMaybe<Scalars['BigInt']>;
        decimals_gte?: InputMaybe<Scalars['BigInt']>;
        decimals_lte?: InputMaybe<Scalars['BigInt']>;
        decimals_in?: InputMaybe<Array<Scalars['BigInt']>>;
        decimals_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
        /** Filter for the block changed event. */
        _change_block?: InputMaybe<BlockChangedFilter>;
        and?: InputMaybe<Array<InputMaybe<Token_filter>>>;
        or?: InputMaybe<Array<InputMaybe<Token_filter>>>;
    };

    export type Token_orderBy = 'id' | 'symbol' | 'name' | 'decimals';

    export type TokenomicsParams = {
        id: Scalars['ID'];
        alpha: Scalars['BigDecimal'];
        beta: Scalars['BigDecimal'];
        gamma: Scalars['BigDecimal'];
        b: Scalars['BigDecimal'];
        r: Scalars['BigDecimal'];
        lpShare: Scalars['BigDecimal'];
        lpShareFactor: Scalars['BigDecimal'];
    };

    export type TokenomicsParams_filter = {
        id?: InputMaybe<Scalars['ID']>;
        id_not?: InputMaybe<Scalars['ID']>;
        id_gt?: InputMaybe<Scalars['ID']>;
        id_lt?: InputMaybe<Scalars['ID']>;
        id_gte?: InputMaybe<Scalars['ID']>;
        id_lte?: InputMaybe<Scalars['ID']>;
        id_in?: InputMaybe<Array<Scalars['ID']>>;
        id_not_in?: InputMaybe<Array<Scalars['ID']>>;
        alpha?: InputMaybe<Scalars['BigDecimal']>;
        alpha_not?: InputMaybe<Scalars['BigDecimal']>;
        alpha_gt?: InputMaybe<Scalars['BigDecimal']>;
        alpha_lt?: InputMaybe<Scalars['BigDecimal']>;
        alpha_gte?: InputMaybe<Scalars['BigDecimal']>;
        alpha_lte?: InputMaybe<Scalars['BigDecimal']>;
        alpha_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
        alpha_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
        beta?: InputMaybe<Scalars['BigDecimal']>;
        beta_not?: InputMaybe<Scalars['BigDecimal']>;
        beta_gt?: InputMaybe<Scalars['BigDecimal']>;
        beta_lt?: InputMaybe<Scalars['BigDecimal']>;
        beta_gte?: InputMaybe<Scalars['BigDecimal']>;
        beta_lte?: InputMaybe<Scalars['BigDecimal']>;
        beta_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
        beta_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
        gamma?: InputMaybe<Scalars['BigDecimal']>;
        gamma_not?: InputMaybe<Scalars['BigDecimal']>;
        gamma_gt?: InputMaybe<Scalars['BigDecimal']>;
        gamma_lt?: InputMaybe<Scalars['BigDecimal']>;
        gamma_gte?: InputMaybe<Scalars['BigDecimal']>;
        gamma_lte?: InputMaybe<Scalars['BigDecimal']>;
        gamma_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
        gamma_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
        b?: InputMaybe<Scalars['BigDecimal']>;
        b_not?: InputMaybe<Scalars['BigDecimal']>;
        b_gt?: InputMaybe<Scalars['BigDecimal']>;
        b_lt?: InputMaybe<Scalars['BigDecimal']>;
        b_gte?: InputMaybe<Scalars['BigDecimal']>;
        b_lte?: InputMaybe<Scalars['BigDecimal']>;
        b_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
        b_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
        r?: InputMaybe<Scalars['BigDecimal']>;
        r_not?: InputMaybe<Scalars['BigDecimal']>;
        r_gt?: InputMaybe<Scalars['BigDecimal']>;
        r_lt?: InputMaybe<Scalars['BigDecimal']>;
        r_gte?: InputMaybe<Scalars['BigDecimal']>;
        r_lte?: InputMaybe<Scalars['BigDecimal']>;
        r_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
        r_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
        lpShare?: InputMaybe<Scalars['BigDecimal']>;
        lpShare_not?: InputMaybe<Scalars['BigDecimal']>;
        lpShare_gt?: InputMaybe<Scalars['BigDecimal']>;
        lpShare_lt?: InputMaybe<Scalars['BigDecimal']>;
        lpShare_gte?: InputMaybe<Scalars['BigDecimal']>;
        lpShare_lte?: InputMaybe<Scalars['BigDecimal']>;
        lpShare_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
        lpShare_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
        lpShareFactor?: InputMaybe<Scalars['BigDecimal']>;
        lpShareFactor_not?: InputMaybe<Scalars['BigDecimal']>;
        lpShareFactor_gt?: InputMaybe<Scalars['BigDecimal']>;
        lpShareFactor_lt?: InputMaybe<Scalars['BigDecimal']>;
        lpShareFactor_gte?: InputMaybe<Scalars['BigDecimal']>;
        lpShareFactor_lte?: InputMaybe<Scalars['BigDecimal']>;
        lpShareFactor_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
        lpShareFactor_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
        /** Filter for the block changed event. */
        _change_block?: InputMaybe<BlockChangedFilter>;
        and?: InputMaybe<Array<InputMaybe<TokenomicsParams_filter>>>;
        or?: InputMaybe<Array<InputMaybe<TokenomicsParams_filter>>>;
    };

    export type TokenomicsParams_orderBy =
        | 'id'
        | 'alpha'
        | 'beta'
        | 'gamma'
        | 'b'
        | 'r'
        | 'lpShare'
        | 'lpShareFactor';

    export type User = {
        id: Scalars['ID'];
        vrswLockedPositionsNumber: Scalars['BigInt'];
        liquidityPositions?: Maybe<Array<LiquidityPosition>>;
        lpStakingPositions?: Maybe<Array<LpStakingPosition>>;
        vrswStakingPositions?: Maybe<Array<VrswStakingPosition>>;
    };

    export type UserliquidityPositionsArgs = {
        skip?: InputMaybe<Scalars['Int']>;
        first?: InputMaybe<Scalars['Int']>;
        orderBy?: InputMaybe<LiquidityPosition_orderBy>;
        orderDirection?: InputMaybe<OrderDirection>;
        where?: InputMaybe<LiquidityPosition_filter>;
    };

    export type UserlpStakingPositionsArgs = {
        skip?: InputMaybe<Scalars['Int']>;
        first?: InputMaybe<Scalars['Int']>;
        orderBy?: InputMaybe<LpStakingPosition_orderBy>;
        orderDirection?: InputMaybe<OrderDirection>;
        where?: InputMaybe<LpStakingPosition_filter>;
    };

    export type UservrswStakingPositionsArgs = {
        skip?: InputMaybe<Scalars['Int']>;
        first?: InputMaybe<Scalars['Int']>;
        orderBy?: InputMaybe<VrswStakingPosition_orderBy>;
        orderDirection?: InputMaybe<OrderDirection>;
        where?: InputMaybe<VrswStakingPosition_filter>;
    };

    export type User_filter = {
        id?: InputMaybe<Scalars['ID']>;
        id_not?: InputMaybe<Scalars['ID']>;
        id_gt?: InputMaybe<Scalars['ID']>;
        id_lt?: InputMaybe<Scalars['ID']>;
        id_gte?: InputMaybe<Scalars['ID']>;
        id_lte?: InputMaybe<Scalars['ID']>;
        id_in?: InputMaybe<Array<Scalars['ID']>>;
        id_not_in?: InputMaybe<Array<Scalars['ID']>>;
        vrswLockedPositionsNumber?: InputMaybe<Scalars['BigInt']>;
        vrswLockedPositionsNumber_not?: InputMaybe<Scalars['BigInt']>;
        vrswLockedPositionsNumber_gt?: InputMaybe<Scalars['BigInt']>;
        vrswLockedPositionsNumber_lt?: InputMaybe<Scalars['BigInt']>;
        vrswLockedPositionsNumber_gte?: InputMaybe<Scalars['BigInt']>;
        vrswLockedPositionsNumber_lte?: InputMaybe<Scalars['BigInt']>;
        vrswLockedPositionsNumber_in?: InputMaybe<Array<Scalars['BigInt']>>;
        vrswLockedPositionsNumber_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
        liquidityPositions_?: InputMaybe<LiquidityPosition_filter>;
        lpStakingPositions_?: InputMaybe<LpStakingPosition_filter>;
        vrswStakingPositions_?: InputMaybe<VrswStakingPosition_filter>;
        /** Filter for the block changed event. */
        _change_block?: InputMaybe<BlockChangedFilter>;
        and?: InputMaybe<Array<InputMaybe<User_filter>>>;
        or?: InputMaybe<Array<InputMaybe<User_filter>>>;
    };

    export type User_orderBy =
        | 'id'
        | 'vrswLockedPositionsNumber'
        | 'liquidityPositions'
        | 'lpStakingPositions'
        | 'vrswStakingPositions';

    export type VrswStakingPosition = {
        id: Scalars['ID'];
        user: User;
        amount: Scalars['BigDecimal'];
        lockDue: Scalars['BigInt'];
        discountFactor: Scalars['BigDecimal'];
        timestamp: Scalars['BigInt'];
        mu: Scalars['BigDecimal'];
    };

    export type VrswStakingPosition_filter = {
        id?: InputMaybe<Scalars['ID']>;
        id_not?: InputMaybe<Scalars['ID']>;
        id_gt?: InputMaybe<Scalars['ID']>;
        id_lt?: InputMaybe<Scalars['ID']>;
        id_gte?: InputMaybe<Scalars['ID']>;
        id_lte?: InputMaybe<Scalars['ID']>;
        id_in?: InputMaybe<Array<Scalars['ID']>>;
        id_not_in?: InputMaybe<Array<Scalars['ID']>>;
        user?: InputMaybe<Scalars['String']>;
        user_not?: InputMaybe<Scalars['String']>;
        user_gt?: InputMaybe<Scalars['String']>;
        user_lt?: InputMaybe<Scalars['String']>;
        user_gte?: InputMaybe<Scalars['String']>;
        user_lte?: InputMaybe<Scalars['String']>;
        user_in?: InputMaybe<Array<Scalars['String']>>;
        user_not_in?: InputMaybe<Array<Scalars['String']>>;
        user_contains?: InputMaybe<Scalars['String']>;
        user_contains_nocase?: InputMaybe<Scalars['String']>;
        user_not_contains?: InputMaybe<Scalars['String']>;
        user_not_contains_nocase?: InputMaybe<Scalars['String']>;
        user_starts_with?: InputMaybe<Scalars['String']>;
        user_starts_with_nocase?: InputMaybe<Scalars['String']>;
        user_not_starts_with?: InputMaybe<Scalars['String']>;
        user_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
        user_ends_with?: InputMaybe<Scalars['String']>;
        user_ends_with_nocase?: InputMaybe<Scalars['String']>;
        user_not_ends_with?: InputMaybe<Scalars['String']>;
        user_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
        user_?: InputMaybe<User_filter>;
        amount?: InputMaybe<Scalars['BigDecimal']>;
        amount_not?: InputMaybe<Scalars['BigDecimal']>;
        amount_gt?: InputMaybe<Scalars['BigDecimal']>;
        amount_lt?: InputMaybe<Scalars['BigDecimal']>;
        amount_gte?: InputMaybe<Scalars['BigDecimal']>;
        amount_lte?: InputMaybe<Scalars['BigDecimal']>;
        amount_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
        amount_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
        lockDue?: InputMaybe<Scalars['BigInt']>;
        lockDue_not?: InputMaybe<Scalars['BigInt']>;
        lockDue_gt?: InputMaybe<Scalars['BigInt']>;
        lockDue_lt?: InputMaybe<Scalars['BigInt']>;
        lockDue_gte?: InputMaybe<Scalars['BigInt']>;
        lockDue_lte?: InputMaybe<Scalars['BigInt']>;
        lockDue_in?: InputMaybe<Array<Scalars['BigInt']>>;
        lockDue_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
        discountFactor?: InputMaybe<Scalars['BigDecimal']>;
        discountFactor_not?: InputMaybe<Scalars['BigDecimal']>;
        discountFactor_gt?: InputMaybe<Scalars['BigDecimal']>;
        discountFactor_lt?: InputMaybe<Scalars['BigDecimal']>;
        discountFactor_gte?: InputMaybe<Scalars['BigDecimal']>;
        discountFactor_lte?: InputMaybe<Scalars['BigDecimal']>;
        discountFactor_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
        discountFactor_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
        timestamp?: InputMaybe<Scalars['BigInt']>;
        timestamp_not?: InputMaybe<Scalars['BigInt']>;
        timestamp_gt?: InputMaybe<Scalars['BigInt']>;
        timestamp_lt?: InputMaybe<Scalars['BigInt']>;
        timestamp_gte?: InputMaybe<Scalars['BigInt']>;
        timestamp_lte?: InputMaybe<Scalars['BigInt']>;
        timestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
        timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
        mu?: InputMaybe<Scalars['BigDecimal']>;
        mu_not?: InputMaybe<Scalars['BigDecimal']>;
        mu_gt?: InputMaybe<Scalars['BigDecimal']>;
        mu_lt?: InputMaybe<Scalars['BigDecimal']>;
        mu_gte?: InputMaybe<Scalars['BigDecimal']>;
        mu_lte?: InputMaybe<Scalars['BigDecimal']>;
        mu_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
        mu_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
        /** Filter for the block changed event. */
        _change_block?: InputMaybe<BlockChangedFilter>;
        and?: InputMaybe<Array<InputMaybe<VrswStakingPosition_filter>>>;
        or?: InputMaybe<Array<InputMaybe<VrswStakingPosition_filter>>>;
    };

    export type VrswStakingPosition_orderBy =
        | 'id'
        | 'user'
        | 'user__id'
        | 'user__vrswLockedPositionsNumber'
        | 'amount'
        | 'lockDue'
        | 'discountFactor'
        | 'timestamp'
        | 'mu';

    export type _Block_ = {
        /** The hash of the block */
        hash?: Maybe<Scalars['Bytes']>;
        /** The block number */
        number: Scalars['Int'];
        /** Integer representation of the timestamp stored in blocks for the chain */
        timestamp?: Maybe<Scalars['Int']>;
        /** The hash of the parent block */
        parentHash?: Maybe<Scalars['Bytes']>;
    };

    /** The type for the top-level _meta field */
    export type _Meta_ = {
        /**
         * Information about a specific subgraph block. The hash of the block
         * will be null if the _meta field has a block constraint that asks for
         * a block number. It will be filled if the _meta field has no block constraint
         * and therefore asks for the latest  block
         *
         */
        block: _Block_;
        /** The deployment ID */
        deployment: Scalars['String'];
        /** If `true`, the subgraph encountered indexing errors at some past block */
        hasIndexingErrors: Scalars['Boolean'];
    };

    export type _SubgraphErrorPolicy_ =
        /** Data will be returned even if the subgraph has indexing errors */
        | 'allow'
        /** If the subgraph has indexing errors, data will be omitted. The default. */
        | 'deny';

    export type QuerySdk = {
        /** null **/
        token: InContextSdkMethod<Query['token'], QuerytokenArgs, MeshContext>;
        /** null **/
        tokens: InContextSdkMethod<
            Query['tokens'],
            QuerytokensArgs,
            MeshContext
        >;
        /** null **/
        pair: InContextSdkMethod<Query['pair'], QuerypairArgs, MeshContext>;
        /** null **/
        pairs: InContextSdkMethod<Query['pairs'], QuerypairsArgs, MeshContext>;
        /** null **/
        user: InContextSdkMethod<Query['user'], QueryuserArgs, MeshContext>;
        /** null **/
        users: InContextSdkMethod<Query['users'], QueryusersArgs, MeshContext>;
        /** null **/
        liquidityPosition: InContextSdkMethod<
            Query['liquidityPosition'],
            QueryliquidityPositionArgs,
            MeshContext
        >;
        /** null **/
        liquidityPositions: InContextSdkMethod<
            Query['liquidityPositions'],
            QueryliquidityPositionsArgs,
            MeshContext
        >;
        /** null **/
        pairWhitelist: InContextSdkMethod<
            Query['pairWhitelist'],
            QuerypairWhitelistArgs,
            MeshContext
        >;
        /** null **/
        pairWhitelists: InContextSdkMethod<
            Query['pairWhitelists'],
            QuerypairWhitelistsArgs,
            MeshContext
        >;
        /** null **/
        pairReserve: InContextSdkMethod<
            Query['pairReserve'],
            QuerypairReserveArgs,
            MeshContext
        >;
        /** null **/
        pairReserves: InContextSdkMethod<
            Query['pairReserves'],
            QuerypairReservesArgs,
            MeshContext
        >;
        /** null **/
        tokenomicsParams: InContextSdkMethod<
            Query['tokenomicsParams'],
            QuerytokenomicsParamsArgs,
            MeshContext
        >;
        /** null **/
        tokenomicsParams_collection: InContextSdkMethod<
            Query['tokenomicsParams_collection'],
            QuerytokenomicsParams_collectionArgs,
            MeshContext
        >;
        /** null **/
        lpStakingPosition: InContextSdkMethod<
            Query['lpStakingPosition'],
            QuerylpStakingPositionArgs,
            MeshContext
        >;
        /** null **/
        lpStakingPositions: InContextSdkMethod<
            Query['lpStakingPositions'],
            QuerylpStakingPositionsArgs,
            MeshContext
        >;
        /** null **/
        vrswStakingPosition: InContextSdkMethod<
            Query['vrswStakingPosition'],
            QueryvrswStakingPositionArgs,
            MeshContext
        >;
        /** null **/
        vrswStakingPositions: InContextSdkMethod<
            Query['vrswStakingPositions'],
            QueryvrswStakingPositionsArgs,
            MeshContext
        >;
        /** Access to subgraph metadata **/
        _meta: InContextSdkMethod<Query['_meta'], Query_metaArgs, MeshContext>;
    };

    export type MutationSdk = {};

    export type SubscriptionSdk = {
        /** null **/
        token: InContextSdkMethod<
            Subscription['token'],
            SubscriptiontokenArgs,
            MeshContext
        >;
        /** null **/
        tokens: InContextSdkMethod<
            Subscription['tokens'],
            SubscriptiontokensArgs,
            MeshContext
        >;
        /** null **/
        pair: InContextSdkMethod<
            Subscription['pair'],
            SubscriptionpairArgs,
            MeshContext
        >;
        /** null **/
        pairs: InContextSdkMethod<
            Subscription['pairs'],
            SubscriptionpairsArgs,
            MeshContext
        >;
        /** null **/
        user: InContextSdkMethod<
            Subscription['user'],
            SubscriptionuserArgs,
            MeshContext
        >;
        /** null **/
        users: InContextSdkMethod<
            Subscription['users'],
            SubscriptionusersArgs,
            MeshContext
        >;
        /** null **/
        liquidityPosition: InContextSdkMethod<
            Subscription['liquidityPosition'],
            SubscriptionliquidityPositionArgs,
            MeshContext
        >;
        /** null **/
        liquidityPositions: InContextSdkMethod<
            Subscription['liquidityPositions'],
            SubscriptionliquidityPositionsArgs,
            MeshContext
        >;
        /** null **/
        pairWhitelist: InContextSdkMethod<
            Subscription['pairWhitelist'],
            SubscriptionpairWhitelistArgs,
            MeshContext
        >;
        /** null **/
        pairWhitelists: InContextSdkMethod<
            Subscription['pairWhitelists'],
            SubscriptionpairWhitelistsArgs,
            MeshContext
        >;
        /** null **/
        pairReserve: InContextSdkMethod<
            Subscription['pairReserve'],
            SubscriptionpairReserveArgs,
            MeshContext
        >;
        /** null **/
        pairReserves: InContextSdkMethod<
            Subscription['pairReserves'],
            SubscriptionpairReservesArgs,
            MeshContext
        >;
        /** null **/
        tokenomicsParams: InContextSdkMethod<
            Subscription['tokenomicsParams'],
            SubscriptiontokenomicsParamsArgs,
            MeshContext
        >;
        /** null **/
        tokenomicsParams_collection: InContextSdkMethod<
            Subscription['tokenomicsParams_collection'],
            SubscriptiontokenomicsParams_collectionArgs,
            MeshContext
        >;
        /** null **/
        lpStakingPosition: InContextSdkMethod<
            Subscription['lpStakingPosition'],
            SubscriptionlpStakingPositionArgs,
            MeshContext
        >;
        /** null **/
        lpStakingPositions: InContextSdkMethod<
            Subscription['lpStakingPositions'],
            SubscriptionlpStakingPositionsArgs,
            MeshContext
        >;
        /** null **/
        vrswStakingPosition: InContextSdkMethod<
            Subscription['vrswStakingPosition'],
            SubscriptionvrswStakingPositionArgs,
            MeshContext
        >;
        /** null **/
        vrswStakingPositions: InContextSdkMethod<
            Subscription['vrswStakingPositions'],
            SubscriptionvrswStakingPositionsArgs,
            MeshContext
        >;
        /** Access to subgraph metadata **/
        _meta: InContextSdkMethod<
            Subscription['_meta'],
            Subscription_metaArgs,
            MeshContext
        >;
    };

    export type Context = {
        ['graph-test']: {
            Query: QuerySdk;
            Mutation: MutationSdk;
            Subscription: SubscriptionSdk;
        };
    };
}
