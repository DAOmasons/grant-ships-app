// @ts-nocheck

import { InContextSdkMethod } from '@graphql-mesh/types';
import { MeshContext } from '@graphql-mesh/runtime';

export namespace GrantShipsTypes {
  export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  _text: any;
  contract_type: any;
  entity_type: any;
  event_type: any;
  json: any;
  numeric: any;
  timestamp: any;
  timestamptz: any;
};

/** Boolean expression to compare columns of type "Boolean". All fields are combined with logical 'AND'. */
export type Boolean_comparison_exp = {
  _eq?: InputMaybe<Scalars['Boolean']>;
  _gt?: InputMaybe<Scalars['Boolean']>;
  _gte?: InputMaybe<Scalars['Boolean']>;
  _in?: InputMaybe<Array<Scalars['Boolean']>>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  _lt?: InputMaybe<Scalars['Boolean']>;
  _lte?: InputMaybe<Scalars['Boolean']>;
  _neq?: InputMaybe<Scalars['Boolean']>;
  _nin?: InputMaybe<Array<Scalars['Boolean']>>;
};

/** columns and relationships of "GMInitParams" */
export type GMInitParams = {
  db_write_timestamp?: Maybe<Scalars['timestamp']>;
  gameFacilitatorId?: Maybe<Scalars['numeric']>;
  gmRootAccount?: Maybe<Scalars['String']>;
  id: Scalars['String'];
};

/** Boolean expression to filter rows from the table "GMInitParams". All fields are combined with a logical 'AND'. */
export type GMInitParams_bool_exp = {
  _and?: InputMaybe<Array<GMInitParams_bool_exp>>;
  _not?: InputMaybe<GMInitParams_bool_exp>;
  _or?: InputMaybe<Array<GMInitParams_bool_exp>>;
  db_write_timestamp?: InputMaybe<timestamp_comparison_exp>;
  gameFacilitatorId?: InputMaybe<numeric_comparison_exp>;
  gmRootAccount?: InputMaybe<String_comparison_exp>;
  id?: InputMaybe<String_comparison_exp>;
};

/** Ordering options when selecting data from "GMInitParams". */
export type GMInitParams_order_by = {
  db_write_timestamp?: InputMaybe<order_by>;
  gameFacilitatorId?: InputMaybe<order_by>;
  gmRootAccount?: InputMaybe<order_by>;
  id?: InputMaybe<order_by>;
};

/** select columns of table "GMInitParams" */
export type GMInitParams_select_column =
  /** column name */
  | 'db_write_timestamp'
  /** column name */
  | 'gameFacilitatorId'
  /** column name */
  | 'gmRootAccount'
  /** column name */
  | 'id';

/** Streaming cursor of the table "GMInitParams" */
export type GMInitParams_stream_cursor_input = {
  /** Stream column input with initial value */
  initial_value: GMInitParams_stream_cursor_value_input;
  /** cursor ordering */
  ordering?: InputMaybe<cursor_ordering>;
};

/** Initial value of the column from where the streaming should start */
export type GMInitParams_stream_cursor_value_input = {
  db_write_timestamp?: InputMaybe<Scalars['timestamp']>;
  gameFacilitatorId?: InputMaybe<Scalars['numeric']>;
  gmRootAccount?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
};

/** columns and relationships of "GameManager" */
export type GameManager = {
  chainId: Scalars['Int'];
  createdAt: Scalars['Int'];
  /** An object relationship */
  currentRound?: Maybe<GameRound>;
  currentRoundNumber: Scalars['numeric'];
  currentRound_id?: Maybe<Scalars['String']>;
  db_write_timestamp?: Maybe<Scalars['timestamp']>;
  gameFacilitatorId?: Maybe<Scalars['numeric']>;
  /** An array relationship */
  gameRounds: Array<GameRound>;
  gmRootAccount?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  initData: Scalars['String'];
  poolFunds?: Maybe<Scalars['numeric']>;
  poolId: Scalars['numeric'];
  poolMetadataPointer: Scalars['String'];
  poolMetadataProtocol: Scalars['numeric'];
  profileId: Scalars['String'];
  profileMetadataPointer: Scalars['String'];
  profileMetadataProtocol: Scalars['numeric'];
  /** An object relationship */
  template?: Maybe<GameManagerTemplate>;
  template_id: Scalars['String'];
  tokenAddress: Scalars['String'];
};


/** columns and relationships of "GameManager" */
export type GameManagergameRoundsArgs = {
  distinct_on?: InputMaybe<Array<GameRound_select_column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<GameRound_order_by>>;
  where?: InputMaybe<GameRound_bool_exp>;
};

/** columns and relationships of "GameManagerFactory" */
export type GameManagerFactory = {
  chainId: Scalars['Int'];
  createdAt: Scalars['Int'];
  db_write_timestamp?: Maybe<Scalars['timestamp']>;
  id: Scalars['String'];
  rootAccount: Scalars['String'];
};

/** Boolean expression to filter rows from the table "GameManagerFactory". All fields are combined with a logical 'AND'. */
export type GameManagerFactory_bool_exp = {
  _and?: InputMaybe<Array<GameManagerFactory_bool_exp>>;
  _not?: InputMaybe<GameManagerFactory_bool_exp>;
  _or?: InputMaybe<Array<GameManagerFactory_bool_exp>>;
  chainId?: InputMaybe<Int_comparison_exp>;
  createdAt?: InputMaybe<Int_comparison_exp>;
  db_write_timestamp?: InputMaybe<timestamp_comparison_exp>;
  id?: InputMaybe<String_comparison_exp>;
  rootAccount?: InputMaybe<String_comparison_exp>;
};

/** Ordering options when selecting data from "GameManagerFactory". */
export type GameManagerFactory_order_by = {
  chainId?: InputMaybe<order_by>;
  createdAt?: InputMaybe<order_by>;
  db_write_timestamp?: InputMaybe<order_by>;
  id?: InputMaybe<order_by>;
  rootAccount?: InputMaybe<order_by>;
};

/** select columns of table "GameManagerFactory" */
export type GameManagerFactory_select_column =
  /** column name */
  | 'chainId'
  /** column name */
  | 'createdAt'
  /** column name */
  | 'db_write_timestamp'
  /** column name */
  | 'id'
  /** column name */
  | 'rootAccount';

/** Streaming cursor of the table "GameManagerFactory" */
export type GameManagerFactory_stream_cursor_input = {
  /** Stream column input with initial value */
  initial_value: GameManagerFactory_stream_cursor_value_input;
  /** cursor ordering */
  ordering?: InputMaybe<cursor_ordering>;
};

/** Initial value of the column from where the streaming should start */
export type GameManagerFactory_stream_cursor_value_input = {
  chainId?: InputMaybe<Scalars['Int']>;
  createdAt?: InputMaybe<Scalars['Int']>;
  db_write_timestamp?: InputMaybe<Scalars['timestamp']>;
  id?: InputMaybe<Scalars['String']>;
  rootAccount?: InputMaybe<Scalars['String']>;
};

/** columns and relationships of "GameManagerTemplate" */
export type GameManagerTemplate = {
  address: Scalars['String'];
  chainId: Scalars['Int'];
  createdAt: Scalars['Int'];
  db_write_timestamp?: Maybe<Scalars['timestamp']>;
  id: Scalars['String'];
  name: Scalars['String'];
};

/** Boolean expression to filter rows from the table "GameManagerTemplate". All fields are combined with a logical 'AND'. */
export type GameManagerTemplate_bool_exp = {
  _and?: InputMaybe<Array<GameManagerTemplate_bool_exp>>;
  _not?: InputMaybe<GameManagerTemplate_bool_exp>;
  _or?: InputMaybe<Array<GameManagerTemplate_bool_exp>>;
  address?: InputMaybe<String_comparison_exp>;
  chainId?: InputMaybe<Int_comparison_exp>;
  createdAt?: InputMaybe<Int_comparison_exp>;
  db_write_timestamp?: InputMaybe<timestamp_comparison_exp>;
  id?: InputMaybe<String_comparison_exp>;
  name?: InputMaybe<String_comparison_exp>;
};

/** Ordering options when selecting data from "GameManagerTemplate". */
export type GameManagerTemplate_order_by = {
  address?: InputMaybe<order_by>;
  chainId?: InputMaybe<order_by>;
  createdAt?: InputMaybe<order_by>;
  db_write_timestamp?: InputMaybe<order_by>;
  id?: InputMaybe<order_by>;
  name?: InputMaybe<order_by>;
};

/** select columns of table "GameManagerTemplate" */
export type GameManagerTemplate_select_column =
  /** column name */
  | 'address'
  /** column name */
  | 'chainId'
  /** column name */
  | 'createdAt'
  /** column name */
  | 'db_write_timestamp'
  /** column name */
  | 'id'
  /** column name */
  | 'name';

/** Streaming cursor of the table "GameManagerTemplate" */
export type GameManagerTemplate_stream_cursor_input = {
  /** Stream column input with initial value */
  initial_value: GameManagerTemplate_stream_cursor_value_input;
  /** cursor ordering */
  ordering?: InputMaybe<cursor_ordering>;
};

/** Initial value of the column from where the streaming should start */
export type GameManagerTemplate_stream_cursor_value_input = {
  address?: InputMaybe<Scalars['String']>;
  chainId?: InputMaybe<Scalars['Int']>;
  createdAt?: InputMaybe<Scalars['Int']>;
  db_write_timestamp?: InputMaybe<Scalars['timestamp']>;
  id?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
};

/** Boolean expression to filter rows from the table "GameManager". All fields are combined with a logical 'AND'. */
export type GameManager_bool_exp = {
  _and?: InputMaybe<Array<GameManager_bool_exp>>;
  _not?: InputMaybe<GameManager_bool_exp>;
  _or?: InputMaybe<Array<GameManager_bool_exp>>;
  chainId?: InputMaybe<Int_comparison_exp>;
  createdAt?: InputMaybe<Int_comparison_exp>;
  currentRound?: InputMaybe<GameRound_bool_exp>;
  currentRoundNumber?: InputMaybe<numeric_comparison_exp>;
  currentRound_id?: InputMaybe<String_comparison_exp>;
  db_write_timestamp?: InputMaybe<timestamp_comparison_exp>;
  gameFacilitatorId?: InputMaybe<numeric_comparison_exp>;
  gameRounds?: InputMaybe<GameRound_bool_exp>;
  gmRootAccount?: InputMaybe<String_comparison_exp>;
  id?: InputMaybe<String_comparison_exp>;
  initData?: InputMaybe<String_comparison_exp>;
  poolFunds?: InputMaybe<numeric_comparison_exp>;
  poolId?: InputMaybe<numeric_comparison_exp>;
  poolMetadataPointer?: InputMaybe<String_comparison_exp>;
  poolMetadataProtocol?: InputMaybe<numeric_comparison_exp>;
  profileId?: InputMaybe<String_comparison_exp>;
  profileMetadataPointer?: InputMaybe<String_comparison_exp>;
  profileMetadataProtocol?: InputMaybe<numeric_comparison_exp>;
  template?: InputMaybe<GameManagerTemplate_bool_exp>;
  template_id?: InputMaybe<String_comparison_exp>;
  tokenAddress?: InputMaybe<String_comparison_exp>;
};

/** Ordering options when selecting data from "GameManager". */
export type GameManager_order_by = {
  chainId?: InputMaybe<order_by>;
  createdAt?: InputMaybe<order_by>;
  currentRound?: InputMaybe<GameRound_order_by>;
  currentRoundNumber?: InputMaybe<order_by>;
  currentRound_id?: InputMaybe<order_by>;
  db_write_timestamp?: InputMaybe<order_by>;
  gameFacilitatorId?: InputMaybe<order_by>;
  gameRounds_aggregate?: InputMaybe<GameRound_aggregate_order_by>;
  gmRootAccount?: InputMaybe<order_by>;
  id?: InputMaybe<order_by>;
  initData?: InputMaybe<order_by>;
  poolFunds?: InputMaybe<order_by>;
  poolId?: InputMaybe<order_by>;
  poolMetadataPointer?: InputMaybe<order_by>;
  poolMetadataProtocol?: InputMaybe<order_by>;
  profileId?: InputMaybe<order_by>;
  profileMetadataPointer?: InputMaybe<order_by>;
  profileMetadataProtocol?: InputMaybe<order_by>;
  template?: InputMaybe<GameManagerTemplate_order_by>;
  template_id?: InputMaybe<order_by>;
  tokenAddress?: InputMaybe<order_by>;
};

/** select columns of table "GameManager" */
export type GameManager_select_column =
  /** column name */
  | 'chainId'
  /** column name */
  | 'createdAt'
  /** column name */
  | 'currentRoundNumber'
  /** column name */
  | 'currentRound_id'
  /** column name */
  | 'db_write_timestamp'
  /** column name */
  | 'gameFacilitatorId'
  /** column name */
  | 'gmRootAccount'
  /** column name */
  | 'id'
  /** column name */
  | 'initData'
  /** column name */
  | 'poolFunds'
  /** column name */
  | 'poolId'
  /** column name */
  | 'poolMetadataPointer'
  /** column name */
  | 'poolMetadataProtocol'
  /** column name */
  | 'profileId'
  /** column name */
  | 'profileMetadataPointer'
  /** column name */
  | 'profileMetadataProtocol'
  /** column name */
  | 'template_id'
  /** column name */
  | 'tokenAddress';

/** Streaming cursor of the table "GameManager" */
export type GameManager_stream_cursor_input = {
  /** Stream column input with initial value */
  initial_value: GameManager_stream_cursor_value_input;
  /** cursor ordering */
  ordering?: InputMaybe<cursor_ordering>;
};

/** Initial value of the column from where the streaming should start */
export type GameManager_stream_cursor_value_input = {
  chainId?: InputMaybe<Scalars['Int']>;
  createdAt?: InputMaybe<Scalars['Int']>;
  currentRoundNumber?: InputMaybe<Scalars['numeric']>;
  currentRound_id?: InputMaybe<Scalars['String']>;
  db_write_timestamp?: InputMaybe<Scalars['timestamp']>;
  gameFacilitatorId?: InputMaybe<Scalars['numeric']>;
  gmRootAccount?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
  initData?: InputMaybe<Scalars['String']>;
  poolFunds?: InputMaybe<Scalars['numeric']>;
  poolId?: InputMaybe<Scalars['numeric']>;
  poolMetadataPointer?: InputMaybe<Scalars['String']>;
  poolMetadataProtocol?: InputMaybe<Scalars['numeric']>;
  profileId?: InputMaybe<Scalars['String']>;
  profileMetadataPointer?: InputMaybe<Scalars['String']>;
  profileMetadataProtocol?: InputMaybe<Scalars['numeric']>;
  template_id?: InputMaybe<Scalars['String']>;
  tokenAddress?: InputMaybe<Scalars['String']>;
};

/** columns and relationships of "GameRound" */
export type GameRound = {
  db_write_timestamp?: Maybe<Scalars['timestamp']>;
  endTime: Scalars['numeric'];
  /** An object relationship */
  gameManager?: Maybe<GameManager>;
  gameManager_id: Scalars['String'];
  gameStatus: Scalars['Int'];
  id: Scalars['String'];
  isGameActive: Scalars['Boolean'];
  realEndTime?: Maybe<Scalars['Int']>;
  realStartTime?: Maybe<Scalars['Int']>;
  /** An array relationship */
  ships: Array<GrantShip>;
  startTime: Scalars['numeric'];
  totalAllocatedAmount: Scalars['numeric'];
  totalDistributedAmount: Scalars['numeric'];
  totalRoundAmount: Scalars['numeric'];
};


/** columns and relationships of "GameRound" */
export type GameRoundshipsArgs = {
  distinct_on?: InputMaybe<Array<GrantShip_select_column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<GrantShip_order_by>>;
  where?: InputMaybe<GrantShip_bool_exp>;
};

/** order by aggregate values of table "GameRound" */
export type GameRound_aggregate_order_by = {
  avg?: InputMaybe<GameRound_avg_order_by>;
  count?: InputMaybe<order_by>;
  max?: InputMaybe<GameRound_max_order_by>;
  min?: InputMaybe<GameRound_min_order_by>;
  stddev?: InputMaybe<GameRound_stddev_order_by>;
  stddev_pop?: InputMaybe<GameRound_stddev_pop_order_by>;
  stddev_samp?: InputMaybe<GameRound_stddev_samp_order_by>;
  sum?: InputMaybe<GameRound_sum_order_by>;
  var_pop?: InputMaybe<GameRound_var_pop_order_by>;
  var_samp?: InputMaybe<GameRound_var_samp_order_by>;
  variance?: InputMaybe<GameRound_variance_order_by>;
};

/** order by avg() on columns of table "GameRound" */
export type GameRound_avg_order_by = {
  endTime?: InputMaybe<order_by>;
  gameStatus?: InputMaybe<order_by>;
  realEndTime?: InputMaybe<order_by>;
  realStartTime?: InputMaybe<order_by>;
  startTime?: InputMaybe<order_by>;
  totalAllocatedAmount?: InputMaybe<order_by>;
  totalDistributedAmount?: InputMaybe<order_by>;
  totalRoundAmount?: InputMaybe<order_by>;
};

/** Boolean expression to filter rows from the table "GameRound". All fields are combined with a logical 'AND'. */
export type GameRound_bool_exp = {
  _and?: InputMaybe<Array<GameRound_bool_exp>>;
  _not?: InputMaybe<GameRound_bool_exp>;
  _or?: InputMaybe<Array<GameRound_bool_exp>>;
  db_write_timestamp?: InputMaybe<timestamp_comparison_exp>;
  endTime?: InputMaybe<numeric_comparison_exp>;
  gameManager?: InputMaybe<GameManager_bool_exp>;
  gameManager_id?: InputMaybe<String_comparison_exp>;
  gameStatus?: InputMaybe<Int_comparison_exp>;
  id?: InputMaybe<String_comparison_exp>;
  isGameActive?: InputMaybe<Boolean_comparison_exp>;
  realEndTime?: InputMaybe<Int_comparison_exp>;
  realStartTime?: InputMaybe<Int_comparison_exp>;
  ships?: InputMaybe<GrantShip_bool_exp>;
  startTime?: InputMaybe<numeric_comparison_exp>;
  totalAllocatedAmount?: InputMaybe<numeric_comparison_exp>;
  totalDistributedAmount?: InputMaybe<numeric_comparison_exp>;
  totalRoundAmount?: InputMaybe<numeric_comparison_exp>;
};

/** order by max() on columns of table "GameRound" */
export type GameRound_max_order_by = {
  db_write_timestamp?: InputMaybe<order_by>;
  endTime?: InputMaybe<order_by>;
  gameManager_id?: InputMaybe<order_by>;
  gameStatus?: InputMaybe<order_by>;
  id?: InputMaybe<order_by>;
  realEndTime?: InputMaybe<order_by>;
  realStartTime?: InputMaybe<order_by>;
  startTime?: InputMaybe<order_by>;
  totalAllocatedAmount?: InputMaybe<order_by>;
  totalDistributedAmount?: InputMaybe<order_by>;
  totalRoundAmount?: InputMaybe<order_by>;
};

