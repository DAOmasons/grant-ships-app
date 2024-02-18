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
import BareMerger from "@graphql-mesh/merger-bare";
import { printWithCache } from '@graphql-mesh/utils';
import { createMeshHTTPHandler, MeshHTTPHandler } from '@graphql-mesh/http';
import { getMesh, ExecuteMeshFn, SubscribeMeshFn, MeshContext as BaseMeshContext, MeshInstance } from '@graphql-mesh/runtime';
import { MeshStore, FsStoreStorageAdapter } from '@graphql-mesh/store';
import { path as pathModule } from '@graphql-mesh/cross-helpers';
import { ImportFn } from '@graphql-mesh/types';
import type { GrantShipsTypes } from './sources/grant-ships/types';
import * as importedModule$0 from "./sources/grant-ships/introspectionSchema";
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
  BigDecimal: any;
  BigInt: any;
  Bytes: any;
  Int8: any;
};

export type BlockChangedFilter = {
  number_gte: Scalars['Int'];
};

export type Block_height = {
  hash?: InputMaybe<Scalars['Bytes']>;
  number?: InputMaybe<Scalars['Int']>;
  number_gte?: InputMaybe<Scalars['Int']>;
};

export type FeedItem = {
  id: Scalars['ID'];
  timestamp?: Maybe<Scalars['BigInt']>;
  content: Scalars['String'];
  sender: Scalars['Bytes'];
  tag: Scalars['String'];
  subjectMetadataPointer: Scalars['String'];
  subjectId: Scalars['ID'];
  objectId?: Maybe<Scalars['ID']>;
  subject: FeedItemEntity;
  object?: Maybe<FeedItemEntity>;
  embed?: Maybe<FeedItemEmbed>;
  details?: Maybe<Scalars['String']>;
};

export type FeedItemEmbed = {
  id: Scalars['ID'];
  key?: Maybe<Scalars['String']>;
  pointer?: Maybe<Scalars['String']>;
  protocol?: Maybe<Scalars['BigInt']>;
  content?: Maybe<Scalars['String']>;
};

export type FeedItemEmbed_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  key?: InputMaybe<Scalars['String']>;
  key_not?: InputMaybe<Scalars['String']>;
  key_gt?: InputMaybe<Scalars['String']>;
  key_lt?: InputMaybe<Scalars['String']>;
  key_gte?: InputMaybe<Scalars['String']>;
  key_lte?: InputMaybe<Scalars['String']>;
  key_in?: InputMaybe<Array<Scalars['String']>>;
  key_not_in?: InputMaybe<Array<Scalars['String']>>;
  key_contains?: InputMaybe<Scalars['String']>;
  key_contains_nocase?: InputMaybe<Scalars['String']>;
  key_not_contains?: InputMaybe<Scalars['String']>;
  key_not_contains_nocase?: InputMaybe<Scalars['String']>;
  key_starts_with?: InputMaybe<Scalars['String']>;
  key_starts_with_nocase?: InputMaybe<Scalars['String']>;
  key_not_starts_with?: InputMaybe<Scalars['String']>;
  key_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  key_ends_with?: InputMaybe<Scalars['String']>;
  key_ends_with_nocase?: InputMaybe<Scalars['String']>;
  key_not_ends_with?: InputMaybe<Scalars['String']>;
  key_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  pointer?: InputMaybe<Scalars['String']>;
  pointer_not?: InputMaybe<Scalars['String']>;
  pointer_gt?: InputMaybe<Scalars['String']>;
  pointer_lt?: InputMaybe<Scalars['String']>;
  pointer_gte?: InputMaybe<Scalars['String']>;
  pointer_lte?: InputMaybe<Scalars['String']>;
  pointer_in?: InputMaybe<Array<Scalars['String']>>;
  pointer_not_in?: InputMaybe<Array<Scalars['String']>>;
  pointer_contains?: InputMaybe<Scalars['String']>;
  pointer_contains_nocase?: InputMaybe<Scalars['String']>;
  pointer_not_contains?: InputMaybe<Scalars['String']>;
  pointer_not_contains_nocase?: InputMaybe<Scalars['String']>;
  pointer_starts_with?: InputMaybe<Scalars['String']>;
  pointer_starts_with_nocase?: InputMaybe<Scalars['String']>;
  pointer_not_starts_with?: InputMaybe<Scalars['String']>;
  pointer_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  pointer_ends_with?: InputMaybe<Scalars['String']>;
  pointer_ends_with_nocase?: InputMaybe<Scalars['String']>;
  pointer_not_ends_with?: InputMaybe<Scalars['String']>;
  pointer_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  protocol?: InputMaybe<Scalars['BigInt']>;
  protocol_not?: InputMaybe<Scalars['BigInt']>;
  protocol_gt?: InputMaybe<Scalars['BigInt']>;
  protocol_lt?: InputMaybe<Scalars['BigInt']>;
  protocol_gte?: InputMaybe<Scalars['BigInt']>;
  protocol_lte?: InputMaybe<Scalars['BigInt']>;
  protocol_in?: InputMaybe<Array<Scalars['BigInt']>>;
  protocol_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  content?: InputMaybe<Scalars['String']>;
  content_not?: InputMaybe<Scalars['String']>;
  content_gt?: InputMaybe<Scalars['String']>;
  content_lt?: InputMaybe<Scalars['String']>;
  content_gte?: InputMaybe<Scalars['String']>;
  content_lte?: InputMaybe<Scalars['String']>;
  content_in?: InputMaybe<Array<Scalars['String']>>;
  content_not_in?: InputMaybe<Array<Scalars['String']>>;
  content_contains?: InputMaybe<Scalars['String']>;
  content_contains_nocase?: InputMaybe<Scalars['String']>;
  content_not_contains?: InputMaybe<Scalars['String']>;
  content_not_contains_nocase?: InputMaybe<Scalars['String']>;
  content_starts_with?: InputMaybe<Scalars['String']>;
  content_starts_with_nocase?: InputMaybe<Scalars['String']>;
  content_not_starts_with?: InputMaybe<Scalars['String']>;
  content_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  content_ends_with?: InputMaybe<Scalars['String']>;
  content_ends_with_nocase?: InputMaybe<Scalars['String']>;
  content_not_ends_with?: InputMaybe<Scalars['String']>;
  content_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<FeedItemEmbed_filter>>>;
  or?: InputMaybe<Array<InputMaybe<FeedItemEmbed_filter>>>;
};

export type FeedItemEmbed_orderBy =
  | 'id'
  | 'key'
  | 'pointer'
  | 'protocol'
  | 'content';

export type FeedItemEntity = {
  id: Scalars['ID'];
  name: Scalars['String'];
  type: Scalars['String'];
};

export type FeedItemEntity_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
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
  type?: InputMaybe<Scalars['String']>;
  type_not?: InputMaybe<Scalars['String']>;
  type_gt?: InputMaybe<Scalars['String']>;
  type_lt?: InputMaybe<Scalars['String']>;
  type_gte?: InputMaybe<Scalars['String']>;
  type_lte?: InputMaybe<Scalars['String']>;
  type_in?: InputMaybe<Array<Scalars['String']>>;
  type_not_in?: InputMaybe<Array<Scalars['String']>>;
  type_contains?: InputMaybe<Scalars['String']>;
  type_contains_nocase?: InputMaybe<Scalars['String']>;
  type_not_contains?: InputMaybe<Scalars['String']>;
  type_not_contains_nocase?: InputMaybe<Scalars['String']>;
  type_starts_with?: InputMaybe<Scalars['String']>;
  type_starts_with_nocase?: InputMaybe<Scalars['String']>;
  type_not_starts_with?: InputMaybe<Scalars['String']>;
  type_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  type_ends_with?: InputMaybe<Scalars['String']>;
  type_ends_with_nocase?: InputMaybe<Scalars['String']>;
  type_not_ends_with?: InputMaybe<Scalars['String']>;
  type_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<FeedItemEntity_filter>>>;
  or?: InputMaybe<Array<InputMaybe<FeedItemEntity_filter>>>;
};

export type FeedItemEntity_orderBy =
  | 'id'
  | 'name'
  | 'type';

export type FeedItem_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  timestamp?: InputMaybe<Scalars['BigInt']>;
  timestamp_not?: InputMaybe<Scalars['BigInt']>;
  timestamp_gt?: InputMaybe<Scalars['BigInt']>;
  timestamp_lt?: InputMaybe<Scalars['BigInt']>;
  timestamp_gte?: InputMaybe<Scalars['BigInt']>;
  timestamp_lte?: InputMaybe<Scalars['BigInt']>;
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  content?: InputMaybe<Scalars['String']>;
  content_not?: InputMaybe<Scalars['String']>;
  content_gt?: InputMaybe<Scalars['String']>;
  content_lt?: InputMaybe<Scalars['String']>;
  content_gte?: InputMaybe<Scalars['String']>;
  content_lte?: InputMaybe<Scalars['String']>;
  content_in?: InputMaybe<Array<Scalars['String']>>;
  content_not_in?: InputMaybe<Array<Scalars['String']>>;
  content_contains?: InputMaybe<Scalars['String']>;
  content_contains_nocase?: InputMaybe<Scalars['String']>;
  content_not_contains?: InputMaybe<Scalars['String']>;
  content_not_contains_nocase?: InputMaybe<Scalars['String']>;
  content_starts_with?: InputMaybe<Scalars['String']>;
  content_starts_with_nocase?: InputMaybe<Scalars['String']>;
  content_not_starts_with?: InputMaybe<Scalars['String']>;
  content_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  content_ends_with?: InputMaybe<Scalars['String']>;
  content_ends_with_nocase?: InputMaybe<Scalars['String']>;
  content_not_ends_with?: InputMaybe<Scalars['String']>;
  content_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  sender?: InputMaybe<Scalars['Bytes']>;
  sender_not?: InputMaybe<Scalars['Bytes']>;
  sender_gt?: InputMaybe<Scalars['Bytes']>;
  sender_lt?: InputMaybe<Scalars['Bytes']>;
  sender_gte?: InputMaybe<Scalars['Bytes']>;
  sender_lte?: InputMaybe<Scalars['Bytes']>;
  sender_in?: InputMaybe<Array<Scalars['Bytes']>>;
  sender_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  sender_contains?: InputMaybe<Scalars['Bytes']>;
  sender_not_contains?: InputMaybe<Scalars['Bytes']>;
  tag?: InputMaybe<Scalars['String']>;
  tag_not?: InputMaybe<Scalars['String']>;
  tag_gt?: InputMaybe<Scalars['String']>;
  tag_lt?: InputMaybe<Scalars['String']>;
  tag_gte?: InputMaybe<Scalars['String']>;
  tag_lte?: InputMaybe<Scalars['String']>;
  tag_in?: InputMaybe<Array<Scalars['String']>>;
  tag_not_in?: InputMaybe<Array<Scalars['String']>>;
  tag_contains?: InputMaybe<Scalars['String']>;
  tag_contains_nocase?: InputMaybe<Scalars['String']>;
  tag_not_contains?: InputMaybe<Scalars['String']>;
  tag_not_contains_nocase?: InputMaybe<Scalars['String']>;
  tag_starts_with?: InputMaybe<Scalars['String']>;
  tag_starts_with_nocase?: InputMaybe<Scalars['String']>;
  tag_not_starts_with?: InputMaybe<Scalars['String']>;
  tag_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  tag_ends_with?: InputMaybe<Scalars['String']>;
  tag_ends_with_nocase?: InputMaybe<Scalars['String']>;
  tag_not_ends_with?: InputMaybe<Scalars['String']>;
  tag_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  subjectMetadataPointer?: InputMaybe<Scalars['String']>;
  subjectMetadataPointer_not?: InputMaybe<Scalars['String']>;
  subjectMetadataPointer_gt?: InputMaybe<Scalars['String']>;
  subjectMetadataPointer_lt?: InputMaybe<Scalars['String']>;
  subjectMetadataPointer_gte?: InputMaybe<Scalars['String']>;
  subjectMetadataPointer_lte?: InputMaybe<Scalars['String']>;
  subjectMetadataPointer_in?: InputMaybe<Array<Scalars['String']>>;
  subjectMetadataPointer_not_in?: InputMaybe<Array<Scalars['String']>>;
  subjectMetadataPointer_contains?: InputMaybe<Scalars['String']>;
  subjectMetadataPointer_contains_nocase?: InputMaybe<Scalars['String']>;
  subjectMetadataPointer_not_contains?: InputMaybe<Scalars['String']>;
  subjectMetadataPointer_not_contains_nocase?: InputMaybe<Scalars['String']>;
  subjectMetadataPointer_starts_with?: InputMaybe<Scalars['String']>;
  subjectMetadataPointer_starts_with_nocase?: InputMaybe<Scalars['String']>;
  subjectMetadataPointer_not_starts_with?: InputMaybe<Scalars['String']>;
  subjectMetadataPointer_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  subjectMetadataPointer_ends_with?: InputMaybe<Scalars['String']>;
  subjectMetadataPointer_ends_with_nocase?: InputMaybe<Scalars['String']>;
  subjectMetadataPointer_not_ends_with?: InputMaybe<Scalars['String']>;
  subjectMetadataPointer_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  subjectId?: InputMaybe<Scalars['ID']>;
  subjectId_not?: InputMaybe<Scalars['ID']>;
  subjectId_gt?: InputMaybe<Scalars['ID']>;
  subjectId_lt?: InputMaybe<Scalars['ID']>;
  subjectId_gte?: InputMaybe<Scalars['ID']>;
  subjectId_lte?: InputMaybe<Scalars['ID']>;
  subjectId_in?: InputMaybe<Array<Scalars['ID']>>;
  subjectId_not_in?: InputMaybe<Array<Scalars['ID']>>;
  objectId?: InputMaybe<Scalars['ID']>;
  objectId_not?: InputMaybe<Scalars['ID']>;
  objectId_gt?: InputMaybe<Scalars['ID']>;
  objectId_lt?: InputMaybe<Scalars['ID']>;
  objectId_gte?: InputMaybe<Scalars['ID']>;
  objectId_lte?: InputMaybe<Scalars['ID']>;
  objectId_in?: InputMaybe<Array<Scalars['ID']>>;
  objectId_not_in?: InputMaybe<Array<Scalars['ID']>>;
  subject?: InputMaybe<Scalars['String']>;
  subject_not?: InputMaybe<Scalars['String']>;
  subject_gt?: InputMaybe<Scalars['String']>;
  subject_lt?: InputMaybe<Scalars['String']>;
  subject_gte?: InputMaybe<Scalars['String']>;
  subject_lte?: InputMaybe<Scalars['String']>;
  subject_in?: InputMaybe<Array<Scalars['String']>>;
  subject_not_in?: InputMaybe<Array<Scalars['String']>>;
  subject_contains?: InputMaybe<Scalars['String']>;
  subject_contains_nocase?: InputMaybe<Scalars['String']>;
  subject_not_contains?: InputMaybe<Scalars['String']>;
  subject_not_contains_nocase?: InputMaybe<Scalars['String']>;
  subject_starts_with?: InputMaybe<Scalars['String']>;
  subject_starts_with_nocase?: InputMaybe<Scalars['String']>;
  subject_not_starts_with?: InputMaybe<Scalars['String']>;
  subject_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  subject_ends_with?: InputMaybe<Scalars['String']>;
  subject_ends_with_nocase?: InputMaybe<Scalars['String']>;
  subject_not_ends_with?: InputMaybe<Scalars['String']>;
  subject_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  subject_?: InputMaybe<FeedItemEntity_filter>;
  object?: InputMaybe<Scalars['String']>;
  object_not?: InputMaybe<Scalars['String']>;
  object_gt?: InputMaybe<Scalars['String']>;
  object_lt?: InputMaybe<Scalars['String']>;
  object_gte?: InputMaybe<Scalars['String']>;
  object_lte?: InputMaybe<Scalars['String']>;
  object_in?: InputMaybe<Array<Scalars['String']>>;
  object_not_in?: InputMaybe<Array<Scalars['String']>>;
  object_contains?: InputMaybe<Scalars['String']>;
  object_contains_nocase?: InputMaybe<Scalars['String']>;
  object_not_contains?: InputMaybe<Scalars['String']>;
  object_not_contains_nocase?: InputMaybe<Scalars['String']>;
  object_starts_with?: InputMaybe<Scalars['String']>;
  object_starts_with_nocase?: InputMaybe<Scalars['String']>;
  object_not_starts_with?: InputMaybe<Scalars['String']>;
  object_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  object_ends_with?: InputMaybe<Scalars['String']>;
  object_ends_with_nocase?: InputMaybe<Scalars['String']>;
  object_not_ends_with?: InputMaybe<Scalars['String']>;
  object_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  object_?: InputMaybe<FeedItemEntity_filter>;
  embed?: InputMaybe<Scalars['String']>;
  embed_not?: InputMaybe<Scalars['String']>;
  embed_gt?: InputMaybe<Scalars['String']>;
  embed_lt?: InputMaybe<Scalars['String']>;
  embed_gte?: InputMaybe<Scalars['String']>;
  embed_lte?: InputMaybe<Scalars['String']>;
  embed_in?: InputMaybe<Array<Scalars['String']>>;
  embed_not_in?: InputMaybe<Array<Scalars['String']>>;
  embed_contains?: InputMaybe<Scalars['String']>;
  embed_contains_nocase?: InputMaybe<Scalars['String']>;
  embed_not_contains?: InputMaybe<Scalars['String']>;
  embed_not_contains_nocase?: InputMaybe<Scalars['String']>;
  embed_starts_with?: InputMaybe<Scalars['String']>;
  embed_starts_with_nocase?: InputMaybe<Scalars['String']>;
  embed_not_starts_with?: InputMaybe<Scalars['String']>;
  embed_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  embed_ends_with?: InputMaybe<Scalars['String']>;
  embed_ends_with_nocase?: InputMaybe<Scalars['String']>;
  embed_not_ends_with?: InputMaybe<Scalars['String']>;
  embed_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  embed_?: InputMaybe<FeedItemEmbed_filter>;
  details?: InputMaybe<Scalars['String']>;
  details_not?: InputMaybe<Scalars['String']>;
  details_gt?: InputMaybe<Scalars['String']>;
  details_lt?: InputMaybe<Scalars['String']>;
  details_gte?: InputMaybe<Scalars['String']>;
  details_lte?: InputMaybe<Scalars['String']>;
  details_in?: InputMaybe<Array<Scalars['String']>>;
  details_not_in?: InputMaybe<Array<Scalars['String']>>;
  details_contains?: InputMaybe<Scalars['String']>;
  details_contains_nocase?: InputMaybe<Scalars['String']>;
  details_not_contains?: InputMaybe<Scalars['String']>;
  details_not_contains_nocase?: InputMaybe<Scalars['String']>;
  details_starts_with?: InputMaybe<Scalars['String']>;
  details_starts_with_nocase?: InputMaybe<Scalars['String']>;
  details_not_starts_with?: InputMaybe<Scalars['String']>;
  details_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  details_ends_with?: InputMaybe<Scalars['String']>;
  details_ends_with_nocase?: InputMaybe<Scalars['String']>;
  details_not_ends_with?: InputMaybe<Scalars['String']>;
  details_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<FeedItem_filter>>>;
  or?: InputMaybe<Array<InputMaybe<FeedItem_filter>>>;
};

