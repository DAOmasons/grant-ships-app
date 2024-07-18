// @ts-nocheck
import { GraphQLResolveInfo, SelectionSetNode, FieldNode, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
import { gql } from '@graphql-mesh/utils';

import type { GetMeshOptions } from '@graphql-mesh/runtime';
import type { YamlConfig } from '@graphql-mesh/types';
import { PubSub } from '@graphql-mesh/utils';
import { DefaultLogger } from '@graphql-mesh/utils';
import MeshCache from "@graphql-mesh/cache-localforage";
import { fetch as fetchFn } from '@whatwg-node/fetch';

import { MeshResolvedSource } from '@graphql-mesh/runtime';
import { MeshTransform, MeshPlugin } from '@graphql-mesh/types';
import GraphqlHandler from "@graphql-mesh/graphql"
import StitchingMerger from "@graphql-mesh/merger-stitching";
import { printWithCache } from '@graphql-mesh/utils';
import { createMeshHTTPHandler, MeshHTTPHandler } from '@graphql-mesh/http';
import { getMesh, ExecuteMeshFn, SubscribeMeshFn, MeshContext as BaseMeshContext, MeshInstance } from '@graphql-mesh/runtime';
import { MeshStore, FsStoreStorageAdapter } from '@graphql-mesh/store';
import { path as pathModule } from '@graphql-mesh/cross-helpers';
import { ImportFn } from '@graphql-mesh/types';
import type { GrantShipsTypes } from './sources/grant-ships/types';
import type { GsVotingTypes } from './sources/gs-voting/types';
import * as importedModule$0 from "./sources/grant-ships/introspectionSchema";
import * as importedModule$1 from "./sources/gs-voting/introspectionSchema";
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };



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

export type Query = {
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
  /** fetch data from the table: "SBTBalParams" */
  SBTBalParams: Array<SBTBalParams>;
  /** fetch data from the table: "SBTBalParams" using primary key columns */
  SBTBalParams_by_pk?: Maybe<SBTBalParams>;
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
};


export type QueryGMInitParamsArgs = {
  distinct_on?: InputMaybe<Array<GMInitParams_select_column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<GMInitParams_order_by>>;
  where?: InputMaybe<GMInitParams_bool_exp>;
};


export type QueryGMInitParams_by_pkArgs = {
  id: Scalars['String'];
};


export type QueryGameManagerArgs = {
  distinct_on?: InputMaybe<Array<GameManager_select_column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<GameManager_order_by>>;
  where?: InputMaybe<GameManager_bool_exp>;
};


export type QueryGameManagerFactoryArgs = {
  distinct_on?: InputMaybe<Array<GameManagerFactory_select_column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<GameManagerFactory_order_by>>;
  where?: InputMaybe<GameManagerFactory_bool_exp>;
};


export type QueryGameManagerFactory_by_pkArgs = {
  id: Scalars['String'];
};


export type QueryGameManagerTemplateArgs = {
  distinct_on?: InputMaybe<Array<GameManagerTemplate_select_column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<GameManagerTemplate_order_by>>;
  where?: InputMaybe<GameManagerTemplate_bool_exp>;
};


export type QueryGameManagerTemplate_by_pkArgs = {
  id: Scalars['String'];
};


export type QueryGameManager_by_pkArgs = {
  id: Scalars['String'];
};


export type QueryGameRoundArgs = {
  distinct_on?: InputMaybe<Array<GameRound_select_column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<GameRound_order_by>>;
  where?: InputMaybe<GameRound_bool_exp>;
};


export type QueryGameRound_by_pkArgs = {
  id: Scalars['String'];
};


export type QueryGrantArgs = {
  distinct_on?: InputMaybe<Array<Grant_select_column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Grant_order_by>>;
  where?: InputMaybe<Grant_bool_exp>;
};


export type QueryGrantShipArgs = {
  distinct_on?: InputMaybe<Array<GrantShip_select_column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<GrantShip_order_by>>;
  where?: InputMaybe<GrantShip_bool_exp>;
};


export type QueryGrantShip_by_pkArgs = {
  id: Scalars['String'];
};


export type QueryGrant_by_pkArgs = {
  id: Scalars['String'];
};


export type QueryProfileIdToAnchorArgs = {
  distinct_on?: InputMaybe<Array<ProfileIdToAnchor_select_column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<ProfileIdToAnchor_order_by>>;
  where?: InputMaybe<ProfileIdToAnchor_bool_exp>;
};


export type QueryProfileIdToAnchor_by_pkArgs = {
  id: Scalars['String'];
};


export type QueryProfileMemberGroupArgs = {
  distinct_on?: InputMaybe<Array<ProfileMemberGroup_select_column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<ProfileMemberGroup_order_by>>;
  where?: InputMaybe<ProfileMemberGroup_bool_exp>;
};


export type QueryProfileMemberGroup_by_pkArgs = {
  id: Scalars['String'];
};


export type QueryProjectArgs = {
  distinct_on?: InputMaybe<Array<Project_select_column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Project_order_by>>;
  where?: InputMaybe<Project_bool_exp>;
};


export type QueryProject_by_pkArgs = {
  id: Scalars['String'];
};


export type QueryRawMetadataArgs = {
  distinct_on?: InputMaybe<Array<RawMetadata_select_column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<RawMetadata_order_by>>;
  where?: InputMaybe<RawMetadata_bool_exp>;
};


export type QueryRawMetadata_by_pkArgs = {
  id: Scalars['String'];
};


export type QueryTestArgs = {
  distinct_on?: InputMaybe<Array<Test_select_column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Test_order_by>>;
  where?: InputMaybe<Test_bool_exp>;
};


export type QueryTest_by_pkArgs = {
  id: Scalars['String'];
};


export type Querychain_metadataArgs = {
  distinct_on?: InputMaybe<Array<chain_metadata_select_column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<chain_metadata_order_by>>;
  where?: InputMaybe<chain_metadata_bool_exp>;
};


export type Querychain_metadata_by_pkArgs = {
  chain_id: Scalars['Int'];
};


export type Querydynamic_contract_registryArgs = {
  distinct_on?: InputMaybe<Array<dynamic_contract_registry_select_column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<dynamic_contract_registry_order_by>>;
  where?: InputMaybe<dynamic_contract_registry_bool_exp>;
};


export type Querydynamic_contract_registry_by_pkArgs = {
  chain_id: Scalars['Int'];
  contract_address: Scalars['String'];
};


export type Queryentity_historyArgs = {
  distinct_on?: InputMaybe<Array<entity_history_select_column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<entity_history_order_by>>;
  where?: InputMaybe<entity_history_bool_exp>;
};


export type Queryentity_history_by_pkArgs = {
  block_number: Scalars['Int'];
  block_timestamp: Scalars['Int'];
  chain_id: Scalars['Int'];
  entity_id: Scalars['String'];
  entity_type: Scalars['entity_type'];
  log_index: Scalars['Int'];
};


export type Queryentity_history_filterArgs = {
  distinct_on?: InputMaybe<Array<entity_history_filter_select_column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<entity_history_filter_order_by>>;
  where?: InputMaybe<entity_history_filter_bool_exp>;
};


export type Queryentity_history_filter_by_pkArgs = {
  block_number: Scalars['Int'];
  chain_id: Scalars['Int'];
  entity_id: Scalars['String'];
  log_index: Scalars['Int'];
  previous_block_number: Scalars['Int'];
  previous_log_index: Scalars['Int'];
};


export type Queryevent_sync_stateArgs = {
  distinct_on?: InputMaybe<Array<event_sync_state_select_column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<event_sync_state_order_by>>;
  where?: InputMaybe<event_sync_state_bool_exp>;
};


export type Queryevent_sync_state_by_pkArgs = {
  chain_id: Scalars['Int'];
};


export type Queryget_entity_history_filterArgs = {
  args: get_entity_history_filter_args;
  distinct_on?: InputMaybe<Array<entity_history_filter_select_column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<entity_history_filter_order_by>>;
  where?: InputMaybe<entity_history_filter_bool_exp>;
};


export type Querypersisted_stateArgs = {
  distinct_on?: InputMaybe<Array<persisted_state_select_column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<persisted_state_order_by>>;
  where?: InputMaybe<persisted_state_bool_exp>;
};


export type Querypersisted_state_by_pkArgs = {
  id: Scalars['Int'];
};


export type Queryraw_eventsArgs = {
  distinct_on?: InputMaybe<Array<raw_events_select_column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<raw_events_order_by>>;
  where?: InputMaybe<raw_events_bool_exp>;
};


export type Queryraw_events_by_pkArgs = {
  chain_id: Scalars['Int'];
  event_id: Scalars['numeric'];
};


export type QueryContestArgs = {
  distinct_on?: InputMaybe<Array<Contest_select_column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Contest_order_by>>;
  where?: InputMaybe<Contest_bool_exp>;
};


export type QueryContestCloneArgs = {
  distinct_on?: InputMaybe<Array<ContestClone_select_column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<ContestClone_order_by>>;
  where?: InputMaybe<ContestClone_bool_exp>;
};


export type QueryContestClone_by_pkArgs = {
  id: Scalars['String'];
};


export type QueryContestTemplateArgs = {
  distinct_on?: InputMaybe<Array<ContestTemplate_select_column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<ContestTemplate_order_by>>;
  where?: InputMaybe<ContestTemplate_bool_exp>;
};


export type QueryContestTemplate_by_pkArgs = {
  id: Scalars['String'];
};


export type QueryContest_by_pkArgs = {
  id: Scalars['String'];
};


export type QueryERCPointParamsArgs = {
  distinct_on?: InputMaybe<Array<ERCPointParams_select_column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<ERCPointParams_order_by>>;
  where?: InputMaybe<ERCPointParams_bool_exp>;
};


export type QueryERCPointParams_by_pkArgs = {
  id: Scalars['String'];
};


export type QueryEnvioTXArgs = {
  distinct_on?: InputMaybe<Array<EnvioTX_select_column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<EnvioTX_order_by>>;
  where?: InputMaybe<EnvioTX_bool_exp>;
};


export type QueryEnvioTX_by_pkArgs = {
  id: Scalars['String'];
};


export type QueryEventPostArgs = {
  distinct_on?: InputMaybe<Array<EventPost_select_column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<EventPost_order_by>>;
  where?: InputMaybe<EventPost_bool_exp>;
};


export type QueryEventPost_by_pkArgs = {
  id: Scalars['String'];
};


export type QueryFactoryEventsSummaryArgs = {
  distinct_on?: InputMaybe<Array<FactoryEventsSummary_select_column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<FactoryEventsSummary_order_by>>;
  where?: InputMaybe<FactoryEventsSummary_bool_exp>;
};


export type QueryFactoryEventsSummary_by_pkArgs = {
  id: Scalars['String'];
};


export type QueryGSVoterArgs = {
  distinct_on?: InputMaybe<Array<GSVoter_select_column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<GSVoter_order_by>>;
  where?: InputMaybe<GSVoter_bool_exp>;
};


export type QueryGSVoter_by_pkArgs = {
  id: Scalars['String'];
};


export type QueryGrantShipsVotingArgs = {
  distinct_on?: InputMaybe<Array<GrantShipsVoting_select_column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<GrantShipsVoting_order_by>>;
  where?: InputMaybe<GrantShipsVoting_bool_exp>;
};


export type QueryGrantShipsVoting_by_pkArgs = {
  id: Scalars['String'];
};


export type QueryHALParamsArgs = {
  distinct_on?: InputMaybe<Array<HALParams_select_column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<HALParams_order_by>>;
  where?: InputMaybe<HALParams_bool_exp>;
};


export type QueryHALParams_by_pkArgs = {
  id: Scalars['String'];
};


export type QueryHatsPosterArgs = {
  distinct_on?: InputMaybe<Array<HatsPoster_select_column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<HatsPoster_order_by>>;
  where?: InputMaybe<HatsPoster_bool_exp>;
};


export type QueryHatsPoster_by_pkArgs = {
  id: Scalars['String'];
};


export type QueryLocalLogArgs = {
  distinct_on?: InputMaybe<Array<LocalLog_select_column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<LocalLog_order_by>>;
  where?: InputMaybe<LocalLog_bool_exp>;
};


export type QueryLocalLog_by_pkArgs = {
  id: Scalars['String'];
};


export type QueryModuleTemplateArgs = {
  distinct_on?: InputMaybe<Array<ModuleTemplate_select_column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<ModuleTemplate_order_by>>;
  where?: InputMaybe<ModuleTemplate_bool_exp>;
};


export type QueryModuleTemplate_by_pkArgs = {
  id: Scalars['String'];
};


export type QueryRecordArgs = {
  distinct_on?: InputMaybe<Array<Record_select_column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Record_order_by>>;
  where?: InputMaybe<Record_bool_exp>;
};


export type QueryRecord_by_pkArgs = {
  id: Scalars['String'];
};


export type QuerySBTBalParamsArgs = {
  distinct_on?: InputMaybe<Array<SBTBalParams_select_column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<SBTBalParams_order_by>>;
  where?: InputMaybe<SBTBalParams_bool_exp>;
};


export type QuerySBTBalParams_by_pkArgs = {
  id: Scalars['String'];
};


export type QueryShipChoiceArgs = {
  distinct_on?: InputMaybe<Array<ShipChoice_select_column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<ShipChoice_order_by>>;
  where?: InputMaybe<ShipChoice_bool_exp>;
};


export type QueryShipChoice_by_pkArgs = {
  id: Scalars['String'];
};


export type QueryShipVoteArgs = {
  distinct_on?: InputMaybe<Array<ShipVote_select_column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<ShipVote_order_by>>;
  where?: InputMaybe<ShipVote_bool_exp>;
};


export type QueryShipVote_by_pkArgs = {
  id: Scalars['String'];
};


export type QueryStemModuleArgs = {
  distinct_on?: InputMaybe<Array<StemModule_select_column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<StemModule_order_by>>;
  where?: InputMaybe<StemModule_bool_exp>;
};


export type QueryStemModule_by_pkArgs = {
  id: Scalars['String'];
};


export type QueryTVParamsArgs = {
  distinct_on?: InputMaybe<Array<TVParams_select_column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<TVParams_order_by>>;
  where?: InputMaybe<TVParams_bool_exp>;
};


export type QueryTVParams_by_pkArgs = {
  id: Scalars['String'];
};

export type Subscription = {
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
};


export type SubscriptionGMInitParamsArgs = {
  distinct_on?: InputMaybe<Array<GMInitParams_select_column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<GMInitParams_order_by>>;
  where?: InputMaybe<GMInitParams_bool_exp>;
};


export type SubscriptionGMInitParams_by_pkArgs = {
  id: Scalars['String'];
};


export type SubscriptionGMInitParams_streamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<GMInitParams_stream_cursor_input>>;
  where?: InputMaybe<GMInitParams_bool_exp>;
};


export type SubscriptionGameManagerArgs = {
  distinct_on?: InputMaybe<Array<GameManager_select_column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<GameManager_order_by>>;
  where?: InputMaybe<GameManager_bool_exp>;
};


export type SubscriptionGameManagerFactoryArgs = {
  distinct_on?: InputMaybe<Array<GameManagerFactory_select_column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<GameManagerFactory_order_by>>;
  where?: InputMaybe<GameManagerFactory_bool_exp>;
};


export type SubscriptionGameManagerFactory_by_pkArgs = {
  id: Scalars['String'];
};


export type SubscriptionGameManagerFactory_streamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<GameManagerFactory_stream_cursor_input>>;
  where?: InputMaybe<GameManagerFactory_bool_exp>;
};


export type SubscriptionGameManagerTemplateArgs = {
  distinct_on?: InputMaybe<Array<GameManagerTemplate_select_column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<GameManagerTemplate_order_by>>;
  where?: InputMaybe<GameManagerTemplate_bool_exp>;
};


export type SubscriptionGameManagerTemplate_by_pkArgs = {
  id: Scalars['String'];
};


export type SubscriptionGameManagerTemplate_streamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<GameManagerTemplate_stream_cursor_input>>;
  where?: InputMaybe<GameManagerTemplate_bool_exp>;
};


export type SubscriptionGameManager_by_pkArgs = {
  id: Scalars['String'];
};


export type SubscriptionGameManager_streamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<GameManager_stream_cursor_input>>;
  where?: InputMaybe<GameManager_bool_exp>;
};


export type SubscriptionGameRoundArgs = {
  distinct_on?: InputMaybe<Array<GameRound_select_column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<GameRound_order_by>>;
  where?: InputMaybe<GameRound_bool_exp>;
};


export type SubscriptionGameRound_by_pkArgs = {
  id: Scalars['String'];
};


export type SubscriptionGameRound_streamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<GameRound_stream_cursor_input>>;
  where?: InputMaybe<GameRound_bool_exp>;
};


export type SubscriptionGrantArgs = {
  distinct_on?: InputMaybe<Array<Grant_select_column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Grant_order_by>>;
  where?: InputMaybe<Grant_bool_exp>;
};


export type SubscriptionGrantShipArgs = {
  distinct_on?: InputMaybe<Array<GrantShip_select_column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<GrantShip_order_by>>;
  where?: InputMaybe<GrantShip_bool_exp>;
};


export type SubscriptionGrantShip_by_pkArgs = {
  id: Scalars['String'];
};


export type SubscriptionGrantShip_streamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<GrantShip_stream_cursor_input>>;
  where?: InputMaybe<GrantShip_bool_exp>;
};


export type SubscriptionGrant_by_pkArgs = {
  id: Scalars['String'];
};


export type SubscriptionGrant_streamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<Grant_stream_cursor_input>>;
  where?: InputMaybe<Grant_bool_exp>;
};


export type SubscriptionProfileIdToAnchorArgs = {
  distinct_on?: InputMaybe<Array<ProfileIdToAnchor_select_column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<ProfileIdToAnchor_order_by>>;
  where?: InputMaybe<ProfileIdToAnchor_bool_exp>;
};


export type SubscriptionProfileIdToAnchor_by_pkArgs = {
  id: Scalars['String'];
};


export type SubscriptionProfileIdToAnchor_streamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<ProfileIdToAnchor_stream_cursor_input>>;
  where?: InputMaybe<ProfileIdToAnchor_bool_exp>;
};


export type SubscriptionProfileMemberGroupArgs = {
  distinct_on?: InputMaybe<Array<ProfileMemberGroup_select_column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<ProfileMemberGroup_order_by>>;
  where?: InputMaybe<ProfileMemberGroup_bool_exp>;
};


export type SubscriptionProfileMemberGroup_by_pkArgs = {
  id: Scalars['String'];
};


export type SubscriptionProfileMemberGroup_streamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<ProfileMemberGroup_stream_cursor_input>>;
  where?: InputMaybe<ProfileMemberGroup_bool_exp>;
};


export type SubscriptionProjectArgs = {
  distinct_on?: InputMaybe<Array<Project_select_column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Project_order_by>>;
  where?: InputMaybe<Project_bool_exp>;
};


export type SubscriptionProject_by_pkArgs = {
  id: Scalars['String'];
};


export type SubscriptionProject_streamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<Project_stream_cursor_input>>;
  where?: InputMaybe<Project_bool_exp>;
};


export type SubscriptionRawMetadataArgs = {
  distinct_on?: InputMaybe<Array<RawMetadata_select_column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<RawMetadata_order_by>>;
  where?: InputMaybe<RawMetadata_bool_exp>;
};


export type SubscriptionRawMetadata_by_pkArgs = {
  id: Scalars['String'];
};


export type SubscriptionRawMetadata_streamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<RawMetadata_stream_cursor_input>>;
  where?: InputMaybe<RawMetadata_bool_exp>;
};


export type SubscriptionTestArgs = {
  distinct_on?: InputMaybe<Array<Test_select_column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Test_order_by>>;
  where?: InputMaybe<Test_bool_exp>;
};


export type SubscriptionTest_by_pkArgs = {
  id: Scalars['String'];
};


export type SubscriptionTest_streamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<Test_stream_cursor_input>>;
  where?: InputMaybe<Test_bool_exp>;
};


export type Subscriptionchain_metadataArgs = {
  distinct_on?: InputMaybe<Array<chain_metadata_select_column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<chain_metadata_order_by>>;
  where?: InputMaybe<chain_metadata_bool_exp>;
};