/** order by min() on columns of table "GameRound" */
export type GameRound_min_order_by = {
  db_write_timestamp?: InputMaybe<order_by>;
  endTime?: InputMaybe<order_by>;
  gameManager_id?: InputMaybe<order_by>;
  gameStatus?: InputMaybe<order_by>;
  id?: InputMaybe<order_by>;
  realEndTime?: InputMaybe<order_by>;
  realStartTime?: InputMaybe<order_by>;
  startTime?: InputMaybe<order_by>;
  totalAllocatedAmount?: InputMaybe<order_by>;
  totalDistributedAmount?: InputMaybe<order_by>;
  totalRoundAmount?: InputMaybe<order_by>;
};

/** Ordering options when selecting data from "GameRound". */
export type GameRound_order_by = {
  db_write_timestamp?: InputMaybe<order_by>;
  endTime?: InputMaybe<order_by>;
  gameManager?: InputMaybe<GameManager_order_by>;
  gameManager_id?: InputMaybe<order_by>;
  gameStatus?: InputMaybe<order_by>;
  id?: InputMaybe<order_by>;
  isGameActive?: InputMaybe<order_by>;
  realEndTime?: InputMaybe<order_by>;
  realStartTime?: InputMaybe<order_by>;
  ships_aggregate?: InputMaybe<GrantShip_aggregate_order_by>;
  startTime?: InputMaybe<order_by>;
  totalAllocatedAmount?: InputMaybe<order_by>;
  totalDistributedAmount?: InputMaybe<order_by>;
  totalRoundAmount?: InputMaybe<order_by>;
};

/** select columns of table "GameRound" */
export type GameRound_select_column =
  /** column name */
  | 'db_write_timestamp'
  /** column name */
  | 'endTime'
  /** column name */
  | 'gameManager_id'
  /** column name */
  | 'gameStatus'
  /** column name */
  | 'id'
  /** column name */
  | 'isGameActive'
  /** column name */
  | 'realEndTime'
  /** column name */
  | 'realStartTime'
  /** column name */
  | 'startTime'
  /** column name */
  | 'totalAllocatedAmount'
  /** column name */
  | 'totalDistributedAmount'
  /** column name */
  | 'totalRoundAmount';

/** order by stddev() on columns of table "GameRound" */
export type GameRound_stddev_order_by = {
  endTime?: InputMaybe<order_by>;
  gameStatus?: InputMaybe<order_by>;
  realEndTime?: InputMaybe<order_by>;
  realStartTime?: InputMaybe<order_by>;
  startTime?: InputMaybe<order_by>;
  totalAllocatedAmount?: InputMaybe<order_by>;
  totalDistributedAmount?: InputMaybe<order_by>;
  totalRoundAmount?: InputMaybe<order_by>;
};

/** order by stddev_pop() on columns of table "GameRound" */
export type GameRound_stddev_pop_order_by = {
  endTime?: InputMaybe<order_by>;
  gameStatus?: InputMaybe<order_by>;
  realEndTime?: InputMaybe<order_by>;
  realStartTime?: InputMaybe<order_by>;
  startTime?: InputMaybe<order_by>;
  totalAllocatedAmount?: InputMaybe<order_by>;
  totalDistributedAmount?: InputMaybe<order_by>;
  totalRoundAmount?: InputMaybe<order_by>;
};

/** order by stddev_samp() on columns of table "GameRound" */
export type GameRound_stddev_samp_order_by = {
  endTime?: InputMaybe<order_by>;
  gameStatus?: InputMaybe<order_by>;
  realEndTime?: InputMaybe<order_by>;
  realStartTime?: InputMaybe<order_by>;
  startTime?: InputMaybe<order_by>;
  totalAllocatedAmount?: InputMaybe<order_by>;
  totalDistributedAmount?: InputMaybe<order_by>;
  totalRoundAmount?: InputMaybe<order_by>;
};

/** Streaming cursor of the table "GameRound" */
export type GameRound_stream_cursor_input = {
  /** Stream column input with initial value */
  initial_value: GameRound_stream_cursor_value_input;
  /** cursor ordering */
  ordering?: InputMaybe<cursor_ordering>;
};

/** Initial value of the column from where the streaming should start */
export type GameRound_stream_cursor_value_input = {
  db_write_timestamp?: InputMaybe<Scalars['timestamp']>;
  endTime?: InputMaybe<Scalars['numeric']>;
  gameManager_id?: InputMaybe<Scalars['String']>;
  gameStatus?: InputMaybe<Scalars['Int']>;
  id?: InputMaybe<Scalars['String']>;
  isGameActive?: InputMaybe<Scalars['Boolean']>;
  realEndTime?: InputMaybe<Scalars['Int']>;
  realStartTime?: InputMaybe<Scalars['Int']>;
  startTime?: InputMaybe<Scalars['numeric']>;
  totalAllocatedAmount?: InputMaybe<Scalars['numeric']>;
  totalDistributedAmount?: InputMaybe<Scalars['numeric']>;
  totalRoundAmount?: InputMaybe<Scalars['numeric']>;
};

/** order by sum() on columns of table "GameRound" */
export type GameRound_sum_order_by = {
  endTime?: InputMaybe<order_by>;
  gameStatus?: InputMaybe<order_by>;
  realEndTime?: InputMaybe<order_by>;
  realStartTime?: InputMaybe<order_by>;
  startTime?: InputMaybe<order_by>;
  totalAllocatedAmount?: InputMaybe<order_by>;
  totalDistributedAmount?: InputMaybe<order_by>;
  totalRoundAmount?: InputMaybe<order_by>;
};

/** order by var_pop() on columns of table "GameRound" */
export type GameRound_var_pop_order_by = {
  endTime?: InputMaybe<order_by>;
  gameStatus?: InputMaybe<order_by>;
  realEndTime?: InputMaybe<order_by>;
  realStartTime?: InputMaybe<order_by>;
  startTime?: InputMaybe<order_by>;
  totalAllocatedAmount?: InputMaybe<order_by>;
  totalDistributedAmount?: InputMaybe<order_by>;
  totalRoundAmount?: InputMaybe<order_by>;
};

/** order by var_samp() on columns of table "GameRound" */
export type GameRound_var_samp_order_by = {
  endTime?: InputMaybe<order_by>;
  gameStatus?: InputMaybe<order_by>;
  realEndTime?: InputMaybe<order_by>;
  realStartTime?: InputMaybe<order_by>;
  startTime?: InputMaybe<order_by>;
  totalAllocatedAmount?: InputMaybe<order_by>;
  totalDistributedAmount?: InputMaybe<order_by>;
  totalRoundAmount?: InputMaybe<order_by>;
};

/** order by variance() on columns of table "GameRound" */
export type GameRound_variance_order_by = {
  endTime?: InputMaybe<order_by>;
  gameStatus?: InputMaybe<order_by>;
  realEndTime?: InputMaybe<order_by>;
  realStartTime?: InputMaybe<order_by>;
  startTime?: InputMaybe<order_by>;
  totalAllocatedAmount?: InputMaybe<order_by>;
  totalDistributedAmount?: InputMaybe<order_by>;
  totalRoundAmount?: InputMaybe<order_by>;
};

/** columns and relationships of "Grant" */
export type Grant = {
  db_write_timestamp?: Maybe<Scalars['timestamp']>;
  id: Scalars['String'];
  /** An object relationship */
  project?: Maybe<Project>;
  project_id: Scalars['String'];
  /** An object relationship */
  ship?: Maybe<GrantShip>;
  ship_id: Scalars['String'];
};

/** columns and relationships of "GrantShip" */
export type GrantShip = {
  anchor: Scalars['String'];
  /** An object relationship */
  applicationReviewReason?: Maybe<RawMetadata>;
  applicationReviewReason_id?: Maybe<Scalars['String']>;
  applicationSubmittedTime?: Maybe<Scalars['Int']>;
  approvedTime?: Maybe<Scalars['Int']>;
  balance: Scalars['numeric'];
  chainId: Scalars['Int'];
  db_write_timestamp?: Maybe<Scalars['timestamp']>;
  /** An object relationship */
  gameManager?: Maybe<GameManager>;
  gameManager_id?: Maybe<Scalars['String']>;
  /** An object relationship */
  gameRound?: Maybe<GameRound>;
  gameRound_id?: Maybe<Scalars['String']>;
  /** An array relationship */
  grants: Array<Grant>;
  hasEditedProfile: Scalars['Boolean'];
  hasSubmittedApplication?: Maybe<Scalars['Boolean']>;
  hatId?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  isAllocated?: Maybe<Scalars['Boolean']>;
  isApproved?: Maybe<Scalars['Boolean']>;
  isAwaitingApproval?: Maybe<Scalars['Boolean']>;
  isDistributed?: Maybe<Scalars['Boolean']>;
  isRejected?: Maybe<Scalars['Boolean']>;
  name: Scalars['String'];
  nonce: Scalars['numeric'];
  owner: Scalars['String'];
  pastNames: Scalars['_text'];
  pastProfileIds: Scalars['_text'];
  poolActive?: Maybe<Scalars['Boolean']>;
  poolFunded: Scalars['Boolean'];
  poolId?: Maybe<Scalars['numeric']>;
  profileId: Scalars['String'];
  /** An object relationship */
  profileMetadata?: Maybe<RawMetadata>;
  profileMetadata_id: Scalars['String'];
  rejectedTime?: Maybe<Scalars['Int']>;
  shipAllocation: Scalars['numeric'];
  shipApplicationBytesData?: Maybe<Scalars['String']>;
  shipContractAddress?: Maybe<Scalars['String']>;
  shipLaunched?: Maybe<Scalars['Boolean']>;
  status: Scalars['Int'];
  totalAllocated: Scalars['numeric'];
  totalAvailableFunds: Scalars['numeric'];
  totalDistributed: Scalars['numeric'];
  totalRoundAmount: Scalars['numeric'];
};


/** columns and relationships of "GrantShip" */
export type GrantShipgrantsArgs = {
  distinct_on?: InputMaybe<Array<Grant_select_column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Grant_order_by>>;
  where?: InputMaybe<Grant_bool_exp>;
};

/** order by aggregate values of table "GrantShip" */
export type GrantShip_aggregate_order_by = {
  avg?: InputMaybe<GrantShip_avg_order_by>;
  count?: InputMaybe<order_by>;
  max?: InputMaybe<GrantShip_max_order_by>;
  min?: InputMaybe<GrantShip_min_order_by>;
  stddev?: InputMaybe<GrantShip_stddev_order_by>;
  stddev_pop?: InputMaybe<GrantShip_stddev_pop_order_by>;
  stddev_samp?: InputMaybe<GrantShip_stddev_samp_order_by>;
  sum?: InputMaybe<GrantShip_sum_order_by>;
  var_pop?: InputMaybe<GrantShip_var_pop_order_by>;
  var_samp?: InputMaybe<GrantShip_var_samp_order_by>;
  variance?: InputMaybe<GrantShip_variance_order_by>;
};

/** order by avg() on columns of table "GrantShip" */
export type GrantShip_avg_order_by = {
  applicationSubmittedTime?: InputMaybe<order_by>;
  approvedTime?: InputMaybe<order_by>;
  balance?: InputMaybe<order_by>;
  chainId?: InputMaybe<order_by>;
  nonce?: InputMaybe<order_by>;
  poolId?: InputMaybe<order_by>;
  rejectedTime?: InputMaybe<order_by>;
  shipAllocation?: InputMaybe<order_by>;
  status?: InputMaybe<order_by>;
  totalAllocated?: InputMaybe<order_by>;
  totalAvailableFunds?: InputMaybe<order_by>;
  totalDistributed?: InputMaybe<order_by>;
  totalRoundAmount?: InputMaybe<order_by>;
};

/** Boolean expression to filter rows from the table "GrantShip". All fields are combined with a logical 'AND'. */
export type GrantShip_bool_exp = {
  _and?: InputMaybe<Array<GrantShip_bool_exp>>;
  _not?: InputMaybe<GrantShip_bool_exp>;
  _or?: InputMaybe<Array<GrantShip_bool_exp>>;
  anchor?: InputMaybe<String_comparison_exp>;
  applicationReviewReason?: InputMaybe<RawMetadata_bool_exp>;
  applicationReviewReason_id?: InputMaybe<String_comparison_exp>;
  applicationSubmittedTime?: InputMaybe<Int_comparison_exp>;
  approvedTime?: InputMaybe<Int_comparison_exp>;
  balance?: InputMaybe<numeric_comparison_exp>;
  chainId?: InputMaybe<Int_comparison_exp>;
  db_write_timestamp?: InputMaybe<timestamp_comparison_exp>;
  gameManager?: InputMaybe<GameManager_bool_exp>;
  gameManager_id?: InputMaybe<String_comparison_exp>;
  gameRound?: InputMaybe<GameRound_bool_exp>;
  gameRound_id?: InputMaybe<String_comparison_exp>;
  grants?: InputMaybe<Grant_bool_exp>;
  hasEditedProfile?: InputMaybe<Boolean_comparison_exp>;
  hasSubmittedApplication?: InputMaybe<Boolean_comparison_exp>;
  hatId?: InputMaybe<String_comparison_exp>;
  id?: InputMaybe<String_comparison_exp>;
  isAllocated?: InputMaybe<Boolean_comparison_exp>;
  isApproved?: InputMaybe<Boolean_comparison_exp>;
  isAwaitingApproval?: InputMaybe<Boolean_comparison_exp>;
  isDistributed?: InputMaybe<Boolean_comparison_exp>;
  isRejected?: InputMaybe<Boolean_comparison_exp>;
  name?: InputMaybe<String_comparison_exp>;
  nonce?: InputMaybe<numeric_comparison_exp>;
  owner?: InputMaybe<String_comparison_exp>;
  pastNames?: InputMaybe<_text_comparison_exp>;
  pastProfileIds?: InputMaybe<_text_comparison_exp>;
  poolActive?: InputMaybe<Boolean_comparison_exp>;
  poolFunded?: InputMaybe<Boolean_comparison_exp>;
  poolId?: InputMaybe<numeric_comparison_exp>;
  profileId?: InputMaybe<String_comparison_exp>;
  profileMetadata?: InputMaybe<RawMetadata_bool_exp>;
  profileMetadata_id?: InputMaybe<String_comparison_exp>;
  rejectedTime?: InputMaybe<Int_comparison_exp>;
  shipAllocation?: InputMaybe<numeric_comparison_exp>;
  shipApplicationBytesData?: InputMaybe<String_comparison_exp>;
  shipContractAddress?: InputMaybe<String_comparison_exp>;
  shipLaunched?: InputMaybe<Boolean_comparison_exp>;
  status?: InputMaybe<Int_comparison_exp>;
  totalAllocated?: InputMaybe<numeric_comparison_exp>;
  totalAvailableFunds?: InputMaybe<numeric_comparison_exp>;
  totalDistributed?: InputMaybe<numeric_comparison_exp>;
  totalRoundAmount?: InputMaybe<numeric_comparison_exp>;
};

/** order by max() on columns of table "GrantShip" */
export type GrantShip_max_order_by = {
  anchor?: InputMaybe<order_by>;
  applicationReviewReason_id?: InputMaybe<order_by>;
  applicationSubmittedTime?: InputMaybe<order_by>;
  approvedTime?: InputMaybe<order_by>;
  balance?: InputMaybe<order_by>;
  chainId?: InputMaybe<order_by>;
  db_write_timestamp?: InputMaybe<order_by>;
  gameManager_id?: InputMaybe<order_by>;
  gameRound_id?: InputMaybe<order_by>;
  hatId?: InputMaybe<order_by>;
  id?: InputMaybe<order_by>;
  name?: InputMaybe<order_by>;
  nonce?: InputMaybe<order_by>;
  owner?: InputMaybe<order_by>;
  poolId?: InputMaybe<order_by>;
  profileId?: InputMaybe<order_by>;
  profileMetadata_id?: InputMaybe<order_by>;
  rejectedTime?: InputMaybe<order_by>;
  shipAllocation?: InputMaybe<order_by>;
  shipApplicationBytesData?: InputMaybe<order_by>;
  shipContractAddress?: InputMaybe<order_by>;
  status?: InputMaybe<order_by>;
  totalAllocated?: InputMaybe<order_by>;
  totalAvailableFunds?: InputMaybe<order_by>;
  totalDistributed?: InputMaybe<order_by>;
  totalRoundAmount?: InputMaybe<order_by>;
};

/** order by min() on columns of table "GrantShip" */
export type GrantShip_min_order_by = {
  anchor?: InputMaybe<order_by>;
  applicationReviewReason_id?: InputMaybe<order_by>;
  applicationSubmittedTime?: InputMaybe<order_by>;
  approvedTime?: InputMaybe<order_by>;
  balance?: InputMaybe<order_by>;
  chainId?: InputMaybe<order_by>;
  db_write_timestamp?: InputMaybe<order_by>;
  gameManager_id?: InputMaybe<order_by>;
  gameRound_id?: InputMaybe<order_by>;
  hatId?: InputMaybe<order_by>;
  id?: InputMaybe<order_by>;
  name?: InputMaybe<order_by>;
  nonce?: InputMaybe<order_by>;
  owner?: InputMaybe<order_by>;
  poolId?: InputMaybe<order_by>;
  profileId?: InputMaybe<order_by>;
  profileMetadata_id?: InputMaybe<order_by>;
  rejectedTime?: InputMaybe<order_by>;
  shipAllocation?: InputMaybe<order_by>;
  shipApplicationBytesData?: InputMaybe<order_by>;
  shipContractAddress?: InputMaybe<order_by>;
  status?: InputMaybe<order_by>;
  totalAllocated?: InputMaybe<order_by>;
  totalAvailableFunds?: InputMaybe<order_by>;
  totalDistributed?: InputMaybe<order_by>;
  totalRoundAmount?: InputMaybe<order_by>;
};

/** Ordering options when selecting data from "GrantShip". */
export type GrantShip_order_by = {
  anchor?: InputMaybe<order_by>;
  applicationReviewReason?: InputMaybe<RawMetadata_order_by>;
  applicationReviewReason_id?: InputMaybe<order_by>;
  applicationSubmittedTime?: InputMaybe<order_by>;
  approvedTime?: InputMaybe<order_by>;
  balance?: InputMaybe<order_by>;
  chainId?: InputMaybe<order_by>;
  db_write_timestamp?: InputMaybe<order_by>;
  gameManager?: InputMaybe<GameManager_order_by>;
  gameManager_id?: InputMaybe<order_by>;
  gameRound?: InputMaybe<GameRound_order_by>;
  gameRound_id?: InputMaybe<order_by>;
  grants_aggregate?: InputMaybe<Grant_aggregate_order_by>;
  hasEditedProfile?: InputMaybe<order_by>;
  hasSubmittedApplication?: InputMaybe<order_by>;
  hatId?: InputMaybe<order_by>;
  id?: InputMaybe<order_by>;
  isAllocated?: InputMaybe<order_by>;
  isApproved?: InputMaybe<order_by>;
  isAwaitingApproval?: InputMaybe<order_by>;
  isDistributed?: InputMaybe<order_by>;
  isRejected?: InputMaybe<order_by>;
  name?: InputMaybe<order_by>;
  nonce?: InputMaybe<order_by>;
  owner?: InputMaybe<order_by>;
  pastNames?: InputMaybe<order_by>;
  pastProfileIds?: InputMaybe<order_by>;
  poolActive?: InputMaybe<order_by>;
  poolFunded?: InputMaybe<order_by>;
  poolId?: InputMaybe<order_by>;
  profileId?: InputMaybe<order_by>;
  profileMetadata?: InputMaybe<RawMetadata_order_by>;
  profileMetadata_id?: InputMaybe<order_by>;
  rejectedTime?: InputMaybe<order_by>;
  shipAllocation?: InputMaybe<order_by>;
  shipApplicationBytesData?: InputMaybe<order_by>;
  shipContractAddress?: InputMaybe<order_by>;
  shipLaunched?: InputMaybe<order_by>;
  status?: InputMaybe<order_by>;
  totalAllocated?: InputMaybe<order_by>;
  totalAvailableFunds?: InputMaybe<order_by>;
  totalDistributed?: InputMaybe<order_by>;
  totalRoundAmount?: InputMaybe<order_by>;
};