export type FeedItem_orderBy =
  | 'id'
  | 'timestamp'
  | 'content'
  | 'sender'
  | 'tag'
  | 'subjectMetadataPointer'
  | 'subjectId'
  | 'objectId'
  | 'subject'
  | 'subject__id'
  | 'subject__name'
  | 'subject__type'
  | 'object'
  | 'object__id'
  | 'object__name'
  | 'object__type'
  | 'embed'
  | 'embed__id'
  | 'embed__key'
  | 'embed__pointer'
  | 'embed__protocol'
  | 'embed__content'
  | 'details';

export type GameManager = {
  id: Scalars['Bytes'];
  gameFacilitatorId: Scalars['BigInt'];
  rootAccount: Scalars['Bytes'];
  tokenAddress: Scalars['Bytes'];
  currentRoundId: Scalars['BigInt'];
  currentRound?: Maybe<GameRound>;
  poolFunds: Scalars['BigInt'];
};

export type GameManager_filter = {
  id?: InputMaybe<Scalars['Bytes']>;
  id_not?: InputMaybe<Scalars['Bytes']>;
  id_gt?: InputMaybe<Scalars['Bytes']>;
  id_lt?: InputMaybe<Scalars['Bytes']>;
  id_gte?: InputMaybe<Scalars['Bytes']>;
  id_lte?: InputMaybe<Scalars['Bytes']>;
  id_in?: InputMaybe<Array<Scalars['Bytes']>>;
  id_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  id_contains?: InputMaybe<Scalars['Bytes']>;
  id_not_contains?: InputMaybe<Scalars['Bytes']>;
  gameFacilitatorId?: InputMaybe<Scalars['BigInt']>;
  gameFacilitatorId_not?: InputMaybe<Scalars['BigInt']>;
  gameFacilitatorId_gt?: InputMaybe<Scalars['BigInt']>;
  gameFacilitatorId_lt?: InputMaybe<Scalars['BigInt']>;
  gameFacilitatorId_gte?: InputMaybe<Scalars['BigInt']>;
  gameFacilitatorId_lte?: InputMaybe<Scalars['BigInt']>;
  gameFacilitatorId_in?: InputMaybe<Array<Scalars['BigInt']>>;
  gameFacilitatorId_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  rootAccount?: InputMaybe<Scalars['Bytes']>;
  rootAccount_not?: InputMaybe<Scalars['Bytes']>;
  rootAccount_gt?: InputMaybe<Scalars['Bytes']>;
  rootAccount_lt?: InputMaybe<Scalars['Bytes']>;
  rootAccount_gte?: InputMaybe<Scalars['Bytes']>;
  rootAccount_lte?: InputMaybe<Scalars['Bytes']>;
  rootAccount_in?: InputMaybe<Array<Scalars['Bytes']>>;
  rootAccount_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  rootAccount_contains?: InputMaybe<Scalars['Bytes']>;
  rootAccount_not_contains?: InputMaybe<Scalars['Bytes']>;
  tokenAddress?: InputMaybe<Scalars['Bytes']>;
  tokenAddress_not?: InputMaybe<Scalars['Bytes']>;
  tokenAddress_gt?: InputMaybe<Scalars['Bytes']>;
  tokenAddress_lt?: InputMaybe<Scalars['Bytes']>;
  tokenAddress_gte?: InputMaybe<Scalars['Bytes']>;
  tokenAddress_lte?: InputMaybe<Scalars['Bytes']>;
  tokenAddress_in?: InputMaybe<Array<Scalars['Bytes']>>;
  tokenAddress_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  tokenAddress_contains?: InputMaybe<Scalars['Bytes']>;
  tokenAddress_not_contains?: InputMaybe<Scalars['Bytes']>;
  currentRoundId?: InputMaybe<Scalars['BigInt']>;
  currentRoundId_not?: InputMaybe<Scalars['BigInt']>;
  currentRoundId_gt?: InputMaybe<Scalars['BigInt']>;
  currentRoundId_lt?: InputMaybe<Scalars['BigInt']>;
  currentRoundId_gte?: InputMaybe<Scalars['BigInt']>;
  currentRoundId_lte?: InputMaybe<Scalars['BigInt']>;
  currentRoundId_in?: InputMaybe<Array<Scalars['BigInt']>>;
  currentRoundId_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  currentRound?: InputMaybe<Scalars['String']>;
  currentRound_not?: InputMaybe<Scalars['String']>;
  currentRound_gt?: InputMaybe<Scalars['String']>;
  currentRound_lt?: InputMaybe<Scalars['String']>;
  currentRound_gte?: InputMaybe<Scalars['String']>;
  currentRound_lte?: InputMaybe<Scalars['String']>;
  currentRound_in?: InputMaybe<Array<Scalars['String']>>;
  currentRound_not_in?: InputMaybe<Array<Scalars['String']>>;
  currentRound_contains?: InputMaybe<Scalars['String']>;
  currentRound_contains_nocase?: InputMaybe<Scalars['String']>;
  currentRound_not_contains?: InputMaybe<Scalars['String']>;
  currentRound_not_contains_nocase?: InputMaybe<Scalars['String']>;
  currentRound_starts_with?: InputMaybe<Scalars['String']>;
  currentRound_starts_with_nocase?: InputMaybe<Scalars['String']>;
  currentRound_not_starts_with?: InputMaybe<Scalars['String']>;
  currentRound_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  currentRound_ends_with?: InputMaybe<Scalars['String']>;
  currentRound_ends_with_nocase?: InputMaybe<Scalars['String']>;
  currentRound_not_ends_with?: InputMaybe<Scalars['String']>;
  currentRound_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  currentRound_?: InputMaybe<GameRound_filter>;
  poolFunds?: InputMaybe<Scalars['BigInt']>;
  poolFunds_not?: InputMaybe<Scalars['BigInt']>;
  poolFunds_gt?: InputMaybe<Scalars['BigInt']>;
  poolFunds_lt?: InputMaybe<Scalars['BigInt']>;
  poolFunds_gte?: InputMaybe<Scalars['BigInt']>;
  poolFunds_lte?: InputMaybe<Scalars['BigInt']>;
  poolFunds_in?: InputMaybe<Array<Scalars['BigInt']>>;
  poolFunds_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<GameManager_filter>>>;
  or?: InputMaybe<Array<InputMaybe<GameManager_filter>>>;
};

export type GameManager_orderBy =
  | 'id'
  | 'gameFacilitatorId'
  | 'rootAccount'
  | 'tokenAddress'
  | 'currentRoundId'
  | 'currentRound'
  | 'currentRound__id'
  | 'currentRound__startTime'
  | 'currentRound__endTime'
  | 'currentRound__totalRoundAmount'
  | 'currentRound__totalAllocatedAmount'
  | 'currentRound__gameStatus'
  | 'poolFunds';

export type GameRound = {
  id: Scalars['ID'];
  startTime: Scalars['BigInt'];
  endTime: Scalars['BigInt'];
  totalRoundAmount: Scalars['BigInt'];
  totalAllocatedAmount: Scalars['BigInt'];
  gameStatus: Scalars['Int'];
  ships: Array<GrantShip>;
};


export type GameRoundshipsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<GrantShip_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<GrantShip_filter>;
};

export type GameRound_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  startTime?: InputMaybe<Scalars['BigInt']>;
  startTime_not?: InputMaybe<Scalars['BigInt']>;
  startTime_gt?: InputMaybe<Scalars['BigInt']>;
  startTime_lt?: InputMaybe<Scalars['BigInt']>;
  startTime_gte?: InputMaybe<Scalars['BigInt']>;
  startTime_lte?: InputMaybe<Scalars['BigInt']>;
  startTime_in?: InputMaybe<Array<Scalars['BigInt']>>;
  startTime_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  endTime?: InputMaybe<Scalars['BigInt']>;
  endTime_not?: InputMaybe<Scalars['BigInt']>;
  endTime_gt?: InputMaybe<Scalars['BigInt']>;
  endTime_lt?: InputMaybe<Scalars['BigInt']>;
  endTime_gte?: InputMaybe<Scalars['BigInt']>;
  endTime_lte?: InputMaybe<Scalars['BigInt']>;
  endTime_in?: InputMaybe<Array<Scalars['BigInt']>>;
  endTime_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  totalRoundAmount?: InputMaybe<Scalars['BigInt']>;
  totalRoundAmount_not?: InputMaybe<Scalars['BigInt']>;
  totalRoundAmount_gt?: InputMaybe<Scalars['BigInt']>;
  totalRoundAmount_lt?: InputMaybe<Scalars['BigInt']>;
  totalRoundAmount_gte?: InputMaybe<Scalars['BigInt']>;
  totalRoundAmount_lte?: InputMaybe<Scalars['BigInt']>;
  totalRoundAmount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  totalRoundAmount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  totalAllocatedAmount?: InputMaybe<Scalars['BigInt']>;
  totalAllocatedAmount_not?: InputMaybe<Scalars['BigInt']>;
  totalAllocatedAmount_gt?: InputMaybe<Scalars['BigInt']>;
  totalAllocatedAmount_lt?: InputMaybe<Scalars['BigInt']>;
  totalAllocatedAmount_gte?: InputMaybe<Scalars['BigInt']>;
  totalAllocatedAmount_lte?: InputMaybe<Scalars['BigInt']>;
  totalAllocatedAmount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  totalAllocatedAmount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  gameStatus?: InputMaybe<Scalars['Int']>;
  gameStatus_not?: InputMaybe<Scalars['Int']>;
  gameStatus_gt?: InputMaybe<Scalars['Int']>;
  gameStatus_lt?: InputMaybe<Scalars['Int']>;
  gameStatus_gte?: InputMaybe<Scalars['Int']>;
  gameStatus_lte?: InputMaybe<Scalars['Int']>;
  gameStatus_in?: InputMaybe<Array<Scalars['Int']>>;
  gameStatus_not_in?: InputMaybe<Array<Scalars['Int']>>;
  ships?: InputMaybe<Array<Scalars['String']>>;
  ships_not?: InputMaybe<Array<Scalars['String']>>;
  ships_contains?: InputMaybe<Array<Scalars['String']>>;
  ships_contains_nocase?: InputMaybe<Array<Scalars['String']>>;
  ships_not_contains?: InputMaybe<Array<Scalars['String']>>;
  ships_not_contains_nocase?: InputMaybe<Array<Scalars['String']>>;
  ships_?: InputMaybe<GrantShip_filter>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<GameRound_filter>>>;
  or?: InputMaybe<Array<InputMaybe<GameRound_filter>>>;
};