export type Subscriptionchain_metadata_by_pkArgs = {
  chain_id: Scalars['Int'];
};


export type Subscriptionchain_metadata_streamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<chain_metadata_stream_cursor_input>>;
  where?: InputMaybe<chain_metadata_bool_exp>;
};


export type Subscriptiondynamic_contract_registryArgs = {
  distinct_on?: InputMaybe<Array<dynamic_contract_registry_select_column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<dynamic_contract_registry_order_by>>;
  where?: InputMaybe<dynamic_contract_registry_bool_exp>;
};


export type Subscriptiondynamic_contract_registry_by_pkArgs = {
  chain_id: Scalars['Int'];
  contract_address: Scalars['String'];
};


export type Subscriptiondynamic_contract_registry_streamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<dynamic_contract_registry_stream_cursor_input>>;
  where?: InputMaybe<dynamic_contract_registry_bool_exp>;
};


export type Subscriptionentity_historyArgs = {
  distinct_on?: InputMaybe<Array<entity_history_select_column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<entity_history_order_by>>;
  where?: InputMaybe<entity_history_bool_exp>;
};


export type Subscriptionentity_history_by_pkArgs = {
  block_number: Scalars['Int'];
  block_timestamp: Scalars['Int'];
  chain_id: Scalars['Int'];
  entity_id: Scalars['String'];
  entity_type: Scalars['entity_type'];
  log_index: Scalars['Int'];
};


export type Subscriptionentity_history_filterArgs = {
  distinct_on?: InputMaybe<Array<entity_history_filter_select_column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<entity_history_filter_order_by>>;
  where?: InputMaybe<entity_history_filter_bool_exp>;
};


export type Subscriptionentity_history_filter_by_pkArgs = {
  block_number: Scalars['Int'];
  chain_id: Scalars['Int'];
  entity_id: Scalars['String'];
  log_index: Scalars['Int'];
  previous_block_number: Scalars['Int'];
  previous_log_index: Scalars['Int'];
};


export type Subscriptionentity_history_filter_streamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<entity_history_filter_stream_cursor_input>>;
  where?: InputMaybe<entity_history_filter_bool_exp>;
};


export type Subscriptionentity_history_streamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<entity_history_stream_cursor_input>>;
  where?: InputMaybe<entity_history_bool_exp>;
};


export type Subscriptionevent_sync_stateArgs = {
  distinct_on?: InputMaybe<Array<event_sync_state_select_column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<event_sync_state_order_by>>;
  where?: InputMaybe<event_sync_state_bool_exp>;
};


export type Subscriptionevent_sync_state_by_pkArgs = {
  chain_id: Scalars['Int'];
};


export type Subscriptionevent_sync_state_streamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<event_sync_state_stream_cursor_input>>;
  where?: InputMaybe<event_sync_state_bool_exp>;
};


export type Subscriptionget_entity_history_filterArgs = {
  args: get_entity_history_filter_args;
  distinct_on?: InputMaybe<Array<entity_history_filter_select_column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<entity_history_filter_order_by>>;
  where?: InputMaybe<entity_history_filter_bool_exp>;
};


export type Subscriptionpersisted_stateArgs = {
  distinct_on?: InputMaybe<Array<persisted_state_select_column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<persisted_state_order_by>>;
  where?: InputMaybe<persisted_state_bool_exp>;
};


export type Subscriptionpersisted_state_by_pkArgs = {
  id: Scalars['Int'];
};


export type Subscriptionpersisted_state_streamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<persisted_state_stream_cursor_input>>;
  where?: InputMaybe<persisted_state_bool_exp>;
};


export type Subscriptionraw_eventsArgs = {
  distinct_on?: InputMaybe<Array<raw_events_select_column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<raw_events_order_by>>;
  where?: InputMaybe<raw_events_bool_exp>;
};


export type Subscriptionraw_events_by_pkArgs = {
  chain_id: Scalars['Int'];
  event_id: Scalars['numeric'];
};


export type Subscriptionraw_events_streamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<raw_events_stream_cursor_input>>;
  where?: InputMaybe<raw_events_bool_exp>;
};


export type SubscriptionContestArgs = {
  distinct_on?: InputMaybe<Array<Contest_select_column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Contest_order_by>>;
  where?: InputMaybe<Contest_bool_exp>;
};


export type SubscriptionContestCloneArgs = {
  distinct_on?: InputMaybe<Array<ContestClone_select_column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<ContestClone_order_by>>;
  where?: InputMaybe<ContestClone_bool_exp>;
};


export type SubscriptionContestClone_by_pkArgs = {
  id: Scalars['String'];
};


export type SubscriptionContestClone_streamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<ContestClone_stream_cursor_input>>;
  where?: InputMaybe<ContestClone_bool_exp>;
};


export type SubscriptionContestTemplateArgs = {
  distinct_on?: InputMaybe<Array<ContestTemplate_select_column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<ContestTemplate_order_by>>;
  where?: InputMaybe<ContestTemplate_bool_exp>;
};


export type SubscriptionContestTemplate_by_pkArgs = {
  id: Scalars['String'];
};


export type SubscriptionContestTemplate_streamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<ContestTemplate_stream_cursor_input>>;
  where?: InputMaybe<ContestTemplate_bool_exp>;
};


export type SubscriptionContest_by_pkArgs = {
  id: Scalars['String'];
};


export type SubscriptionContest_streamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<Contest_stream_cursor_input>>;
  where?: InputMaybe<Contest_bool_exp>;
};


export type SubscriptionERCPointParamsArgs = {
  distinct_on?: InputMaybe<Array<ERCPointParams_select_column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<ERCPointParams_order_by>>;
  where?: InputMaybe<ERCPointParams_bool_exp>;
};


export type SubscriptionERCPointParams_by_pkArgs = {
  id: Scalars['String'];
};


export type SubscriptionERCPointParams_streamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<ERCPointParams_stream_cursor_input>>;
  where?: InputMaybe<ERCPointParams_bool_exp>;
};


export type SubscriptionEnvioTXArgs = {
  distinct_on?: InputMaybe<Array<EnvioTX_select_column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<EnvioTX_order_by>>;
  where?: InputMaybe<EnvioTX_bool_exp>;
};


export type SubscriptionEnvioTX_by_pkArgs = {
  id: Scalars['String'];
};


export type SubscriptionEnvioTX_streamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<EnvioTX_stream_cursor_input>>;
  where?: InputMaybe<EnvioTX_bool_exp>;
};


export type SubscriptionEventPostArgs = {
  distinct_on?: InputMaybe<Array<EventPost_select_column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<EventPost_order_by>>;
  where?: InputMaybe<EventPost_bool_exp>;
};


export type SubscriptionEventPost_by_pkArgs = {
  id: Scalars['String'];
};


export type SubscriptionEventPost_streamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<EventPost_stream_cursor_input>>;
  where?: InputMaybe<EventPost_bool_exp>;
};


export type SubscriptionFactoryEventsSummaryArgs = {
  distinct_on?: InputMaybe<Array<FactoryEventsSummary_select_column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<FactoryEventsSummary_order_by>>;
  where?: InputMaybe<FactoryEventsSummary_bool_exp>;
};


export type SubscriptionFactoryEventsSummary_by_pkArgs = {
  id: Scalars['String'];
};


export type SubscriptionFactoryEventsSummary_streamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<FactoryEventsSummary_stream_cursor_input>>;
  where?: InputMaybe<FactoryEventsSummary_bool_exp>;
};


export type SubscriptionGSVoterArgs = {
  distinct_on?: InputMaybe<Array<GSVoter_select_column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<GSVoter_order_by>>;
  where?: InputMaybe<GSVoter_bool_exp>;
};


export type SubscriptionGSVoter_by_pkArgs = {
  id: Scalars['String'];
};


export type SubscriptionGSVoter_streamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<GSVoter_stream_cursor_input>>;
  where?: InputMaybe<GSVoter_bool_exp>;
};


export type SubscriptionGrantShipsVotingArgs = {
  distinct_on?: InputMaybe<Array<GrantShipsVoting_select_column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<GrantShipsVoting_order_by>>;
  where?: InputMaybe<GrantShipsVoting_bool_exp>;
};


export type SubscriptionGrantShipsVoting_by_pkArgs = {
  id: Scalars['String'];
};


export type SubscriptionGrantShipsVoting_streamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<GrantShipsVoting_stream_cursor_input>>;
  where?: InputMaybe<GrantShipsVoting_bool_exp>;
};


export type SubscriptionHALParamsArgs = {
  distinct_on?: InputMaybe<Array<HALParams_select_column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<HALParams_order_by>>;
  where?: InputMaybe<HALParams_bool_exp>;
};


export type SubscriptionHALParams_by_pkArgs = {
  id: Scalars['String'];
};


export type SubscriptionHALParams_streamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<HALParams_stream_cursor_input>>;
  where?: InputMaybe<HALParams_bool_exp>;
};


export type SubscriptionHatsPosterArgs = {
  distinct_on?: InputMaybe<Array<HatsPoster_select_column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<HatsPoster_order_by>>;
  where?: InputMaybe<HatsPoster_bool_exp>;
};


export type SubscriptionHatsPoster_by_pkArgs = {
  id: Scalars['String'];
};


export type SubscriptionHatsPoster_streamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<HatsPoster_stream_cursor_input>>;
  where?: InputMaybe<HatsPoster_bool_exp>;
};


export type SubscriptionLocalLogArgs = {
  distinct_on?: InputMaybe<Array<LocalLog_select_column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<LocalLog_order_by>>;
  where?: InputMaybe<LocalLog_bool_exp>;
};


export type SubscriptionLocalLog_by_pkArgs = {
  id: Scalars['String'];
};


export type SubscriptionLocalLog_streamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<LocalLog_stream_cursor_input>>;
  where?: InputMaybe<LocalLog_bool_exp>;
};


export type SubscriptionModuleTemplateArgs = {
  distinct_on?: InputMaybe<Array<ModuleTemplate_select_column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<ModuleTemplate_order_by>>;
  where?: InputMaybe<ModuleTemplate_bool_exp>;
};


export type SubscriptionModuleTemplate_by_pkArgs = {
  id: Scalars['String'];
};


export type SubscriptionModuleTemplate_streamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<ModuleTemplate_stream_cursor_input>>;
  where?: InputMaybe<ModuleTemplate_bool_exp>;
};


export type SubscriptionRecordArgs = {
  distinct_on?: InputMaybe<Array<Record_select_column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Record_order_by>>;
  where?: InputMaybe<Record_bool_exp>;
};


export type SubscriptionRecord_by_pkArgs = {
  id: Scalars['String'];
};


export type SubscriptionRecord_streamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<Record_stream_cursor_input>>;
  where?: InputMaybe<Record_bool_exp>;
};


export type SubscriptionSBTBalParamsArgs = {
  distinct_on?: InputMaybe<Array<SBTBalParams_select_column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<SBTBalParams_order_by>>;
  where?: InputMaybe<SBTBalParams_bool_exp>;
};


export type SubscriptionSBTBalParams_by_pkArgs = {
  id: Scalars['String'];
};


export type SubscriptionSBTBalParams_streamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<SBTBalParams_stream_cursor_input>>;
  where?: InputMaybe<SBTBalParams_bool_exp>;
};


export type SubscriptionShipChoiceArgs = {
  distinct_on?: InputMaybe<Array<ShipChoice_select_column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<ShipChoice_order_by>>;
  where?: InputMaybe<ShipChoice_bool_exp>;
};


export type SubscriptionShipChoice_by_pkArgs = {
  id: Scalars['String'];
};


export type SubscriptionShipChoice_streamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<ShipChoice_stream_cursor_input>>;
  where?: InputMaybe<ShipChoice_bool_exp>;
};


export type SubscriptionShipVoteArgs = {
  distinct_on?: InputMaybe<Array<ShipVote_select_column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<ShipVote_order_by>>;
  where?: InputMaybe<ShipVote_bool_exp>;
};


export type SubscriptionShipVote_by_pkArgs = {
  id: Scalars['String'];
};


export type SubscriptionShipVote_streamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<ShipVote_stream_cursor_input>>;
  where?: InputMaybe<ShipVote_bool_exp>;
};


export type SubscriptionStemModuleArgs = {
  distinct_on?: InputMaybe<Array<StemModule_select_column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<StemModule_order_by>>;
  where?: InputMaybe<StemModule_bool_exp>;
};


export type SubscriptionStemModule_by_pkArgs = {
  id: Scalars['String'];
};


export type SubscriptionStemModule_streamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<StemModule_stream_cursor_input>>;
  where?: InputMaybe<StemModule_bool_exp>;
};


export type SubscriptionTVParamsArgs = {
  distinct_on?: InputMaybe<Array<TVParams_select_column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<TVParams_order_by>>;
  where?: InputMaybe<TVParams_bool_exp>;
};


export type SubscriptionTVParams_by_pkArgs = {
  id: Scalars['String'];
};


export type SubscriptionTVParams_streamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<TVParams_stream_cursor_input>>;
  where?: InputMaybe<TVParams_bool_exp>;
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
export type StitchingResolver<TResult, TParent, TContext, TArgs> = LegacyStitchingResolver<TResult, TParent, TContext, TArgs> | NewStitchingResolver<TResult, TParent, TContext, TArgs>;
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

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;