/** select columns of table "GrantShip" */
export type GrantShip_select_column =
  /** column name */
  | 'anchor'
  /** column name */
  | 'applicationReviewReason_id'
  /** column name */
  | 'applicationSubmittedTime'
  /** column name */
  | 'approvedTime'
  /** column name */
  | 'balance'
  /** column name */
  | 'chainId'
  /** column name */
  | 'db_write_timestamp'
  /** column name */
  | 'gameManager_id'
  /** column name */
  | 'gameRound_id'
  /** column name */
  | 'hasEditedProfile'
  /** column name */
  | 'hasSubmittedApplication'
  /** column name */
  | 'hatId'
  /** column name */
  | 'id'
  /** column name */
  | 'isAllocated'
  /** column name */
  | 'isApproved'
  /** column name */
  | 'isAwaitingApproval'
  /** column name */
  | 'isDistributed'
  /** column name */
  | 'isRejected'
  /** column name */
  | 'name'
  /** column name */
  | 'nonce'
  /** column name */
  | 'owner'
  /** column name */
  | 'pastNames'
  /** column name */
  | 'pastProfileIds'
  /** column name */
  | 'poolActive'
  /** column name */
  | 'poolFunded'
  /** column name */
  | 'poolId'
  /** column name */
  | 'profileId'
  /** column name */
  | 'profileMetadata_id'
  /** column name */
  | 'rejectedTime'
  /** column name */
  | 'shipAllocation'
  /** column name */
  | 'shipApplicationBytesData'
  /** column name */
  | 'shipContractAddress'
  /** column name */
  | 'shipLaunched'
  /** column name */
  | 'status'
  /** column name */
  | 'totalAllocated'
  /** column name */
  | 'totalAvailableFunds'
  /** column name */
  | 'totalDistributed'
  /** column name */
  | 'totalRoundAmount';

/** order by stddev() on columns of table "GrantShip" */
export type GrantShip_stddev_order_by = {
  applicationSubmittedTime?: InputMaybe<order_by>;
  approvedTime?: InputMaybe<order_by>;
  balance?: InputMaybe<order_by>;
  chainId?: InputMaybe<order_by>;
  nonce?: InputMaybe<order_by>;
  poolId?: InputMaybe<order_by>;
  rejectedTime?: InputMaybe<order_by>;
  shipAllocation?: InputMaybe<order_by>;
  status?: InputMaybe<order_by>;
  totalAllocated?: InputMaybe<order_by>;
  totalAvailableFunds?: InputMaybe<order_by>;
  totalDistributed?: InputMaybe<order_by>;
  totalRoundAmount?: InputMaybe<order_by>;
};

/** order by stddev_pop() on columns of table "GrantShip" */
export type GrantShip_stddev_pop_order_by = {
  applicationSubmittedTime?: InputMaybe<order_by>;
  approvedTime?: InputMaybe<order_by>;
  balance?: InputMaybe<order_by>;
  chainId?: InputMaybe<order_by>;
  nonce?: InputMaybe<order_by>;
  poolId?: InputMaybe<order_by>;
  rejectedTime?: InputMaybe<order_by>;
  shipAllocation?: InputMaybe<order_by>;
  status?: InputMaybe<order_by>;
  totalAllocated?: InputMaybe<order_by>;
  totalAvailableFunds?: InputMaybe<order_by>;
  totalDistributed?: InputMaybe<order_by>;
  totalRoundAmount?: InputMaybe<order_by>;
};

/** order by stddev_samp() on columns of table "GrantShip" */
export type GrantShip_stddev_samp_order_by = {
  applicationSubmittedTime?: InputMaybe<order_by>;
  approvedTime?: InputMaybe<order_by>;
  balance?: InputMaybe<order_by>;
  chainId?: InputMaybe<order_by>;
  nonce?: InputMaybe<order_by>;
  poolId?: InputMaybe<order_by>;
  rejectedTime?: InputMaybe<order_by>;
  shipAllocation?: InputMaybe<order_by>;
  status?: InputMaybe<order_by>;
  totalAllocated?: InputMaybe<order_by>;
  totalAvailableFunds?: InputMaybe<order_by>;
  totalDistributed?: InputMaybe<order_by>;
  totalRoundAmount?: InputMaybe<order_by>;
};

/** Streaming cursor of the table "GrantShip" */
export type GrantShip_stream_cursor_input = {
  /** Stream column input with initial value */
  initial_value: GrantShip_stream_cursor_value_input;
  /** cursor ordering */
  ordering?: InputMaybe<cursor_ordering>;
};

/** Initial value of the column from where the streaming should start */
export type GrantShip_stream_cursor_value_input = {
  anchor?: InputMaybe<Scalars['String']>;
  applicationReviewReason_id?: InputMaybe<Scalars['String']>;
  applicationSubmittedTime?: InputMaybe<Scalars['Int']>;
  approvedTime?: InputMaybe<Scalars['Int']>;
  balance?: InputMaybe<Scalars['numeric']>;
  chainId?: InputMaybe<Scalars['Int']>;
  db_write_timestamp?: InputMaybe<Scalars['timestamp']>;
  gameManager_id?: InputMaybe<Scalars['String']>;
  gameRound_id?: InputMaybe<Scalars['String']>;
  hasEditedProfile?: InputMaybe<Scalars['Boolean']>;
  hasSubmittedApplication?: InputMaybe<Scalars['Boolean']>;
  hatId?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
  isAllocated?: InputMaybe<Scalars['Boolean']>;
  isApproved?: InputMaybe<Scalars['Boolean']>;
  isAwaitingApproval?: InputMaybe<Scalars['Boolean']>;
  isDistributed?: InputMaybe<Scalars['Boolean']>;
  isRejected?: InputMaybe<Scalars['Boolean']>;
  name?: InputMaybe<Scalars['String']>;
  nonce?: InputMaybe<Scalars['numeric']>;
  owner?: InputMaybe<Scalars['String']>;
  pastNames?: InputMaybe<Scalars['_text']>;
  pastProfileIds?: InputMaybe<Scalars['_text']>;
  poolActive?: InputMaybe<Scalars['Boolean']>;
  poolFunded?: InputMaybe<Scalars['Boolean']>;
  poolId?: InputMaybe<Scalars['numeric']>;
  profileId?: InputMaybe<Scalars['String']>;
  profileMetadata_id?: InputMaybe<Scalars['String']>;
  rejectedTime?: InputMaybe<Scalars['Int']>;
  shipAllocation?: InputMaybe<Scalars['numeric']>;
  shipApplicationBytesData?: InputMaybe<Scalars['String']>;
  shipContractAddress?: InputMaybe<Scalars['String']>;
  shipLaunched?: InputMaybe<Scalars['Boolean']>;
  status?: InputMaybe<Scalars['Int']>;
  totalAllocated?: InputMaybe<Scalars['numeric']>;
  totalAvailableFunds?: InputMaybe<Scalars['numeric']>;
  totalDistributed?: InputMaybe<Scalars['numeric']>;
  totalRoundAmount?: InputMaybe<Scalars['numeric']>;
};

/** order by sum() on columns of table "GrantShip" */
export type GrantShip_sum_order_by = {
  applicationSubmittedTime?: InputMaybe<order_by>;
  approvedTime?: InputMaybe<order_by>;
  balance?: InputMaybe<order_by>;
  chainId?: InputMaybe<order_by>;
  nonce?: InputMaybe<order_by>;
  poolId?: InputMaybe<order_by>;
  rejectedTime?: InputMaybe<order_by>;
  shipAllocation?: InputMaybe<order_by>;
  status?: InputMaybe<order_by>;
  totalAllocated?: InputMaybe<order_by>;
  totalAvailableFunds?: InputMaybe<order_by>;
  totalDistributed?: InputMaybe<order_by>;
  totalRoundAmount?: InputMaybe<order_by>;
};

/** order by var_pop() on columns of table "GrantShip" */
export type GrantShip_var_pop_order_by = {
  applicationSubmittedTime?: InputMaybe<order_by>;
  approvedTime?: InputMaybe<order_by>;
  balance?: InputMaybe<order_by>;
  chainId?: InputMaybe<order_by>;
  nonce?: InputMaybe<order_by>;
  poolId?: InputMaybe<order_by>;
  rejectedTime?: InputMaybe<order_by>;
  shipAllocation?: InputMaybe<order_by>;
  status?: InputMaybe<order_by>;
  totalAllocated?: InputMaybe<order_by>;
  totalAvailableFunds?: InputMaybe<order_by>;
  totalDistributed?: InputMaybe<order_by>;
  totalRoundAmount?: InputMaybe<order_by>;
};

/** order by var_samp() on columns of table "GrantShip" */
export type GrantShip_var_samp_order_by = {
  applicationSubmittedTime?: InputMaybe<order_by>;
  approvedTime?: InputMaybe<order_by>;
  balance?: InputMaybe<order_by>;
  chainId?: InputMaybe<order_by>;
  nonce?: InputMaybe<order_by>;
  poolId?: InputMaybe<order_by>;
  rejectedTime?: InputMaybe<order_by>;
  shipAllocation?: InputMaybe<order_by>;
  status?: InputMaybe<order_by>;
  totalAllocated?: InputMaybe<order_by>;
  totalAvailableFunds?: InputMaybe<order_by>;
  totalDistributed?: InputMaybe<order_by>;
  totalRoundAmount?: InputMaybe<order_by>;
};

/** order by variance() on columns of table "GrantShip" */
export type GrantShip_variance_order_by = {
  applicationSubmittedTime?: InputMaybe<order_by>;
  approvedTime?: InputMaybe<order_by>;
  balance?: InputMaybe<order_by>;
  chainId?: InputMaybe<order_by>;
  nonce?: InputMaybe<order_by>;
  poolId?: InputMaybe<order_by>;
  rejectedTime?: InputMaybe<order_by>;
  shipAllocation?: InputMaybe<order_by>;
  status?: InputMaybe<order_by>;
  totalAllocated?: InputMaybe<order_by>;
  totalAvailableFunds?: InputMaybe<order_by>;
  totalDistributed?: InputMaybe<order_by>;
  totalRoundAmount?: InputMaybe<order_by>;
};

/** order by aggregate values of table "Grant" */
export type Grant_aggregate_order_by = {
  count?: InputMaybe<order_by>;
  max?: InputMaybe<Grant_max_order_by>;
  min?: InputMaybe<Grant_min_order_by>;
};

/** Boolean expression to filter rows from the table "Grant". All fields are combined with a logical 'AND'. */
export type Grant_bool_exp = {
  _and?: InputMaybe<Array<Grant_bool_exp>>;
  _not?: InputMaybe<Grant_bool_exp>;
  _or?: InputMaybe<Array<Grant_bool_exp>>;
  db_write_timestamp?: InputMaybe<timestamp_comparison_exp>;
  id?: InputMaybe<String_comparison_exp>;
  project?: InputMaybe<Project_bool_exp>;
  project_id?: InputMaybe<String_comparison_exp>;
  ship?: InputMaybe<GrantShip_bool_exp>;
  ship_id?: InputMaybe<String_comparison_exp>;
};

/** order by max() on columns of table "Grant" */
export type Grant_max_order_by = {
  db_write_timestamp?: InputMaybe<order_by>;
  id?: InputMaybe<order_by>;
  project_id?: InputMaybe<order_by>;
  ship_id?: InputMaybe<order_by>;
};

/** order by min() on columns of table "Grant" */
export type Grant_min_order_by = {
  db_write_timestamp?: InputMaybe<order_by>;
  id?: InputMaybe<order_by>;
  project_id?: InputMaybe<order_by>;
  ship_id?: InputMaybe<order_by>;
};

/** Ordering options when selecting data from "Grant". */
export type Grant_order_by = {
  db_write_timestamp?: InputMaybe<order_by>;
  id?: InputMaybe<order_by>;
  project?: InputMaybe<Project_order_by>;
  project_id?: InputMaybe<order_by>;
  ship?: InputMaybe<GrantShip_order_by>;
  ship_id?: InputMaybe<order_by>;
};

/** select columns of table "Grant" */
export type Grant_select_column =
  /** column name */
  | 'db_write_timestamp'
  /** column name */
  | 'id'
  /** column name */
  | 'project_id'
  /** column name */
  | 'ship_id';

