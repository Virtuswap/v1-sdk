// @ts-nocheck
import {
    GraphQLResolveInfo,
    SelectionSetNode,
    FieldNode,
    GraphQLScalarType,
    GraphQLScalarTypeConfig,
} from 'graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
import { gql } from '@graphql-mesh/utils';

import type { GetMeshOptions } from '@graphql-mesh/runtime';
import type { YamlConfig } from '@graphql-mesh/types';
import { PubSub } from '@graphql-mesh/utils';
import { DefaultLogger } from '@graphql-mesh/utils';
import MeshCache from '@graphql-mesh/cache-localforage';
import { fetch as fetchFn } from '@whatwg-node/fetch';

import { MeshResolvedSource } from '@graphql-mesh/runtime';
import { MeshTransform, MeshPlugin } from '@graphql-mesh/types';
import GraphqlHandler from '@graphql-mesh/graphql';
import BareMerger from '@graphql-mesh/merger-bare';
import { printWithCache } from '@graphql-mesh/utils';
import { createMeshHTTPHandler, MeshHTTPHandler } from '@graphql-mesh/http';
import {
    getMesh,
    ExecuteMeshFn,
    SubscribeMeshFn,
    MeshContext as BaseMeshContext,
    MeshInstance,
} from '@graphql-mesh/runtime';
import { MeshStore, FsStoreStorageAdapter } from '@graphql-mesh/store';
import { path as pathModule } from '@graphql-mesh/cross-helpers';
import { ImportFn } from '@graphql-mesh/types';
import type { GraphTestTypes } from './sources/graph-test/types';
import * as importedModule$0 from './sources/graph-test/introspectionSchema';
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
export type RequireFields<T, K extends keyof T> = Omit<T, K> & {
    [P in K]-?: NonNullable<T[P]>;
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

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;

export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
    resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type LegacyStitchingResolver<TResult, TParent, TContext, TArgs> = {
    fragment: string;
    resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type NewStitchingResolver<TResult, TParent, TContext, TArgs> = {
    selectionSet: string | ((fieldNode: FieldNode) => SelectionSetNode);
    resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type StitchingResolver<TResult, TParent, TContext, TArgs> =
    | LegacyStitchingResolver<TResult, TParent, TContext, TArgs>
    | NewStitchingResolver<TResult, TParent, TContext, TArgs>;
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
    | ResolverFn<TResult, TParent, TContext, TArgs>
    | ResolverWithResolve<TResult, TParent, TContext, TArgs>
    | StitchingResolver<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
    parent: TParent,
    args: TArgs,
    context: TContext,
    info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
    parent: TParent,
    args: TArgs,
    context: TContext,
    info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
    parent: TParent,
    args: TArgs,
    context: TContext,
    info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<
    TResult,
    TKey extends string,
    TParent,
    TContext,
    TArgs,
> {
    subscribe: SubscriptionSubscribeFn<
        { [key in TKey]: TResult },
        TParent,
        TContext,
        TArgs
    >;
    resolve?: SubscriptionResolveFn<
        TResult,
        { [key in TKey]: TResult },
        TContext,
        TArgs
    >;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
    subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
    resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<
    TResult,
    TKey extends string,
    TParent,
    TContext,
    TArgs,
> =
    | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
    | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<
    TResult,
    TKey extends string,
    TParent = {},
    TContext = {},
    TArgs = {},
> =
    | ((
          ...args: any[]
      ) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
    | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
    parent: TParent,
    context: TContext,
    info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (
    obj: T,
    context: TContext,
    info: GraphQLResolveInfo
) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<
    TResult = {},
    TParent = {},
    TContext = {},
    TArgs = {},
> = (
    next: NextResolverFn<TResult>,
    parent: TParent,
    args: TArgs,
    context: TContext,
    info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
    Aggregation_interval: Aggregation_interval;
    BigDecimal: ResolverTypeWrapper<Scalars['BigDecimal']>;
    BigInt: ResolverTypeWrapper<Scalars['BigInt']>;
    BlockChangedFilter: BlockChangedFilter;
    Block_height: Block_height;
    Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
    Bytes: ResolverTypeWrapper<Scalars['Bytes']>;
    Float: ResolverTypeWrapper<Scalars['Float']>;
    ID: ResolverTypeWrapper<Scalars['ID']>;
    Int: ResolverTypeWrapper<Scalars['Int']>;
    Int8: ResolverTypeWrapper<Scalars['Int8']>;
    LiquidityPosition: ResolverTypeWrapper<LiquidityPosition>;
    LiquidityPosition_filter: LiquidityPosition_filter;
    LiquidityPosition_orderBy: LiquidityPosition_orderBy;
    LpStakingPosition: ResolverTypeWrapper<LpStakingPosition>;
    LpStakingPosition_filter: LpStakingPosition_filter;
    LpStakingPosition_orderBy: LpStakingPosition_orderBy;
    OrderDirection: OrderDirection;
    Pair: ResolverTypeWrapper<Pair>;
    PairReserve: ResolverTypeWrapper<PairReserve>;
    PairReserve_filter: PairReserve_filter;
    PairReserve_orderBy: PairReserve_orderBy;
    PairWhitelist: ResolverTypeWrapper<PairWhitelist>;
    PairWhitelist_filter: PairWhitelist_filter;
    PairWhitelist_orderBy: PairWhitelist_orderBy;
    Pair_filter: Pair_filter;
    Pair_orderBy: Pair_orderBy;
    Query: ResolverTypeWrapper<{}>;
    String: ResolverTypeWrapper<Scalars['String']>;
    Subscription: ResolverTypeWrapper<{}>;
    Timestamp: ResolverTypeWrapper<Scalars['Timestamp']>;
    Token: ResolverTypeWrapper<Token>;
    Token_filter: Token_filter;
    Token_orderBy: Token_orderBy;
    TokenomicsParams: ResolverTypeWrapper<TokenomicsParams>;
    TokenomicsParams_filter: TokenomicsParams_filter;
    TokenomicsParams_orderBy: TokenomicsParams_orderBy;
    User: ResolverTypeWrapper<User>;
    User_filter: User_filter;
    User_orderBy: User_orderBy;
    VrswStakingPosition: ResolverTypeWrapper<VrswStakingPosition>;
    VrswStakingPosition_filter: VrswStakingPosition_filter;
    VrswStakingPosition_orderBy: VrswStakingPosition_orderBy;
    _Block_: ResolverTypeWrapper<_Block_>;
    _Meta_: ResolverTypeWrapper<_Meta_>;
    _SubgraphErrorPolicy_: _SubgraphErrorPolicy_;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
    BigDecimal: Scalars['BigDecimal'];
    BigInt: Scalars['BigInt'];
    BlockChangedFilter: BlockChangedFilter;
    Block_height: Block_height;
    Boolean: Scalars['Boolean'];
    Bytes: Scalars['Bytes'];
    Float: Scalars['Float'];
    ID: Scalars['ID'];
    Int: Scalars['Int'];
    Int8: Scalars['Int8'];
    LiquidityPosition: LiquidityPosition;
    LiquidityPosition_filter: LiquidityPosition_filter;
    LpStakingPosition: LpStakingPosition;
    LpStakingPosition_filter: LpStakingPosition_filter;
    Pair: Pair;
    PairReserve: PairReserve;
    PairReserve_filter: PairReserve_filter;
    PairWhitelist: PairWhitelist;
    PairWhitelist_filter: PairWhitelist_filter;
    Pair_filter: Pair_filter;
    Query: {};
    String: Scalars['String'];
    Subscription: {};
    Timestamp: Scalars['Timestamp'];
    Token: Token;
    Token_filter: Token_filter;
    TokenomicsParams: TokenomicsParams;
    TokenomicsParams_filter: TokenomicsParams_filter;
    User: User;
    User_filter: User_filter;
    VrswStakingPosition: VrswStakingPosition;
    VrswStakingPosition_filter: VrswStakingPosition_filter;
    _Block_: _Block_;
    _Meta_: _Meta_;
}>;

export type entityDirectiveArgs = {};

export type entityDirectiveResolver<
    Result,
    Parent,
    ContextType = MeshContext,
    Args = entityDirectiveArgs,
> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type subgraphIdDirectiveArgs = {
    id: Scalars['String'];
};

export type subgraphIdDirectiveResolver<
    Result,
    Parent,
    ContextType = MeshContext,
    Args = subgraphIdDirectiveArgs,
> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type derivedFromDirectiveArgs = {
    field: Scalars['String'];
};

export type derivedFromDirectiveResolver<
    Result,
    Parent,
    ContextType = MeshContext,
    Args = derivedFromDirectiveArgs,
> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export interface BigDecimalScalarConfig
    extends GraphQLScalarTypeConfig<ResolversTypes['BigDecimal'], any> {
    name: 'BigDecimal';
}

export interface BigIntScalarConfig
    extends GraphQLScalarTypeConfig<ResolversTypes['BigInt'], any> {
    name: 'BigInt';
}

export interface BytesScalarConfig
    extends GraphQLScalarTypeConfig<ResolversTypes['Bytes'], any> {
    name: 'Bytes';
}

export interface Int8ScalarConfig
    extends GraphQLScalarTypeConfig<ResolversTypes['Int8'], any> {
    name: 'Int8';
}

export type LiquidityPositionResolvers<
    ContextType = MeshContext,
    ParentType extends
        ResolversParentTypes['LiquidityPosition'] = ResolversParentTypes['LiquidityPosition'],
> = ResolversObject<{
    id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
    user?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
    pair?: Resolver<ResolversTypes['Pair'], ParentType, ContextType>;
    liquidityTokenBalance?: Resolver<
        ResolversTypes['BigDecimal'],
        ParentType,
        ContextType
    >;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type LpStakingPositionResolvers<
    ContextType = MeshContext,
    ParentType extends
        ResolversParentTypes['LpStakingPosition'] = ResolversParentTypes['LpStakingPosition'],
> = ResolversObject<{
    id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
    user?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
    pair?: Resolver<ResolversTypes['Pair'], ParentType, ContextType>;
    amount?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
    mu?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type PairResolvers<
    ContextType = MeshContext,
    ParentType extends
        ResolversParentTypes['Pair'] = ResolversParentTypes['Pair'],
> = ResolversObject<{
    id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
    token0?: Resolver<ResolversTypes['Token'], ParentType, ContextType>;
    token1?: Resolver<ResolversTypes['Token'], ParentType, ContextType>;
    balance0?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
    balance1?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
    fee?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
    vFee?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
    maxReserveRatio?: Resolver<
        ResolversTypes['BigInt'],
        ParentType,
        ContextType
    >;
    reserveRatio?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
    totalSupply?: Resolver<
        ResolversTypes['BigDecimal'],
        ParentType,
        ContextType
    >;
    blocksDelay?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
    totalMu?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
    totalStaked?: Resolver<
        ResolversTypes['BigDecimal'],
        ParentType,
        ContextType
    >;
    lastSwapBlock?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
    whitelist?: Resolver<
        Array<ResolversTypes['PairWhitelist']>,
        ParentType,
        ContextType,
        RequireFields<PairwhitelistArgs, 'skip' | 'first'>
    >;
    allocationPoints?: Resolver<
        ResolversTypes['BigInt'],
        ParentType,
        ContextType
    >;
    token0Price?: Resolver<
        ResolversTypes['BigDecimal'],
        ParentType,
        ContextType
    >;
    token1Price?: Resolver<
        ResolversTypes['BigDecimal'],
        ParentType,
        ContextType
    >;
    pairReserves?: Resolver<
        Array<ResolversTypes['PairReserve']>,
        ParentType,
        ContextType,
        RequireFields<PairpairReservesArgs, 'skip' | 'first'>
    >;
    createdAtTimestamp?: Resolver<
        ResolversTypes['BigInt'],
        ParentType,
        ContextType
    >;
    createdAtBlockNumber?: Resolver<
        ResolversTypes['BigInt'],
        ParentType,
        ContextType
    >;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type PairReserveResolvers<
    ContextType = MeshContext,
    ParentType extends
        ResolversParentTypes['PairReserve'] = ResolversParentTypes['PairReserve'],
> = ResolversObject<{
    id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
    pair?: Resolver<ResolversTypes['Pair'], ParentType, ContextType>;
    token?: Resolver<ResolversTypes['Token'], ParentType, ContextType>;
    balance?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
    baseValue?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type PairWhitelistResolvers<
    ContextType = MeshContext,
    ParentType extends
        ResolversParentTypes['PairWhitelist'] = ResolversParentTypes['PairWhitelist'],
> = ResolversObject<{
    id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
    token?: Resolver<ResolversTypes['Token'], ParentType, ContextType>;
    pair?: Resolver<ResolversTypes['Pair'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type QueryResolvers<
    ContextType = MeshContext,
    ParentType extends
        ResolversParentTypes['Query'] = ResolversParentTypes['Query'],
> = ResolversObject<{
    token?: Resolver<
        Maybe<ResolversTypes['Token']>,
        ParentType,
        ContextType,
        RequireFields<QuerytokenArgs, 'id' | 'subgraphError'>
    >;
    tokens?: Resolver<
        Array<ResolversTypes['Token']>,
        ParentType,
        ContextType,
        RequireFields<QuerytokensArgs, 'skip' | 'first' | 'subgraphError'>
    >;
    pair?: Resolver<
        Maybe<ResolversTypes['Pair']>,
        ParentType,
        ContextType,
        RequireFields<QuerypairArgs, 'id' | 'subgraphError'>
    >;
    pairs?: Resolver<
        Array<ResolversTypes['Pair']>,
        ParentType,
        ContextType,
        RequireFields<QuerypairsArgs, 'skip' | 'first' | 'subgraphError'>
    >;
    user?: Resolver<
        Maybe<ResolversTypes['User']>,
        ParentType,
        ContextType,
        RequireFields<QueryuserArgs, 'id' | 'subgraphError'>
    >;
    users?: Resolver<
        Array<ResolversTypes['User']>,
        ParentType,
        ContextType,
        RequireFields<QueryusersArgs, 'skip' | 'first' | 'subgraphError'>
    >;
    liquidityPosition?: Resolver<
        Maybe<ResolversTypes['LiquidityPosition']>,
        ParentType,
        ContextType,
        RequireFields<QueryliquidityPositionArgs, 'id' | 'subgraphError'>
    >;
    liquidityPositions?: Resolver<
        Array<ResolversTypes['LiquidityPosition']>,
        ParentType,
        ContextType,
        RequireFields<
            QueryliquidityPositionsArgs,
            'skip' | 'first' | 'subgraphError'
        >
    >;
    pairWhitelist?: Resolver<
        Maybe<ResolversTypes['PairWhitelist']>,
        ParentType,
        ContextType,
        RequireFields<QuerypairWhitelistArgs, 'id' | 'subgraphError'>
    >;
    pairWhitelists?: Resolver<
        Array<ResolversTypes['PairWhitelist']>,
        ParentType,
        ContextType,
        RequireFields<
            QuerypairWhitelistsArgs,
            'skip' | 'first' | 'subgraphError'
        >
    >;
    pairReserve?: Resolver<
        Maybe<ResolversTypes['PairReserve']>,
        ParentType,
        ContextType,
        RequireFields<QuerypairReserveArgs, 'id' | 'subgraphError'>
    >;
    pairReserves?: Resolver<
        Array<ResolversTypes['PairReserve']>,
        ParentType,
        ContextType,
        RequireFields<QuerypairReservesArgs, 'skip' | 'first' | 'subgraphError'>
    >;
    tokenomicsParams?: Resolver<
        Maybe<ResolversTypes['TokenomicsParams']>,
        ParentType,
        ContextType,
        RequireFields<QuerytokenomicsParamsArgs, 'id' | 'subgraphError'>
    >;
    tokenomicsParams_collection?: Resolver<
        Array<ResolversTypes['TokenomicsParams']>,
        ParentType,
        ContextType,
        RequireFields<
            QuerytokenomicsParams_collectionArgs,
            'skip' | 'first' | 'subgraphError'
        >
    >;
    lpStakingPosition?: Resolver<
        Maybe<ResolversTypes['LpStakingPosition']>,
        ParentType,
        ContextType,
        RequireFields<QuerylpStakingPositionArgs, 'id' | 'subgraphError'>
    >;
    lpStakingPositions?: Resolver<
        Array<ResolversTypes['LpStakingPosition']>,
        ParentType,
        ContextType,
        RequireFields<
            QuerylpStakingPositionsArgs,
            'skip' | 'first' | 'subgraphError'
        >
    >;
    vrswStakingPosition?: Resolver<
        Maybe<ResolversTypes['VrswStakingPosition']>,
        ParentType,
        ContextType,
        RequireFields<QueryvrswStakingPositionArgs, 'id' | 'subgraphError'>
    >;
    vrswStakingPositions?: Resolver<
        Array<ResolversTypes['VrswStakingPosition']>,
        ParentType,
        ContextType,
        RequireFields<
            QueryvrswStakingPositionsArgs,
            'skip' | 'first' | 'subgraphError'
        >
    >;
    _meta?: Resolver<
        Maybe<ResolversTypes['_Meta_']>,
        ParentType,
        ContextType,
        Partial<Query_metaArgs>
    >;
}>;

export type SubscriptionResolvers<
    ContextType = MeshContext,
    ParentType extends
        ResolversParentTypes['Subscription'] = ResolversParentTypes['Subscription'],
> = ResolversObject<{
    token?: SubscriptionResolver<
        Maybe<ResolversTypes['Token']>,
        'token',
        ParentType,
        ContextType,
        RequireFields<SubscriptiontokenArgs, 'id' | 'subgraphError'>
    >;
    tokens?: SubscriptionResolver<
        Array<ResolversTypes['Token']>,
        'tokens',
        ParentType,
        ContextType,
        RequireFields<
            SubscriptiontokensArgs,
            'skip' | 'first' | 'subgraphError'
        >
    >;
    pair?: SubscriptionResolver<
        Maybe<ResolversTypes['Pair']>,
        'pair',
        ParentType,
        ContextType,
        RequireFields<SubscriptionpairArgs, 'id' | 'subgraphError'>
    >;
    pairs?: SubscriptionResolver<
        Array<ResolversTypes['Pair']>,
        'pairs',
        ParentType,
        ContextType,
        RequireFields<SubscriptionpairsArgs, 'skip' | 'first' | 'subgraphError'>
    >;
    user?: SubscriptionResolver<
        Maybe<ResolversTypes['User']>,
        'user',
        ParentType,
        ContextType,
        RequireFields<SubscriptionuserArgs, 'id' | 'subgraphError'>
    >;
    users?: SubscriptionResolver<
        Array<ResolversTypes['User']>,
        'users',
        ParentType,
        ContextType,
        RequireFields<SubscriptionusersArgs, 'skip' | 'first' | 'subgraphError'>
    >;
    liquidityPosition?: SubscriptionResolver<
        Maybe<ResolversTypes['LiquidityPosition']>,
        'liquidityPosition',
        ParentType,
        ContextType,
        RequireFields<SubscriptionliquidityPositionArgs, 'id' | 'subgraphError'>
    >;
    liquidityPositions?: SubscriptionResolver<
        Array<ResolversTypes['LiquidityPosition']>,
        'liquidityPositions',
        ParentType,
        ContextType,
        RequireFields<
            SubscriptionliquidityPositionsArgs,
            'skip' | 'first' | 'subgraphError'
        >
    >;
    pairWhitelist?: SubscriptionResolver<
        Maybe<ResolversTypes['PairWhitelist']>,
        'pairWhitelist',
        ParentType,
        ContextType,
        RequireFields<SubscriptionpairWhitelistArgs, 'id' | 'subgraphError'>
    >;
    pairWhitelists?: SubscriptionResolver<
        Array<ResolversTypes['PairWhitelist']>,
        'pairWhitelists',
        ParentType,
        ContextType,
        RequireFields<
            SubscriptionpairWhitelistsArgs,
            'skip' | 'first' | 'subgraphError'
        >
    >;
    pairReserve?: SubscriptionResolver<
        Maybe<ResolversTypes['PairReserve']>,
        'pairReserve',
        ParentType,
        ContextType,
        RequireFields<SubscriptionpairReserveArgs, 'id' | 'subgraphError'>
    >;
    pairReserves?: SubscriptionResolver<
        Array<ResolversTypes['PairReserve']>,
        'pairReserves',
        ParentType,
        ContextType,
        RequireFields<
            SubscriptionpairReservesArgs,
            'skip' | 'first' | 'subgraphError'
        >
    >;
    tokenomicsParams?: SubscriptionResolver<
        Maybe<ResolversTypes['TokenomicsParams']>,
        'tokenomicsParams',
        ParentType,
        ContextType,
        RequireFields<SubscriptiontokenomicsParamsArgs, 'id' | 'subgraphError'>
    >;
    tokenomicsParams_collection?: SubscriptionResolver<
        Array<ResolversTypes['TokenomicsParams']>,
        'tokenomicsParams_collection',
        ParentType,
        ContextType,
        RequireFields<
            SubscriptiontokenomicsParams_collectionArgs,
            'skip' | 'first' | 'subgraphError'
        >
    >;
    lpStakingPosition?: SubscriptionResolver<
        Maybe<ResolversTypes['LpStakingPosition']>,
        'lpStakingPosition',
        ParentType,
        ContextType,
        RequireFields<SubscriptionlpStakingPositionArgs, 'id' | 'subgraphError'>
    >;
    lpStakingPositions?: SubscriptionResolver<
        Array<ResolversTypes['LpStakingPosition']>,
        'lpStakingPositions',
        ParentType,
        ContextType,
        RequireFields<
            SubscriptionlpStakingPositionsArgs,
            'skip' | 'first' | 'subgraphError'
        >
    >;
    vrswStakingPosition?: SubscriptionResolver<
        Maybe<ResolversTypes['VrswStakingPosition']>,
        'vrswStakingPosition',
        ParentType,
        ContextType,
        RequireFields<
            SubscriptionvrswStakingPositionArgs,
            'id' | 'subgraphError'
        >
    >;
    vrswStakingPositions?: SubscriptionResolver<
        Array<ResolversTypes['VrswStakingPosition']>,
        'vrswStakingPositions',
        ParentType,
        ContextType,
        RequireFields<
            SubscriptionvrswStakingPositionsArgs,
            'skip' | 'first' | 'subgraphError'
        >
    >;
    _meta?: SubscriptionResolver<
        Maybe<ResolversTypes['_Meta_']>,
        '_meta',
        ParentType,
        ContextType,
        Partial<Subscription_metaArgs>
    >;
}>;

export interface TimestampScalarConfig
    extends GraphQLScalarTypeConfig<ResolversTypes['Timestamp'], any> {
    name: 'Timestamp';
}

export type TokenResolvers<
    ContextType = MeshContext,
    ParentType extends
        ResolversParentTypes['Token'] = ResolversParentTypes['Token'],
> = ResolversObject<{
    id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
    symbol?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    decimals?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type TokenomicsParamsResolvers<
    ContextType = MeshContext,
    ParentType extends
        ResolversParentTypes['TokenomicsParams'] = ResolversParentTypes['TokenomicsParams'],
> = ResolversObject<{
    id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
    alpha?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
    beta?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
    gamma?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
    b?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
    r?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
    lpShare?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
    lpShareFactor?: Resolver<
        ResolversTypes['BigDecimal'],
        ParentType,
        ContextType
    >;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type UserResolvers<
    ContextType = MeshContext,
    ParentType extends
        ResolversParentTypes['User'] = ResolversParentTypes['User'],
> = ResolversObject<{
    id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
    liquidityPositions?: Resolver<
        Maybe<Array<ResolversTypes['LiquidityPosition']>>,
        ParentType,
        ContextType,
        RequireFields<UserliquidityPositionsArgs, 'skip' | 'first'>
    >;
    lpStakingPositions?: Resolver<
        Maybe<Array<ResolversTypes['LpStakingPosition']>>,
        ParentType,
        ContextType,
        RequireFields<UserlpStakingPositionsArgs, 'skip' | 'first'>
    >;
    vrswStakingPositions?: Resolver<
        Maybe<Array<ResolversTypes['VrswStakingPosition']>>,
        ParentType,
        ContextType,
        RequireFields<UservrswStakingPositionsArgs, 'skip' | 'first'>
    >;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type VrswStakingPositionResolvers<
    ContextType = MeshContext,
    ParentType extends
        ResolversParentTypes['VrswStakingPosition'] = ResolversParentTypes['VrswStakingPosition'],
> = ResolversObject<{
    id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
    user?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
    amount?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
    lockDue?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
    discountFactor?: Resolver<
        ResolversTypes['BigDecimal'],
        ParentType,
        ContextType
    >;
    timestamp?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
    mu?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type _Block_Resolvers<
    ContextType = MeshContext,
    ParentType extends
        ResolversParentTypes['_Block_'] = ResolversParentTypes['_Block_'],
> = ResolversObject<{
    hash?: Resolver<Maybe<ResolversTypes['Bytes']>, ParentType, ContextType>;
    number?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
    timestamp?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
    parentHash?: Resolver<
        Maybe<ResolversTypes['Bytes']>,
        ParentType,
        ContextType
    >;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type _Meta_Resolvers<
    ContextType = MeshContext,
    ParentType extends
        ResolversParentTypes['_Meta_'] = ResolversParentTypes['_Meta_'],
> = ResolversObject<{
    block?: Resolver<ResolversTypes['_Block_'], ParentType, ContextType>;
    deployment?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    hasIndexingErrors?: Resolver<
        ResolversTypes['Boolean'],
        ParentType,
        ContextType
    >;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type Resolvers<ContextType = MeshContext> = ResolversObject<{
    BigDecimal?: GraphQLScalarType;
    BigInt?: GraphQLScalarType;
    Bytes?: GraphQLScalarType;
    Int8?: GraphQLScalarType;
    LiquidityPosition?: LiquidityPositionResolvers<ContextType>;
    LpStakingPosition?: LpStakingPositionResolvers<ContextType>;
    Pair?: PairResolvers<ContextType>;
    PairReserve?: PairReserveResolvers<ContextType>;
    PairWhitelist?: PairWhitelistResolvers<ContextType>;
    Query?: QueryResolvers<ContextType>;
    Subscription?: SubscriptionResolvers<ContextType>;
    Timestamp?: GraphQLScalarType;
    Token?: TokenResolvers<ContextType>;
    TokenomicsParams?: TokenomicsParamsResolvers<ContextType>;
    User?: UserResolvers<ContextType>;
    VrswStakingPosition?: VrswStakingPositionResolvers<ContextType>;
    _Block_?: _Block_Resolvers<ContextType>;
    _Meta_?: _Meta_Resolvers<ContextType>;
}>;

export type DirectiveResolvers<ContextType = MeshContext> = ResolversObject<{
    entity?: entityDirectiveResolver<any, any, ContextType>;
    subgraphId?: subgraphIdDirectiveResolver<any, any, ContextType>;
    derivedFrom?: derivedFromDirectiveResolver<any, any, ContextType>;
}>;

export type MeshContext = GraphTestTypes.Context & BaseMeshContext;

const baseDir = pathModule.join(
    typeof __dirname === 'string' ? __dirname : '/',
    '..'
);

const importFn: ImportFn = <T>(moduleId: string) => {
    const relativeModuleId = (
        pathModule.isAbsolute(moduleId)
            ? pathModule.relative(baseDir, moduleId)
            : moduleId
    )
        .split('\\')
        .join('/')
        .replace(baseDir + '/', '');
    switch (relativeModuleId) {
        case '.graphclient/sources/graph-test/introspectionSchema':
            return Promise.resolve(importedModule$0) as T;

        default:
            return Promise.reject(
                new Error(`Cannot find module '${relativeModuleId}'.`)
            );
    }
};

const rootStore = new MeshStore(
    '.graphclient',
    new FsStoreStorageAdapter({
        cwd: baseDir,
        importFn,
        fileType: 'ts',
    }),
    {
        readonly: true,
        validate: false,
    }
);

export const rawServeConfig: YamlConfig.Config['serve'] = undefined as any;
export async function getMeshOptions(): Promise<GetMeshOptions> {
    const pubsub = new PubSub();
    const sourcesStore = rootStore.child('sources');
    const logger = new DefaultLogger('GraphClient');
    const cache = new (MeshCache as any)({
        ...({} as any),
        importFn,
        store: rootStore.child('cache'),
        pubsub,
        logger,
    } as any);

    const sources: MeshResolvedSource[] = [];
    const transforms: MeshTransform[] = [];
    const additionalEnvelopPlugins: MeshPlugin<any>[] = [];
    const graphTestTransforms = [];
    const additionalTypeDefs = [] as any[];
    const graphTestHandler = new GraphqlHandler({
        name: 'graph-test',
        config: {
            endpoint:
                'https://api.studio.thegraph.com/query/65471/graph-test/version/latest',
        },
        baseDir,
        cache,
        pubsub,
        store: sourcesStore.child('graph-test'),
        logger: logger.child('graph-test'),
        importFn,
    });
    sources[0] = {
        name: 'graph-test',
        handler: graphTestHandler,
        transforms: graphTestTransforms,
    };
    const additionalResolvers = [] as any[];
    const merger = new (BareMerger as any)({
        cache,
        pubsub,
        logger: logger.child('bareMerger'),
        store: rootStore.child('bareMerger'),
    });

    return {
        sources,
        transforms,
        additionalTypeDefs,
        additionalResolvers,
        cache,
        pubsub,
        merger,
        logger,
        additionalEnvelopPlugins,
        get documents() {
            return [
                {
                    document: MetadataDocument,
                    get rawSDL() {
                        return printWithCache(MetadataDocument);
                    },
                    location: 'MetadataDocument.graphql',
                },
                {
                    document: PairsDocument,
                    get rawSDL() {
                        return printWithCache(PairsDocument);
                    },
                    location: 'PairsDocument.graphql',
                },
            ];
        },
        fetchFn,
    };
}

export function createBuiltMeshHTTPHandler<
    TServerContext = {},
>(): MeshHTTPHandler<TServerContext> {
    return createMeshHTTPHandler<TServerContext>({
        baseDir,
        getBuiltMesh: getBuiltGraphClient,
        rawServeConfig: undefined,
    });
}

let meshInstance$: Promise<MeshInstance> | undefined;

export function getBuiltGraphClient(): Promise<MeshInstance> {
    if (meshInstance$ == null) {
        meshInstance$ = getMeshOptions()
            .then((meshOptions) => getMesh(meshOptions))
            .then((mesh) => {
                const id = mesh.pubsub.subscribe('destroy', () => {
                    meshInstance$ = undefined;
                    mesh.pubsub.unsubscribe(id);
                });
                return mesh;
            });
    }
    return meshInstance$;
}

export const execute: ExecuteMeshFn = (...args) =>
    getBuiltGraphClient().then(({ execute }) => execute(...args));

export const subscribe: SubscribeMeshFn = (...args) =>
    getBuiltGraphClient().then(({ subscribe }) => subscribe(...args));
export function getBuiltGraphSDK<TGlobalContext = any, TOperationContext = any>(
    globalContext?: TGlobalContext
) {
    const sdkRequester$ = getBuiltGraphClient().then(
        ({ sdkRequesterFactory }) => sdkRequesterFactory(globalContext)
    );
    return getSdk<TOperationContext, TGlobalContext>((...args) =>
        sdkRequester$.then((sdkRequester) => sdkRequester(...args))
    );
}
export type MetadataQueryVariables = Exact<{ [key: string]: never }>;

export type MetadataQuery = {
    _meta?: Maybe<{ block: Pick<_Block_, 'number' | 'timestamp'> }>;
};

export type PairsQueryVariables = Exact<{ [key: string]: never }>;

export type PairsQuery = {
    pairs: Array<
        Pick<
            Pair,
            | 'id'
            | 'balance0'
            | 'balance1'
            | 'fee'
            | 'vFee'
            | 'maxReserveRatio'
            | 'reserveRatio'
            | 'blocksDelay'
            | 'lastSwapBlock'
        > & {
            token0: Pick<Token, 'id' | 'decimals'>;
            token1: Pick<Token, 'id' | 'decimals'>;
            whitelist: Array<{ token: Pick<Token, 'id' | 'decimals'> }>;
            pairReserves: Array<
                Pick<PairReserve, 'balance' | 'baseValue'> & {
                    token: Pick<Token, 'id' | 'decimals'>;
                }
            >;
        }
    >;
};

export const MetadataDocument = gql`
    query Metadata {
        _meta {
            block {
                number
                timestamp
            }
        }
    }
` as unknown as DocumentNode<MetadataQuery, MetadataQueryVariables>;
export const PairsDocument = gql`
    query Pairs {
        pairs {
            id
            token0 {
                id
                decimals
            }
            token1 {
                id
                decimals
            }
            balance0
            balance1
            fee
            vFee
            maxReserveRatio
            reserveRatio
            blocksDelay
            lastSwapBlock
            whitelist {
                token {
                    id
                    decimals
                }
            }
            pairReserves {
                token {
                    id
                    decimals
                }
                balance
                baseValue
            }
        }
    }
` as unknown as DocumentNode<PairsQuery, PairsQueryVariables>;

export type Requester<C = {}, E = unknown> = <R, V>(
    doc: DocumentNode,
    vars?: V,
    options?: C
) => Promise<R> | AsyncIterable<R>;
export function getSdk<C, E>(requester: Requester<C, E>) {
    return {
        Metadata(
            variables?: MetadataQueryVariables,
            options?: C
        ): Promise<MetadataQuery> {
            return requester<MetadataQuery, MetadataQueryVariables>(
                MetadataDocument,
                variables,
                options
            ) as Promise<MetadataQuery>;
        },
        Pairs(
            variables?: PairsQueryVariables,
            options?: C
        ): Promise<PairsQuery> {
            return requester<PairsQuery, PairsQueryVariables>(
                PairsDocument,
                variables,
                options
            ) as Promise<PairsQuery>;
        },
    };
}
export type Sdk = ReturnType<typeof getSdk>;
