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
  _numeric: any;
  _text: any;
  contract_type: any;
  entity_type: any;
  event_type: any;
  json: any;
  numeric: any;
  timestamp: any;
  timestamptz: any;
};

/** columns and relationships of "Application" */
export type Application = {
  amount: Scalars['numeric'];
  db_write_timestamp?: Maybe<Scalars['timestamp']>;
  /** An object relationship */
  grant?: Maybe<Grant>;
  grant_id: Scalars['String'];
  id: Scalars['String'];
  index: Scalars['Int'];
  /** An object relationship */
  metadata?: Maybe<RawMetadata>;
  metadata_id: Scalars['String'];
  receivingAddress: Scalars['String'];
  status: Scalars['Int'];
  timestamp: Scalars['Int'];
};

/** order by aggregate values of table "Application" */
export type Application_aggregate_order_by = {
  avg?: InputMaybe<Application_avg_order_by>;
  count?: InputMaybe<order_by>;
  max?: InputMaybe<Application_max_order_by>;
  min?: InputMaybe<Application_min_order_by>;
  stddev?: InputMaybe<Application_stddev_order_by>;
  stddev_pop?: InputMaybe<Application_stddev_pop_order_by>;
  stddev_samp?: InputMaybe<Application_stddev_samp_order_by>;
  sum?: InputMaybe<Application_sum_order_by>;
  var_pop?: InputMaybe<Application_var_pop_order_by>;
  var_samp?: InputMaybe<Application_var_samp_order_by>;
  variance?: InputMaybe<Application_variance_order_by>;
};

/** order by avg() on columns of table "Application" */
export type Application_avg_order_by = {
  amount?: InputMaybe<order_by>;
  index?: InputMaybe<order_by>;
  status?: InputMaybe<order_by>;
  timestamp?: InputMaybe<order_by>;
};

/** Boolean expression to filter rows from the table "Application". All fields are combined with a logical 'AND'. */
export type Application_bool_exp = {
  _and?: InputMaybe<Array<Application_bool_exp>>;
  _not?: InputMaybe<Application_bool_exp>;
  _or?: InputMaybe<Array<Application_bool_exp>>;
  amount?: InputMaybe<numeric_comparison_exp>;
  db_write_timestamp?: InputMaybe<timestamp_comparison_exp>;
  grant?: InputMaybe<Grant_bool_exp>;
  grant_id?: InputMaybe<String_comparison_exp>;
  id?: InputMaybe<String_comparison_exp>;
  index?: InputMaybe<Int_comparison_exp>;
  metadata?: InputMaybe<RawMetadata_bool_exp>;
  metadata_id?: InputMaybe<String_comparison_exp>;
  receivingAddress?: InputMaybe<String_comparison_exp>;
  status?: InputMaybe<Int_comparison_exp>;
  timestamp?: InputMaybe<Int_comparison_exp>;
};

/** order by max() on columns of table "Application" */
export type Application_max_order_by = {
  amount?: InputMaybe<order_by>;
  db_write_timestamp?: InputMaybe<order_by>;
  grant_id?: InputMaybe<order_by>;
  id?: InputMaybe<order_by>;
  index?: InputMaybe<order_by>;
  metadata_id?: InputMaybe<order_by>;
  receivingAddress?: InputMaybe<order_by>;
  status?: InputMaybe<order_by>;
  timestamp?: InputMaybe<order_by>;
};

/** order by min() on columns of table "Application" */
export type Application_min_order_by = {
  amount?: InputMaybe<order_by>;
  db_write_timestamp?: InputMaybe<order_by>;
  grant_id?: InputMaybe<order_by>;
  id?: InputMaybe<order_by>;
  index?: InputMaybe<order_by>;
  metadata_id?: InputMaybe<order_by>;
  receivingAddress?: InputMaybe<order_by>;
  status?: InputMaybe<order_by>;
  timestamp?: InputMaybe<order_by>;
};

/** Ordering options when selecting data from "Application". */
export type Application_order_by = {
  amount?: InputMaybe<order_by>;
  db_write_timestamp?: InputMaybe<order_by>;
  grant?: InputMaybe<Grant_order_by>;
  grant_id?: InputMaybe<order_by>;
  id?: InputMaybe<order_by>;
  index?: InputMaybe<order_by>;
  metadata?: InputMaybe<RawMetadata_order_by>;
  metadata_id?: InputMaybe<order_by>;
  receivingAddress?: InputMaybe<order_by>;
  status?: InputMaybe<order_by>;
  timestamp?: InputMaybe<order_by>;
};

/** select columns of table "Application" */
export type Application_select_column =
  /** column name */
  | 'amount'
  /** column name */
  | 'db_write_timestamp'
  /** column name */
  | 'grant_id'
  /** column name */
  | 'id'
  /** column name */
  | 'index'
  /** column name */
  | 'metadata_id'
  /** column name */
  | 'receivingAddress'
  /** column name */
  | 'status'
  /** column name */
  | 'timestamp';

/** order by stddev() on columns of table "Application" */
export type Application_stddev_order_by = {
  amount?: InputMaybe<order_by>;
  index?: InputMaybe<order_by>;
  status?: InputMaybe<order_by>;
  timestamp?: InputMaybe<order_by>;
};

/** order by stddev_pop() on columns of table "Application" */
export type Application_stddev_pop_order_by = {
  amount?: InputMaybe<order_by>;
  index?: InputMaybe<order_by>;
  status?: InputMaybe<order_by>;
  timestamp?: InputMaybe<order_by>;
};

/** order by stddev_samp() on columns of table "Application" */
export type Application_stddev_samp_order_by = {
  amount?: InputMaybe<order_by>;
  index?: InputMaybe<order_by>;
  status?: InputMaybe<order_by>;
  timestamp?: InputMaybe<order_by>;
};