/** Streaming cursor of the table "Grant" */
export type Grant_stream_cursor_input = {
  /** Stream column input with initial value */
  initial_value: Grant_stream_cursor_value_input;
  /** cursor ordering */
  ordering?: InputMaybe<cursor_ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Grant_stream_cursor_value_input = {
  db_write_timestamp?: InputMaybe<Scalars['timestamp']>;
  id?: InputMaybe<Scalars['String']>;
  project_id?: InputMaybe<Scalars['String']>;
  ship_id?: InputMaybe<Scalars['String']>;
};

/** Boolean expression to compare columns of type "Int". All fields are combined with logical 'AND'. */
export type Int_comparison_exp = {
  _eq?: InputMaybe<Scalars['Int']>;
  _gt?: InputMaybe<Scalars['Int']>;
  _gte?: InputMaybe<Scalars['Int']>;
  _in?: InputMaybe<Array<Scalars['Int']>>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  _lt?: InputMaybe<Scalars['Int']>;
  _lte?: InputMaybe<Scalars['Int']>;
  _neq?: InputMaybe<Scalars['Int']>;
  _nin?: InputMaybe<Array<Scalars['Int']>>;
};

/** columns and relationships of "ProfileIdToAnchor" */
export type ProfileIdToAnchor = {
  anchor: Scalars['String'];
  db_write_timestamp?: Maybe<Scalars['timestamp']>;
  id: Scalars['String'];
  profileId: Scalars['String'];
};

/** Boolean expression to filter rows from the table "ProfileIdToAnchor". All fields are combined with a logical 'AND'. */
export type ProfileIdToAnchor_bool_exp = {
  _and?: InputMaybe<Array<ProfileIdToAnchor_bool_exp>>;
  _not?: InputMaybe<ProfileIdToAnchor_bool_exp>;
  _or?: InputMaybe<Array<ProfileIdToAnchor_bool_exp>>;
  anchor?: InputMaybe<String_comparison_exp>;
  db_write_timestamp?: InputMaybe<timestamp_comparison_exp>;
  id?: InputMaybe<String_comparison_exp>;
  profileId?: InputMaybe<String_comparison_exp>;
};

/** Ordering options when selecting data from "ProfileIdToAnchor". */
export type ProfileIdToAnchor_order_by = {
  anchor?: InputMaybe<order_by>;
  db_write_timestamp?: InputMaybe<order_by>;
  id?: InputMaybe<order_by>;
  profileId?: InputMaybe<order_by>;
};

/** select columns of table "ProfileIdToAnchor" */
export type ProfileIdToAnchor_select_column =
  /** column name */
  | 'anchor'
  /** column name */
  | 'db_write_timestamp'
  /** column name */
  | 'id'
  /** column name */
  | 'profileId';

/** Streaming cursor of the table "ProfileIdToAnchor" */
export type ProfileIdToAnchor_stream_cursor_input = {
  /** Stream column input with initial value */
  initial_value: ProfileIdToAnchor_stream_cursor_value_input;
  /** cursor ordering */
  ordering?: InputMaybe<cursor_ordering>;
};

/** Initial value of the column from where the streaming should start */
export type ProfileIdToAnchor_stream_cursor_value_input = {
  anchor?: InputMaybe<Scalars['String']>;
  db_write_timestamp?: InputMaybe<Scalars['timestamp']>;
  id?: InputMaybe<Scalars['String']>;
  profileId?: InputMaybe<Scalars['String']>;
};

/** columns and relationships of "ProfileMemberGroup" */
export type ProfileMemberGroup = {
  addresses: Scalars['_text'];
  db_write_timestamp?: Maybe<Scalars['timestamp']>;
  id: Scalars['String'];
  role: Scalars['String'];
};

/** Boolean expression to filter rows from the table "ProfileMemberGroup". All fields are combined with a logical 'AND'. */
export type ProfileMemberGroup_bool_exp = {
  _and?: InputMaybe<Array<ProfileMemberGroup_bool_exp>>;
  _not?: InputMaybe<ProfileMemberGroup_bool_exp>;
  _or?: InputMaybe<Array<ProfileMemberGroup_bool_exp>>;
  addresses?: InputMaybe<_text_comparison_exp>;
  db_write_timestamp?: InputMaybe<timestamp_comparison_exp>;
  id?: InputMaybe<String_comparison_exp>;
  role?: InputMaybe<String_comparison_exp>;
};

/** Ordering options when selecting data from "ProfileMemberGroup". */
export type ProfileMemberGroup_order_by = {
  addresses?: InputMaybe<order_by>;
  db_write_timestamp?: InputMaybe<order_by>;
  id?: InputMaybe<order_by>;
  role?: InputMaybe<order_by>;
};

/** select columns of table "ProfileMemberGroup" */
export type ProfileMemberGroup_select_column =
  /** column name */
  | 'addresses'
  /** column name */
  | 'db_write_timestamp'
  /** column name */
  | 'id'
  /** column name */
  | 'role';

/** Streaming cursor of the table "ProfileMemberGroup" */
export type ProfileMemberGroup_stream_cursor_input = {
  /** Stream column input with initial value */
  initial_value: ProfileMemberGroup_stream_cursor_value_input;
  /** cursor ordering */
  ordering?: InputMaybe<cursor_ordering>;
};

/** Initial value of the column from where the streaming should start */
export type ProfileMemberGroup_stream_cursor_value_input = {
  addresses?: InputMaybe<Scalars['_text']>;
  db_write_timestamp?: InputMaybe<Scalars['timestamp']>;
  id?: InputMaybe<Scalars['String']>;
  role?: InputMaybe<Scalars['String']>;
};

/** columns and relationships of "Project" */
export type Project = {
  anchor: Scalars['String'];
  chainId: Scalars['Int'];
  db_write_timestamp?: Maybe<Scalars['timestamp']>;
  /** An array relationship */
  grants: Array<Grant>;
  hasEditedProfile: Scalars['Boolean'];
  id: Scalars['String'];
  /** An object relationship */
  members?: Maybe<ProfileMemberGroup>;
  members_id?: Maybe<Scalars['String']>;
  /** An object relationship */
  metadata?: Maybe<RawMetadata>;
  metadata_id: Scalars['String'];
  name: Scalars['String'];
  nonce: Scalars['numeric'];
  owner: Scalars['String'];
  pastNames: Scalars['_text'];
  pastProfileIds: Scalars['_text'];
  profileId: Scalars['String'];
  status: Scalars['Int'];
  totalAmountReceived: Scalars['numeric'];
};


/** columns and relationships of "Project" */
export type ProjectgrantsArgs = {
  distinct_on?: InputMaybe<Array<Grant_select_column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Grant_order_by>>;
  where?: InputMaybe<Grant_bool_exp>;
};

/** Boolean expression to filter rows from the table "Project". All fields are combined with a logical 'AND'. */
export type Project_bool_exp = {
  _and?: InputMaybe<Array<Project_bool_exp>>;
  _not?: InputMaybe<Project_bool_exp>;
  _or?: InputMaybe<Array<Project_bool_exp>>;
  anchor?: InputMaybe<String_comparison_exp>;
  chainId?: InputMaybe<Int_comparison_exp>;
  db_write_timestamp?: InputMaybe<timestamp_comparison_exp>;
  grants?: InputMaybe<Grant_bool_exp>;
  hasEditedProfile?: InputMaybe<Boolean_comparison_exp>;
  id?: InputMaybe<String_comparison_exp>;
  members?: InputMaybe<ProfileMemberGroup_bool_exp>;
  members_id?: InputMaybe<String_comparison_exp>;
  metadata?: InputMaybe<RawMetadata_bool_exp>;
  metadata_id?: InputMaybe<String_comparison_exp>;
  name?: InputMaybe<String_comparison_exp>;
  nonce?: InputMaybe<numeric_comparison_exp>;
  owner?: InputMaybe<String_comparison_exp>;
  pastNames?: InputMaybe<_text_comparison_exp>;
  pastProfileIds?: InputMaybe<_text_comparison_exp>;
  profileId?: InputMaybe<String_comparison_exp>;
  status?: InputMaybe<Int_comparison_exp>;
  totalAmountReceived?: InputMaybe<numeric_comparison_exp>;
};

/** Ordering options when selecting data from "Project". */
export type Project_order_by = {
  anchor?: InputMaybe<order_by>;
  chainId?: InputMaybe<order_by>;
  db_write_timestamp?: InputMaybe<order_by>;
  grants_aggregate?: InputMaybe<Grant_aggregate_order_by>;
  hasEditedProfile?: InputMaybe<order_by>;
  id?: InputMaybe<order_by>;
  members?: InputMaybe<ProfileMemberGroup_order_by>;
  members_id?: InputMaybe<order_by>;
  metadata?: InputMaybe<RawMetadata_order_by>;
  metadata_id?: InputMaybe<order_by>;
  name?: InputMaybe<order_by>;
  nonce?: InputMaybe<order_by>;
  owner?: InputMaybe<order_by>;
  pastNames?: InputMaybe<order_by>;
  pastProfileIds?: InputMaybe<order_by>;
  profileId?: InputMaybe<order_by>;
  status?: InputMaybe<order_by>;
  totalAmountReceived?: InputMaybe<order_by>;
};

/** select columns of table "Project" */
export type Project_select_column =
  /** column name */
  | 'anchor'
  /** column name */
  | 'chainId'
  /** column name */
  | 'db_write_timestamp'
  /** column name */
  | 'hasEditedProfile'
  /** column name */
  | 'id'
  /** column name */
  | 'members_id'
  /** column name */
  | 'metadata_id'
  /** column name */
  | 'name'
  /** column name */
  | 'nonce'
  /** column name */
  | 'owner'
  /** column name */
  | 'pastNames'
  /** column name */
  | 'pastProfileIds'
  /** column name */
  | 'profileId'
  /** column name */
  | 'status'
  /** column name */
  | 'totalAmountReceived';

/** Streaming cursor of the table "Project" */
export type Project_stream_cursor_input = {
  /** Stream column input with initial value */
  initial_value: Project_stream_cursor_value_input;
  /** cursor ordering */
  ordering?: InputMaybe<cursor_ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Project_stream_cursor_value_input = {
  anchor?: InputMaybe<Scalars['String']>;
  chainId?: InputMaybe<Scalars['Int']>;
  db_write_timestamp?: InputMaybe<Scalars['timestamp']>;
  hasEditedProfile?: InputMaybe<Scalars['Boolean']>;
  id?: InputMaybe<Scalars['String']>;
  members_id?: InputMaybe<Scalars['String']>;
  metadata_id?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  nonce?: InputMaybe<Scalars['numeric']>;
  owner?: InputMaybe<Scalars['String']>;
  pastNames?: InputMaybe<Scalars['_text']>;
  pastProfileIds?: InputMaybe<Scalars['_text']>;
  profileId?: InputMaybe<Scalars['String']>;
  status?: InputMaybe<Scalars['Int']>;
  totalAmountReceived?: InputMaybe<Scalars['numeric']>;
};

/** columns and relationships of "RawMetadata" */
export type RawMetadata = {
  db_write_timestamp?: Maybe<Scalars['timestamp']>;
  id: Scalars['String'];
  pointer: Scalars['String'];
  protocol: Scalars['numeric'];
};

/** Boolean expression to filter rows from the table "RawMetadata". All fields are combined with a logical 'AND'. */
export type RawMetadata_bool_exp = {
  _and?: InputMaybe<Array<RawMetadata_bool_exp>>;
  _not?: InputMaybe<RawMetadata_bool_exp>;
  _or?: InputMaybe<Array<RawMetadata_bool_exp>>;
  db_write_timestamp?: InputMaybe<timestamp_comparison_exp>;
  id?: InputMaybe<String_comparison_exp>;
  pointer?: InputMaybe<String_comparison_exp>;
  protocol?: InputMaybe<numeric_comparison_exp>;
};

/** Ordering options when selecting data from "RawMetadata". */
export type RawMetadata_order_by = {
  db_write_timestamp?: InputMaybe<order_by>;
  id?: InputMaybe<order_by>;
  pointer?: InputMaybe<order_by>;
  protocol?: InputMaybe<order_by>;
};

/** select columns of table "RawMetadata" */
export type RawMetadata_select_column =
  /** column name */
  | 'db_write_timestamp'
  /** column name */
  | 'id'
  /** column name */
  | 'pointer'
  /** column name */
  | 'protocol';

/** Streaming cursor of the table "RawMetadata" */
export type RawMetadata_stream_cursor_input = {
  /** Stream column input with initial value */
  initial_value: RawMetadata_stream_cursor_value_input;
  /** cursor ordering */
  ordering?: InputMaybe<cursor_ordering>;
};

/** Initial value of the column from where the streaming should start */
export type RawMetadata_stream_cursor_value_input = {
  db_write_timestamp?: InputMaybe<Scalars['timestamp']>;
  id?: InputMaybe<Scalars['String']>;
  pointer?: InputMaybe<Scalars['String']>;
  protocol?: InputMaybe<Scalars['numeric']>;
};

/** Boolean expression to compare columns of type "String". All fields are combined with logical 'AND'. */
export type String_comparison_exp = {
  _eq?: InputMaybe<Scalars['String']>;
  _gt?: InputMaybe<Scalars['String']>;
  _gte?: InputMaybe<Scalars['String']>;
  /** does the column match the given case-insensitive pattern */
  _ilike?: InputMaybe<Scalars['String']>;
  _in?: InputMaybe<Array<Scalars['String']>>;
  /** does the column match the given POSIX regular expression, case insensitive */
  _iregex?: InputMaybe<Scalars['String']>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  /** does the column match the given pattern */
  _like?: InputMaybe<Scalars['String']>;
  _lt?: InputMaybe<Scalars['String']>;
  _lte?: InputMaybe<Scalars['String']>;
  _neq?: InputMaybe<Scalars['String']>;
  /** does the column NOT match the given case-insensitive pattern */
  _nilike?: InputMaybe<Scalars['String']>;
  _nin?: InputMaybe<Array<Scalars['String']>>;
  /** does the column NOT match the given POSIX regular expression, case insensitive */
  _niregex?: InputMaybe<Scalars['String']>;
  /** does the column NOT match the given pattern */
  _nlike?: InputMaybe<Scalars['String']>;
  /** does the column NOT match the given POSIX regular expression, case sensitive */
  _nregex?: InputMaybe<Scalars['String']>;
  /** does the column NOT match the given SQL regular expression */
  _nsimilar?: InputMaybe<Scalars['String']>;
  /** does the column match the given POSIX regular expression, case sensitive */
  _regex?: InputMaybe<Scalars['String']>;
  /** does the column match the given SQL regular expression */
  _similar?: InputMaybe<Scalars['String']>;
};

/** columns and relationships of "Test" */
export type Test = {
  db_write_timestamp?: Maybe<Scalars['timestamp']>;
  id: Scalars['String'];
  name: Scalars['String'];
};

/** Boolean expression to filter rows from the table "Test". All fields are combined with a logical 'AND'. */
export type Test_bool_exp = {
  _and?: InputMaybe<Array<Test_bool_exp>>;
  _not?: InputMaybe<Test_bool_exp>;
  _or?: InputMaybe<Array<Test_bool_exp>>;
  db_write_timestamp?: InputMaybe<timestamp_comparison_exp>;
  id?: InputMaybe<String_comparison_exp>;
  name?: InputMaybe<String_comparison_exp>;
};

/** Ordering options when selecting data from "Test". */
export type Test_order_by = {
  db_write_timestamp?: InputMaybe<order_by>;
  id?: InputMaybe<order_by>;
  name?: InputMaybe<order_by>;
};

/** select columns of table "Test" */
export type Test_select_column =
  /** column name */
  | 'db_write_timestamp'
  /** column name */
  | 'id'
  /** column name */
  | 'name';

/** Streaming cursor of the table "Test" */
export type Test_stream_cursor_input = {
  /** Stream column input with initial value */
  initial_value: Test_stream_cursor_value_input;
  /** cursor ordering */
  ordering?: InputMaybe<cursor_ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Test_stream_cursor_value_input = {
  db_write_timestamp?: InputMaybe<Scalars['timestamp']>;
  id?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
};

/** Boolean expression to compare columns of type "_text". All fields are combined with logical 'AND'. */
export type _text_comparison_exp = {
  _eq?: InputMaybe<Scalars['_text']>;
  _gt?: InputMaybe<Scalars['_text']>;
  _gte?: InputMaybe<Scalars['_text']>;
  _in?: InputMaybe<Array<Scalars['_text']>>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  _lt?: InputMaybe<Scalars['_text']>;
  _lte?: InputMaybe<Scalars['_text']>;
  _neq?: InputMaybe<Scalars['_text']>;
  _nin?: InputMaybe<Array<Scalars['_text']>>;
};

/** columns and relationships of "chain_metadata" */
export type chain_metadata = {
  block_height: Scalars['Int'];
  chain_id: Scalars['Int'];
  end_block?: Maybe<Scalars['Int']>;
  first_event_block_number?: Maybe<Scalars['Int']>;
  is_hyper_sync: Scalars['Boolean'];
  latest_fetched_block_number: Scalars['Int'];
  latest_processed_block?: Maybe<Scalars['Int']>;
  num_batches_fetched: Scalars['Int'];
  num_events_processed?: Maybe<Scalars['Int']>;
  start_block: Scalars['Int'];
  timestamp_caught_up_to_head_or_endblock?: Maybe<Scalars['timestamptz']>;
};

/** Boolean expression to filter rows from the table "chain_metadata". All fields are combined with a logical 'AND'. */
export type chain_metadata_bool_exp = {
  _and?: InputMaybe<Array<chain_metadata_bool_exp>>;
  _not?: InputMaybe<chain_metadata_bool_exp>;
  _or?: InputMaybe<Array<chain_metadata_bool_exp>>;
  block_height?: InputMaybe<Int_comparison_exp>;
  chain_id?: InputMaybe<Int_comparison_exp>;
  end_block?: InputMaybe<Int_comparison_exp>;
  first_event_block_number?: InputMaybe<Int_comparison_exp>;
  is_hyper_sync?: InputMaybe<Boolean_comparison_exp>;
  latest_fetched_block_number?: InputMaybe<Int_comparison_exp>;
  latest_processed_block?: InputMaybe<Int_comparison_exp>;
  num_batches_fetched?: InputMaybe<Int_comparison_exp>;
  num_events_processed?: InputMaybe<Int_comparison_exp>;
  start_block?: InputMaybe<Int_comparison_exp>;
  timestamp_caught_up_to_head_or_endblock?: InputMaybe<timestamptz_comparison_exp>;
};

/** Ordering options when selecting data from "chain_metadata". */
export type chain_metadata_order_by = {
  block_height?: InputMaybe<order_by>;
  chain_id?: InputMaybe<order_by>;
  end_block?: InputMaybe<order_by>;
  first_event_block_number?: InputMaybe<order_by>;
  is_hyper_sync?: InputMaybe<order_by>;
  latest_fetched_block_number?: InputMaybe<order_by>;
  latest_processed_block?: InputMaybe<order_by>;
  num_batches_fetched?: InputMaybe<order_by>;
  num_events_processed?: InputMaybe<order_by>;
  start_block?: InputMaybe<order_by>;
  timestamp_caught_up_to_head_or_endblock?: InputMaybe<order_by>;
};

/** select columns of table "chain_metadata" */
export type chain_metadata_select_column =
  /** column name */
  | 'block_height'
  /** column name */
  | 'chain_id'
  /** column name */
  | 'end_block'
  /** column name */
  | 'first_event_block_number'
  /** column name */
  | 'is_hyper_sync'
  /** column name */
  | 'latest_fetched_block_number'
  /** column name */
  | 'latest_processed_block'
  /** column name */
  | 'num_batches_fetched'
  /** column name */
  | 'num_events_processed'
  /** column name */
  | 'start_block'
  /** column name */
  | 'timestamp_caught_up_to_head_or_endblock';

/** Streaming cursor of the table "chain_metadata" */
export type chain_metadata_stream_cursor_input = {
  /** Stream column input with initial value */
  initial_value: chain_metadata_stream_cursor_value_input;
  /** cursor ordering */
  ordering?: InputMaybe<cursor_ordering>;
};

/** Initial value of the column from where the streaming should start */
export type chain_metadata_stream_cursor_value_input = {
  block_height?: InputMaybe<Scalars['Int']>;
  chain_id?: InputMaybe<Scalars['Int']>;
  end_block?: InputMaybe<Scalars['Int']>;
  first_event_block_number?: InputMaybe<Scalars['Int']>;
  is_hyper_sync?: InputMaybe<Scalars['Boolean']>;
  latest_fetched_block_number?: InputMaybe<Scalars['Int']>;
  latest_processed_block?: InputMaybe<Scalars['Int']>;
  num_batches_fetched?: InputMaybe<Scalars['Int']>;
  num_events_processed?: InputMaybe<Scalars['Int']>;
  start_block?: InputMaybe<Scalars['Int']>;
  timestamp_caught_up_to_head_or_endblock?: InputMaybe<Scalars['timestamptz']>;
};

/** Boolean expression to compare columns of type "contract_type". All fields are combined with logical 'AND'. */
export type contract_type_comparison_exp = {
  _eq?: InputMaybe<Scalars['contract_type']>;
  _gt?: InputMaybe<Scalars['contract_type']>;
  _gte?: InputMaybe<Scalars['contract_type']>;
  _in?: InputMaybe<Array<Scalars['contract_type']>>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  _lt?: InputMaybe<Scalars['contract_type']>;
  _lte?: InputMaybe<Scalars['contract_type']>;
  _neq?: InputMaybe<Scalars['contract_type']>;
  _nin?: InputMaybe<Array<Scalars['contract_type']>>;
};

/** ordering argument of a cursor */
export type cursor_ordering =
  /** ascending ordering of the cursor */
  | 'ASC'
  /** descending ordering of the cursor */
  | 'DESC';

/** columns and relationships of "dynamic_contract_registry" */
export type dynamic_contract_registry = {
  block_timestamp: Scalars['Int'];
  chain_id: Scalars['Int'];
  contract_address: Scalars['String'];
  contract_type: Scalars['contract_type'];
  event_id: Scalars['numeric'];
};

/** Boolean expression to filter rows from the table "dynamic_contract_registry". All fields are combined with a logical 'AND'. */
export type dynamic_contract_registry_bool_exp = {
  _and?: InputMaybe<Array<dynamic_contract_registry_bool_exp>>;
  _not?: InputMaybe<dynamic_contract_registry_bool_exp>;
  _or?: InputMaybe<Array<dynamic_contract_registry_bool_exp>>;
  block_timestamp?: InputMaybe<Int_comparison_exp>;
  chain_id?: InputMaybe<Int_comparison_exp>;
  contract_address?: InputMaybe<String_comparison_exp>;
  contract_type?: InputMaybe<contract_type_comparison_exp>;
  event_id?: InputMaybe<numeric_comparison_exp>;
};

/** Ordering options when selecting data from "dynamic_contract_registry". */
export type dynamic_contract_registry_order_by = {
  block_timestamp?: InputMaybe<order_by>;
  chain_id?: InputMaybe<order_by>;
  contract_address?: InputMaybe<order_by>;
  contract_type?: InputMaybe<order_by>;
  event_id?: InputMaybe<order_by>;
};

/** select columns of table "dynamic_contract_registry" */
export type dynamic_contract_registry_select_column =
  /** column name */
  | 'block_timestamp'
  /** column name */
  | 'chain_id'
  /** column name */
  | 'contract_address'
  /** column name */
  | 'contract_type'
  /** column name */
  | 'event_id';

/** Streaming cursor of the table "dynamic_contract_registry" */
export type dynamic_contract_registry_stream_cursor_input = {
  /** Stream column input with initial value */
  initial_value: dynamic_contract_registry_stream_cursor_value_input;
  /** cursor ordering */
  ordering?: InputMaybe<cursor_ordering>;
};

/** Initial value of the column from where the streaming should start */
export type dynamic_contract_registry_stream_cursor_value_input = {
  block_timestamp?: InputMaybe<Scalars['Int']>;
  chain_id?: InputMaybe<Scalars['Int']>;
  contract_address?: InputMaybe<Scalars['String']>;
  contract_type?: InputMaybe<Scalars['contract_type']>;
  event_id?: InputMaybe<Scalars['numeric']>;
};

/** columns and relationships of "entity_history" */
export type entity_history = {
  block_number: Scalars['Int'];
  block_timestamp: Scalars['Int'];
  chain_id: Scalars['Int'];
  entity_id: Scalars['String'];
  entity_type: Scalars['entity_type'];
  /** An object relationship */
  event?: Maybe<raw_events>;
  log_index: Scalars['Int'];
  params?: Maybe<Scalars['json']>;
  previous_block_number?: Maybe<Scalars['Int']>;
  previous_block_timestamp?: Maybe<Scalars['Int']>;
  previous_chain_id?: Maybe<Scalars['Int']>;
  previous_log_index?: Maybe<Scalars['Int']>;
};


/** columns and relationships of "entity_history" */
export type entity_historyparamsArgs = {
  path?: InputMaybe<Scalars['String']>;
};

/** order by aggregate values of table "entity_history" */
export type entity_history_aggregate_order_by = {
  avg?: InputMaybe<entity_history_avg_order_by>;
  count?: InputMaybe<order_by>;
  max?: InputMaybe<entity_history_max_order_by>;
  min?: InputMaybe<entity_history_min_order_by>;
  stddev?: InputMaybe<entity_history_stddev_order_by>;
  stddev_pop?: InputMaybe<entity_history_stddev_pop_order_by>;
  stddev_samp?: InputMaybe<entity_history_stddev_samp_order_by>;
  sum?: InputMaybe<entity_history_sum_order_by>;
  var_pop?: InputMaybe<entity_history_var_pop_order_by>;
  var_samp?: InputMaybe<entity_history_var_samp_order_by>;
  variance?: InputMaybe<entity_history_variance_order_by>;
};

/** order by avg() on columns of table "entity_history" */
export type entity_history_avg_order_by = {
  block_number?: InputMaybe<order_by>;
  block_timestamp?: InputMaybe<order_by>;
  chain_id?: InputMaybe<order_by>;
  log_index?: InputMaybe<order_by>;
  previous_block_number?: InputMaybe<order_by>;
  previous_block_timestamp?: InputMaybe<order_by>;
  previous_chain_id?: InputMaybe<order_by>;
  previous_log_index?: InputMaybe<order_by>;
};

/** Boolean expression to filter rows from the table "entity_history". All fields are combined with a logical 'AND'. */
export type entity_history_bool_exp = {
  _and?: InputMaybe<Array<entity_history_bool_exp>>;
  _not?: InputMaybe<entity_history_bool_exp>;
  _or?: InputMaybe<Array<entity_history_bool_exp>>;
  block_number?: InputMaybe<Int_comparison_exp>;
  block_timestamp?: InputMaybe<Int_comparison_exp>;
  chain_id?: InputMaybe<Int_comparison_exp>;
  entity_id?: InputMaybe<String_comparison_exp>;
  entity_type?: InputMaybe<entity_type_comparison_exp>;
  event?: InputMaybe<raw_events_bool_exp>;
  log_index?: InputMaybe<Int_comparison_exp>;
  params?: InputMaybe<json_comparison_exp>;
  previous_block_number?: InputMaybe<Int_comparison_exp>;
  previous_block_timestamp?: InputMaybe<Int_comparison_exp>;
  previous_chain_id?: InputMaybe<Int_comparison_exp>;
  previous_log_index?: InputMaybe<Int_comparison_exp>;
};

/** columns and relationships of "entity_history_filter" */
export type entity_history_filter = {
  block_number: Scalars['Int'];
  block_timestamp: Scalars['Int'];
  chain_id: Scalars['Int'];
  entity_id: Scalars['String'];
  entity_type: Scalars['entity_type'];
  /** An object relationship */
  event?: Maybe<raw_events>;
  log_index: Scalars['Int'];
  new_val?: Maybe<Scalars['json']>;
  old_val?: Maybe<Scalars['json']>;
  previous_block_number: Scalars['Int'];
  previous_log_index: Scalars['Int'];
};


/** columns and relationships of "entity_history_filter" */
export type entity_history_filternew_valArgs = {
  path?: InputMaybe<Scalars['String']>;
};


/** columns and relationships of "entity_history_filter" */
export type entity_history_filterold_valArgs = {
  path?: InputMaybe<Scalars['String']>;
};

/** Boolean expression to filter rows from the table "entity_history_filter". All fields are combined with a logical 'AND'. */
export type entity_history_filter_bool_exp = {
  _and?: InputMaybe<Array<entity_history_filter_bool_exp>>;
  _not?: InputMaybe<entity_history_filter_bool_exp>;
  _or?: InputMaybe<Array<entity_history_filter_bool_exp>>;
  block_number?: InputMaybe<Int_comparison_exp>;
  block_timestamp?: InputMaybe<Int_comparison_exp>;
  chain_id?: InputMaybe<Int_comparison_exp>;
  entity_id?: InputMaybe<String_comparison_exp>;
  entity_type?: InputMaybe<entity_type_comparison_exp>;
  event?: InputMaybe<raw_events_bool_exp>;
  log_index?: InputMaybe<Int_comparison_exp>;
  new_val?: InputMaybe<json_comparison_exp>;
  old_val?: InputMaybe<json_comparison_exp>;
  previous_block_number?: InputMaybe<Int_comparison_exp>;
  previous_log_index?: InputMaybe<Int_comparison_exp>;
};

/** Ordering options when selecting data from "entity_history_filter". */
export type entity_history_filter_order_by = {
  block_number?: InputMaybe<order_by>;
  block_timestamp?: InputMaybe<order_by>;
  chain_id?: InputMaybe<order_by>;
  entity_id?: InputMaybe<order_by>;
  entity_type?: InputMaybe<order_by>;
  event?: InputMaybe<raw_events_order_by>;
  log_index?: InputMaybe<order_by>;
  new_val?: InputMaybe<order_by>;
  old_val?: InputMaybe<order_by>;
  previous_block_number?: InputMaybe<order_by>;
  previous_log_index?: InputMaybe<order_by>;
};

/** select columns of table "entity_history_filter" */
export type entity_history_filter_select_column =
  /** column name */
  | 'block_number'
  /** column name */
  | 'block_timestamp'
  /** column name */
  | 'chain_id'
  /** column name */
  | 'entity_id'
  /** column name */
  | 'entity_type'
  /** column name */
  | 'log_index'
  /** column name */
  | 'new_val'
  /** column name */
  | 'old_val'
  /** column name */
  | 'previous_block_number'
  /** column name */
  | 'previous_log_index';

/** Streaming cursor of the table "entity_history_filter" */
export type entity_history_filter_stream_cursor_input = {
  /** Stream column input with initial value */
  initial_value: entity_history_filter_stream_cursor_value_input;
  /** cursor ordering */
  ordering?: InputMaybe<cursor_ordering>;
};

/** Initial value of the column from where the streaming should start */
export type entity_history_filter_stream_cursor_value_input = {
  block_number?: InputMaybe<Scalars['Int']>;
  block_timestamp?: InputMaybe<Scalars['Int']>;
  chain_id?: InputMaybe<Scalars['Int']>;
  entity_id?: InputMaybe<Scalars['String']>;
  entity_type?: InputMaybe<Scalars['entity_type']>;
  log_index?: InputMaybe<Scalars['Int']>;
  new_val?: InputMaybe<Scalars['json']>;
  old_val?: InputMaybe<Scalars['json']>;
  previous_block_number?: InputMaybe<Scalars['Int']>;
  previous_log_index?: InputMaybe<Scalars['Int']>;
};

/** order by max() on columns of table "entity_history" */
export type entity_history_max_order_by = {
  block_number?: InputMaybe<order_by>;
  block_timestamp?: InputMaybe<order_by>;
  chain_id?: InputMaybe<order_by>;
  entity_id?: InputMaybe<order_by>;
  entity_type?: InputMaybe<order_by>;
  log_index?: InputMaybe<order_by>;
  previous_block_number?: InputMaybe<order_by>;
  previous_block_timestamp?: InputMaybe<order_by>;
  previous_chain_id?: InputMaybe<order_by>;
  previous_log_index?: InputMaybe<order_by>;
};

/** order by min() on columns of table "entity_history" */
export type entity_history_min_order_by = {
  block_number?: InputMaybe<order_by>;
  block_timestamp?: InputMaybe<order_by>;
  chain_id?: InputMaybe<order_by>;
  entity_id?: InputMaybe<order_by>;
  entity_type?: InputMaybe<order_by>;
  log_index?: InputMaybe<order_by>;
  previous_block_number?: InputMaybe<order_by>;
  previous_block_timestamp?: InputMaybe<order_by>;
  previous_chain_id?: InputMaybe<order_by>;
  previous_log_index?: InputMaybe<order_by>;
};

/** Ordering options when selecting data from "entity_history". */
export type entity_history_order_by = {
  block_number?: InputMaybe<order_by>;
  block_timestamp?: InputMaybe<order_by>;
  chain_id?: InputMaybe<order_by>;
  entity_id?: InputMaybe<order_by>;
  entity_type?: InputMaybe<order_by>;
  event?: InputMaybe<raw_events_order_by>;
  log_index?: InputMaybe<order_by>;
  params?: InputMaybe<order_by>;
  previous_block_number?: InputMaybe<order_by>;
  previous_block_timestamp?: InputMaybe<order_by>;
  previous_chain_id?: InputMaybe<order_by>;
  previous_log_index?: InputMaybe<order_by>;
};

/** select columns of table "entity_history" */
export type entity_history_select_column =
  /** column name */
  | 'block_number'
  /** column name */
  | 'block_timestamp'
  /** column name */
  | 'chain_id'
  /** column name */
  | 'entity_id'
  /** column name */
  | 'entity_type'
  /** column name */
  | 'log_index'
  /** column name */
  | 'params'
  /** column name */
  | 'previous_block_number'
  /** column name */
  | 'previous_block_timestamp'
  /** column name */
  | 'previous_chain_id'
  /** column name */
  | 'previous_log_index';

/** order by stddev() on columns of table "entity_history" */
export type entity_history_stddev_order_by = {
  block_number?: InputMaybe<order_by>;
  block_timestamp?: InputMaybe<order_by>;
  chain_id?: InputMaybe<order_by>;
  log_index?: InputMaybe<order_by>;
  previous_block_number?: InputMaybe<order_by>;
  previous_block_timestamp?: InputMaybe<order_by>;
  previous_chain_id?: InputMaybe<order_by>;
  previous_log_index?: InputMaybe<order_by>;
};

/** order by stddev_pop() on columns of table "entity_history" */
export type entity_history_stddev_pop_order_by = {
  block_number?: InputMaybe<order_by>;
  block_timestamp?: InputMaybe<order_by>;
  chain_id?: InputMaybe<order_by>;
  log_index?: InputMaybe<order_by>;
  previous_block_number?: InputMaybe<order_by>;
  previous_block_timestamp?: InputMaybe<order_by>;
  previous_chain_id?: InputMaybe<order_by>;
  previous_log_index?: InputMaybe<order_by>;
};

/** order by stddev_samp() on columns of table "entity_history" */
export type entity_history_stddev_samp_order_by = {
  block_number?: InputMaybe<order_by>;
  block_timestamp?: InputMaybe<order_by>;
  chain_id?: InputMaybe<order_by>;
  log_index?: InputMaybe<order_by>;
  previous_block_number?: InputMaybe<order_by>;
  previous_block_timestamp?: InputMaybe<order_by>;
  previous_chain_id?: InputMaybe<order_by>;
  previous_log_index?: InputMaybe<order_by>;
};

/** Streaming cursor of the table "entity_history" */
export type entity_history_stream_cursor_input = {
  /** Stream column input with initial value */
  initial_value: entity_history_stream_cursor_value_input;
  /** cursor ordering */
  ordering?: InputMaybe<cursor_ordering>;
};

/** Initial value of the column from where the streaming should start */
export type entity_history_stream_cursor_value_input = {
  block_number?: InputMaybe<Scalars['Int']>;
  block_timestamp?: InputMaybe<Scalars['Int']>;
  chain_id?: InputMaybe<Scalars['Int']>;
  entity_id?: InputMaybe<Scalars['String']>;
  entity_type?: InputMaybe<Scalars['entity_type']>;
  log_index?: InputMaybe<Scalars['Int']>;
  params?: InputMaybe<Scalars['json']>;
  previous_block_number?: InputMaybe<Scalars['Int']>;
  previous_block_timestamp?: InputMaybe<Scalars['Int']>;
  previous_chain_id?: InputMaybe<Scalars['Int']>;
  previous_log_index?: InputMaybe<Scalars['Int']>;
};

/** order by sum() on columns of table "entity_history" */
export type entity_history_sum_order_by = {
  block_number?: InputMaybe<order_by>;
  block_timestamp?: InputMaybe<order_by>;
  chain_id?: InputMaybe<order_by>;
  log_index?: InputMaybe<order_by>;
  previous_block_number?: InputMaybe<order_by>;
  previous_block_timestamp?: InputMaybe<order_by>;
  previous_chain_id?: InputMaybe<order_by>;
  previous_log_index?: InputMaybe<order_by>;
};

/** order by var_pop() on columns of table "entity_history" */
export type entity_history_var_pop_order_by = {
  block_number?: InputMaybe<order_by>;
  block_timestamp?: InputMaybe<order_by>;
  chain_id?: InputMaybe<order_by>;
  log_index?: InputMaybe<order_by>;
  previous_block_number?: InputMaybe<order_by>;
  previous_block_timestamp?: InputMaybe<order_by>;
  previous_chain_id?: InputMaybe<order_by>;
  previous_log_index?: InputMaybe<order_by>;
};

/** order by var_samp() on columns of table "entity_history" */
export type entity_history_var_samp_order_by = {
  block_number?: InputMaybe<order_by>;
  block_timestamp?: InputMaybe<order_by>;
  chain_id?: InputMaybe<order_by>;
  log_index?: InputMaybe<order_by>;
  previous_block_number?: InputMaybe<order_by>;
  previous_block_timestamp?: InputMaybe<order_by>;
  previous_chain_id?: InputMaybe<order_by>;
  previous_log_index?: InputMaybe<order_by>;
};

/** order by variance() on columns of table "entity_history" */
export type entity_history_variance_order_by = {
  block_number?: InputMaybe<order_by>;
  block_timestamp?: InputMaybe<order_by>;
  chain_id?: InputMaybe<order_by>;
  log_index?: InputMaybe<order_by>;
  previous_block_number?: InputMaybe<order_by>;
  previous_block_timestamp?: InputMaybe<order_by>;
  previous_chain_id?: InputMaybe<order_by>;
  previous_log_index?: InputMaybe<order_by>;
};

/** Boolean expression to compare columns of type "entity_type". All fields are combined with logical 'AND'. */
export type entity_type_comparison_exp = {
  _eq?: InputMaybe<Scalars['entity_type']>;
  _gt?: InputMaybe<Scalars['entity_type']>;
  _gte?: InputMaybe<Scalars['entity_type']>;
  _in?: InputMaybe<Array<Scalars['entity_type']>>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  _lt?: InputMaybe<Scalars['entity_type']>;
  _lte?: InputMaybe<Scalars['entity_type']>;
  _neq?: InputMaybe<Scalars['entity_type']>;
  _nin?: InputMaybe<Array<Scalars['entity_type']>>;
};

/** columns and relationships of "event_sync_state" */
export type event_sync_state = {
  block_number: Scalars['Int'];
  block_timestamp: Scalars['Int'];
  chain_id: Scalars['Int'];
  log_index: Scalars['Int'];
  transaction_index: Scalars['Int'];
};

/** Boolean expression to filter rows from the table "event_sync_state". All fields are combined with a logical 'AND'. */
export type event_sync_state_bool_exp = {
  _and?: InputMaybe<Array<event_sync_state_bool_exp>>;
  _not?: InputMaybe<event_sync_state_bool_exp>;
  _or?: InputMaybe<Array<event_sync_state_bool_exp>>;
  block_number?: InputMaybe<Int_comparison_exp>;
  block_timestamp?: InputMaybe<Int_comparison_exp>;
  chain_id?: InputMaybe<Int_comparison_exp>;
  log_index?: InputMaybe<Int_comparison_exp>;
  transaction_index?: InputMaybe<Int_comparison_exp>;
};

/** Ordering options when selecting data from "event_sync_state". */
export type event_sync_state_order_by = {
  block_number?: InputMaybe<order_by>;
  block_timestamp?: InputMaybe<order_by>;
  chain_id?: InputMaybe<order_by>;
  log_index?: InputMaybe<order_by>;
  transaction_index?: InputMaybe<order_by>;
};

/** select columns of table "event_sync_state" */
export type event_sync_state_select_column =
  /** column name */
  | 'block_number'
  /** column name */
  | 'block_timestamp'
  /** column name */
  | 'chain_id'
  /** column name */
  | 'log_index'
  /** column name */
  | 'transaction_index';

/** Streaming cursor of the table "event_sync_state" */
export type event_sync_state_stream_cursor_input = {
  /** Stream column input with initial value */
  initial_value: event_sync_state_stream_cursor_value_input;
  /** cursor ordering */
  ordering?: InputMaybe<cursor_ordering>;
};

/** Initial value of the column from where the streaming should start */
export type event_sync_state_stream_cursor_value_input = {
  block_number?: InputMaybe<Scalars['Int']>;
  block_timestamp?: InputMaybe<Scalars['Int']>;
  chain_id?: InputMaybe<Scalars['Int']>;
  log_index?: InputMaybe<Scalars['Int']>;
  transaction_index?: InputMaybe<Scalars['Int']>;
};

/** Boolean expression to compare columns of type "event_type". All fields are combined with logical 'AND'. */
export type event_type_comparison_exp = {
  _eq?: InputMaybe<Scalars['event_type']>;
  _gt?: InputMaybe<Scalars['event_type']>;
  _gte?: InputMaybe<Scalars['event_type']>;
  _in?: InputMaybe<Array<Scalars['event_type']>>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  _lt?: InputMaybe<Scalars['event_type']>;
  _lte?: InputMaybe<Scalars['event_type']>;
  _neq?: InputMaybe<Scalars['event_type']>;
  _nin?: InputMaybe<Array<Scalars['event_type']>>;
};

export type get_entity_history_filter_args = {
  end_block?: InputMaybe<Scalars['Int']>;
  end_chain_id?: InputMaybe<Scalars['Int']>;
  end_log_index?: InputMaybe<Scalars['Int']>;
  end_timestamp?: InputMaybe<Scalars['Int']>;
  start_block?: InputMaybe<Scalars['Int']>;
  start_chain_id?: InputMaybe<Scalars['Int']>;
  start_log_index?: InputMaybe<Scalars['Int']>;
  start_timestamp?: InputMaybe<Scalars['Int']>;
};

/** Boolean expression to compare columns of type "json". All fields are combined with logical 'AND'. */
export type json_comparison_exp = {
  _eq?: InputMaybe<Scalars['json']>;
  _gt?: InputMaybe<Scalars['json']>;
  _gte?: InputMaybe<Scalars['json']>;
  _in?: InputMaybe<Array<Scalars['json']>>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  _lt?: InputMaybe<Scalars['json']>;
  _lte?: InputMaybe<Scalars['json']>;
  _neq?: InputMaybe<Scalars['json']>;
  _nin?: InputMaybe<Array<Scalars['json']>>;
};

/** Boolean expression to compare columns of type "numeric". All fields are combined with logical 'AND'. */
export type numeric_comparison_exp = {
  _eq?: InputMaybe<Scalars['numeric']>;
  _gt?: InputMaybe<Scalars['numeric']>;
  _gte?: InputMaybe<Scalars['numeric']>;
  _in?: InputMaybe<Array<Scalars['numeric']>>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  _lt?: InputMaybe<Scalars['numeric']>;
  _lte?: InputMaybe<Scalars['numeric']>;
  _neq?: InputMaybe<Scalars['numeric']>;
  _nin?: InputMaybe<Array<Scalars['numeric']>>;
};

/** column ordering options */
export type order_by =
  /** in ascending order, nulls last */
  | 'asc'
  /** in ascending order, nulls first */
  | 'asc_nulls_first'
  /** in ascending order, nulls last */
  | 'asc_nulls_last'
  /** in descending order, nulls first */
  | 'desc'
  /** in descending order, nulls first */
  | 'desc_nulls_first'
  /** in descending order, nulls last */
  | 'desc_nulls_last';

/** columns and relationships of "persisted_state" */
export type persisted_state = {
  abi_files_hash: Scalars['String'];
  config_hash: Scalars['String'];
  envio_version: Scalars['String'];
  handler_files_hash: Scalars['String'];
  id: Scalars['Int'];
  schema_hash: Scalars['String'];
};

/** Boolean expression to filter rows from the table "persisted_state". All fields are combined with a logical 'AND'. */
export type persisted_state_bool_exp = {
  _and?: InputMaybe<Array<persisted_state_bool_exp>>;
  _not?: InputMaybe<persisted_state_bool_exp>;
  _or?: InputMaybe<Array<persisted_state_bool_exp>>;
  abi_files_hash?: InputMaybe<String_comparison_exp>;
  config_hash?: InputMaybe<String_comparison_exp>;
  envio_version?: InputMaybe<String_comparison_exp>;
  handler_files_hash?: InputMaybe<String_comparison_exp>;
  id?: InputMaybe<Int_comparison_exp>;
  schema_hash?: InputMaybe<String_comparison_exp>;
};

/** Ordering options when selecting data from "persisted_state". */
export type persisted_state_order_by = {
  abi_files_hash?: InputMaybe<order_by>;
  config_hash?: InputMaybe<order_by>;
  envio_version?: InputMaybe<order_by>;
  handler_files_hash?: InputMaybe<order_by>;
  id?: InputMaybe<order_by>;
  schema_hash?: InputMaybe<order_by>;
};

/** select columns of table "persisted_state" */
export type persisted_state_select_column =
  /** column name */
  | 'abi_files_hash'
  /** column name */
  | 'config_hash'
  /** column name */
  | 'envio_version'
  /** column name */
  | 'handler_files_hash'
  /** column name */
  | 'id'
  /** column name */
  | 'schema_hash';

/** Streaming cursor of the table "persisted_state" */
export type persisted_state_stream_cursor_input = {
  /** Stream column input with initial value */
  initial_value: persisted_state_stream_cursor_value_input;
  /** cursor ordering */
  ordering?: InputMaybe<cursor_ordering>;
};

/** Initial value of the column from where the streaming should start */
export type persisted_state_stream_cursor_value_input = {
  abi_files_hash?: InputMaybe<Scalars['String']>;
  config_hash?: InputMaybe<Scalars['String']>;
  envio_version?: InputMaybe<Scalars['String']>;
  handler_files_hash?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['Int']>;
  schema_hash?: InputMaybe<Scalars['String']>;
};

export type query_root = {
  /** fetch data from the table: "GMInitParams" */
  GMInitParams: Array<GMInitParams>;
  /** fetch data from the table: "GMInitParams" using primary key columns */
  GMInitParams_by_pk?: Maybe<GMInitParams>;
  /** fetch data from the table: "GameManager" */
  GameManager: Array<GameManager>;
  /** fetch data from the table: "GameManagerFactory" */
  GameManagerFactory: Array<GameManagerFactory>;
  /** fetch data from the table: "GameManagerFactory" using primary key columns */
  GameManagerFactory_by_pk?: Maybe<GameManagerFactory>;
  /** fetch data from the table: "GameManagerTemplate" */
  GameManagerTemplate: Array<GameManagerTemplate>;
  /** fetch data from the table: "GameManagerTemplate" using primary key columns */
  GameManagerTemplate_by_pk?: Maybe<GameManagerTemplate>;
  /** fetch data from the table: "GameManager" using primary key columns */
  GameManager_by_pk?: Maybe<GameManager>;
  /** fetch data from the table: "GameRound" */
  GameRound: Array<GameRound>;
  /** fetch data from the table: "GameRound" using primary key columns */
  GameRound_by_pk?: Maybe<GameRound>;
  /** fetch data from the table: "Grant" */
  Grant: Array<Grant>;
  /** fetch data from the table: "GrantShip" */
  GrantShip: Array<GrantShip>;
  /** fetch data from the table: "GrantShip" using primary key columns */
  GrantShip_by_pk?: Maybe<GrantShip>;
  /** fetch data from the table: "Grant" using primary key columns */
  Grant_by_pk?: Maybe<Grant>;
  /** fetch data from the table: "ProfileIdToAnchor" */
  ProfileIdToAnchor: Array<ProfileIdToAnchor>;
  /** fetch data from the table: "ProfileIdToAnchor" using primary key columns */
  ProfileIdToAnchor_by_pk?: Maybe<ProfileIdToAnchor>;
  /** fetch data from the table: "ProfileMemberGroup" */
  ProfileMemberGroup: Array<ProfileMemberGroup>;
  /** fetch data from the table: "ProfileMemberGroup" using primary key columns */
  ProfileMemberGroup_by_pk?: Maybe<ProfileMemberGroup>;
  /** fetch data from the table: "Project" */
  Project: Array<Project>;
  /** fetch data from the table: "Project" using primary key columns */
  Project_by_pk?: Maybe<Project>;
  /** fetch data from the table: "RawMetadata" */
  RawMetadata: Array<RawMetadata>;
  /** fetch data from the table: "RawMetadata" using primary key columns */
  RawMetadata_by_pk?: Maybe<RawMetadata>;
  /** fetch data from the table: "Test" */
  Test: Array<Test>;
  /** fetch data from the table: "Test" using primary key columns */
  Test_by_pk?: Maybe<Test>;
  /** fetch data from the table: "chain_metadata" */
  chain_metadata: Array<chain_metadata>;
  /** fetch data from the table: "chain_metadata" using primary key columns */
  chain_metadata_by_pk?: Maybe<chain_metadata>;
  /** fetch data from the table: "dynamic_contract_registry" */
  dynamic_contract_registry: Array<dynamic_contract_registry>;
  /** fetch data from the table: "dynamic_contract_registry" using primary key columns */
  dynamic_contract_registry_by_pk?: Maybe<dynamic_contract_registry>;
  /** fetch data from the table: "entity_history" */
  entity_history: Array<entity_history>;
  /** fetch data from the table: "entity_history" using primary key columns */
  entity_history_by_pk?: Maybe<entity_history>;
  /** fetch data from the table: "entity_history_filter" */
  entity_history_filter: Array<entity_history_filter>;
  /** fetch data from the table: "entity_history_filter" using primary key columns */
  entity_history_filter_by_pk?: Maybe<entity_history_filter>;
  /** fetch data from the table: "event_sync_state" */
  event_sync_state: Array<event_sync_state>;
  /** fetch data from the table: "event_sync_state" using primary key columns */
  event_sync_state_by_pk?: Maybe<event_sync_state>;
  /** This function helps search for articles */
  get_entity_history_filter: Array<entity_history_filter>;
  /** fetch data from the table: "persisted_state" */
  persisted_state: Array<persisted_state>;
  /** fetch data from the table: "persisted_state" using primary key columns */
  persisted_state_by_pk?: Maybe<persisted_state>;
  /** fetch data from the table: "raw_events" */
  raw_events: Array<raw_events>;
  /** fetch data from the table: "raw_events" using primary key columns */
  raw_events_by_pk?: Maybe<raw_events>;
};


export type query_rootGMInitParamsArgs = {
  distinct_on?: InputMaybe<Array<GMInitParams_select_column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<GMInitParams_order_by>>;
  where?: InputMaybe<GMInitParams_bool_exp>;
};


export type query_rootGMInitParams_by_pkArgs = {
  id: Scalars['String'];
};


export type query_rootGameManagerArgs = {
  distinct_on?: InputMaybe<Array<GameManager_select_column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<GameManager_order_by>>;
  where?: InputMaybe<GameManager_bool_exp>;
};


export type query_rootGameManagerFactoryArgs = {
  distinct_on?: InputMaybe<Array<GameManagerFactory_select_column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<GameManagerFactory_order_by>>;
  where?: InputMaybe<GameManagerFactory_bool_exp>;
};


export type query_rootGameManagerFactory_by_pkArgs = {
  id: Scalars['String'];
};


export type query_rootGameManagerTemplateArgs = {
  distinct_on?: InputMaybe<Array<GameManagerTemplate_select_column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<GameManagerTemplate_order_by>>;
  where?: InputMaybe<GameManagerTemplate_bool_exp>;
};


export type query_rootGameManagerTemplate_by_pkArgs = {
  id: Scalars['String'];
};


export type query_rootGameManager_by_pkArgs = {
  id: Scalars['String'];
};


export type query_rootGameRoundArgs = {
  distinct_on?: InputMaybe<Array<GameRound_select_column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<GameRound_order_by>>;
  where?: InputMaybe<GameRound_bool_exp>;
};


export type query_rootGameRound_by_pkArgs = {
  id: Scalars['String'];
};


export type query_rootGrantArgs = {
  distinct_on?: InputMaybe<Array<Grant_select_column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Grant_order_by>>;
  where?: InputMaybe<Grant_bool_exp>;
};


export type query_rootGrantShipArgs = {
  distinct_on?: InputMaybe<Array<GrantShip_select_column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<GrantShip_order_by>>;
  where?: InputMaybe<GrantShip_bool_exp>;
};


export type query_rootGrantShip_by_pkArgs = {
  id: Scalars['String'];
};


export type query_rootGrant_by_pkArgs = {
  id: Scalars['String'];
};


export type query_rootProfileIdToAnchorArgs = {
  distinct_on?: InputMaybe<Array<ProfileIdToAnchor_select_column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<ProfileIdToAnchor_order_by>>;
  where?: InputMaybe<ProfileIdToAnchor_bool_exp>;
};


export type query_rootProfileIdToAnchor_by_pkArgs = {
  id: Scalars['String'];
};


export type query_rootProfileMemberGroupArgs = {
  distinct_on?: InputMaybe<Array<ProfileMemberGroup_select_column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<ProfileMemberGroup_order_by>>;
  where?: InputMaybe<ProfileMemberGroup_bool_exp>;
};


export type query_rootProfileMemberGroup_by_pkArgs = {
  id: Scalars['String'];
};


export type query_rootProjectArgs = {
  distinct_on?: InputMaybe<Array<Project_select_column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Project_order_by>>;
  where?: InputMaybe<Project_bool_exp>;
};


export type query_rootProject_by_pkArgs = {
  id: Scalars['String'];
};


export type query_rootRawMetadataArgs = {
  distinct_on?: InputMaybe<Array<RawMetadata_select_column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<RawMetadata_order_by>>;
  where?: InputMaybe<RawMetadata_bool_exp>;
};


export type query_rootRawMetadata_by_pkArgs = {
  id: Scalars['String'];
};


export type query_rootTestArgs = {
  distinct_on?: InputMaybe<Array<Test_select_column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Test_order_by>>;
  where?: InputMaybe<Test_bool_exp>;
};


export type query_rootTest_by_pkArgs = {
  id: Scalars['String'];
};


export type query_rootchain_metadataArgs = {
  distinct_on?: InputMaybe<Array<chain_metadata_select_column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<chain_metadata_order_by>>;
  where?: InputMaybe<chain_metadata_bool_exp>;
};


export type query_rootchain_metadata_by_pkArgs = {
  chain_id: Scalars['Int'];
};


export type query_rootdynamic_contract_registryArgs = {
  distinct_on?: InputMaybe<Array<dynamic_contract_registry_select_column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<dynamic_contract_registry_order_by>>;
  where?: InputMaybe<dynamic_contract_registry_bool_exp>;
};


export type query_rootdynamic_contract_registry_by_pkArgs = {
  chain_id: Scalars['Int'];
  contract_address: Scalars['String'];
};


export type query_rootentity_historyArgs = {
  distinct_on?: InputMaybe<Array<entity_history_select_column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<entity_history_order_by>>;
  where?: InputMaybe<entity_history_bool_exp>;
};


export type query_rootentity_history_by_pkArgs = {
  block_number: Scalars['Int'];
  block_timestamp: Scalars['Int'];
  chain_id: Scalars['Int'];
  entity_id: Scalars['String'];
  entity_type: Scalars['entity_type'];
  log_index: Scalars['Int'];
};


export type query_rootentity_history_filterArgs = {
  distinct_on?: InputMaybe<Array<entity_history_filter_select_column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<entity_history_filter_order_by>>;
  where?: InputMaybe<entity_history_filter_bool_exp>;
};


export type query_rootentity_history_filter_by_pkArgs = {
  block_number: Scalars['Int'];
  chain_id: Scalars['Int'];
  entity_id: Scalars['String'];
  log_index: Scalars['Int'];
  previous_block_number: Scalars['Int'];
  previous_log_index: Scalars['Int'];
};


export type query_rootevent_sync_stateArgs = {
  distinct_on?: InputMaybe<Array<event_sync_state_select_column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<event_sync_state_order_by>>;
  where?: InputMaybe<event_sync_state_bool_exp>;
};


export type query_rootevent_sync_state_by_pkArgs = {
  chain_id: Scalars['Int'];
};


export type query_rootget_entity_history_filterArgs = {
  args: get_entity_history_filter_args;
  distinct_on?: InputMaybe<Array<entity_history_filter_select_column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<entity_history_filter_order_by>>;
  where?: InputMaybe<entity_history_filter_bool_exp>;
};


export type query_rootpersisted_stateArgs = {
  distinct_on?: InputMaybe<Array<persisted_state_select_column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<persisted_state_order_by>>;
  where?: InputMaybe<persisted_state_bool_exp>;
};


export type query_rootpersisted_state_by_pkArgs = {
  id: Scalars['Int'];
};


export type query_rootraw_eventsArgs = {
  distinct_on?: InputMaybe<Array<raw_events_select_column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<raw_events_order_by>>;
  where?: InputMaybe<raw_events_bool_exp>;
};


export type query_rootraw_events_by_pkArgs = {
  chain_id: Scalars['Int'];
  event_id: Scalars['numeric'];
};

/** columns and relationships of "raw_events" */
export type raw_events = {
  block_hash: Scalars['String'];
  block_number: Scalars['Int'];
  block_timestamp: Scalars['Int'];
  chain_id: Scalars['Int'];
  db_write_timestamp?: Maybe<Scalars['timestamp']>;
  /** An array relationship */
  event_history: Array<entity_history>;
  event_id: Scalars['numeric'];
  event_type: Scalars['event_type'];
  log_index: Scalars['Int'];
  params: Scalars['json'];
  src_address: Scalars['String'];
  transaction_hash: Scalars['String'];
  transaction_index: Scalars['Int'];
};


/** columns and relationships of "raw_events" */
export type raw_eventsevent_historyArgs = {
  distinct_on?: InputMaybe<Array<entity_history_select_column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<entity_history_order_by>>;
  where?: InputMaybe<entity_history_bool_exp>;
};


/** columns and relationships of "raw_events" */
export type raw_eventsparamsArgs = {
  path?: InputMaybe<Scalars['String']>;
};

/** Boolean expression to filter rows from the table "raw_events". All fields are combined with a logical 'AND'. */
export type raw_events_bool_exp = {
  _and?: InputMaybe<Array<raw_events_bool_exp>>;
  _not?: InputMaybe<raw_events_bool_exp>;
  _or?: InputMaybe<Array<raw_events_bool_exp>>;
  block_hash?: InputMaybe<String_comparison_exp>;
  block_number?: InputMaybe<Int_comparison_exp>;
  block_timestamp?: InputMaybe<Int_comparison_exp>;
  chain_id?: InputMaybe<Int_comparison_exp>;
  db_write_timestamp?: InputMaybe<timestamp_comparison_exp>;
  event_history?: InputMaybe<entity_history_bool_exp>;
  event_id?: InputMaybe<numeric_comparison_exp>;
  event_type?: InputMaybe<event_type_comparison_exp>;
  log_index?: InputMaybe<Int_comparison_exp>;
  params?: InputMaybe<json_comparison_exp>;
  src_address?: InputMaybe<String_comparison_exp>;
  transaction_hash?: InputMaybe<String_comparison_exp>;
  transaction_index?: InputMaybe<Int_comparison_exp>;
};

/** Ordering options when selecting data from "raw_events". */
export type raw_events_order_by = {
  block_hash?: InputMaybe<order_by>;
  block_number?: InputMaybe<order_by>;
  block_timestamp?: InputMaybe<order_by>;
  chain_id?: InputMaybe<order_by>;
  db_write_timestamp?: InputMaybe<order_by>;
  event_history_aggregate?: InputMaybe<entity_history_aggregate_order_by>;
  event_id?: InputMaybe<order_by>;
  event_type?: InputMaybe<order_by>;
  log_index?: InputMaybe<order_by>;
  params?: InputMaybe<order_by>;
  src_address?: InputMaybe<order_by>;
  transaction_hash?: InputMaybe<order_by>;
  transaction_index?: InputMaybe<order_by>;
};

/** select columns of table "raw_events" */
export type raw_events_select_column =
  /** column name */
  | 'block_hash'
  /** column name */
  | 'block_number'
  /** column name */
  | 'block_timestamp'
  /** column name */
  | 'chain_id'
  /** column name */
  | 'db_write_timestamp'
  /** column name */
  | 'event_id'
  /** column name */
  | 'event_type'
  /** column name */
  | 'log_index'
  /** column name */
  | 'params'
  /** column name */
  | 'src_address'
  /** column name */
  | 'transaction_hash'
  /** column name */
  | 'transaction_index';

/** Streaming cursor of the table "raw_events" */
export type raw_events_stream_cursor_input = {
  /** Stream column input with initial value */
  initial_value: raw_events_stream_cursor_value_input;
  /** cursor ordering */
  ordering?: InputMaybe<cursor_ordering>;
};

/** Initial value of the column from where the streaming should start */
export type raw_events_stream_cursor_value_input = {
  block_hash?: InputMaybe<Scalars['String']>;
  block_number?: InputMaybe<Scalars['Int']>;
  block_timestamp?: InputMaybe<Scalars['Int']>;
  chain_id?: InputMaybe<Scalars['Int']>;
  db_write_timestamp?: InputMaybe<Scalars['timestamp']>;
  event_id?: InputMaybe<Scalars['numeric']>;
  event_type?: InputMaybe<Scalars['event_type']>;
  log_index?: InputMaybe<Scalars['Int']>;
  params?: InputMaybe<Scalars['json']>;
  src_address?: InputMaybe<Scalars['String']>;
  transaction_hash?: InputMaybe<Scalars['String']>;
  transaction_index?: InputMaybe<Scalars['Int']>;
};

export type subscription_root = {
  /** fetch data from the table: "GMInitParams" */
  GMInitParams: Array<GMInitParams>;
  /** fetch data from the table: "GMInitParams" using primary key columns */
  GMInitParams_by_pk?: Maybe<GMInitParams>;
  /** fetch data from the table in a streaming manner: "GMInitParams" */
  GMInitParams_stream: Array<GMInitParams>;
  /** fetch data from the table: "GameManager" */
  GameManager: Array<GameManager>;
  /** fetch data from the table: "GameManagerFactory" */
  GameManagerFactory: Array<GameManagerFactory>;
  /** fetch data from the table: "GameManagerFactory" using primary key columns */
  GameManagerFactory_by_pk?: Maybe<GameManagerFactory>;
  /** fetch data from the table in a streaming manner: "GameManagerFactory" */
  GameManagerFactory_stream: Array<GameManagerFactory>;
  /** fetch data from the table: "GameManagerTemplate" */
  GameManagerTemplate: Array<GameManagerTemplate>;
  /** fetch data from the table: "GameManagerTemplate" using primary key columns */
  GameManagerTemplate_by_pk?: Maybe<GameManagerTemplate>;
  /** fetch data from the table in a streaming manner: "GameManagerTemplate" */
  GameManagerTemplate_stream: Array<GameManagerTemplate>;
  /** fetch data from the table: "GameManager" using primary key columns */
  GameManager_by_pk?: Maybe<GameManager>;
  /** fetch data from the table in a streaming manner: "GameManager" */
  GameManager_stream: Array<GameManager>;
  /** fetch data from the table: "GameRound" */
  GameRound: Array<GameRound>;
  /** fetch data from the table: "GameRound" using primary key columns */
  GameRound_by_pk?: Maybe<GameRound>;
  /** fetch data from the table in a streaming manner: "GameRound" */
  GameRound_stream: Array<GameRound>;
  /** fetch data from the table: "Grant" */
  Grant: Array<Grant>;
  /** fetch data from the table: "GrantShip" */
  GrantShip: Array<GrantShip>;
  /** fetch data from the table: "GrantShip" using primary key columns */
  GrantShip_by_pk?: Maybe<GrantShip>;
  /** fetch data from the table in a streaming manner: "GrantShip" */
  GrantShip_stream: Array<GrantShip>;
  /** fetch data from the table: "Grant" using primary key columns */
  Grant_by_pk?: Maybe<Grant>;
  /** fetch data from the table in a streaming manner: "Grant" */
  Grant_stream: Array<Grant>;
  /** fetch data from the table: "ProfileIdToAnchor" */
  ProfileIdToAnchor: Array<ProfileIdToAnchor>;
  /** fetch data from the table: "ProfileIdToAnchor" using primary key columns */
  ProfileIdToAnchor_by_pk?: Maybe<ProfileIdToAnchor>;
  /** fetch data from the table in a streaming manner: "ProfileIdToAnchor" */
  ProfileIdToAnchor_stream: Array<ProfileIdToAnchor>;
  /** fetch data from the table: "ProfileMemberGroup" */
  ProfileMemberGroup: Array<ProfileMemberGroup>;
  /** fetch data from the table: "ProfileMemberGroup" using primary key columns */
  ProfileMemberGroup_by_pk?: Maybe<ProfileMemberGroup>;
  /** fetch data from the table in a streaming manner: "ProfileMemberGroup" */
  ProfileMemberGroup_stream: Array<ProfileMemberGroup>;
  /** fetch data from the table: "Project" */
  Project: Array<Project>;
  /** fetch data from the table: "Project" using primary key columns */
  Project_by_pk?: Maybe<Project>;
  /** fetch data from the table in a streaming manner: "Project" */
  Project_stream: Array<Project>;
  /** fetch data from the table: "RawMetadata" */
  RawMetadata: Array<RawMetadata>;
  /** fetch data from the table: "RawMetadata" using primary key columns */
  RawMetadata_by_pk?: Maybe<RawMetadata>;
  /** fetch data from the table in a streaming manner: "RawMetadata" */
  RawMetadata_stream: Array<RawMetadata>;
  /** fetch data from the table: "Test" */
  Test: Array<Test>;
  /** fetch data from the table: "Test" using primary key columns */
  Test_by_pk?: Maybe<Test>;
  /** fetch data from the table in a streaming manner: "Test" */
  Test_stream: Array<Test>;
  /** fetch data from the table: "chain_metadata" */
  chain_metadata: Array<chain_metadata>;
  /** fetch data from the table: "chain_metadata" using primary key columns */
  chain_metadata_by_pk?: Maybe<chain_metadata>;
  /** fetch data from the table in a streaming manner: "chain_metadata" */
  chain_metadata_stream: Array<chain_metadata>;
  /** fetch data from the table: "dynamic_contract_registry" */
  dynamic_contract_registry: Array<dynamic_contract_registry>;
  /** fetch data from the table: "dynamic_contract_registry" using primary key columns */
  dynamic_contract_registry_by_pk?: Maybe<dynamic_contract_registry>;
  /** fetch data from the table in a streaming manner: "dynamic_contract_registry" */
  dynamic_contract_registry_stream: Array<dynamic_contract_registry>;
  /** fetch data from the table: "entity_history" */
  entity_history: Array<entity_history>;
  /** fetch data from the table: "entity_history" using primary key columns */
  entity_history_by_pk?: Maybe<entity_history>;
  /** fetch data from the table: "entity_history_filter" */
  entity_history_filter: Array<entity_history_filter>;
  /** fetch data from the table: "entity_history_filter" using primary key columns */
  entity_history_filter_by_pk?: Maybe<entity_history_filter>;
  /** fetch data from the table in a streaming manner: "entity_history_filter" */
  entity_history_filter_stream: Array<entity_history_filter>;
  /** fetch data from the table in a streaming manner: "entity_history" */
  entity_history_stream: Array<entity_history>;
  /** fetch data from the table: "event_sync_state" */
  event_sync_state: Array<event_sync_state>;
  /** fetch data from the table: "event_sync_state" using primary key columns */
  event_sync_state_by_pk?: Maybe<event_sync_state>;
  /** fetch data from the table in a streaming manner: "event_sync_state" */
  event_sync_state_stream: Array<event_sync_state>;
  /** This function helps search for articles */
  get_entity_history_filter: Array<entity_history_filter>;
  /** fetch data from the table: "persisted_state" */
  persisted_state: Array<persisted_state>;
  /** fetch data from the table: "persisted_state" using primary key columns */
  persisted_state_by_pk?: Maybe<persisted_state>;
  /** fetch data from the table in a streaming manner: "persisted_state" */
  persisted_state_stream: Array<persisted_state>;
  /** fetch data from the table: "raw_events" */
  raw_events: Array<raw_events>;
  /** fetch data from the table: "raw_events" using primary key columns */
  raw_events_by_pk?: Maybe<raw_events>;
  /** fetch data from the table in a streaming manner: "raw_events" */
  raw_events_stream: Array<raw_events>;
};


export type subscription_rootGMInitParamsArgs = {
  distinct_on?: InputMaybe<Array<GMInitParams_select_column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<GMInitParams_order_by>>;
  where?: InputMaybe<GMInitParams_bool_exp>;
};


export type subscription_rootGMInitParams_by_pkArgs = {
  id: Scalars['String'];
};


export type subscription_rootGMInitParams_streamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<GMInitParams_stream_cursor_input>>;
  where?: InputMaybe<GMInitParams_bool_exp>;
};


export type subscription_rootGameManagerArgs = {
  distinct_on?: InputMaybe<Array<GameManager_select_column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<GameManager_order_by>>;
  where?: InputMaybe<GameManager_bool_exp>;
};


export type subscription_rootGameManagerFactoryArgs = {
  distinct_on?: InputMaybe<Array<GameManagerFactory_select_column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<GameManagerFactory_order_by>>;
  where?: InputMaybe<GameManagerFactory_bool_exp>;
};


export type subscription_rootGameManagerFactory_by_pkArgs = {
  id: Scalars['String'];
};


export type subscription_rootGameManagerFactory_streamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<GameManagerFactory_stream_cursor_input>>;
  where?: InputMaybe<GameManagerFactory_bool_exp>;
};


export type subscription_rootGameManagerTemplateArgs = {
  distinct_on?: InputMaybe<Array<GameManagerTemplate_select_column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<GameManagerTemplate_order_by>>;
  where?: InputMaybe<GameManagerTemplate_bool_exp>;
};


export type subscription_rootGameManagerTemplate_by_pkArgs = {
  id: Scalars['String'];
};


export type subscription_rootGameManagerTemplate_streamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<GameManagerTemplate_stream_cursor_input>>;
  where?: InputMaybe<GameManagerTemplate_bool_exp>;
};


