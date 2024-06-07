// @ts-nocheck

import { InContextSdkMethod } from '@graphql-mesh/types';
import { MeshContext } from '@graphql-mesh/runtime';

export namespace GsVotingTypes {
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
  admins: Array<Scalars['String']>;
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
  admins?: InputMaybe<String_array_comparison_exp>;
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
  admins?: InputMaybe<Array<Scalars['String']>>;
  contestBuiltCount?: InputMaybe<Scalars['numeric']>;
  contestCloneCount?: InputMaybe<Scalars['numeric']>;
  contestTemplateCount?: InputMaybe<Scalars['numeric']>;
  db_write_timestamp?: InputMaybe<Scalars['timestamp']>;
  id?: InputMaybe<Scalars['String']>;
  moduleCloneCount?: InputMaybe<Scalars['numeric']>;
  moduleTemplateCount?: InputMaybe<Scalars['numeric']>;
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
  isVotingActive?: InputMaybe<Scalars['Boolean']>;
  startTime?: InputMaybe<Scalars['numeric']>;
  totalVotes?: InputMaybe<Scalars['numeric']>;
  voteDuration?: InputMaybe<Scalars['numeric']>;
  voteTokenAddress?: InputMaybe<Scalars['String']>;
  votingCheckpoint?: InputMaybe<Scalars['numeric']>;
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
  hatIds: Array<Scalars['numeric']>;
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
  hatIds?: InputMaybe<numeric_array_comparison_exp>;
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
  hatIds?: InputMaybe<Array<Scalars['numeric']>>;
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
export type String_array_comparison_exp = {
  /** is the array contained in the given array value */
  _contained_in?: InputMaybe<Array<Scalars['String']>>;
  /** does the array contain the given value */
  _contains?: InputMaybe<Array<Scalars['String']>>;
  _eq?: InputMaybe<Array<Scalars['String']>>;
  _gt?: InputMaybe<Array<Scalars['String']>>;
  _gte?: InputMaybe<Array<Scalars['String']>>;
  _in?: InputMaybe<Array<Array<Scalars['String']>>>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  _lt?: InputMaybe<Array<Scalars['String']>>;
  _lte?: InputMaybe<Array<Scalars['String']>>;
  _neq?: InputMaybe<Array<Scalars['String']>>;
  _nin?: InputMaybe<Array<Array<Scalars['String']>>>;
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
export type numeric_array_comparison_exp = {
  /** is the array contained in the given array value */
  _contained_in?: InputMaybe<Array<Scalars['numeric']>>;
  /** does the array contain the given value */
  _contains?: InputMaybe<Array<Scalars['numeric']>>;
  _eq?: InputMaybe<Array<Scalars['numeric']>>;
  _gt?: InputMaybe<Array<Scalars['numeric']>>;
  _gte?: InputMaybe<Array<Scalars['numeric']>>;
  _in?: InputMaybe<Array<Array<Scalars['numeric']>>>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  _lt?: InputMaybe<Array<Scalars['numeric']>>;
  _lte?: InputMaybe<Array<Scalars['numeric']>>;
  _neq?: InputMaybe<Array<Scalars['numeric']>>;
  _nin?: InputMaybe<Array<Array<Scalars['numeric']>>>;
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
  /** fetch data from the table: "GSVoter" */
  GSVoter: Array<GSVoter>;
  /** fetch data from the table: "GSVoter" using primary key columns */
  GSVoter_by_pk?: Maybe<GSVoter>;
  /** fetch data from the table: "GrantShipsVoting" */
  GrantShipsVoting: Array<GrantShipsVoting>;
  /** fetch data from the table: "GrantShipsVoting" using primary key columns */
  GrantShipsVoting_by_pk?: Maybe<GrantShipsVoting>;
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
  /** fetch data from the table: "ModuleTemplate" */
  ModuleTemplate: Array<ModuleTemplate>;
  /** fetch data from the table: "ModuleTemplate" using primary key columns */
  ModuleTemplate_by_pk?: Maybe<ModuleTemplate>;
  /** fetch data from the table: "Record" */
  Record: Array<Record>;
  /** fetch data from the table: "Record" using primary key columns */
  Record_by_pk?: Maybe<Record>;
  /** fetch data from the table: "ShipChoice" */
  ShipChoice: Array<ShipChoice>;
  /** fetch data from the table: "ShipChoice" using primary key columns */
  ShipChoice_by_pk?: Maybe<ShipChoice>;
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
  /** fetch data from the table: "GSVoter" */
  GSVoter: Array<GSVoter>;
  /** fetch data from the table: "GSVoter" using primary key columns */
  GSVoter_by_pk?: Maybe<GSVoter>;
  /** fetch data from the table in a streaming manner: "GSVoter" */
  GSVoter_stream: Array<GSVoter>;
  /** fetch data from the table: "GrantShipsVoting" */
  GrantShipsVoting: Array<GrantShipsVoting>;
  /** fetch data from the table: "GrantShipsVoting" using primary key columns */
  GrantShipsVoting_by_pk?: Maybe<GrantShipsVoting>;
  /** fetch data from the table in a streaming manner: "GrantShipsVoting" */
  GrantShipsVoting_stream: Array<GrantShipsVoting>;
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
  /** fetch data from the table: "ModuleTemplate" */
  ModuleTemplate: Array<ModuleTemplate>;
  /** fetch data from the table: "ModuleTemplate" using primary key columns */
  ModuleTemplate_by_pk?: Maybe<ModuleTemplate>;
  /** fetch data from the table in a streaming manner: "ModuleTemplate" */
  ModuleTemplate_stream: Array<ModuleTemplate>;
  /** fetch data from the table: "Record" */
  Record: Array<Record>;
  /** fetch data from the table: "Record" using primary key columns */
  Record_by_pk?: Maybe<Record>;
  /** fetch data from the table in a streaming manner: "Record" */
  Record_stream: Array<Record>;
  /** fetch data from the table: "ShipChoice" */
  ShipChoice: Array<ShipChoice>;
  /** fetch data from the table: "ShipChoice" using primary key columns */
  ShipChoice_by_pk?: Maybe<ShipChoice>;
  /** fetch data from the table in a streaming manner: "ShipChoice" */
  ShipChoice_stream: Array<ShipChoice>;
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
  /** fetch data from the table: "GSVoter" **/
  GSVoter: InContextSdkMethod<query_root['GSVoter'], query_rootGSVoterArgs, MeshContext>,
  /** fetch data from the table: "GSVoter" using primary key columns **/
  GSVoter_by_pk: InContextSdkMethod<query_root['GSVoter_by_pk'], query_rootGSVoter_by_pkArgs, MeshContext>,
  /** fetch data from the table: "GrantShipsVoting" **/
  GrantShipsVoting: InContextSdkMethod<query_root['GrantShipsVoting'], query_rootGrantShipsVotingArgs, MeshContext>,
  /** fetch data from the table: "GrantShipsVoting" using primary key columns **/
  GrantShipsVoting_by_pk: InContextSdkMethod<query_root['GrantShipsVoting_by_pk'], query_rootGrantShipsVoting_by_pkArgs, MeshContext>,
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
  /** fetch data from the table: "ModuleTemplate" **/
  ModuleTemplate: InContextSdkMethod<query_root['ModuleTemplate'], query_rootModuleTemplateArgs, MeshContext>,
  /** fetch data from the table: "ModuleTemplate" using primary key columns **/
  ModuleTemplate_by_pk: InContextSdkMethod<query_root['ModuleTemplate_by_pk'], query_rootModuleTemplate_by_pkArgs, MeshContext>,
  /** fetch data from the table: "Record" **/
  Record: InContextSdkMethod<query_root['Record'], query_rootRecordArgs, MeshContext>,
  /** fetch data from the table: "Record" using primary key columns **/
  Record_by_pk: InContextSdkMethod<query_root['Record_by_pk'], query_rootRecord_by_pkArgs, MeshContext>,
  /** fetch data from the table: "ShipChoice" **/
  ShipChoice: InContextSdkMethod<query_root['ShipChoice'], query_rootShipChoiceArgs, MeshContext>,
  /** fetch data from the table: "ShipChoice" using primary key columns **/
  ShipChoice_by_pk: InContextSdkMethod<query_root['ShipChoice_by_pk'], query_rootShipChoice_by_pkArgs, MeshContext>,
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
  /** fetch data from the table: "GSVoter" **/
  GSVoter: InContextSdkMethod<subscription_root['GSVoter'], subscription_rootGSVoterArgs, MeshContext>,
  /** fetch data from the table: "GSVoter" using primary key columns **/
  GSVoter_by_pk: InContextSdkMethod<subscription_root['GSVoter_by_pk'], subscription_rootGSVoter_by_pkArgs, MeshContext>,
  /** fetch data from the table in a streaming manner: "GSVoter" **/
  GSVoter_stream: InContextSdkMethod<subscription_root['GSVoter_stream'], subscription_rootGSVoter_streamArgs, MeshContext>,
  /** fetch data from the table: "GrantShipsVoting" **/
  GrantShipsVoting: InContextSdkMethod<subscription_root['GrantShipsVoting'], subscription_rootGrantShipsVotingArgs, MeshContext>,
  /** fetch data from the table: "GrantShipsVoting" using primary key columns **/
  GrantShipsVoting_by_pk: InContextSdkMethod<subscription_root['GrantShipsVoting_by_pk'], subscription_rootGrantShipsVoting_by_pkArgs, MeshContext>,
  /** fetch data from the table in a streaming manner: "GrantShipsVoting" **/
  GrantShipsVoting_stream: InContextSdkMethod<subscription_root['GrantShipsVoting_stream'], subscription_rootGrantShipsVoting_streamArgs, MeshContext>,
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
  /** fetch data from the table: "ModuleTemplate" **/
  ModuleTemplate: InContextSdkMethod<subscription_root['ModuleTemplate'], subscription_rootModuleTemplateArgs, MeshContext>,
  /** fetch data from the table: "ModuleTemplate" using primary key columns **/
  ModuleTemplate_by_pk: InContextSdkMethod<subscription_root['ModuleTemplate_by_pk'], subscription_rootModuleTemplate_by_pkArgs, MeshContext>,
  /** fetch data from the table in a streaming manner: "ModuleTemplate" **/
  ModuleTemplate_stream: InContextSdkMethod<subscription_root['ModuleTemplate_stream'], subscription_rootModuleTemplate_streamArgs, MeshContext>,
  /** fetch data from the table: "Record" **/
  Record: InContextSdkMethod<subscription_root['Record'], subscription_rootRecordArgs, MeshContext>,
  /** fetch data from the table: "Record" using primary key columns **/
  Record_by_pk: InContextSdkMethod<subscription_root['Record_by_pk'], subscription_rootRecord_by_pkArgs, MeshContext>,
  /** fetch data from the table in a streaming manner: "Record" **/
  Record_stream: InContextSdkMethod<subscription_root['Record_stream'], subscription_rootRecord_streamArgs, MeshContext>,
  /** fetch data from the table: "ShipChoice" **/
  ShipChoice: InContextSdkMethod<subscription_root['ShipChoice'], subscription_rootShipChoiceArgs, MeshContext>,
  /** fetch data from the table: "ShipChoice" using primary key columns **/
  ShipChoice_by_pk: InContextSdkMethod<subscription_root['ShipChoice_by_pk'], subscription_rootShipChoice_by_pkArgs, MeshContext>,
  /** fetch data from the table in a streaming manner: "ShipChoice" **/
  ShipChoice_stream: InContextSdkMethod<subscription_root['ShipChoice_stream'], subscription_rootShipChoice_streamArgs, MeshContext>,
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
      ["gs-voting"]: { Query: QuerySdk, Mutation: MutationSdk, Subscription: SubscriptionSdk },
      
    };
}