/** Streaming cursor of the table "Application" */
export type Application_stream_cursor_input = {
  /** Stream column input with initial value */
  initial_value: Application_stream_cursor_value_input;
  /** cursor ordering */
  ordering?: InputMaybe<cursor_ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Application_stream_cursor_value_input = {
  amount?: InputMaybe<Scalars['numeric']>;
  db_write_timestamp?: InputMaybe<Scalars['timestamp']>;
  grant_id?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
  index?: InputMaybe<Scalars['Int']>;
  metadata_id?: InputMaybe<Scalars['String']>;
  receivingAddress?: InputMaybe<Scalars['String']>;
  status?: InputMaybe<Scalars['Int']>;
  timestamp?: InputMaybe<Scalars['Int']>;
};

/** order by sum() on columns of table "Application" */
export type Application_sum_order_by = {
  amount?: InputMaybe<order_by>;
  index?: InputMaybe<order_by>;
  status?: InputMaybe<order_by>;
  timestamp?: InputMaybe<order_by>;
};

/** order by var_pop() on columns of table "Application" */
export type Application_var_pop_order_by = {
  amount?: InputMaybe<order_by>;
  index?: InputMaybe<order_by>;
  status?: InputMaybe<order_by>;
  timestamp?: InputMaybe<order_by>;
};

/** order by var_samp() on columns of table "Application" */
export type Application_var_samp_order_by = {
  amount?: InputMaybe<order_by>;
  index?: InputMaybe<order_by>;
  status?: InputMaybe<order_by>;
  timestamp?: InputMaybe<order_by>;
};

/** order by variance() on columns of table "Application" */
export type Application_variance_order_by = {
  amount?: InputMaybe<order_by>;
  index?: InputMaybe<order_by>;
  status?: InputMaybe<order_by>;
  timestamp?: InputMaybe<order_by>;
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

/** columns and relationships of "Contest" */
export type Contest = {
  /** An object relationship */
  choicesModule?: Maybe<StemModule>;
  choicesModule_id: Scalars['String'];
  contestAddress: Scalars['String'];
  contestStatus: Scalars['numeric'];
  contestVersion: Scalars['String'];
  db_write_timestamp?: Maybe<Scalars['timestamp']>;
  /** An object relationship */
  executionModule?: Maybe<StemModule>;
  executionModule_id: Scalars['String'];
  filterTag: Scalars['String'];
  id: Scalars['String'];
  isContinuous: Scalars['Boolean'];
  isRetractable: Scalars['Boolean'];
  /** An object relationship */
  pointsModule?: Maybe<StemModule>;
  pointsModule_id: Scalars['String'];
  /** An object relationship */
  votesModule?: Maybe<StemModule>;
  votesModule_id: Scalars['String'];
};

/** columns and relationships of "ContestClone" */
export type ContestClone = {
  contestAddress: Scalars['String'];
  contestVersion: Scalars['String'];
  db_write_timestamp?: Maybe<Scalars['timestamp']>;
  filterTag: Scalars['String'];
  id: Scalars['String'];
};

/** Boolean expression to filter rows from the table "ContestClone". All fields are combined with a logical 'AND'. */
export type ContestClone_bool_exp = {
  _and?: InputMaybe<Array<ContestClone_bool_exp>>;
  _not?: InputMaybe<ContestClone_bool_exp>;
  _or?: InputMaybe<Array<ContestClone_bool_exp>>;
  contestAddress?: InputMaybe<String_comparison_exp>;
  contestVersion?: InputMaybe<String_comparison_exp>;
  db_write_timestamp?: InputMaybe<timestamp_comparison_exp>;
  filterTag?: InputMaybe<String_comparison_exp>;
  id?: InputMaybe<String_comparison_exp>;
};

/** Ordering options when selecting data from "ContestClone". */
export type ContestClone_order_by = {
  contestAddress?: InputMaybe<order_by>;
  contestVersion?: InputMaybe<order_by>;
  db_write_timestamp?: InputMaybe<order_by>;
  filterTag?: InputMaybe<order_by>;
  id?: InputMaybe<order_by>;
};

/** select columns of table "ContestClone" */
export type ContestClone_select_column =
  /** column name */
  | 'contestAddress'
  /** column name */
  | 'contestVersion'
  /** column name */
  | 'db_write_timestamp'
  /** column name */
  | 'filterTag'
  /** column name */
  | 'id';

/** Streaming cursor of the table "ContestClone" */
export type ContestClone_stream_cursor_input = {
  /** Stream column input with initial value */
  initial_value: ContestClone_stream_cursor_value_input;
  /** cursor ordering */
  ordering?: InputMaybe<cursor_ordering>;
};

/** Initial value of the column from where the streaming should start */
export type ContestClone_stream_cursor_value_input = {
  contestAddress?: InputMaybe<Scalars['String']>;
  contestVersion?: InputMaybe<Scalars['String']>;
  db_write_timestamp?: InputMaybe<Scalars['timestamp']>;
  filterTag?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
};

/** columns and relationships of "ContestTemplate" */
export type ContestTemplate = {
  active: Scalars['Boolean'];
  contestAddress: Scalars['String'];
  contestVersion: Scalars['String'];
  db_write_timestamp?: Maybe<Scalars['timestamp']>;
  id: Scalars['String'];
  mdPointer: Scalars['String'];
  mdProtocol: Scalars['numeric'];
};

/** Boolean expression to filter rows from the table "ContestTemplate". All fields are combined with a logical 'AND'. */
export type ContestTemplate_bool_exp = {
  _and?: InputMaybe<Array<ContestTemplate_bool_exp>>;
  _not?: InputMaybe<ContestTemplate_bool_exp>;
  _or?: InputMaybe<Array<ContestTemplate_bool_exp>>;
  active?: InputMaybe<Boolean_comparison_exp>;
  contestAddress?: InputMaybe<String_comparison_exp>;
  contestVersion?: InputMaybe<String_comparison_exp>;
  db_write_timestamp?: InputMaybe<timestamp_comparison_exp>;
  id?: InputMaybe<String_comparison_exp>;
  mdPointer?: InputMaybe<String_comparison_exp>;
  mdProtocol?: InputMaybe<numeric_comparison_exp>;
};

/** Ordering options when selecting data from "ContestTemplate". */
export type ContestTemplate_order_by = {
  active?: InputMaybe<order_by>;
  contestAddress?: InputMaybe<order_by>;
  contestVersion?: InputMaybe<order_by>;
  db_write_timestamp?: InputMaybe<order_by>;
  id?: InputMaybe<order_by>;
  mdPointer?: InputMaybe<order_by>;
  mdProtocol?: InputMaybe<order_by>;
};

/** select columns of table "ContestTemplate" */
export type ContestTemplate_select_column =
  /** column name */
  | 'active'
  /** column name */
  | 'contestAddress'
  /** column name */
  | 'contestVersion'
  /** column name */
  | 'db_write_timestamp'
  /** column name */
  | 'id'
  /** column name */
  | 'mdPointer'
  /** column name */
  | 'mdProtocol';

/** Streaming cursor of the table "ContestTemplate" */
export type ContestTemplate_stream_cursor_input = {
  /** Stream column input with initial value */
  initial_value: ContestTemplate_stream_cursor_value_input;
  /** cursor ordering */
  ordering?: InputMaybe<cursor_ordering>;
};

/** Initial value of the column from where the streaming should start */
export type ContestTemplate_stream_cursor_value_input = {
  active?: InputMaybe<Scalars['Boolean']>;
  contestAddress?: InputMaybe<Scalars['String']>;
  contestVersion?: InputMaybe<Scalars['String']>;
  db_write_timestamp?: InputMaybe<Scalars['timestamp']>;
  id?: InputMaybe<Scalars['String']>;
  mdPointer?: InputMaybe<Scalars['String']>;
  mdProtocol?: InputMaybe<Scalars['numeric']>;
};

/** Boolean expression to filter rows from the table "Contest". All fields are combined with a logical 'AND'. */
export type Contest_bool_exp = {
  _and?: InputMaybe<Array<Contest_bool_exp>>;
  _not?: InputMaybe<Contest_bool_exp>;
  _or?: InputMaybe<Array<Contest_bool_exp>>;
  choicesModule?: InputMaybe<StemModule_bool_exp>;
  choicesModule_id?: InputMaybe<String_comparison_exp>;
  contestAddress?: InputMaybe<String_comparison_exp>;
  contestStatus?: InputMaybe<numeric_comparison_exp>;
  contestVersion?: InputMaybe<String_comparison_exp>;
  db_write_timestamp?: InputMaybe<timestamp_comparison_exp>;
  executionModule?: InputMaybe<StemModule_bool_exp>;
  executionModule_id?: InputMaybe<String_comparison_exp>;
  filterTag?: InputMaybe<String_comparison_exp>;
  id?: InputMaybe<String_comparison_exp>;
  isContinuous?: InputMaybe<Boolean_comparison_exp>;
  isRetractable?: InputMaybe<Boolean_comparison_exp>;
  pointsModule?: InputMaybe<StemModule_bool_exp>;
  pointsModule_id?: InputMaybe<String_comparison_exp>;
  votesModule?: InputMaybe<StemModule_bool_exp>;
  votesModule_id?: InputMaybe<String_comparison_exp>;
};

/** Ordering options when selecting data from "Contest". */
export type Contest_order_by = {
  choicesModule?: InputMaybe<StemModule_order_by>;
  choicesModule_id?: InputMaybe<order_by>;
  contestAddress?: InputMaybe<order_by>;
  contestStatus?: InputMaybe<order_by>;
  contestVersion?: InputMaybe<order_by>;
  db_write_timestamp?: InputMaybe<order_by>;
  executionModule?: InputMaybe<StemModule_order_by>;
  executionModule_id?: InputMaybe<order_by>;
  filterTag?: InputMaybe<order_by>;
  id?: InputMaybe<order_by>;
  isContinuous?: InputMaybe<order_by>;
  isRetractable?: InputMaybe<order_by>;
  pointsModule?: InputMaybe<StemModule_order_by>;
  pointsModule_id?: InputMaybe<order_by>;
  votesModule?: InputMaybe<StemModule_order_by>;
  votesModule_id?: InputMaybe<order_by>;
};

/** select columns of table "Contest" */
export type Contest_select_column =
  /** column name */
  | 'choicesModule_id'
  /** column name */
  | 'contestAddress'
  /** column name */
  | 'contestStatus'
  /** column name */
  | 'contestVersion'
  /** column name */
  | 'db_write_timestamp'
  /** column name */
  | 'executionModule_id'
  /** column name */
  | 'filterTag'
  /** column name */
  | 'id'
  /** column name */
  | 'isContinuous'
  /** column name */
  | 'isRetractable'
  /** column name */
  | 'pointsModule_id'
  /** column name */
  | 'votesModule_id';

/** Streaming cursor of the table "Contest" */
export type Contest_stream_cursor_input = {
  /** Stream column input with initial value */
  initial_value: Contest_stream_cursor_value_input;
  /** cursor ordering */
  ordering?: InputMaybe<cursor_ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Contest_stream_cursor_value_input = {
  choicesModule_id?: InputMaybe<Scalars['String']>;
  contestAddress?: InputMaybe<Scalars['String']>;
  contestStatus?: InputMaybe<Scalars['numeric']>;
  contestVersion?: InputMaybe<Scalars['String']>;
  db_write_timestamp?: InputMaybe<Scalars['timestamp']>;
  executionModule_id?: InputMaybe<Scalars['String']>;
  filterTag?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
  isContinuous?: InputMaybe<Scalars['Boolean']>;
  isRetractable?: InputMaybe<Scalars['Boolean']>;
  pointsModule_id?: InputMaybe<Scalars['String']>;
  votesModule_id?: InputMaybe<Scalars['String']>;
};

/** columns and relationships of "ERCPointParams" */
export type ERCPointParams = {
  db_write_timestamp?: Maybe<Scalars['timestamp']>;
  id: Scalars['String'];
  voteTokenAddress: Scalars['String'];
  votingCheckpoint: Scalars['numeric'];
};

/** Boolean expression to filter rows from the table "ERCPointParams". All fields are combined with a logical 'AND'. */
export type ERCPointParams_bool_exp = {
  _and?: InputMaybe<Array<ERCPointParams_bool_exp>>;
  _not?: InputMaybe<ERCPointParams_bool_exp>;
  _or?: InputMaybe<Array<ERCPointParams_bool_exp>>;
  db_write_timestamp?: InputMaybe<timestamp_comparison_exp>;
  id?: InputMaybe<String_comparison_exp>;
  voteTokenAddress?: InputMaybe<String_comparison_exp>;
  votingCheckpoint?: InputMaybe<numeric_comparison_exp>;
};

/** Ordering options when selecting data from "ERCPointParams". */
export type ERCPointParams_order_by = {
  db_write_timestamp?: InputMaybe<order_by>;
  id?: InputMaybe<order_by>;
  voteTokenAddress?: InputMaybe<order_by>;
  votingCheckpoint?: InputMaybe<order_by>;
};

/** select columns of table "ERCPointParams" */
export type ERCPointParams_select_column =
  /** column name */
  | 'db_write_timestamp'
  /** column name */
  | 'id'
  /** column name */
  | 'voteTokenAddress'
  /** column name */
  | 'votingCheckpoint';

/** Streaming cursor of the table "ERCPointParams" */
export type ERCPointParams_stream_cursor_input = {
  /** Stream column input with initial value */
  initial_value: ERCPointParams_stream_cursor_value_input;
  /** cursor ordering */
  ordering?: InputMaybe<cursor_ordering>;
};

/** Initial value of the column from where the streaming should start */
export type ERCPointParams_stream_cursor_value_input = {
  db_write_timestamp?: InputMaybe<Scalars['timestamp']>;
  id?: InputMaybe<Scalars['String']>;
  voteTokenAddress?: InputMaybe<Scalars['String']>;
  votingCheckpoint?: InputMaybe<Scalars['numeric']>;
};

/** columns and relationships of "EnvioTX" */
export type EnvioTX = {
  blockNumber: Scalars['numeric'];
  db_write_timestamp?: Maybe<Scalars['timestamp']>;
  id: Scalars['String'];
  srcAddress: Scalars['String'];
  txHash: Scalars['String'];
  txOrigin?: Maybe<Scalars['String']>;
};

/** Boolean expression to filter rows from the table "EnvioTX". All fields are combined with a logical 'AND'. */
export type EnvioTX_bool_exp = {
  _and?: InputMaybe<Array<EnvioTX_bool_exp>>;
  _not?: InputMaybe<EnvioTX_bool_exp>;
  _or?: InputMaybe<Array<EnvioTX_bool_exp>>;
  blockNumber?: InputMaybe<numeric_comparison_exp>;
  db_write_timestamp?: InputMaybe<timestamp_comparison_exp>;
  id?: InputMaybe<String_comparison_exp>;
  srcAddress?: InputMaybe<String_comparison_exp>;
  txHash?: InputMaybe<String_comparison_exp>;
  txOrigin?: InputMaybe<String_comparison_exp>;
};

/** Ordering options when selecting data from "EnvioTX". */
export type EnvioTX_order_by = {
  blockNumber?: InputMaybe<order_by>;
  db_write_timestamp?: InputMaybe<order_by>;
  id?: InputMaybe<order_by>;
  srcAddress?: InputMaybe<order_by>;
  txHash?: InputMaybe<order_by>;
  txOrigin?: InputMaybe<order_by>;
};

/** select columns of table "EnvioTX" */
export type EnvioTX_select_column =
  /** column name */
  | 'blockNumber'
  /** column name */
  | 'db_write_timestamp'
  /** column name */
  | 'id'
  /** column name */
  | 'srcAddress'
  /** column name */
  | 'txHash'
  /** column name */
  | 'txOrigin';

/** Streaming cursor of the table "EnvioTX" */
export type EnvioTX_stream_cursor_input = {
  /** Stream column input with initial value */
  initial_value: EnvioTX_stream_cursor_value_input;
  /** cursor ordering */
  ordering?: InputMaybe<cursor_ordering>;
};

/** Initial value of the column from where the streaming should start */
export type EnvioTX_stream_cursor_value_input = {
  blockNumber?: InputMaybe<Scalars['numeric']>;
  db_write_timestamp?: InputMaybe<Scalars['timestamp']>;
  id?: InputMaybe<Scalars['String']>;
  srcAddress?: InputMaybe<Scalars['String']>;
  txHash?: InputMaybe<Scalars['String']>;
  txOrigin?: InputMaybe<Scalars['String']>;
};

/** columns and relationships of "EventPost" */
export type EventPost = {
  db_write_timestamp?: Maybe<Scalars['timestamp']>;
  hatId: Scalars['numeric'];
  /** An object relationship */
  hatsPoster?: Maybe<HatsPoster>;
  hatsPoster_id: Scalars['String'];
  id: Scalars['String'];
  mdPointer: Scalars['String'];
  mdProtocol: Scalars['numeric'];
  tag: Scalars['String'];
};

/** order by aggregate values of table "EventPost" */
export type EventPost_aggregate_order_by = {
  avg?: InputMaybe<EventPost_avg_order_by>;
  count?: InputMaybe<order_by>;
  max?: InputMaybe<EventPost_max_order_by>;
  min?: InputMaybe<EventPost_min_order_by>;
  stddev?: InputMaybe<EventPost_stddev_order_by>;
  stddev_pop?: InputMaybe<EventPost_stddev_pop_order_by>;
  stddev_samp?: InputMaybe<EventPost_stddev_samp_order_by>;
  sum?: InputMaybe<EventPost_sum_order_by>;
  var_pop?: InputMaybe<EventPost_var_pop_order_by>;
  var_samp?: InputMaybe<EventPost_var_samp_order_by>;
  variance?: InputMaybe<EventPost_variance_order_by>;
};

/** order by avg() on columns of table "EventPost" */
export type EventPost_avg_order_by = {
  hatId?: InputMaybe<order_by>;
  mdProtocol?: InputMaybe<order_by>;
};

/** Boolean expression to filter rows from the table "EventPost". All fields are combined with a logical 'AND'. */
export type EventPost_bool_exp = {
  _and?: InputMaybe<Array<EventPost_bool_exp>>;
  _not?: InputMaybe<EventPost_bool_exp>;
  _or?: InputMaybe<Array<EventPost_bool_exp>>;
  db_write_timestamp?: InputMaybe<timestamp_comparison_exp>;
  hatId?: InputMaybe<numeric_comparison_exp>;
  hatsPoster?: InputMaybe<HatsPoster_bool_exp>;
  hatsPoster_id?: InputMaybe<String_comparison_exp>;
  id?: InputMaybe<String_comparison_exp>;
  mdPointer?: InputMaybe<String_comparison_exp>;
  mdProtocol?: InputMaybe<numeric_comparison_exp>;
  tag?: InputMaybe<String_comparison_exp>;
};

/** order by max() on columns of table "EventPost" */
export type EventPost_max_order_by = {
  db_write_timestamp?: InputMaybe<order_by>;
  hatId?: InputMaybe<order_by>;
  hatsPoster_id?: InputMaybe<order_by>;
  id?: InputMaybe<order_by>;
  mdPointer?: InputMaybe<order_by>;
  mdProtocol?: InputMaybe<order_by>;
  tag?: InputMaybe<order_by>;
};

/** order by min() on columns of table "EventPost" */
export type EventPost_min_order_by = {
  db_write_timestamp?: InputMaybe<order_by>;
  hatId?: InputMaybe<order_by>;
  hatsPoster_id?: InputMaybe<order_by>;
  id?: InputMaybe<order_by>;
  mdPointer?: InputMaybe<order_by>;
  mdProtocol?: InputMaybe<order_by>;
  tag?: InputMaybe<order_by>;
};

/** Ordering options when selecting data from "EventPost". */
export type EventPost_order_by = {
  db_write_timestamp?: InputMaybe<order_by>;
  hatId?: InputMaybe<order_by>;
  hatsPoster?: InputMaybe<HatsPoster_order_by>;
  hatsPoster_id?: InputMaybe<order_by>;
  id?: InputMaybe<order_by>;
  mdPointer?: InputMaybe<order_by>;
  mdProtocol?: InputMaybe<order_by>;
  tag?: InputMaybe<order_by>;
};

/** select columns of table "EventPost" */
export type EventPost_select_column =
  /** column name */
  | 'db_write_timestamp'
  /** column name */
  | 'hatId'
  /** column name */
  | 'hatsPoster_id'
  /** column name */
  | 'id'
  /** column name */
  | 'mdPointer'
  /** column name */
  | 'mdProtocol'
  /** column name */
  | 'tag';

/** order by stddev() on columns of table "EventPost" */
export type EventPost_stddev_order_by = {
  hatId?: InputMaybe<order_by>;
  mdProtocol?: InputMaybe<order_by>;
};

/** order by stddev_pop() on columns of table "EventPost" */
export type EventPost_stddev_pop_order_by = {
  hatId?: InputMaybe<order_by>;
  mdProtocol?: InputMaybe<order_by>;
};

/** order by stddev_samp() on columns of table "EventPost" */
export type EventPost_stddev_samp_order_by = {
  hatId?: InputMaybe<order_by>;
  mdProtocol?: InputMaybe<order_by>;
};

/** Streaming cursor of the table "EventPost" */
export type EventPost_stream_cursor_input = {
  /** Stream column input with initial value */
  initial_value: EventPost_stream_cursor_value_input;
  /** cursor ordering */
  ordering?: InputMaybe<cursor_ordering>;
};

/** Initial value of the column from where the streaming should start */
export type EventPost_stream_cursor_value_input = {
  db_write_timestamp?: InputMaybe<Scalars['timestamp']>;
  hatId?: InputMaybe<Scalars['numeric']>;
  hatsPoster_id?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
  mdPointer?: InputMaybe<Scalars['String']>;
  mdProtocol?: InputMaybe<Scalars['numeric']>;
  tag?: InputMaybe<Scalars['String']>;
};

/** order by sum() on columns of table "EventPost" */
export type EventPost_sum_order_by = {
  hatId?: InputMaybe<order_by>;
  mdProtocol?: InputMaybe<order_by>;
};

/** order by var_pop() on columns of table "EventPost" */
export type EventPost_var_pop_order_by = {
  hatId?: InputMaybe<order_by>;
  mdProtocol?: InputMaybe<order_by>;
};

/** order by var_samp() on columns of table "EventPost" */
export type EventPost_var_samp_order_by = {
  hatId?: InputMaybe<order_by>;
  mdProtocol?: InputMaybe<order_by>;
};

/** order by variance() on columns of table "EventPost" */
export type EventPost_variance_order_by = {
  hatId?: InputMaybe<order_by>;
  mdProtocol?: InputMaybe<order_by>;
};

/** columns and relationships of "FactoryEventsSummary" */
export type FactoryEventsSummary = {
  address: Scalars['String'];
  admins: Scalars['_text'];
  contestBuiltCount: Scalars['numeric'];
  contestCloneCount: Scalars['numeric'];
  contestTemplateCount: Scalars['numeric'];
  db_write_timestamp?: Maybe<Scalars['timestamp']>;
  id: Scalars['String'];
  moduleCloneCount: Scalars['numeric'];
  moduleTemplateCount: Scalars['numeric'];
};

/** Boolean expression to filter rows from the table "FactoryEventsSummary". All fields are combined with a logical 'AND'. */
export type FactoryEventsSummary_bool_exp = {
  _and?: InputMaybe<Array<FactoryEventsSummary_bool_exp>>;
  _not?: InputMaybe<FactoryEventsSummary_bool_exp>;
  _or?: InputMaybe<Array<FactoryEventsSummary_bool_exp>>;
  address?: InputMaybe<String_comparison_exp>;
  admins?: InputMaybe<_text_comparison_exp>;
  contestBuiltCount?: InputMaybe<numeric_comparison_exp>;
  contestCloneCount?: InputMaybe<numeric_comparison_exp>;
  contestTemplateCount?: InputMaybe<numeric_comparison_exp>;
  db_write_timestamp?: InputMaybe<timestamp_comparison_exp>;
  id?: InputMaybe<String_comparison_exp>;
  moduleCloneCount?: InputMaybe<numeric_comparison_exp>;
  moduleTemplateCount?: InputMaybe<numeric_comparison_exp>;
};

/** Ordering options when selecting data from "FactoryEventsSummary". */
export type FactoryEventsSummary_order_by = {
  address?: InputMaybe<order_by>;
  admins?: InputMaybe<order_by>;
  contestBuiltCount?: InputMaybe<order_by>;
  contestCloneCount?: InputMaybe<order_by>;
  contestTemplateCount?: InputMaybe<order_by>;
  db_write_timestamp?: InputMaybe<order_by>;
  id?: InputMaybe<order_by>;
  moduleCloneCount?: InputMaybe<order_by>;
  moduleTemplateCount?: InputMaybe<order_by>;
};

/** select columns of table "FactoryEventsSummary" */
export type FactoryEventsSummary_select_column =
  /** column name */
  | 'address'
  /** column name */
  | 'admins'
  /** column name */
  | 'contestBuiltCount'
  /** column name */
  | 'contestCloneCount'
  /** column name */
  | 'contestTemplateCount'
  /** column name */
  | 'db_write_timestamp'
  /** column name */
  | 'id'
  /** column name */
  | 'moduleCloneCount'
  /** column name */
  | 'moduleTemplateCount';

/** Streaming cursor of the table "FactoryEventsSummary" */
export type FactoryEventsSummary_stream_cursor_input = {
  /** Stream column input with initial value */
  initial_value: FactoryEventsSummary_stream_cursor_value_input;
  /** cursor ordering */
  ordering?: InputMaybe<cursor_ordering>;
};

/** Initial value of the column from where the streaming should start */
export type FactoryEventsSummary_stream_cursor_value_input = {
  address?: InputMaybe<Scalars['String']>;
  admins?: InputMaybe<Scalars['_text']>;
  contestBuiltCount?: InputMaybe<Scalars['numeric']>;
  contestCloneCount?: InputMaybe<Scalars['numeric']>;
  contestTemplateCount?: InputMaybe<Scalars['numeric']>;
  db_write_timestamp?: InputMaybe<Scalars['timestamp']>;
  id?: InputMaybe<Scalars['String']>;
  moduleCloneCount?: InputMaybe<Scalars['numeric']>;
  moduleTemplateCount?: InputMaybe<Scalars['numeric']>;
};

/** columns and relationships of "FeedCard" */
export type FeedCard = {
  db_write_timestamp?: Maybe<Scalars['timestamp']>;
  /** An object relationship */
  domain?: Maybe<GameManager>;
  domain_id?: Maybe<Scalars['String']>;
  /** An object relationship */
  embed?: Maybe<FeedItemEmbed>;
  embed_id?: Maybe<Scalars['String']>;
  externalLink?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  internalLink?: Maybe<Scalars['String']>;
  message?: Maybe<Scalars['String']>;
  /** An object relationship */
  object?: Maybe<FeedItemEntity>;
  object_id?: Maybe<Scalars['String']>;
  /** An object relationship */
  richTextContent?: Maybe<RawMetadata>;
  richTextContent_id?: Maybe<Scalars['String']>;
  sender?: Maybe<Scalars['String']>;
  /** An object relationship */
  subject?: Maybe<FeedItemEntity>;
  subjectMetadataPointer: Scalars['String'];
  subject_id: Scalars['String'];
  tag: Scalars['String'];
  timestamp: Scalars['Int'];
};

/** Boolean expression to filter rows from the table "FeedCard". All fields are combined with a logical 'AND'. */
export type FeedCard_bool_exp = {
  _and?: InputMaybe<Array<FeedCard_bool_exp>>;
  _not?: InputMaybe<FeedCard_bool_exp>;
  _or?: InputMaybe<Array<FeedCard_bool_exp>>;
  db_write_timestamp?: InputMaybe<timestamp_comparison_exp>;
  domain?: InputMaybe<GameManager_bool_exp>;
  domain_id?: InputMaybe<String_comparison_exp>;
  embed?: InputMaybe<FeedItemEmbed_bool_exp>;
  embed_id?: InputMaybe<String_comparison_exp>;
  externalLink?: InputMaybe<String_comparison_exp>;
  id?: InputMaybe<String_comparison_exp>;
  internalLink?: InputMaybe<String_comparison_exp>;
  message?: InputMaybe<String_comparison_exp>;
  object?: InputMaybe<FeedItemEntity_bool_exp>;
  object_id?: InputMaybe<String_comparison_exp>;
  richTextContent?: InputMaybe<RawMetadata_bool_exp>;
  richTextContent_id?: InputMaybe<String_comparison_exp>;
  sender?: InputMaybe<String_comparison_exp>;
  subject?: InputMaybe<FeedItemEntity_bool_exp>;
  subjectMetadataPointer?: InputMaybe<String_comparison_exp>;
  subject_id?: InputMaybe<String_comparison_exp>;
  tag?: InputMaybe<String_comparison_exp>;
  timestamp?: InputMaybe<Int_comparison_exp>;
};

/** Ordering options when selecting data from "FeedCard". */
export type FeedCard_order_by = {
  db_write_timestamp?: InputMaybe<order_by>;
  domain?: InputMaybe<GameManager_order_by>;
  domain_id?: InputMaybe<order_by>;
  embed?: InputMaybe<FeedItemEmbed_order_by>;
  embed_id?: InputMaybe<order_by>;
  externalLink?: InputMaybe<order_by>;
  id?: InputMaybe<order_by>;
  internalLink?: InputMaybe<order_by>;
  message?: InputMaybe<order_by>;
  object?: InputMaybe<FeedItemEntity_order_by>;
  object_id?: InputMaybe<order_by>;
  richTextContent?: InputMaybe<RawMetadata_order_by>;
  richTextContent_id?: InputMaybe<order_by>;
  sender?: InputMaybe<order_by>;
  subject?: InputMaybe<FeedItemEntity_order_by>;
  subjectMetadataPointer?: InputMaybe<order_by>;
  subject_id?: InputMaybe<order_by>;
  tag?: InputMaybe<order_by>;
  timestamp?: InputMaybe<order_by>;
};

/** select columns of table "FeedCard" */
export type FeedCard_select_column =
  /** column name */
  | 'db_write_timestamp'
  /** column name */
  | 'domain_id'
  /** column name */
  | 'embed_id'
  /** column name */
  | 'externalLink'
  /** column name */
  | 'id'
  /** column name */
  | 'internalLink'
  /** column name */
  | 'message'
  /** column name */
  | 'object_id'
  /** column name */
  | 'richTextContent_id'
  /** column name */
  | 'sender'
  /** column name */
  | 'subjectMetadataPointer'
  /** column name */
  | 'subject_id'
  /** column name */
  | 'tag'
  /** column name */
  | 'timestamp';

/** Streaming cursor of the table "FeedCard" */
export type FeedCard_stream_cursor_input = {
  /** Stream column input with initial value */
  initial_value: FeedCard_stream_cursor_value_input;
  /** cursor ordering */
  ordering?: InputMaybe<cursor_ordering>;
};

/** Initial value of the column from where the streaming should start */
export type FeedCard_stream_cursor_value_input = {
  db_write_timestamp?: InputMaybe<Scalars['timestamp']>;
  domain_id?: InputMaybe<Scalars['String']>;
  embed_id?: InputMaybe<Scalars['String']>;
  externalLink?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
  internalLink?: InputMaybe<Scalars['String']>;
  message?: InputMaybe<Scalars['String']>;
  object_id?: InputMaybe<Scalars['String']>;
  richTextContent_id?: InputMaybe<Scalars['String']>;
  sender?: InputMaybe<Scalars['String']>;
  subjectMetadataPointer?: InputMaybe<Scalars['String']>;
  subject_id?: InputMaybe<Scalars['String']>;
  tag?: InputMaybe<Scalars['String']>;
  timestamp?: InputMaybe<Scalars['Int']>;
};

/** columns and relationships of "FeedItemEmbed" */
export type FeedItemEmbed = {
  content?: Maybe<Scalars['String']>;
  db_write_timestamp?: Maybe<Scalars['timestamp']>;
  id: Scalars['String'];
  key?: Maybe<Scalars['String']>;
  pointer?: Maybe<Scalars['String']>;
  protocol?: Maybe<Scalars['numeric']>;
};

/** Boolean expression to filter rows from the table "FeedItemEmbed". All fields are combined with a logical 'AND'. */
export type FeedItemEmbed_bool_exp = {
  _and?: InputMaybe<Array<FeedItemEmbed_bool_exp>>;
  _not?: InputMaybe<FeedItemEmbed_bool_exp>;
  _or?: InputMaybe<Array<FeedItemEmbed_bool_exp>>;
  content?: InputMaybe<String_comparison_exp>;
  db_write_timestamp?: InputMaybe<timestamp_comparison_exp>;
  id?: InputMaybe<String_comparison_exp>;
  key?: InputMaybe<String_comparison_exp>;
  pointer?: InputMaybe<String_comparison_exp>;
  protocol?: InputMaybe<numeric_comparison_exp>;
};

/** Ordering options when selecting data from "FeedItemEmbed". */
export type FeedItemEmbed_order_by = {
  content?: InputMaybe<order_by>;
  db_write_timestamp?: InputMaybe<order_by>;
  id?: InputMaybe<order_by>;
  key?: InputMaybe<order_by>;
  pointer?: InputMaybe<order_by>;
  protocol?: InputMaybe<order_by>;
};

/** select columns of table "FeedItemEmbed" */
export type FeedItemEmbed_select_column =
  /** column name */
  | 'content'
  /** column name */
  | 'db_write_timestamp'
  /** column name */
  | 'id'
  /** column name */
  | 'key'
  /** column name */
  | 'pointer'
  /** column name */
  | 'protocol';

/** Streaming cursor of the table "FeedItemEmbed" */
export type FeedItemEmbed_stream_cursor_input = {
  /** Stream column input with initial value */
  initial_value: FeedItemEmbed_stream_cursor_value_input;
  /** cursor ordering */
  ordering?: InputMaybe<cursor_ordering>;
};

/** Initial value of the column from where the streaming should start */
export type FeedItemEmbed_stream_cursor_value_input = {
  content?: InputMaybe<Scalars['String']>;
  db_write_timestamp?: InputMaybe<Scalars['timestamp']>;
  id?: InputMaybe<Scalars['String']>;
  key?: InputMaybe<Scalars['String']>;
  pointer?: InputMaybe<Scalars['String']>;
  protocol?: InputMaybe<Scalars['numeric']>;
};

/** columns and relationships of "FeedItemEntity" */
export type FeedItemEntity = {
  db_write_timestamp?: Maybe<Scalars['timestamp']>;
  id: Scalars['String'];
  name: Scalars['String'];
  playerType: Scalars['Int'];
};

/** Boolean expression to filter rows from the table "FeedItemEntity". All fields are combined with a logical 'AND'. */
export type FeedItemEntity_bool_exp = {
  _and?: InputMaybe<Array<FeedItemEntity_bool_exp>>;
  _not?: InputMaybe<FeedItemEntity_bool_exp>;
  _or?: InputMaybe<Array<FeedItemEntity_bool_exp>>;
  db_write_timestamp?: InputMaybe<timestamp_comparison_exp>;
  id?: InputMaybe<String_comparison_exp>;
  name?: InputMaybe<String_comparison_exp>;
  playerType?: InputMaybe<Int_comparison_exp>;
};

/** Ordering options when selecting data from "FeedItemEntity". */
export type FeedItemEntity_order_by = {
  db_write_timestamp?: InputMaybe<order_by>;
  id?: InputMaybe<order_by>;
  name?: InputMaybe<order_by>;
  playerType?: InputMaybe<order_by>;
};

/** select columns of table "FeedItemEntity" */
export type FeedItemEntity_select_column =
  /** column name */
  | 'db_write_timestamp'
  /** column name */
  | 'id'
  /** column name */
  | 'name'
  /** column name */
  | 'playerType';

/** Streaming cursor of the table "FeedItemEntity" */
export type FeedItemEntity_stream_cursor_input = {
  /** Stream column input with initial value */
  initial_value: FeedItemEntity_stream_cursor_value_input;
  /** cursor ordering */
  ordering?: InputMaybe<cursor_ordering>;
};

/** Initial value of the column from where the streaming should start */
export type FeedItemEntity_stream_cursor_value_input = {
  db_write_timestamp?: InputMaybe<Scalars['timestamp']>;
  id?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  playerType?: InputMaybe<Scalars['Int']>;
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

/** columns and relationships of "GSVoter" */
export type GSVoter = {
  address: Scalars['String'];
  db_write_timestamp?: Maybe<Scalars['timestamp']>;
  id: Scalars['String'];
  /** An array relationship */
  votes: Array<ShipVote>;
};


/** columns and relationships of "GSVoter" */
export type GSVotervotesArgs = {
  distinct_on?: InputMaybe<Array<ShipVote_select_column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<ShipVote_order_by>>;
  where?: InputMaybe<ShipVote_bool_exp>;
};

/** Boolean expression to filter rows from the table "GSVoter". All fields are combined with a logical 'AND'. */
export type GSVoter_bool_exp = {
  _and?: InputMaybe<Array<GSVoter_bool_exp>>;
  _not?: InputMaybe<GSVoter_bool_exp>;
  _or?: InputMaybe<Array<GSVoter_bool_exp>>;
  address?: InputMaybe<String_comparison_exp>;
  db_write_timestamp?: InputMaybe<timestamp_comparison_exp>;
  id?: InputMaybe<String_comparison_exp>;
  votes?: InputMaybe<ShipVote_bool_exp>;
};

/** Ordering options when selecting data from "GSVoter". */
export type GSVoter_order_by = {
  address?: InputMaybe<order_by>;
  db_write_timestamp?: InputMaybe<order_by>;
  id?: InputMaybe<order_by>;
  votes_aggregate?: InputMaybe<ShipVote_aggregate_order_by>;
};

/** select columns of table "GSVoter" */
export type GSVoter_select_column =
  /** column name */
  | 'address'
  /** column name */
  | 'db_write_timestamp'
  /** column name */
  | 'id';

/** Streaming cursor of the table "GSVoter" */
export type GSVoter_stream_cursor_input = {
  /** Stream column input with initial value */
  initial_value: GSVoter_stream_cursor_value_input;
  /** cursor ordering */
  ordering?: InputMaybe<cursor_ordering>;
};

/** Initial value of the column from where the streaming should start */
export type GSVoter_stream_cursor_value_input = {
  address?: InputMaybe<Scalars['String']>;
  db_write_timestamp?: InputMaybe<Scalars['timestamp']>;
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
  amount?: Maybe<Scalars['numeric']>;
  applicationApproved: Scalars['Boolean'];
  /** An array relationship */
  applications: Array<Application>;
  /** An object relationship */
  currentApplication?: Maybe<Application>;
  currentApplication_id?: Maybe<Scalars['String']>;
  /** An object relationship */
  currentMilestones?: Maybe<MilestoneSet>;
  currentMilestones_id?: Maybe<Scalars['String']>;
  db_write_timestamp?: Maybe<Scalars['timestamp']>;
  /** An object relationship */
  gameManager?: Maybe<GameManager>;
  gameManager_id: Scalars['String'];
  grantCompleted: Scalars['Boolean'];
  id: Scalars['String'];
  isAllocated: Scalars['Boolean'];
  lastUpdated: Scalars['Int'];
  /** An array relationship */
  milestoneDrafts: Array<MilestoneSet>;
  /** An object relationship */
  project?: Maybe<Project>;
  project_id: Scalars['String'];
  /** An object relationship */
  ship?: Maybe<GrantShip>;
  ship_id: Scalars['String'];
  status: Scalars['Int'];
};


/** columns and relationships of "Grant" */
export type GrantapplicationsArgs = {
  distinct_on?: InputMaybe<Array<Application_select_column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Application_order_by>>;
  where?: InputMaybe<Application_bool_exp>;
};


/** columns and relationships of "Grant" */
export type GrantmilestoneDraftsArgs = {
  distinct_on?: InputMaybe<Array<MilestoneSet_select_column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<MilestoneSet_order_by>>;
  where?: InputMaybe<MilestoneSet_bool_exp>;
};

/** columns and relationships of "GrantShip" */
export type GrantShip = {
  /** An object relationship */
  alloProfileMembers?: Maybe<ProfileMemberGroup>;
  alloProfileMembers_id?: Maybe<Scalars['String']>;
  anchor: Scalars['String'];
  /** An object relationship */
  applicationReviewReason?: Maybe<RawMetadata>;
  applicationReviewReason_id?: Maybe<Scalars['String']>;
  applicationSubmittedTime?: Maybe<Scalars['Int']>;
  approvedTime?: Maybe<Scalars['Int']>;
  balance: Scalars['numeric'];
  /** An object relationship */
  beaconMessage?: Maybe<RawMetadata>;
  beaconMessage_id?: Maybe<Scalars['String']>;
  chainId: Scalars['Int'];
  /** An object relationship */
  customApplication?: Maybe<RawMetadata>;
  customApplication_id?: Maybe<Scalars['String']>;
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
  alloProfileMembers?: InputMaybe<ProfileMemberGroup_bool_exp>;
  alloProfileMembers_id?: InputMaybe<String_comparison_exp>;
  anchor?: InputMaybe<String_comparison_exp>;
  applicationReviewReason?: InputMaybe<RawMetadata_bool_exp>;
  applicationReviewReason_id?: InputMaybe<String_comparison_exp>;
  applicationSubmittedTime?: InputMaybe<Int_comparison_exp>;
  approvedTime?: InputMaybe<Int_comparison_exp>;
  balance?: InputMaybe<numeric_comparison_exp>;
  beaconMessage?: InputMaybe<RawMetadata_bool_exp>;
  beaconMessage_id?: InputMaybe<String_comparison_exp>;
  chainId?: InputMaybe<Int_comparison_exp>;
  customApplication?: InputMaybe<RawMetadata_bool_exp>;
  customApplication_id?: InputMaybe<String_comparison_exp>;
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
  alloProfileMembers_id?: InputMaybe<order_by>;
  anchor?: InputMaybe<order_by>;
  applicationReviewReason_id?: InputMaybe<order_by>;
  applicationSubmittedTime?: InputMaybe<order_by>;
  approvedTime?: InputMaybe<order_by>;
  balance?: InputMaybe<order_by>;
  beaconMessage_id?: InputMaybe<order_by>;
  chainId?: InputMaybe<order_by>;
  customApplication_id?: InputMaybe<order_by>;
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
  alloProfileMembers_id?: InputMaybe<order_by>;
  anchor?: InputMaybe<order_by>;
  applicationReviewReason_id?: InputMaybe<order_by>;
  applicationSubmittedTime?: InputMaybe<order_by>;
  approvedTime?: InputMaybe<order_by>;
  balance?: InputMaybe<order_by>;
  beaconMessage_id?: InputMaybe<order_by>;
  chainId?: InputMaybe<order_by>;
  customApplication_id?: InputMaybe<order_by>;
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
  alloProfileMembers?: InputMaybe<ProfileMemberGroup_order_by>;
  alloProfileMembers_id?: InputMaybe<order_by>;
  anchor?: InputMaybe<order_by>;
  applicationReviewReason?: InputMaybe<RawMetadata_order_by>;
  applicationReviewReason_id?: InputMaybe<order_by>;
  applicationSubmittedTime?: InputMaybe<order_by>;
  approvedTime?: InputMaybe<order_by>;
  balance?: InputMaybe<order_by>;
  beaconMessage?: InputMaybe<RawMetadata_order_by>;
  beaconMessage_id?: InputMaybe<order_by>;
  chainId?: InputMaybe<order_by>;
  customApplication?: InputMaybe<RawMetadata_order_by>;
  customApplication_id?: InputMaybe<order_by>;
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
  | 'alloProfileMembers_id'
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
  | 'beaconMessage_id'
  /** column name */
  | 'chainId'
  /** column name */
  | 'customApplication_id'
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
  alloProfileMembers_id?: InputMaybe<Scalars['String']>;
  anchor?: InputMaybe<Scalars['String']>;
  applicationReviewReason_id?: InputMaybe<Scalars['String']>;
  applicationSubmittedTime?: InputMaybe<Scalars['Int']>;
  approvedTime?: InputMaybe<Scalars['Int']>;
  balance?: InputMaybe<Scalars['numeric']>;
  beaconMessage_id?: InputMaybe<Scalars['String']>;
  chainId?: InputMaybe<Scalars['Int']>;
  customApplication_id?: InputMaybe<Scalars['String']>;
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

/** columns and relationships of "GrantShipsVoting" */
export type GrantShipsVoting = {
  /** An array relationship */
  choices: Array<ShipChoice>;
  /** An object relationship */
  contest?: Maybe<Contest>;
  contest_id: Scalars['String'];
  db_write_timestamp?: Maybe<Scalars['timestamp']>;
  endTime?: Maybe<Scalars['numeric']>;
  hatId: Scalars['numeric'];
  hatsAddress: Scalars['String'];
  id: Scalars['String'];
  isSBTVoting: Scalars['Boolean'];
  isVotingActive: Scalars['Boolean'];
  startTime?: Maybe<Scalars['numeric']>;
  totalVotes: Scalars['numeric'];
  voteDuration: Scalars['numeric'];
  voteTokenAddress: Scalars['String'];
  /** An array relationship */
  votes: Array<ShipVote>;
  votingCheckpoint: Scalars['numeric'];
};


/** columns and relationships of "GrantShipsVoting" */
export type GrantShipsVotingchoicesArgs = {
  distinct_on?: InputMaybe<Array<ShipChoice_select_column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<ShipChoice_order_by>>;
  where?: InputMaybe<ShipChoice_bool_exp>;
};


/** columns and relationships of "GrantShipsVoting" */
export type GrantShipsVotingvotesArgs = {
  distinct_on?: InputMaybe<Array<ShipVote_select_column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<ShipVote_order_by>>;
  where?: InputMaybe<ShipVote_bool_exp>;
};

/** Boolean expression to filter rows from the table "GrantShipsVoting". All fields are combined with a logical 'AND'. */
export type GrantShipsVoting_bool_exp = {
  _and?: InputMaybe<Array<GrantShipsVoting_bool_exp>>;
  _not?: InputMaybe<GrantShipsVoting_bool_exp>;
  _or?: InputMaybe<Array<GrantShipsVoting_bool_exp>>;
  choices?: InputMaybe<ShipChoice_bool_exp>;
  contest?: InputMaybe<Contest_bool_exp>;
  contest_id?: InputMaybe<String_comparison_exp>;
  db_write_timestamp?: InputMaybe<timestamp_comparison_exp>;
  endTime?: InputMaybe<numeric_comparison_exp>;
  hatId?: InputMaybe<numeric_comparison_exp>;
  hatsAddress?: InputMaybe<String_comparison_exp>;
  id?: InputMaybe<String_comparison_exp>;
  isSBTVoting?: InputMaybe<Boolean_comparison_exp>;
  isVotingActive?: InputMaybe<Boolean_comparison_exp>;
  startTime?: InputMaybe<numeric_comparison_exp>;
  totalVotes?: InputMaybe<numeric_comparison_exp>;
  voteDuration?: InputMaybe<numeric_comparison_exp>;
  voteTokenAddress?: InputMaybe<String_comparison_exp>;
  votes?: InputMaybe<ShipVote_bool_exp>;
  votingCheckpoint?: InputMaybe<numeric_comparison_exp>;
};

/** Ordering options when selecting data from "GrantShipsVoting". */
export type GrantShipsVoting_order_by = {
  choices_aggregate?: InputMaybe<ShipChoice_aggregate_order_by>;
  contest?: InputMaybe<Contest_order_by>;
  contest_id?: InputMaybe<order_by>;
  db_write_timestamp?: InputMaybe<order_by>;
  endTime?: InputMaybe<order_by>;
  hatId?: InputMaybe<order_by>;
  hatsAddress?: InputMaybe<order_by>;
  id?: InputMaybe<order_by>;
  isSBTVoting?: InputMaybe<order_by>;
  isVotingActive?: InputMaybe<order_by>;
  startTime?: InputMaybe<order_by>;
  totalVotes?: InputMaybe<order_by>;
  voteDuration?: InputMaybe<order_by>;
  voteTokenAddress?: InputMaybe<order_by>;
  votes_aggregate?: InputMaybe<ShipVote_aggregate_order_by>;
  votingCheckpoint?: InputMaybe<order_by>;
};

/** select columns of table "GrantShipsVoting" */
export type GrantShipsVoting_select_column =
  /** column name */
  | 'contest_id'
  /** column name */
  | 'db_write_timestamp'
  /** column name */
  | 'endTime'
  /** column name */
  | 'hatId'
  /** column name */
  | 'hatsAddress'
  /** column name */
  | 'id'
  /** column name */
  | 'isSBTVoting'
  /** column name */
  | 'isVotingActive'
  /** column name */
  | 'startTime'
  /** column name */
  | 'totalVotes'
  /** column name */
  | 'voteDuration'
  /** column name */
  | 'voteTokenAddress'
  /** column name */
  | 'votingCheckpoint';

/** Streaming cursor of the table "GrantShipsVoting" */
export type GrantShipsVoting_stream_cursor_input = {
  /** Stream column input with initial value */
  initial_value: GrantShipsVoting_stream_cursor_value_input;
  /** cursor ordering */
  ordering?: InputMaybe<cursor_ordering>;
};

/** Initial value of the column from where the streaming should start */
export type GrantShipsVoting_stream_cursor_value_input = {
  contest_id?: InputMaybe<Scalars['String']>;
  db_write_timestamp?: InputMaybe<Scalars['timestamp']>;
  endTime?: InputMaybe<Scalars['numeric']>;
  hatId?: InputMaybe<Scalars['numeric']>;
  hatsAddress?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
  isSBTVoting?: InputMaybe<Scalars['Boolean']>;
  isVotingActive?: InputMaybe<Scalars['Boolean']>;
  startTime?: InputMaybe<Scalars['numeric']>;
  totalVotes?: InputMaybe<Scalars['numeric']>;
  voteDuration?: InputMaybe<Scalars['numeric']>;
  voteTokenAddress?: InputMaybe<Scalars['String']>;
  votingCheckpoint?: InputMaybe<Scalars['numeric']>;
};

/** order by aggregate values of table "Grant" */
export type Grant_aggregate_order_by = {
  avg?: InputMaybe<Grant_avg_order_by>;
  count?: InputMaybe<order_by>;
  max?: InputMaybe<Grant_max_order_by>;
  min?: InputMaybe<Grant_min_order_by>;
  stddev?: InputMaybe<Grant_stddev_order_by>;
  stddev_pop?: InputMaybe<Grant_stddev_pop_order_by>;
  stddev_samp?: InputMaybe<Grant_stddev_samp_order_by>;
  sum?: InputMaybe<Grant_sum_order_by>;
  var_pop?: InputMaybe<Grant_var_pop_order_by>;
  var_samp?: InputMaybe<Grant_var_samp_order_by>;
  variance?: InputMaybe<Grant_variance_order_by>;
};

/** order by avg() on columns of table "Grant" */
export type Grant_avg_order_by = {
  amount?: InputMaybe<order_by>;
  lastUpdated?: InputMaybe<order_by>;
  status?: InputMaybe<order_by>;
};

/** Boolean expression to filter rows from the table "Grant". All fields are combined with a logical 'AND'. */
export type Grant_bool_exp = {
  _and?: InputMaybe<Array<Grant_bool_exp>>;
  _not?: InputMaybe<Grant_bool_exp>;
  _or?: InputMaybe<Array<Grant_bool_exp>>;
  amount?: InputMaybe<numeric_comparison_exp>;
  applicationApproved?: InputMaybe<Boolean_comparison_exp>;
  applications?: InputMaybe<Application_bool_exp>;
  currentApplication?: InputMaybe<Application_bool_exp>;
  currentApplication_id?: InputMaybe<String_comparison_exp>;
  currentMilestones?: InputMaybe<MilestoneSet_bool_exp>;
  currentMilestones_id?: InputMaybe<String_comparison_exp>;
  db_write_timestamp?: InputMaybe<timestamp_comparison_exp>;
  gameManager?: InputMaybe<GameManager_bool_exp>;
  gameManager_id?: InputMaybe<String_comparison_exp>;
  grantCompleted?: InputMaybe<Boolean_comparison_exp>;
  id?: InputMaybe<String_comparison_exp>;
  isAllocated?: InputMaybe<Boolean_comparison_exp>;
  lastUpdated?: InputMaybe<Int_comparison_exp>;
  milestoneDrafts?: InputMaybe<MilestoneSet_bool_exp>;
  project?: InputMaybe<Project_bool_exp>;
  project_id?: InputMaybe<String_comparison_exp>;
  ship?: InputMaybe<GrantShip_bool_exp>;
  ship_id?: InputMaybe<String_comparison_exp>;
  status?: InputMaybe<Int_comparison_exp>;
};

/** order by max() on columns of table "Grant" */
export type Grant_max_order_by = {
  amount?: InputMaybe<order_by>;
  currentApplication_id?: InputMaybe<order_by>;
  currentMilestones_id?: InputMaybe<order_by>;
  db_write_timestamp?: InputMaybe<order_by>;
  gameManager_id?: InputMaybe<order_by>;
  id?: InputMaybe<order_by>;
  lastUpdated?: InputMaybe<order_by>;
  project_id?: InputMaybe<order_by>;
  ship_id?: InputMaybe<order_by>;
  status?: InputMaybe<order_by>;
};

/** order by min() on columns of table "Grant" */
export type Grant_min_order_by = {
  amount?: InputMaybe<order_by>;
  currentApplication_id?: InputMaybe<order_by>;
  currentMilestones_id?: InputMaybe<order_by>;
  db_write_timestamp?: InputMaybe<order_by>;
  gameManager_id?: InputMaybe<order_by>;
  id?: InputMaybe<order_by>;
  lastUpdated?: InputMaybe<order_by>;
  project_id?: InputMaybe<order_by>;
  ship_id?: InputMaybe<order_by>;
  status?: InputMaybe<order_by>;
};

/** Ordering options when selecting data from "Grant". */
export type Grant_order_by = {
  amount?: InputMaybe<order_by>;
  applicationApproved?: InputMaybe<order_by>;
  applications_aggregate?: InputMaybe<Application_aggregate_order_by>;
  currentApplication?: InputMaybe<Application_order_by>;
  currentApplication_id?: InputMaybe<order_by>;
  currentMilestones?: InputMaybe<MilestoneSet_order_by>;
  currentMilestones_id?: InputMaybe<order_by>;
  db_write_timestamp?: InputMaybe<order_by>;
  gameManager?: InputMaybe<GameManager_order_by>;
  gameManager_id?: InputMaybe<order_by>;
  grantCompleted?: InputMaybe<order_by>;
  id?: InputMaybe<order_by>;
  isAllocated?: InputMaybe<order_by>;
  lastUpdated?: InputMaybe<order_by>;
  milestoneDrafts_aggregate?: InputMaybe<MilestoneSet_aggregate_order_by>;
  project?: InputMaybe<Project_order_by>;
  project_id?: InputMaybe<order_by>;
  ship?: InputMaybe<GrantShip_order_by>;
  ship_id?: InputMaybe<order_by>;
  status?: InputMaybe<order_by>;
};

/** select columns of table "Grant" */
export type Grant_select_column =
  /** column name */
  | 'amount'
  /** column name */
  | 'applicationApproved'
  /** column name */
  | 'currentApplication_id'
  /** column name */
  | 'currentMilestones_id'
  /** column name */
  | 'db_write_timestamp'
  /** column name */
  | 'gameManager_id'
  /** column name */
  | 'grantCompleted'
  /** column name */
  | 'id'
  /** column name */
  | 'isAllocated'
  /** column name */
  | 'lastUpdated'
  /** column name */
  | 'project_id'
  /** column name */
  | 'ship_id'
  /** column name */
  | 'status';

/** order by stddev() on columns of table "Grant" */
export type Grant_stddev_order_by = {
  amount?: InputMaybe<order_by>;
  lastUpdated?: InputMaybe<order_by>;
  status?: InputMaybe<order_by>;
};

/** order by stddev_pop() on columns of table "Grant" */
export type Grant_stddev_pop_order_by = {
  amount?: InputMaybe<order_by>;
  lastUpdated?: InputMaybe<order_by>;
  status?: InputMaybe<order_by>;
};

/** order by stddev_samp() on columns of table "Grant" */
export type Grant_stddev_samp_order_by = {
  amount?: InputMaybe<order_by>;
  lastUpdated?: InputMaybe<order_by>;
  status?: InputMaybe<order_by>;
};

/** Streaming cursor of the table "Grant" */
export type Grant_stream_cursor_input = {
  /** Stream column input with initial value */
  initial_value: Grant_stream_cursor_value_input;
  /** cursor ordering */
  ordering?: InputMaybe<cursor_ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Grant_stream_cursor_value_input = {
  amount?: InputMaybe<Scalars['numeric']>;
  applicationApproved?: InputMaybe<Scalars['Boolean']>;
  currentApplication_id?: InputMaybe<Scalars['String']>;
  currentMilestones_id?: InputMaybe<Scalars['String']>;
  db_write_timestamp?: InputMaybe<Scalars['timestamp']>;
  gameManager_id?: InputMaybe<Scalars['String']>;
  grantCompleted?: InputMaybe<Scalars['Boolean']>;
  id?: InputMaybe<Scalars['String']>;
  isAllocated?: InputMaybe<Scalars['Boolean']>;
  lastUpdated?: InputMaybe<Scalars['Int']>;
  project_id?: InputMaybe<Scalars['String']>;
  ship_id?: InputMaybe<Scalars['String']>;
  status?: InputMaybe<Scalars['Int']>;
};

/** order by sum() on columns of table "Grant" */
export type Grant_sum_order_by = {
  amount?: InputMaybe<order_by>;
  lastUpdated?: InputMaybe<order_by>;
  status?: InputMaybe<order_by>;
};

/** order by var_pop() on columns of table "Grant" */
export type Grant_var_pop_order_by = {
  amount?: InputMaybe<order_by>;
  lastUpdated?: InputMaybe<order_by>;
  status?: InputMaybe<order_by>;
};

/** order by var_samp() on columns of table "Grant" */
export type Grant_var_samp_order_by = {
  amount?: InputMaybe<order_by>;
  lastUpdated?: InputMaybe<order_by>;
  status?: InputMaybe<order_by>;
};

/** order by variance() on columns of table "Grant" */
export type Grant_variance_order_by = {
  amount?: InputMaybe<order_by>;
  lastUpdated?: InputMaybe<order_by>;
  status?: InputMaybe<order_by>;
};

/** columns and relationships of "HALParams" */
export type HALParams = {
  db_write_timestamp?: Maybe<Scalars['timestamp']>;
  hatId: Scalars['numeric'];
  hatsAddress: Scalars['String'];
  id: Scalars['String'];
};

/** Boolean expression to filter rows from the table "HALParams". All fields are combined with a logical 'AND'. */
export type HALParams_bool_exp = {
  _and?: InputMaybe<Array<HALParams_bool_exp>>;
  _not?: InputMaybe<HALParams_bool_exp>;
  _or?: InputMaybe<Array<HALParams_bool_exp>>;
  db_write_timestamp?: InputMaybe<timestamp_comparison_exp>;
  hatId?: InputMaybe<numeric_comparison_exp>;
  hatsAddress?: InputMaybe<String_comparison_exp>;
  id?: InputMaybe<String_comparison_exp>;
};

/** Ordering options when selecting data from "HALParams". */
export type HALParams_order_by = {
  db_write_timestamp?: InputMaybe<order_by>;
  hatId?: InputMaybe<order_by>;
  hatsAddress?: InputMaybe<order_by>;
  id?: InputMaybe<order_by>;
};

/** select columns of table "HALParams" */
export type HALParams_select_column =
  /** column name */
  | 'db_write_timestamp'
  /** column name */
  | 'hatId'
  /** column name */
  | 'hatsAddress'
  /** column name */
  | 'id';

/** Streaming cursor of the table "HALParams" */
export type HALParams_stream_cursor_input = {
  /** Stream column input with initial value */
  initial_value: HALParams_stream_cursor_value_input;
  /** cursor ordering */
  ordering?: InputMaybe<cursor_ordering>;
};

/** Initial value of the column from where the streaming should start */
export type HALParams_stream_cursor_value_input = {
  db_write_timestamp?: InputMaybe<Scalars['timestamp']>;
  hatId?: InputMaybe<Scalars['numeric']>;
  hatsAddress?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
};

/** columns and relationships of "HatsPoster" */
export type HatsPoster = {
  db_write_timestamp?: Maybe<Scalars['timestamp']>;
  /** An array relationship */
  eventPosts: Array<EventPost>;
  hatIds: Scalars['_numeric'];
  hatsAddress: Scalars['String'];
  id: Scalars['String'];
  /** An array relationship */
  record: Array<Record>;
};


/** columns and relationships of "HatsPoster" */
export type HatsPostereventPostsArgs = {
  distinct_on?: InputMaybe<Array<EventPost_select_column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<EventPost_order_by>>;
  where?: InputMaybe<EventPost_bool_exp>;
};


/** columns and relationships of "HatsPoster" */
export type HatsPosterrecordArgs = {
  distinct_on?: InputMaybe<Array<Record_select_column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Record_order_by>>;
  where?: InputMaybe<Record_bool_exp>;
};

/** Boolean expression to filter rows from the table "HatsPoster". All fields are combined with a logical 'AND'. */
export type HatsPoster_bool_exp = {
  _and?: InputMaybe<Array<HatsPoster_bool_exp>>;
  _not?: InputMaybe<HatsPoster_bool_exp>;
  _or?: InputMaybe<Array<HatsPoster_bool_exp>>;
  db_write_timestamp?: InputMaybe<timestamp_comparison_exp>;
  eventPosts?: InputMaybe<EventPost_bool_exp>;
  hatIds?: InputMaybe<_numeric_comparison_exp>;
  hatsAddress?: InputMaybe<String_comparison_exp>;
  id?: InputMaybe<String_comparison_exp>;
  record?: InputMaybe<Record_bool_exp>;
};

/** Ordering options when selecting data from "HatsPoster". */
export type HatsPoster_order_by = {
  db_write_timestamp?: InputMaybe<order_by>;
  eventPosts_aggregate?: InputMaybe<EventPost_aggregate_order_by>;
  hatIds?: InputMaybe<order_by>;
  hatsAddress?: InputMaybe<order_by>;
  id?: InputMaybe<order_by>;
  record_aggregate?: InputMaybe<Record_aggregate_order_by>;
};

/** select columns of table "HatsPoster" */
export type HatsPoster_select_column =
  /** column name */
  | 'db_write_timestamp'
  /** column name */
  | 'hatIds'
  /** column name */
  | 'hatsAddress'
  /** column name */
  | 'id';

/** Streaming cursor of the table "HatsPoster" */
export type HatsPoster_stream_cursor_input = {
  /** Stream column input with initial value */
  initial_value: HatsPoster_stream_cursor_value_input;
  /** cursor ordering */
  ordering?: InputMaybe<cursor_ordering>;
};

/** Initial value of the column from where the streaming should start */
export type HatsPoster_stream_cursor_value_input = {
  db_write_timestamp?: InputMaybe<Scalars['timestamp']>;
  hatIds?: InputMaybe<Scalars['_numeric']>;
  hatsAddress?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
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

/** columns and relationships of "LocalLog" */
export type LocalLog = {
  db_write_timestamp?: Maybe<Scalars['timestamp']>;
  id: Scalars['String'];
  message?: Maybe<Scalars['String']>;
};

/** Boolean expression to filter rows from the table "LocalLog". All fields are combined with a logical 'AND'. */
export type LocalLog_bool_exp = {
  _and?: InputMaybe<Array<LocalLog_bool_exp>>;
  _not?: InputMaybe<LocalLog_bool_exp>;
  _or?: InputMaybe<Array<LocalLog_bool_exp>>;
  db_write_timestamp?: InputMaybe<timestamp_comparison_exp>;
  id?: InputMaybe<String_comparison_exp>;
  message?: InputMaybe<String_comparison_exp>;
};

/** Ordering options when selecting data from "LocalLog". */
export type LocalLog_order_by = {
  db_write_timestamp?: InputMaybe<order_by>;
  id?: InputMaybe<order_by>;
  message?: InputMaybe<order_by>;
};

/** select columns of table "LocalLog" */
export type LocalLog_select_column =
  /** column name */
  | 'db_write_timestamp'
  /** column name */
  | 'id'
  /** column name */
  | 'message';

/** Streaming cursor of the table "LocalLog" */
export type LocalLog_stream_cursor_input = {
  /** Stream column input with initial value */
  initial_value: LocalLog_stream_cursor_value_input;
  /** cursor ordering */
  ordering?: InputMaybe<cursor_ordering>;
};

/** Initial value of the column from where the streaming should start */
export type LocalLog_stream_cursor_value_input = {
  db_write_timestamp?: InputMaybe<Scalars['timestamp']>;
  id?: InputMaybe<Scalars['String']>;
  message?: InputMaybe<Scalars['String']>;
};

/** columns and relationships of "Milestone" */
export type Milestone = {
  db_write_timestamp?: Maybe<Scalars['timestamp']>;
  /** An object relationship */
  grant?: Maybe<Grant>;
  grant_id: Scalars['String'];
  id: Scalars['String'];
  /** An object relationship */
  metadata?: Maybe<RawMetadata>;
  metadata_id: Scalars['String'];
  /** An object relationship */
  milestoneSet?: Maybe<MilestoneSet>;
  milestoneSet_id: Scalars['String'];
  percentage: Scalars['numeric'];
  status: Scalars['Int'];
};

/** columns and relationships of "MilestoneSet" */
export type MilestoneSet = {
  db_write_timestamp?: Maybe<Scalars['timestamp']>;
  /** An object relationship */
  grant?: Maybe<Grant>;
  grant_id: Scalars['String'];
  id: Scalars['String'];
  index: Scalars['Int'];
  milestoneLength: Scalars['Int'];
  /** An array relationship */
  milestones: Array<Milestone>;
  status: Scalars['Int'];
  timestamp: Scalars['Int'];
};


/** columns and relationships of "MilestoneSet" */
export type MilestoneSetmilestonesArgs = {
  distinct_on?: InputMaybe<Array<Milestone_select_column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Milestone_order_by>>;
  where?: InputMaybe<Milestone_bool_exp>;
};

/** order by aggregate values of table "MilestoneSet" */
export type MilestoneSet_aggregate_order_by = {
  avg?: InputMaybe<MilestoneSet_avg_order_by>;
  count?: InputMaybe<order_by>;
  max?: InputMaybe<MilestoneSet_max_order_by>;
  min?: InputMaybe<MilestoneSet_min_order_by>;
  stddev?: InputMaybe<MilestoneSet_stddev_order_by>;
  stddev_pop?: InputMaybe<MilestoneSet_stddev_pop_order_by>;
  stddev_samp?: InputMaybe<MilestoneSet_stddev_samp_order_by>;
  sum?: InputMaybe<MilestoneSet_sum_order_by>;
  var_pop?: InputMaybe<MilestoneSet_var_pop_order_by>;
  var_samp?: InputMaybe<MilestoneSet_var_samp_order_by>;
  variance?: InputMaybe<MilestoneSet_variance_order_by>;
};

/** order by avg() on columns of table "MilestoneSet" */
export type MilestoneSet_avg_order_by = {
  index?: InputMaybe<order_by>;
  milestoneLength?: InputMaybe<order_by>;
  status?: InputMaybe<order_by>;
  timestamp?: InputMaybe<order_by>;
};

/** Boolean expression to filter rows from the table "MilestoneSet". All fields are combined with a logical 'AND'. */
export type MilestoneSet_bool_exp = {
  _and?: InputMaybe<Array<MilestoneSet_bool_exp>>;
  _not?: InputMaybe<MilestoneSet_bool_exp>;
  _or?: InputMaybe<Array<MilestoneSet_bool_exp>>;
  db_write_timestamp?: InputMaybe<timestamp_comparison_exp>;
  grant?: InputMaybe<Grant_bool_exp>;
  grant_id?: InputMaybe<String_comparison_exp>;
  id?: InputMaybe<String_comparison_exp>;
  index?: InputMaybe<Int_comparison_exp>;
  milestoneLength?: InputMaybe<Int_comparison_exp>;
  milestones?: InputMaybe<Milestone_bool_exp>;
  status?: InputMaybe<Int_comparison_exp>;
  timestamp?: InputMaybe<Int_comparison_exp>;
};

/** order by max() on columns of table "MilestoneSet" */
export type MilestoneSet_max_order_by = {
  db_write_timestamp?: InputMaybe<order_by>;
  grant_id?: InputMaybe<order_by>;
  id?: InputMaybe<order_by>;
  index?: InputMaybe<order_by>;
  milestoneLength?: InputMaybe<order_by>;
  status?: InputMaybe<order_by>;
  timestamp?: InputMaybe<order_by>;
};

/** order by min() on columns of table "MilestoneSet" */
export type MilestoneSet_min_order_by = {
  db_write_timestamp?: InputMaybe<order_by>;
  grant_id?: InputMaybe<order_by>;
  id?: InputMaybe<order_by>;
  index?: InputMaybe<order_by>;
  milestoneLength?: InputMaybe<order_by>;
  status?: InputMaybe<order_by>;
  timestamp?: InputMaybe<order_by>;
};

/** Ordering options when selecting data from "MilestoneSet". */
export type MilestoneSet_order_by = {
  db_write_timestamp?: InputMaybe<order_by>;
  grant?: InputMaybe<Grant_order_by>;
  grant_id?: InputMaybe<order_by>;
  id?: InputMaybe<order_by>;
  index?: InputMaybe<order_by>;
  milestoneLength?: InputMaybe<order_by>;
  milestones_aggregate?: InputMaybe<Milestone_aggregate_order_by>;
  status?: InputMaybe<order_by>;
  timestamp?: InputMaybe<order_by>;
};

/** select columns of table "MilestoneSet" */
export type MilestoneSet_select_column =
  /** column name */
  | 'db_write_timestamp'
  /** column name */
  | 'grant_id'
  /** column name */
  | 'id'
  /** column name */
  | 'index'
  /** column name */
  | 'milestoneLength'
  /** column name */
  | 'status'
  /** column name */
  | 'timestamp';

/** order by stddev() on columns of table "MilestoneSet" */
export type MilestoneSet_stddev_order_by = {
  index?: InputMaybe<order_by>;
  milestoneLength?: InputMaybe<order_by>;
  status?: InputMaybe<order_by>;
  timestamp?: InputMaybe<order_by>;
};

/** order by stddev_pop() on columns of table "MilestoneSet" */
export type MilestoneSet_stddev_pop_order_by = {
  index?: InputMaybe<order_by>;
  milestoneLength?: InputMaybe<order_by>;
  status?: InputMaybe<order_by>;
  timestamp?: InputMaybe<order_by>;
};

/** order by stddev_samp() on columns of table "MilestoneSet" */
export type MilestoneSet_stddev_samp_order_by = {
  index?: InputMaybe<order_by>;
  milestoneLength?: InputMaybe<order_by>;
  status?: InputMaybe<order_by>;
  timestamp?: InputMaybe<order_by>;
};

/** Streaming cursor of the table "MilestoneSet" */
export type MilestoneSet_stream_cursor_input = {
  /** Stream column input with initial value */
  initial_value: MilestoneSet_stream_cursor_value_input;
  /** cursor ordering */
  ordering?: InputMaybe<cursor_ordering>;
};

/** Initial value of the column from where the streaming should start */
export type MilestoneSet_stream_cursor_value_input = {
  db_write_timestamp?: InputMaybe<Scalars['timestamp']>;
  grant_id?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
  index?: InputMaybe<Scalars['Int']>;
  milestoneLength?: InputMaybe<Scalars['Int']>;
  status?: InputMaybe<Scalars['Int']>;
  timestamp?: InputMaybe<Scalars['Int']>;
};

/** order by sum() on columns of table "MilestoneSet" */
export type MilestoneSet_sum_order_by = {
  index?: InputMaybe<order_by>;
  milestoneLength?: InputMaybe<order_by>;
  status?: InputMaybe<order_by>;
  timestamp?: InputMaybe<order_by>;
};

/** order by var_pop() on columns of table "MilestoneSet" */
export type MilestoneSet_var_pop_order_by = {
  index?: InputMaybe<order_by>;
  milestoneLength?: InputMaybe<order_by>;
  status?: InputMaybe<order_by>;
  timestamp?: InputMaybe<order_by>;
};

/** order by var_samp() on columns of table "MilestoneSet" */
export type MilestoneSet_var_samp_order_by = {
  index?: InputMaybe<order_by>;
  milestoneLength?: InputMaybe<order_by>;
  status?: InputMaybe<order_by>;
  timestamp?: InputMaybe<order_by>;
};

/** order by variance() on columns of table "MilestoneSet" */
export type MilestoneSet_variance_order_by = {
  index?: InputMaybe<order_by>;
  milestoneLength?: InputMaybe<order_by>;
  status?: InputMaybe<order_by>;
  timestamp?: InputMaybe<order_by>;
};

/** order by aggregate values of table "Milestone" */
export type Milestone_aggregate_order_by = {
  avg?: InputMaybe<Milestone_avg_order_by>;
  count?: InputMaybe<order_by>;
  max?: InputMaybe<Milestone_max_order_by>;
  min?: InputMaybe<Milestone_min_order_by>;
  stddev?: InputMaybe<Milestone_stddev_order_by>;
  stddev_pop?: InputMaybe<Milestone_stddev_pop_order_by>;
  stddev_samp?: InputMaybe<Milestone_stddev_samp_order_by>;
  sum?: InputMaybe<Milestone_sum_order_by>;
  var_pop?: InputMaybe<Milestone_var_pop_order_by>;
  var_samp?: InputMaybe<Milestone_var_samp_order_by>;
  variance?: InputMaybe<Milestone_variance_order_by>;
};

/** order by avg() on columns of table "Milestone" */
export type Milestone_avg_order_by = {
  percentage?: InputMaybe<order_by>;
  status?: InputMaybe<order_by>;
};

/** Boolean expression to filter rows from the table "Milestone". All fields are combined with a logical 'AND'. */
export type Milestone_bool_exp = {
  _and?: InputMaybe<Array<Milestone_bool_exp>>;
  _not?: InputMaybe<Milestone_bool_exp>;
  _or?: InputMaybe<Array<Milestone_bool_exp>>;
  db_write_timestamp?: InputMaybe<timestamp_comparison_exp>;
  grant?: InputMaybe<Grant_bool_exp>;
  grant_id?: InputMaybe<String_comparison_exp>;
  id?: InputMaybe<String_comparison_exp>;
  metadata?: InputMaybe<RawMetadata_bool_exp>;
  metadata_id?: InputMaybe<String_comparison_exp>;
  milestoneSet?: InputMaybe<MilestoneSet_bool_exp>;
  milestoneSet_id?: InputMaybe<String_comparison_exp>;
  percentage?: InputMaybe<numeric_comparison_exp>;
  status?: InputMaybe<Int_comparison_exp>;
};

/** order by max() on columns of table "Milestone" */
export type Milestone_max_order_by = {
  db_write_timestamp?: InputMaybe<order_by>;
  grant_id?: InputMaybe<order_by>;
  id?: InputMaybe<order_by>;
  metadata_id?: InputMaybe<order_by>;
  milestoneSet_id?: InputMaybe<order_by>;
  percentage?: InputMaybe<order_by>;
  status?: InputMaybe<order_by>;
};

/** order by min() on columns of table "Milestone" */
export type Milestone_min_order_by = {
  db_write_timestamp?: InputMaybe<order_by>;
  grant_id?: InputMaybe<order_by>;
  id?: InputMaybe<order_by>;
  metadata_id?: InputMaybe<order_by>;
  milestoneSet_id?: InputMaybe<order_by>;
  percentage?: InputMaybe<order_by>;
  status?: InputMaybe<order_by>;
};

/** Ordering options when selecting data from "Milestone". */
export type Milestone_order_by = {
  db_write_timestamp?: InputMaybe<order_by>;
  grant?: InputMaybe<Grant_order_by>;
  grant_id?: InputMaybe<order_by>;
  id?: InputMaybe<order_by>;
  metadata?: InputMaybe<RawMetadata_order_by>;
  metadata_id?: InputMaybe<order_by>;
  milestoneSet?: InputMaybe<MilestoneSet_order_by>;
  milestoneSet_id?: InputMaybe<order_by>;
  percentage?: InputMaybe<order_by>;
  status?: InputMaybe<order_by>;
};

/** select columns of table "Milestone" */
export type Milestone_select_column =
  /** column name */
  | 'db_write_timestamp'
  /** column name */
  | 'grant_id'
  /** column name */
  | 'id'
  /** column name */
  | 'metadata_id'
  /** column name */
  | 'milestoneSet_id'
  /** column name */
  | 'percentage'
  /** column name */
  | 'status';

/** order by stddev() on columns of table "Milestone" */
export type Milestone_stddev_order_by = {
  percentage?: InputMaybe<order_by>;
  status?: InputMaybe<order_by>;
};

/** order by stddev_pop() on columns of table "Milestone" */
export type Milestone_stddev_pop_order_by = {
  percentage?: InputMaybe<order_by>;
  status?: InputMaybe<order_by>;
};

/** order by stddev_samp() on columns of table "Milestone" */
export type Milestone_stddev_samp_order_by = {
  percentage?: InputMaybe<order_by>;
  status?: InputMaybe<order_by>;
};

/** Streaming cursor of the table "Milestone" */
export type Milestone_stream_cursor_input = {
  /** Stream column input with initial value */
  initial_value: Milestone_stream_cursor_value_input;
  /** cursor ordering */
  ordering?: InputMaybe<cursor_ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Milestone_stream_cursor_value_input = {
  db_write_timestamp?: InputMaybe<Scalars['timestamp']>;
  grant_id?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
  metadata_id?: InputMaybe<Scalars['String']>;
  milestoneSet_id?: InputMaybe<Scalars['String']>;
  percentage?: InputMaybe<Scalars['numeric']>;
  status?: InputMaybe<Scalars['Int']>;
};

/** order by sum() on columns of table "Milestone" */
export type Milestone_sum_order_by = {
  percentage?: InputMaybe<order_by>;
  status?: InputMaybe<order_by>;
};

/** order by var_pop() on columns of table "Milestone" */
export type Milestone_var_pop_order_by = {
  percentage?: InputMaybe<order_by>;
  status?: InputMaybe<order_by>;
};

/** order by var_samp() on columns of table "Milestone" */
export type Milestone_var_samp_order_by = {
  percentage?: InputMaybe<order_by>;
  status?: InputMaybe<order_by>;
};

/** order by variance() on columns of table "Milestone" */
export type Milestone_variance_order_by = {
  percentage?: InputMaybe<order_by>;
  status?: InputMaybe<order_by>;
};

/** columns and relationships of "ModuleTemplate" */
export type ModuleTemplate = {
  active: Scalars['Boolean'];
  db_write_timestamp?: Maybe<Scalars['timestamp']>;
  id: Scalars['String'];
  mdPointer: Scalars['String'];
  mdProtocol: Scalars['numeric'];
  moduleName: Scalars['String'];
  templateAddress: Scalars['String'];
};

/** Boolean expression to filter rows from the table "ModuleTemplate". All fields are combined with a logical 'AND'. */
export type ModuleTemplate_bool_exp = {
  _and?: InputMaybe<Array<ModuleTemplate_bool_exp>>;
  _not?: InputMaybe<ModuleTemplate_bool_exp>;
  _or?: InputMaybe<Array<ModuleTemplate_bool_exp>>;
  active?: InputMaybe<Boolean_comparison_exp>;
  db_write_timestamp?: InputMaybe<timestamp_comparison_exp>;
  id?: InputMaybe<String_comparison_exp>;
  mdPointer?: InputMaybe<String_comparison_exp>;
  mdProtocol?: InputMaybe<numeric_comparison_exp>;
  moduleName?: InputMaybe<String_comparison_exp>;
  templateAddress?: InputMaybe<String_comparison_exp>;
};

/** Ordering options when selecting data from "ModuleTemplate". */
export type ModuleTemplate_order_by = {
  active?: InputMaybe<order_by>;
  db_write_timestamp?: InputMaybe<order_by>;
  id?: InputMaybe<order_by>;
  mdPointer?: InputMaybe<order_by>;
  mdProtocol?: InputMaybe<order_by>;
  moduleName?: InputMaybe<order_by>;
  templateAddress?: InputMaybe<order_by>;
};

/** select columns of table "ModuleTemplate" */
export type ModuleTemplate_select_column =
  /** column name */
  | 'active'
  /** column name */
  | 'db_write_timestamp'
  /** column name */
  | 'id'
  /** column name */
  | 'mdPointer'
  /** column name */
  | 'mdProtocol'
  /** column name */
  | 'moduleName'
  /** column name */
  | 'templateAddress';

/** Streaming cursor of the table "ModuleTemplate" */
export type ModuleTemplate_stream_cursor_input = {
  /** Stream column input with initial value */
  initial_value: ModuleTemplate_stream_cursor_value_input;
  /** cursor ordering */
  ordering?: InputMaybe<cursor_ordering>;
};

/** Initial value of the column from where the streaming should start */
export type ModuleTemplate_stream_cursor_value_input = {
  active?: InputMaybe<Scalars['Boolean']>;
  db_write_timestamp?: InputMaybe<Scalars['timestamp']>;
  id?: InputMaybe<Scalars['String']>;
  mdPointer?: InputMaybe<Scalars['String']>;
  mdProtocol?: InputMaybe<Scalars['numeric']>;
  moduleName?: InputMaybe<Scalars['String']>;
  templateAddress?: InputMaybe<Scalars['String']>;
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

/** columns and relationships of "Record" */
export type Record = {
  db_write_timestamp?: Maybe<Scalars['timestamp']>;
  hatId: Scalars['numeric'];
  /** An object relationship */
  hatsPoster?: Maybe<HatsPoster>;
  hatsPoster_id: Scalars['String'];
  id: Scalars['String'];
  mdPointer: Scalars['String'];
  mdProtocol: Scalars['numeric'];
  nonce: Scalars['String'];
  tag: Scalars['String'];
};

/** order by aggregate values of table "Record" */
export type Record_aggregate_order_by = {
  avg?: InputMaybe<Record_avg_order_by>;
  count?: InputMaybe<order_by>;
  max?: InputMaybe<Record_max_order_by>;
  min?: InputMaybe<Record_min_order_by>;
  stddev?: InputMaybe<Record_stddev_order_by>;
  stddev_pop?: InputMaybe<Record_stddev_pop_order_by>;
  stddev_samp?: InputMaybe<Record_stddev_samp_order_by>;
  sum?: InputMaybe<Record_sum_order_by>;
  var_pop?: InputMaybe<Record_var_pop_order_by>;
  var_samp?: InputMaybe<Record_var_samp_order_by>;
  variance?: InputMaybe<Record_variance_order_by>;
};

/** order by avg() on columns of table "Record" */
export type Record_avg_order_by = {
  hatId?: InputMaybe<order_by>;
  mdProtocol?: InputMaybe<order_by>;
};

/** Boolean expression to filter rows from the table "Record". All fields are combined with a logical 'AND'. */
export type Record_bool_exp = {
  _and?: InputMaybe<Array<Record_bool_exp>>;
  _not?: InputMaybe<Record_bool_exp>;
  _or?: InputMaybe<Array<Record_bool_exp>>;
  db_write_timestamp?: InputMaybe<timestamp_comparison_exp>;
  hatId?: InputMaybe<numeric_comparison_exp>;
  hatsPoster?: InputMaybe<HatsPoster_bool_exp>;
  hatsPoster_id?: InputMaybe<String_comparison_exp>;
  id?: InputMaybe<String_comparison_exp>;
  mdPointer?: InputMaybe<String_comparison_exp>;
  mdProtocol?: InputMaybe<numeric_comparison_exp>;
  nonce?: InputMaybe<String_comparison_exp>;
  tag?: InputMaybe<String_comparison_exp>;
};

/** order by max() on columns of table "Record" */
export type Record_max_order_by = {
  db_write_timestamp?: InputMaybe<order_by>;
  hatId?: InputMaybe<order_by>;
  hatsPoster_id?: InputMaybe<order_by>;
  id?: InputMaybe<order_by>;
  mdPointer?: InputMaybe<order_by>;
  mdProtocol?: InputMaybe<order_by>;
  nonce?: InputMaybe<order_by>;
  tag?: InputMaybe<order_by>;
};

/** order by min() on columns of table "Record" */
export type Record_min_order_by = {
  db_write_timestamp?: InputMaybe<order_by>;
  hatId?: InputMaybe<order_by>;
  hatsPoster_id?: InputMaybe<order_by>;
  id?: InputMaybe<order_by>;
  mdPointer?: InputMaybe<order_by>;
  mdProtocol?: InputMaybe<order_by>;
  nonce?: InputMaybe<order_by>;
  tag?: InputMaybe<order_by>;
};

/** Ordering options when selecting data from "Record". */
export type Record_order_by = {
  db_write_timestamp?: InputMaybe<order_by>;
  hatId?: InputMaybe<order_by>;
  hatsPoster?: InputMaybe<HatsPoster_order_by>;
  hatsPoster_id?: InputMaybe<order_by>;
  id?: InputMaybe<order_by>;
  mdPointer?: InputMaybe<order_by>;
  mdProtocol?: InputMaybe<order_by>;
  nonce?: InputMaybe<order_by>;
  tag?: InputMaybe<order_by>;
};

/** select columns of table "Record" */
export type Record_select_column =
  /** column name */
  | 'db_write_timestamp'
  /** column name */
  | 'hatId'
  /** column name */
  | 'hatsPoster_id'
  /** column name */
  | 'id'
  /** column name */
  | 'mdPointer'
  /** column name */
  | 'mdProtocol'
  /** column name */
  | 'nonce'
  /** column name */
  | 'tag';

/** order by stddev() on columns of table "Record" */
export type Record_stddev_order_by = {
  hatId?: InputMaybe<order_by>;
  mdProtocol?: InputMaybe<order_by>;
};

/** order by stddev_pop() on columns of table "Record" */
export type Record_stddev_pop_order_by = {
  hatId?: InputMaybe<order_by>;
  mdProtocol?: InputMaybe<order_by>;
};

/** order by stddev_samp() on columns of table "Record" */
export type Record_stddev_samp_order_by = {
  hatId?: InputMaybe<order_by>;
  mdProtocol?: InputMaybe<order_by>;
};

/** Streaming cursor of the table "Record" */
export type Record_stream_cursor_input = {
  /** Stream column input with initial value */
  initial_value: Record_stream_cursor_value_input;
  /** cursor ordering */
  ordering?: InputMaybe<cursor_ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Record_stream_cursor_value_input = {
  db_write_timestamp?: InputMaybe<Scalars['timestamp']>;
  hatId?: InputMaybe<Scalars['numeric']>;
  hatsPoster_id?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
  mdPointer?: InputMaybe<Scalars['String']>;
  mdProtocol?: InputMaybe<Scalars['numeric']>;
  nonce?: InputMaybe<Scalars['String']>;
  tag?: InputMaybe<Scalars['String']>;
};

/** order by sum() on columns of table "Record" */
export type Record_sum_order_by = {
  hatId?: InputMaybe<order_by>;
  mdProtocol?: InputMaybe<order_by>;
};

/** order by var_pop() on columns of table "Record" */
export type Record_var_pop_order_by = {
  hatId?: InputMaybe<order_by>;
  mdProtocol?: InputMaybe<order_by>;
};

/** order by var_samp() on columns of table "Record" */
export type Record_var_samp_order_by = {
  hatId?: InputMaybe<order_by>;
  mdProtocol?: InputMaybe<order_by>;
};

/** order by variance() on columns of table "Record" */
export type Record_variance_order_by = {
  hatId?: InputMaybe<order_by>;
  mdProtocol?: InputMaybe<order_by>;
};

/** columns and relationships of "SBTBalParams" */
export type SBTBalParams = {
  db_write_timestamp?: Maybe<Scalars['timestamp']>;
  id: Scalars['String'];
  voteTokenAddress: Scalars['String'];
};

/** Boolean expression to filter rows from the table "SBTBalParams". All fields are combined with a logical 'AND'. */
export type SBTBalParams_bool_exp = {
  _and?: InputMaybe<Array<SBTBalParams_bool_exp>>;
  _not?: InputMaybe<SBTBalParams_bool_exp>;
  _or?: InputMaybe<Array<SBTBalParams_bool_exp>>;
  db_write_timestamp?: InputMaybe<timestamp_comparison_exp>;
  id?: InputMaybe<String_comparison_exp>;
  voteTokenAddress?: InputMaybe<String_comparison_exp>;
};

/** Ordering options when selecting data from "SBTBalParams". */
export type SBTBalParams_order_by = {
  db_write_timestamp?: InputMaybe<order_by>;
  id?: InputMaybe<order_by>;
  voteTokenAddress?: InputMaybe<order_by>;
};

/** select columns of table "SBTBalParams" */
export type SBTBalParams_select_column =
  /** column name */
  | 'db_write_timestamp'
  /** column name */
  | 'id'
  /** column name */
  | 'voteTokenAddress';

/** Streaming cursor of the table "SBTBalParams" */
export type SBTBalParams_stream_cursor_input = {
  /** Stream column input with initial value */
  initial_value: SBTBalParams_stream_cursor_value_input;
  /** cursor ordering */
  ordering?: InputMaybe<cursor_ordering>;
};

/** Initial value of the column from where the streaming should start */
export type SBTBalParams_stream_cursor_value_input = {
  db_write_timestamp?: InputMaybe<Scalars['timestamp']>;
  id?: InputMaybe<Scalars['String']>;
  voteTokenAddress?: InputMaybe<Scalars['String']>;
};

/** columns and relationships of "ShipChoice" */
export type ShipChoice = {
  active: Scalars['Boolean'];
  choiceData: Scalars['String'];
  /** An object relationship */
  contest?: Maybe<GrantShipsVoting>;
  contest_id: Scalars['String'];
  db_write_timestamp?: Maybe<Scalars['timestamp']>;
  id: Scalars['String'];
  mdPointer: Scalars['String'];
  mdProtocol: Scalars['numeric'];
  voteTally: Scalars['numeric'];
  /** An array relationship */
  votes: Array<ShipVote>;
};


/** columns and relationships of "ShipChoice" */
export type ShipChoicevotesArgs = {
  distinct_on?: InputMaybe<Array<ShipVote_select_column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<ShipVote_order_by>>;
  where?: InputMaybe<ShipVote_bool_exp>;
};

/** order by aggregate values of table "ShipChoice" */
export type ShipChoice_aggregate_order_by = {
  avg?: InputMaybe<ShipChoice_avg_order_by>;
  count?: InputMaybe<order_by>;
  max?: InputMaybe<ShipChoice_max_order_by>;
  min?: InputMaybe<ShipChoice_min_order_by>;
  stddev?: InputMaybe<ShipChoice_stddev_order_by>;
  stddev_pop?: InputMaybe<ShipChoice_stddev_pop_order_by>;
  stddev_samp?: InputMaybe<ShipChoice_stddev_samp_order_by>;
  sum?: InputMaybe<ShipChoice_sum_order_by>;
  var_pop?: InputMaybe<ShipChoice_var_pop_order_by>;
  var_samp?: InputMaybe<ShipChoice_var_samp_order_by>;
  variance?: InputMaybe<ShipChoice_variance_order_by>;
};

/** order by avg() on columns of table "ShipChoice" */
export type ShipChoice_avg_order_by = {
  mdProtocol?: InputMaybe<order_by>;
  voteTally?: InputMaybe<order_by>;
};

/** Boolean expression to filter rows from the table "ShipChoice". All fields are combined with a logical 'AND'. */
export type ShipChoice_bool_exp = {
  _and?: InputMaybe<Array<ShipChoice_bool_exp>>;
  _not?: InputMaybe<ShipChoice_bool_exp>;
  _or?: InputMaybe<Array<ShipChoice_bool_exp>>;
  active?: InputMaybe<Boolean_comparison_exp>;
  choiceData?: InputMaybe<String_comparison_exp>;
  contest?: InputMaybe<GrantShipsVoting_bool_exp>;
  contest_id?: InputMaybe<String_comparison_exp>;
  db_write_timestamp?: InputMaybe<timestamp_comparison_exp>;
  id?: InputMaybe<String_comparison_exp>;
  mdPointer?: InputMaybe<String_comparison_exp>;
  mdProtocol?: InputMaybe<numeric_comparison_exp>;
  voteTally?: InputMaybe<numeric_comparison_exp>;
  votes?: InputMaybe<ShipVote_bool_exp>;
};

/** order by max() on columns of table "ShipChoice" */
export type ShipChoice_max_order_by = {
  choiceData?: InputMaybe<order_by>;
  contest_id?: InputMaybe<order_by>;
  db_write_timestamp?: InputMaybe<order_by>;
  id?: InputMaybe<order_by>;
  mdPointer?: InputMaybe<order_by>;
  mdProtocol?: InputMaybe<order_by>;
  voteTally?: InputMaybe<order_by>;
};

/** order by min() on columns of table "ShipChoice" */
export type ShipChoice_min_order_by = {
  choiceData?: InputMaybe<order_by>;
  contest_id?: InputMaybe<order_by>;
  db_write_timestamp?: InputMaybe<order_by>;
  id?: InputMaybe<order_by>;
  mdPointer?: InputMaybe<order_by>;
  mdProtocol?: InputMaybe<order_by>;
  voteTally?: InputMaybe<order_by>;
};

/** Ordering options when selecting data from "ShipChoice". */
export type ShipChoice_order_by = {
  active?: InputMaybe<order_by>;
  choiceData?: InputMaybe<order_by>;
  contest?: InputMaybe<GrantShipsVoting_order_by>;
  contest_id?: InputMaybe<order_by>;
  db_write_timestamp?: InputMaybe<order_by>;
  id?: InputMaybe<order_by>;
  mdPointer?: InputMaybe<order_by>;
  mdProtocol?: InputMaybe<order_by>;
  voteTally?: InputMaybe<order_by>;
  votes_aggregate?: InputMaybe<ShipVote_aggregate_order_by>;
};

/** select columns of table "ShipChoice" */
export type ShipChoice_select_column =
  /** column name */
  | 'active'
  /** column name */
  | 'choiceData'
  /** column name */
  | 'contest_id'
  /** column name */
  | 'db_write_timestamp'
  /** column name */
  | 'id'
  /** column name */
  | 'mdPointer'
  /** column name */
  | 'mdProtocol'
  /** column name */
  | 'voteTally';

/** order by stddev() on columns of table "ShipChoice" */
export type ShipChoice_stddev_order_by = {
  mdProtocol?: InputMaybe<order_by>;
  voteTally?: InputMaybe<order_by>;
};

/** order by stddev_pop() on columns of table "ShipChoice" */
export type ShipChoice_stddev_pop_order_by = {
  mdProtocol?: InputMaybe<order_by>;
  voteTally?: InputMaybe<order_by>;
};

/** order by stddev_samp() on columns of table "ShipChoice" */
export type ShipChoice_stddev_samp_order_by = {
  mdProtocol?: InputMaybe<order_by>;
  voteTally?: InputMaybe<order_by>;
};

/** Streaming cursor of the table "ShipChoice" */
export type ShipChoice_stream_cursor_input = {
  /** Stream column input with initial value */
  initial_value: ShipChoice_stream_cursor_value_input;
  /** cursor ordering */
  ordering?: InputMaybe<cursor_ordering>;
};

/** Initial value of the column from where the streaming should start */
export type ShipChoice_stream_cursor_value_input = {
  active?: InputMaybe<Scalars['Boolean']>;
  choiceData?: InputMaybe<Scalars['String']>;
  contest_id?: InputMaybe<Scalars['String']>;
  db_write_timestamp?: InputMaybe<Scalars['timestamp']>;
  id?: InputMaybe<Scalars['String']>;
  mdPointer?: InputMaybe<Scalars['String']>;
  mdProtocol?: InputMaybe<Scalars['numeric']>;
  voteTally?: InputMaybe<Scalars['numeric']>;
};

/** order by sum() on columns of table "ShipChoice" */
export type ShipChoice_sum_order_by = {
  mdProtocol?: InputMaybe<order_by>;
  voteTally?: InputMaybe<order_by>;
};

/** order by var_pop() on columns of table "ShipChoice" */
export type ShipChoice_var_pop_order_by = {
  mdProtocol?: InputMaybe<order_by>;
  voteTally?: InputMaybe<order_by>;
};

/** order by var_samp() on columns of table "ShipChoice" */
export type ShipChoice_var_samp_order_by = {
  mdProtocol?: InputMaybe<order_by>;
  voteTally?: InputMaybe<order_by>;
};

/** order by variance() on columns of table "ShipChoice" */
export type ShipChoice_variance_order_by = {
  mdProtocol?: InputMaybe<order_by>;
  voteTally?: InputMaybe<order_by>;
};

/** columns and relationships of "ShipContext" */
export type ShipContext = {
  db_write_timestamp?: Maybe<Scalars['timestamp']>;
  /** An object relationship */
  gameManager?: Maybe<GameManager>;
  gameManager_id: Scalars['String'];
  /** An object relationship */
  grantShip?: Maybe<GrantShip>;
  grantShip_id: Scalars['String'];
  id: Scalars['String'];
  shipAddress: Scalars['String'];
};

/** Boolean expression to filter rows from the table "ShipContext". All fields are combined with a logical 'AND'. */
export type ShipContext_bool_exp = {
  _and?: InputMaybe<Array<ShipContext_bool_exp>>;
  _not?: InputMaybe<ShipContext_bool_exp>;
  _or?: InputMaybe<Array<ShipContext_bool_exp>>;
  db_write_timestamp?: InputMaybe<timestamp_comparison_exp>;
  gameManager?: InputMaybe<GameManager_bool_exp>;
  gameManager_id?: InputMaybe<String_comparison_exp>;
  grantShip?: InputMaybe<GrantShip_bool_exp>;
  grantShip_id?: InputMaybe<String_comparison_exp>;
  id?: InputMaybe<String_comparison_exp>;
  shipAddress?: InputMaybe<String_comparison_exp>;
};

/** Ordering options when selecting data from "ShipContext". */
export type ShipContext_order_by = {
  db_write_timestamp?: InputMaybe<order_by>;
  gameManager?: InputMaybe<GameManager_order_by>;
  gameManager_id?: InputMaybe<order_by>;
  grantShip?: InputMaybe<GrantShip_order_by>;
  grantShip_id?: InputMaybe<order_by>;
  id?: InputMaybe<order_by>;
  shipAddress?: InputMaybe<order_by>;
};

/** select columns of table "ShipContext" */
export type ShipContext_select_column =
  /** column name */
  | 'db_write_timestamp'
  /** column name */
  | 'gameManager_id'
  /** column name */
  | 'grantShip_id'
  /** column name */
  | 'id'
  /** column name */
  | 'shipAddress';

/** Streaming cursor of the table "ShipContext" */
export type ShipContext_stream_cursor_input = {
  /** Stream column input with initial value */
  initial_value: ShipContext_stream_cursor_value_input;
  /** cursor ordering */
  ordering?: InputMaybe<cursor_ordering>;
};

/** Initial value of the column from where the streaming should start */
export type ShipContext_stream_cursor_value_input = {
  db_write_timestamp?: InputMaybe<Scalars['timestamp']>;
  gameManager_id?: InputMaybe<Scalars['String']>;
  grantShip_id?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
  shipAddress?: InputMaybe<Scalars['String']>;
};

/** columns and relationships of "ShipVote" */
export type ShipVote = {
  amount: Scalars['numeric'];
  /** An object relationship */
  choice?: Maybe<ShipChoice>;
  choice_id: Scalars['String'];
  /** An object relationship */
  contest?: Maybe<GrantShipsVoting>;
  contest_id: Scalars['String'];
  db_write_timestamp?: Maybe<Scalars['timestamp']>;
  id: Scalars['String'];
  isRetractVote: Scalars['Boolean'];
  mdPointer: Scalars['String'];
  mdProtocol: Scalars['numeric'];
  /** An object relationship */
  voter?: Maybe<GSVoter>;
  voter_id: Scalars['String'];
};

/** order by aggregate values of table "ShipVote" */
export type ShipVote_aggregate_order_by = {
  avg?: InputMaybe<ShipVote_avg_order_by>;
  count?: InputMaybe<order_by>;
  max?: InputMaybe<ShipVote_max_order_by>;
  min?: InputMaybe<ShipVote_min_order_by>;
  stddev?: InputMaybe<ShipVote_stddev_order_by>;
  stddev_pop?: InputMaybe<ShipVote_stddev_pop_order_by>;
  stddev_samp?: InputMaybe<ShipVote_stddev_samp_order_by>;
  sum?: InputMaybe<ShipVote_sum_order_by>;
  var_pop?: InputMaybe<ShipVote_var_pop_order_by>;
  var_samp?: InputMaybe<ShipVote_var_samp_order_by>;
  variance?: InputMaybe<ShipVote_variance_order_by>;
};

/** order by avg() on columns of table "ShipVote" */
export type ShipVote_avg_order_by = {
  amount?: InputMaybe<order_by>;
  mdProtocol?: InputMaybe<order_by>;
};

/** Boolean expression to filter rows from the table "ShipVote". All fields are combined with a logical 'AND'. */
export type ShipVote_bool_exp = {
  _and?: InputMaybe<Array<ShipVote_bool_exp>>;
  _not?: InputMaybe<ShipVote_bool_exp>;
  _or?: InputMaybe<Array<ShipVote_bool_exp>>;
  amount?: InputMaybe<numeric_comparison_exp>;
  choice?: InputMaybe<ShipChoice_bool_exp>;
  choice_id?: InputMaybe<String_comparison_exp>;
  contest?: InputMaybe<GrantShipsVoting_bool_exp>;
  contest_id?: InputMaybe<String_comparison_exp>;
  db_write_timestamp?: InputMaybe<timestamp_comparison_exp>;
  id?: InputMaybe<String_comparison_exp>;
  isRetractVote?: InputMaybe<Boolean_comparison_exp>;
  mdPointer?: InputMaybe<String_comparison_exp>;
  mdProtocol?: InputMaybe<numeric_comparison_exp>;
  voter?: InputMaybe<GSVoter_bool_exp>;
  voter_id?: InputMaybe<String_comparison_exp>;
};

/** order by max() on columns of table "ShipVote" */
export type ShipVote_max_order_by = {
  amount?: InputMaybe<order_by>;
  choice_id?: InputMaybe<order_by>;
  contest_id?: InputMaybe<order_by>;
  db_write_timestamp?: InputMaybe<order_by>;
  id?: InputMaybe<order_by>;
  mdPointer?: InputMaybe<order_by>;
  mdProtocol?: InputMaybe<order_by>;
  voter_id?: InputMaybe<order_by>;
};

/** order by min() on columns of table "ShipVote" */
export type ShipVote_min_order_by = {
  amount?: InputMaybe<order_by>;
  choice_id?: InputMaybe<order_by>;
  contest_id?: InputMaybe<order_by>;
  db_write_timestamp?: InputMaybe<order_by>;
  id?: InputMaybe<order_by>;
  mdPointer?: InputMaybe<order_by>;
  mdProtocol?: InputMaybe<order_by>;
  voter_id?: InputMaybe<order_by>;
};

/** Ordering options when selecting data from "ShipVote". */
export type ShipVote_order_by = {
  amount?: InputMaybe<order_by>;
  choice?: InputMaybe<ShipChoice_order_by>;
  choice_id?: InputMaybe<order_by>;
  contest?: InputMaybe<GrantShipsVoting_order_by>;
  contest_id?: InputMaybe<order_by>;
  db_write_timestamp?: InputMaybe<order_by>;
  id?: InputMaybe<order_by>;
  isRetractVote?: InputMaybe<order_by>;
  mdPointer?: InputMaybe<order_by>;
  mdProtocol?: InputMaybe<order_by>;
  voter?: InputMaybe<GSVoter_order_by>;
  voter_id?: InputMaybe<order_by>;
};

/** select columns of table "ShipVote" */
export type ShipVote_select_column =
  /** column name */
  | 'amount'
  /** column name */
  | 'choice_id'
  /** column name */
  | 'contest_id'
  /** column name */
  | 'db_write_timestamp'
  /** column name */
  | 'id'
  /** column name */
  | 'isRetractVote'
  /** column name */
  | 'mdPointer'
  /** column name */
  | 'mdProtocol'
  /** column name */
  | 'voter_id';

/** order by stddev() on columns of table "ShipVote" */
export type ShipVote_stddev_order_by = {
  amount?: InputMaybe<order_by>;
  mdProtocol?: InputMaybe<order_by>;
};

/** order by stddev_pop() on columns of table "ShipVote" */
export type ShipVote_stddev_pop_order_by = {
  amount?: InputMaybe<order_by>;
  mdProtocol?: InputMaybe<order_by>;
};

/** order by stddev_samp() on columns of table "ShipVote" */
export type ShipVote_stddev_samp_order_by = {
  amount?: InputMaybe<order_by>;
  mdProtocol?: InputMaybe<order_by>;
};

/** Streaming cursor of the table "ShipVote" */
export type ShipVote_stream_cursor_input = {
  /** Stream column input with initial value */
  initial_value: ShipVote_stream_cursor_value_input;
  /** cursor ordering */
  ordering?: InputMaybe<cursor_ordering>;
};

/** Initial value of the column from where the streaming should start */
export type ShipVote_stream_cursor_value_input = {
  amount?: InputMaybe<Scalars['numeric']>;
  choice_id?: InputMaybe<Scalars['String']>;
  contest_id?: InputMaybe<Scalars['String']>;
  db_write_timestamp?: InputMaybe<Scalars['timestamp']>;
  id?: InputMaybe<Scalars['String']>;
  isRetractVote?: InputMaybe<Scalars['Boolean']>;
  mdPointer?: InputMaybe<Scalars['String']>;
  mdProtocol?: InputMaybe<Scalars['numeric']>;
  voter_id?: InputMaybe<Scalars['String']>;
};

/** order by sum() on columns of table "ShipVote" */
export type ShipVote_sum_order_by = {
  amount?: InputMaybe<order_by>;
  mdProtocol?: InputMaybe<order_by>;
};

/** order by var_pop() on columns of table "ShipVote" */
export type ShipVote_var_pop_order_by = {
  amount?: InputMaybe<order_by>;
  mdProtocol?: InputMaybe<order_by>;
};

/** order by var_samp() on columns of table "ShipVote" */
export type ShipVote_var_samp_order_by = {
  amount?: InputMaybe<order_by>;
  mdProtocol?: InputMaybe<order_by>;
};

/** order by variance() on columns of table "ShipVote" */
export type ShipVote_variance_order_by = {
  amount?: InputMaybe<order_by>;
  mdProtocol?: InputMaybe<order_by>;
};

/** columns and relationships of "StemModule" */
export type StemModule = {
  /** An object relationship */
  contest?: Maybe<Contest>;
  contestAddress?: Maybe<Scalars['String']>;
  contest_id?: Maybe<Scalars['String']>;
  db_write_timestamp?: Maybe<Scalars['timestamp']>;
  filterTag: Scalars['String'];
  id: Scalars['String'];
  moduleAddress: Scalars['String'];
  moduleName: Scalars['String'];
  /** An object relationship */
  moduleTemplate?: Maybe<ModuleTemplate>;
  moduleTemplate_id: Scalars['String'];
};

/** Boolean expression to filter rows from the table "StemModule". All fields are combined with a logical 'AND'. */
export type StemModule_bool_exp = {
  _and?: InputMaybe<Array<StemModule_bool_exp>>;
  _not?: InputMaybe<StemModule_bool_exp>;
  _or?: InputMaybe<Array<StemModule_bool_exp>>;
  contest?: InputMaybe<Contest_bool_exp>;
  contestAddress?: InputMaybe<String_comparison_exp>;
  contest_id?: InputMaybe<String_comparison_exp>;
  db_write_timestamp?: InputMaybe<timestamp_comparison_exp>;
  filterTag?: InputMaybe<String_comparison_exp>;
  id?: InputMaybe<String_comparison_exp>;
  moduleAddress?: InputMaybe<String_comparison_exp>;
  moduleName?: InputMaybe<String_comparison_exp>;
  moduleTemplate?: InputMaybe<ModuleTemplate_bool_exp>;
  moduleTemplate_id?: InputMaybe<String_comparison_exp>;
};

/** Ordering options when selecting data from "StemModule". */
export type StemModule_order_by = {
  contest?: InputMaybe<Contest_order_by>;
  contestAddress?: InputMaybe<order_by>;
  contest_id?: InputMaybe<order_by>;
  db_write_timestamp?: InputMaybe<order_by>;
  filterTag?: InputMaybe<order_by>;
  id?: InputMaybe<order_by>;
  moduleAddress?: InputMaybe<order_by>;
  moduleName?: InputMaybe<order_by>;
  moduleTemplate?: InputMaybe<ModuleTemplate_order_by>;
  moduleTemplate_id?: InputMaybe<order_by>;
};

/** select columns of table "StemModule" */
export type StemModule_select_column =
  /** column name */
  | 'contestAddress'
  /** column name */
  | 'contest_id'
  /** column name */
  | 'db_write_timestamp'
  /** column name */
  | 'filterTag'
  /** column name */
  | 'id'
  /** column name */
  | 'moduleAddress'
  /** column name */
  | 'moduleName'
  /** column name */
  | 'moduleTemplate_id';

/** Streaming cursor of the table "StemModule" */
export type StemModule_stream_cursor_input = {
  /** Stream column input with initial value */
  initial_value: StemModule_stream_cursor_value_input;
  /** cursor ordering */
  ordering?: InputMaybe<cursor_ordering>;
};

/** Initial value of the column from where the streaming should start */
export type StemModule_stream_cursor_value_input = {
  contestAddress?: InputMaybe<Scalars['String']>;
  contest_id?: InputMaybe<Scalars['String']>;
  db_write_timestamp?: InputMaybe<Scalars['timestamp']>;
  filterTag?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
  moduleAddress?: InputMaybe<Scalars['String']>;
  moduleName?: InputMaybe<Scalars['String']>;
  moduleTemplate_id?: InputMaybe<Scalars['String']>;
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

/** columns and relationships of "TVParams" */
export type TVParams = {
  db_write_timestamp?: Maybe<Scalars['timestamp']>;
  id: Scalars['String'];
  voteDuration: Scalars['numeric'];
};

/** Boolean expression to filter rows from the table "TVParams". All fields are combined with a logical 'AND'. */
export type TVParams_bool_exp = {
  _and?: InputMaybe<Array<TVParams_bool_exp>>;
  _not?: InputMaybe<TVParams_bool_exp>;
  _or?: InputMaybe<Array<TVParams_bool_exp>>;
  db_write_timestamp?: InputMaybe<timestamp_comparison_exp>;
  id?: InputMaybe<String_comparison_exp>;
  voteDuration?: InputMaybe<numeric_comparison_exp>;
};

/** Ordering options when selecting data from "TVParams". */
export type TVParams_order_by = {
  db_write_timestamp?: InputMaybe<order_by>;
  id?: InputMaybe<order_by>;
  voteDuration?: InputMaybe<order_by>;
};

/** select columns of table "TVParams" */
export type TVParams_select_column =
  /** column name */
  | 'db_write_timestamp'
  /** column name */
  | 'id'
  /** column name */
  | 'voteDuration';

/** Streaming cursor of the table "TVParams" */
export type TVParams_stream_cursor_input = {
  /** Stream column input with initial value */
  initial_value: TVParams_stream_cursor_value_input;
  /** cursor ordering */
  ordering?: InputMaybe<cursor_ordering>;
};

/** Initial value of the column from where the streaming should start */
export type TVParams_stream_cursor_value_input = {
  db_write_timestamp?: InputMaybe<Scalars['timestamp']>;
  id?: InputMaybe<Scalars['String']>;
  voteDuration?: InputMaybe<Scalars['numeric']>;
};

/** columns and relationships of "Transaction" */
export type Transaction = {
  blockNumber: Scalars['numeric'];
  db_write_timestamp?: Maybe<Scalars['timestamp']>;
  id: Scalars['String'];
  srcAddress: Scalars['String'];
  timestamp: Scalars['Int'];
  txHash: Scalars['String'];
};

/** Boolean expression to filter rows from the table "Transaction". All fields are combined with a logical 'AND'. */
export type Transaction_bool_exp = {
  _and?: InputMaybe<Array<Transaction_bool_exp>>;
  _not?: InputMaybe<Transaction_bool_exp>;
  _or?: InputMaybe<Array<Transaction_bool_exp>>;
  blockNumber?: InputMaybe<numeric_comparison_exp>;
  db_write_timestamp?: InputMaybe<timestamp_comparison_exp>;
  id?: InputMaybe<String_comparison_exp>;
  srcAddress?: InputMaybe<String_comparison_exp>;
  timestamp?: InputMaybe<Int_comparison_exp>;
  txHash?: InputMaybe<String_comparison_exp>;
};

/** Ordering options when selecting data from "Transaction". */
export type Transaction_order_by = {
  blockNumber?: InputMaybe<order_by>;
  db_write_timestamp?: InputMaybe<order_by>;
  id?: InputMaybe<order_by>;
  srcAddress?: InputMaybe<order_by>;
  timestamp?: InputMaybe<order_by>;
  txHash?: InputMaybe<order_by>;
};

/** select columns of table "Transaction" */
export type Transaction_select_column =
  /** column name */
  | 'blockNumber'
  /** column name */
  | 'db_write_timestamp'
  /** column name */
  | 'id'
  /** column name */
  | 'srcAddress'
  /** column name */
  | 'timestamp'
  /** column name */
  | 'txHash';

/** Streaming cursor of the table "Transaction" */
export type Transaction_stream_cursor_input = {
  /** Stream column input with initial value */
  initial_value: Transaction_stream_cursor_value_input;
  /** cursor ordering */
  ordering?: InputMaybe<cursor_ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Transaction_stream_cursor_value_input = {
  blockNumber?: InputMaybe<Scalars['numeric']>;
  db_write_timestamp?: InputMaybe<Scalars['timestamp']>;
  id?: InputMaybe<Scalars['String']>;
  srcAddress?: InputMaybe<Scalars['String']>;
  timestamp?: InputMaybe<Scalars['Int']>;
  txHash?: InputMaybe<Scalars['String']>;
};

/** columns and relationships of "Update" */
export type Update = {
  chainId: Scalars['Int'];
  /** An object relationship */
  content?: Maybe<RawMetadata>;
  contentSchema?: Maybe<Scalars['Int']>;
  content_id?: Maybe<Scalars['String']>;
  db_write_timestamp?: Maybe<Scalars['timestamp']>;
  /** An object relationship */
  domain?: Maybe<GameManager>;
  domain_id?: Maybe<Scalars['String']>;
  entityAddress: Scalars['String'];
  /** An object relationship */
  entityMetadata?: Maybe<RawMetadata>;
  entityMetadata_id?: Maybe<Scalars['String']>;
  hostEntityId: Scalars['String'];
  id: Scalars['String'];
  message?: Maybe<Scalars['String']>;
  playerType: Scalars['Int'];
  postBlockNumber: Scalars['Int'];
  postDecorator?: Maybe<Scalars['Int']>;
  postedBy?: Maybe<Scalars['String']>;
  scope: Scalars['Int'];
  tag: Scalars['String'];
  timestamp: Scalars['Int'];
};

/** Boolean expression to filter rows from the table "Update". All fields are combined with a logical 'AND'. */
export type Update_bool_exp = {
  _and?: InputMaybe<Array<Update_bool_exp>>;
  _not?: InputMaybe<Update_bool_exp>;
  _or?: InputMaybe<Array<Update_bool_exp>>;
  chainId?: InputMaybe<Int_comparison_exp>;
  content?: InputMaybe<RawMetadata_bool_exp>;
  contentSchema?: InputMaybe<Int_comparison_exp>;
  content_id?: InputMaybe<String_comparison_exp>;
  db_write_timestamp?: InputMaybe<timestamp_comparison_exp>;
  domain?: InputMaybe<GameManager_bool_exp>;
  domain_id?: InputMaybe<String_comparison_exp>;
  entityAddress?: InputMaybe<String_comparison_exp>;
  entityMetadata?: InputMaybe<RawMetadata_bool_exp>;
  entityMetadata_id?: InputMaybe<String_comparison_exp>;
  hostEntityId?: InputMaybe<String_comparison_exp>;
  id?: InputMaybe<String_comparison_exp>;
  message?: InputMaybe<String_comparison_exp>;
  playerType?: InputMaybe<Int_comparison_exp>;
  postBlockNumber?: InputMaybe<Int_comparison_exp>;
  postDecorator?: InputMaybe<Int_comparison_exp>;
  postedBy?: InputMaybe<String_comparison_exp>;
  scope?: InputMaybe<Int_comparison_exp>;
  tag?: InputMaybe<String_comparison_exp>;
  timestamp?: InputMaybe<Int_comparison_exp>;
};

/** Ordering options when selecting data from "Update". */
export type Update_order_by = {
  chainId?: InputMaybe<order_by>;
  content?: InputMaybe<RawMetadata_order_by>;
  contentSchema?: InputMaybe<order_by>;
  content_id?: InputMaybe<order_by>;
  db_write_timestamp?: InputMaybe<order_by>;
  domain?: InputMaybe<GameManager_order_by>;
  domain_id?: InputMaybe<order_by>;
  entityAddress?: InputMaybe<order_by>;
  entityMetadata?: InputMaybe<RawMetadata_order_by>;
  entityMetadata_id?: InputMaybe<order_by>;
  hostEntityId?: InputMaybe<order_by>;
  id?: InputMaybe<order_by>;
  message?: InputMaybe<order_by>;
  playerType?: InputMaybe<order_by>;
  postBlockNumber?: InputMaybe<order_by>;
  postDecorator?: InputMaybe<order_by>;
  postedBy?: InputMaybe<order_by>;
  scope?: InputMaybe<order_by>;
  tag?: InputMaybe<order_by>;
  timestamp?: InputMaybe<order_by>;
};

/** select columns of table "Update" */
export type Update_select_column =
  /** column name */
  | 'chainId'
  /** column name */
  | 'contentSchema'
  /** column name */
  | 'content_id'
  /** column name */
  | 'db_write_timestamp'
  /** column name */
  | 'domain_id'
  /** column name */
  | 'entityAddress'
  /** column name */
  | 'entityMetadata_id'
  /** column name */
  | 'hostEntityId'
  /** column name */
  | 'id'
  /** column name */
  | 'message'
  /** column name */
  | 'playerType'
  /** column name */
  | 'postBlockNumber'
  /** column name */
  | 'postDecorator'
  /** column name */
  | 'postedBy'
  /** column name */
  | 'scope'
  /** column name */
  | 'tag'
  /** column name */
  | 'timestamp';

/** Streaming cursor of the table "Update" */
export type Update_stream_cursor_input = {
  /** Stream column input with initial value */
  initial_value: Update_stream_cursor_value_input;
  /** cursor ordering */
  ordering?: InputMaybe<cursor_ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Update_stream_cursor_value_input = {
  chainId?: InputMaybe<Scalars['Int']>;
  contentSchema?: InputMaybe<Scalars['Int']>;
  content_id?: InputMaybe<Scalars['String']>;
  db_write_timestamp?: InputMaybe<Scalars['timestamp']>;
  domain_id?: InputMaybe<Scalars['String']>;
  entityAddress?: InputMaybe<Scalars['String']>;
  entityMetadata_id?: InputMaybe<Scalars['String']>;
  hostEntityId?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
  message?: InputMaybe<Scalars['String']>;
  playerType?: InputMaybe<Scalars['Int']>;
  postBlockNumber?: InputMaybe<Scalars['Int']>;
  postDecorator?: InputMaybe<Scalars['Int']>;
  postedBy?: InputMaybe<Scalars['String']>;
  scope?: InputMaybe<Scalars['Int']>;
  tag?: InputMaybe<Scalars['String']>;
  timestamp?: InputMaybe<Scalars['Int']>;
};

/** Boolean expression to compare columns of type "_numeric". All fields are combined with logical 'AND'. */
export type _numeric_comparison_exp = {
  _eq?: InputMaybe<Scalars['_numeric']>;
  _gt?: InputMaybe<Scalars['_numeric']>;
  _gte?: InputMaybe<Scalars['_numeric']>;
  _in?: InputMaybe<Array<Scalars['_numeric']>>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  _lt?: InputMaybe<Scalars['_numeric']>;
  _lte?: InputMaybe<Scalars['_numeric']>;
  _neq?: InputMaybe<Scalars['_numeric']>;
  _nin?: InputMaybe<Array<Scalars['_numeric']>>;
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
  /** fetch data from the table: "Application" */
  Application: Array<Application>;
  /** fetch data from the table: "Application" using primary key columns */
  Application_by_pk?: Maybe<Application>;
  /** fetch data from the table: "Contest" */
  Contest: Array<Contest>;
  /** fetch data from the table: "ContestClone" */
  ContestClone: Array<ContestClone>;
  /** fetch data from the table: "ContestClone" using primary key columns */
  ContestClone_by_pk?: Maybe<ContestClone>;
  /** fetch data from the table: "ContestTemplate" */
  ContestTemplate: Array<ContestTemplate>;
  /** fetch data from the table: "ContestTemplate" using primary key columns */
  ContestTemplate_by_pk?: Maybe<ContestTemplate>;
  /** fetch data from the table: "Contest" using primary key columns */
  Contest_by_pk?: Maybe<Contest>;
  /** fetch data from the table: "ERCPointParams" */
  ERCPointParams: Array<ERCPointParams>;
  /** fetch data from the table: "ERCPointParams" using primary key columns */
  ERCPointParams_by_pk?: Maybe<ERCPointParams>;
  /** fetch data from the table: "EnvioTX" */
  EnvioTX: Array<EnvioTX>;
  /** fetch data from the table: "EnvioTX" using primary key columns */
  EnvioTX_by_pk?: Maybe<EnvioTX>;
  /** fetch data from the table: "EventPost" */
  EventPost: Array<EventPost>;
  /** fetch data from the table: "EventPost" using primary key columns */
  EventPost_by_pk?: Maybe<EventPost>;
  /** fetch data from the table: "FactoryEventsSummary" */
  FactoryEventsSummary: Array<FactoryEventsSummary>;
  /** fetch data from the table: "FactoryEventsSummary" using primary key columns */
  FactoryEventsSummary_by_pk?: Maybe<FactoryEventsSummary>;
  /** fetch data from the table: "FeedCard" */
  FeedCard: Array<FeedCard>;
  /** fetch data from the table: "FeedCard" using primary key columns */
  FeedCard_by_pk?: Maybe<FeedCard>;
  /** fetch data from the table: "FeedItemEmbed" */
  FeedItemEmbed: Array<FeedItemEmbed>;
  /** fetch data from the table: "FeedItemEmbed" using primary key columns */
  FeedItemEmbed_by_pk?: Maybe<FeedItemEmbed>;
  /** fetch data from the table: "FeedItemEntity" */
  FeedItemEntity: Array<FeedItemEntity>;
  /** fetch data from the table: "FeedItemEntity" using primary key columns */
  FeedItemEntity_by_pk?: Maybe<FeedItemEntity>;
  /** fetch data from the table: "GMInitParams" */
  GMInitParams: Array<GMInitParams>;
  /** fetch data from the table: "GMInitParams" using primary key columns */
  GMInitParams_by_pk?: Maybe<GMInitParams>;
  /** fetch data from the table: "GSVoter" */
  GSVoter: Array<GSVoter>;
  /** fetch data from the table: "GSVoter" using primary key columns */
  GSVoter_by_pk?: Maybe<GSVoter>;
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
  /** fetch data from the table: "GrantShipsVoting" */
  GrantShipsVoting: Array<GrantShipsVoting>;
  /** fetch data from the table: "GrantShipsVoting" using primary key columns */
  GrantShipsVoting_by_pk?: Maybe<GrantShipsVoting>;
  /** fetch data from the table: "Grant" using primary key columns */
  Grant_by_pk?: Maybe<Grant>;
  /** fetch data from the table: "HALParams" */
  HALParams: Array<HALParams>;
  /** fetch data from the table: "HALParams" using primary key columns */
  HALParams_by_pk?: Maybe<HALParams>;
  /** fetch data from the table: "HatsPoster" */
  HatsPoster: Array<HatsPoster>;
  /** fetch data from the table: "HatsPoster" using primary key columns */
  HatsPoster_by_pk?: Maybe<HatsPoster>;
  /** fetch data from the table: "LocalLog" */
  LocalLog: Array<LocalLog>;
  /** fetch data from the table: "LocalLog" using primary key columns */
  LocalLog_by_pk?: Maybe<LocalLog>;
  /** fetch data from the table: "Milestone" */
  Milestone: Array<Milestone>;
  /** fetch data from the table: "MilestoneSet" */
  MilestoneSet: Array<MilestoneSet>;
  /** fetch data from the table: "MilestoneSet" using primary key columns */
  MilestoneSet_by_pk?: Maybe<MilestoneSet>;
  /** fetch data from the table: "Milestone" using primary key columns */
  Milestone_by_pk?: Maybe<Milestone>;
  /** fetch data from the table: "ModuleTemplate" */
  ModuleTemplate: Array<ModuleTemplate>;
  /** fetch data from the table: "ModuleTemplate" using primary key columns */
  ModuleTemplate_by_pk?: Maybe<ModuleTemplate>;
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
  /** fetch data from the table: "Record" */
  Record: Array<Record>;
  /** fetch data from the table: "Record" using primary key columns */
  Record_by_pk?: Maybe<Record>;
  /** fetch data from the table: "SBTBalParams" */
  SBTBalParams: Array<SBTBalParams>;
  /** fetch data from the table: "SBTBalParams" using primary key columns */
  SBTBalParams_by_pk?: Maybe<SBTBalParams>;
  /** fetch data from the table: "ShipChoice" */
  ShipChoice: Array<ShipChoice>;
  /** fetch data from the table: "ShipChoice" using primary key columns */
  ShipChoice_by_pk?: Maybe<ShipChoice>;
  /** fetch data from the table: "ShipContext" */
  ShipContext: Array<ShipContext>;
  /** fetch data from the table: "ShipContext" using primary key columns */
  ShipContext_by_pk?: Maybe<ShipContext>;
  /** fetch data from the table: "ShipVote" */
  ShipVote: Array<ShipVote>;
  /** fetch data from the table: "ShipVote" using primary key columns */
  ShipVote_by_pk?: Maybe<ShipVote>;
  /** fetch data from the table: "StemModule" */
  StemModule: Array<StemModule>;
  /** fetch data from the table: "StemModule" using primary key columns */
  StemModule_by_pk?: Maybe<StemModule>;
  /** fetch data from the table: "TVParams" */
  TVParams: Array<TVParams>;
  /** fetch data from the table: "TVParams" using primary key columns */
  TVParams_by_pk?: Maybe<TVParams>;
  /** fetch data from the table: "Transaction" */
  Transaction: Array<Transaction>;
  /** fetch data from the table: "Transaction" using primary key columns */
  Transaction_by_pk?: Maybe<Transaction>;
  /** fetch data from the table: "Update" */
  Update: Array<Update>;
  /** fetch data from the table: "Update" using primary key columns */
  Update_by_pk?: Maybe<Update>;
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


export type query_rootApplicationArgs = {
  distinct_on?: InputMaybe<Array<Application_select_column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Application_order_by>>;
  where?: InputMaybe<Application_bool_exp>;
};


export type query_rootApplication_by_pkArgs = {
  id: Scalars['String'];
};


export type query_rootContestArgs = {
  distinct_on?: InputMaybe<Array<Contest_select_column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Contest_order_by>>;
  where?: InputMaybe<Contest_bool_exp>;
};


export type query_rootContestCloneArgs = {
  distinct_on?: InputMaybe<Array<ContestClone_select_column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<ContestClone_order_by>>;
  where?: InputMaybe<ContestClone_bool_exp>;
};


export type query_rootContestClone_by_pkArgs = {
  id: Scalars['String'];
};


export type query_rootContestTemplateArgs = {
  distinct_on?: InputMaybe<Array<ContestTemplate_select_column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<ContestTemplate_order_by>>;
  where?: InputMaybe<ContestTemplate_bool_exp>;
};


export type query_rootContestTemplate_by_pkArgs = {
  id: Scalars['String'];
};


export type query_rootContest_by_pkArgs = {
  id: Scalars['String'];
};


export type query_rootERCPointParamsArgs = {
  distinct_on?: InputMaybe<Array<ERCPointParams_select_column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<ERCPointParams_order_by>>;
  where?: InputMaybe<ERCPointParams_bool_exp>;
};


export type query_rootERCPointParams_by_pkArgs = {
  id: Scalars['String'];
};


export type query_rootEnvioTXArgs = {
  distinct_on?: InputMaybe<Array<EnvioTX_select_column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<EnvioTX_order_by>>;
  where?: InputMaybe<EnvioTX_bool_exp>;
};


export type query_rootEnvioTX_by_pkArgs = {
  id: Scalars['String'];
};


export type query_rootEventPostArgs = {
  distinct_on?: InputMaybe<Array<EventPost_select_column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<EventPost_order_by>>;
  where?: InputMaybe<EventPost_bool_exp>;
};


export type query_rootEventPost_by_pkArgs = {
  id: Scalars['String'];
};


export type query_rootFactoryEventsSummaryArgs = {
  distinct_on?: InputMaybe<Array<FactoryEventsSummary_select_column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<FactoryEventsSummary_order_by>>;
  where?: InputMaybe<FactoryEventsSummary_bool_exp>;
};


export type query_rootFactoryEventsSummary_by_pkArgs = {
  id: Scalars['String'];
};


export type query_rootFeedCardArgs = {
  distinct_on?: InputMaybe<Array<FeedCard_select_column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<FeedCard_order_by>>;
  where?: InputMaybe<FeedCard_bool_exp>;
};


export type query_rootFeedCard_by_pkArgs = {
  id: Scalars['String'];
};


export type query_rootFeedItemEmbedArgs = {
  distinct_on?: InputMaybe<Array<FeedItemEmbed_select_column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<FeedItemEmbed_order_by>>;
  where?: InputMaybe<FeedItemEmbed_bool_exp>;
};


export type query_rootFeedItemEmbed_by_pkArgs = {
  id: Scalars['String'];
};


export type query_rootFeedItemEntityArgs = {
  distinct_on?: InputMaybe<Array<FeedItemEntity_select_column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<FeedItemEntity_order_by>>;
  where?: InputMaybe<FeedItemEntity_bool_exp>;
};


export type query_rootFeedItemEntity_by_pkArgs = {
  id: Scalars['String'];
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


export type query_rootGSVoterArgs = {
  distinct_on?: InputMaybe<Array<GSVoter_select_column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<GSVoter_order_by>>;
  where?: InputMaybe<GSVoter_bool_exp>;
};


export type query_rootGSVoter_by_pkArgs = {
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


export type query_rootGrantShipsVotingArgs = {
  distinct_on?: InputMaybe<Array<GrantShipsVoting_select_column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<GrantShipsVoting_order_by>>;
  where?: InputMaybe<GrantShipsVoting_bool_exp>;
};


export type query_rootGrantShipsVoting_by_pkArgs = {
  id: Scalars['String'];
};


export type query_rootGrant_by_pkArgs = {
  id: Scalars['String'];
};


export type query_rootHALParamsArgs = {
  distinct_on?: InputMaybe<Array<HALParams_select_column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<HALParams_order_by>>;
  where?: InputMaybe<HALParams_bool_exp>;
};


export type query_rootHALParams_by_pkArgs = {
  id: Scalars['String'];
};


export type query_rootHatsPosterArgs = {
  distinct_on?: InputMaybe<Array<HatsPoster_select_column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<HatsPoster_order_by>>;
  where?: InputMaybe<HatsPoster_bool_exp>;
};


export type query_rootHatsPoster_by_pkArgs = {
  id: Scalars['String'];
};


export type query_rootLocalLogArgs = {
  distinct_on?: InputMaybe<Array<LocalLog_select_column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<LocalLog_order_by>>;
  where?: InputMaybe<LocalLog_bool_exp>;
};


export type query_rootLocalLog_by_pkArgs = {
  id: Scalars['String'];
};


export type query_rootMilestoneArgs = {
  distinct_on?: InputMaybe<Array<Milestone_select_column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Milestone_order_by>>;
  where?: InputMaybe<Milestone_bool_exp>;
};


export type query_rootMilestoneSetArgs = {
  distinct_on?: InputMaybe<Array<MilestoneSet_select_column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<MilestoneSet_order_by>>;
  where?: InputMaybe<MilestoneSet_bool_exp>;
};


export type query_rootMilestoneSet_by_pkArgs = {
  id: Scalars['String'];
};


export type query_rootMilestone_by_pkArgs = {
  id: Scalars['String'];
};


export type query_rootModuleTemplateArgs = {
  distinct_on?: InputMaybe<Array<ModuleTemplate_select_column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<ModuleTemplate_order_by>>;
  where?: InputMaybe<ModuleTemplate_bool_exp>;
};


export type query_rootModuleTemplate_by_pkArgs = {
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


export type query_rootRecordArgs = {
  distinct_on?: InputMaybe<Array<Record_select_column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Record_order_by>>;
  where?: InputMaybe<Record_bool_exp>;
};


export type query_rootRecord_by_pkArgs = {
  id: Scalars['String'];
};


export type query_rootSBTBalParamsArgs = {
  distinct_on?: InputMaybe<Array<SBTBalParams_select_column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<SBTBalParams_order_by>>;
  where?: InputMaybe<SBTBalParams_bool_exp>;
};


export type query_rootSBTBalParams_by_pkArgs = {
  id: Scalars['String'];
};


export type query_rootShipChoiceArgs = {
  distinct_on?: InputMaybe<Array<ShipChoice_select_column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<ShipChoice_order_by>>;
  where?: InputMaybe<ShipChoice_bool_exp>;
};


export type query_rootShipChoice_by_pkArgs = {
  id: Scalars['String'];
};


export type query_rootShipContextArgs = {
  distinct_on?: InputMaybe<Array<ShipContext_select_column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<ShipContext_order_by>>;
  where?: InputMaybe<ShipContext_bool_exp>;
};


export type query_rootShipContext_by_pkArgs = {
  id: Scalars['String'];
};


export type query_rootShipVoteArgs = {
  distinct_on?: InputMaybe<Array<ShipVote_select_column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<ShipVote_order_by>>;
  where?: InputMaybe<ShipVote_bool_exp>;
};


export type query_rootShipVote_by_pkArgs = {
  id: Scalars['String'];
};


export type query_rootStemModuleArgs = {
  distinct_on?: InputMaybe<Array<StemModule_select_column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<StemModule_order_by>>;
  where?: InputMaybe<StemModule_bool_exp>;
};


export type query_rootStemModule_by_pkArgs = {
  id: Scalars['String'];
};


export type query_rootTVParamsArgs = {
  distinct_on?: InputMaybe<Array<TVParams_select_column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<TVParams_order_by>>;
  where?: InputMaybe<TVParams_bool_exp>;
};


export type query_rootTVParams_by_pkArgs = {
  id: Scalars['String'];
};


export type query_rootTransactionArgs = {
  distinct_on?: InputMaybe<Array<Transaction_select_column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Transaction_order_by>>;
  where?: InputMaybe<Transaction_bool_exp>;
};


export type query_rootTransaction_by_pkArgs = {
  id: Scalars['String'];
};


export type query_rootUpdateArgs = {
  distinct_on?: InputMaybe<Array<Update_select_column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Update_order_by>>;
  where?: InputMaybe<Update_bool_exp>;
};


export type query_rootUpdate_by_pkArgs = {
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
  /** fetch data from the table: "Application" */
  Application: Array<Application>;
  /** fetch data from the table: "Application" using primary key columns */
  Application_by_pk?: Maybe<Application>;
  /** fetch data from the table in a streaming manner: "Application" */
  Application_stream: Array<Application>;
  /** fetch data from the table: "Contest" */
  Contest: Array<Contest>;
  /** fetch data from the table: "ContestClone" */
  ContestClone: Array<ContestClone>;
  /** fetch data from the table: "ContestClone" using primary key columns */
  ContestClone_by_pk?: Maybe<ContestClone>;
  /** fetch data from the table in a streaming manner: "ContestClone" */
  ContestClone_stream: Array<ContestClone>;
  /** fetch data from the table: "ContestTemplate" */
  ContestTemplate: Array<ContestTemplate>;
  /** fetch data from the table: "ContestTemplate" using primary key columns */
  ContestTemplate_by_pk?: Maybe<ContestTemplate>;
  /** fetch data from the table in a streaming manner: "ContestTemplate" */
  ContestTemplate_stream: Array<ContestTemplate>;
  /** fetch data from the table: "Contest" using primary key columns */
  Contest_by_pk?: Maybe<Contest>;
  /** fetch data from the table in a streaming manner: "Contest" */
  Contest_stream: Array<Contest>;
  /** fetch data from the table: "ERCPointParams" */
  ERCPointParams: Array<ERCPointParams>;
  /** fetch data from the table: "ERCPointParams" using primary key columns */
  ERCPointParams_by_pk?: Maybe<ERCPointParams>;
  /** fetch data from the table in a streaming manner: "ERCPointParams" */
  ERCPointParams_stream: Array<ERCPointParams>;
  /** fetch data from the table: "EnvioTX" */
  EnvioTX: Array<EnvioTX>;
  /** fetch data from the table: "EnvioTX" using primary key columns */
  EnvioTX_by_pk?: Maybe<EnvioTX>;
  /** fetch data from the table in a streaming manner: "EnvioTX" */
  EnvioTX_stream: Array<EnvioTX>;
  /** fetch data from the table: "EventPost" */
  EventPost: Array<EventPost>;
  /** fetch data from the table: "EventPost" using primary key columns */
  EventPost_by_pk?: Maybe<EventPost>;
  /** fetch data from the table in a streaming manner: "EventPost" */
  EventPost_stream: Array<EventPost>;
  /** fetch data from the table: "FactoryEventsSummary" */
  FactoryEventsSummary: Array<FactoryEventsSummary>;
  /** fetch data from the table: "FactoryEventsSummary" using primary key columns */
  FactoryEventsSummary_by_pk?: Maybe<FactoryEventsSummary>;
  /** fetch data from the table in a streaming manner: "FactoryEventsSummary" */
  FactoryEventsSummary_stream: Array<FactoryEventsSummary>;
  /** fetch data from the table: "FeedCard" */
  FeedCard: Array<FeedCard>;
  /** fetch data from the table: "FeedCard" using primary key columns */
  FeedCard_by_pk?: Maybe<FeedCard>;
  /** fetch data from the table in a streaming manner: "FeedCard" */
  FeedCard_stream: Array<FeedCard>;
  /** fetch data from the table: "FeedItemEmbed" */
  FeedItemEmbed: Array<FeedItemEmbed>;
  /** fetch data from the table: "FeedItemEmbed" using primary key columns */
  FeedItemEmbed_by_pk?: Maybe<FeedItemEmbed>;
  /** fetch data from the table in a streaming manner: "FeedItemEmbed" */
  FeedItemEmbed_stream: Array<FeedItemEmbed>;
  /** fetch data from the table: "FeedItemEntity" */
  FeedItemEntity: Array<FeedItemEntity>;
  /** fetch data from the table: "FeedItemEntity" using primary key columns */
  FeedItemEntity_by_pk?: Maybe<FeedItemEntity>;
  /** fetch data from the table in a streaming manner: "FeedItemEntity" */
  FeedItemEntity_stream: Array<FeedItemEntity>;
  /** fetch data from the table: "GMInitParams" */
  GMInitParams: Array<GMInitParams>;
  /** fetch data from the table: "GMInitParams" using primary key columns */
  GMInitParams_by_pk?: Maybe<GMInitParams>;
  /** fetch data from the table in a streaming manner: "GMInitParams" */
  GMInitParams_stream: Array<GMInitParams>;
  /** fetch data from the table: "GSVoter" */
  GSVoter: Array<GSVoter>;
  /** fetch data from the table: "GSVoter" using primary key columns */
  GSVoter_by_pk?: Maybe<GSVoter>;
  /** fetch data from the table in a streaming manner: "GSVoter" */
  GSVoter_stream: Array<GSVoter>;
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
  /** fetch data from the table: "GrantShipsVoting" */
  GrantShipsVoting: Array<GrantShipsVoting>;
  /** fetch data from the table: "GrantShipsVoting" using primary key columns */
  GrantShipsVoting_by_pk?: Maybe<GrantShipsVoting>;
  /** fetch data from the table in a streaming manner: "GrantShipsVoting" */
  GrantShipsVoting_stream: Array<GrantShipsVoting>;
  /** fetch data from the table: "Grant" using primary key columns */
  Grant_by_pk?: Maybe<Grant>;
  /** fetch data from the table in a streaming manner: "Grant" */
  Grant_stream: Array<Grant>;
  /** fetch data from the table: "HALParams" */
  HALParams: Array<HALParams>;
  /** fetch data from the table: "HALParams" using primary key columns */
  HALParams_by_pk?: Maybe<HALParams>;
  /** fetch data from the table in a streaming manner: "HALParams" */
  HALParams_stream: Array<HALParams>;
  /** fetch data from the table: "HatsPoster" */
  HatsPoster: Array<HatsPoster>;
  /** fetch data from the table: "HatsPoster" using primary key columns */
  HatsPoster_by_pk?: Maybe<HatsPoster>;
  /** fetch data from the table in a streaming manner: "HatsPoster" */
  HatsPoster_stream: Array<HatsPoster>;
  /** fetch data from the table: "LocalLog" */
  LocalLog: Array<LocalLog>;
  /** fetch data from the table: "LocalLog" using primary key columns */
  LocalLog_by_pk?: Maybe<LocalLog>;
  /** fetch data from the table in a streaming manner: "LocalLog" */
  LocalLog_stream: Array<LocalLog>;
  /** fetch data from the table: "Milestone" */
  Milestone: Array<Milestone>;
  /** fetch data from the table: "MilestoneSet" */
  MilestoneSet: Array<MilestoneSet>;
  /** fetch data from the table: "MilestoneSet" using primary key columns */
  MilestoneSet_by_pk?: Maybe<MilestoneSet>;
  /** fetch data from the table in a streaming manner: "MilestoneSet" */
  MilestoneSet_stream: Array<MilestoneSet>;
  /** fetch data from the table: "Milestone" using primary key columns */
  Milestone_by_pk?: Maybe<Milestone>;
  /** fetch data from the table in a streaming manner: "Milestone" */
  Milestone_stream: Array<Milestone>;
  /** fetch data from the table: "ModuleTemplate" */
  ModuleTemplate: Array<ModuleTemplate>;
  /** fetch data from the table: "ModuleTemplate" using primary key columns */
  ModuleTemplate_by_pk?: Maybe<ModuleTemplate>;
  /** fetch data from the table in a streaming manner: "ModuleTemplate" */
  ModuleTemplate_stream: Array<ModuleTemplate>;
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
  /** fetch data from the table: "Record" */
  Record: Array<Record>;
  /** fetch data from the table: "Record" using primary key columns */
  Record_by_pk?: Maybe<Record>;
  /** fetch data from the table in a streaming manner: "Record" */
  Record_stream: Array<Record>;
  /** fetch data from the table: "SBTBalParams" */
  SBTBalParams: Array<SBTBalParams>;
  /** fetch data from the table: "SBTBalParams" using primary key columns */
  SBTBalParams_by_pk?: Maybe<SBTBalParams>;
  /** fetch data from the table in a streaming manner: "SBTBalParams" */
  SBTBalParams_stream: Array<SBTBalParams>;
  /** fetch data from the table: "ShipChoice" */
  ShipChoice: Array<ShipChoice>;
  /** fetch data from the table: "ShipChoice" using primary key columns */
  ShipChoice_by_pk?: Maybe<ShipChoice>;
  /** fetch data from the table in a streaming manner: "ShipChoice" */
  ShipChoice_stream: Array<ShipChoice>;
  /** fetch data from the table: "ShipContext" */
  ShipContext: Array<ShipContext>;
  /** fetch data from the table: "ShipContext" using primary key columns */
  ShipContext_by_pk?: Maybe<ShipContext>;
  /** fetch data from the table in a streaming manner: "ShipContext" */
  ShipContext_stream: Array<ShipContext>;
  /** fetch data from the table: "ShipVote" */
  ShipVote: Array<ShipVote>;
  /** fetch data from the table: "ShipVote" using primary key columns */
  ShipVote_by_pk?: Maybe<ShipVote>;
  /** fetch data from the table in a streaming manner: "ShipVote" */
  ShipVote_stream: Array<ShipVote>;
  /** fetch data from the table: "StemModule" */
  StemModule: Array<StemModule>;
  /** fetch data from the table: "StemModule" using primary key columns */
  StemModule_by_pk?: Maybe<StemModule>;
  /** fetch data from the table in a streaming manner: "StemModule" */
  StemModule_stream: Array<StemModule>;
  /** fetch data from the table: "TVParams" */
  TVParams: Array<TVParams>;
  /** fetch data from the table: "TVParams" using primary key columns */
  TVParams_by_pk?: Maybe<TVParams>;
  /** fetch data from the table in a streaming manner: "TVParams" */
  TVParams_stream: Array<TVParams>;
  /** fetch data from the table: "Transaction" */
  Transaction: Array<Transaction>;
  /** fetch data from the table: "Transaction" using primary key columns */
  Transaction_by_pk?: Maybe<Transaction>;
  /** fetch data from the table in a streaming manner: "Transaction" */
  Transaction_stream: Array<Transaction>;
  /** fetch data from the table: "Update" */
  Update: Array<Update>;
  /** fetch data from the table: "Update" using primary key columns */
  Update_by_pk?: Maybe<Update>;
  /** fetch data from the table in a streaming manner: "Update" */
  Update_stream: Array<Update>;
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


export type subscription_rootApplicationArgs = {
  distinct_on?: InputMaybe<Array<Application_select_column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Application_order_by>>;
  where?: InputMaybe<Application_bool_exp>;
};


export type subscription_rootApplication_by_pkArgs = {
  id: Scalars['String'];
};


export type subscription_rootApplication_streamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<Application_stream_cursor_input>>;
  where?: InputMaybe<Application_bool_exp>;
};


export type subscription_rootContestArgs = {
  distinct_on?: InputMaybe<Array<Contest_select_column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Contest_order_by>>;
  where?: InputMaybe<Contest_bool_exp>;
};


export type subscription_rootContestCloneArgs = {
  distinct_on?: InputMaybe<Array<ContestClone_select_column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<ContestClone_order_by>>;
  where?: InputMaybe<ContestClone_bool_exp>;
};


export type subscription_rootContestClone_by_pkArgs = {
  id: Scalars['String'];
};


export type subscription_rootContestClone_streamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<ContestClone_stream_cursor_input>>;
  where?: InputMaybe<ContestClone_bool_exp>;
};


export type subscription_rootContestTemplateArgs = {
  distinct_on?: InputMaybe<Array<ContestTemplate_select_column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<ContestTemplate_order_by>>;
  where?: InputMaybe<ContestTemplate_bool_exp>;
};


export type subscription_rootContestTemplate_by_pkArgs = {
  id: Scalars['String'];
};


export type subscription_rootContestTemplate_streamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<ContestTemplate_stream_cursor_input>>;
  where?: InputMaybe<ContestTemplate_bool_exp>;
};


export type subscription_rootContest_by_pkArgs = {
  id: Scalars['String'];
};


export type subscription_rootContest_streamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<Contest_stream_cursor_input>>;
  where?: InputMaybe<Contest_bool_exp>;
};


export type subscription_rootERCPointParamsArgs = {
  distinct_on?: InputMaybe<Array<ERCPointParams_select_column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<ERCPointParams_order_by>>;
  where?: InputMaybe<ERCPointParams_bool_exp>;
};


export type subscription_rootERCPointParams_by_pkArgs = {
  id: Scalars['String'];
};


export type subscription_rootERCPointParams_streamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<ERCPointParams_stream_cursor_input>>;
  where?: InputMaybe<ERCPointParams_bool_exp>;
};


export type subscription_rootEnvioTXArgs = {
  distinct_on?: InputMaybe<Array<EnvioTX_select_column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<EnvioTX_order_by>>;
  where?: InputMaybe<EnvioTX_bool_exp>;
};


export type subscription_rootEnvioTX_by_pkArgs = {
  id: Scalars['String'];
};


export type subscription_rootEnvioTX_streamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<EnvioTX_stream_cursor_input>>;
  where?: InputMaybe<EnvioTX_bool_exp>;
};


export type subscription_rootEventPostArgs = {
  distinct_on?: InputMaybe<Array<EventPost_select_column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<EventPost_order_by>>;
  where?: InputMaybe<EventPost_bool_exp>;
};


export type subscription_rootEventPost_by_pkArgs = {
  id: Scalars['String'];
};


export type subscription_rootEventPost_streamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<EventPost_stream_cursor_input>>;
  where?: InputMaybe<EventPost_bool_exp>;
};


export type subscription_rootFactoryEventsSummaryArgs = {
  distinct_on?: InputMaybe<Array<FactoryEventsSummary_select_column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<FactoryEventsSummary_order_by>>;
  where?: InputMaybe<FactoryEventsSummary_bool_exp>;
};


export type subscription_rootFactoryEventsSummary_by_pkArgs = {
  id: Scalars['String'];
};


export type subscription_rootFactoryEventsSummary_streamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<FactoryEventsSummary_stream_cursor_input>>;
  where?: InputMaybe<FactoryEventsSummary_bool_exp>;
};


export type subscription_rootFeedCardArgs = {
  distinct_on?: InputMaybe<Array<FeedCard_select_column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<FeedCard_order_by>>;
  where?: InputMaybe<FeedCard_bool_exp>;
};


export type subscription_rootFeedCard_by_pkArgs = {
  id: Scalars['String'];
};


export type subscription_rootFeedCard_streamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<FeedCard_stream_cursor_input>>;
  where?: InputMaybe<FeedCard_bool_exp>;
};


export type subscription_rootFeedItemEmbedArgs = {
  distinct_on?: InputMaybe<Array<FeedItemEmbed_select_column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<FeedItemEmbed_order_by>>;
  where?: InputMaybe<FeedItemEmbed_bool_exp>;
};


export type subscription_rootFeedItemEmbed_by_pkArgs = {
  id: Scalars['String'];
};


export type subscription_rootFeedItemEmbed_streamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<FeedItemEmbed_stream_cursor_input>>;
  where?: InputMaybe<FeedItemEmbed_bool_exp>;
};


export type subscription_rootFeedItemEntityArgs = {
  distinct_on?: InputMaybe<Array<FeedItemEntity_select_column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<FeedItemEntity_order_by>>;
  where?: InputMaybe<FeedItemEntity_bool_exp>;
};


export type subscription_rootFeedItemEntity_by_pkArgs = {
  id: Scalars['String'];
};


export type subscription_rootFeedItemEntity_streamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<FeedItemEntity_stream_cursor_input>>;
  where?: InputMaybe<FeedItemEntity_bool_exp>;
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


export type subscription_rootGSVoterArgs = {
  distinct_on?: InputMaybe<Array<GSVoter_select_column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<GSVoter_order_by>>;
  where?: InputMaybe<GSVoter_bool_exp>;
};


export type subscription_rootGSVoter_by_pkArgs = {
  id: Scalars['String'];
};


export type subscription_rootGSVoter_streamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<GSVoter_stream_cursor_input>>;
  where?: InputMaybe<GSVoter_bool_exp>;
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


export type subscription_rootGrantShipsVotingArgs = {
  distinct_on?: InputMaybe<Array<GrantShipsVoting_select_column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<GrantShipsVoting_order_by>>;
  where?: InputMaybe<GrantShipsVoting_bool_exp>;
};


export type subscription_rootGrantShipsVoting_by_pkArgs = {
  id: Scalars['String'];
};


export type subscription_rootGrantShipsVoting_streamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<GrantShipsVoting_stream_cursor_input>>;
  where?: InputMaybe<GrantShipsVoting_bool_exp>;
};


export type subscription_rootGrant_by_pkArgs = {
  id: Scalars['String'];
};


export type subscription_rootGrant_streamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<Grant_stream_cursor_input>>;
  where?: InputMaybe<Grant_bool_exp>;
};


export type subscription_rootHALParamsArgs = {
  distinct_on?: InputMaybe<Array<HALParams_select_column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<HALParams_order_by>>;
  where?: InputMaybe<HALParams_bool_exp>;
};


export type subscription_rootHALParams_by_pkArgs = {
  id: Scalars['String'];
};


export type subscription_rootHALParams_streamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<HALParams_stream_cursor_input>>;
  where?: InputMaybe<HALParams_bool_exp>;
};


export type subscription_rootHatsPosterArgs = {
  distinct_on?: InputMaybe<Array<HatsPoster_select_column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<HatsPoster_order_by>>;
  where?: InputMaybe<HatsPoster_bool_exp>;
};


export type subscription_rootHatsPoster_by_pkArgs = {
  id: Scalars['String'];
};


export type subscription_rootHatsPoster_streamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<HatsPoster_stream_cursor_input>>;
  where?: InputMaybe<HatsPoster_bool_exp>;
};


export type subscription_rootLocalLogArgs = {
  distinct_on?: InputMaybe<Array<LocalLog_select_column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<LocalLog_order_by>>;
  where?: InputMaybe<LocalLog_bool_exp>;
};


export type subscription_rootLocalLog_by_pkArgs = {
  id: Scalars['String'];
};


export type subscription_rootLocalLog_streamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<LocalLog_stream_cursor_input>>;
  where?: InputMaybe<LocalLog_bool_exp>;
};


export type subscription_rootMilestoneArgs = {
  distinct_on?: InputMaybe<Array<Milestone_select_column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Milestone_order_by>>;
  where?: InputMaybe<Milestone_bool_exp>;
};


export type subscription_rootMilestoneSetArgs = {
  distinct_on?: InputMaybe<Array<MilestoneSet_select_column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<MilestoneSet_order_by>>;
  where?: InputMaybe<MilestoneSet_bool_exp>;
};


export type subscription_rootMilestoneSet_by_pkArgs = {
  id: Scalars['String'];
};


export type subscription_rootMilestoneSet_streamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<MilestoneSet_stream_cursor_input>>;
  where?: InputMaybe<MilestoneSet_bool_exp>;
};


export type subscription_rootMilestone_by_pkArgs = {
  id: Scalars['String'];
};


export type subscription_rootMilestone_streamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<Milestone_stream_cursor_input>>;
  where?: InputMaybe<Milestone_bool_exp>;
};


export type subscription_rootModuleTemplateArgs = {
  distinct_on?: InputMaybe<Array<ModuleTemplate_select_column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<ModuleTemplate_order_by>>;
  where?: InputMaybe<ModuleTemplate_bool_exp>;
};


export type subscription_rootModuleTemplate_by_pkArgs = {
  id: Scalars['String'];
};


export type subscription_rootModuleTemplate_streamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<ModuleTemplate_stream_cursor_input>>;
  where?: InputMaybe<ModuleTemplate_bool_exp>;
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


export type subscription_rootRecordArgs = {
  distinct_on?: InputMaybe<Array<Record_select_column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Record_order_by>>;
  where?: InputMaybe<Record_bool_exp>;
};


export type subscription_rootRecord_by_pkArgs = {
  id: Scalars['String'];
};


export type subscription_rootRecord_streamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<Record_stream_cursor_input>>;
  where?: InputMaybe<Record_bool_exp>;
};