export type subscription_rootGameManager_by_pkArgs = {
  id: Scalars['String'];
};


export type subscription_rootGameManager_streamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<GameManager_stream_cursor_input>>;
  where?: InputMaybe<GameManager_bool_exp>;
};


export type subscription_rootGameRoundArgs = {
  distinct_on?: InputMaybe<Array<GameRound_select_column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<GameRound_order_by>>;
  where?: InputMaybe<GameRound_bool_exp>;
};


export type subscription_rootGameRound_by_pkArgs = {
  id: Scalars['String'];
};


export type subscription_rootGameRound_streamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<GameRound_stream_cursor_input>>;
  where?: InputMaybe<GameRound_bool_exp>;
};


export type subscription_rootGrantArgs = {
  distinct_on?: InputMaybe<Array<Grant_select_column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Grant_order_by>>;
  where?: InputMaybe<Grant_bool_exp>;
};


export type subscription_rootGrantShipArgs = {
  distinct_on?: InputMaybe<Array<GrantShip_select_column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<GrantShip_order_by>>;
  where?: InputMaybe<GrantShip_bool_exp>;
};


export type subscription_rootGrantShip_by_pkArgs = {
  id: Scalars['String'];
};


export type subscription_rootGrantShip_streamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<GrantShip_stream_cursor_input>>;
  where?: InputMaybe<GrantShip_bool_exp>;
};