export type GameRound_orderBy =
  | 'id'
  | 'startTime'
  | 'endTime'
  | 'totalRoundAmount'
  | 'totalAllocatedAmount'
  | 'gameStatus'
  | 'ships';

export type GrantShip = {
  id: Scalars['Bytes'];
  profileId: Scalars['Bytes'];
  nonce: Scalars['BigInt'];
  name: Scalars['String'];
  profileMetadata: RawMetadata;
  owner: Scalars['Bytes'];
  anchor: Scalars['Bytes'];
  blockNumber: Scalars['BigInt'];
  blockTimestamp: Scalars['BigInt'];
  transactionHash: Scalars['Bytes'];
  status: Scalars['Int'];
  alloProfileMembers?: Maybe<ProfileMemberGroup>;
  shipApplicationBytesData?: Maybe<Scalars['Bytes']>;
  applicationSubmittedTime?: Maybe<Scalars['BigInt']>;
  isAwaitingApproval?: Maybe<Scalars['Boolean']>;
  hasSubmittedApplication?: Maybe<Scalars['Boolean']>;
  isApproved?: Maybe<Scalars['Boolean']>;
  approvedTime?: Maybe<Scalars['BigInt']>;
  isRejected?: Maybe<Scalars['Boolean']>;
  rejectedTime?: Maybe<Scalars['BigInt']>;
  applicationReviewReason?: Maybe<RawMetadata>;
  poolId?: Maybe<Scalars['BigInt']>;
  shipContractAddress?: Maybe<Scalars['Bytes']>;
  shipLaunched?: Maybe<Scalars['Boolean']>;
  isAllocated?: Maybe<Scalars['Boolean']>;
  allocatedAmount?: Maybe<Scalars['BigInt']>;
  isDistributed?: Maybe<Scalars['Boolean']>;
  distributedAmount?: Maybe<Scalars['BigInt']>;
};

export type GrantShipLookup = {
  id: Scalars['Bytes'];
  anchorAddress: Scalars['Bytes'];
};