export type subscription_rootSBTBalParamsArgs = {
  distinct_on?: InputMaybe<Array<SBTBalParams_select_column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<SBTBalParams_order_by>>;
  where?: InputMaybe<SBTBalParams_bool_exp>;
};


export type subscription_rootSBTBalParams_by_pkArgs = {
  id: Scalars['String'];
};


export type subscription_rootSBTBalParams_streamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<SBTBalParams_stream_cursor_input>>;
  where?: InputMaybe<SBTBalParams_bool_exp>;
};


export type subscription_rootShipChoiceArgs = {
  distinct_on?: InputMaybe<Array<ShipChoice_select_column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<ShipChoice_order_by>>;
  where?: InputMaybe<ShipChoice_bool_exp>;
};


export type subscription_rootShipChoice_by_pkArgs = {
  id: Scalars['String'];
};


export type subscription_rootShipChoice_streamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<ShipChoice_stream_cursor_input>>;
  where?: InputMaybe<ShipChoice_bool_exp>;
};


export type subscription_rootShipContextArgs = {
  distinct_on?: InputMaybe<Array<ShipContext_select_column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<ShipContext_order_by>>;
  where?: InputMaybe<ShipContext_bool_exp>;
};


export type subscription_rootShipContext_by_pkArgs = {
  id: Scalars['String'];
};