export type subscription_rootGrant_by_pkArgs = {
  id: Scalars['String'];
};


export type subscription_rootGrant_streamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<Grant_stream_cursor_input>>;
  where?: InputMaybe<Grant_bool_exp>;
};


export type subscription_rootProfileIdToAnchorArgs = {
  distinct_on?: InputMaybe<Array<ProfileIdToAnchor_select_column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<ProfileIdToAnchor_order_by>>;
  where?: InputMaybe<ProfileIdToAnchor_bool_exp>;
};


export type subscription_rootProfileIdToAnchor_by_pkArgs = {
  id: Scalars['String'];
};


export type subscription_rootProfileIdToAnchor_streamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<ProfileIdToAnchor_stream_cursor_input>>;
  where?: InputMaybe<ProfileIdToAnchor_bool_exp>;
};


export type subscription_rootProfileMemberGroupArgs = {
  distinct_on?: InputMaybe<Array<ProfileMemberGroup_select_column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<ProfileMemberGroup_order_by>>;
  where?: InputMaybe<ProfileMemberGroup_bool_exp>;
};


export type subscription_rootProfileMemberGroup_by_pkArgs = {
  id: Scalars['String'];
};


export type subscription_rootProfileMemberGroup_streamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<ProfileMemberGroup_stream_cursor_input>>;
  where?: InputMaybe<ProfileMemberGroup_bool_exp>;
};