/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  Query: ResolverTypeWrapper<{}>;
  Subscription: ResolverTypeWrapper<{}>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  Boolean_comparison_exp: Boolean_comparison_exp;
  GMInitParams: ResolverTypeWrapper<GMInitParams>;
  GMInitParams_bool_exp: GMInitParams_bool_exp;
  GMInitParams_order_by: GMInitParams_order_by;
  GMInitParams_select_column: GMInitParams_select_column;
  GMInitParams_stream_cursor_input: GMInitParams_stream_cursor_input;
  GMInitParams_stream_cursor_value_input: GMInitParams_stream_cursor_value_input;
  GameManager: ResolverTypeWrapper<GameManager>;
  GameManagerFactory: ResolverTypeWrapper<GameManagerFactory>;
  GameManagerFactory_bool_exp: GameManagerFactory_bool_exp;
  GameManagerFactory_order_by: GameManagerFactory_order_by;
  GameManagerFactory_select_column: GameManagerFactory_select_column;
  GameManagerFactory_stream_cursor_input: GameManagerFactory_stream_cursor_input;
  GameManagerFactory_stream_cursor_value_input: GameManagerFactory_stream_cursor_value_input;
  GameManagerTemplate: ResolverTypeWrapper<GameManagerTemplate>;
  GameManagerTemplate_bool_exp: GameManagerTemplate_bool_exp;
  GameManagerTemplate_order_by: GameManagerTemplate_order_by;
  GameManagerTemplate_select_column: GameManagerTemplate_select_column;
  GameManagerTemplate_stream_cursor_input: GameManagerTemplate_stream_cursor_input;
  GameManagerTemplate_stream_cursor_value_input: GameManagerTemplate_stream_cursor_value_input;
  GameManager_bool_exp: GameManager_bool_exp;
  GameManager_order_by: GameManager_order_by;
  GameManager_select_column: GameManager_select_column;
  GameManager_stream_cursor_input: GameManager_stream_cursor_input;
  GameManager_stream_cursor_value_input: GameManager_stream_cursor_value_input;
  GameRound: ResolverTypeWrapper<GameRound>;
  GameRound_aggregate_order_by: GameRound_aggregate_order_by;
  GameRound_avg_order_by: GameRound_avg_order_by;
  GameRound_bool_exp: GameRound_bool_exp;
  GameRound_max_order_by: GameRound_max_order_by;
  GameRound_min_order_by: GameRound_min_order_by;
  GameRound_order_by: GameRound_order_by;
  GameRound_select_column: GameRound_select_column;
  GameRound_stddev_order_by: GameRound_stddev_order_by;
  GameRound_stddev_pop_order_by: GameRound_stddev_pop_order_by;
  GameRound_stddev_samp_order_by: GameRound_stddev_samp_order_by;
  GameRound_stream_cursor_input: GameRound_stream_cursor_input;
  GameRound_stream_cursor_value_input: GameRound_stream_cursor_value_input;
  GameRound_sum_order_by: GameRound_sum_order_by;
  GameRound_var_pop_order_by: GameRound_var_pop_order_by;
  GameRound_var_samp_order_by: GameRound_var_samp_order_by;
  GameRound_variance_order_by: GameRound_variance_order_by;
  Grant: ResolverTypeWrapper<Grant>;
  GrantShip: ResolverTypeWrapper<GrantShip>;
  GrantShip_aggregate_order_by: GrantShip_aggregate_order_by;
  GrantShip_avg_order_by: GrantShip_avg_order_by;
  GrantShip_bool_exp: GrantShip_bool_exp;
  GrantShip_max_order_by: GrantShip_max_order_by;
  GrantShip_min_order_by: GrantShip_min_order_by;
  GrantShip_order_by: GrantShip_order_by;
  GrantShip_select_column: GrantShip_select_column;
  GrantShip_stddev_order_by: GrantShip_stddev_order_by;
  GrantShip_stddev_pop_order_by: GrantShip_stddev_pop_order_by;
  GrantShip_stddev_samp_order_by: GrantShip_stddev_samp_order_by;
  GrantShip_stream_cursor_input: GrantShip_stream_cursor_input;
  GrantShip_stream_cursor_value_input: GrantShip_stream_cursor_value_input;
  GrantShip_sum_order_by: GrantShip_sum_order_by;
  GrantShip_var_pop_order_by: GrantShip_var_pop_order_by;
  GrantShip_var_samp_order_by: GrantShip_var_samp_order_by;
  GrantShip_variance_order_by: GrantShip_variance_order_by;
  Grant_aggregate_order_by: Grant_aggregate_order_by;
  Grant_bool_exp: Grant_bool_exp;
  Grant_max_order_by: Grant_max_order_by;
  Grant_min_order_by: Grant_min_order_by;
  Grant_order_by: Grant_order_by;
  Grant_select_column: Grant_select_column;
  Grant_stream_cursor_input: Grant_stream_cursor_input;
  Grant_stream_cursor_value_input: Grant_stream_cursor_value_input;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  Int_comparison_exp: Int_comparison_exp;
  ProfileIdToAnchor: ResolverTypeWrapper<ProfileIdToAnchor>;
  ProfileIdToAnchor_bool_exp: ProfileIdToAnchor_bool_exp;
  ProfileIdToAnchor_order_by: ProfileIdToAnchor_order_by;
  ProfileIdToAnchor_select_column: ProfileIdToAnchor_select_column;
  ProfileIdToAnchor_stream_cursor_input: ProfileIdToAnchor_stream_cursor_input;
  ProfileIdToAnchor_stream_cursor_value_input: ProfileIdToAnchor_stream_cursor_value_input;
  ProfileMemberGroup: ResolverTypeWrapper<ProfileMemberGroup>;
  ProfileMemberGroup_bool_exp: ProfileMemberGroup_bool_exp;
  ProfileMemberGroup_order_by: ProfileMemberGroup_order_by;
  ProfileMemberGroup_select_column: ProfileMemberGroup_select_column;
  ProfileMemberGroup_stream_cursor_input: ProfileMemberGroup_stream_cursor_input;
  ProfileMemberGroup_stream_cursor_value_input: ProfileMemberGroup_stream_cursor_value_input;
  Project: ResolverTypeWrapper<Project>;
  Project_bool_exp: Project_bool_exp;
  Project_order_by: Project_order_by;
  Project_select_column: Project_select_column;
  Project_stream_cursor_input: Project_stream_cursor_input;
  Project_stream_cursor_value_input: Project_stream_cursor_value_input;
  RawMetadata: ResolverTypeWrapper<RawMetadata>;
  RawMetadata_bool_exp: RawMetadata_bool_exp;
  RawMetadata_order_by: RawMetadata_order_by;
  RawMetadata_select_column: RawMetadata_select_column;
  RawMetadata_stream_cursor_input: RawMetadata_stream_cursor_input;
  RawMetadata_stream_cursor_value_input: RawMetadata_stream_cursor_value_input;
  String: ResolverTypeWrapper<Scalars['String']>;
  String_comparison_exp: String_comparison_exp;
  Test: ResolverTypeWrapper<Test>;
  Test_bool_exp: Test_bool_exp;
  Test_order_by: Test_order_by;
  Test_select_column: Test_select_column;
  Test_stream_cursor_input: Test_stream_cursor_input;
  Test_stream_cursor_value_input: Test_stream_cursor_value_input;
  _text: ResolverTypeWrapper<Scalars['_text']>;
  _text_comparison_exp: _text_comparison_exp;
  chain_metadata: ResolverTypeWrapper<chain_metadata>;
  chain_metadata_bool_exp: chain_metadata_bool_exp;
  chain_metadata_order_by: chain_metadata_order_by;
  chain_metadata_select_column: chain_metadata_select_column;
  chain_metadata_stream_cursor_input: chain_metadata_stream_cursor_input;
  chain_metadata_stream_cursor_value_input: chain_metadata_stream_cursor_value_input;
  contract_type: ResolverTypeWrapper<Scalars['contract_type']>;
  contract_type_comparison_exp: contract_type_comparison_exp;
  cursor_ordering: cursor_ordering;
  dynamic_contract_registry: ResolverTypeWrapper<dynamic_contract_registry>;
  dynamic_contract_registry_bool_exp: dynamic_contract_registry_bool_exp;
  dynamic_contract_registry_order_by: dynamic_contract_registry_order_by;
  dynamic_contract_registry_select_column: dynamic_contract_registry_select_column;
  dynamic_contract_registry_stream_cursor_input: dynamic_contract_registry_stream_cursor_input;
  dynamic_contract_registry_stream_cursor_value_input: dynamic_contract_registry_stream_cursor_value_input;
  entity_history: ResolverTypeWrapper<entity_history>;
  entity_history_aggregate_order_by: entity_history_aggregate_order_by;
  entity_history_avg_order_by: entity_history_avg_order_by;
  entity_history_bool_exp: entity_history_bool_exp;
  entity_history_filter: ResolverTypeWrapper<entity_history_filter>;
  entity_history_filter_bool_exp: entity_history_filter_bool_exp;
  entity_history_filter_order_by: entity_history_filter_order_by;
  entity_history_filter_select_column: entity_history_filter_select_column;
  entity_history_filter_stream_cursor_input: entity_history_filter_stream_cursor_input;
  entity_history_filter_stream_cursor_value_input: entity_history_filter_stream_cursor_value_input;
  entity_history_max_order_by: entity_history_max_order_by;
  entity_history_min_order_by: entity_history_min_order_by;
  entity_history_order_by: entity_history_order_by;
  entity_history_select_column: entity_history_select_column;
  entity_history_stddev_order_by: entity_history_stddev_order_by;
  entity_history_stddev_pop_order_by: entity_history_stddev_pop_order_by;
  entity_history_stddev_samp_order_by: entity_history_stddev_samp_order_by;
  entity_history_stream_cursor_input: entity_history_stream_cursor_input;
  entity_history_stream_cursor_value_input: entity_history_stream_cursor_value_input;
  entity_history_sum_order_by: entity_history_sum_order_by;
  entity_history_var_pop_order_by: entity_history_var_pop_order_by;
  entity_history_var_samp_order_by: entity_history_var_samp_order_by;
  entity_history_variance_order_by: entity_history_variance_order_by;
  entity_type: ResolverTypeWrapper<Scalars['entity_type']>;
  entity_type_comparison_exp: entity_type_comparison_exp;
  event_sync_state: ResolverTypeWrapper<event_sync_state>;
  event_sync_state_bool_exp: event_sync_state_bool_exp;
  event_sync_state_order_by: event_sync_state_order_by;
  event_sync_state_select_column: event_sync_state_select_column;
  event_sync_state_stream_cursor_input: event_sync_state_stream_cursor_input;
  event_sync_state_stream_cursor_value_input: event_sync_state_stream_cursor_value_input;
  event_type: ResolverTypeWrapper<Scalars['event_type']>;
  event_type_comparison_exp: event_type_comparison_exp;
  get_entity_history_filter_args: get_entity_history_filter_args;
  json: ResolverTypeWrapper<Scalars['json']>;
  json_comparison_exp: json_comparison_exp;
  numeric: ResolverTypeWrapper<Scalars['numeric']>;
  numeric_comparison_exp: numeric_comparison_exp;
  order_by: order_by;
  persisted_state: ResolverTypeWrapper<persisted_state>;
  persisted_state_bool_exp: persisted_state_bool_exp;
  persisted_state_order_by: persisted_state_order_by;
  persisted_state_select_column: persisted_state_select_column;
  persisted_state_stream_cursor_input: persisted_state_stream_cursor_input;
  persisted_state_stream_cursor_value_input: persisted_state_stream_cursor_value_input;
  raw_events: ResolverTypeWrapper<raw_events>;
  raw_events_bool_exp: raw_events_bool_exp;
  raw_events_order_by: raw_events_order_by;
  raw_events_select_column: raw_events_select_column;
  raw_events_stream_cursor_input: raw_events_stream_cursor_input;
  raw_events_stream_cursor_value_input: raw_events_stream_cursor_value_input;
  timestamp: ResolverTypeWrapper<Scalars['timestamp']>;
  timestamp_comparison_exp: timestamp_comparison_exp;
  timestamptz: ResolverTypeWrapper<Scalars['timestamptz']>;
  timestamptz_comparison_exp: timestamptz_comparison_exp;
  Contest: ResolverTypeWrapper<Contest>;
  ContestClone: ResolverTypeWrapper<ContestClone>;
  ContestClone_bool_exp: ContestClone_bool_exp;
  ContestClone_order_by: ContestClone_order_by;
  ContestClone_select_column: ContestClone_select_column;
  ContestClone_stream_cursor_input: ContestClone_stream_cursor_input;
  ContestClone_stream_cursor_value_input: ContestClone_stream_cursor_value_input;
  ContestTemplate: ResolverTypeWrapper<ContestTemplate>;
  ContestTemplate_bool_exp: ContestTemplate_bool_exp;
  ContestTemplate_order_by: ContestTemplate_order_by;
  ContestTemplate_select_column: ContestTemplate_select_column;
  ContestTemplate_stream_cursor_input: ContestTemplate_stream_cursor_input;
  ContestTemplate_stream_cursor_value_input: ContestTemplate_stream_cursor_value_input;
  Contest_bool_exp: Contest_bool_exp;
  Contest_order_by: Contest_order_by;
  Contest_select_column: Contest_select_column;
  Contest_stream_cursor_input: Contest_stream_cursor_input;
  Contest_stream_cursor_value_input: Contest_stream_cursor_value_input;
  ERCPointParams: ResolverTypeWrapper<ERCPointParams>;
  ERCPointParams_bool_exp: ERCPointParams_bool_exp;
  ERCPointParams_order_by: ERCPointParams_order_by;
  ERCPointParams_select_column: ERCPointParams_select_column;
  ERCPointParams_stream_cursor_input: ERCPointParams_stream_cursor_input;
  ERCPointParams_stream_cursor_value_input: ERCPointParams_stream_cursor_value_input;
  EnvioTX: ResolverTypeWrapper<EnvioTX>;
  EnvioTX_bool_exp: EnvioTX_bool_exp;
  EnvioTX_order_by: EnvioTX_order_by;
  EnvioTX_select_column: EnvioTX_select_column;
  EnvioTX_stream_cursor_input: EnvioTX_stream_cursor_input;
  EnvioTX_stream_cursor_value_input: EnvioTX_stream_cursor_value_input;
  EventPost: ResolverTypeWrapper<EventPost>;
  EventPost_aggregate_order_by: EventPost_aggregate_order_by;
  EventPost_avg_order_by: EventPost_avg_order_by;
  EventPost_bool_exp: EventPost_bool_exp;
  EventPost_max_order_by: EventPost_max_order_by;
  EventPost_min_order_by: EventPost_min_order_by;
  EventPost_order_by: EventPost_order_by;
  EventPost_select_column: EventPost_select_column;
  EventPost_stddev_order_by: EventPost_stddev_order_by;
  EventPost_stddev_pop_order_by: EventPost_stddev_pop_order_by;
  EventPost_stddev_samp_order_by: EventPost_stddev_samp_order_by;
  EventPost_stream_cursor_input: EventPost_stream_cursor_input;
  EventPost_stream_cursor_value_input: EventPost_stream_cursor_value_input;
  EventPost_sum_order_by: EventPost_sum_order_by;
  EventPost_var_pop_order_by: EventPost_var_pop_order_by;
  EventPost_var_samp_order_by: EventPost_var_samp_order_by;
  EventPost_variance_order_by: EventPost_variance_order_by;
  FactoryEventsSummary: ResolverTypeWrapper<FactoryEventsSummary>;
  FactoryEventsSummary_bool_exp: FactoryEventsSummary_bool_exp;
  FactoryEventsSummary_order_by: FactoryEventsSummary_order_by;
  FactoryEventsSummary_select_column: FactoryEventsSummary_select_column;
  FactoryEventsSummary_stream_cursor_input: FactoryEventsSummary_stream_cursor_input;
  FactoryEventsSummary_stream_cursor_value_input: FactoryEventsSummary_stream_cursor_value_input;
  GSVoter: ResolverTypeWrapper<GSVoter>;
  GSVoter_bool_exp: GSVoter_bool_exp;
  GSVoter_order_by: GSVoter_order_by;
  GSVoter_select_column: GSVoter_select_column;
  GSVoter_stream_cursor_input: GSVoter_stream_cursor_input;
  GSVoter_stream_cursor_value_input: GSVoter_stream_cursor_value_input;
  GrantShipsVoting: ResolverTypeWrapper<GrantShipsVoting>;
  GrantShipsVoting_bool_exp: GrantShipsVoting_bool_exp;
  GrantShipsVoting_order_by: GrantShipsVoting_order_by;
  GrantShipsVoting_select_column: GrantShipsVoting_select_column;
  GrantShipsVoting_stream_cursor_input: GrantShipsVoting_stream_cursor_input;
  GrantShipsVoting_stream_cursor_value_input: GrantShipsVoting_stream_cursor_value_input;
  HALParams: ResolverTypeWrapper<HALParams>;
  HALParams_bool_exp: HALParams_bool_exp;
  HALParams_order_by: HALParams_order_by;
  HALParams_select_column: HALParams_select_column;
  HALParams_stream_cursor_input: HALParams_stream_cursor_input;
  HALParams_stream_cursor_value_input: HALParams_stream_cursor_value_input;
  HatsPoster: ResolverTypeWrapper<HatsPoster>;
  HatsPoster_bool_exp: HatsPoster_bool_exp;
  HatsPoster_order_by: HatsPoster_order_by;
  HatsPoster_select_column: HatsPoster_select_column;
  HatsPoster_stream_cursor_input: HatsPoster_stream_cursor_input;
  HatsPoster_stream_cursor_value_input: HatsPoster_stream_cursor_value_input;
  LocalLog: ResolverTypeWrapper<LocalLog>;
  LocalLog_bool_exp: LocalLog_bool_exp;
  LocalLog_order_by: LocalLog_order_by;
  LocalLog_select_column: LocalLog_select_column;
  LocalLog_stream_cursor_input: LocalLog_stream_cursor_input;
  LocalLog_stream_cursor_value_input: LocalLog_stream_cursor_value_input;
  ModuleTemplate: ResolverTypeWrapper<ModuleTemplate>;
  ModuleTemplate_bool_exp: ModuleTemplate_bool_exp;
  ModuleTemplate_order_by: ModuleTemplate_order_by;
  ModuleTemplate_select_column: ModuleTemplate_select_column;
  ModuleTemplate_stream_cursor_input: ModuleTemplate_stream_cursor_input;
  ModuleTemplate_stream_cursor_value_input: ModuleTemplate_stream_cursor_value_input;
  Record: ResolverTypeWrapper<Record>;
  Record_aggregate_order_by: Record_aggregate_order_by;
  Record_avg_order_by: Record_avg_order_by;
  Record_bool_exp: Record_bool_exp;
  Record_max_order_by: Record_max_order_by;
  Record_min_order_by: Record_min_order_by;
  Record_order_by: Record_order_by;
  Record_select_column: Record_select_column;
  Record_stddev_order_by: Record_stddev_order_by;
  Record_stddev_pop_order_by: Record_stddev_pop_order_by;
  Record_stddev_samp_order_by: Record_stddev_samp_order_by;
  Record_stream_cursor_input: Record_stream_cursor_input;
  Record_stream_cursor_value_input: Record_stream_cursor_value_input;
  Record_sum_order_by: Record_sum_order_by;
  Record_var_pop_order_by: Record_var_pop_order_by;
  Record_var_samp_order_by: Record_var_samp_order_by;
  Record_variance_order_by: Record_variance_order_by;
  SBTBalParams: ResolverTypeWrapper<SBTBalParams>;
  SBTBalParams_bool_exp: SBTBalParams_bool_exp;
  SBTBalParams_order_by: SBTBalParams_order_by;
  SBTBalParams_select_column: SBTBalParams_select_column;
  SBTBalParams_stream_cursor_input: SBTBalParams_stream_cursor_input;
  SBTBalParams_stream_cursor_value_input: SBTBalParams_stream_cursor_value_input;
  ShipChoice: ResolverTypeWrapper<ShipChoice>;
  ShipChoice_aggregate_order_by: ShipChoice_aggregate_order_by;
  ShipChoice_avg_order_by: ShipChoice_avg_order_by;
  ShipChoice_bool_exp: ShipChoice_bool_exp;
  ShipChoice_max_order_by: ShipChoice_max_order_by;
  ShipChoice_min_order_by: ShipChoice_min_order_by;
  ShipChoice_order_by: ShipChoice_order_by;
  ShipChoice_select_column: ShipChoice_select_column;
  ShipChoice_stddev_order_by: ShipChoice_stddev_order_by;
  ShipChoice_stddev_pop_order_by: ShipChoice_stddev_pop_order_by;
  ShipChoice_stddev_samp_order_by: ShipChoice_stddev_samp_order_by;
  ShipChoice_stream_cursor_input: ShipChoice_stream_cursor_input;
  ShipChoice_stream_cursor_value_input: ShipChoice_stream_cursor_value_input;
  ShipChoice_sum_order_by: ShipChoice_sum_order_by;
  ShipChoice_var_pop_order_by: ShipChoice_var_pop_order_by;
  ShipChoice_var_samp_order_by: ShipChoice_var_samp_order_by;
  ShipChoice_variance_order_by: ShipChoice_variance_order_by;
  ShipVote: ResolverTypeWrapper<ShipVote>;
  ShipVote_aggregate_order_by: ShipVote_aggregate_order_by;
  ShipVote_avg_order_by: ShipVote_avg_order_by;
  ShipVote_bool_exp: ShipVote_bool_exp;
  ShipVote_max_order_by: ShipVote_max_order_by;
  ShipVote_min_order_by: ShipVote_min_order_by;
  ShipVote_order_by: ShipVote_order_by;
  ShipVote_select_column: ShipVote_select_column;
  ShipVote_stddev_order_by: ShipVote_stddev_order_by;
  ShipVote_stddev_pop_order_by: ShipVote_stddev_pop_order_by;
  ShipVote_stddev_samp_order_by: ShipVote_stddev_samp_order_by;
  ShipVote_stream_cursor_input: ShipVote_stream_cursor_input;
  ShipVote_stream_cursor_value_input: ShipVote_stream_cursor_value_input;
  ShipVote_sum_order_by: ShipVote_sum_order_by;
  ShipVote_var_pop_order_by: ShipVote_var_pop_order_by;
  ShipVote_var_samp_order_by: ShipVote_var_samp_order_by;
  ShipVote_variance_order_by: ShipVote_variance_order_by;
  StemModule: ResolverTypeWrapper<StemModule>;
  StemModule_bool_exp: StemModule_bool_exp;
  StemModule_order_by: StemModule_order_by;
  StemModule_select_column: StemModule_select_column;
  StemModule_stream_cursor_input: StemModule_stream_cursor_input;
  StemModule_stream_cursor_value_input: StemModule_stream_cursor_value_input;
  String_array_comparison_exp: String_array_comparison_exp;
  TVParams: ResolverTypeWrapper<TVParams>;
  TVParams_bool_exp: TVParams_bool_exp;
  TVParams_order_by: TVParams_order_by;
  TVParams_select_column: TVParams_select_column;
  TVParams_stream_cursor_input: TVParams_stream_cursor_input;
  TVParams_stream_cursor_value_input: TVParams_stream_cursor_value_input;
  numeric_array_comparison_exp: numeric_array_comparison_exp;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  Query: {};
  Subscription: {};
  Boolean: Scalars['Boolean'];
  Boolean_comparison_exp: Boolean_comparison_exp;
  GMInitParams: GMInitParams;
  GMInitParams_bool_exp: GMInitParams_bool_exp;
  GMInitParams_order_by: GMInitParams_order_by;
  GMInitParams_stream_cursor_input: GMInitParams_stream_cursor_input;
  GMInitParams_stream_cursor_value_input: GMInitParams_stream_cursor_value_input;
  GameManager: GameManager;
  GameManagerFactory: GameManagerFactory;
  GameManagerFactory_bool_exp: GameManagerFactory_bool_exp;
  GameManagerFactory_order_by: GameManagerFactory_order_by;
  GameManagerFactory_stream_cursor_input: GameManagerFactory_stream_cursor_input;
  GameManagerFactory_stream_cursor_value_input: GameManagerFactory_stream_cursor_value_input;
  GameManagerTemplate: GameManagerTemplate;
  GameManagerTemplate_bool_exp: GameManagerTemplate_bool_exp;
  GameManagerTemplate_order_by: GameManagerTemplate_order_by;
  GameManagerTemplate_stream_cursor_input: GameManagerTemplate_stream_cursor_input;
  GameManagerTemplate_stream_cursor_value_input: GameManagerTemplate_stream_cursor_value_input;
  GameManager_bool_exp: GameManager_bool_exp;
  GameManager_order_by: GameManager_order_by;
  GameManager_stream_cursor_input: GameManager_stream_cursor_input;
  GameManager_stream_cursor_value_input: GameManager_stream_cursor_value_input;
  GameRound: GameRound;
  GameRound_aggregate_order_by: GameRound_aggregate_order_by;
  GameRound_avg_order_by: GameRound_avg_order_by;
  GameRound_bool_exp: GameRound_bool_exp;
  GameRound_max_order_by: GameRound_max_order_by;
  GameRound_min_order_by: GameRound_min_order_by;
  GameRound_order_by: GameRound_order_by;
  GameRound_stddev_order_by: GameRound_stddev_order_by;
  GameRound_stddev_pop_order_by: GameRound_stddev_pop_order_by;
  GameRound_stddev_samp_order_by: GameRound_stddev_samp_order_by;
  GameRound_stream_cursor_input: GameRound_stream_cursor_input;
  GameRound_stream_cursor_value_input: GameRound_stream_cursor_value_input;
  GameRound_sum_order_by: GameRound_sum_order_by;
  GameRound_var_pop_order_by: GameRound_var_pop_order_by;
  GameRound_var_samp_order_by: GameRound_var_samp_order_by;
  GameRound_variance_order_by: GameRound_variance_order_by;
  Grant: Grant;
  GrantShip: GrantShip;
  GrantShip_aggregate_order_by: GrantShip_aggregate_order_by;
  GrantShip_avg_order_by: GrantShip_avg_order_by;
  GrantShip_bool_exp: GrantShip_bool_exp;
  GrantShip_max_order_by: GrantShip_max_order_by;
  GrantShip_min_order_by: GrantShip_min_order_by;
  GrantShip_order_by: GrantShip_order_by;
  GrantShip_stddev_order_by: GrantShip_stddev_order_by;
  GrantShip_stddev_pop_order_by: GrantShip_stddev_pop_order_by;
  GrantShip_stddev_samp_order_by: GrantShip_stddev_samp_order_by;
  GrantShip_stream_cursor_input: GrantShip_stream_cursor_input;
  GrantShip_stream_cursor_value_input: GrantShip_stream_cursor_value_input;
  GrantShip_sum_order_by: GrantShip_sum_order_by;
  GrantShip_var_pop_order_by: GrantShip_var_pop_order_by;
  GrantShip_var_samp_order_by: GrantShip_var_samp_order_by;
  GrantShip_variance_order_by: GrantShip_variance_order_by;
  Grant_aggregate_order_by: Grant_aggregate_order_by;
  Grant_bool_exp: Grant_bool_exp;
  Grant_max_order_by: Grant_max_order_by;
  Grant_min_order_by: Grant_min_order_by;
  Grant_order_by: Grant_order_by;
  Grant_stream_cursor_input: Grant_stream_cursor_input;
  Grant_stream_cursor_value_input: Grant_stream_cursor_value_input;
  Int: Scalars['Int'];
  Int_comparison_exp: Int_comparison_exp;
  ProfileIdToAnchor: ProfileIdToAnchor;
  ProfileIdToAnchor_bool_exp: ProfileIdToAnchor_bool_exp;
  ProfileIdToAnchor_order_by: ProfileIdToAnchor_order_by;
  ProfileIdToAnchor_stream_cursor_input: ProfileIdToAnchor_stream_cursor_input;
  ProfileIdToAnchor_stream_cursor_value_input: ProfileIdToAnchor_stream_cursor_value_input;
  ProfileMemberGroup: ProfileMemberGroup;
  ProfileMemberGroup_bool_exp: ProfileMemberGroup_bool_exp;
  ProfileMemberGroup_order_by: ProfileMemberGroup_order_by;
  ProfileMemberGroup_stream_cursor_input: ProfileMemberGroup_stream_cursor_input;
  ProfileMemberGroup_stream_cursor_value_input: ProfileMemberGroup_stream_cursor_value_input;
  Project: Project;
  Project_bool_exp: Project_bool_exp;
  Project_order_by: Project_order_by;
  Project_stream_cursor_input: Project_stream_cursor_input;
  Project_stream_cursor_value_input: Project_stream_cursor_value_input;
  RawMetadata: RawMetadata;
  RawMetadata_bool_exp: RawMetadata_bool_exp;
  RawMetadata_order_by: RawMetadata_order_by;
  RawMetadata_stream_cursor_input: RawMetadata_stream_cursor_input;
  RawMetadata_stream_cursor_value_input: RawMetadata_stream_cursor_value_input;
  String: Scalars['String'];
  String_comparison_exp: String_comparison_exp;
  Test: Test;
  Test_bool_exp: Test_bool_exp;
  Test_order_by: Test_order_by;
  Test_stream_cursor_input: Test_stream_cursor_input;
  Test_stream_cursor_value_input: Test_stream_cursor_value_input;
  _text: Scalars['_text'];
  _text_comparison_exp: _text_comparison_exp;
  chain_metadata: chain_metadata;
  chain_metadata_bool_exp: chain_metadata_bool_exp;
  chain_metadata_order_by: chain_metadata_order_by;
  chain_metadata_stream_cursor_input: chain_metadata_stream_cursor_input;
  chain_metadata_stream_cursor_value_input: chain_metadata_stream_cursor_value_input;
  contract_type: Scalars['contract_type'];
  contract_type_comparison_exp: contract_type_comparison_exp;
  dynamic_contract_registry: dynamic_contract_registry;
  dynamic_contract_registry_bool_exp: dynamic_contract_registry_bool_exp;
  dynamic_contract_registry_order_by: dynamic_contract_registry_order_by;
  dynamic_contract_registry_stream_cursor_input: dynamic_contract_registry_stream_cursor_input;
  dynamic_contract_registry_stream_cursor_value_input: dynamic_contract_registry_stream_cursor_value_input;
  entity_history: entity_history;
  entity_history_aggregate_order_by: entity_history_aggregate_order_by;
  entity_history_avg_order_by: entity_history_avg_order_by;
  entity_history_bool_exp: entity_history_bool_exp;
  entity_history_filter: entity_history_filter;
  entity_history_filter_bool_exp: entity_history_filter_bool_exp;
  entity_history_filter_order_by: entity_history_filter_order_by;
  entity_history_filter_stream_cursor_input: entity_history_filter_stream_cursor_input;
  entity_history_filter_stream_cursor_value_input: entity_history_filter_stream_cursor_value_input;
  entity_history_max_order_by: entity_history_max_order_by;
  entity_history_min_order_by: entity_history_min_order_by;
  entity_history_order_by: entity_history_order_by;
  entity_history_stddev_order_by: entity_history_stddev_order_by;
  entity_history_stddev_pop_order_by: entity_history_stddev_pop_order_by;
  entity_history_stddev_samp_order_by: entity_history_stddev_samp_order_by;
  entity_history_stream_cursor_input: entity_history_stream_cursor_input;
  entity_history_stream_cursor_value_input: entity_history_stream_cursor_value_input;
  entity_history_sum_order_by: entity_history_sum_order_by;
  entity_history_var_pop_order_by: entity_history_var_pop_order_by;
  entity_history_var_samp_order_by: entity_history_var_samp_order_by;
  entity_history_variance_order_by: entity_history_variance_order_by;
  entity_type: Scalars['entity_type'];
  entity_type_comparison_exp: entity_type_comparison_exp;
  event_sync_state: event_sync_state;
  event_sync_state_bool_exp: event_sync_state_bool_exp;
  event_sync_state_order_by: event_sync_state_order_by;
  event_sync_state_stream_cursor_input: event_sync_state_stream_cursor_input;
  event_sync_state_stream_cursor_value_input: event_sync_state_stream_cursor_value_input;
  event_type: Scalars['event_type'];
  event_type_comparison_exp: event_type_comparison_exp;
  get_entity_history_filter_args: get_entity_history_filter_args;
  json: Scalars['json'];
  json_comparison_exp: json_comparison_exp;
  numeric: Scalars['numeric'];
  numeric_comparison_exp: numeric_comparison_exp;
  persisted_state: persisted_state;
  persisted_state_bool_exp: persisted_state_bool_exp;
  persisted_state_order_by: persisted_state_order_by;
  persisted_state_stream_cursor_input: persisted_state_stream_cursor_input;
  persisted_state_stream_cursor_value_input: persisted_state_stream_cursor_value_input;
  raw_events: raw_events;
  raw_events_bool_exp: raw_events_bool_exp;
  raw_events_order_by: raw_events_order_by;
  raw_events_stream_cursor_input: raw_events_stream_cursor_input;
  raw_events_stream_cursor_value_input: raw_events_stream_cursor_value_input;
  timestamp: Scalars['timestamp'];
  timestamp_comparison_exp: timestamp_comparison_exp;
  timestamptz: Scalars['timestamptz'];
  timestamptz_comparison_exp: timestamptz_comparison_exp;
  Contest: Contest;
  ContestClone: ContestClone;
  ContestClone_bool_exp: ContestClone_bool_exp;
  ContestClone_order_by: ContestClone_order_by;
  ContestClone_stream_cursor_input: ContestClone_stream_cursor_input;
  ContestClone_stream_cursor_value_input: ContestClone_stream_cursor_value_input;
  ContestTemplate: ContestTemplate;
  ContestTemplate_bool_exp: ContestTemplate_bool_exp;
  ContestTemplate_order_by: ContestTemplate_order_by;
  ContestTemplate_stream_cursor_input: ContestTemplate_stream_cursor_input;
  ContestTemplate_stream_cursor_value_input: ContestTemplate_stream_cursor_value_input;
  Contest_bool_exp: Contest_bool_exp;
  Contest_order_by: Contest_order_by;
  Contest_stream_cursor_input: Contest_stream_cursor_input;
  Contest_stream_cursor_value_input: Contest_stream_cursor_value_input;
  ERCPointParams: ERCPointParams;
  ERCPointParams_bool_exp: ERCPointParams_bool_exp;
  ERCPointParams_order_by: ERCPointParams_order_by;
  ERCPointParams_stream_cursor_input: ERCPointParams_stream_cursor_input;
  ERCPointParams_stream_cursor_value_input: ERCPointParams_stream_cursor_value_input;
  EnvioTX: EnvioTX;
  EnvioTX_bool_exp: EnvioTX_bool_exp;
  EnvioTX_order_by: EnvioTX_order_by;
  EnvioTX_stream_cursor_input: EnvioTX_stream_cursor_input;
  EnvioTX_stream_cursor_value_input: EnvioTX_stream_cursor_value_input;
  EventPost: EventPost;
  EventPost_aggregate_order_by: EventPost_aggregate_order_by;
  EventPost_avg_order_by: EventPost_avg_order_by;
  EventPost_bool_exp: EventPost_bool_exp;
  EventPost_max_order_by: EventPost_max_order_by;
  EventPost_min_order_by: EventPost_min_order_by;
  EventPost_order_by: EventPost_order_by;
  EventPost_stddev_order_by: EventPost_stddev_order_by;
  EventPost_stddev_pop_order_by: EventPost_stddev_pop_order_by;
  EventPost_stddev_samp_order_by: EventPost_stddev_samp_order_by;
  EventPost_stream_cursor_input: EventPost_stream_cursor_input;
  EventPost_stream_cursor_value_input: EventPost_stream_cursor_value_input;
  EventPost_sum_order_by: EventPost_sum_order_by;
  EventPost_var_pop_order_by: EventPost_var_pop_order_by;
  EventPost_var_samp_order_by: EventPost_var_samp_order_by;
  EventPost_variance_order_by: EventPost_variance_order_by;
  FactoryEventsSummary: FactoryEventsSummary;
  FactoryEventsSummary_bool_exp: FactoryEventsSummary_bool_exp;
  FactoryEventsSummary_order_by: FactoryEventsSummary_order_by;
  FactoryEventsSummary_stream_cursor_input: FactoryEventsSummary_stream_cursor_input;
  FactoryEventsSummary_stream_cursor_value_input: FactoryEventsSummary_stream_cursor_value_input;
  GSVoter: GSVoter;
  GSVoter_bool_exp: GSVoter_bool_exp;
  GSVoter_order_by: GSVoter_order_by;
  GSVoter_stream_cursor_input: GSVoter_stream_cursor_input;
  GSVoter_stream_cursor_value_input: GSVoter_stream_cursor_value_input;
  GrantShipsVoting: GrantShipsVoting;
  GrantShipsVoting_bool_exp: GrantShipsVoting_bool_exp;
  GrantShipsVoting_order_by: GrantShipsVoting_order_by;
  GrantShipsVoting_stream_cursor_input: GrantShipsVoting_stream_cursor_input;
  GrantShipsVoting_stream_cursor_value_input: GrantShipsVoting_stream_cursor_value_input;
  HALParams: HALParams;
  HALParams_bool_exp: HALParams_bool_exp;
  HALParams_order_by: HALParams_order_by;
  HALParams_stream_cursor_input: HALParams_stream_cursor_input;
  HALParams_stream_cursor_value_input: HALParams_stream_cursor_value_input;
  HatsPoster: HatsPoster;
  HatsPoster_bool_exp: HatsPoster_bool_exp;
  HatsPoster_order_by: HatsPoster_order_by;
  HatsPoster_stream_cursor_input: HatsPoster_stream_cursor_input;
  HatsPoster_stream_cursor_value_input: HatsPoster_stream_cursor_value_input;
  LocalLog: LocalLog;
  LocalLog_bool_exp: LocalLog_bool_exp;
  LocalLog_order_by: LocalLog_order_by;
  LocalLog_stream_cursor_input: LocalLog_stream_cursor_input;
  LocalLog_stream_cursor_value_input: LocalLog_stream_cursor_value_input;
  ModuleTemplate: ModuleTemplate;
  ModuleTemplate_bool_exp: ModuleTemplate_bool_exp;
  ModuleTemplate_order_by: ModuleTemplate_order_by;
  ModuleTemplate_stream_cursor_input: ModuleTemplate_stream_cursor_input;
  ModuleTemplate_stream_cursor_value_input: ModuleTemplate_stream_cursor_value_input;
  Record: Record;
  Record_aggregate_order_by: Record_aggregate_order_by;
  Record_avg_order_by: Record_avg_order_by;
  Record_bool_exp: Record_bool_exp;
  Record_max_order_by: Record_max_order_by;
  Record_min_order_by: Record_min_order_by;
  Record_order_by: Record_order_by;
  Record_stddev_order_by: Record_stddev_order_by;
  Record_stddev_pop_order_by: Record_stddev_pop_order_by;
  Record_stddev_samp_order_by: Record_stddev_samp_order_by;
  Record_stream_cursor_input: Record_stream_cursor_input;
  Record_stream_cursor_value_input: Record_stream_cursor_value_input;
  Record_sum_order_by: Record_sum_order_by;
  Record_var_pop_order_by: Record_var_pop_order_by;
  Record_var_samp_order_by: Record_var_samp_order_by;
  Record_variance_order_by: Record_variance_order_by;
  SBTBalParams: SBTBalParams;
  SBTBalParams_bool_exp: SBTBalParams_bool_exp;
  SBTBalParams_order_by: SBTBalParams_order_by;
  SBTBalParams_stream_cursor_input: SBTBalParams_stream_cursor_input;
  SBTBalParams_stream_cursor_value_input: SBTBalParams_stream_cursor_value_input;
  ShipChoice: ShipChoice;
  ShipChoice_aggregate_order_by: ShipChoice_aggregate_order_by;
  ShipChoice_avg_order_by: ShipChoice_avg_order_by;
  ShipChoice_bool_exp: ShipChoice_bool_exp;
  ShipChoice_max_order_by: ShipChoice_max_order_by;
  ShipChoice_min_order_by: ShipChoice_min_order_by;
  ShipChoice_order_by: ShipChoice_order_by;
  ShipChoice_stddev_order_by: ShipChoice_stddev_order_by;
  ShipChoice_stddev_pop_order_by: ShipChoice_stddev_pop_order_by;
  ShipChoice_stddev_samp_order_by: ShipChoice_stddev_samp_order_by;
  ShipChoice_stream_cursor_input: ShipChoice_stream_cursor_input;
  ShipChoice_stream_cursor_value_input: ShipChoice_stream_cursor_value_input;
  ShipChoice_sum_order_by: ShipChoice_sum_order_by;
  ShipChoice_var_pop_order_by: ShipChoice_var_pop_order_by;
  ShipChoice_var_samp_order_by: ShipChoice_var_samp_order_by;
  ShipChoice_variance_order_by: ShipChoice_variance_order_by;
  ShipVote: ShipVote;
  ShipVote_aggregate_order_by: ShipVote_aggregate_order_by;
  ShipVote_avg_order_by: ShipVote_avg_order_by;
  ShipVote_bool_exp: ShipVote_bool_exp;
  ShipVote_max_order_by: ShipVote_max_order_by;
  ShipVote_min_order_by: ShipVote_min_order_by;
  ShipVote_order_by: ShipVote_order_by;
  ShipVote_stddev_order_by: ShipVote_stddev_order_by;
  ShipVote_stddev_pop_order_by: ShipVote_stddev_pop_order_by;
  ShipVote_stddev_samp_order_by: ShipVote_stddev_samp_order_by;
  ShipVote_stream_cursor_input: ShipVote_stream_cursor_input;
  ShipVote_stream_cursor_value_input: ShipVote_stream_cursor_value_input;
  ShipVote_sum_order_by: ShipVote_sum_order_by;
  ShipVote_var_pop_order_by: ShipVote_var_pop_order_by;
  ShipVote_var_samp_order_by: ShipVote_var_samp_order_by;
  ShipVote_variance_order_by: ShipVote_variance_order_by;
  StemModule: StemModule;
  StemModule_bool_exp: StemModule_bool_exp;
  StemModule_order_by: StemModule_order_by;
  StemModule_stream_cursor_input: StemModule_stream_cursor_input;
  StemModule_stream_cursor_value_input: StemModule_stream_cursor_value_input;
  String_array_comparison_exp: String_array_comparison_exp;
  TVParams: TVParams;
  TVParams_bool_exp: TVParams_bool_exp;
  TVParams_order_by: TVParams_order_by;
  TVParams_stream_cursor_input: TVParams_stream_cursor_input;
  TVParams_stream_cursor_value_input: TVParams_stream_cursor_value_input;
  numeric_array_comparison_exp: numeric_array_comparison_exp;
}>;