export type subscription_rootShipContext_streamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<ShipContext_stream_cursor_input>>;
  where?: InputMaybe<ShipContext_bool_exp>;
};


export type subscription_rootShipVoteArgs = {
  distinct_on?: InputMaybe<Array<ShipVote_select_column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<ShipVote_order_by>>;
  where?: InputMaybe<ShipVote_bool_exp>;
};


export type subscription_rootShipVote_by_pkArgs = {
  id: Scalars['String'];
};


export type subscription_rootShipVote_streamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<ShipVote_stream_cursor_input>>;
  where?: InputMaybe<ShipVote_bool_exp>;
};


export type subscription_rootStemModuleArgs = {
  distinct_on?: InputMaybe<Array<StemModule_select_column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<StemModule_order_by>>;
  where?: InputMaybe<StemModule_bool_exp>;
};


export type subscription_rootStemModule_by_pkArgs = {
  id: Scalars['String'];
};


export type subscription_rootStemModule_streamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<StemModule_stream_cursor_input>>;
  where?: InputMaybe<StemModule_bool_exp>;
};


export type subscription_rootTVParamsArgs = {
  distinct_on?: InputMaybe<Array<TVParams_select_column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<TVParams_order_by>>;
  where?: InputMaybe<TVParams_bool_exp>;
};