export type subscription_rootProjectArgs = {
  distinct_on?: InputMaybe<Array<Project_select_column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Project_order_by>>;
  where?: InputMaybe<Project_bool_exp>;
};


export type subscription_rootProject_by_pkArgs = {
  id: Scalars['String'];
};


export type subscription_rootProject_streamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<Project_stream_cursor_input>>;
  where?: InputMaybe<Project_bool_exp>;
};


export type subscription_rootRawMetadataArgs = {
  distinct_on?: InputMaybe<Array<RawMetadata_select_column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<RawMetadata_order_by>>;
  where?: InputMaybe<RawMetadata_bool_exp>;
};


export type subscription_rootRawMetadata_by_pkArgs = {
  id: Scalars['String'];
};


export type subscription_rootRawMetadata_streamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<RawMetadata_stream_cursor_input>>;
  where?: InputMaybe<RawMetadata_bool_exp>;
};


export type subscription_rootTestArgs = {
  distinct_on?: InputMaybe<Array<Test_select_column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Test_order_by>>;
  where?: InputMaybe<Test_bool_exp>;
};


export type subscription_rootTest_by_pkArgs = {
  id: Scalars['String'];
};


export type subscription_rootTest_streamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<Test_stream_cursor_input>>;
  where?: InputMaybe<Test_bool_exp>;
};


export type subscription_rootchain_metadataArgs = {
  distinct_on?: InputMaybe<Array<chain_metadata_select_column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<chain_metadata_order_by>>;
  where?: InputMaybe<chain_metadata_bool_exp>;
};


export type subscription_rootchain_metadata_by_pkArgs = {
  chain_id: Scalars['Int'];
};


export type subscription_rootchain_metadata_streamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<chain_metadata_stream_cursor_input>>;
  where?: InputMaybe<chain_metadata_bool_exp>;
};


export type subscription_rootdynamic_contract_registryArgs = {
  distinct_on?: InputMaybe<Array<dynamic_contract_registry_select_column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<dynamic_contract_registry_order_by>>;
  where?: InputMaybe<dynamic_contract_registry_bool_exp>;
};


export type subscription_rootdynamic_contract_registry_by_pkArgs = {
  chain_id: Scalars['Int'];
  contract_address: Scalars['String'];
};


export type subscription_rootdynamic_contract_registry_streamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<dynamic_contract_registry_stream_cursor_input>>;
  where?: InputMaybe<dynamic_contract_registry_bool_exp>;
};


export type subscription_rootentity_historyArgs = {
  distinct_on?: InputMaybe<Array<entity_history_select_column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<entity_history_order_by>>;
  where?: InputMaybe<entity_history_bool_exp>;
};


export type subscription_rootentity_history_by_pkArgs = {
  block_number: Scalars['Int'];
  block_timestamp: Scalars['Int'];
  chain_id: Scalars['Int'];
  entity_id: Scalars['String'];
  entity_type: Scalars['entity_type'];
  log_index: Scalars['Int'];
};


export type subscription_rootentity_history_filterArgs = {
  distinct_on?: InputMaybe<Array<entity_history_filter_select_column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<entity_history_filter_order_by>>;
  where?: InputMaybe<entity_history_filter_bool_exp>;
};


export type subscription_rootentity_history_filter_by_pkArgs = {
  block_number: Scalars['Int'];
  chain_id: Scalars['Int'];
  entity_id: Scalars['String'];
  log_index: Scalars['Int'];
  previous_block_number: Scalars['Int'];
  previous_log_index: Scalars['Int'];
};


export type subscription_rootentity_history_filter_streamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<entity_history_filter_stream_cursor_input>>;
  where?: InputMaybe<entity_history_filter_bool_exp>;
};


export type subscription_rootentity_history_streamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<entity_history_stream_cursor_input>>;
  where?: InputMaybe<entity_history_bool_exp>;
};


export type subscription_rootevent_sync_stateArgs = {
  distinct_on?: InputMaybe<Array<event_sync_state_select_column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<event_sync_state_order_by>>;
  where?: InputMaybe<event_sync_state_bool_exp>;
};


export type subscription_rootevent_sync_state_by_pkArgs = {
  chain_id: Scalars['Int'];
};


export type subscription_rootevent_sync_state_streamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<event_sync_state_stream_cursor_input>>;
  where?: InputMaybe<event_sync_state_bool_exp>;
};


export type subscription_rootget_entity_history_filterArgs = {
  args: get_entity_history_filter_args;
  distinct_on?: InputMaybe<Array<entity_history_filter_select_column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<entity_history_filter_order_by>>;
  where?: InputMaybe<entity_history_filter_bool_exp>;
};


export type subscription_rootpersisted_stateArgs = {
  distinct_on?: InputMaybe<Array<persisted_state_select_column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<persisted_state_order_by>>;
  where?: InputMaybe<persisted_state_bool_exp>;
};


export type subscription_rootpersisted_state_by_pkArgs = {
  id: Scalars['Int'];
};


export type subscription_rootpersisted_state_streamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<persisted_state_stream_cursor_input>>;
  where?: InputMaybe<persisted_state_bool_exp>;
};


export type subscription_rootraw_eventsArgs = {
  distinct_on?: InputMaybe<Array<raw_events_select_column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<raw_events_order_by>>;
  where?: InputMaybe<raw_events_bool_exp>;
};


export type subscription_rootraw_events_by_pkArgs = {
  chain_id: Scalars['Int'];
  event_id: Scalars['numeric'];
};


export type subscription_rootraw_events_streamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<raw_events_stream_cursor_input>>;
  where?: InputMaybe<raw_events_bool_exp>;
};

/** Boolean expression to compare columns of type "timestamp". All fields are combined with logical 'AND'. */
export type timestamp_comparison_exp = {
  _eq?: InputMaybe<Scalars['timestamp']>;
  _gt?: InputMaybe<Scalars['timestamp']>;
  _gte?: InputMaybe<Scalars['timestamp']>;
  _in?: InputMaybe<Array<Scalars['timestamp']>>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  _lt?: InputMaybe<Scalars['timestamp']>;
  _lte?: InputMaybe<Scalars['timestamp']>;
  _neq?: InputMaybe<Scalars['timestamp']>;
  _nin?: InputMaybe<Array<Scalars['timestamp']>>;
};