export type GrantShipLookup_filter = {
  id?: InputMaybe<Scalars['Bytes']>;
  id_not?: InputMaybe<Scalars['Bytes']>;
  id_gt?: InputMaybe<Scalars['Bytes']>;
  id_lt?: InputMaybe<Scalars['Bytes']>;
  id_gte?: InputMaybe<Scalars['Bytes']>;
  id_lte?: InputMaybe<Scalars['Bytes']>;
  id_in?: InputMaybe<Array<Scalars['Bytes']>>;
  id_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  id_contains?: InputMaybe<Scalars['Bytes']>;
  id_not_contains?: InputMaybe<Scalars['Bytes']>;
  anchorAddress?: InputMaybe<Scalars['Bytes']>;
  anchorAddress_not?: InputMaybe<Scalars['Bytes']>;
  anchorAddress_gt?: InputMaybe<Scalars['Bytes']>;
  anchorAddress_lt?: InputMaybe<Scalars['Bytes']>;
  anchorAddress_gte?: InputMaybe<Scalars['Bytes']>;
  anchorAddress_lte?: InputMaybe<Scalars['Bytes']>;
  anchorAddress_in?: InputMaybe<Array<Scalars['Bytes']>>;
  anchorAddress_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  anchorAddress_contains?: InputMaybe<Scalars['Bytes']>;
  anchorAddress_not_contains?: InputMaybe<Scalars['Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<GrantShipLookup_filter>>>;
  or?: InputMaybe<Array<InputMaybe<GrantShipLookup_filter>>>;
};

export type GrantShipLookup_orderBy =
  | 'id'
  | 'anchorAddress';

export type GrantShip_filter = {
  id?: InputMaybe<Scalars['Bytes']>;
  id_not?: InputMaybe<Scalars['Bytes']>;
  id_gt?: InputMaybe<Scalars['Bytes']>;
  id_lt?: InputMaybe<Scalars['Bytes']>;
  id_gte?: InputMaybe<Scalars['Bytes']>;
  id_lte?: InputMaybe<Scalars['Bytes']>;
  id_in?: InputMaybe<Array<Scalars['Bytes']>>;
  id_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  id_contains?: InputMaybe<Scalars['Bytes']>;
  id_not_contains?: InputMaybe<Scalars['Bytes']>;
  profileId?: InputMaybe<Scalars['Bytes']>;
  profileId_not?: InputMaybe<Scalars['Bytes']>;
  profileId_gt?: InputMaybe<Scalars['Bytes']>;
  profileId_lt?: InputMaybe<Scalars['Bytes']>;
  profileId_gte?: InputMaybe<Scalars['Bytes']>;
  profileId_lte?: InputMaybe<Scalars['Bytes']>;
  profileId_in?: InputMaybe<Array<Scalars['Bytes']>>;
  profileId_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  profileId_contains?: InputMaybe<Scalars['Bytes']>;
  profileId_not_contains?: InputMaybe<Scalars['Bytes']>;
  nonce?: InputMaybe<Scalars['BigInt']>;
  nonce_not?: InputMaybe<Scalars['BigInt']>;
  nonce_gt?: InputMaybe<Scalars['BigInt']>;
  nonce_lt?: InputMaybe<Scalars['BigInt']>;
  nonce_gte?: InputMaybe<Scalars['BigInt']>;
  nonce_lte?: InputMaybe<Scalars['BigInt']>;
  nonce_in?: InputMaybe<Array<Scalars['BigInt']>>;
  nonce_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
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
  profileMetadata?: InputMaybe<Scalars['String']>;
  profileMetadata_not?: InputMaybe<Scalars['String']>;
  profileMetadata_gt?: InputMaybe<Scalars['String']>;
  profileMetadata_lt?: InputMaybe<Scalars['String']>;
  profileMetadata_gte?: InputMaybe<Scalars['String']>;
  profileMetadata_lte?: InputMaybe<Scalars['String']>;
  profileMetadata_in?: InputMaybe<Array<Scalars['String']>>;
  profileMetadata_not_in?: InputMaybe<Array<Scalars['String']>>;
  profileMetadata_contains?: InputMaybe<Scalars['String']>;
  profileMetadata_contains_nocase?: InputMaybe<Scalars['String']>;
  profileMetadata_not_contains?: InputMaybe<Scalars['String']>;
  profileMetadata_not_contains_nocase?: InputMaybe<Scalars['String']>;
  profileMetadata_starts_with?: InputMaybe<Scalars['String']>;
  profileMetadata_starts_with_nocase?: InputMaybe<Scalars['String']>;
  profileMetadata_not_starts_with?: InputMaybe<Scalars['String']>;
  profileMetadata_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  profileMetadata_ends_with?: InputMaybe<Scalars['String']>;
  profileMetadata_ends_with_nocase?: InputMaybe<Scalars['String']>;
  profileMetadata_not_ends_with?: InputMaybe<Scalars['String']>;
  profileMetadata_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  profileMetadata_?: InputMaybe<RawMetadata_filter>;
  owner?: InputMaybe<Scalars['Bytes']>;
  owner_not?: InputMaybe<Scalars['Bytes']>;
  owner_gt?: InputMaybe<Scalars['Bytes']>;
  owner_lt?: InputMaybe<Scalars['Bytes']>;
  owner_gte?: InputMaybe<Scalars['Bytes']>;
  owner_lte?: InputMaybe<Scalars['Bytes']>;
  owner_in?: InputMaybe<Array<Scalars['Bytes']>>;
  owner_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  owner_contains?: InputMaybe<Scalars['Bytes']>;
  owner_not_contains?: InputMaybe<Scalars['Bytes']>;
  anchor?: InputMaybe<Scalars['Bytes']>;
  anchor_not?: InputMaybe<Scalars['Bytes']>;
  anchor_gt?: InputMaybe<Scalars['Bytes']>;
  anchor_lt?: InputMaybe<Scalars['Bytes']>;
  anchor_gte?: InputMaybe<Scalars['Bytes']>;
  anchor_lte?: InputMaybe<Scalars['Bytes']>;
  anchor_in?: InputMaybe<Array<Scalars['Bytes']>>;
  anchor_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  anchor_contains?: InputMaybe<Scalars['Bytes']>;
  anchor_not_contains?: InputMaybe<Scalars['Bytes']>;
  blockNumber?: InputMaybe<Scalars['BigInt']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockTimestamp?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_not?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_gt?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_lt?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_gte?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_lte?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  transactionHash?: InputMaybe<Scalars['Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['Bytes']>;
  transactionHash_gt?: InputMaybe<Scalars['Bytes']>;
  transactionHash_lt?: InputMaybe<Scalars['Bytes']>;
  transactionHash_gte?: InputMaybe<Scalars['Bytes']>;
  transactionHash_lte?: InputMaybe<Scalars['Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['Bytes']>;
  status?: InputMaybe<Scalars['Int']>;
  status_not?: InputMaybe<Scalars['Int']>;
  status_gt?: InputMaybe<Scalars['Int']>;
  status_lt?: InputMaybe<Scalars['Int']>;
  status_gte?: InputMaybe<Scalars['Int']>;
  status_lte?: InputMaybe<Scalars['Int']>;
  status_in?: InputMaybe<Array<Scalars['Int']>>;
  status_not_in?: InputMaybe<Array<Scalars['Int']>>;
  alloProfileMembers?: InputMaybe<Scalars['String']>;
  alloProfileMembers_not?: InputMaybe<Scalars['String']>;
  alloProfileMembers_gt?: InputMaybe<Scalars['String']>;
  alloProfileMembers_lt?: InputMaybe<Scalars['String']>;
  alloProfileMembers_gte?: InputMaybe<Scalars['String']>;
  alloProfileMembers_lte?: InputMaybe<Scalars['String']>;
  alloProfileMembers_in?: InputMaybe<Array<Scalars['String']>>;
  alloProfileMembers_not_in?: InputMaybe<Array<Scalars['String']>>;
  alloProfileMembers_contains?: InputMaybe<Scalars['String']>;
  alloProfileMembers_contains_nocase?: InputMaybe<Scalars['String']>;
  alloProfileMembers_not_contains?: InputMaybe<Scalars['String']>;
  alloProfileMembers_not_contains_nocase?: InputMaybe<Scalars['String']>;
  alloProfileMembers_starts_with?: InputMaybe<Scalars['String']>;
  alloProfileMembers_starts_with_nocase?: InputMaybe<Scalars['String']>;
  alloProfileMembers_not_starts_with?: InputMaybe<Scalars['String']>;
  alloProfileMembers_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  alloProfileMembers_ends_with?: InputMaybe<Scalars['String']>;
  alloProfileMembers_ends_with_nocase?: InputMaybe<Scalars['String']>;
  alloProfileMembers_not_ends_with?: InputMaybe<Scalars['String']>;
  alloProfileMembers_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  alloProfileMembers_?: InputMaybe<ProfileMemberGroup_filter>;
  shipApplicationBytesData?: InputMaybe<Scalars['Bytes']>;
  shipApplicationBytesData_not?: InputMaybe<Scalars['Bytes']>;
  shipApplicationBytesData_gt?: InputMaybe<Scalars['Bytes']>;
  shipApplicationBytesData_lt?: InputMaybe<Scalars['Bytes']>;
  shipApplicationBytesData_gte?: InputMaybe<Scalars['Bytes']>;
  shipApplicationBytesData_lte?: InputMaybe<Scalars['Bytes']>;
  shipApplicationBytesData_in?: InputMaybe<Array<Scalars['Bytes']>>;
  shipApplicationBytesData_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  shipApplicationBytesData_contains?: InputMaybe<Scalars['Bytes']>;
  shipApplicationBytesData_not_contains?: InputMaybe<Scalars['Bytes']>;
  applicationSubmittedTime?: InputMaybe<Scalars['BigInt']>;
  applicationSubmittedTime_not?: InputMaybe<Scalars['BigInt']>;
  applicationSubmittedTime_gt?: InputMaybe<Scalars['BigInt']>;
  applicationSubmittedTime_lt?: InputMaybe<Scalars['BigInt']>;
  applicationSubmittedTime_gte?: InputMaybe<Scalars['BigInt']>;
  applicationSubmittedTime_lte?: InputMaybe<Scalars['BigInt']>;
  applicationSubmittedTime_in?: InputMaybe<Array<Scalars['BigInt']>>;
  applicationSubmittedTime_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  isAwaitingApproval?: InputMaybe<Scalars['Boolean']>;
  isAwaitingApproval_not?: InputMaybe<Scalars['Boolean']>;
  isAwaitingApproval_in?: InputMaybe<Array<Scalars['Boolean']>>;
  isAwaitingApproval_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  hasSubmittedApplication?: InputMaybe<Scalars['Boolean']>;
  hasSubmittedApplication_not?: InputMaybe<Scalars['Boolean']>;
  hasSubmittedApplication_in?: InputMaybe<Array<Scalars['Boolean']>>;
  hasSubmittedApplication_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  isApproved?: InputMaybe<Scalars['Boolean']>;
  isApproved_not?: InputMaybe<Scalars['Boolean']>;
  isApproved_in?: InputMaybe<Array<Scalars['Boolean']>>;
  isApproved_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  approvedTime?: InputMaybe<Scalars['BigInt']>;
  approvedTime_not?: InputMaybe<Scalars['BigInt']>;
  approvedTime_gt?: InputMaybe<Scalars['BigInt']>;
  approvedTime_lt?: InputMaybe<Scalars['BigInt']>;
  approvedTime_gte?: InputMaybe<Scalars['BigInt']>;
  approvedTime_lte?: InputMaybe<Scalars['BigInt']>;
  approvedTime_in?: InputMaybe<Array<Scalars['BigInt']>>;
  approvedTime_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  isRejected?: InputMaybe<Scalars['Boolean']>;
  isRejected_not?: InputMaybe<Scalars['Boolean']>;
  isRejected_in?: InputMaybe<Array<Scalars['Boolean']>>;
  isRejected_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  rejectedTime?: InputMaybe<Scalars['BigInt']>;
  rejectedTime_not?: InputMaybe<Scalars['BigInt']>;
  rejectedTime_gt?: InputMaybe<Scalars['BigInt']>;
  rejectedTime_lt?: InputMaybe<Scalars['BigInt']>;
  rejectedTime_gte?: InputMaybe<Scalars['BigInt']>;
  rejectedTime_lte?: InputMaybe<Scalars['BigInt']>;
  rejectedTime_in?: InputMaybe<Array<Scalars['BigInt']>>;
  rejectedTime_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  applicationReviewReason?: InputMaybe<Scalars['String']>;
  applicationReviewReason_not?: InputMaybe<Scalars['String']>;
  applicationReviewReason_gt?: InputMaybe<Scalars['String']>;
  applicationReviewReason_lt?: InputMaybe<Scalars['String']>;
  applicationReviewReason_gte?: InputMaybe<Scalars['String']>;
  applicationReviewReason_lte?: InputMaybe<Scalars['String']>;
  applicationReviewReason_in?: InputMaybe<Array<Scalars['String']>>;
  applicationReviewReason_not_in?: InputMaybe<Array<Scalars['String']>>;
  applicationReviewReason_contains?: InputMaybe<Scalars['String']>;
  applicationReviewReason_contains_nocase?: InputMaybe<Scalars['String']>;
  applicationReviewReason_not_contains?: InputMaybe<Scalars['String']>;
  applicationReviewReason_not_contains_nocase?: InputMaybe<Scalars['String']>;
  applicationReviewReason_starts_with?: InputMaybe<Scalars['String']>;
  applicationReviewReason_starts_with_nocase?: InputMaybe<Scalars['String']>;
  applicationReviewReason_not_starts_with?: InputMaybe<Scalars['String']>;
  applicationReviewReason_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  applicationReviewReason_ends_with?: InputMaybe<Scalars['String']>;
  applicationReviewReason_ends_with_nocase?: InputMaybe<Scalars['String']>;
  applicationReviewReason_not_ends_with?: InputMaybe<Scalars['String']>;
  applicationReviewReason_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  applicationReviewReason_?: InputMaybe<RawMetadata_filter>;
  poolId?: InputMaybe<Scalars['BigInt']>;
  poolId_not?: InputMaybe<Scalars['BigInt']>;
  poolId_gt?: InputMaybe<Scalars['BigInt']>;
  poolId_lt?: InputMaybe<Scalars['BigInt']>;
  poolId_gte?: InputMaybe<Scalars['BigInt']>;
  poolId_lte?: InputMaybe<Scalars['BigInt']>;
  poolId_in?: InputMaybe<Array<Scalars['BigInt']>>;
  poolId_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  shipContractAddress?: InputMaybe<Scalars['Bytes']>;
  shipContractAddress_not?: InputMaybe<Scalars['Bytes']>;
  shipContractAddress_gt?: InputMaybe<Scalars['Bytes']>;
  shipContractAddress_lt?: InputMaybe<Scalars['Bytes']>;
  shipContractAddress_gte?: InputMaybe<Scalars['Bytes']>;
  shipContractAddress_lte?: InputMaybe<Scalars['Bytes']>;
  shipContractAddress_in?: InputMaybe<Array<Scalars['Bytes']>>;
  shipContractAddress_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  shipContractAddress_contains?: InputMaybe<Scalars['Bytes']>;
  shipContractAddress_not_contains?: InputMaybe<Scalars['Bytes']>;
  shipLaunched?: InputMaybe<Scalars['Boolean']>;
  shipLaunched_not?: InputMaybe<Scalars['Boolean']>;
  shipLaunched_in?: InputMaybe<Array<Scalars['Boolean']>>;
  shipLaunched_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  isAllocated?: InputMaybe<Scalars['Boolean']>;
  isAllocated_not?: InputMaybe<Scalars['Boolean']>;
  isAllocated_in?: InputMaybe<Array<Scalars['Boolean']>>;
  isAllocated_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  allocatedAmount?: InputMaybe<Scalars['BigInt']>;
  allocatedAmount_not?: InputMaybe<Scalars['BigInt']>;
  allocatedAmount_gt?: InputMaybe<Scalars['BigInt']>;
  allocatedAmount_lt?: InputMaybe<Scalars['BigInt']>;
  allocatedAmount_gte?: InputMaybe<Scalars['BigInt']>;
  allocatedAmount_lte?: InputMaybe<Scalars['BigInt']>;
  allocatedAmount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  allocatedAmount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  isDistributed?: InputMaybe<Scalars['Boolean']>;
  isDistributed_not?: InputMaybe<Scalars['Boolean']>;
  isDistributed_in?: InputMaybe<Array<Scalars['Boolean']>>;
  isDistributed_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  distributedAmount?: InputMaybe<Scalars['BigInt']>;
  distributedAmount_not?: InputMaybe<Scalars['BigInt']>;
  distributedAmount_gt?: InputMaybe<Scalars['BigInt']>;
  distributedAmount_lt?: InputMaybe<Scalars['BigInt']>;
  distributedAmount_gte?: InputMaybe<Scalars['BigInt']>;
  distributedAmount_lte?: InputMaybe<Scalars['BigInt']>;
  distributedAmount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  distributedAmount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<GrantShip_filter>>>;
  or?: InputMaybe<Array<InputMaybe<GrantShip_filter>>>;
};

export type GrantShip_orderBy =
  | 'id'
  | 'profileId'
  | 'nonce'
  | 'name'
  | 'profileMetadata'
  | 'profileMetadata__id'
  | 'profileMetadata__protocol'
  | 'profileMetadata__pointer'
  | 'owner'
  | 'anchor'
  | 'blockNumber'
  | 'blockTimestamp'
  | 'transactionHash'
  | 'status'
  | 'alloProfileMembers'
  | 'alloProfileMembers__id'
  | 'shipApplicationBytesData'
  | 'applicationSubmittedTime'
  | 'isAwaitingApproval'
  | 'hasSubmittedApplication'
  | 'isApproved'
  | 'approvedTime'
  | 'isRejected'
  | 'rejectedTime'
  | 'applicationReviewReason'
  | 'applicationReviewReason__id'
  | 'applicationReviewReason__protocol'
  | 'applicationReviewReason__pointer'
  | 'poolId'
  | 'shipContractAddress'
  | 'shipLaunched'
  | 'isAllocated'
  | 'allocatedAmount'
  | 'isDistributed'
  | 'distributedAmount';

export type Log = {
  id: Scalars['ID'];
  message: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  type: Scalars['String'];
};

export type Log_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  message?: InputMaybe<Scalars['String']>;
  message_not?: InputMaybe<Scalars['String']>;
  message_gt?: InputMaybe<Scalars['String']>;
  message_lt?: InputMaybe<Scalars['String']>;
  message_gte?: InputMaybe<Scalars['String']>;
  message_lte?: InputMaybe<Scalars['String']>;
  message_in?: InputMaybe<Array<Scalars['String']>>;
  message_not_in?: InputMaybe<Array<Scalars['String']>>;
  message_contains?: InputMaybe<Scalars['String']>;
  message_contains_nocase?: InputMaybe<Scalars['String']>;
  message_not_contains?: InputMaybe<Scalars['String']>;
  message_not_contains_nocase?: InputMaybe<Scalars['String']>;
  message_starts_with?: InputMaybe<Scalars['String']>;
  message_starts_with_nocase?: InputMaybe<Scalars['String']>;
  message_not_starts_with?: InputMaybe<Scalars['String']>;
  message_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  message_ends_with?: InputMaybe<Scalars['String']>;
  message_ends_with_nocase?: InputMaybe<Scalars['String']>;
  message_not_ends_with?: InputMaybe<Scalars['String']>;
  message_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  description_not?: InputMaybe<Scalars['String']>;
  description_gt?: InputMaybe<Scalars['String']>;
  description_lt?: InputMaybe<Scalars['String']>;
  description_gte?: InputMaybe<Scalars['String']>;
  description_lte?: InputMaybe<Scalars['String']>;
  description_in?: InputMaybe<Array<Scalars['String']>>;
  description_not_in?: InputMaybe<Array<Scalars['String']>>;
  description_contains?: InputMaybe<Scalars['String']>;
  description_contains_nocase?: InputMaybe<Scalars['String']>;
  description_not_contains?: InputMaybe<Scalars['String']>;
  description_not_contains_nocase?: InputMaybe<Scalars['String']>;
  description_starts_with?: InputMaybe<Scalars['String']>;
  description_starts_with_nocase?: InputMaybe<Scalars['String']>;
  description_not_starts_with?: InputMaybe<Scalars['String']>;
  description_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  description_ends_with?: InputMaybe<Scalars['String']>;
  description_ends_with_nocase?: InputMaybe<Scalars['String']>;
  description_not_ends_with?: InputMaybe<Scalars['String']>;
  description_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<Scalars['String']>;
  type_not?: InputMaybe<Scalars['String']>;
  type_gt?: InputMaybe<Scalars['String']>;
  type_lt?: InputMaybe<Scalars['String']>;
  type_gte?: InputMaybe<Scalars['String']>;
  type_lte?: InputMaybe<Scalars['String']>;
  type_in?: InputMaybe<Array<Scalars['String']>>;
  type_not_in?: InputMaybe<Array<Scalars['String']>>;
  type_contains?: InputMaybe<Scalars['String']>;
  type_contains_nocase?: InputMaybe<Scalars['String']>;
  type_not_contains?: InputMaybe<Scalars['String']>;
  type_not_contains_nocase?: InputMaybe<Scalars['String']>;
  type_starts_with?: InputMaybe<Scalars['String']>;
  type_starts_with_nocase?: InputMaybe<Scalars['String']>;
  type_not_starts_with?: InputMaybe<Scalars['String']>;
  type_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  type_ends_with?: InputMaybe<Scalars['String']>;
  type_ends_with_nocase?: InputMaybe<Scalars['String']>;
  type_not_ends_with?: InputMaybe<Scalars['String']>;
  type_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<Log_filter>>>;
  or?: InputMaybe<Array<InputMaybe<Log_filter>>>;
};

export type Log_orderBy =
  | 'id'
  | 'message'
  | 'description'
  | 'type';

/** Defines the order direction, either ascending or descending */
export type OrderDirection =
  | 'asc'
  | 'desc';

export type PoolIdLookup = {
  id: Scalars['ID'];
  entityId: Scalars['Bytes'];
};

export type PoolIdLookup_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  entityId?: InputMaybe<Scalars['Bytes']>;
  entityId_not?: InputMaybe<Scalars['Bytes']>;
  entityId_gt?: InputMaybe<Scalars['Bytes']>;
  entityId_lt?: InputMaybe<Scalars['Bytes']>;
  entityId_gte?: InputMaybe<Scalars['Bytes']>;
  entityId_lte?: InputMaybe<Scalars['Bytes']>;
  entityId_in?: InputMaybe<Array<Scalars['Bytes']>>;
  entityId_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  entityId_contains?: InputMaybe<Scalars['Bytes']>;
  entityId_not_contains?: InputMaybe<Scalars['Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<PoolIdLookup_filter>>>;
  or?: InputMaybe<Array<InputMaybe<PoolIdLookup_filter>>>;
};

export type PoolIdLookup_orderBy =
  | 'id'
  | 'entityId';

export type ProfileMemberGroup = {
  id: Scalars['Bytes'];
  addresses?: Maybe<Array<Scalars['Bytes']>>;
};

export type ProfileMemberGroup_filter = {
  id?: InputMaybe<Scalars['Bytes']>;
  id_not?: InputMaybe<Scalars['Bytes']>;
  id_gt?: InputMaybe<Scalars['Bytes']>;
  id_lt?: InputMaybe<Scalars['Bytes']>;
  id_gte?: InputMaybe<Scalars['Bytes']>;
  id_lte?: InputMaybe<Scalars['Bytes']>;
  id_in?: InputMaybe<Array<Scalars['Bytes']>>;
  id_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  id_contains?: InputMaybe<Scalars['Bytes']>;
  id_not_contains?: InputMaybe<Scalars['Bytes']>;
  addresses?: InputMaybe<Array<Scalars['Bytes']>>;
  addresses_not?: InputMaybe<Array<Scalars['Bytes']>>;
  addresses_contains?: InputMaybe<Array<Scalars['Bytes']>>;
  addresses_contains_nocase?: InputMaybe<Array<Scalars['Bytes']>>;
  addresses_not_contains?: InputMaybe<Array<Scalars['Bytes']>>;
  addresses_not_contains_nocase?: InputMaybe<Array<Scalars['Bytes']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<ProfileMemberGroup_filter>>>;
  or?: InputMaybe<Array<InputMaybe<ProfileMemberGroup_filter>>>;
};

export type ProfileMemberGroup_orderBy =
  | 'id'
  | 'addresses';

export type Project = {
  id: Scalars['Bytes'];
  profileId: Scalars['Bytes'];
  status: Scalars['Int'];
  nonce: Scalars['BigInt'];
  name: Scalars['String'];
  metadata: RawMetadata;
  owner: Scalars['Bytes'];
  anchor: Scalars['Bytes'];
  blockNumber: Scalars['BigInt'];
  blockTimestamp: Scalars['BigInt'];
  transactionHash: Scalars['Bytes'];
  members?: Maybe<ProfileMemberGroup>;
};

export type Project_filter = {
  id?: InputMaybe<Scalars['Bytes']>;
  id_not?: InputMaybe<Scalars['Bytes']>;
  id_gt?: InputMaybe<Scalars['Bytes']>;
  id_lt?: InputMaybe<Scalars['Bytes']>;
  id_gte?: InputMaybe<Scalars['Bytes']>;
  id_lte?: InputMaybe<Scalars['Bytes']>;
  id_in?: InputMaybe<Array<Scalars['Bytes']>>;
  id_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  id_contains?: InputMaybe<Scalars['Bytes']>;
  id_not_contains?: InputMaybe<Scalars['Bytes']>;
  profileId?: InputMaybe<Scalars['Bytes']>;
  profileId_not?: InputMaybe<Scalars['Bytes']>;
  profileId_gt?: InputMaybe<Scalars['Bytes']>;
  profileId_lt?: InputMaybe<Scalars['Bytes']>;
  profileId_gte?: InputMaybe<Scalars['Bytes']>;
  profileId_lte?: InputMaybe<Scalars['Bytes']>;
  profileId_in?: InputMaybe<Array<Scalars['Bytes']>>;
  profileId_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  profileId_contains?: InputMaybe<Scalars['Bytes']>;
  profileId_not_contains?: InputMaybe<Scalars['Bytes']>;
  status?: InputMaybe<Scalars['Int']>;
  status_not?: InputMaybe<Scalars['Int']>;
  status_gt?: InputMaybe<Scalars['Int']>;
  status_lt?: InputMaybe<Scalars['Int']>;
  status_gte?: InputMaybe<Scalars['Int']>;
  status_lte?: InputMaybe<Scalars['Int']>;
  status_in?: InputMaybe<Array<Scalars['Int']>>;
  status_not_in?: InputMaybe<Array<Scalars['Int']>>;
  nonce?: InputMaybe<Scalars['BigInt']>;
  nonce_not?: InputMaybe<Scalars['BigInt']>;
  nonce_gt?: InputMaybe<Scalars['BigInt']>;
  nonce_lt?: InputMaybe<Scalars['BigInt']>;
  nonce_gte?: InputMaybe<Scalars['BigInt']>;
  nonce_lte?: InputMaybe<Scalars['BigInt']>;
  nonce_in?: InputMaybe<Array<Scalars['BigInt']>>;
  nonce_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
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
  metadata?: InputMaybe<Scalars['String']>;
  metadata_not?: InputMaybe<Scalars['String']>;
  metadata_gt?: InputMaybe<Scalars['String']>;
  metadata_lt?: InputMaybe<Scalars['String']>;
  metadata_gte?: InputMaybe<Scalars['String']>;
  metadata_lte?: InputMaybe<Scalars['String']>;
  metadata_in?: InputMaybe<Array<Scalars['String']>>;
  metadata_not_in?: InputMaybe<Array<Scalars['String']>>;
  metadata_contains?: InputMaybe<Scalars['String']>;
  metadata_contains_nocase?: InputMaybe<Scalars['String']>;
  metadata_not_contains?: InputMaybe<Scalars['String']>;
  metadata_not_contains_nocase?: InputMaybe<Scalars['String']>;
  metadata_starts_with?: InputMaybe<Scalars['String']>;
  metadata_starts_with_nocase?: InputMaybe<Scalars['String']>;
  metadata_not_starts_with?: InputMaybe<Scalars['String']>;
  metadata_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  metadata_ends_with?: InputMaybe<Scalars['String']>;
  metadata_ends_with_nocase?: InputMaybe<Scalars['String']>;
  metadata_not_ends_with?: InputMaybe<Scalars['String']>;
  metadata_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  metadata_?: InputMaybe<RawMetadata_filter>;
  owner?: InputMaybe<Scalars['Bytes']>;
  owner_not?: InputMaybe<Scalars['Bytes']>;
  owner_gt?: InputMaybe<Scalars['Bytes']>;
  owner_lt?: InputMaybe<Scalars['Bytes']>;
  owner_gte?: InputMaybe<Scalars['Bytes']>;
  owner_lte?: InputMaybe<Scalars['Bytes']>;
  owner_in?: InputMaybe<Array<Scalars['Bytes']>>;
  owner_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  owner_contains?: InputMaybe<Scalars['Bytes']>;
  owner_not_contains?: InputMaybe<Scalars['Bytes']>;
  anchor?: InputMaybe<Scalars['Bytes']>;
  anchor_not?: InputMaybe<Scalars['Bytes']>;
  anchor_gt?: InputMaybe<Scalars['Bytes']>;
  anchor_lt?: InputMaybe<Scalars['Bytes']>;
  anchor_gte?: InputMaybe<Scalars['Bytes']>;
  anchor_lte?: InputMaybe<Scalars['Bytes']>;
  anchor_in?: InputMaybe<Array<Scalars['Bytes']>>;
  anchor_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  anchor_contains?: InputMaybe<Scalars['Bytes']>;
  anchor_not_contains?: InputMaybe<Scalars['Bytes']>;
  blockNumber?: InputMaybe<Scalars['BigInt']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockTimestamp?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_not?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_gt?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_lt?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_gte?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_lte?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  transactionHash?: InputMaybe<Scalars['Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['Bytes']>;
  transactionHash_gt?: InputMaybe<Scalars['Bytes']>;
  transactionHash_lt?: InputMaybe<Scalars['Bytes']>;
  transactionHash_gte?: InputMaybe<Scalars['Bytes']>;
  transactionHash_lte?: InputMaybe<Scalars['Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['Bytes']>;
  members?: InputMaybe<Scalars['String']>;
  members_not?: InputMaybe<Scalars['String']>;
  members_gt?: InputMaybe<Scalars['String']>;
  members_lt?: InputMaybe<Scalars['String']>;
  members_gte?: InputMaybe<Scalars['String']>;
  members_lte?: InputMaybe<Scalars['String']>;
  members_in?: InputMaybe<Array<Scalars['String']>>;
  members_not_in?: InputMaybe<Array<Scalars['String']>>;
  members_contains?: InputMaybe<Scalars['String']>;
  members_contains_nocase?: InputMaybe<Scalars['String']>;
  members_not_contains?: InputMaybe<Scalars['String']>;
  members_not_contains_nocase?: InputMaybe<Scalars['String']>;
  members_starts_with?: InputMaybe<Scalars['String']>;
  members_starts_with_nocase?: InputMaybe<Scalars['String']>;
  members_not_starts_with?: InputMaybe<Scalars['String']>;
  members_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  members_ends_with?: InputMaybe<Scalars['String']>;
  members_ends_with_nocase?: InputMaybe<Scalars['String']>;
  members_not_ends_with?: InputMaybe<Scalars['String']>;
  members_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  members_?: InputMaybe<ProfileMemberGroup_filter>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<Project_filter>>>;
  or?: InputMaybe<Array<InputMaybe<Project_filter>>>;
};

export type Project_orderBy =
  | 'id'
  | 'profileId'
  | 'status'
  | 'nonce'
  | 'name'
  | 'metadata'
  | 'metadata__id'
  | 'metadata__protocol'
  | 'metadata__pointer'
  | 'owner'
  | 'anchor'
  | 'blockNumber'
  | 'blockTimestamp'
  | 'transactionHash'
  | 'members'
  | 'members__id';

export type Query = {
  project?: Maybe<Project>;
  projects: Array<Project>;
  feedItem?: Maybe<FeedItem>;
  feedItems: Array<FeedItem>;
  feedItemEntity?: Maybe<FeedItemEntity>;
  feedItemEntities: Array<FeedItemEntity>;
  feedItemEmbed?: Maybe<FeedItemEmbed>;
  feedItemEmbeds: Array<FeedItemEmbed>;
  grantShip?: Maybe<GrantShip>;
  grantShips: Array<GrantShip>;
  grantShipLookup?: Maybe<GrantShipLookup>;
  grantShipLookups: Array<GrantShipLookup>;
  poolIdLookup?: Maybe<PoolIdLookup>;
  poolIdLookups: Array<PoolIdLookup>;
  gameManager?: Maybe<GameManager>;
  gameManagers: Array<GameManager>;
  gameRound?: Maybe<GameRound>;
  gameRounds: Array<GameRound>;
  profileMemberGroup?: Maybe<ProfileMemberGroup>;
  profileMemberGroups: Array<ProfileMemberGroup>;
  transaction?: Maybe<Transaction>;
  transactions: Array<Transaction>;
  rawMetadata: Array<RawMetadata>;
  log?: Maybe<Log>;
  logs: Array<Log>;
  /** Access to subgraph metadata */
  _meta?: Maybe<_Meta_>;
};


export type QueryprojectArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryprojectsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Project_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Project_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryfeedItemArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryfeedItemsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<FeedItem_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<FeedItem_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryfeedItemEntityArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryfeedItemEntitiesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<FeedItemEntity_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<FeedItemEntity_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryfeedItemEmbedArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryfeedItemEmbedsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<FeedItemEmbed_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<FeedItemEmbed_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerygrantShipArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerygrantShipsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<GrantShip_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<GrantShip_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerygrantShipLookupArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerygrantShipLookupsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<GrantShipLookup_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<GrantShipLookup_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerypoolIdLookupArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerypoolIdLookupsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<PoolIdLookup_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<PoolIdLookup_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerygameManagerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerygameManagersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<GameManager_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<GameManager_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerygameRoundArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerygameRoundsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<GameRound_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<GameRound_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryprofileMemberGroupArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryprofileMemberGroupsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<ProfileMemberGroup_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<ProfileMemberGroup_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerytransactionArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerytransactionsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Transaction_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Transaction_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryrawMetadataArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<RawMetadata_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<RawMetadata_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerylogArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerylogsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Log_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Log_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Query_metaArgs = {
  block?: InputMaybe<Block_height>;
};

export type RawMetadata = {
  id: Scalars['String'];
  protocol: Scalars['BigInt'];
  pointer: Scalars['String'];
};

export type RawMetadata_filter = {
  id?: InputMaybe<Scalars['String']>;
  id_not?: InputMaybe<Scalars['String']>;
  id_gt?: InputMaybe<Scalars['String']>;
  id_lt?: InputMaybe<Scalars['String']>;
  id_gte?: InputMaybe<Scalars['String']>;
  id_lte?: InputMaybe<Scalars['String']>;
  id_in?: InputMaybe<Array<Scalars['String']>>;
  id_not_in?: InputMaybe<Array<Scalars['String']>>;
  id_contains?: InputMaybe<Scalars['String']>;
  id_contains_nocase?: InputMaybe<Scalars['String']>;
  id_not_contains?: InputMaybe<Scalars['String']>;
  id_not_contains_nocase?: InputMaybe<Scalars['String']>;
  id_starts_with?: InputMaybe<Scalars['String']>;
  id_starts_with_nocase?: InputMaybe<Scalars['String']>;
  id_not_starts_with?: InputMaybe<Scalars['String']>;
  id_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  id_ends_with?: InputMaybe<Scalars['String']>;
  id_ends_with_nocase?: InputMaybe<Scalars['String']>;
  id_not_ends_with?: InputMaybe<Scalars['String']>;
  id_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  protocol?: InputMaybe<Scalars['BigInt']>;
  protocol_not?: InputMaybe<Scalars['BigInt']>;
  protocol_gt?: InputMaybe<Scalars['BigInt']>;
  protocol_lt?: InputMaybe<Scalars['BigInt']>;
  protocol_gte?: InputMaybe<Scalars['BigInt']>;
  protocol_lte?: InputMaybe<Scalars['BigInt']>;
  protocol_in?: InputMaybe<Array<Scalars['BigInt']>>;
  protocol_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  pointer?: InputMaybe<Scalars['String']>;
  pointer_not?: InputMaybe<Scalars['String']>;
  pointer_gt?: InputMaybe<Scalars['String']>;
  pointer_lt?: InputMaybe<Scalars['String']>;
  pointer_gte?: InputMaybe<Scalars['String']>;
  pointer_lte?: InputMaybe<Scalars['String']>;
  pointer_in?: InputMaybe<Array<Scalars['String']>>;
  pointer_not_in?: InputMaybe<Array<Scalars['String']>>;
  pointer_contains?: InputMaybe<Scalars['String']>;
  pointer_contains_nocase?: InputMaybe<Scalars['String']>;
  pointer_not_contains?: InputMaybe<Scalars['String']>;
  pointer_not_contains_nocase?: InputMaybe<Scalars['String']>;
  pointer_starts_with?: InputMaybe<Scalars['String']>;
  pointer_starts_with_nocase?: InputMaybe<Scalars['String']>;
  pointer_not_starts_with?: InputMaybe<Scalars['String']>;
  pointer_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  pointer_ends_with?: InputMaybe<Scalars['String']>;
  pointer_ends_with_nocase?: InputMaybe<Scalars['String']>;
  pointer_not_ends_with?: InputMaybe<Scalars['String']>;
  pointer_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<RawMetadata_filter>>>;
  or?: InputMaybe<Array<InputMaybe<RawMetadata_filter>>>;
};

export type RawMetadata_orderBy =
  | 'id'
  | 'protocol'
  | 'pointer';

export type Subscription = {
  project?: Maybe<Project>;
  projects: Array<Project>;
  feedItem?: Maybe<FeedItem>;
  feedItems: Array<FeedItem>;
  feedItemEntity?: Maybe<FeedItemEntity>;
  feedItemEntities: Array<FeedItemEntity>;
  feedItemEmbed?: Maybe<FeedItemEmbed>;
  feedItemEmbeds: Array<FeedItemEmbed>;
  grantShip?: Maybe<GrantShip>;
  grantShips: Array<GrantShip>;
  grantShipLookup?: Maybe<GrantShipLookup>;
  grantShipLookups: Array<GrantShipLookup>;
  poolIdLookup?: Maybe<PoolIdLookup>;
  poolIdLookups: Array<PoolIdLookup>;
  gameManager?: Maybe<GameManager>;
  gameManagers: Array<GameManager>;
  gameRound?: Maybe<GameRound>;
  gameRounds: Array<GameRound>;
  profileMemberGroup?: Maybe<ProfileMemberGroup>;
  profileMemberGroups: Array<ProfileMemberGroup>;
  transaction?: Maybe<Transaction>;
  transactions: Array<Transaction>;
  rawMetadata: Array<RawMetadata>;
  log?: Maybe<Log>;
  logs: Array<Log>;
  /** Access to subgraph metadata */
  _meta?: Maybe<_Meta_>;
};


export type SubscriptionprojectArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionprojectsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Project_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Project_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionfeedItemArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionfeedItemsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<FeedItem_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<FeedItem_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionfeedItemEntityArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionfeedItemEntitiesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<FeedItemEntity_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<FeedItemEntity_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionfeedItemEmbedArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionfeedItemEmbedsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<FeedItemEmbed_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<FeedItemEmbed_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptiongrantShipArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptiongrantShipsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<GrantShip_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<GrantShip_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptiongrantShipLookupArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptiongrantShipLookupsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<GrantShipLookup_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<GrantShipLookup_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionpoolIdLookupArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionpoolIdLookupsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<PoolIdLookup_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<PoolIdLookup_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptiongameManagerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptiongameManagersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<GameManager_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<GameManager_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptiongameRoundArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptiongameRoundsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<GameRound_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<GameRound_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionprofileMemberGroupArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionprofileMemberGroupsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<ProfileMemberGroup_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<ProfileMemberGroup_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptiontransactionArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptiontransactionsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Transaction_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Transaction_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionrawMetadataArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<RawMetadata_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<RawMetadata_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionlogArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionlogsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Log_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Log_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscription_metaArgs = {
  block?: InputMaybe<Block_height>;
};

export type Transaction = {
  id: Scalars['ID'];
  blockNumber: Scalars['BigInt'];
  sender: Scalars['Bytes'];
  txHash: Scalars['Bytes'];
};

export type Transaction_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  blockNumber?: InputMaybe<Scalars['BigInt']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  sender?: InputMaybe<Scalars['Bytes']>;
  sender_not?: InputMaybe<Scalars['Bytes']>;
  sender_gt?: InputMaybe<Scalars['Bytes']>;
  sender_lt?: InputMaybe<Scalars['Bytes']>;
  sender_gte?: InputMaybe<Scalars['Bytes']>;
  sender_lte?: InputMaybe<Scalars['Bytes']>;
  sender_in?: InputMaybe<Array<Scalars['Bytes']>>;
  sender_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  sender_contains?: InputMaybe<Scalars['Bytes']>;
  sender_not_contains?: InputMaybe<Scalars['Bytes']>;
  txHash?: InputMaybe<Scalars['Bytes']>;
  txHash_not?: InputMaybe<Scalars['Bytes']>;
  txHash_gt?: InputMaybe<Scalars['Bytes']>;
  txHash_lt?: InputMaybe<Scalars['Bytes']>;
  txHash_gte?: InputMaybe<Scalars['Bytes']>;
  txHash_lte?: InputMaybe<Scalars['Bytes']>;
  txHash_in?: InputMaybe<Array<Scalars['Bytes']>>;
  txHash_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  txHash_contains?: InputMaybe<Scalars['Bytes']>;
  txHash_not_contains?: InputMaybe<Scalars['Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<Transaction_filter>>>;
  or?: InputMaybe<Array<InputMaybe<Transaction_filter>>>;
};

export type Transaction_orderBy =
  | 'id'
  | 'blockNumber'
  | 'sender'
  | 'txHash';

export type _Block_ = {
  /** The hash of the block */
  hash?: Maybe<Scalars['Bytes']>;
  /** The block number */
  number: Scalars['Int'];
  /** Integer representation of the timestamp stored in blocks for the chain */
  timestamp?: Maybe<Scalars['Int']>;
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
  BigDecimal: ResolverTypeWrapper<Scalars['BigDecimal']>;
  BigInt: ResolverTypeWrapper<Scalars['BigInt']>;
  BlockChangedFilter: BlockChangedFilter;
  Block_height: Block_height;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  Bytes: ResolverTypeWrapper<Scalars['Bytes']>;
  FeedItem: ResolverTypeWrapper<FeedItem>;
  FeedItemEmbed: ResolverTypeWrapper<FeedItemEmbed>;
  FeedItemEmbed_filter: FeedItemEmbed_filter;
  FeedItemEmbed_orderBy: FeedItemEmbed_orderBy;
  FeedItemEntity: ResolverTypeWrapper<FeedItemEntity>;
  FeedItemEntity_filter: FeedItemEntity_filter;
  FeedItemEntity_orderBy: FeedItemEntity_orderBy;
  FeedItem_filter: FeedItem_filter;
  FeedItem_orderBy: FeedItem_orderBy;
  Float: ResolverTypeWrapper<Scalars['Float']>;
  GameManager: ResolverTypeWrapper<GameManager>;
  GameManager_filter: GameManager_filter;
  GameManager_orderBy: GameManager_orderBy;
  GameRound: ResolverTypeWrapper<GameRound>;
  GameRound_filter: GameRound_filter;
  GameRound_orderBy: GameRound_orderBy;
  GrantShip: ResolverTypeWrapper<GrantShip>;
  GrantShipLookup: ResolverTypeWrapper<GrantShipLookup>;
  GrantShipLookup_filter: GrantShipLookup_filter;
  GrantShipLookup_orderBy: GrantShipLookup_orderBy;
  GrantShip_filter: GrantShip_filter;
  GrantShip_orderBy: GrantShip_orderBy;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  Int8: ResolverTypeWrapper<Scalars['Int8']>;
  Log: ResolverTypeWrapper<Log>;
  Log_filter: Log_filter;
  Log_orderBy: Log_orderBy;
  OrderDirection: OrderDirection;
  PoolIdLookup: ResolverTypeWrapper<PoolIdLookup>;
  PoolIdLookup_filter: PoolIdLookup_filter;
  PoolIdLookup_orderBy: PoolIdLookup_orderBy;
  ProfileMemberGroup: ResolverTypeWrapper<ProfileMemberGroup>;
  ProfileMemberGroup_filter: ProfileMemberGroup_filter;
  ProfileMemberGroup_orderBy: ProfileMemberGroup_orderBy;
  Project: ResolverTypeWrapper<Project>;
  Project_filter: Project_filter;
  Project_orderBy: Project_orderBy;
  Query: ResolverTypeWrapper<{}>;
  RawMetadata: ResolverTypeWrapper<RawMetadata>;
  RawMetadata_filter: RawMetadata_filter;
  RawMetadata_orderBy: RawMetadata_orderBy;
  String: ResolverTypeWrapper<Scalars['String']>;
  Subscription: ResolverTypeWrapper<{}>;
  Transaction: ResolverTypeWrapper<Transaction>;
  Transaction_filter: Transaction_filter;
  Transaction_orderBy: Transaction_orderBy;
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
  FeedItem: FeedItem;
  FeedItemEmbed: FeedItemEmbed;
  FeedItemEmbed_filter: FeedItemEmbed_filter;
  FeedItemEntity: FeedItemEntity;
  FeedItemEntity_filter: FeedItemEntity_filter;
  FeedItem_filter: FeedItem_filter;
  Float: Scalars['Float'];
  GameManager: GameManager;
  GameManager_filter: GameManager_filter;
  GameRound: GameRound;
  GameRound_filter: GameRound_filter;
  GrantShip: GrantShip;
  GrantShipLookup: GrantShipLookup;
  GrantShipLookup_filter: GrantShipLookup_filter;
  GrantShip_filter: GrantShip_filter;
  ID: Scalars['ID'];
  Int: Scalars['Int'];
  Int8: Scalars['Int8'];
  Log: Log;
  Log_filter: Log_filter;
  PoolIdLookup: PoolIdLookup;
  PoolIdLookup_filter: PoolIdLookup_filter;
  ProfileMemberGroup: ProfileMemberGroup;
  ProfileMemberGroup_filter: ProfileMemberGroup_filter;
  Project: Project;
  Project_filter: Project_filter;
  Query: {};
  RawMetadata: RawMetadata;
  RawMetadata_filter: RawMetadata_filter;
  String: Scalars['String'];
  Subscription: {};
  Transaction: Transaction;
  Transaction_filter: Transaction_filter;
  _Block_: _Block_;
  _Meta_: _Meta_;
}>;

export type entityDirectiveArgs = { };

export type entityDirectiveResolver<Result, Parent, ContextType = MeshContext, Args = entityDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type subgraphIdDirectiveArgs = {
  id: Scalars['String'];
};

export type subgraphIdDirectiveResolver<Result, Parent, ContextType = MeshContext, Args = subgraphIdDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type derivedFromDirectiveArgs = {
  field: Scalars['String'];
};

export type derivedFromDirectiveResolver<Result, Parent, ContextType = MeshContext, Args = derivedFromDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export interface BigDecimalScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['BigDecimal'], any> {
  name: 'BigDecimal';
}

export interface BigIntScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['BigInt'], any> {
  name: 'BigInt';
}

export interface BytesScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Bytes'], any> {
  name: 'Bytes';
}

export type FeedItemResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['FeedItem'] = ResolversParentTypes['FeedItem']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  timestamp?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  content?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  sender?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  tag?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  subjectMetadataPointer?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  subjectId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  objectId?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  subject?: Resolver<ResolversTypes['FeedItemEntity'], ParentType, ContextType>;
  object?: Resolver<Maybe<ResolversTypes['FeedItemEntity']>, ParentType, ContextType>;
  embed?: Resolver<Maybe<ResolversTypes['FeedItemEmbed']>, ParentType, ContextType>;
  details?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type FeedItemEmbedResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['FeedItemEmbed'] = ResolversParentTypes['FeedItemEmbed']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  key?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  pointer?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  protocol?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  content?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type FeedItemEntityResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['FeedItemEntity'] = ResolversParentTypes['FeedItemEntity']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type GameManagerResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['GameManager'] = ResolversParentTypes['GameManager']> = ResolversObject<{
  id?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  gameFacilitatorId?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  rootAccount?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  tokenAddress?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  currentRoundId?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  currentRound?: Resolver<Maybe<ResolversTypes['GameRound']>, ParentType, ContextType>;
  poolFunds?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type GameRoundResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['GameRound'] = ResolversParentTypes['GameRound']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  startTime?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  endTime?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  totalRoundAmount?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  totalAllocatedAmount?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  gameStatus?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  ships?: Resolver<Array<ResolversTypes['GrantShip']>, ParentType, ContextType, RequireFields<GameRoundshipsArgs, 'skip' | 'first'>>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type GrantShipResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['GrantShip'] = ResolversParentTypes['GrantShip']> = ResolversObject<{
  id?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  profileId?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  nonce?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  profileMetadata?: Resolver<ResolversTypes['RawMetadata'], ParentType, ContextType>;
  owner?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  anchor?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  blockNumber?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  blockTimestamp?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  transactionHash?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  status?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  alloProfileMembers?: Resolver<Maybe<ResolversTypes['ProfileMemberGroup']>, ParentType, ContextType>;
  shipApplicationBytesData?: Resolver<Maybe<ResolversTypes['Bytes']>, ParentType, ContextType>;
  applicationSubmittedTime?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  isAwaitingApproval?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  hasSubmittedApplication?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  isApproved?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  approvedTime?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  isRejected?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  rejectedTime?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  applicationReviewReason?: Resolver<Maybe<ResolversTypes['RawMetadata']>, ParentType, ContextType>;
  poolId?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  shipContractAddress?: Resolver<Maybe<ResolversTypes['Bytes']>, ParentType, ContextType>;
  shipLaunched?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  isAllocated?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  allocatedAmount?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  isDistributed?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  distributedAmount?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type GrantShipLookupResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['GrantShipLookup'] = ResolversParentTypes['GrantShipLookup']> = ResolversObject<{
  id?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  anchorAddress?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export interface Int8ScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Int8'], any> {
  name: 'Int8';
}

export type LogResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['Log'] = ResolversParentTypes['Log']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  type?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type PoolIdLookupResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['PoolIdLookup'] = ResolversParentTypes['PoolIdLookup']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  entityId?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ProfileMemberGroupResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['ProfileMemberGroup'] = ResolversParentTypes['ProfileMemberGroup']> = ResolversObject<{
  id?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  addresses?: Resolver<Maybe<Array<ResolversTypes['Bytes']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ProjectResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['Project'] = ResolversParentTypes['Project']> = ResolversObject<{
  id?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  profileId?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  status?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  nonce?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  metadata?: Resolver<ResolversTypes['RawMetadata'], ParentType, ContextType>;
  owner?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  anchor?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  blockNumber?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  blockTimestamp?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  transactionHash?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  members?: Resolver<Maybe<ResolversTypes['ProfileMemberGroup']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type QueryResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  project?: Resolver<Maybe<ResolversTypes['Project']>, ParentType, ContextType, RequireFields<QueryprojectArgs, 'id' | 'subgraphError'>>;
  projects?: Resolver<Array<ResolversTypes['Project']>, ParentType, ContextType, RequireFields<QueryprojectsArgs, 'skip' | 'first' | 'subgraphError'>>;
  feedItem?: Resolver<Maybe<ResolversTypes['FeedItem']>, ParentType, ContextType, RequireFields<QueryfeedItemArgs, 'id' | 'subgraphError'>>;
  feedItems?: Resolver<Array<ResolversTypes['FeedItem']>, ParentType, ContextType, RequireFields<QueryfeedItemsArgs, 'skip' | 'first' | 'subgraphError'>>;
  feedItemEntity?: Resolver<Maybe<ResolversTypes['FeedItemEntity']>, ParentType, ContextType, RequireFields<QueryfeedItemEntityArgs, 'id' | 'subgraphError'>>;
  feedItemEntities?: Resolver<Array<ResolversTypes['FeedItemEntity']>, ParentType, ContextType, RequireFields<QueryfeedItemEntitiesArgs, 'skip' | 'first' | 'subgraphError'>>;
  feedItemEmbed?: Resolver<Maybe<ResolversTypes['FeedItemEmbed']>, ParentType, ContextType, RequireFields<QueryfeedItemEmbedArgs, 'id' | 'subgraphError'>>;
  feedItemEmbeds?: Resolver<Array<ResolversTypes['FeedItemEmbed']>, ParentType, ContextType, RequireFields<QueryfeedItemEmbedsArgs, 'skip' | 'first' | 'subgraphError'>>;
  grantShip?: Resolver<Maybe<ResolversTypes['GrantShip']>, ParentType, ContextType, RequireFields<QuerygrantShipArgs, 'id' | 'subgraphError'>>;
  grantShips?: Resolver<Array<ResolversTypes['GrantShip']>, ParentType, ContextType, RequireFields<QuerygrantShipsArgs, 'skip' | 'first' | 'subgraphError'>>;
  grantShipLookup?: Resolver<Maybe<ResolversTypes['GrantShipLookup']>, ParentType, ContextType, RequireFields<QuerygrantShipLookupArgs, 'id' | 'subgraphError'>>;
  grantShipLookups?: Resolver<Array<ResolversTypes['GrantShipLookup']>, ParentType, ContextType, RequireFields<QuerygrantShipLookupsArgs, 'skip' | 'first' | 'subgraphError'>>;
  poolIdLookup?: Resolver<Maybe<ResolversTypes['PoolIdLookup']>, ParentType, ContextType, RequireFields<QuerypoolIdLookupArgs, 'id' | 'subgraphError'>>;
  poolIdLookups?: Resolver<Array<ResolversTypes['PoolIdLookup']>, ParentType, ContextType, RequireFields<QuerypoolIdLookupsArgs, 'skip' | 'first' | 'subgraphError'>>;
  gameManager?: Resolver<Maybe<ResolversTypes['GameManager']>, ParentType, ContextType, RequireFields<QuerygameManagerArgs, 'id' | 'subgraphError'>>;
  gameManagers?: Resolver<Array<ResolversTypes['GameManager']>, ParentType, ContextType, RequireFields<QuerygameManagersArgs, 'skip' | 'first' | 'subgraphError'>>;
  gameRound?: Resolver<Maybe<ResolversTypes['GameRound']>, ParentType, ContextType, RequireFields<QuerygameRoundArgs, 'id' | 'subgraphError'>>;
  gameRounds?: Resolver<Array<ResolversTypes['GameRound']>, ParentType, ContextType, RequireFields<QuerygameRoundsArgs, 'skip' | 'first' | 'subgraphError'>>;
  profileMemberGroup?: Resolver<Maybe<ResolversTypes['ProfileMemberGroup']>, ParentType, ContextType, RequireFields<QueryprofileMemberGroupArgs, 'id' | 'subgraphError'>>;
  profileMemberGroups?: Resolver<Array<ResolversTypes['ProfileMemberGroup']>, ParentType, ContextType, RequireFields<QueryprofileMemberGroupsArgs, 'skip' | 'first' | 'subgraphError'>>;
  transaction?: Resolver<Maybe<ResolversTypes['Transaction']>, ParentType, ContextType, RequireFields<QuerytransactionArgs, 'id' | 'subgraphError'>>;
  transactions?: Resolver<Array<ResolversTypes['Transaction']>, ParentType, ContextType, RequireFields<QuerytransactionsArgs, 'skip' | 'first' | 'subgraphError'>>;
  rawMetadata?: Resolver<Array<ResolversTypes['RawMetadata']>, ParentType, ContextType, RequireFields<QueryrawMetadataArgs, 'skip' | 'first' | 'subgraphError'>>;
  log?: Resolver<Maybe<ResolversTypes['Log']>, ParentType, ContextType, RequireFields<QuerylogArgs, 'id' | 'subgraphError'>>;
  logs?: Resolver<Array<ResolversTypes['Log']>, ParentType, ContextType, RequireFields<QuerylogsArgs, 'skip' | 'first' | 'subgraphError'>>;
  _meta?: Resolver<Maybe<ResolversTypes['_Meta_']>, ParentType, ContextType, Partial<Query_metaArgs>>;
}>;

export type RawMetadataResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['RawMetadata'] = ResolversParentTypes['RawMetadata']> = ResolversObject<{
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  protocol?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  pointer?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type SubscriptionResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['Subscription'] = ResolversParentTypes['Subscription']> = ResolversObject<{
  project?: SubscriptionResolver<Maybe<ResolversTypes['Project']>, "project", ParentType, ContextType, RequireFields<SubscriptionprojectArgs, 'id' | 'subgraphError'>>;
  projects?: SubscriptionResolver<Array<ResolversTypes['Project']>, "projects", ParentType, ContextType, RequireFields<SubscriptionprojectsArgs, 'skip' | 'first' | 'subgraphError'>>;
  feedItem?: SubscriptionResolver<Maybe<ResolversTypes['FeedItem']>, "feedItem", ParentType, ContextType, RequireFields<SubscriptionfeedItemArgs, 'id' | 'subgraphError'>>;
  feedItems?: SubscriptionResolver<Array<ResolversTypes['FeedItem']>, "feedItems", ParentType, ContextType, RequireFields<SubscriptionfeedItemsArgs, 'skip' | 'first' | 'subgraphError'>>;
  feedItemEntity?: SubscriptionResolver<Maybe<ResolversTypes['FeedItemEntity']>, "feedItemEntity", ParentType, ContextType, RequireFields<SubscriptionfeedItemEntityArgs, 'id' | 'subgraphError'>>;
  feedItemEntities?: SubscriptionResolver<Array<ResolversTypes['FeedItemEntity']>, "feedItemEntities", ParentType, ContextType, RequireFields<SubscriptionfeedItemEntitiesArgs, 'skip' | 'first' | 'subgraphError'>>;
  feedItemEmbed?: SubscriptionResolver<Maybe<ResolversTypes['FeedItemEmbed']>, "feedItemEmbed", ParentType, ContextType, RequireFields<SubscriptionfeedItemEmbedArgs, 'id' | 'subgraphError'>>;
  feedItemEmbeds?: SubscriptionResolver<Array<ResolversTypes['FeedItemEmbed']>, "feedItemEmbeds", ParentType, ContextType, RequireFields<SubscriptionfeedItemEmbedsArgs, 'skip' | 'first' | 'subgraphError'>>;
  grantShip?: SubscriptionResolver<Maybe<ResolversTypes['GrantShip']>, "grantShip", ParentType, ContextType, RequireFields<SubscriptiongrantShipArgs, 'id' | 'subgraphError'>>;
  grantShips?: SubscriptionResolver<Array<ResolversTypes['GrantShip']>, "grantShips", ParentType, ContextType, RequireFields<SubscriptiongrantShipsArgs, 'skip' | 'first' | 'subgraphError'>>;
  grantShipLookup?: SubscriptionResolver<Maybe<ResolversTypes['GrantShipLookup']>, "grantShipLookup", ParentType, ContextType, RequireFields<SubscriptiongrantShipLookupArgs, 'id' | 'subgraphError'>>;
  grantShipLookups?: SubscriptionResolver<Array<ResolversTypes['GrantShipLookup']>, "grantShipLookups", ParentType, ContextType, RequireFields<SubscriptiongrantShipLookupsArgs, 'skip' | 'first' | 'subgraphError'>>;
  poolIdLookup?: SubscriptionResolver<Maybe<ResolversTypes['PoolIdLookup']>, "poolIdLookup", ParentType, ContextType, RequireFields<SubscriptionpoolIdLookupArgs, 'id' | 'subgraphError'>>;
  poolIdLookups?: SubscriptionResolver<Array<ResolversTypes['PoolIdLookup']>, "poolIdLookups", ParentType, ContextType, RequireFields<SubscriptionpoolIdLookupsArgs, 'skip' | 'first' | 'subgraphError'>>;
  gameManager?: SubscriptionResolver<Maybe<ResolversTypes['GameManager']>, "gameManager", ParentType, ContextType, RequireFields<SubscriptiongameManagerArgs, 'id' | 'subgraphError'>>;
  gameManagers?: SubscriptionResolver<Array<ResolversTypes['GameManager']>, "gameManagers", ParentType, ContextType, RequireFields<SubscriptiongameManagersArgs, 'skip' | 'first' | 'subgraphError'>>;
  gameRound?: SubscriptionResolver<Maybe<ResolversTypes['GameRound']>, "gameRound", ParentType, ContextType, RequireFields<SubscriptiongameRoundArgs, 'id' | 'subgraphError'>>;
  gameRounds?: SubscriptionResolver<Array<ResolversTypes['GameRound']>, "gameRounds", ParentType, ContextType, RequireFields<SubscriptiongameRoundsArgs, 'skip' | 'first' | 'subgraphError'>>;
  profileMemberGroup?: SubscriptionResolver<Maybe<ResolversTypes['ProfileMemberGroup']>, "profileMemberGroup", ParentType, ContextType, RequireFields<SubscriptionprofileMemberGroupArgs, 'id' | 'subgraphError'>>;
  profileMemberGroups?: SubscriptionResolver<Array<ResolversTypes['ProfileMemberGroup']>, "profileMemberGroups", ParentType, ContextType, RequireFields<SubscriptionprofileMemberGroupsArgs, 'skip' | 'first' | 'subgraphError'>>;
  transaction?: SubscriptionResolver<Maybe<ResolversTypes['Transaction']>, "transaction", ParentType, ContextType, RequireFields<SubscriptiontransactionArgs, 'id' | 'subgraphError'>>;
  transactions?: SubscriptionResolver<Array<ResolversTypes['Transaction']>, "transactions", ParentType, ContextType, RequireFields<SubscriptiontransactionsArgs, 'skip' | 'first' | 'subgraphError'>>;
  rawMetadata?: SubscriptionResolver<Array<ResolversTypes['RawMetadata']>, "rawMetadata", ParentType, ContextType, RequireFields<SubscriptionrawMetadataArgs, 'skip' | 'first' | 'subgraphError'>>;
  log?: SubscriptionResolver<Maybe<ResolversTypes['Log']>, "log", ParentType, ContextType, RequireFields<SubscriptionlogArgs, 'id' | 'subgraphError'>>;
  logs?: SubscriptionResolver<Array<ResolversTypes['Log']>, "logs", ParentType, ContextType, RequireFields<SubscriptionlogsArgs, 'skip' | 'first' | 'subgraphError'>>;
  _meta?: SubscriptionResolver<Maybe<ResolversTypes['_Meta_']>, "_meta", ParentType, ContextType, Partial<Subscription_metaArgs>>;
}>;

export type TransactionResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['Transaction'] = ResolversParentTypes['Transaction']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  blockNumber?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  sender?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  txHash?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type _Block_Resolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['_Block_'] = ResolversParentTypes['_Block_']> = ResolversObject<{
  hash?: Resolver<Maybe<ResolversTypes['Bytes']>, ParentType, ContextType>;
  number?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  timestamp?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type _Meta_Resolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['_Meta_'] = ResolversParentTypes['_Meta_']> = ResolversObject<{
  block?: Resolver<ResolversTypes['_Block_'], ParentType, ContextType>;
  deployment?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  hasIndexingErrors?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type Resolvers<ContextType = MeshContext> = ResolversObject<{
  BigDecimal?: GraphQLScalarType;
  BigInt?: GraphQLScalarType;
  Bytes?: GraphQLScalarType;
  FeedItem?: FeedItemResolvers<ContextType>;
  FeedItemEmbed?: FeedItemEmbedResolvers<ContextType>;
  FeedItemEntity?: FeedItemEntityResolvers<ContextType>;
  GameManager?: GameManagerResolvers<ContextType>;
  GameRound?: GameRoundResolvers<ContextType>;
  GrantShip?: GrantShipResolvers<ContextType>;
  GrantShipLookup?: GrantShipLookupResolvers<ContextType>;
  Int8?: GraphQLScalarType;
  Log?: LogResolvers<ContextType>;
  PoolIdLookup?: PoolIdLookupResolvers<ContextType>;
  ProfileMemberGroup?: ProfileMemberGroupResolvers<ContextType>;
  Project?: ProjectResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  RawMetadata?: RawMetadataResolvers<ContextType>;
  Subscription?: SubscriptionResolvers<ContextType>;
  Transaction?: TransactionResolvers<ContextType>;
  _Block_?: _Block_Resolvers<ContextType>;
  _Meta_?: _Meta_Resolvers<ContextType>;
}>;

export type DirectiveResolvers<ContextType = MeshContext> = ResolversObject<{
  entity?: entityDirectiveResolver<any, any, ContextType>;
  subgraphId?: subgraphIdDirectiveResolver<any, any, ContextType>;
  derivedFrom?: derivedFromDirectiveResolver<any, any, ContextType>;
}>;

export type MeshContext = GrantShipsTypes.Context & BaseMeshContext;


import { fileURLToPath } from '@graphql-mesh/utils';
const baseDir = pathModule.join(pathModule.dirname(fileURLToPath(import.meta.url)), '..');

const importFn: ImportFn = <T>(moduleId: string) => {
  const relativeModuleId = (pathModule.isAbsolute(moduleId) ? pathModule.relative(baseDir, moduleId) : moduleId).split('\\').join('/').replace(baseDir + '/', '');
  switch(relativeModuleId) {
    case ".graphclient/sources/grant-ships/introspectionSchema":
      return Promise.resolve(importedModule$0) as T;
    
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
const additionalTypeDefs = [] as any[];
const grantShipsHandler = new GraphqlHandler({
              name: "grant-ships",
              config: {"endpoint":"https://api.thegraph.com/subgraphs/name/jordanlesich/grant-ships"},
              baseDir,
              cache,
              pubsub,
              store: sourcesStore.child("grant-ships"),
              logger: logger.child("grant-ships"),
              importFn,
            });
sources[0] = {
          name: 'grant-ships',
          handler: grantShipsHandler,
          transforms: grantShipsTransforms
        }
const additionalResolvers = [] as any[]
const merger = new(BareMerger as any)({
        cache,
        pubsub,
        logger: logger.child('bareMerger'),
        store: rootStore.child('bareMerger')
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
        document: GetFeedDocument,
        get rawSDL() {
          return printWithCache(GetFeedDocument);
        },
        location: 'GetFeedDocument.graphql'
      },{
        document: GetEntityFeedDocument,
        get rawSDL() {
          return printWithCache(GetEntityFeedDocument);
        },
        location: 'GetEntityFeedDocument.graphql'
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
        document: GetRecentTransactionDocument,
        get rawSDL() {
          return printWithCache(GetRecentTransactionDocument);
        },
        location: 'GetRecentTransactionDocument.graphql'
      },{
        document: ProjectPageQueryDocument,
        get rawSDL() {
          return printWithCache(ProjectPageQueryDocument);
        },
        location: 'ProjectPageQueryDocument.graphql'
      },{
        document: ShipPageQueryDocument,
        get rawSDL() {
          return printWithCache(ShipPageQueryDocument);
        },
        location: 'ShipPageQueryDocument.graphql'
      },{
        document: ShipsPageQueryDocument,
        get rawSDL() {
          return printWithCache(ShipsPageQueryDocument);
        },
        location: 'ShipsPageQueryDocument.graphql'
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
  & { profileMetadata: Pick<RawMetadata, 'pointer'> }
);

export type facDashShipDataQueryVariables = Exact<{ [key: string]: never; }>;


export type facDashShipDataQuery = { shipApplicants: Array<(
    Pick<GrantShip, 'id' | 'name' | 'status' | 'applicationSubmittedTime' | 'shipApplicationBytesData'>
    & { profileMetadata: Pick<RawMetadata, 'pointer'> }
  )>, approvedShips: Array<(
    Pick<GrantShip, 'approvedTime' | 'allocatedAmount' | 'id' | 'name' | 'status' | 'applicationSubmittedTime' | 'shipApplicationBytesData'>
    & { applicationReviewReason?: Maybe<Pick<RawMetadata, 'pointer'>>, profileMetadata: Pick<RawMetadata, 'pointer'> }
  )>, rejectedShips: Array<(
    Pick<GrantShip, 'rejectedTime' | 'id' | 'name' | 'status' | 'applicationSubmittedTime' | 'shipApplicationBytesData'>
    & { applicationReviewReason?: Maybe<Pick<RawMetadata, 'pointer'>>, profileMetadata: Pick<RawMetadata, 'pointer'> }
  )> };

export type FeedDataFragment = (
  Pick<FeedItem, 'id' | 'content' | 'timestamp' | 'sender' | 'tag' | 'details' | 'subjectMetadataPointer'>
  & { subject: Pick<FeedItemEntity, 'id' | 'name' | 'type'>, object?: Maybe<Pick<FeedItemEntity, 'id' | 'name' | 'type'>>, embed?: Maybe<Pick<FeedItemEmbed, 'key' | 'pointer' | 'protocol' | 'content'>> }
);

export type getFeedQueryVariables = Exact<{
  first?: InputMaybe<Scalars['Int']>;
  skip?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<FeedItem_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
}>;


export type getFeedQuery = { feedItems: Array<(
    Pick<FeedItem, 'id' | 'content' | 'timestamp' | 'sender' | 'tag' | 'details' | 'subjectMetadataPointer'>
    & { subject: Pick<FeedItemEntity, 'id' | 'name' | 'type'>, object?: Maybe<Pick<FeedItemEntity, 'id' | 'name' | 'type'>>, embed?: Maybe<Pick<FeedItemEmbed, 'key' | 'pointer' | 'protocol' | 'content'>> }
  )> };

export type getEntityFeedQueryVariables = Exact<{
  first?: InputMaybe<Scalars['Int']>;
  skip?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<FeedItem_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  entityId: Scalars['ID'];
}>;


export type getEntityFeedQuery = { subjectItems: Array<(
    Pick<FeedItem, 'id' | 'content' | 'timestamp' | 'sender' | 'tag' | 'details' | 'subjectMetadataPointer'>
    & { subject: Pick<FeedItemEntity, 'id' | 'name' | 'type'>, object?: Maybe<Pick<FeedItemEntity, 'id' | 'name' | 'type'>>, embed?: Maybe<Pick<FeedItemEmbed, 'key' | 'pointer' | 'protocol' | 'content'>> }
  )>, objectItems: Array<(
    Pick<FeedItem, 'id' | 'content' | 'timestamp' | 'sender' | 'tag' | 'details' | 'subjectMetadataPointer'>
    & { subject: Pick<FeedItemEntity, 'id' | 'name' | 'type'>, object?: Maybe<Pick<FeedItemEntity, 'id' | 'name' | 'type'>>, embed?: Maybe<Pick<FeedItemEmbed, 'key' | 'pointer' | 'protocol' | 'content'>> }
  )> };

export type GameManagerDataFragment = (
  Pick<GameManager, 'id' | 'gameFacilitatorId' | 'rootAccount' | 'tokenAddress' | 'currentRoundId' | 'poolFunds'>
  & { currentRound?: Maybe<(
    Pick<GameRound, 'id' | 'startTime' | 'endTime' | 'totalRoundAmount' | 'gameStatus'>
    & { ships: Array<Pick<GrantShip, 'anchor'>> }
  )> }
);

export type getGameManagerQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type getGameManagerQuery = { gameManager?: Maybe<(
    Pick<GameManager, 'id' | 'gameFacilitatorId' | 'rootAccount' | 'tokenAddress' | 'currentRoundId' | 'poolFunds'>
    & { currentRound?: Maybe<(
      Pick<GameRound, 'id' | 'startTime' | 'endTime' | 'totalRoundAmount' | 'gameStatus'>
      & { ships: Array<Pick<GrantShip, 'anchor'>> }
    )> }
  )> };

export type ProjectDetailsFragment = Pick<Project, 'id' | 'name' | 'profileId' | 'nonce' | 'anchor' | 'owner'>;

export type RawMetadataFragment = Pick<RawMetadata, 'protocol' | 'pointer'>;

export type GetProjectsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetProjectsQuery = { projects: Array<(
    Pick<Project, 'id' | 'name' | 'profileId' | 'nonce' | 'anchor' | 'owner'>
    & { metadata: Pick<RawMetadata, 'protocol' | 'pointer'> }
  )> };

export type getRecentTransactionQueryVariables = Exact<{
  txHash: Scalars['ID'];
}>;


export type getRecentTransactionQuery = { transaction?: Maybe<Pick<Transaction, 'id'>> };

export type projectPageQueryQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type projectPageQueryQuery = { project?: Maybe<(
    Pick<Project, 'id' | 'name' | 'status' | 'owner'>
    & { metadata: Pick<RawMetadata, 'pointer'>, members?: Maybe<Pick<ProfileMemberGroup, 'addresses'>> }
  )> };

export type shipPageQueryQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type shipPageQueryQuery = { grantShip?: Maybe<(
    Pick<GrantShip, 'id' | 'name' | 'status' | 'shipContractAddress' | 'shipApplicationBytesData' | 'owner' | 'allocatedAmount' | 'distributedAmount'>
    & { profileMetadata: Pick<RawMetadata, 'pointer'>, alloProfileMembers?: Maybe<Pick<ProfileMemberGroup, 'addresses'>> }
  )> };

export type ShipCardQueryFragment = (
  Pick<GrantShip, 'id' | 'name' | 'status'>
  & { profileMetadata: Pick<RawMetadata, 'pointer'> }
);

export type ShipsPageQueryQueryVariables = Exact<{ [key: string]: never; }>;


export type ShipsPageQueryQuery = { grantShips: Array<(
    Pick<GrantShip, 'id' | 'name' | 'status'>
    & { profileMetadata: Pick<RawMetadata, 'pointer'> }
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
export const FeedDataFragmentDoc = gql`
    fragment FeedData on FeedItem {
  id
  content
  timestamp
  content
  sender
  tag
  details
  subjectMetadataPointer
  subject {
    id
    name
    type
  }
  object {
    id
    name
    type
  }
  embed {
    key
    pointer
    protocol
    content
  }
}
    ` as unknown as DocumentNode<FeedDataFragment, unknown>;
export const GameManagerDataFragmentDoc = gql`
    fragment GameManagerData on GameManager {
  id
  gameFacilitatorId
  rootAccount
  tokenAddress
  currentRoundId
  poolFunds
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
export const ShipCardQueryFragmentDoc = gql`
    fragment ShipCardQuery on GrantShip {
  id
  name
  status
  profileMetadata {
    pointer
  }
}
    ` as unknown as DocumentNode<ShipCardQueryFragment, unknown>;
export const facDashShipDataDocument = gql`
    query facDashShipData {
  shipApplicants: grantShips(where: {isAwaitingApproval: true}) {
    ...FacShipData
  }
  approvedShips: grantShips(
    where: {isApproved: true, hasSubmittedApplication: true}
  ) {
    ...FacShipData
    approvedTime
    allocatedAmount
    applicationReviewReason {
      pointer
    }
  }
  rejectedShips: grantShips(where: {isRejected: true}) {
    ...FacShipData
    rejectedTime
    applicationReviewReason {
      pointer
    }
  }
}
    ${FacShipDataFragmentDoc}` as unknown as DocumentNode<facDashShipDataQuery, facDashShipDataQueryVariables>;
export const getFeedDocument = gql`
    query getFeed($first: Int, $skip: Int, $orderBy: FeedItem_orderBy, $orderDirection: OrderDirection) {
  feedItems(
    first: $first
    skip: $skip
    orderBy: $orderBy
    orderDirection: $orderDirection
  ) {
    ...FeedData
  }
}
    ${FeedDataFragmentDoc}` as unknown as DocumentNode<getFeedQuery, getFeedQueryVariables>;
export const getEntityFeedDocument = gql`
    query getEntityFeed($first: Int, $skip: Int, $orderBy: FeedItem_orderBy, $orderDirection: OrderDirection, $entityId: ID!) {
  subjectItems: feedItems(
    first: $first
    skip: $skip
    orderBy: $orderBy
    orderDirection: $orderDirection
    where: {subjectId: $entityId}
  ) {
    ...FeedData
  }
  objectItems: feedItems(
    skip: $skip
    orderBy: $orderBy
    orderDirection: $orderDirection
    where: {objectId: $entityId}
  ) {
    ...FeedData
  }
}
    ${FeedDataFragmentDoc}` as unknown as DocumentNode<getEntityFeedQuery, getEntityFeedQueryVariables>;
export const getGameManagerDocument = gql`
    query getGameManager($id: ID!) {
  gameManager(id: $id) {
    ...GameManagerData
  }
}
    ${GameManagerDataFragmentDoc}` as unknown as DocumentNode<getGameManagerQuery, getGameManagerQueryVariables>;
export const GetProjectsDocument = gql`
    query GetProjects {
  projects {
    ...ProjectDetails
    metadata {
      ...RawMetadata
    }
  }
}
    ${ProjectDetailsFragmentDoc}
${RawMetadataFragmentDoc}` as unknown as DocumentNode<GetProjectsQuery, GetProjectsQueryVariables>;
export const getRecentTransactionDocument = gql`
    query getRecentTransaction($txHash: ID!) {
  transaction(id: $txHash) {
    id
  }
}
    ` as unknown as DocumentNode<getRecentTransactionQuery, getRecentTransactionQueryVariables>;
export const projectPageQueryDocument = gql`
    query projectPageQuery($id: ID!) {
  project(id: $id) {
    id
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
export const shipPageQueryDocument = gql`
    query shipPageQuery($id: ID!) {
  grantShip(id: $id) {
    id
    name
    status
    shipContractAddress
    shipApplicationBytesData
    profileMetadata {
      pointer
    }
    owner
    alloProfileMembers {
      addresses
    }
    allocatedAmount
    distributedAmount
  }
}
    ` as unknown as DocumentNode<shipPageQueryQuery, shipPageQueryQueryVariables>;
export const ShipsPageQueryDocument = gql`
    query ShipsPageQuery {
  grantShips(where: {isApproved: true}) {
    ...ShipCardQuery
  }
}
    ${ShipCardQueryFragmentDoc}` as unknown as DocumentNode<ShipsPageQueryQuery, ShipsPageQueryQueryVariables>;










export type Requester<C = {}, E = unknown> = <R, V>(doc: DocumentNode, vars?: V, options?: C) => Promise<R> | AsyncIterable<R>
export function getSdk<C, E>(requester: Requester<C, E>) {
  return {
    facDashShipData(variables?: facDashShipDataQueryVariables, options?: C): Promise<facDashShipDataQuery> {
      return requester<facDashShipDataQuery, facDashShipDataQueryVariables>(facDashShipDataDocument, variables, options) as Promise<facDashShipDataQuery>;
    },
    getFeed(variables?: getFeedQueryVariables, options?: C): Promise<getFeedQuery> {
      return requester<getFeedQuery, getFeedQueryVariables>(getFeedDocument, variables, options) as Promise<getFeedQuery>;
    },
    getEntityFeed(variables: getEntityFeedQueryVariables, options?: C): Promise<getEntityFeedQuery> {
      return requester<getEntityFeedQuery, getEntityFeedQueryVariables>(getEntityFeedDocument, variables, options) as Promise<getEntityFeedQuery>;
    },
    getGameManager(variables: getGameManagerQueryVariables, options?: C): Promise<getGameManagerQuery> {
      return requester<getGameManagerQuery, getGameManagerQueryVariables>(getGameManagerDocument, variables, options) as Promise<getGameManagerQuery>;
    },
    GetProjects(variables?: GetProjectsQueryVariables, options?: C): Promise<GetProjectsQuery> {
      return requester<GetProjectsQuery, GetProjectsQueryVariables>(GetProjectsDocument, variables, options) as Promise<GetProjectsQuery>;
    },
    getRecentTransaction(variables: getRecentTransactionQueryVariables, options?: C): Promise<getRecentTransactionQuery> {
      return requester<getRecentTransactionQuery, getRecentTransactionQueryVariables>(getRecentTransactionDocument, variables, options) as Promise<getRecentTransactionQuery>;
    },
    projectPageQuery(variables: projectPageQueryQueryVariables, options?: C): Promise<projectPageQueryQuery> {
      return requester<projectPageQueryQuery, projectPageQueryQueryVariables>(projectPageQueryDocument, variables, options) as Promise<projectPageQueryQuery>;
    },
    shipPageQuery(variables: shipPageQueryQueryVariables, options?: C): Promise<shipPageQueryQuery> {
      return requester<shipPageQueryQuery, shipPageQueryQueryVariables>(shipPageQueryDocument, variables, options) as Promise<shipPageQueryQuery>;
    },
    ShipsPageQuery(variables?: ShipsPageQueryQueryVariables, options?: C): Promise<ShipsPageQueryQuery> {
      return requester<ShipsPageQueryQuery, ShipsPageQueryQueryVariables>(ShipsPageQueryDocument, variables, options) as Promise<ShipsPageQueryQuery>;
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;