export type subscription_rootTVParams_by_pkArgs = {
  id: Scalars['String'];
};


export type subscription_rootTVParams_streamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<TVParams_stream_cursor_input>>;
  where?: InputMaybe<TVParams_bool_exp>;
};


export type subscription_rootTransactionArgs = {
  distinct_on?: InputMaybe<Array<Transaction_select_column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Transaction_order_by>>;
  where?: InputMaybe<Transaction_bool_exp>;
};


export type subscription_rootTransaction_by_pkArgs = {
  id: Scalars['String'];
};


export type subscription_rootTransaction_streamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<Transaction_stream_cursor_input>>;
  where?: InputMaybe<Transaction_bool_exp>;
};


export type subscription_rootUpdateArgs = {
  distinct_on?: InputMaybe<Array<Update_select_column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Update_order_by>>;
  where?: InputMaybe<Update_bool_exp>;
};


export type subscription_rootUpdate_by_pkArgs = {
  id: Scalars['String'];
};


export type subscription_rootUpdate_streamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<Update_stream_cursor_input>>;
  where?: InputMaybe<Update_bool_exp>;
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
      /** fetch data from the table: "Application" **/
  Application: InContextSdkMethod<query_root['Application'], query_rootApplicationArgs, MeshContext>,
  /** fetch data from the table: "Application" using primary key columns **/
  Application_by_pk: InContextSdkMethod<query_root['Application_by_pk'], query_rootApplication_by_pkArgs, MeshContext>,
  /** fetch data from the table: "Contest" **/
  Contest: InContextSdkMethod<query_root['Contest'], query_rootContestArgs, MeshContext>,
  /** fetch data from the table: "ContestClone" **/
  ContestClone: InContextSdkMethod<query_root['ContestClone'], query_rootContestCloneArgs, MeshContext>,
  /** fetch data from the table: "ContestClone" using primary key columns **/
  ContestClone_by_pk: InContextSdkMethod<query_root['ContestClone_by_pk'], query_rootContestClone_by_pkArgs, MeshContext>,
  /** fetch data from the table: "ContestTemplate" **/
  ContestTemplate: InContextSdkMethod<query_root['ContestTemplate'], query_rootContestTemplateArgs, MeshContext>,
  /** fetch data from the table: "ContestTemplate" using primary key columns **/
  ContestTemplate_by_pk: InContextSdkMethod<query_root['ContestTemplate_by_pk'], query_rootContestTemplate_by_pkArgs, MeshContext>,
  /** fetch data from the table: "Contest" using primary key columns **/
  Contest_by_pk: InContextSdkMethod<query_root['Contest_by_pk'], query_rootContest_by_pkArgs, MeshContext>,
  /** fetch data from the table: "ERCPointParams" **/
  ERCPointParams: InContextSdkMethod<query_root['ERCPointParams'], query_rootERCPointParamsArgs, MeshContext>,
  /** fetch data from the table: "ERCPointParams" using primary key columns **/
  ERCPointParams_by_pk: InContextSdkMethod<query_root['ERCPointParams_by_pk'], query_rootERCPointParams_by_pkArgs, MeshContext>,
  /** fetch data from the table: "EnvioTX" **/
  EnvioTX: InContextSdkMethod<query_root['EnvioTX'], query_rootEnvioTXArgs, MeshContext>,
  /** fetch data from the table: "EnvioTX" using primary key columns **/
  EnvioTX_by_pk: InContextSdkMethod<query_root['EnvioTX_by_pk'], query_rootEnvioTX_by_pkArgs, MeshContext>,
  /** fetch data from the table: "EventPost" **/
  EventPost: InContextSdkMethod<query_root['EventPost'], query_rootEventPostArgs, MeshContext>,
  /** fetch data from the table: "EventPost" using primary key columns **/
  EventPost_by_pk: InContextSdkMethod<query_root['EventPost_by_pk'], query_rootEventPost_by_pkArgs, MeshContext>,
  /** fetch data from the table: "FactoryEventsSummary" **/
  FactoryEventsSummary: InContextSdkMethod<query_root['FactoryEventsSummary'], query_rootFactoryEventsSummaryArgs, MeshContext>,
  /** fetch data from the table: "FactoryEventsSummary" using primary key columns **/
  FactoryEventsSummary_by_pk: InContextSdkMethod<query_root['FactoryEventsSummary_by_pk'], query_rootFactoryEventsSummary_by_pkArgs, MeshContext>,
  /** fetch data from the table: "FeedCard" **/
  FeedCard: InContextSdkMethod<query_root['FeedCard'], query_rootFeedCardArgs, MeshContext>,
  /** fetch data from the table: "FeedCard" using primary key columns **/
  FeedCard_by_pk: InContextSdkMethod<query_root['FeedCard_by_pk'], query_rootFeedCard_by_pkArgs, MeshContext>,
  /** fetch data from the table: "FeedItemEmbed" **/
  FeedItemEmbed: InContextSdkMethod<query_root['FeedItemEmbed'], query_rootFeedItemEmbedArgs, MeshContext>,
  /** fetch data from the table: "FeedItemEmbed" using primary key columns **/
  FeedItemEmbed_by_pk: InContextSdkMethod<query_root['FeedItemEmbed_by_pk'], query_rootFeedItemEmbed_by_pkArgs, MeshContext>,
  /** fetch data from the table: "FeedItemEntity" **/
  FeedItemEntity: InContextSdkMethod<query_root['FeedItemEntity'], query_rootFeedItemEntityArgs, MeshContext>,
  /** fetch data from the table: "FeedItemEntity" using primary key columns **/
  FeedItemEntity_by_pk: InContextSdkMethod<query_root['FeedItemEntity_by_pk'], query_rootFeedItemEntity_by_pkArgs, MeshContext>,
  /** fetch data from the table: "GMInitParams" **/
  GMInitParams: InContextSdkMethod<query_root['GMInitParams'], query_rootGMInitParamsArgs, MeshContext>,
  /** fetch data from the table: "GMInitParams" using primary key columns **/
  GMInitParams_by_pk: InContextSdkMethod<query_root['GMInitParams_by_pk'], query_rootGMInitParams_by_pkArgs, MeshContext>,
  /** fetch data from the table: "GSVoter" **/
  GSVoter: InContextSdkMethod<query_root['GSVoter'], query_rootGSVoterArgs, MeshContext>,
  /** fetch data from the table: "GSVoter" using primary key columns **/
  GSVoter_by_pk: InContextSdkMethod<query_root['GSVoter_by_pk'], query_rootGSVoter_by_pkArgs, MeshContext>,
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
  /** fetch data from the table: "GrantShipsVoting" **/
  GrantShipsVoting: InContextSdkMethod<query_root['GrantShipsVoting'], query_rootGrantShipsVotingArgs, MeshContext>,
  /** fetch data from the table: "GrantShipsVoting" using primary key columns **/
  GrantShipsVoting_by_pk: InContextSdkMethod<query_root['GrantShipsVoting_by_pk'], query_rootGrantShipsVoting_by_pkArgs, MeshContext>,
  /** fetch data from the table: "Grant" using primary key columns **/
  Grant_by_pk: InContextSdkMethod<query_root['Grant_by_pk'], query_rootGrant_by_pkArgs, MeshContext>,
  /** fetch data from the table: "HALParams" **/
  HALParams: InContextSdkMethod<query_root['HALParams'], query_rootHALParamsArgs, MeshContext>,
  /** fetch data from the table: "HALParams" using primary key columns **/
  HALParams_by_pk: InContextSdkMethod<query_root['HALParams_by_pk'], query_rootHALParams_by_pkArgs, MeshContext>,
  /** fetch data from the table: "HatsPoster" **/
  HatsPoster: InContextSdkMethod<query_root['HatsPoster'], query_rootHatsPosterArgs, MeshContext>,
  /** fetch data from the table: "HatsPoster" using primary key columns **/
  HatsPoster_by_pk: InContextSdkMethod<query_root['HatsPoster_by_pk'], query_rootHatsPoster_by_pkArgs, MeshContext>,
  /** fetch data from the table: "LocalLog" **/
  LocalLog: InContextSdkMethod<query_root['LocalLog'], query_rootLocalLogArgs, MeshContext>,
  /** fetch data from the table: "LocalLog" using primary key columns **/
  LocalLog_by_pk: InContextSdkMethod<query_root['LocalLog_by_pk'], query_rootLocalLog_by_pkArgs, MeshContext>,
  /** fetch data from the table: "Milestone" **/
  Milestone: InContextSdkMethod<query_root['Milestone'], query_rootMilestoneArgs, MeshContext>,
  /** fetch data from the table: "MilestoneSet" **/
  MilestoneSet: InContextSdkMethod<query_root['MilestoneSet'], query_rootMilestoneSetArgs, MeshContext>,
  /** fetch data from the table: "MilestoneSet" using primary key columns **/
  MilestoneSet_by_pk: InContextSdkMethod<query_root['MilestoneSet_by_pk'], query_rootMilestoneSet_by_pkArgs, MeshContext>,
  /** fetch data from the table: "Milestone" using primary key columns **/
  Milestone_by_pk: InContextSdkMethod<query_root['Milestone_by_pk'], query_rootMilestone_by_pkArgs, MeshContext>,
  /** fetch data from the table: "ModuleTemplate" **/
  ModuleTemplate: InContextSdkMethod<query_root['ModuleTemplate'], query_rootModuleTemplateArgs, MeshContext>,
  /** fetch data from the table: "ModuleTemplate" using primary key columns **/
  ModuleTemplate_by_pk: InContextSdkMethod<query_root['ModuleTemplate_by_pk'], query_rootModuleTemplate_by_pkArgs, MeshContext>,
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
  /** fetch data from the table: "Record" **/
  Record: InContextSdkMethod<query_root['Record'], query_rootRecordArgs, MeshContext>,
  /** fetch data from the table: "Record" using primary key columns **/
  Record_by_pk: InContextSdkMethod<query_root['Record_by_pk'], query_rootRecord_by_pkArgs, MeshContext>,
  /** fetch data from the table: "SBTBalParams" **/
  SBTBalParams: InContextSdkMethod<query_root['SBTBalParams'], query_rootSBTBalParamsArgs, MeshContext>,
  /** fetch data from the table: "SBTBalParams" using primary key columns **/
  SBTBalParams_by_pk: InContextSdkMethod<query_root['SBTBalParams_by_pk'], query_rootSBTBalParams_by_pkArgs, MeshContext>,
  /** fetch data from the table: "ShipChoice" **/
  ShipChoice: InContextSdkMethod<query_root['ShipChoice'], query_rootShipChoiceArgs, MeshContext>,
  /** fetch data from the table: "ShipChoice" using primary key columns **/
  ShipChoice_by_pk: InContextSdkMethod<query_root['ShipChoice_by_pk'], query_rootShipChoice_by_pkArgs, MeshContext>,
  /** fetch data from the table: "ShipContext" **/
  ShipContext: InContextSdkMethod<query_root['ShipContext'], query_rootShipContextArgs, MeshContext>,
  /** fetch data from the table: "ShipContext" using primary key columns **/
  ShipContext_by_pk: InContextSdkMethod<query_root['ShipContext_by_pk'], query_rootShipContext_by_pkArgs, MeshContext>,
  /** fetch data from the table: "ShipVote" **/
  ShipVote: InContextSdkMethod<query_root['ShipVote'], query_rootShipVoteArgs, MeshContext>,
  /** fetch data from the table: "ShipVote" using primary key columns **/
  ShipVote_by_pk: InContextSdkMethod<query_root['ShipVote_by_pk'], query_rootShipVote_by_pkArgs, MeshContext>,
  /** fetch data from the table: "StemModule" **/
  StemModule: InContextSdkMethod<query_root['StemModule'], query_rootStemModuleArgs, MeshContext>,
  /** fetch data from the table: "StemModule" using primary key columns **/
  StemModule_by_pk: InContextSdkMethod<query_root['StemModule_by_pk'], query_rootStemModule_by_pkArgs, MeshContext>,
  /** fetch data from the table: "TVParams" **/
  TVParams: InContextSdkMethod<query_root['TVParams'], query_rootTVParamsArgs, MeshContext>,
  /** fetch data from the table: "TVParams" using primary key columns **/
  TVParams_by_pk: InContextSdkMethod<query_root['TVParams_by_pk'], query_rootTVParams_by_pkArgs, MeshContext>,
  /** fetch data from the table: "Transaction" **/
  Transaction: InContextSdkMethod<query_root['Transaction'], query_rootTransactionArgs, MeshContext>,
  /** fetch data from the table: "Transaction" using primary key columns **/
  Transaction_by_pk: InContextSdkMethod<query_root['Transaction_by_pk'], query_rootTransaction_by_pkArgs, MeshContext>,
  /** fetch data from the table: "Update" **/
  Update: InContextSdkMethod<query_root['Update'], query_rootUpdateArgs, MeshContext>,
  /** fetch data from the table: "Update" using primary key columns **/
  Update_by_pk: InContextSdkMethod<query_root['Update_by_pk'], query_rootUpdate_by_pkArgs, MeshContext>,
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
      /** fetch data from the table: "Application" **/
  Application: InContextSdkMethod<subscription_root['Application'], subscription_rootApplicationArgs, MeshContext>,
  /** fetch data from the table: "Application" using primary key columns **/
  Application_by_pk: InContextSdkMethod<subscription_root['Application_by_pk'], subscription_rootApplication_by_pkArgs, MeshContext>,
  /** fetch data from the table in a streaming manner: "Application" **/
  Application_stream: InContextSdkMethod<subscription_root['Application_stream'], subscription_rootApplication_streamArgs, MeshContext>,
  /** fetch data from the table: "Contest" **/
  Contest: InContextSdkMethod<subscription_root['Contest'], subscription_rootContestArgs, MeshContext>,
  /** fetch data from the table: "ContestClone" **/
  ContestClone: InContextSdkMethod<subscription_root['ContestClone'], subscription_rootContestCloneArgs, MeshContext>,
  /** fetch data from the table: "ContestClone" using primary key columns **/
  ContestClone_by_pk: InContextSdkMethod<subscription_root['ContestClone_by_pk'], subscription_rootContestClone_by_pkArgs, MeshContext>,
  /** fetch data from the table in a streaming manner: "ContestClone" **/
  ContestClone_stream: InContextSdkMethod<subscription_root['ContestClone_stream'], subscription_rootContestClone_streamArgs, MeshContext>,
  /** fetch data from the table: "ContestTemplate" **/
  ContestTemplate: InContextSdkMethod<subscription_root['ContestTemplate'], subscription_rootContestTemplateArgs, MeshContext>,
  /** fetch data from the table: "ContestTemplate" using primary key columns **/
  ContestTemplate_by_pk: InContextSdkMethod<subscription_root['ContestTemplate_by_pk'], subscription_rootContestTemplate_by_pkArgs, MeshContext>,
  /** fetch data from the table in a streaming manner: "ContestTemplate" **/
  ContestTemplate_stream: InContextSdkMethod<subscription_root['ContestTemplate_stream'], subscription_rootContestTemplate_streamArgs, MeshContext>,
  /** fetch data from the table: "Contest" using primary key columns **/
  Contest_by_pk: InContextSdkMethod<subscription_root['Contest_by_pk'], subscription_rootContest_by_pkArgs, MeshContext>,
  /** fetch data from the table in a streaming manner: "Contest" **/
  Contest_stream: InContextSdkMethod<subscription_root['Contest_stream'], subscription_rootContest_streamArgs, MeshContext>,
  /** fetch data from the table: "ERCPointParams" **/
  ERCPointParams: InContextSdkMethod<subscription_root['ERCPointParams'], subscription_rootERCPointParamsArgs, MeshContext>,
  /** fetch data from the table: "ERCPointParams" using primary key columns **/
  ERCPointParams_by_pk: InContextSdkMethod<subscription_root['ERCPointParams_by_pk'], subscription_rootERCPointParams_by_pkArgs, MeshContext>,
  /** fetch data from the table in a streaming manner: "ERCPointParams" **/
  ERCPointParams_stream: InContextSdkMethod<subscription_root['ERCPointParams_stream'], subscription_rootERCPointParams_streamArgs, MeshContext>,
  /** fetch data from the table: "EnvioTX" **/
  EnvioTX: InContextSdkMethod<subscription_root['EnvioTX'], subscription_rootEnvioTXArgs, MeshContext>,
  /** fetch data from the table: "EnvioTX" using primary key columns **/
  EnvioTX_by_pk: InContextSdkMethod<subscription_root['EnvioTX_by_pk'], subscription_rootEnvioTX_by_pkArgs, MeshContext>,
  /** fetch data from the table in a streaming manner: "EnvioTX" **/
  EnvioTX_stream: InContextSdkMethod<subscription_root['EnvioTX_stream'], subscription_rootEnvioTX_streamArgs, MeshContext>,
  /** fetch data from the table: "EventPost" **/
  EventPost: InContextSdkMethod<subscription_root['EventPost'], subscription_rootEventPostArgs, MeshContext>,
  /** fetch data from the table: "EventPost" using primary key columns **/
  EventPost_by_pk: InContextSdkMethod<subscription_root['EventPost_by_pk'], subscription_rootEventPost_by_pkArgs, MeshContext>,
  /** fetch data from the table in a streaming manner: "EventPost" **/
  EventPost_stream: InContextSdkMethod<subscription_root['EventPost_stream'], subscription_rootEventPost_streamArgs, MeshContext>,
  /** fetch data from the table: "FactoryEventsSummary" **/
  FactoryEventsSummary: InContextSdkMethod<subscription_root['FactoryEventsSummary'], subscription_rootFactoryEventsSummaryArgs, MeshContext>,
  /** fetch data from the table: "FactoryEventsSummary" using primary key columns **/
  FactoryEventsSummary_by_pk: InContextSdkMethod<subscription_root['FactoryEventsSummary_by_pk'], subscription_rootFactoryEventsSummary_by_pkArgs, MeshContext>,
  /** fetch data from the table in a streaming manner: "FactoryEventsSummary" **/
  FactoryEventsSummary_stream: InContextSdkMethod<subscription_root['FactoryEventsSummary_stream'], subscription_rootFactoryEventsSummary_streamArgs, MeshContext>,
  /** fetch data from the table: "FeedCard" **/
  FeedCard: InContextSdkMethod<subscription_root['FeedCard'], subscription_rootFeedCardArgs, MeshContext>,
  /** fetch data from the table: "FeedCard" using primary key columns **/
  FeedCard_by_pk: InContextSdkMethod<subscription_root['FeedCard_by_pk'], subscription_rootFeedCard_by_pkArgs, MeshContext>,
  /** fetch data from the table in a streaming manner: "FeedCard" **/
  FeedCard_stream: InContextSdkMethod<subscription_root['FeedCard_stream'], subscription_rootFeedCard_streamArgs, MeshContext>,
  /** fetch data from the table: "FeedItemEmbed" **/
  FeedItemEmbed: InContextSdkMethod<subscription_root['FeedItemEmbed'], subscription_rootFeedItemEmbedArgs, MeshContext>,
  /** fetch data from the table: "FeedItemEmbed" using primary key columns **/
  FeedItemEmbed_by_pk: InContextSdkMethod<subscription_root['FeedItemEmbed_by_pk'], subscription_rootFeedItemEmbed_by_pkArgs, MeshContext>,
  /** fetch data from the table in a streaming manner: "FeedItemEmbed" **/
  FeedItemEmbed_stream: InContextSdkMethod<subscription_root['FeedItemEmbed_stream'], subscription_rootFeedItemEmbed_streamArgs, MeshContext>,
  /** fetch data from the table: "FeedItemEntity" **/
  FeedItemEntity: InContextSdkMethod<subscription_root['FeedItemEntity'], subscription_rootFeedItemEntityArgs, MeshContext>,
  /** fetch data from the table: "FeedItemEntity" using primary key columns **/
  FeedItemEntity_by_pk: InContextSdkMethod<subscription_root['FeedItemEntity_by_pk'], subscription_rootFeedItemEntity_by_pkArgs, MeshContext>,
  /** fetch data from the table in a streaming manner: "FeedItemEntity" **/
  FeedItemEntity_stream: InContextSdkMethod<subscription_root['FeedItemEntity_stream'], subscription_rootFeedItemEntity_streamArgs, MeshContext>,
  /** fetch data from the table: "GMInitParams" **/
  GMInitParams: InContextSdkMethod<subscription_root['GMInitParams'], subscription_rootGMInitParamsArgs, MeshContext>,
  /** fetch data from the table: "GMInitParams" using primary key columns **/
  GMInitParams_by_pk: InContextSdkMethod<subscription_root['GMInitParams_by_pk'], subscription_rootGMInitParams_by_pkArgs, MeshContext>,
  /** fetch data from the table in a streaming manner: "GMInitParams" **/
  GMInitParams_stream: InContextSdkMethod<subscription_root['GMInitParams_stream'], subscription_rootGMInitParams_streamArgs, MeshContext>,
  /** fetch data from the table: "GSVoter" **/
  GSVoter: InContextSdkMethod<subscription_root['GSVoter'], subscription_rootGSVoterArgs, MeshContext>,
  /** fetch data from the table: "GSVoter" using primary key columns **/
  GSVoter_by_pk: InContextSdkMethod<subscription_root['GSVoter_by_pk'], subscription_rootGSVoter_by_pkArgs, MeshContext>,
  /** fetch data from the table in a streaming manner: "GSVoter" **/
  GSVoter_stream: InContextSdkMethod<subscription_root['GSVoter_stream'], subscription_rootGSVoter_streamArgs, MeshContext>,
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
  /** fetch data from the table: "GrantShipsVoting" **/
  GrantShipsVoting: InContextSdkMethod<subscription_root['GrantShipsVoting'], subscription_rootGrantShipsVotingArgs, MeshContext>,
  /** fetch data from the table: "GrantShipsVoting" using primary key columns **/
  GrantShipsVoting_by_pk: InContextSdkMethod<subscription_root['GrantShipsVoting_by_pk'], subscription_rootGrantShipsVoting_by_pkArgs, MeshContext>,
  /** fetch data from the table in a streaming manner: "GrantShipsVoting" **/
  GrantShipsVoting_stream: InContextSdkMethod<subscription_root['GrantShipsVoting_stream'], subscription_rootGrantShipsVoting_streamArgs, MeshContext>,
  /** fetch data from the table: "Grant" using primary key columns **/
  Grant_by_pk: InContextSdkMethod<subscription_root['Grant_by_pk'], subscription_rootGrant_by_pkArgs, MeshContext>,
  /** fetch data from the table in a streaming manner: "Grant" **/
  Grant_stream: InContextSdkMethod<subscription_root['Grant_stream'], subscription_rootGrant_streamArgs, MeshContext>,
  /** fetch data from the table: "HALParams" **/
  HALParams: InContextSdkMethod<subscription_root['HALParams'], subscription_rootHALParamsArgs, MeshContext>,
  /** fetch data from the table: "HALParams" using primary key columns **/
  HALParams_by_pk: InContextSdkMethod<subscription_root['HALParams_by_pk'], subscription_rootHALParams_by_pkArgs, MeshContext>,
  /** fetch data from the table in a streaming manner: "HALParams" **/
  HALParams_stream: InContextSdkMethod<subscription_root['HALParams_stream'], subscription_rootHALParams_streamArgs, MeshContext>,
  /** fetch data from the table: "HatsPoster" **/
  HatsPoster: InContextSdkMethod<subscription_root['HatsPoster'], subscription_rootHatsPosterArgs, MeshContext>,
  /** fetch data from the table: "HatsPoster" using primary key columns **/
  HatsPoster_by_pk: InContextSdkMethod<subscription_root['HatsPoster_by_pk'], subscription_rootHatsPoster_by_pkArgs, MeshContext>,
  /** fetch data from the table in a streaming manner: "HatsPoster" **/
  HatsPoster_stream: InContextSdkMethod<subscription_root['HatsPoster_stream'], subscription_rootHatsPoster_streamArgs, MeshContext>,
  /** fetch data from the table: "LocalLog" **/
  LocalLog: InContextSdkMethod<subscription_root['LocalLog'], subscription_rootLocalLogArgs, MeshContext>,
  /** fetch data from the table: "LocalLog" using primary key columns **/
  LocalLog_by_pk: InContextSdkMethod<subscription_root['LocalLog_by_pk'], subscription_rootLocalLog_by_pkArgs, MeshContext>,
  /** fetch data from the table in a streaming manner: "LocalLog" **/
  LocalLog_stream: InContextSdkMethod<subscription_root['LocalLog_stream'], subscription_rootLocalLog_streamArgs, MeshContext>,
  /** fetch data from the table: "Milestone" **/
  Milestone: InContextSdkMethod<subscription_root['Milestone'], subscription_rootMilestoneArgs, MeshContext>,
  /** fetch data from the table: "MilestoneSet" **/
  MilestoneSet: InContextSdkMethod<subscription_root['MilestoneSet'], subscription_rootMilestoneSetArgs, MeshContext>,
  /** fetch data from the table: "MilestoneSet" using primary key columns **/
  MilestoneSet_by_pk: InContextSdkMethod<subscription_root['MilestoneSet_by_pk'], subscription_rootMilestoneSet_by_pkArgs, MeshContext>,
  /** fetch data from the table in a streaming manner: "MilestoneSet" **/
  MilestoneSet_stream: InContextSdkMethod<subscription_root['MilestoneSet_stream'], subscription_rootMilestoneSet_streamArgs, MeshContext>,
  /** fetch data from the table: "Milestone" using primary key columns **/
  Milestone_by_pk: InContextSdkMethod<subscription_root['Milestone_by_pk'], subscription_rootMilestone_by_pkArgs, MeshContext>,
  /** fetch data from the table in a streaming manner: "Milestone" **/
  Milestone_stream: InContextSdkMethod<subscription_root['Milestone_stream'], subscription_rootMilestone_streamArgs, MeshContext>,
  /** fetch data from the table: "ModuleTemplate" **/
  ModuleTemplate: InContextSdkMethod<subscription_root['ModuleTemplate'], subscription_rootModuleTemplateArgs, MeshContext>,
  /** fetch data from the table: "ModuleTemplate" using primary key columns **/
  ModuleTemplate_by_pk: InContextSdkMethod<subscription_root['ModuleTemplate_by_pk'], subscription_rootModuleTemplate_by_pkArgs, MeshContext>,
  /** fetch data from the table in a streaming manner: "ModuleTemplate" **/
  ModuleTemplate_stream: InContextSdkMethod<subscription_root['ModuleTemplate_stream'], subscription_rootModuleTemplate_streamArgs, MeshContext>,
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
  /** fetch data from the table: "Record" **/
  Record: InContextSdkMethod<subscription_root['Record'], subscription_rootRecordArgs, MeshContext>,
  /** fetch data from the table: "Record" using primary key columns **/
  Record_by_pk: InContextSdkMethod<subscription_root['Record_by_pk'], subscription_rootRecord_by_pkArgs, MeshContext>,
  /** fetch data from the table in a streaming manner: "Record" **/
  Record_stream: InContextSdkMethod<subscription_root['Record_stream'], subscription_rootRecord_streamArgs, MeshContext>,
  /** fetch data from the table: "SBTBalParams" **/
  SBTBalParams: InContextSdkMethod<subscription_root['SBTBalParams'], subscription_rootSBTBalParamsArgs, MeshContext>,
  /** fetch data from the table: "SBTBalParams" using primary key columns **/
  SBTBalParams_by_pk: InContextSdkMethod<subscription_root['SBTBalParams_by_pk'], subscription_rootSBTBalParams_by_pkArgs, MeshContext>,
  /** fetch data from the table in a streaming manner: "SBTBalParams" **/
  SBTBalParams_stream: InContextSdkMethod<subscription_root['SBTBalParams_stream'], subscription_rootSBTBalParams_streamArgs, MeshContext>,
  /** fetch data from the table: "ShipChoice" **/
  ShipChoice: InContextSdkMethod<subscription_root['ShipChoice'], subscription_rootShipChoiceArgs, MeshContext>,
  /** fetch data from the table: "ShipChoice" using primary key columns **/
  ShipChoice_by_pk: InContextSdkMethod<subscription_root['ShipChoice_by_pk'], subscription_rootShipChoice_by_pkArgs, MeshContext>,
  /** fetch data from the table in a streaming manner: "ShipChoice" **/
  ShipChoice_stream: InContextSdkMethod<subscription_root['ShipChoice_stream'], subscription_rootShipChoice_streamArgs, MeshContext>,
  /** fetch data from the table: "ShipContext" **/
  ShipContext: InContextSdkMethod<subscription_root['ShipContext'], subscription_rootShipContextArgs, MeshContext>,
  /** fetch data from the table: "ShipContext" using primary key columns **/
  ShipContext_by_pk: InContextSdkMethod<subscription_root['ShipContext_by_pk'], subscription_rootShipContext_by_pkArgs, MeshContext>,
  /** fetch data from the table in a streaming manner: "ShipContext" **/
  ShipContext_stream: InContextSdkMethod<subscription_root['ShipContext_stream'], subscription_rootShipContext_streamArgs, MeshContext>,
  /** fetch data from the table: "ShipVote" **/
  ShipVote: InContextSdkMethod<subscription_root['ShipVote'], subscription_rootShipVoteArgs, MeshContext>,
  /** fetch data from the table: "ShipVote" using primary key columns **/
  ShipVote_by_pk: InContextSdkMethod<subscription_root['ShipVote_by_pk'], subscription_rootShipVote_by_pkArgs, MeshContext>,
  /** fetch data from the table in a streaming manner: "ShipVote" **/
  ShipVote_stream: InContextSdkMethod<subscription_root['ShipVote_stream'], subscription_rootShipVote_streamArgs, MeshContext>,
  /** fetch data from the table: "StemModule" **/
  StemModule: InContextSdkMethod<subscription_root['StemModule'], subscription_rootStemModuleArgs, MeshContext>,
  /** fetch data from the table: "StemModule" using primary key columns **/
  StemModule_by_pk: InContextSdkMethod<subscription_root['StemModule_by_pk'], subscription_rootStemModule_by_pkArgs, MeshContext>,
  /** fetch data from the table in a streaming manner: "StemModule" **/
  StemModule_stream: InContextSdkMethod<subscription_root['StemModule_stream'], subscription_rootStemModule_streamArgs, MeshContext>,
  /** fetch data from the table: "TVParams" **/
  TVParams: InContextSdkMethod<subscription_root['TVParams'], subscription_rootTVParamsArgs, MeshContext>,
  /** fetch data from the table: "TVParams" using primary key columns **/
  TVParams_by_pk: InContextSdkMethod<subscription_root['TVParams_by_pk'], subscription_rootTVParams_by_pkArgs, MeshContext>,
  /** fetch data from the table in a streaming manner: "TVParams" **/
  TVParams_stream: InContextSdkMethod<subscription_root['TVParams_stream'], subscription_rootTVParams_streamArgs, MeshContext>,
  /** fetch data from the table: "Transaction" **/
  Transaction: InContextSdkMethod<subscription_root['Transaction'], subscription_rootTransactionArgs, MeshContext>,
  /** fetch data from the table: "Transaction" using primary key columns **/
  Transaction_by_pk: InContextSdkMethod<subscription_root['Transaction_by_pk'], subscription_rootTransaction_by_pkArgs, MeshContext>,
  /** fetch data from the table in a streaming manner: "Transaction" **/
  Transaction_stream: InContextSdkMethod<subscription_root['Transaction_stream'], subscription_rootTransaction_streamArgs, MeshContext>,
  /** fetch data from the table: "Update" **/
  Update: InContextSdkMethod<subscription_root['Update'], subscription_rootUpdateArgs, MeshContext>,
  /** fetch data from the table: "Update" using primary key columns **/
  Update_by_pk: InContextSdkMethod<subscription_root['Update_by_pk'], subscription_rootUpdate_by_pkArgs, MeshContext>,
  /** fetch data from the table in a streaming manner: "Update" **/
  Update_stream: InContextSdkMethod<subscription_root['Update_stream'], subscription_rootUpdate_streamArgs, MeshContext>,
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