/** Boolean expression to compare columns of type "timestamptz". All fields are combined with logical 'AND'. */
export type timestamptz_comparison_exp = {
  _eq?: InputMaybe<Scalars['timestamptz']>;
  _gt?: InputMaybe<Scalars['timestamptz']>;
  _gte?: InputMaybe<Scalars['timestamptz']>;
  _in?: InputMaybe<Array<Scalars['timestamptz']>>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  _lt?: InputMaybe<Scalars['timestamptz']>;
  _lte?: InputMaybe<Scalars['timestamptz']>;
  _neq?: InputMaybe<Scalars['timestamptz']>;
  _nin?: InputMaybe<Array<Scalars['timestamptz']>>;
};

  export type QuerySdk = {
      /** fetch data from the table: "GMInitParams" **/
  GMInitParams: InContextSdkMethod<query_root['GMInitParams'], query_rootGMInitParamsArgs, MeshContext>,
  /** fetch data from the table: "GMInitParams" using primary key columns **/
  GMInitParams_by_pk: InContextSdkMethod<query_root['GMInitParams_by_pk'], query_rootGMInitParams_by_pkArgs, MeshContext>,
  /** fetch data from the table: "GameManager" **/
  GameManager: InContextSdkMethod<query_root['GameManager'], query_rootGameManagerArgs, MeshContext>,
  /** fetch data from the table: "GameManagerFactory" **/
  GameManagerFactory: InContextSdkMethod<query_root['GameManagerFactory'], query_rootGameManagerFactoryArgs, MeshContext>,
  /** fetch data from the table: "GameManagerFactory" using primary key columns **/
  GameManagerFactory_by_pk: InContextSdkMethod<query_root['GameManagerFactory_by_pk'], query_rootGameManagerFactory_by_pkArgs, MeshContext>,
  /** fetch data from the table: "GameManagerTemplate" **/
  GameManagerTemplate: InContextSdkMethod<query_root['GameManagerTemplate'], query_rootGameManagerTemplateArgs, MeshContext>,
  /** fetch data from the table: "GameManagerTemplate" using primary key columns **/
  GameManagerTemplate_by_pk: InContextSdkMethod<query_root['GameManagerTemplate_by_pk'], query_rootGameManagerTemplate_by_pkArgs, MeshContext>,
  /** fetch data from the table: "GameManager" using primary key columns **/
  GameManager_by_pk: InContextSdkMethod<query_root['GameManager_by_pk'], query_rootGameManager_by_pkArgs, MeshContext>,
  /** fetch data from the table: "GameRound" **/
  GameRound: InContextSdkMethod<query_root['GameRound'], query_rootGameRoundArgs, MeshContext>,
  /** fetch data from the table: "GameRound" using primary key columns **/
  GameRound_by_pk: InContextSdkMethod<query_root['GameRound_by_pk'], query_rootGameRound_by_pkArgs, MeshContext>,
  /** fetch data from the table: "Grant" **/
  Grant: InContextSdkMethod<query_root['Grant'], query_rootGrantArgs, MeshContext>,
  /** fetch data from the table: "GrantShip" **/
  GrantShip: InContextSdkMethod<query_root['GrantShip'], query_rootGrantShipArgs, MeshContext>,
  /** fetch data from the table: "GrantShip" using primary key columns **/
  GrantShip_by_pk: InContextSdkMethod<query_root['GrantShip_by_pk'], query_rootGrantShip_by_pkArgs, MeshContext>,
  /** fetch data from the table: "Grant" using primary key columns **/
  Grant_by_pk: InContextSdkMethod<query_root['Grant_by_pk'], query_rootGrant_by_pkArgs, MeshContext>,
  /** fetch data from the table: "ProfileIdToAnchor" **/
  ProfileIdToAnchor: InContextSdkMethod<query_root['ProfileIdToAnchor'], query_rootProfileIdToAnchorArgs, MeshContext>,
  /** fetch data from the table: "ProfileIdToAnchor" using primary key columns **/
  ProfileIdToAnchor_by_pk: InContextSdkMethod<query_root['ProfileIdToAnchor_by_pk'], query_rootProfileIdToAnchor_by_pkArgs, MeshContext>,
  /** fetch data from the table: "ProfileMemberGroup" **/
  ProfileMemberGroup: InContextSdkMethod<query_root['ProfileMemberGroup'], query_rootProfileMemberGroupArgs, MeshContext>,
  /** fetch data from the table: "ProfileMemberGroup" using primary key columns **/
  ProfileMemberGroup_by_pk: InContextSdkMethod<query_root['ProfileMemberGroup_by_pk'], query_rootProfileMemberGroup_by_pkArgs, MeshContext>,
  /** fetch data from the table: "Project" **/
  Project: InContextSdkMethod<query_root['Project'], query_rootProjectArgs, MeshContext>,
  /** fetch data from the table: "Project" using primary key columns **/
  Project_by_pk: InContextSdkMethod<query_root['Project_by_pk'], query_rootProject_by_pkArgs, MeshContext>,
  /** fetch data from the table: "RawMetadata" **/
  RawMetadata: InContextSdkMethod<query_root['RawMetadata'], query_rootRawMetadataArgs, MeshContext>,
  /** fetch data from the table: "RawMetadata" using primary key columns **/
  RawMetadata_by_pk: InContextSdkMethod<query_root['RawMetadata_by_pk'], query_rootRawMetadata_by_pkArgs, MeshContext>,
  /** fetch data from the table: "Test" **/
  Test: InContextSdkMethod<query_root['Test'], query_rootTestArgs, MeshContext>,
  /** fetch data from the table: "Test" using primary key columns **/
  Test_by_pk: InContextSdkMethod<query_root['Test_by_pk'], query_rootTest_by_pkArgs, MeshContext>,
  /** fetch data from the table: "chain_metadata" **/
  chain_metadata: InContextSdkMethod<query_root['chain_metadata'], query_rootchain_metadataArgs, MeshContext>,
  /** fetch data from the table: "chain_metadata" using primary key columns **/
  chain_metadata_by_pk: InContextSdkMethod<query_root['chain_metadata_by_pk'], query_rootchain_metadata_by_pkArgs, MeshContext>,
  /** fetch data from the table: "dynamic_contract_registry" **/
  dynamic_contract_registry: InContextSdkMethod<query_root['dynamic_contract_registry'], query_rootdynamic_contract_registryArgs, MeshContext>,
  /** fetch data from the table: "dynamic_contract_registry" using primary key columns **/
  dynamic_contract_registry_by_pk: InContextSdkMethod<query_root['dynamic_contract_registry_by_pk'], query_rootdynamic_contract_registry_by_pkArgs, MeshContext>,
  /** fetch data from the table: "entity_history" **/
  entity_history: InContextSdkMethod<query_root['entity_history'], query_rootentity_historyArgs, MeshContext>,
  /** fetch data from the table: "entity_history" using primary key columns **/
  entity_history_by_pk: InContextSdkMethod<query_root['entity_history_by_pk'], query_rootentity_history_by_pkArgs, MeshContext>,
  /** fetch data from the table: "entity_history_filter" **/
  entity_history_filter: InContextSdkMethod<query_root['entity_history_filter'], query_rootentity_history_filterArgs, MeshContext>,
  /** fetch data from the table: "entity_history_filter" using primary key columns **/
  entity_history_filter_by_pk: InContextSdkMethod<query_root['entity_history_filter_by_pk'], query_rootentity_history_filter_by_pkArgs, MeshContext>,
  /** fetch data from the table: "event_sync_state" **/
  event_sync_state: InContextSdkMethod<query_root['event_sync_state'], query_rootevent_sync_stateArgs, MeshContext>,
  /** fetch data from the table: "event_sync_state" using primary key columns **/
  event_sync_state_by_pk: InContextSdkMethod<query_root['event_sync_state_by_pk'], query_rootevent_sync_state_by_pkArgs, MeshContext>,
  /** This function helps search for articles **/
  get_entity_history_filter: InContextSdkMethod<query_root['get_entity_history_filter'], query_rootget_entity_history_filterArgs, MeshContext>,
  /** fetch data from the table: "persisted_state" **/
  persisted_state: InContextSdkMethod<query_root['persisted_state'], query_rootpersisted_stateArgs, MeshContext>,
  /** fetch data from the table: "persisted_state" using primary key columns **/
  persisted_state_by_pk: InContextSdkMethod<query_root['persisted_state_by_pk'], query_rootpersisted_state_by_pkArgs, MeshContext>,
  /** fetch data from the table: "raw_events" **/
  raw_events: InContextSdkMethod<query_root['raw_events'], query_rootraw_eventsArgs, MeshContext>,
  /** fetch data from the table: "raw_events" using primary key columns **/
  raw_events_by_pk: InContextSdkMethod<query_root['raw_events_by_pk'], query_rootraw_events_by_pkArgs, MeshContext>
  };

  export type MutationSdk = {
    
  };

  export type SubscriptionSdk = {
      /** fetch data from the table: "GMInitParams" **/
  GMInitParams: InContextSdkMethod<subscription_root['GMInitParams'], subscription_rootGMInitParamsArgs, MeshContext>,
  /** fetch data from the table: "GMInitParams" using primary key columns **/
  GMInitParams_by_pk: InContextSdkMethod<subscription_root['GMInitParams_by_pk'], subscription_rootGMInitParams_by_pkArgs, MeshContext>,
  /** fetch data from the table in a streaming manner: "GMInitParams" **/
  GMInitParams_stream: InContextSdkMethod<subscription_root['GMInitParams_stream'], subscription_rootGMInitParams_streamArgs, MeshContext>,
  /** fetch data from the table: "GameManager" **/
  GameManager: InContextSdkMethod<subscription_root['GameManager'], subscription_rootGameManagerArgs, MeshContext>,
  /** fetch data from the table: "GameManagerFactory" **/
  GameManagerFactory: InContextSdkMethod<subscription_root['GameManagerFactory'], subscription_rootGameManagerFactoryArgs, MeshContext>,
  /** fetch data from the table: "GameManagerFactory" using primary key columns **/
  GameManagerFactory_by_pk: InContextSdkMethod<subscription_root['GameManagerFactory_by_pk'], subscription_rootGameManagerFactory_by_pkArgs, MeshContext>,
  /** fetch data from the table in a streaming manner: "GameManagerFactory" **/
  GameManagerFactory_stream: InContextSdkMethod<subscription_root['GameManagerFactory_stream'], subscription_rootGameManagerFactory_streamArgs, MeshContext>,
  /** fetch data from the table: "GameManagerTemplate" **/
  GameManagerTemplate: InContextSdkMethod<subscription_root['GameManagerTemplate'], subscription_rootGameManagerTemplateArgs, MeshContext>,
  /** fetch data from the table: "GameManagerTemplate" using primary key columns **/
  GameManagerTemplate_by_pk: InContextSdkMethod<subscription_root['GameManagerTemplate_by_pk'], subscription_rootGameManagerTemplate_by_pkArgs, MeshContext>,
  /** fetch data from the table in a streaming manner: "GameManagerTemplate" **/
  GameManagerTemplate_stream: InContextSdkMethod<subscription_root['GameManagerTemplate_stream'], subscription_rootGameManagerTemplate_streamArgs, MeshContext>,
  /** fetch data from the table: "GameManager" using primary key columns **/
  GameManager_by_pk: InContextSdkMethod<subscription_root['GameManager_by_pk'], subscription_rootGameManager_by_pkArgs, MeshContext>,
  /** fetch data from the table in a streaming manner: "GameManager" **/
  GameManager_stream: InContextSdkMethod<subscription_root['GameManager_stream'], subscription_rootGameManager_streamArgs, MeshContext>,
  /** fetch data from the table: "GameRound" **/
  GameRound: InContextSdkMethod<subscription_root['GameRound'], subscription_rootGameRoundArgs, MeshContext>,
  /** fetch data from the table: "GameRound" using primary key columns **/
  GameRound_by_pk: InContextSdkMethod<subscription_root['GameRound_by_pk'], subscription_rootGameRound_by_pkArgs, MeshContext>,
  /** fetch data from the table in a streaming manner: "GameRound" **/
  GameRound_stream: InContextSdkMethod<subscription_root['GameRound_stream'], subscription_rootGameRound_streamArgs, MeshContext>,
  /** fetch data from the table: "Grant" **/
  Grant: InContextSdkMethod<subscription_root['Grant'], subscription_rootGrantArgs, MeshContext>,
  /** fetch data from the table: "GrantShip" **/
  GrantShip: InContextSdkMethod<subscription_root['GrantShip'], subscription_rootGrantShipArgs, MeshContext>,
  /** fetch data from the table: "GrantShip" using primary key columns **/
  GrantShip_by_pk: InContextSdkMethod<subscription_root['GrantShip_by_pk'], subscription_rootGrantShip_by_pkArgs, MeshContext>,
  /** fetch data from the table in a streaming manner: "GrantShip" **/
  GrantShip_stream: InContextSdkMethod<subscription_root['GrantShip_stream'], subscription_rootGrantShip_streamArgs, MeshContext>,
  /** fetch data from the table: "Grant" using primary key columns **/
  Grant_by_pk: InContextSdkMethod<subscription_root['Grant_by_pk'], subscription_rootGrant_by_pkArgs, MeshContext>,
  /** fetch data from the table in a streaming manner: "Grant" **/
  Grant_stream: InContextSdkMethod<subscription_root['Grant_stream'], subscription_rootGrant_streamArgs, MeshContext>,
  /** fetch data from the table: "ProfileIdToAnchor" **/
  ProfileIdToAnchor: InContextSdkMethod<subscription_root['ProfileIdToAnchor'], subscription_rootProfileIdToAnchorArgs, MeshContext>,
  /** fetch data from the table: "ProfileIdToAnchor" using primary key columns **/
  ProfileIdToAnchor_by_pk: InContextSdkMethod<subscription_root['ProfileIdToAnchor_by_pk'], subscription_rootProfileIdToAnchor_by_pkArgs, MeshContext>,
  /** fetch data from the table in a streaming manner: "ProfileIdToAnchor" **/
  ProfileIdToAnchor_stream: InContextSdkMethod<subscription_root['ProfileIdToAnchor_stream'], subscription_rootProfileIdToAnchor_streamArgs, MeshContext>,
  /** fetch data from the table: "ProfileMemberGroup" **/
  ProfileMemberGroup: InContextSdkMethod<subscription_root['ProfileMemberGroup'], subscription_rootProfileMemberGroupArgs, MeshContext>,
  /** fetch data from the table: "ProfileMemberGroup" using primary key columns **/
  ProfileMemberGroup_by_pk: InContextSdkMethod<subscription_root['ProfileMemberGroup_by_pk'], subscription_rootProfileMemberGroup_by_pkArgs, MeshContext>,
  /** fetch data from the table in a streaming manner: "ProfileMemberGroup" **/
  ProfileMemberGroup_stream: InContextSdkMethod<subscription_root['ProfileMemberGroup_stream'], subscription_rootProfileMemberGroup_streamArgs, MeshContext>,
  /** fetch data from the table: "Project" **/
  Project: InContextSdkMethod<subscription_root['Project'], subscription_rootProjectArgs, MeshContext>,
  /** fetch data from the table: "Project" using primary key columns **/
  Project_by_pk: InContextSdkMethod<subscription_root['Project_by_pk'], subscription_rootProject_by_pkArgs, MeshContext>,
  /** fetch data from the table in a streaming manner: "Project" **/
  Project_stream: InContextSdkMethod<subscription_root['Project_stream'], subscription_rootProject_streamArgs, MeshContext>,
  /** fetch data from the table: "RawMetadata" **/
  RawMetadata: InContextSdkMethod<subscription_root['RawMetadata'], subscription_rootRawMetadataArgs, MeshContext>,
  /** fetch data from the table: "RawMetadata" using primary key columns **/
  RawMetadata_by_pk: InContextSdkMethod<subscription_root['RawMetadata_by_pk'], subscription_rootRawMetadata_by_pkArgs, MeshContext>,
  /** fetch data from the table in a streaming manner: "RawMetadata" **/
  RawMetadata_stream: InContextSdkMethod<subscription_root['RawMetadata_stream'], subscription_rootRawMetadata_streamArgs, MeshContext>,
  /** fetch data from the table: "Test" **/
  Test: InContextSdkMethod<subscription_root['Test'], subscription_rootTestArgs, MeshContext>,
  /** fetch data from the table: "Test" using primary key columns **/
  Test_by_pk: InContextSdkMethod<subscription_root['Test_by_pk'], subscription_rootTest_by_pkArgs, MeshContext>,
  /** fetch data from the table in a streaming manner: "Test" **/
  Test_stream: InContextSdkMethod<subscription_root['Test_stream'], subscription_rootTest_streamArgs, MeshContext>,
  /** fetch data from the table: "chain_metadata" **/
  chain_metadata: InContextSdkMethod<subscription_root['chain_metadata'], subscription_rootchain_metadataArgs, MeshContext>,
  /** fetch data from the table: "chain_metadata" using primary key columns **/
  chain_metadata_by_pk: InContextSdkMethod<subscription_root['chain_metadata_by_pk'], subscription_rootchain_metadata_by_pkArgs, MeshContext>,
  /** fetch data from the table in a streaming manner: "chain_metadata" **/
  chain_metadata_stream: InContextSdkMethod<subscription_root['chain_metadata_stream'], subscription_rootchain_metadata_streamArgs, MeshContext>,
  /** fetch data from the table: "dynamic_contract_registry" **/
  dynamic_contract_registry: InContextSdkMethod<subscription_root['dynamic_contract_registry'], subscription_rootdynamic_contract_registryArgs, MeshContext>,
  /** fetch data from the table: "dynamic_contract_registry" using primary key columns **/
  dynamic_contract_registry_by_pk: InContextSdkMethod<subscription_root['dynamic_contract_registry_by_pk'], subscription_rootdynamic_contract_registry_by_pkArgs, MeshContext>,
  /** fetch data from the table in a streaming manner: "dynamic_contract_registry" **/
  dynamic_contract_registry_stream: InContextSdkMethod<subscription_root['dynamic_contract_registry_stream'], subscription_rootdynamic_contract_registry_streamArgs, MeshContext>,
  /** fetch data from the table: "entity_history" **/
  entity_history: InContextSdkMethod<subscription_root['entity_history'], subscription_rootentity_historyArgs, MeshContext>,
  /** fetch data from the table: "entity_history" using primary key columns **/
  entity_history_by_pk: InContextSdkMethod<subscription_root['entity_history_by_pk'], subscription_rootentity_history_by_pkArgs, MeshContext>,
  /** fetch data from the table: "entity_history_filter" **/
  entity_history_filter: InContextSdkMethod<subscription_root['entity_history_filter'], subscription_rootentity_history_filterArgs, MeshContext>,
  /** fetch data from the table: "entity_history_filter" using primary key columns **/
  entity_history_filter_by_pk: InContextSdkMethod<subscription_root['entity_history_filter_by_pk'], subscription_rootentity_history_filter_by_pkArgs, MeshContext>,
  /** fetch data from the table in a streaming manner: "entity_history_filter" **/
  entity_history_filter_stream: InContextSdkMethod<subscription_root['entity_history_filter_stream'], subscription_rootentity_history_filter_streamArgs, MeshContext>,
  /** fetch data from the table in a streaming manner: "entity_history" **/
  entity_history_stream: InContextSdkMethod<subscription_root['entity_history_stream'], subscription_rootentity_history_streamArgs, MeshContext>,
  /** fetch data from the table: "event_sync_state" **/
  event_sync_state: InContextSdkMethod<subscription_root['event_sync_state'], subscription_rootevent_sync_stateArgs, MeshContext>,
  /** fetch data from the table: "event_sync_state" using primary key columns **/
  event_sync_state_by_pk: InContextSdkMethod<subscription_root['event_sync_state_by_pk'], subscription_rootevent_sync_state_by_pkArgs, MeshContext>,
  /** fetch data from the table in a streaming manner: "event_sync_state" **/
  event_sync_state_stream: InContextSdkMethod<subscription_root['event_sync_state_stream'], subscription_rootevent_sync_state_streamArgs, MeshContext>,
  /** This function helps search for articles **/
  get_entity_history_filter: InContextSdkMethod<subscription_root['get_entity_history_filter'], subscription_rootget_entity_history_filterArgs, MeshContext>,
  /** fetch data from the table: "persisted_state" **/
  persisted_state: InContextSdkMethod<subscription_root['persisted_state'], subscription_rootpersisted_stateArgs, MeshContext>,
  /** fetch data from the table: "persisted_state" using primary key columns **/
  persisted_state_by_pk: InContextSdkMethod<subscription_root['persisted_state_by_pk'], subscription_rootpersisted_state_by_pkArgs, MeshContext>,
  /** fetch data from the table in a streaming manner: "persisted_state" **/
  persisted_state_stream: InContextSdkMethod<subscription_root['persisted_state_stream'], subscription_rootpersisted_state_streamArgs, MeshContext>,
  /** fetch data from the table: "raw_events" **/
  raw_events: InContextSdkMethod<subscription_root['raw_events'], subscription_rootraw_eventsArgs, MeshContext>,
  /** fetch data from the table: "raw_events" using primary key columns **/
  raw_events_by_pk: InContextSdkMethod<subscription_root['raw_events_by_pk'], subscription_rootraw_events_by_pkArgs, MeshContext>,
  /** fetch data from the table in a streaming manner: "raw_events" **/
  raw_events_stream: InContextSdkMethod<subscription_root['raw_events_stream'], subscription_rootraw_events_streamArgs, MeshContext>
  };

  export type Context = {
      ["grant-ships"]: { Query: QuerySdk, Mutation: MutationSdk, Subscription: SubscriptionSdk },
      
    };
}