export type cachedDirectiveArgs = {
  ttl?: Scalars['Int'];
  refresh?: Scalars['Boolean'];
};

export type cachedDirectiveResolver<Result, Parent, ContextType = MeshContext, Args = cachedDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type QueryResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  GMInitParams?: Resolver<Array<ResolversTypes['GMInitParams']>, ParentType, ContextType, Partial<QueryGMInitParamsArgs>>;
  GMInitParams_by_pk?: Resolver<Maybe<ResolversTypes['GMInitParams']>, ParentType, ContextType, RequireFields<QueryGMInitParams_by_pkArgs, 'id'>>;
  GameManager?: Resolver<Array<ResolversTypes['GameManager']>, ParentType, ContextType, Partial<QueryGameManagerArgs>>;
  GameManagerFactory?: Resolver<Array<ResolversTypes['GameManagerFactory']>, ParentType, ContextType, Partial<QueryGameManagerFactoryArgs>>;
  GameManagerFactory_by_pk?: Resolver<Maybe<ResolversTypes['GameManagerFactory']>, ParentType, ContextType, RequireFields<QueryGameManagerFactory_by_pkArgs, 'id'>>;
  GameManagerTemplate?: Resolver<Array<ResolversTypes['GameManagerTemplate']>, ParentType, ContextType, Partial<QueryGameManagerTemplateArgs>>;
  GameManagerTemplate_by_pk?: Resolver<Maybe<ResolversTypes['GameManagerTemplate']>, ParentType, ContextType, RequireFields<QueryGameManagerTemplate_by_pkArgs, 'id'>>;
  GameManager_by_pk?: Resolver<Maybe<ResolversTypes['GameManager']>, ParentType, ContextType, RequireFields<QueryGameManager_by_pkArgs, 'id'>>;
  GameRound?: Resolver<Array<ResolversTypes['GameRound']>, ParentType, ContextType, Partial<QueryGameRoundArgs>>;
  GameRound_by_pk?: Resolver<Maybe<ResolversTypes['GameRound']>, ParentType, ContextType, RequireFields<QueryGameRound_by_pkArgs, 'id'>>;
  Grant?: Resolver<Array<ResolversTypes['Grant']>, ParentType, ContextType, Partial<QueryGrantArgs>>;
  GrantShip?: Resolver<Array<ResolversTypes['GrantShip']>, ParentType, ContextType, Partial<QueryGrantShipArgs>>;
  GrantShip_by_pk?: Resolver<Maybe<ResolversTypes['GrantShip']>, ParentType, ContextType, RequireFields<QueryGrantShip_by_pkArgs, 'id'>>;
  Grant_by_pk?: Resolver<Maybe<ResolversTypes['Grant']>, ParentType, ContextType, RequireFields<QueryGrant_by_pkArgs, 'id'>>;
  ProfileIdToAnchor?: Resolver<Array<ResolversTypes['ProfileIdToAnchor']>, ParentType, ContextType, Partial<QueryProfileIdToAnchorArgs>>;
  ProfileIdToAnchor_by_pk?: Resolver<Maybe<ResolversTypes['ProfileIdToAnchor']>, ParentType, ContextType, RequireFields<QueryProfileIdToAnchor_by_pkArgs, 'id'>>;
  ProfileMemberGroup?: Resolver<Array<ResolversTypes['ProfileMemberGroup']>, ParentType, ContextType, Partial<QueryProfileMemberGroupArgs>>;
  ProfileMemberGroup_by_pk?: Resolver<Maybe<ResolversTypes['ProfileMemberGroup']>, ParentType, ContextType, RequireFields<QueryProfileMemberGroup_by_pkArgs, 'id'>>;
  Project?: Resolver<Array<ResolversTypes['Project']>, ParentType, ContextType, Partial<QueryProjectArgs>>;
  Project_by_pk?: Resolver<Maybe<ResolversTypes['Project']>, ParentType, ContextType, RequireFields<QueryProject_by_pkArgs, 'id'>>;
  RawMetadata?: Resolver<Array<ResolversTypes['RawMetadata']>, ParentType, ContextType, Partial<QueryRawMetadataArgs>>;
  RawMetadata_by_pk?: Resolver<Maybe<ResolversTypes['RawMetadata']>, ParentType, ContextType, RequireFields<QueryRawMetadata_by_pkArgs, 'id'>>;
  Test?: Resolver<Array<ResolversTypes['Test']>, ParentType, ContextType, Partial<QueryTestArgs>>;
  Test_by_pk?: Resolver<Maybe<ResolversTypes['Test']>, ParentType, ContextType, RequireFields<QueryTest_by_pkArgs, 'id'>>;
  chain_metadata?: Resolver<Array<ResolversTypes['chain_metadata']>, ParentType, ContextType, Partial<Querychain_metadataArgs>>;
  chain_metadata_by_pk?: Resolver<Maybe<ResolversTypes['chain_metadata']>, ParentType, ContextType, RequireFields<Querychain_metadata_by_pkArgs, 'chain_id'>>;
  dynamic_contract_registry?: Resolver<Array<ResolversTypes['dynamic_contract_registry']>, ParentType, ContextType, Partial<Querydynamic_contract_registryArgs>>;
  dynamic_contract_registry_by_pk?: Resolver<Maybe<ResolversTypes['dynamic_contract_registry']>, ParentType, ContextType, RequireFields<Querydynamic_contract_registry_by_pkArgs, 'chain_id' | 'contract_address'>>;
  entity_history?: Resolver<Array<ResolversTypes['entity_history']>, ParentType, ContextType, Partial<Queryentity_historyArgs>>;
  entity_history_by_pk?: Resolver<Maybe<ResolversTypes['entity_history']>, ParentType, ContextType, RequireFields<Queryentity_history_by_pkArgs, 'block_number' | 'block_timestamp' | 'chain_id' | 'entity_id' | 'entity_type' | 'log_index'>>;
  entity_history_filter?: Resolver<Array<ResolversTypes['entity_history_filter']>, ParentType, ContextType, Partial<Queryentity_history_filterArgs>>;
  entity_history_filter_by_pk?: Resolver<Maybe<ResolversTypes['entity_history_filter']>, ParentType, ContextType, RequireFields<Queryentity_history_filter_by_pkArgs, 'block_number' | 'chain_id' | 'entity_id' | 'log_index' | 'previous_block_number' | 'previous_log_index'>>;
  event_sync_state?: Resolver<Array<ResolversTypes['event_sync_state']>, ParentType, ContextType, Partial<Queryevent_sync_stateArgs>>;
  event_sync_state_by_pk?: Resolver<Maybe<ResolversTypes['event_sync_state']>, ParentType, ContextType, RequireFields<Queryevent_sync_state_by_pkArgs, 'chain_id'>>;
  get_entity_history_filter?: Resolver<Array<ResolversTypes['entity_history_filter']>, ParentType, ContextType, RequireFields<Queryget_entity_history_filterArgs, 'args'>>;
  persisted_state?: Resolver<Array<ResolversTypes['persisted_state']>, ParentType, ContextType, Partial<Querypersisted_stateArgs>>;
  persisted_state_by_pk?: Resolver<Maybe<ResolversTypes['persisted_state']>, ParentType, ContextType, RequireFields<Querypersisted_state_by_pkArgs, 'id'>>;
  raw_events?: Resolver<Array<ResolversTypes['raw_events']>, ParentType, ContextType, Partial<Queryraw_eventsArgs>>;
  raw_events_by_pk?: Resolver<Maybe<ResolversTypes['raw_events']>, ParentType, ContextType, RequireFields<Queryraw_events_by_pkArgs, 'chain_id' | 'event_id'>>;
  Contest?: Resolver<Array<ResolversTypes['Contest']>, ParentType, ContextType, Partial<QueryContestArgs>>;
  ContestClone?: Resolver<Array<ResolversTypes['ContestClone']>, ParentType, ContextType, Partial<QueryContestCloneArgs>>;
  ContestClone_by_pk?: Resolver<Maybe<ResolversTypes['ContestClone']>, ParentType, ContextType, RequireFields<QueryContestClone_by_pkArgs, 'id'>>;
  ContestTemplate?: Resolver<Array<ResolversTypes['ContestTemplate']>, ParentType, ContextType, Partial<QueryContestTemplateArgs>>;
  ContestTemplate_by_pk?: Resolver<Maybe<ResolversTypes['ContestTemplate']>, ParentType, ContextType, RequireFields<QueryContestTemplate_by_pkArgs, 'id'>>;
  Contest_by_pk?: Resolver<Maybe<ResolversTypes['Contest']>, ParentType, ContextType, RequireFields<QueryContest_by_pkArgs, 'id'>>;
  ERCPointParams?: Resolver<Array<ResolversTypes['ERCPointParams']>, ParentType, ContextType, Partial<QueryERCPointParamsArgs>>;
  ERCPointParams_by_pk?: Resolver<Maybe<ResolversTypes['ERCPointParams']>, ParentType, ContextType, RequireFields<QueryERCPointParams_by_pkArgs, 'id'>>;
  EnvioTX?: Resolver<Array<ResolversTypes['EnvioTX']>, ParentType, ContextType, Partial<QueryEnvioTXArgs>>;
  EnvioTX_by_pk?: Resolver<Maybe<ResolversTypes['EnvioTX']>, ParentType, ContextType, RequireFields<QueryEnvioTX_by_pkArgs, 'id'>>;
  EventPost?: Resolver<Array<ResolversTypes['EventPost']>, ParentType, ContextType, Partial<QueryEventPostArgs>>;
  EventPost_by_pk?: Resolver<Maybe<ResolversTypes['EventPost']>, ParentType, ContextType, RequireFields<QueryEventPost_by_pkArgs, 'id'>>;
  FactoryEventsSummary?: Resolver<Array<ResolversTypes['FactoryEventsSummary']>, ParentType, ContextType, Partial<QueryFactoryEventsSummaryArgs>>;
  FactoryEventsSummary_by_pk?: Resolver<Maybe<ResolversTypes['FactoryEventsSummary']>, ParentType, ContextType, RequireFields<QueryFactoryEventsSummary_by_pkArgs, 'id'>>;
  GSVoter?: Resolver<Array<ResolversTypes['GSVoter']>, ParentType, ContextType, Partial<QueryGSVoterArgs>>;
  GSVoter_by_pk?: Resolver<Maybe<ResolversTypes['GSVoter']>, ParentType, ContextType, RequireFields<QueryGSVoter_by_pkArgs, 'id'>>;
  GrantShipsVoting?: Resolver<Array<ResolversTypes['GrantShipsVoting']>, ParentType, ContextType, Partial<QueryGrantShipsVotingArgs>>;
  GrantShipsVoting_by_pk?: Resolver<Maybe<ResolversTypes['GrantShipsVoting']>, ParentType, ContextType, RequireFields<QueryGrantShipsVoting_by_pkArgs, 'id'>>;
  HALParams?: Resolver<Array<ResolversTypes['HALParams']>, ParentType, ContextType, Partial<QueryHALParamsArgs>>;
  HALParams_by_pk?: Resolver<Maybe<ResolversTypes['HALParams']>, ParentType, ContextType, RequireFields<QueryHALParams_by_pkArgs, 'id'>>;
  HatsPoster?: Resolver<Array<ResolversTypes['HatsPoster']>, ParentType, ContextType, Partial<QueryHatsPosterArgs>>;
  HatsPoster_by_pk?: Resolver<Maybe<ResolversTypes['HatsPoster']>, ParentType, ContextType, RequireFields<QueryHatsPoster_by_pkArgs, 'id'>>;
  LocalLog?: Resolver<Array<ResolversTypes['LocalLog']>, ParentType, ContextType, Partial<QueryLocalLogArgs>>;
  LocalLog_by_pk?: Resolver<Maybe<ResolversTypes['LocalLog']>, ParentType, ContextType, RequireFields<QueryLocalLog_by_pkArgs, 'id'>>;
  ModuleTemplate?: Resolver<Array<ResolversTypes['ModuleTemplate']>, ParentType, ContextType, Partial<QueryModuleTemplateArgs>>;
  ModuleTemplate_by_pk?: Resolver<Maybe<ResolversTypes['ModuleTemplate']>, ParentType, ContextType, RequireFields<QueryModuleTemplate_by_pkArgs, 'id'>>;
  Record?: Resolver<Array<ResolversTypes['Record']>, ParentType, ContextType, Partial<QueryRecordArgs>>;
  Record_by_pk?: Resolver<Maybe<ResolversTypes['Record']>, ParentType, ContextType, RequireFields<QueryRecord_by_pkArgs, 'id'>>;
  SBTBalParams?: Resolver<Array<ResolversTypes['SBTBalParams']>, ParentType, ContextType, Partial<QuerySBTBalParamsArgs>>;
  SBTBalParams_by_pk?: Resolver<Maybe<ResolversTypes['SBTBalParams']>, ParentType, ContextType, RequireFields<QuerySBTBalParams_by_pkArgs, 'id'>>;
  ShipChoice?: Resolver<Array<ResolversTypes['ShipChoice']>, ParentType, ContextType, Partial<QueryShipChoiceArgs>>;
  ShipChoice_by_pk?: Resolver<Maybe<ResolversTypes['ShipChoice']>, ParentType, ContextType, RequireFields<QueryShipChoice_by_pkArgs, 'id'>>;
  ShipVote?: Resolver<Array<ResolversTypes['ShipVote']>, ParentType, ContextType, Partial<QueryShipVoteArgs>>;
  ShipVote_by_pk?: Resolver<Maybe<ResolversTypes['ShipVote']>, ParentType, ContextType, RequireFields<QueryShipVote_by_pkArgs, 'id'>>;
  StemModule?: Resolver<Array<ResolversTypes['StemModule']>, ParentType, ContextType, Partial<QueryStemModuleArgs>>;
  StemModule_by_pk?: Resolver<Maybe<ResolversTypes['StemModule']>, ParentType, ContextType, RequireFields<QueryStemModule_by_pkArgs, 'id'>>;
  TVParams?: Resolver<Array<ResolversTypes['TVParams']>, ParentType, ContextType, Partial<QueryTVParamsArgs>>;
  TVParams_by_pk?: Resolver<Maybe<ResolversTypes['TVParams']>, ParentType, ContextType, RequireFields<QueryTVParams_by_pkArgs, 'id'>>;
}>;

export type SubscriptionResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['Subscription'] = ResolversParentTypes['Subscription']> = ResolversObject<{
  GMInitParams?: SubscriptionResolver<Array<ResolversTypes['GMInitParams']>, "GMInitParams", ParentType, ContextType, Partial<SubscriptionGMInitParamsArgs>>;
  GMInitParams_by_pk?: SubscriptionResolver<Maybe<ResolversTypes['GMInitParams']>, "GMInitParams_by_pk", ParentType, ContextType, RequireFields<SubscriptionGMInitParams_by_pkArgs, 'id'>>;
  GMInitParams_stream?: SubscriptionResolver<Array<ResolversTypes['GMInitParams']>, "GMInitParams_stream", ParentType, ContextType, RequireFields<SubscriptionGMInitParams_streamArgs, 'batch_size' | 'cursor'>>;
  GameManager?: SubscriptionResolver<Array<ResolversTypes['GameManager']>, "GameManager", ParentType, ContextType, Partial<SubscriptionGameManagerArgs>>;
  GameManagerFactory?: SubscriptionResolver<Array<ResolversTypes['GameManagerFactory']>, "GameManagerFactory", ParentType, ContextType, Partial<SubscriptionGameManagerFactoryArgs>>;
  GameManagerFactory_by_pk?: SubscriptionResolver<Maybe<ResolversTypes['GameManagerFactory']>, "GameManagerFactory_by_pk", ParentType, ContextType, RequireFields<SubscriptionGameManagerFactory_by_pkArgs, 'id'>>;
  GameManagerFactory_stream?: SubscriptionResolver<Array<ResolversTypes['GameManagerFactory']>, "GameManagerFactory_stream", ParentType, ContextType, RequireFields<SubscriptionGameManagerFactory_streamArgs, 'batch_size' | 'cursor'>>;
  GameManagerTemplate?: SubscriptionResolver<Array<ResolversTypes['GameManagerTemplate']>, "GameManagerTemplate", ParentType, ContextType, Partial<SubscriptionGameManagerTemplateArgs>>;
  GameManagerTemplate_by_pk?: SubscriptionResolver<Maybe<ResolversTypes['GameManagerTemplate']>, "GameManagerTemplate_by_pk", ParentType, ContextType, RequireFields<SubscriptionGameManagerTemplate_by_pkArgs, 'id'>>;
  GameManagerTemplate_stream?: SubscriptionResolver<Array<ResolversTypes['GameManagerTemplate']>, "GameManagerTemplate_stream", ParentType, ContextType, RequireFields<SubscriptionGameManagerTemplate_streamArgs, 'batch_size' | 'cursor'>>;
  GameManager_by_pk?: SubscriptionResolver<Maybe<ResolversTypes['GameManager']>, "GameManager_by_pk", ParentType, ContextType, RequireFields<SubscriptionGameManager_by_pkArgs, 'id'>>;
  GameManager_stream?: SubscriptionResolver<Array<ResolversTypes['GameManager']>, "GameManager_stream", ParentType, ContextType, RequireFields<SubscriptionGameManager_streamArgs, 'batch_size' | 'cursor'>>;
  GameRound?: SubscriptionResolver<Array<ResolversTypes['GameRound']>, "GameRound", ParentType, ContextType, Partial<SubscriptionGameRoundArgs>>;
  GameRound_by_pk?: SubscriptionResolver<Maybe<ResolversTypes['GameRound']>, "GameRound_by_pk", ParentType, ContextType, RequireFields<SubscriptionGameRound_by_pkArgs, 'id'>>;
  GameRound_stream?: SubscriptionResolver<Array<ResolversTypes['GameRound']>, "GameRound_stream", ParentType, ContextType, RequireFields<SubscriptionGameRound_streamArgs, 'batch_size' | 'cursor'>>;
  Grant?: SubscriptionResolver<Array<ResolversTypes['Grant']>, "Grant", ParentType, ContextType, Partial<SubscriptionGrantArgs>>;
  GrantShip?: SubscriptionResolver<Array<ResolversTypes['GrantShip']>, "GrantShip", ParentType, ContextType, Partial<SubscriptionGrantShipArgs>>;
  GrantShip_by_pk?: SubscriptionResolver<Maybe<ResolversTypes['GrantShip']>, "GrantShip_by_pk", ParentType, ContextType, RequireFields<SubscriptionGrantShip_by_pkArgs, 'id'>>;
  GrantShip_stream?: SubscriptionResolver<Array<ResolversTypes['GrantShip']>, "GrantShip_stream", ParentType, ContextType, RequireFields<SubscriptionGrantShip_streamArgs, 'batch_size' | 'cursor'>>;
  Grant_by_pk?: SubscriptionResolver<Maybe<ResolversTypes['Grant']>, "Grant_by_pk", ParentType, ContextType, RequireFields<SubscriptionGrant_by_pkArgs, 'id'>>;
  Grant_stream?: SubscriptionResolver<Array<ResolversTypes['Grant']>, "Grant_stream", ParentType, ContextType, RequireFields<SubscriptionGrant_streamArgs, 'batch_size' | 'cursor'>>;
  ProfileIdToAnchor?: SubscriptionResolver<Array<ResolversTypes['ProfileIdToAnchor']>, "ProfileIdToAnchor", ParentType, ContextType, Partial<SubscriptionProfileIdToAnchorArgs>>;
  ProfileIdToAnchor_by_pk?: SubscriptionResolver<Maybe<ResolversTypes['ProfileIdToAnchor']>, "ProfileIdToAnchor_by_pk", ParentType, ContextType, RequireFields<SubscriptionProfileIdToAnchor_by_pkArgs, 'id'>>;
  ProfileIdToAnchor_stream?: SubscriptionResolver<Array<ResolversTypes['ProfileIdToAnchor']>, "ProfileIdToAnchor_stream", ParentType, ContextType, RequireFields<SubscriptionProfileIdToAnchor_streamArgs, 'batch_size' | 'cursor'>>;
  ProfileMemberGroup?: SubscriptionResolver<Array<ResolversTypes['ProfileMemberGroup']>, "ProfileMemberGroup", ParentType, ContextType, Partial<SubscriptionProfileMemberGroupArgs>>;
  ProfileMemberGroup_by_pk?: SubscriptionResolver<Maybe<ResolversTypes['ProfileMemberGroup']>, "ProfileMemberGroup_by_pk", ParentType, ContextType, RequireFields<SubscriptionProfileMemberGroup_by_pkArgs, 'id'>>;
  ProfileMemberGroup_stream?: SubscriptionResolver<Array<ResolversTypes['ProfileMemberGroup']>, "ProfileMemberGroup_stream", ParentType, ContextType, RequireFields<SubscriptionProfileMemberGroup_streamArgs, 'batch_size' | 'cursor'>>;
  Project?: SubscriptionResolver<Array<ResolversTypes['Project']>, "Project", ParentType, ContextType, Partial<SubscriptionProjectArgs>>;
  Project_by_pk?: SubscriptionResolver<Maybe<ResolversTypes['Project']>, "Project_by_pk", ParentType, ContextType, RequireFields<SubscriptionProject_by_pkArgs, 'id'>>;
  Project_stream?: SubscriptionResolver<Array<ResolversTypes['Project']>, "Project_stream", ParentType, ContextType, RequireFields<SubscriptionProject_streamArgs, 'batch_size' | 'cursor'>>;
  RawMetadata?: SubscriptionResolver<Array<ResolversTypes['RawMetadata']>, "RawMetadata", ParentType, ContextType, Partial<SubscriptionRawMetadataArgs>>;
  RawMetadata_by_pk?: SubscriptionResolver<Maybe<ResolversTypes['RawMetadata']>, "RawMetadata_by_pk", ParentType, ContextType, RequireFields<SubscriptionRawMetadata_by_pkArgs, 'id'>>;
  RawMetadata_stream?: SubscriptionResolver<Array<ResolversTypes['RawMetadata']>, "RawMetadata_stream", ParentType, ContextType, RequireFields<SubscriptionRawMetadata_streamArgs, 'batch_size' | 'cursor'>>;
  Test?: SubscriptionResolver<Array<ResolversTypes['Test']>, "Test", ParentType, ContextType, Partial<SubscriptionTestArgs>>;
  Test_by_pk?: SubscriptionResolver<Maybe<ResolversTypes['Test']>, "Test_by_pk", ParentType, ContextType, RequireFields<SubscriptionTest_by_pkArgs, 'id'>>;
  Test_stream?: SubscriptionResolver<Array<ResolversTypes['Test']>, "Test_stream", ParentType, ContextType, RequireFields<SubscriptionTest_streamArgs, 'batch_size' | 'cursor'>>;
  chain_metadata?: SubscriptionResolver<Array<ResolversTypes['chain_metadata']>, "chain_metadata", ParentType, ContextType, Partial<Subscriptionchain_metadataArgs>>;
  chain_metadata_by_pk?: SubscriptionResolver<Maybe<ResolversTypes['chain_metadata']>, "chain_metadata_by_pk", ParentType, ContextType, RequireFields<Subscriptionchain_metadata_by_pkArgs, 'chain_id'>>;
  chain_metadata_stream?: SubscriptionResolver<Array<ResolversTypes['chain_metadata']>, "chain_metadata_stream", ParentType, ContextType, RequireFields<Subscriptionchain_metadata_streamArgs, 'batch_size' | 'cursor'>>;
  dynamic_contract_registry?: SubscriptionResolver<Array<ResolversTypes['dynamic_contract_registry']>, "dynamic_contract_registry", ParentType, ContextType, Partial<Subscriptiondynamic_contract_registryArgs>>;
  dynamic_contract_registry_by_pk?: SubscriptionResolver<Maybe<ResolversTypes['dynamic_contract_registry']>, "dynamic_contract_registry_by_pk", ParentType, ContextType, RequireFields<Subscriptiondynamic_contract_registry_by_pkArgs, 'chain_id' | 'contract_address'>>;
  dynamic_contract_registry_stream?: SubscriptionResolver<Array<ResolversTypes['dynamic_contract_registry']>, "dynamic_contract_registry_stream", ParentType, ContextType, RequireFields<Subscriptiondynamic_contract_registry_streamArgs, 'batch_size' | 'cursor'>>;
  entity_history?: SubscriptionResolver<Array<ResolversTypes['entity_history']>, "entity_history", ParentType, ContextType, Partial<Subscriptionentity_historyArgs>>;
  entity_history_by_pk?: SubscriptionResolver<Maybe<ResolversTypes['entity_history']>, "entity_history_by_pk", ParentType, ContextType, RequireFields<Subscriptionentity_history_by_pkArgs, 'block_number' | 'block_timestamp' | 'chain_id' | 'entity_id' | 'entity_type' | 'log_index'>>;
  entity_history_filter?: SubscriptionResolver<Array<ResolversTypes['entity_history_filter']>, "entity_history_filter", ParentType, ContextType, Partial<Subscriptionentity_history_filterArgs>>;
  entity_history_filter_by_pk?: SubscriptionResolver<Maybe<ResolversTypes['entity_history_filter']>, "entity_history_filter_by_pk", ParentType, ContextType, RequireFields<Subscriptionentity_history_filter_by_pkArgs, 'block_number' | 'chain_id' | 'entity_id' | 'log_index' | 'previous_block_number' | 'previous_log_index'>>;
  entity_history_filter_stream?: SubscriptionResolver<Array<ResolversTypes['entity_history_filter']>, "entity_history_filter_stream", ParentType, ContextType, RequireFields<Subscriptionentity_history_filter_streamArgs, 'batch_size' | 'cursor'>>;
  entity_history_stream?: SubscriptionResolver<Array<ResolversTypes['entity_history']>, "entity_history_stream", ParentType, ContextType, RequireFields<Subscriptionentity_history_streamArgs, 'batch_size' | 'cursor'>>;
  event_sync_state?: SubscriptionResolver<Array<ResolversTypes['event_sync_state']>, "event_sync_state", ParentType, ContextType, Partial<Subscriptionevent_sync_stateArgs>>;
  event_sync_state_by_pk?: SubscriptionResolver<Maybe<ResolversTypes['event_sync_state']>, "event_sync_state_by_pk", ParentType, ContextType, RequireFields<Subscriptionevent_sync_state_by_pkArgs, 'chain_id'>>;
  event_sync_state_stream?: SubscriptionResolver<Array<ResolversTypes['event_sync_state']>, "event_sync_state_stream", ParentType, ContextType, RequireFields<Subscriptionevent_sync_state_streamArgs, 'batch_size' | 'cursor'>>;
  get_entity_history_filter?: SubscriptionResolver<Array<ResolversTypes['entity_history_filter']>, "get_entity_history_filter", ParentType, ContextType, RequireFields<Subscriptionget_entity_history_filterArgs, 'args'>>;
  persisted_state?: SubscriptionResolver<Array<ResolversTypes['persisted_state']>, "persisted_state", ParentType, ContextType, Partial<Subscriptionpersisted_stateArgs>>;
  persisted_state_by_pk?: SubscriptionResolver<Maybe<ResolversTypes['persisted_state']>, "persisted_state_by_pk", ParentType, ContextType, RequireFields<Subscriptionpersisted_state_by_pkArgs, 'id'>>;
  persisted_state_stream?: SubscriptionResolver<Array<ResolversTypes['persisted_state']>, "persisted_state_stream", ParentType, ContextType, RequireFields<Subscriptionpersisted_state_streamArgs, 'batch_size' | 'cursor'>>;
  raw_events?: SubscriptionResolver<Array<ResolversTypes['raw_events']>, "raw_events", ParentType, ContextType, Partial<Subscriptionraw_eventsArgs>>;
  raw_events_by_pk?: SubscriptionResolver<Maybe<ResolversTypes['raw_events']>, "raw_events_by_pk", ParentType, ContextType, RequireFields<Subscriptionraw_events_by_pkArgs, 'chain_id' | 'event_id'>>;
  raw_events_stream?: SubscriptionResolver<Array<ResolversTypes['raw_events']>, "raw_events_stream", ParentType, ContextType, RequireFields<Subscriptionraw_events_streamArgs, 'batch_size' | 'cursor'>>;
  Contest?: SubscriptionResolver<Array<ResolversTypes['Contest']>, "Contest", ParentType, ContextType, Partial<SubscriptionContestArgs>>;
  ContestClone?: SubscriptionResolver<Array<ResolversTypes['ContestClone']>, "ContestClone", ParentType, ContextType, Partial<SubscriptionContestCloneArgs>>;
  ContestClone_by_pk?: SubscriptionResolver<Maybe<ResolversTypes['ContestClone']>, "ContestClone_by_pk", ParentType, ContextType, RequireFields<SubscriptionContestClone_by_pkArgs, 'id'>>;
  ContestClone_stream?: SubscriptionResolver<Array<ResolversTypes['ContestClone']>, "ContestClone_stream", ParentType, ContextType, RequireFields<SubscriptionContestClone_streamArgs, 'batch_size' | 'cursor'>>;
  ContestTemplate?: SubscriptionResolver<Array<ResolversTypes['ContestTemplate']>, "ContestTemplate", ParentType, ContextType, Partial<SubscriptionContestTemplateArgs>>;
  ContestTemplate_by_pk?: SubscriptionResolver<Maybe<ResolversTypes['ContestTemplate']>, "ContestTemplate_by_pk", ParentType, ContextType, RequireFields<SubscriptionContestTemplate_by_pkArgs, 'id'>>;
  ContestTemplate_stream?: SubscriptionResolver<Array<ResolversTypes['ContestTemplate']>, "ContestTemplate_stream", ParentType, ContextType, RequireFields<SubscriptionContestTemplate_streamArgs, 'batch_size' | 'cursor'>>;
  Contest_by_pk?: SubscriptionResolver<Maybe<ResolversTypes['Contest']>, "Contest_by_pk", ParentType, ContextType, RequireFields<SubscriptionContest_by_pkArgs, 'id'>>;
  Contest_stream?: SubscriptionResolver<Array<ResolversTypes['Contest']>, "Contest_stream", ParentType, ContextType, RequireFields<SubscriptionContest_streamArgs, 'batch_size' | 'cursor'>>;
  ERCPointParams?: SubscriptionResolver<Array<ResolversTypes['ERCPointParams']>, "ERCPointParams", ParentType, ContextType, Partial<SubscriptionERCPointParamsArgs>>;
  ERCPointParams_by_pk?: SubscriptionResolver<Maybe<ResolversTypes['ERCPointParams']>, "ERCPointParams_by_pk", ParentType, ContextType, RequireFields<SubscriptionERCPointParams_by_pkArgs, 'id'>>;
  ERCPointParams_stream?: SubscriptionResolver<Array<ResolversTypes['ERCPointParams']>, "ERCPointParams_stream", ParentType, ContextType, RequireFields<SubscriptionERCPointParams_streamArgs, 'batch_size' | 'cursor'>>;
  EnvioTX?: SubscriptionResolver<Array<ResolversTypes['EnvioTX']>, "EnvioTX", ParentType, ContextType, Partial<SubscriptionEnvioTXArgs>>;
  EnvioTX_by_pk?: SubscriptionResolver<Maybe<ResolversTypes['EnvioTX']>, "EnvioTX_by_pk", ParentType, ContextType, RequireFields<SubscriptionEnvioTX_by_pkArgs, 'id'>>;
  EnvioTX_stream?: SubscriptionResolver<Array<ResolversTypes['EnvioTX']>, "EnvioTX_stream", ParentType, ContextType, RequireFields<SubscriptionEnvioTX_streamArgs, 'batch_size' | 'cursor'>>;
  EventPost?: SubscriptionResolver<Array<ResolversTypes['EventPost']>, "EventPost", ParentType, ContextType, Partial<SubscriptionEventPostArgs>>;
  EventPost_by_pk?: SubscriptionResolver<Maybe<ResolversTypes['EventPost']>, "EventPost_by_pk", ParentType, ContextType, RequireFields<SubscriptionEventPost_by_pkArgs, 'id'>>;
  EventPost_stream?: SubscriptionResolver<Array<ResolversTypes['EventPost']>, "EventPost_stream", ParentType, ContextType, RequireFields<SubscriptionEventPost_streamArgs, 'batch_size' | 'cursor'>>;
  FactoryEventsSummary?: SubscriptionResolver<Array<ResolversTypes['FactoryEventsSummary']>, "FactoryEventsSummary", ParentType, ContextType, Partial<SubscriptionFactoryEventsSummaryArgs>>;
  FactoryEventsSummary_by_pk?: SubscriptionResolver<Maybe<ResolversTypes['FactoryEventsSummary']>, "FactoryEventsSummary_by_pk", ParentType, ContextType, RequireFields<SubscriptionFactoryEventsSummary_by_pkArgs, 'id'>>;
  FactoryEventsSummary_stream?: SubscriptionResolver<Array<ResolversTypes['FactoryEventsSummary']>, "FactoryEventsSummary_stream", ParentType, ContextType, RequireFields<SubscriptionFactoryEventsSummary_streamArgs, 'batch_size' | 'cursor'>>;
  GSVoter?: SubscriptionResolver<Array<ResolversTypes['GSVoter']>, "GSVoter", ParentType, ContextType, Partial<SubscriptionGSVoterArgs>>;
  GSVoter_by_pk?: SubscriptionResolver<Maybe<ResolversTypes['GSVoter']>, "GSVoter_by_pk", ParentType, ContextType, RequireFields<SubscriptionGSVoter_by_pkArgs, 'id'>>;
  GSVoter_stream?: SubscriptionResolver<Array<ResolversTypes['GSVoter']>, "GSVoter_stream", ParentType, ContextType, RequireFields<SubscriptionGSVoter_streamArgs, 'batch_size' | 'cursor'>>;
  GrantShipsVoting?: SubscriptionResolver<Array<ResolversTypes['GrantShipsVoting']>, "GrantShipsVoting", ParentType, ContextType, Partial<SubscriptionGrantShipsVotingArgs>>;
  GrantShipsVoting_by_pk?: SubscriptionResolver<Maybe<ResolversTypes['GrantShipsVoting']>, "GrantShipsVoting_by_pk", ParentType, ContextType, RequireFields<SubscriptionGrantShipsVoting_by_pkArgs, 'id'>>;
  GrantShipsVoting_stream?: SubscriptionResolver<Array<ResolversTypes['GrantShipsVoting']>, "GrantShipsVoting_stream", ParentType, ContextType, RequireFields<SubscriptionGrantShipsVoting_streamArgs, 'batch_size' | 'cursor'>>;
  HALParams?: SubscriptionResolver<Array<ResolversTypes['HALParams']>, "HALParams", ParentType, ContextType, Partial<SubscriptionHALParamsArgs>>;
  HALParams_by_pk?: SubscriptionResolver<Maybe<ResolversTypes['HALParams']>, "HALParams_by_pk", ParentType, ContextType, RequireFields<SubscriptionHALParams_by_pkArgs, 'id'>>;
  HALParams_stream?: SubscriptionResolver<Array<ResolversTypes['HALParams']>, "HALParams_stream", ParentType, ContextType, RequireFields<SubscriptionHALParams_streamArgs, 'batch_size' | 'cursor'>>;
  HatsPoster?: SubscriptionResolver<Array<ResolversTypes['HatsPoster']>, "HatsPoster", ParentType, ContextType, Partial<SubscriptionHatsPosterArgs>>;
  HatsPoster_by_pk?: SubscriptionResolver<Maybe<ResolversTypes['HatsPoster']>, "HatsPoster_by_pk", ParentType, ContextType, RequireFields<SubscriptionHatsPoster_by_pkArgs, 'id'>>;
  HatsPoster_stream?: SubscriptionResolver<Array<ResolversTypes['HatsPoster']>, "HatsPoster_stream", ParentType, ContextType, RequireFields<SubscriptionHatsPoster_streamArgs, 'batch_size' | 'cursor'>>;
  LocalLog?: SubscriptionResolver<Array<ResolversTypes['LocalLog']>, "LocalLog", ParentType, ContextType, Partial<SubscriptionLocalLogArgs>>;
  LocalLog_by_pk?: SubscriptionResolver<Maybe<ResolversTypes['LocalLog']>, "LocalLog_by_pk", ParentType, ContextType, RequireFields<SubscriptionLocalLog_by_pkArgs, 'id'>>;
  LocalLog_stream?: SubscriptionResolver<Array<ResolversTypes['LocalLog']>, "LocalLog_stream", ParentType, ContextType, RequireFields<SubscriptionLocalLog_streamArgs, 'batch_size' | 'cursor'>>;
  ModuleTemplate?: SubscriptionResolver<Array<ResolversTypes['ModuleTemplate']>, "ModuleTemplate", ParentType, ContextType, Partial<SubscriptionModuleTemplateArgs>>;
  ModuleTemplate_by_pk?: SubscriptionResolver<Maybe<ResolversTypes['ModuleTemplate']>, "ModuleTemplate_by_pk", ParentType, ContextType, RequireFields<SubscriptionModuleTemplate_by_pkArgs, 'id'>>;
  ModuleTemplate_stream?: SubscriptionResolver<Array<ResolversTypes['ModuleTemplate']>, "ModuleTemplate_stream", ParentType, ContextType, RequireFields<SubscriptionModuleTemplate_streamArgs, 'batch_size' | 'cursor'>>;
  Record?: SubscriptionResolver<Array<ResolversTypes['Record']>, "Record", ParentType, ContextType, Partial<SubscriptionRecordArgs>>;
  Record_by_pk?: SubscriptionResolver<Maybe<ResolversTypes['Record']>, "Record_by_pk", ParentType, ContextType, RequireFields<SubscriptionRecord_by_pkArgs, 'id'>>;
  Record_stream?: SubscriptionResolver<Array<ResolversTypes['Record']>, "Record_stream", ParentType, ContextType, RequireFields<SubscriptionRecord_streamArgs, 'batch_size' | 'cursor'>>;
  SBTBalParams?: SubscriptionResolver<Array<ResolversTypes['SBTBalParams']>, "SBTBalParams", ParentType, ContextType, Partial<SubscriptionSBTBalParamsArgs>>;
  SBTBalParams_by_pk?: SubscriptionResolver<Maybe<ResolversTypes['SBTBalParams']>, "SBTBalParams_by_pk", ParentType, ContextType, RequireFields<SubscriptionSBTBalParams_by_pkArgs, 'id'>>;
  SBTBalParams_stream?: SubscriptionResolver<Array<ResolversTypes['SBTBalParams']>, "SBTBalParams_stream", ParentType, ContextType, RequireFields<SubscriptionSBTBalParams_streamArgs, 'batch_size' | 'cursor'>>;
  ShipChoice?: SubscriptionResolver<Array<ResolversTypes['ShipChoice']>, "ShipChoice", ParentType, ContextType, Partial<SubscriptionShipChoiceArgs>>;
  ShipChoice_by_pk?: SubscriptionResolver<Maybe<ResolversTypes['ShipChoice']>, "ShipChoice_by_pk", ParentType, ContextType, RequireFields<SubscriptionShipChoice_by_pkArgs, 'id'>>;
  ShipChoice_stream?: SubscriptionResolver<Array<ResolversTypes['ShipChoice']>, "ShipChoice_stream", ParentType, ContextType, RequireFields<SubscriptionShipChoice_streamArgs, 'batch_size' | 'cursor'>>;
  ShipVote?: SubscriptionResolver<Array<ResolversTypes['ShipVote']>, "ShipVote", ParentType, ContextType, Partial<SubscriptionShipVoteArgs>>;
  ShipVote_by_pk?: SubscriptionResolver<Maybe<ResolversTypes['ShipVote']>, "ShipVote_by_pk", ParentType, ContextType, RequireFields<SubscriptionShipVote_by_pkArgs, 'id'>>;
  ShipVote_stream?: SubscriptionResolver<Array<ResolversTypes['ShipVote']>, "ShipVote_stream", ParentType, ContextType, RequireFields<SubscriptionShipVote_streamArgs, 'batch_size' | 'cursor'>>;
  StemModule?: SubscriptionResolver<Array<ResolversTypes['StemModule']>, "StemModule", ParentType, ContextType, Partial<SubscriptionStemModuleArgs>>;
  StemModule_by_pk?: SubscriptionResolver<Maybe<ResolversTypes['StemModule']>, "StemModule_by_pk", ParentType, ContextType, RequireFields<SubscriptionStemModule_by_pkArgs, 'id'>>;
  StemModule_stream?: SubscriptionResolver<Array<ResolversTypes['StemModule']>, "StemModule_stream", ParentType, ContextType, RequireFields<SubscriptionStemModule_streamArgs, 'batch_size' | 'cursor'>>;
  TVParams?: SubscriptionResolver<Array<ResolversTypes['TVParams']>, "TVParams", ParentType, ContextType, Partial<SubscriptionTVParamsArgs>>;
  TVParams_by_pk?: SubscriptionResolver<Maybe<ResolversTypes['TVParams']>, "TVParams_by_pk", ParentType, ContextType, RequireFields<SubscriptionTVParams_by_pkArgs, 'id'>>;
  TVParams_stream?: SubscriptionResolver<Array<ResolversTypes['TVParams']>, "TVParams_stream", ParentType, ContextType, RequireFields<SubscriptionTVParams_streamArgs, 'batch_size' | 'cursor'>>;
}>;

export type GMInitParamsResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['GMInitParams'] = ResolversParentTypes['GMInitParams']> = ResolversObject<{
  db_write_timestamp?: Resolver<Maybe<ResolversTypes['timestamp']>, ParentType, ContextType>;
  gameFacilitatorId?: Resolver<Maybe<ResolversTypes['numeric']>, ParentType, ContextType>;
  gmRootAccount?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type GameManagerResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['GameManager'] = ResolversParentTypes['GameManager']> = ResolversObject<{
  chainId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  currentRound?: Resolver<Maybe<ResolversTypes['GameRound']>, ParentType, ContextType>;
  currentRoundNumber?: Resolver<ResolversTypes['numeric'], ParentType, ContextType>;
  currentRound_id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  db_write_timestamp?: Resolver<Maybe<ResolversTypes['timestamp']>, ParentType, ContextType>;
  gameFacilitatorId?: Resolver<Maybe<ResolversTypes['numeric']>, ParentType, ContextType>;
  gameRounds?: Resolver<Array<ResolversTypes['GameRound']>, ParentType, ContextType, Partial<GameManagergameRoundsArgs>>;
  gmRootAccount?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  initData?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  poolFunds?: Resolver<Maybe<ResolversTypes['numeric']>, ParentType, ContextType>;
  poolId?: Resolver<ResolversTypes['numeric'], ParentType, ContextType>;
  poolMetadataPointer?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  poolMetadataProtocol?: Resolver<ResolversTypes['numeric'], ParentType, ContextType>;
  profileId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  profileMetadataPointer?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  profileMetadataProtocol?: Resolver<ResolversTypes['numeric'], ParentType, ContextType>;
  template?: Resolver<Maybe<ResolversTypes['GameManagerTemplate']>, ParentType, ContextType>;
  template_id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  tokenAddress?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type GameManagerFactoryResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['GameManagerFactory'] = ResolversParentTypes['GameManagerFactory']> = ResolversObject<{
  chainId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  db_write_timestamp?: Resolver<Maybe<ResolversTypes['timestamp']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  rootAccount?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type GameManagerTemplateResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['GameManagerTemplate'] = ResolversParentTypes['GameManagerTemplate']> = ResolversObject<{
  address?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  chainId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  db_write_timestamp?: Resolver<Maybe<ResolversTypes['timestamp']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type GameRoundResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['GameRound'] = ResolversParentTypes['GameRound']> = ResolversObject<{
  db_write_timestamp?: Resolver<Maybe<ResolversTypes['timestamp']>, ParentType, ContextType>;
  endTime?: Resolver<ResolversTypes['numeric'], ParentType, ContextType>;
  gameManager?: Resolver<Maybe<ResolversTypes['GameManager']>, ParentType, ContextType>;
  gameManager_id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  gameStatus?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  isGameActive?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  realEndTime?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  realStartTime?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  ships?: Resolver<Array<ResolversTypes['GrantShip']>, ParentType, ContextType, Partial<GameRoundshipsArgs>>;
  startTime?: Resolver<ResolversTypes['numeric'], ParentType, ContextType>;
  totalAllocatedAmount?: Resolver<ResolversTypes['numeric'], ParentType, ContextType>;
  totalDistributedAmount?: Resolver<ResolversTypes['numeric'], ParentType, ContextType>;
  totalRoundAmount?: Resolver<ResolversTypes['numeric'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type GrantResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['Grant'] = ResolversParentTypes['Grant']> = ResolversObject<{
  db_write_timestamp?: Resolver<Maybe<ResolversTypes['timestamp']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  project?: Resolver<Maybe<ResolversTypes['Project']>, ParentType, ContextType>;
  project_id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  ship?: Resolver<Maybe<ResolversTypes['GrantShip']>, ParentType, ContextType>;
  ship_id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type GrantShipResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['GrantShip'] = ResolversParentTypes['GrantShip']> = ResolversObject<{
  anchor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  applicationReviewReason?: Resolver<Maybe<ResolversTypes['RawMetadata']>, ParentType, ContextType>;
  applicationReviewReason_id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  applicationSubmittedTime?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  approvedTime?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  balance?: Resolver<ResolversTypes['numeric'], ParentType, ContextType>;
  chainId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  db_write_timestamp?: Resolver<Maybe<ResolversTypes['timestamp']>, ParentType, ContextType>;
  gameManager?: Resolver<Maybe<ResolversTypes['GameManager']>, ParentType, ContextType>;
  gameManager_id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  gameRound?: Resolver<Maybe<ResolversTypes['GameRound']>, ParentType, ContextType>;
  gameRound_id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  grants?: Resolver<Array<ResolversTypes['Grant']>, ParentType, ContextType, Partial<GrantShipgrantsArgs>>;
  hasEditedProfile?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  hasSubmittedApplication?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  hatId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  isAllocated?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  isApproved?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  isAwaitingApproval?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  isDistributed?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  isRejected?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  nonce?: Resolver<ResolversTypes['numeric'], ParentType, ContextType>;
  owner?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  pastNames?: Resolver<ResolversTypes['_text'], ParentType, ContextType>;
  pastProfileIds?: Resolver<ResolversTypes['_text'], ParentType, ContextType>;
  poolActive?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  poolFunded?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  poolId?: Resolver<Maybe<ResolversTypes['numeric']>, ParentType, ContextType>;
  profileId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  profileMetadata?: Resolver<Maybe<ResolversTypes['RawMetadata']>, ParentType, ContextType>;
  profileMetadata_id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  rejectedTime?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  shipAllocation?: Resolver<ResolversTypes['numeric'], ParentType, ContextType>;
  shipApplicationBytesData?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  shipContractAddress?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  shipLaunched?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  status?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  totalAllocated?: Resolver<ResolversTypes['numeric'], ParentType, ContextType>;
  totalAvailableFunds?: Resolver<ResolversTypes['numeric'], ParentType, ContextType>;
  totalDistributed?: Resolver<ResolversTypes['numeric'], ParentType, ContextType>;
  totalRoundAmount?: Resolver<ResolversTypes['numeric'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ProfileIdToAnchorResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['ProfileIdToAnchor'] = ResolversParentTypes['ProfileIdToAnchor']> = ResolversObject<{
  anchor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  db_write_timestamp?: Resolver<Maybe<ResolversTypes['timestamp']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  profileId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ProfileMemberGroupResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['ProfileMemberGroup'] = ResolversParentTypes['ProfileMemberGroup']> = ResolversObject<{
  addresses?: Resolver<ResolversTypes['_text'], ParentType, ContextType>;
  db_write_timestamp?: Resolver<Maybe<ResolversTypes['timestamp']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  role?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ProjectResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['Project'] = ResolversParentTypes['Project']> = ResolversObject<{
  anchor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  chainId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  db_write_timestamp?: Resolver<Maybe<ResolversTypes['timestamp']>, ParentType, ContextType>;
  grants?: Resolver<Array<ResolversTypes['Grant']>, ParentType, ContextType, Partial<ProjectgrantsArgs>>;
  hasEditedProfile?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  members?: Resolver<Maybe<ResolversTypes['ProfileMemberGroup']>, ParentType, ContextType>;
  members_id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  metadata?: Resolver<Maybe<ResolversTypes['RawMetadata']>, ParentType, ContextType>;
  metadata_id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  nonce?: Resolver<ResolversTypes['numeric'], ParentType, ContextType>;
  owner?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  pastNames?: Resolver<ResolversTypes['_text'], ParentType, ContextType>;
  pastProfileIds?: Resolver<ResolversTypes['_text'], ParentType, ContextType>;
  profileId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  status?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  totalAmountReceived?: Resolver<ResolversTypes['numeric'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type RawMetadataResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['RawMetadata'] = ResolversParentTypes['RawMetadata']> = ResolversObject<{
  db_write_timestamp?: Resolver<Maybe<ResolversTypes['timestamp']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  pointer?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  protocol?: Resolver<ResolversTypes['numeric'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type TestResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['Test'] = ResolversParentTypes['Test']> = ResolversObject<{
  db_write_timestamp?: Resolver<Maybe<ResolversTypes['timestamp']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export interface _textScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['_text'], any> {
  name: '_text';
}

export type chain_metadataResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['chain_metadata'] = ResolversParentTypes['chain_metadata']> = ResolversObject<{
  block_height?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  chain_id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  end_block?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  first_event_block_number?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  is_hyper_sync?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  latest_fetched_block_number?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  latest_processed_block?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  num_batches_fetched?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  num_events_processed?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  start_block?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  timestamp_caught_up_to_head_or_endblock?: Resolver<Maybe<ResolversTypes['timestamptz']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export interface contract_typeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['contract_type'], any> {
  name: 'contract_type';
}

export type dynamic_contract_registryResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['dynamic_contract_registry'] = ResolversParentTypes['dynamic_contract_registry']> = ResolversObject<{
  block_timestamp?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  chain_id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  contract_address?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  contract_type?: Resolver<ResolversTypes['contract_type'], ParentType, ContextType>;
  event_id?: Resolver<ResolversTypes['numeric'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type entity_historyResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['entity_history'] = ResolversParentTypes['entity_history']> = ResolversObject<{
  block_number?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  block_timestamp?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  chain_id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  entity_id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  entity_type?: Resolver<ResolversTypes['entity_type'], ParentType, ContextType>;
  event?: Resolver<Maybe<ResolversTypes['raw_events']>, ParentType, ContextType>;
  log_index?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  params?: Resolver<Maybe<ResolversTypes['json']>, ParentType, ContextType, Partial<entity_historyparamsArgs>>;
  previous_block_number?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  previous_block_timestamp?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  previous_chain_id?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  previous_log_index?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type entity_history_filterResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['entity_history_filter'] = ResolversParentTypes['entity_history_filter']> = ResolversObject<{
  block_number?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  block_timestamp?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  chain_id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  entity_id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  entity_type?: Resolver<ResolversTypes['entity_type'], ParentType, ContextType>;
  event?: Resolver<Maybe<ResolversTypes['raw_events']>, ParentType, ContextType>;
  log_index?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  new_val?: Resolver<Maybe<ResolversTypes['json']>, ParentType, ContextType, Partial<entity_history_filternew_valArgs>>;
  old_val?: Resolver<Maybe<ResolversTypes['json']>, ParentType, ContextType, Partial<entity_history_filterold_valArgs>>;
  previous_block_number?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  previous_log_index?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export interface entity_typeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['entity_type'], any> {
  name: 'entity_type';
}

export type event_sync_stateResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['event_sync_state'] = ResolversParentTypes['event_sync_state']> = ResolversObject<{
  block_number?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  block_timestamp?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  chain_id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  log_index?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  transaction_index?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export interface event_typeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['event_type'], any> {
  name: 'event_type';
}

export interface jsonScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['json'], any> {
  name: 'json';
}

export interface numericScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['numeric'], any> {
  name: 'numeric';
}

export type persisted_stateResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['persisted_state'] = ResolversParentTypes['persisted_state']> = ResolversObject<{
  abi_files_hash?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  config_hash?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  envio_version?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  handler_files_hash?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  schema_hash?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type raw_eventsResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['raw_events'] = ResolversParentTypes['raw_events']> = ResolversObject<{
  block_hash?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  block_number?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  block_timestamp?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  chain_id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  db_write_timestamp?: Resolver<Maybe<ResolversTypes['timestamp']>, ParentType, ContextType>;
  event_history?: Resolver<Array<ResolversTypes['entity_history']>, ParentType, ContextType, Partial<raw_eventsevent_historyArgs>>;
  event_id?: Resolver<ResolversTypes['numeric'], ParentType, ContextType>;
  event_type?: Resolver<ResolversTypes['event_type'], ParentType, ContextType>;
  log_index?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  params?: Resolver<ResolversTypes['json'], ParentType, ContextType, Partial<raw_eventsparamsArgs>>;
  src_address?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  transaction_hash?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  transaction_index?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export interface timestampScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['timestamp'], any> {
  name: 'timestamp';
}

export interface timestamptzScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['timestamptz'], any> {
  name: 'timestamptz';
}

export type ContestResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['Contest'] = ResolversParentTypes['Contest']> = ResolversObject<{
  choicesModule?: Resolver<Maybe<ResolversTypes['StemModule']>, ParentType, ContextType>;
  choicesModule_id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  contestAddress?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  contestStatus?: Resolver<ResolversTypes['numeric'], ParentType, ContextType>;
  contestVersion?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  db_write_timestamp?: Resolver<Maybe<ResolversTypes['timestamp']>, ParentType, ContextType>;
  executionModule?: Resolver<Maybe<ResolversTypes['StemModule']>, ParentType, ContextType>;
  executionModule_id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  filterTag?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  isContinuous?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  isRetractable?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  pointsModule?: Resolver<Maybe<ResolversTypes['StemModule']>, ParentType, ContextType>;
  pointsModule_id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  votesModule?: Resolver<Maybe<ResolversTypes['StemModule']>, ParentType, ContextType>;
  votesModule_id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ContestCloneResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['ContestClone'] = ResolversParentTypes['ContestClone']> = ResolversObject<{
  contestAddress?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  contestVersion?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  db_write_timestamp?: Resolver<Maybe<ResolversTypes['timestamp']>, ParentType, ContextType>;
  filterTag?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ContestTemplateResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['ContestTemplate'] = ResolversParentTypes['ContestTemplate']> = ResolversObject<{
  active?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  contestAddress?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  contestVersion?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  db_write_timestamp?: Resolver<Maybe<ResolversTypes['timestamp']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  mdPointer?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  mdProtocol?: Resolver<ResolversTypes['numeric'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ERCPointParamsResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['ERCPointParams'] = ResolversParentTypes['ERCPointParams']> = ResolversObject<{
  db_write_timestamp?: Resolver<Maybe<ResolversTypes['timestamp']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  voteTokenAddress?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  votingCheckpoint?: Resolver<ResolversTypes['numeric'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type EnvioTXResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['EnvioTX'] = ResolversParentTypes['EnvioTX']> = ResolversObject<{
  blockNumber?: Resolver<ResolversTypes['numeric'], ParentType, ContextType>;
  db_write_timestamp?: Resolver<Maybe<ResolversTypes['timestamp']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  srcAddress?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  txHash?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  txOrigin?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type EventPostResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['EventPost'] = ResolversParentTypes['EventPost']> = ResolversObject<{
  db_write_timestamp?: Resolver<Maybe<ResolversTypes['timestamp']>, ParentType, ContextType>;
  hatId?: Resolver<ResolversTypes['numeric'], ParentType, ContextType>;
  hatsPoster?: Resolver<Maybe<ResolversTypes['HatsPoster']>, ParentType, ContextType>;
  hatsPoster_id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  mdPointer?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  mdProtocol?: Resolver<ResolversTypes['numeric'], ParentType, ContextType>;
  tag?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type FactoryEventsSummaryResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['FactoryEventsSummary'] = ResolversParentTypes['FactoryEventsSummary']> = ResolversObject<{
  address?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  admins?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  contestBuiltCount?: Resolver<ResolversTypes['numeric'], ParentType, ContextType>;
  contestCloneCount?: Resolver<ResolversTypes['numeric'], ParentType, ContextType>;
  contestTemplateCount?: Resolver<ResolversTypes['numeric'], ParentType, ContextType>;
  db_write_timestamp?: Resolver<Maybe<ResolversTypes['timestamp']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  moduleCloneCount?: Resolver<ResolversTypes['numeric'], ParentType, ContextType>;
  moduleTemplateCount?: Resolver<ResolversTypes['numeric'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type GSVoterResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['GSVoter'] = ResolversParentTypes['GSVoter']> = ResolversObject<{
  address?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  db_write_timestamp?: Resolver<Maybe<ResolversTypes['timestamp']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  votes?: Resolver<Array<ResolversTypes['ShipVote']>, ParentType, ContextType, Partial<GSVotervotesArgs>>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type GrantShipsVotingResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['GrantShipsVoting'] = ResolversParentTypes['GrantShipsVoting']> = ResolversObject<{
  choices?: Resolver<Array<ResolversTypes['ShipChoice']>, ParentType, ContextType, Partial<GrantShipsVotingchoicesArgs>>;
  contest?: Resolver<Maybe<ResolversTypes['Contest']>, ParentType, ContextType>;
  contest_id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  db_write_timestamp?: Resolver<Maybe<ResolversTypes['timestamp']>, ParentType, ContextType>;
  endTime?: Resolver<Maybe<ResolversTypes['numeric']>, ParentType, ContextType>;
  hatId?: Resolver<ResolversTypes['numeric'], ParentType, ContextType>;
  hatsAddress?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  isSBTVoting?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  isVotingActive?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  startTime?: Resolver<Maybe<ResolversTypes['numeric']>, ParentType, ContextType>;
  totalVotes?: Resolver<ResolversTypes['numeric'], ParentType, ContextType>;
  voteDuration?: Resolver<ResolversTypes['numeric'], ParentType, ContextType>;
  voteTokenAddress?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  votes?: Resolver<Array<ResolversTypes['ShipVote']>, ParentType, ContextType, Partial<GrantShipsVotingvotesArgs>>;
  votingCheckpoint?: Resolver<ResolversTypes['numeric'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type HALParamsResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['HALParams'] = ResolversParentTypes['HALParams']> = ResolversObject<{
  db_write_timestamp?: Resolver<Maybe<ResolversTypes['timestamp']>, ParentType, ContextType>;
  hatId?: Resolver<ResolversTypes['numeric'], ParentType, ContextType>;
  hatsAddress?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type HatsPosterResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['HatsPoster'] = ResolversParentTypes['HatsPoster']> = ResolversObject<{
  db_write_timestamp?: Resolver<Maybe<ResolversTypes['timestamp']>, ParentType, ContextType>;
  eventPosts?: Resolver<Array<ResolversTypes['EventPost']>, ParentType, ContextType, Partial<HatsPostereventPostsArgs>>;
  hatIds?: Resolver<Array<ResolversTypes['numeric']>, ParentType, ContextType>;
  hatsAddress?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  record?: Resolver<Array<ResolversTypes['Record']>, ParentType, ContextType, Partial<HatsPosterrecordArgs>>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type LocalLogResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['LocalLog'] = ResolversParentTypes['LocalLog']> = ResolversObject<{
  db_write_timestamp?: Resolver<Maybe<ResolversTypes['timestamp']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  message?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ModuleTemplateResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['ModuleTemplate'] = ResolversParentTypes['ModuleTemplate']> = ResolversObject<{
  active?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  db_write_timestamp?: Resolver<Maybe<ResolversTypes['timestamp']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  mdPointer?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  mdProtocol?: Resolver<ResolversTypes['numeric'], ParentType, ContextType>;
  moduleName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  templateAddress?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type RecordResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['Record'] = ResolversParentTypes['Record']> = ResolversObject<{
  db_write_timestamp?: Resolver<Maybe<ResolversTypes['timestamp']>, ParentType, ContextType>;
  hatId?: Resolver<ResolversTypes['numeric'], ParentType, ContextType>;
  hatsPoster?: Resolver<Maybe<ResolversTypes['HatsPoster']>, ParentType, ContextType>;
  hatsPoster_id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  mdPointer?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  mdProtocol?: Resolver<ResolversTypes['numeric'], ParentType, ContextType>;
  nonce?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  tag?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type SBTBalParamsResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['SBTBalParams'] = ResolversParentTypes['SBTBalParams']> = ResolversObject<{
  db_write_timestamp?: Resolver<Maybe<ResolversTypes['timestamp']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  voteTokenAddress?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ShipChoiceResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['ShipChoice'] = ResolversParentTypes['ShipChoice']> = ResolversObject<{
  active?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  choiceData?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  contest?: Resolver<Maybe<ResolversTypes['GrantShipsVoting']>, ParentType, ContextType>;
  contest_id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  db_write_timestamp?: Resolver<Maybe<ResolversTypes['timestamp']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  mdPointer?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  mdProtocol?: Resolver<ResolversTypes['numeric'], ParentType, ContextType>;
  voteTally?: Resolver<ResolversTypes['numeric'], ParentType, ContextType>;
  votes?: Resolver<Array<ResolversTypes['ShipVote']>, ParentType, ContextType, Partial<ShipChoicevotesArgs>>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ShipVoteResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['ShipVote'] = ResolversParentTypes['ShipVote']> = ResolversObject<{
  amount?: Resolver<ResolversTypes['numeric'], ParentType, ContextType>;
  choice?: Resolver<Maybe<ResolversTypes['ShipChoice']>, ParentType, ContextType>;
  choice_id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  contest?: Resolver<Maybe<ResolversTypes['GrantShipsVoting']>, ParentType, ContextType>;
  contest_id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  db_write_timestamp?: Resolver<Maybe<ResolversTypes['timestamp']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  isRetractVote?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  mdPointer?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  mdProtocol?: Resolver<ResolversTypes['numeric'], ParentType, ContextType>;
  voter?: Resolver<Maybe<ResolversTypes['GSVoter']>, ParentType, ContextType>;
  voter_id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type StemModuleResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['StemModule'] = ResolversParentTypes['StemModule']> = ResolversObject<{
  contest?: Resolver<Maybe<ResolversTypes['Contest']>, ParentType, ContextType>;
  contestAddress?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  contest_id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  db_write_timestamp?: Resolver<Maybe<ResolversTypes['timestamp']>, ParentType, ContextType>;
  filterTag?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  moduleAddress?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  moduleName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  moduleTemplate?: Resolver<Maybe<ResolversTypes['ModuleTemplate']>, ParentType, ContextType>;
  moduleTemplate_id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type TVParamsResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['TVParams'] = ResolversParentTypes['TVParams']> = ResolversObject<{
  db_write_timestamp?: Resolver<Maybe<ResolversTypes['timestamp']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  voteDuration?: Resolver<ResolversTypes['numeric'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type Resolvers<ContextType = MeshContext> = ResolversObject<{
  Query?: QueryResolvers<ContextType>;
  Subscription?: SubscriptionResolvers<ContextType>;
  GMInitParams?: GMInitParamsResolvers<ContextType>;
  GameManager?: GameManagerResolvers<ContextType>;
  GameManagerFactory?: GameManagerFactoryResolvers<ContextType>;
  GameManagerTemplate?: GameManagerTemplateResolvers<ContextType>;
  GameRound?: GameRoundResolvers<ContextType>;
  Grant?: GrantResolvers<ContextType>;
  GrantShip?: GrantShipResolvers<ContextType>;
  ProfileIdToAnchor?: ProfileIdToAnchorResolvers<ContextType>;
  ProfileMemberGroup?: ProfileMemberGroupResolvers<ContextType>;
  Project?: ProjectResolvers<ContextType>;
  RawMetadata?: RawMetadataResolvers<ContextType>;
  Test?: TestResolvers<ContextType>;
  _text?: GraphQLScalarType;
  chain_metadata?: chain_metadataResolvers<ContextType>;
  contract_type?: GraphQLScalarType;
  dynamic_contract_registry?: dynamic_contract_registryResolvers<ContextType>;
  entity_history?: entity_historyResolvers<ContextType>;
  entity_history_filter?: entity_history_filterResolvers<ContextType>;
  entity_type?: GraphQLScalarType;
  event_sync_state?: event_sync_stateResolvers<ContextType>;
  event_type?: GraphQLScalarType;
  json?: GraphQLScalarType;
  numeric?: GraphQLScalarType;
  persisted_state?: persisted_stateResolvers<ContextType>;
  raw_events?: raw_eventsResolvers<ContextType>;
  timestamp?: GraphQLScalarType;
  timestamptz?: GraphQLScalarType;
  Contest?: ContestResolvers<ContextType>;
  ContestClone?: ContestCloneResolvers<ContextType>;
  ContestTemplate?: ContestTemplateResolvers<ContextType>;
  ERCPointParams?: ERCPointParamsResolvers<ContextType>;
  EnvioTX?: EnvioTXResolvers<ContextType>;
  EventPost?: EventPostResolvers<ContextType>;
  FactoryEventsSummary?: FactoryEventsSummaryResolvers<ContextType>;
  GSVoter?: GSVoterResolvers<ContextType>;
  GrantShipsVoting?: GrantShipsVotingResolvers<ContextType>;
  HALParams?: HALParamsResolvers<ContextType>;
  HatsPoster?: HatsPosterResolvers<ContextType>;
  LocalLog?: LocalLogResolvers<ContextType>;
  ModuleTemplate?: ModuleTemplateResolvers<ContextType>;
  Record?: RecordResolvers<ContextType>;
  SBTBalParams?: SBTBalParamsResolvers<ContextType>;
  ShipChoice?: ShipChoiceResolvers<ContextType>;
  ShipVote?: ShipVoteResolvers<ContextType>;
  StemModule?: StemModuleResolvers<ContextType>;
  TVParams?: TVParamsResolvers<ContextType>;
}>;

export type DirectiveResolvers<ContextType = MeshContext> = ResolversObject<{
  cached?: cachedDirectiveResolver<any, any, ContextType>;
}>;

export type MeshContext = GrantShipsTypes.Context & GsVotingTypes.Context & BaseMeshContext;


import { fileURLToPath } from '@graphql-mesh/utils';
const baseDir = pathModule.join(pathModule.dirname(fileURLToPath(import.meta.url)), '..');

const importFn: ImportFn = <T>(moduleId: string) => {
  const relativeModuleId = (pathModule.isAbsolute(moduleId) ? pathModule.relative(baseDir, moduleId) : moduleId).split('\\').join('/').replace(baseDir + '/', '');
  switch(relativeModuleId) {
    case ".graphclient/sources/grant-ships/introspectionSchema":
      return Promise.resolve(importedModule$0) as T;
    
    case ".graphclient/sources/gs-voting/introspectionSchema":
      return Promise.resolve(importedModule$1) as T;
    
    default:
      return Promise.reject(new Error(`Cannot find module '${relativeModuleId}'.`));
  }
};

const rootStore = new MeshStore('.graphclient', new FsStoreStorageAdapter({
  cwd: baseDir,
  importFn,
  fileType: "ts",
}), {
  readonly: true,
  validate: false
});

export const rawServeConfig: YamlConfig.Config['serve'] = undefined as any
export async function getMeshOptions(): Promise<GetMeshOptions> {
const pubsub = new PubSub();
const sourcesStore = rootStore.child('sources');
const logger = new DefaultLogger("GraphClient");
const cache = new (MeshCache as any)({
      ...({} as any),
      importFn,
      store: rootStore.child('cache'),
      pubsub,
      logger,
    } as any)

const sources: MeshResolvedSource[] = [];
const transforms: MeshTransform[] = [];
const additionalEnvelopPlugins: MeshPlugin<any>[] = [];
const grantShipsTransforms = [];
const gsVotingTransforms = [];
const additionalTypeDefs = [] as any[];
const grantShipsHandler = new GraphqlHandler({
              name: "grant-ships",
              config: {"endpoint":"http://localhost:8080/v1/graphql"},
              baseDir,
              cache,
              pubsub,
              store: sourcesStore.child("grant-ships"),
              logger: logger.child("grant-ships"),
              importFn,
            });
const gsVotingHandler = new GraphqlHandler({
              name: "gs-voting",
              config: {"endpoint":"https://indexer.bigdevenergy.link/d18cda9/v1/graphql"},
              baseDir,
              cache,
              pubsub,
              store: sourcesStore.child("gs-voting"),
              logger: logger.child("gs-voting"),
              importFn,
            });
sources[0] = {
          name: 'grant-ships',
          handler: grantShipsHandler,
          transforms: grantShipsTransforms
        }
sources[1] = {
          name: 'gs-voting',
          handler: gsVotingHandler,
          transforms: gsVotingTransforms
        }
const additionalResolvers = [] as any[]
const merger = new(StitchingMerger as any)({
        cache,
        pubsub,
        logger: logger.child('stitchingMerger'),
        store: rootStore.child('stitchingMerger')
      })

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
        document: FacDashShipDataDocument,
        get rawSDL() {
          return printWithCache(FacDashShipDataDocument);
        },
        location: 'FacDashShipDataDocument.graphql'
      },{
        document: GetGameManagerDocument,
        get rawSDL() {
          return printWithCache(GetGameManagerDocument);
        },
        location: 'GetGameManagerDocument.graphql'
      },{
        document: GetProjectsDocument,
        get rawSDL() {
          return printWithCache(GetProjectsDocument);
        },
        location: 'GetProjectsDocument.graphql'
      },{
        document: GetUserProjectsDocument,
        get rawSDL() {
          return printWithCache(GetUserProjectsDocument);
        },
        location: 'GetUserProjectsDocument.graphql'
      },{
        document: GetShipFundsAvailableDocument,
        get rawSDL() {
          return printWithCache(GetShipFundsAvailableDocument);
        },
        location: 'GetShipFundsAvailableDocument.graphql'
      },{
        document: GetShipIdByHatIdDocument,
        get rawSDL() {
          return printWithCache(GetShipIdByHatIdDocument);
        },
        location: 'GetShipIdByHatIdDocument.graphql'
      },{
        document: GetShipPoolIdDocument,
        get rawSDL() {
          return printWithCache(GetShipPoolIdDocument);
        },
        location: 'GetShipPoolIdDocument.graphql'
      },{
        document: GetUserDataDocument,
        get rawSDL() {
          return printWithCache(GetUserDataDocument);
        },
        location: 'GetUserDataDocument.graphql'
      },{
        document: ProjectPageQueryDocument,
        get rawSDL() {
          return printWithCache(ProjectPageQueryDocument);
        },
        location: 'ProjectPageQueryDocument.graphql'
      }
    ];
    },
    fetchFn,
  };
}

export function createBuiltMeshHTTPHandler<TServerContext = {}>(): MeshHTTPHandler<TServerContext> {
  return createMeshHTTPHandler<TServerContext>({
    baseDir,
    getBuiltMesh: getBuiltGraphClient,
    rawServeConfig: undefined,
  })
}


let meshInstance$: Promise<MeshInstance> | undefined;

export function getBuiltGraphClient(): Promise<MeshInstance> {
  if (meshInstance$ == null) {
    meshInstance$ = getMeshOptions().then(meshOptions => getMesh(meshOptions)).then(mesh => {
      const id = mesh.pubsub.subscribe('destroy', () => {
        meshInstance$ = undefined;
        mesh.pubsub.unsubscribe(id);
      });
      return mesh;
    });
  }
  return meshInstance$;
}

export const execute: ExecuteMeshFn = (...args) => getBuiltGraphClient().then(({ execute }) => execute(...args));

export const subscribe: SubscribeMeshFn = (...args) => getBuiltGraphClient().then(({ subscribe }) => subscribe(...args));
export function getBuiltGraphSDK<TGlobalContext = any, TOperationContext = any>(globalContext?: TGlobalContext) {
  const sdkRequester$ = getBuiltGraphClient().then(({ sdkRequesterFactory }) => sdkRequesterFactory(globalContext));
  return getSdk<TOperationContext, TGlobalContext>((...args) => sdkRequester$.then(sdkRequester => sdkRequester(...args)));
}
export type FacShipDataFragment = (
  Pick<GrantShip, 'id' | 'name' | 'status' | 'applicationSubmittedTime' | 'shipApplicationBytesData'>
  & { profileMetadata?: Maybe<Pick<RawMetadata, 'pointer'>> }
);

export type facDashShipDataQueryVariables = Exact<{ [key: string]: never; }>;


export type facDashShipDataQuery = { shipApplicants: Array<(
    Pick<GrantShip, 'id' | 'name' | 'status' | 'applicationSubmittedTime' | 'shipApplicationBytesData'>
    & { profileMetadata?: Maybe<Pick<RawMetadata, 'pointer'>> }
  )>, approvedShips: Array<(
    Pick<GrantShip, 'approvedTime' | 'shipAllocation' | 'totalAvailableFunds' | 'id' | 'name' | 'status' | 'applicationSubmittedTime' | 'shipApplicationBytesData'>
    & { applicationReviewReason?: Maybe<Pick<RawMetadata, 'pointer'>>, profileMetadata?: Maybe<Pick<RawMetadata, 'pointer'>> }
  )>, rejectedShips: Array<(
    Pick<GrantShip, 'rejectedTime' | 'id' | 'name' | 'status' | 'applicationSubmittedTime' | 'shipApplicationBytesData'>
    & { applicationReviewReason?: Maybe<Pick<RawMetadata, 'pointer'>>, profileMetadata?: Maybe<Pick<RawMetadata, 'pointer'>> }
  )> };

export type GameManagerDataFragment = (
  Pick<GameManager, 'id' | 'gameFacilitatorId' | 'gmRootAccount' | 'tokenAddress' | 'currentRound_id' | 'poolFunds' | 'poolId' | 'profileId'>
  & { currentRound?: Maybe<(
    Pick<GameRound, 'id' | 'startTime' | 'endTime' | 'totalRoundAmount' | 'gameStatus'>
    & { ships: Array<Pick<GrantShip, 'anchor'>> }
  )> }
);

export type getGameManagerQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type getGameManagerQuery = { GameManager: Array<(
    Pick<GameManager, 'id' | 'gameFacilitatorId' | 'gmRootAccount' | 'tokenAddress' | 'currentRound_id' | 'poolFunds' | 'poolId' | 'profileId'>
    & { currentRound?: Maybe<(
      Pick<GameRound, 'id' | 'startTime' | 'endTime' | 'totalRoundAmount' | 'gameStatus'>
      & { ships: Array<Pick<GrantShip, 'anchor'>> }
    )> }
  )> };

export type ProjectDetailsFragment = Pick<Project, 'id' | 'name' | 'profileId' | 'nonce' | 'anchor' | 'owner'>;

export type RawMetadataFragment = Pick<RawMetadata, 'protocol' | 'pointer'>;

export type GetProjectsQueryVariables = Exact<{
  chainId: Scalars['Int'];
}>;


export type GetProjectsQuery = { Project: Array<(
    Pick<Project, 'id' | 'name' | 'profileId' | 'nonce' | 'anchor' | 'owner'>
    & { metadata?: Maybe<Pick<RawMetadata, 'protocol' | 'pointer'>> }
  )> };

export type GetUserProjectsQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type GetUserProjectsQuery = { Project: Array<(
    Pick<Project, 'id' | 'name' | 'profileId' | 'nonce' | 'anchor' | 'owner'>
    & { metadata?: Maybe<Pick<RawMetadata, 'protocol' | 'pointer'>> }
  )> };

export type getShipFundsAvailableQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type getShipFundsAvailableQuery = { GrantShip: Array<Pick<GrantShip, 'totalAvailableFunds'>> };

export type getShipIdByHatIdQueryVariables = Exact<{
  hatId: Scalars['String'];
}>;


export type getShipIdByHatIdQuery = { GrantShip: Array<Pick<GrantShip, 'id'>> };

export type getShipPoolIdQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type getShipPoolIdQuery = { GrantShip: Array<Pick<GrantShip, 'poolId'>> };

export type getUserDataQueryVariables = Exact<{
  id?: InputMaybe<Scalars['String']>;
}>;


export type getUserDataQuery = { projects: Array<(
    Pick<Project, 'id' | 'name' | 'profileId' | 'nonce' | 'anchor' | 'owner'>
    & { metadata?: Maybe<Pick<RawMetadata, 'protocol' | 'pointer'>> }
  )>, shipApplicants: Array<(
    Pick<GrantShip, 'id' | 'name' | 'status' | 'applicationSubmittedTime' | 'shipApplicationBytesData'>
    & { profileMetadata?: Maybe<Pick<RawMetadata, 'pointer'>> }
  )> };

export type projectPageQueryQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type projectPageQueryQuery = { Project: Array<(
    Pick<Project, 'id' | 'profileId' | 'name' | 'status' | 'owner'>
    & { metadata?: Maybe<Pick<RawMetadata, 'pointer'>>, members?: Maybe<Pick<ProfileMemberGroup, 'addresses'>> }
  )> };

export const FacShipDataFragmentDoc = gql`
    fragment FacShipData on GrantShip {
  id
  name
  status
  applicationSubmittedTime
  shipApplicationBytesData
  profileMetadata {
    pointer
  }
}
    ` as unknown as DocumentNode<FacShipDataFragment, unknown>;
export const GameManagerDataFragmentDoc = gql`
    fragment GameManagerData on GameManager {
  id
  gameFacilitatorId
  gmRootAccount
  tokenAddress
  currentRound_id
  poolFunds
  poolId
  profileId
  tokenAddress
  currentRound {
    id
    startTime
    endTime
    totalRoundAmount
    gameStatus
    ships {
      anchor
    }
  }
}
    ` as unknown as DocumentNode<GameManagerDataFragment, unknown>;
export const ProjectDetailsFragmentDoc = gql`
    fragment ProjectDetails on Project {
  id
  name
  profileId
  nonce
  anchor
  owner
}
    ` as unknown as DocumentNode<ProjectDetailsFragment, unknown>;
export const RawMetadataFragmentDoc = gql`
    fragment RawMetadata on RawMetadata {
  protocol
  pointer
}
    ` as unknown as DocumentNode<RawMetadataFragment, unknown>;
export const facDashShipDataDocument = gql`
    query facDashShipData {
  shipApplicants: GrantShip(where: {isAwaitingApproval: {_eq: true}}) {
    ...FacShipData
  }
  approvedShips: GrantShip(
    where: {isApproved: {_eq: true}, hasSubmittedApplication: {_eq: true}}
  ) {
    ...FacShipData
    approvedTime
    shipAllocation
    totalAvailableFunds
    applicationReviewReason {
      pointer
    }
  }
  rejectedShips: GrantShip(where: {isRejected: {_eq: true}}) {
    ...FacShipData
    rejectedTime
    applicationReviewReason {
      pointer
    }
  }
}
    ${FacShipDataFragmentDoc}` as unknown as DocumentNode<facDashShipDataQuery, facDashShipDataQueryVariables>;
export const getGameManagerDocument = gql`
    query getGameManager($id: String!) {
  GameManager(where: {id: {_eq: $id}}) {
    ...GameManagerData
  }
}
    ${GameManagerDataFragmentDoc}` as unknown as DocumentNode<getGameManagerQuery, getGameManagerQueryVariables>;
export const GetProjectsDocument = gql`
    query GetProjects($chainId: Int!) {
  Project(where: {chainId: {_eq: $chainId}}) {
    ...ProjectDetails
    metadata {
      ...RawMetadata
    }
  }
}
    ${ProjectDetailsFragmentDoc}
${RawMetadataFragmentDoc}` as unknown as DocumentNode<GetProjectsQuery, GetProjectsQueryVariables>;
export const GetUserProjectsDocument = gql`
    query GetUserProjects($id: String!) {
  Project(where: {owner: {_eq: $id}}) {
    ...ProjectDetails
    metadata {
      ...RawMetadata
    }
  }
}
    ${ProjectDetailsFragmentDoc}
${RawMetadataFragmentDoc}` as unknown as DocumentNode<GetUserProjectsQuery, GetUserProjectsQueryVariables>;
export const getShipFundsAvailableDocument = gql`
    query getShipFundsAvailable($id: String!) {
  GrantShip(where: {id: {_eq: $id}}) {
    totalAvailableFunds
  }
}
    ` as unknown as DocumentNode<getShipFundsAvailableQuery, getShipFundsAvailableQueryVariables>;
export const getShipIdByHatIdDocument = gql`
    query getShipIdByHatId($hatId: String!) {
  GrantShip(where: {hatId: {_eq: $hatId}}) {
    id
  }
}
    ` as unknown as DocumentNode<getShipIdByHatIdQuery, getShipIdByHatIdQueryVariables>;
export const getShipPoolIdDocument = gql`
    query getShipPoolId($id: String!) {
  GrantShip(where: {id: {_eq: $id}}) {
    poolId
  }
}
    ` as unknown as DocumentNode<getShipPoolIdQuery, getShipPoolIdQueryVariables>;
export const getUserDataDocument = gql`
    query getUserData($id: String) {
  projects: Project(where: {owner: {_eq: $id}}) {
    ...ProjectDetails
    metadata {
      ...RawMetadata
    }
  }
  shipApplicants: GrantShip(
    where: {isAwaitingApproval: {_eq: true}, owner: {_eq: $id}}
  ) {
    ...FacShipData
  }
}
    ${ProjectDetailsFragmentDoc}
${RawMetadataFragmentDoc}
${FacShipDataFragmentDoc}` as unknown as DocumentNode<getUserDataQuery, getUserDataQueryVariables>;
export const projectPageQueryDocument = gql`
    query projectPageQuery($id: String!) {
  Project(where: {id: {_eq: $id}}) {
    id
    profileId
    name
    status
    owner
    metadata {
      pointer
    }
    members {
      addresses
    }
  }
}
    ` as unknown as DocumentNode<projectPageQueryQuery, projectPageQueryQueryVariables>;










export type Requester<C = {}, E = unknown> = <R, V>(doc: DocumentNode, vars?: V, options?: C) => Promise<R> | AsyncIterable<R>
export function getSdk<C, E>(requester: Requester<C, E>) {
  return {
    facDashShipData(variables?: facDashShipDataQueryVariables, options?: C): Promise<facDashShipDataQuery> {
      return requester<facDashShipDataQuery, facDashShipDataQueryVariables>(facDashShipDataDocument, variables, options) as Promise<facDashShipDataQuery>;
    },
    getGameManager(variables: getGameManagerQueryVariables, options?: C): Promise<getGameManagerQuery> {
      return requester<getGameManagerQuery, getGameManagerQueryVariables>(getGameManagerDocument, variables, options) as Promise<getGameManagerQuery>;
    },
    GetProjects(variables: GetProjectsQueryVariables, options?: C): Promise<GetProjectsQuery> {
      return requester<GetProjectsQuery, GetProjectsQueryVariables>(GetProjectsDocument, variables, options) as Promise<GetProjectsQuery>;
    },
    GetUserProjects(variables: GetUserProjectsQueryVariables, options?: C): Promise<GetUserProjectsQuery> {
      return requester<GetUserProjectsQuery, GetUserProjectsQueryVariables>(GetUserProjectsDocument, variables, options) as Promise<GetUserProjectsQuery>;
    },
    getShipFundsAvailable(variables: getShipFundsAvailableQueryVariables, options?: C): Promise<getShipFundsAvailableQuery> {
      return requester<getShipFundsAvailableQuery, getShipFundsAvailableQueryVariables>(getShipFundsAvailableDocument, variables, options) as Promise<getShipFundsAvailableQuery>;
    },
    getShipIdByHatId(variables: getShipIdByHatIdQueryVariables, options?: C): Promise<getShipIdByHatIdQuery> {
      return requester<getShipIdByHatIdQuery, getShipIdByHatIdQueryVariables>(getShipIdByHatIdDocument, variables, options) as Promise<getShipIdByHatIdQuery>;
    },
    getShipPoolId(variables: getShipPoolIdQueryVariables, options?: C): Promise<getShipPoolIdQuery> {
      return requester<getShipPoolIdQuery, getShipPoolIdQueryVariables>(getShipPoolIdDocument, variables, options) as Promise<getShipPoolIdQuery>;
    },
    getUserData(variables?: getUserDataQueryVariables, options?: C): Promise<getUserDataQuery> {
      return requester<getUserDataQuery, getUserDataQueryVariables>(getUserDataDocument, variables, options) as Promise<getUserDataQuery>;
    },
    projectPageQuery(variables: projectPageQueryQueryVariables, options?: C): Promise<projectPageQueryQuery> {
      return requester<projectPageQueryQuery, projectPageQueryQueryVariables>(projectPageQueryDocument, variables, options) as Promise<projectPageQueryQuery>;
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;