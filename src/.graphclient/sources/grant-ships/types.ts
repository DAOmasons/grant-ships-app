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
  BigDecimal: any;
  BigInt: any;
  Bytes: any;
  Int8: any;
};

export type Aggregation_interval =
  | 'hour'
  | 'day';

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
  poolId: Scalars['BigInt'];
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
  poolId?: InputMaybe<Scalars['BigInt']>;
  poolId_not?: InputMaybe<Scalars['BigInt']>;
  poolId_gt?: InputMaybe<Scalars['BigInt']>;
  poolId_lt?: InputMaybe<Scalars['BigInt']>;
  poolId_gte?: InputMaybe<Scalars['BigInt']>;
  poolId_lte?: InputMaybe<Scalars['BigInt']>;
  poolId_in?: InputMaybe<Array<Scalars['BigInt']>>;
  poolId_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
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
  | 'poolId'
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
  | 'currentRound__totalDistributedAmount'
  | 'currentRound__gameStatus'
  | 'currentRound__isGameActive'
  | 'currentRound__realStartTime'
  | 'currentRound__realEndTime'
  | 'poolFunds';

export type GameRound = {
  id: Scalars['ID'];
  startTime: Scalars['BigInt'];
  endTime: Scalars['BigInt'];
  totalRoundAmount: Scalars['BigInt'];
  totalAllocatedAmount: Scalars['BigInt'];
  totalDistributedAmount: Scalars['BigInt'];
  gameStatus: Scalars['Int'];
  ships: Array<GrantShip>;
  isGameActive: Scalars['Boolean'];
  realStartTime?: Maybe<Scalars['BigInt']>;
  realEndTime?: Maybe<Scalars['BigInt']>;
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
  totalDistributedAmount?: InputMaybe<Scalars['BigInt']>;
  totalDistributedAmount_not?: InputMaybe<Scalars['BigInt']>;
  totalDistributedAmount_gt?: InputMaybe<Scalars['BigInt']>;
  totalDistributedAmount_lt?: InputMaybe<Scalars['BigInt']>;
  totalDistributedAmount_gte?: InputMaybe<Scalars['BigInt']>;
  totalDistributedAmount_lte?: InputMaybe<Scalars['BigInt']>;
  totalDistributedAmount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  totalDistributedAmount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
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
  isGameActive?: InputMaybe<Scalars['Boolean']>;
  isGameActive_not?: InputMaybe<Scalars['Boolean']>;
  isGameActive_in?: InputMaybe<Array<Scalars['Boolean']>>;
  isGameActive_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  realStartTime?: InputMaybe<Scalars['BigInt']>;
  realStartTime_not?: InputMaybe<Scalars['BigInt']>;
  realStartTime_gt?: InputMaybe<Scalars['BigInt']>;
  realStartTime_lt?: InputMaybe<Scalars['BigInt']>;
  realStartTime_gte?: InputMaybe<Scalars['BigInt']>;
  realStartTime_lte?: InputMaybe<Scalars['BigInt']>;
  realStartTime_in?: InputMaybe<Array<Scalars['BigInt']>>;
  realStartTime_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  realEndTime?: InputMaybe<Scalars['BigInt']>;
  realEndTime_not?: InputMaybe<Scalars['BigInt']>;
  realEndTime_gt?: InputMaybe<Scalars['BigInt']>;
  realEndTime_lt?: InputMaybe<Scalars['BigInt']>;
  realEndTime_gte?: InputMaybe<Scalars['BigInt']>;
  realEndTime_lte?: InputMaybe<Scalars['BigInt']>;
  realEndTime_in?: InputMaybe<Array<Scalars['BigInt']>>;
  realEndTime_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
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
  | 'totalDistributedAmount'
  | 'gameStatus'
  | 'ships'
  | 'isGameActive'
  | 'realStartTime'
  | 'realEndTime';

export type Grant = {
  id: Scalars['ID'];
  projectId: Project;
  shipId: GrantShip;
  lastUpdated: Scalars['BigInt'];
  grantStatus: Scalars['Int'];
  grantApplicationBytes: Scalars['Bytes'];
  currentMilestoneIndex: Scalars['BigInt'];
  milestonesAmount: Scalars['BigInt'];
  milestones?: Maybe<Array<Milestone>>;
  shipApprovalReason?: Maybe<RawMetadata>;
  hasShipApproved?: Maybe<Scalars['Boolean']>;
  amtAllocated?: Maybe<Scalars['BigInt']>;
  amtDistributed?: Maybe<Scalars['BigInt']>;
  allocatedBy?: Maybe<Scalars['Bytes']>;
  facilitatorReason?: Maybe<RawMetadata>;
  hasFacilitatorApproved?: Maybe<Scalars['Boolean']>;
  milestonesApproved?: Maybe<Scalars['Boolean']>;
  milestonesApprovedReason?: Maybe<RawMetadata>;
  currentMilestoneRejectedReason?: Maybe<RawMetadata>;
};


export type GrantmilestonesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Milestone_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Milestone_filter>;
};

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
  poolFunded: Scalars['Boolean'];
  balance: Scalars['BigInt'];
  grants: Array<Grant>;
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
  hatId?: Maybe<Scalars['BigInt']>;
  shipContractAddress?: Maybe<Scalars['Bytes']>;
  shipLaunched?: Maybe<Scalars['Boolean']>;
  poolActive?: Maybe<Scalars['Boolean']>;
  isAllocated?: Maybe<Scalars['Boolean']>;
  allocatedAmount?: Maybe<Scalars['BigInt']>;
  isDistributed?: Maybe<Scalars['Boolean']>;
  distributedAmount?: Maybe<Scalars['BigInt']>;
};


export type GrantShipgrantsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Grant_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Grant_filter>;
};

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
  poolFunded?: InputMaybe<Scalars['Boolean']>;
  poolFunded_not?: InputMaybe<Scalars['Boolean']>;
  poolFunded_in?: InputMaybe<Array<Scalars['Boolean']>>;
  poolFunded_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  balance?: InputMaybe<Scalars['BigInt']>;
  balance_not?: InputMaybe<Scalars['BigInt']>;
  balance_gt?: InputMaybe<Scalars['BigInt']>;
  balance_lt?: InputMaybe<Scalars['BigInt']>;
  balance_gte?: InputMaybe<Scalars['BigInt']>;
  balance_lte?: InputMaybe<Scalars['BigInt']>;
  balance_in?: InputMaybe<Array<Scalars['BigInt']>>;
  balance_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  grants_?: InputMaybe<Grant_filter>;
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
  hatId?: InputMaybe<Scalars['BigInt']>;
  hatId_not?: InputMaybe<Scalars['BigInt']>;
  hatId_gt?: InputMaybe<Scalars['BigInt']>;
  hatId_lt?: InputMaybe<Scalars['BigInt']>;
  hatId_gte?: InputMaybe<Scalars['BigInt']>;
  hatId_lte?: InputMaybe<Scalars['BigInt']>;
  hatId_in?: InputMaybe<Array<Scalars['BigInt']>>;
  hatId_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
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
  poolActive?: InputMaybe<Scalars['Boolean']>;
  poolActive_not?: InputMaybe<Scalars['Boolean']>;
  poolActive_in?: InputMaybe<Array<Scalars['Boolean']>>;
  poolActive_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
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
  | 'poolFunded'
  | 'balance'
  | 'grants'
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
  | 'hatId'
  | 'shipContractAddress'
  | 'shipLaunched'
  | 'poolActive'
  | 'isAllocated'
  | 'allocatedAmount'
  | 'isDistributed'
  | 'distributedAmount';

export type Grant_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  projectId?: InputMaybe<Scalars['String']>;
  projectId_not?: InputMaybe<Scalars['String']>;
  projectId_gt?: InputMaybe<Scalars['String']>;
  projectId_lt?: InputMaybe<Scalars['String']>;
  projectId_gte?: InputMaybe<Scalars['String']>;
  projectId_lte?: InputMaybe<Scalars['String']>;
  projectId_in?: InputMaybe<Array<Scalars['String']>>;
  projectId_not_in?: InputMaybe<Array<Scalars['String']>>;
  projectId_contains?: InputMaybe<Scalars['String']>;
  projectId_contains_nocase?: InputMaybe<Scalars['String']>;
  projectId_not_contains?: InputMaybe<Scalars['String']>;
  projectId_not_contains_nocase?: InputMaybe<Scalars['String']>;
  projectId_starts_with?: InputMaybe<Scalars['String']>;
  projectId_starts_with_nocase?: InputMaybe<Scalars['String']>;
  projectId_not_starts_with?: InputMaybe<Scalars['String']>;
  projectId_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  projectId_ends_with?: InputMaybe<Scalars['String']>;
  projectId_ends_with_nocase?: InputMaybe<Scalars['String']>;
  projectId_not_ends_with?: InputMaybe<Scalars['String']>;
  projectId_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  projectId_?: InputMaybe<Project_filter>;
  shipId?: InputMaybe<Scalars['String']>;
  shipId_not?: InputMaybe<Scalars['String']>;
  shipId_gt?: InputMaybe<Scalars['String']>;
  shipId_lt?: InputMaybe<Scalars['String']>;
  shipId_gte?: InputMaybe<Scalars['String']>;
  shipId_lte?: InputMaybe<Scalars['String']>;
  shipId_in?: InputMaybe<Array<Scalars['String']>>;
  shipId_not_in?: InputMaybe<Array<Scalars['String']>>;
  shipId_contains?: InputMaybe<Scalars['String']>;
  shipId_contains_nocase?: InputMaybe<Scalars['String']>;
  shipId_not_contains?: InputMaybe<Scalars['String']>;
  shipId_not_contains_nocase?: InputMaybe<Scalars['String']>;
  shipId_starts_with?: InputMaybe<Scalars['String']>;
  shipId_starts_with_nocase?: InputMaybe<Scalars['String']>;
  shipId_not_starts_with?: InputMaybe<Scalars['String']>;
  shipId_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  shipId_ends_with?: InputMaybe<Scalars['String']>;
  shipId_ends_with_nocase?: InputMaybe<Scalars['String']>;
  shipId_not_ends_with?: InputMaybe<Scalars['String']>;
  shipId_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  shipId_?: InputMaybe<GrantShip_filter>;
  lastUpdated?: InputMaybe<Scalars['BigInt']>;
  lastUpdated_not?: InputMaybe<Scalars['BigInt']>;
  lastUpdated_gt?: InputMaybe<Scalars['BigInt']>;
  lastUpdated_lt?: InputMaybe<Scalars['BigInt']>;
  lastUpdated_gte?: InputMaybe<Scalars['BigInt']>;
  lastUpdated_lte?: InputMaybe<Scalars['BigInt']>;
  lastUpdated_in?: InputMaybe<Array<Scalars['BigInt']>>;
  lastUpdated_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  grantStatus?: InputMaybe<Scalars['Int']>;
  grantStatus_not?: InputMaybe<Scalars['Int']>;
  grantStatus_gt?: InputMaybe<Scalars['Int']>;
  grantStatus_lt?: InputMaybe<Scalars['Int']>;
  grantStatus_gte?: InputMaybe<Scalars['Int']>;
  grantStatus_lte?: InputMaybe<Scalars['Int']>;
  grantStatus_in?: InputMaybe<Array<Scalars['Int']>>;
  grantStatus_not_in?: InputMaybe<Array<Scalars['Int']>>;
  grantApplicationBytes?: InputMaybe<Scalars['Bytes']>;
  grantApplicationBytes_not?: InputMaybe<Scalars['Bytes']>;
  grantApplicationBytes_gt?: InputMaybe<Scalars['Bytes']>;
  grantApplicationBytes_lt?: InputMaybe<Scalars['Bytes']>;
  grantApplicationBytes_gte?: InputMaybe<Scalars['Bytes']>;
  grantApplicationBytes_lte?: InputMaybe<Scalars['Bytes']>;
  grantApplicationBytes_in?: InputMaybe<Array<Scalars['Bytes']>>;
  grantApplicationBytes_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  grantApplicationBytes_contains?: InputMaybe<Scalars['Bytes']>;
  grantApplicationBytes_not_contains?: InputMaybe<Scalars['Bytes']>;
  currentMilestoneIndex?: InputMaybe<Scalars['BigInt']>;
  currentMilestoneIndex_not?: InputMaybe<Scalars['BigInt']>;
  currentMilestoneIndex_gt?: InputMaybe<Scalars['BigInt']>;
  currentMilestoneIndex_lt?: InputMaybe<Scalars['BigInt']>;
  currentMilestoneIndex_gte?: InputMaybe<Scalars['BigInt']>;
  currentMilestoneIndex_lte?: InputMaybe<Scalars['BigInt']>;
  currentMilestoneIndex_in?: InputMaybe<Array<Scalars['BigInt']>>;
  currentMilestoneIndex_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  milestonesAmount?: InputMaybe<Scalars['BigInt']>;
  milestonesAmount_not?: InputMaybe<Scalars['BigInt']>;
  milestonesAmount_gt?: InputMaybe<Scalars['BigInt']>;
  milestonesAmount_lt?: InputMaybe<Scalars['BigInt']>;
  milestonesAmount_gte?: InputMaybe<Scalars['BigInt']>;
  milestonesAmount_lte?: InputMaybe<Scalars['BigInt']>;
  milestonesAmount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  milestonesAmount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  milestones?: InputMaybe<Array<Scalars['String']>>;
  milestones_not?: InputMaybe<Array<Scalars['String']>>;
  milestones_contains?: InputMaybe<Array<Scalars['String']>>;
  milestones_contains_nocase?: InputMaybe<Array<Scalars['String']>>;
  milestones_not_contains?: InputMaybe<Array<Scalars['String']>>;
  milestones_not_contains_nocase?: InputMaybe<Array<Scalars['String']>>;
  milestones_?: InputMaybe<Milestone_filter>;
  shipApprovalReason?: InputMaybe<Scalars['String']>;
  shipApprovalReason_not?: InputMaybe<Scalars['String']>;
  shipApprovalReason_gt?: InputMaybe<Scalars['String']>;
  shipApprovalReason_lt?: InputMaybe<Scalars['String']>;
  shipApprovalReason_gte?: InputMaybe<Scalars['String']>;
  shipApprovalReason_lte?: InputMaybe<Scalars['String']>;
  shipApprovalReason_in?: InputMaybe<Array<Scalars['String']>>;
  shipApprovalReason_not_in?: InputMaybe<Array<Scalars['String']>>;
  shipApprovalReason_contains?: InputMaybe<Scalars['String']>;
  shipApprovalReason_contains_nocase?: InputMaybe<Scalars['String']>;
  shipApprovalReason_not_contains?: InputMaybe<Scalars['String']>;
  shipApprovalReason_not_contains_nocase?: InputMaybe<Scalars['String']>;
  shipApprovalReason_starts_with?: InputMaybe<Scalars['String']>;
  shipApprovalReason_starts_with_nocase?: InputMaybe<Scalars['String']>;
  shipApprovalReason_not_starts_with?: InputMaybe<Scalars['String']>;
  shipApprovalReason_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  shipApprovalReason_ends_with?: InputMaybe<Scalars['String']>;
  shipApprovalReason_ends_with_nocase?: InputMaybe<Scalars['String']>;
  shipApprovalReason_not_ends_with?: InputMaybe<Scalars['String']>;
  shipApprovalReason_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  shipApprovalReason_?: InputMaybe<RawMetadata_filter>;
  hasShipApproved?: InputMaybe<Scalars['Boolean']>;
  hasShipApproved_not?: InputMaybe<Scalars['Boolean']>;
  hasShipApproved_in?: InputMaybe<Array<Scalars['Boolean']>>;
  hasShipApproved_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  amtAllocated?: InputMaybe<Scalars['BigInt']>;
  amtAllocated_not?: InputMaybe<Scalars['BigInt']>;
  amtAllocated_gt?: InputMaybe<Scalars['BigInt']>;
  amtAllocated_lt?: InputMaybe<Scalars['BigInt']>;
  amtAllocated_gte?: InputMaybe<Scalars['BigInt']>;
  amtAllocated_lte?: InputMaybe<Scalars['BigInt']>;
  amtAllocated_in?: InputMaybe<Array<Scalars['BigInt']>>;
  amtAllocated_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  amtDistributed?: InputMaybe<Scalars['BigInt']>;
  amtDistributed_not?: InputMaybe<Scalars['BigInt']>;
  amtDistributed_gt?: InputMaybe<Scalars['BigInt']>;
  amtDistributed_lt?: InputMaybe<Scalars['BigInt']>;
  amtDistributed_gte?: InputMaybe<Scalars['BigInt']>;
  amtDistributed_lte?: InputMaybe<Scalars['BigInt']>;
  amtDistributed_in?: InputMaybe<Array<Scalars['BigInt']>>;
  amtDistributed_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  allocatedBy?: InputMaybe<Scalars['Bytes']>;
  allocatedBy_not?: InputMaybe<Scalars['Bytes']>;
  allocatedBy_gt?: InputMaybe<Scalars['Bytes']>;
  allocatedBy_lt?: InputMaybe<Scalars['Bytes']>;
  allocatedBy_gte?: InputMaybe<Scalars['Bytes']>;
  allocatedBy_lte?: InputMaybe<Scalars['Bytes']>;
  allocatedBy_in?: InputMaybe<Array<Scalars['Bytes']>>;
  allocatedBy_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  allocatedBy_contains?: InputMaybe<Scalars['Bytes']>;
  allocatedBy_not_contains?: InputMaybe<Scalars['Bytes']>;
  facilitatorReason?: InputMaybe<Scalars['String']>;
  facilitatorReason_not?: InputMaybe<Scalars['String']>;
  facilitatorReason_gt?: InputMaybe<Scalars['String']>;
  facilitatorReason_lt?: InputMaybe<Scalars['String']>;
  facilitatorReason_gte?: InputMaybe<Scalars['String']>;
  facilitatorReason_lte?: InputMaybe<Scalars['String']>;
  facilitatorReason_in?: InputMaybe<Array<Scalars['String']>>;
  facilitatorReason_not_in?: InputMaybe<Array<Scalars['String']>>;
  facilitatorReason_contains?: InputMaybe<Scalars['String']>;
  facilitatorReason_contains_nocase?: InputMaybe<Scalars['String']>;
  facilitatorReason_not_contains?: InputMaybe<Scalars['String']>;
  facilitatorReason_not_contains_nocase?: InputMaybe<Scalars['String']>;
  facilitatorReason_starts_with?: InputMaybe<Scalars['String']>;
  facilitatorReason_starts_with_nocase?: InputMaybe<Scalars['String']>;
  facilitatorReason_not_starts_with?: InputMaybe<Scalars['String']>;
  facilitatorReason_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  facilitatorReason_ends_with?: InputMaybe<Scalars['String']>;
  facilitatorReason_ends_with_nocase?: InputMaybe<Scalars['String']>;
  facilitatorReason_not_ends_with?: InputMaybe<Scalars['String']>;
  facilitatorReason_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  facilitatorReason_?: InputMaybe<RawMetadata_filter>;
  hasFacilitatorApproved?: InputMaybe<Scalars['Boolean']>;
  hasFacilitatorApproved_not?: InputMaybe<Scalars['Boolean']>;
  hasFacilitatorApproved_in?: InputMaybe<Array<Scalars['Boolean']>>;
  hasFacilitatorApproved_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  milestonesApproved?: InputMaybe<Scalars['Boolean']>;
  milestonesApproved_not?: InputMaybe<Scalars['Boolean']>;
  milestonesApproved_in?: InputMaybe<Array<Scalars['Boolean']>>;
  milestonesApproved_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  milestonesApprovedReason?: InputMaybe<Scalars['String']>;
  milestonesApprovedReason_not?: InputMaybe<Scalars['String']>;
  milestonesApprovedReason_gt?: InputMaybe<Scalars['String']>;
  milestonesApprovedReason_lt?: InputMaybe<Scalars['String']>;
  milestonesApprovedReason_gte?: InputMaybe<Scalars['String']>;
  milestonesApprovedReason_lte?: InputMaybe<Scalars['String']>;
  milestonesApprovedReason_in?: InputMaybe<Array<Scalars['String']>>;
  milestonesApprovedReason_not_in?: InputMaybe<Array<Scalars['String']>>;
  milestonesApprovedReason_contains?: InputMaybe<Scalars['String']>;
  milestonesApprovedReason_contains_nocase?: InputMaybe<Scalars['String']>;
  milestonesApprovedReason_not_contains?: InputMaybe<Scalars['String']>;
  milestonesApprovedReason_not_contains_nocase?: InputMaybe<Scalars['String']>;
  milestonesApprovedReason_starts_with?: InputMaybe<Scalars['String']>;
  milestonesApprovedReason_starts_with_nocase?: InputMaybe<Scalars['String']>;
  milestonesApprovedReason_not_starts_with?: InputMaybe<Scalars['String']>;
  milestonesApprovedReason_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  milestonesApprovedReason_ends_with?: InputMaybe<Scalars['String']>;
  milestonesApprovedReason_ends_with_nocase?: InputMaybe<Scalars['String']>;
  milestonesApprovedReason_not_ends_with?: InputMaybe<Scalars['String']>;
  milestonesApprovedReason_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  milestonesApprovedReason_?: InputMaybe<RawMetadata_filter>;
  currentMilestoneRejectedReason?: InputMaybe<Scalars['String']>;
  currentMilestoneRejectedReason_not?: InputMaybe<Scalars['String']>;
  currentMilestoneRejectedReason_gt?: InputMaybe<Scalars['String']>;
  currentMilestoneRejectedReason_lt?: InputMaybe<Scalars['String']>;
  currentMilestoneRejectedReason_gte?: InputMaybe<Scalars['String']>;
  currentMilestoneRejectedReason_lte?: InputMaybe<Scalars['String']>;
  currentMilestoneRejectedReason_in?: InputMaybe<Array<Scalars['String']>>;
  currentMilestoneRejectedReason_not_in?: InputMaybe<Array<Scalars['String']>>;
  currentMilestoneRejectedReason_contains?: InputMaybe<Scalars['String']>;
  currentMilestoneRejectedReason_contains_nocase?: InputMaybe<Scalars['String']>;
  currentMilestoneRejectedReason_not_contains?: InputMaybe<Scalars['String']>;
  currentMilestoneRejectedReason_not_contains_nocase?: InputMaybe<Scalars['String']>;
  currentMilestoneRejectedReason_starts_with?: InputMaybe<Scalars['String']>;
  currentMilestoneRejectedReason_starts_with_nocase?: InputMaybe<Scalars['String']>;
  currentMilestoneRejectedReason_not_starts_with?: InputMaybe<Scalars['String']>;
  currentMilestoneRejectedReason_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  currentMilestoneRejectedReason_ends_with?: InputMaybe<Scalars['String']>;
  currentMilestoneRejectedReason_ends_with_nocase?: InputMaybe<Scalars['String']>;
  currentMilestoneRejectedReason_not_ends_with?: InputMaybe<Scalars['String']>;
  currentMilestoneRejectedReason_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  currentMilestoneRejectedReason_?: InputMaybe<RawMetadata_filter>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<Grant_filter>>>;
  or?: InputMaybe<Array<InputMaybe<Grant_filter>>>;
};

export type Grant_orderBy =
  | 'id'
  | 'projectId'
  | 'projectId__id'
  | 'projectId__profileId'
  | 'projectId__status'
  | 'projectId__nonce'
  | 'projectId__name'
  | 'projectId__owner'
  | 'projectId__anchor'
  | 'projectId__blockNumber'
  | 'projectId__blockTimestamp'
  | 'projectId__transactionHash'
  | 'projectId__totalAmountReceived'
  | 'shipId'
  | 'shipId__id'
  | 'shipId__profileId'
  | 'shipId__nonce'
  | 'shipId__name'
  | 'shipId__owner'
  | 'shipId__anchor'
  | 'shipId__blockNumber'
  | 'shipId__blockTimestamp'
  | 'shipId__transactionHash'
  | 'shipId__status'
  | 'shipId__poolFunded'
  | 'shipId__balance'
  | 'shipId__shipApplicationBytesData'
  | 'shipId__applicationSubmittedTime'
  | 'shipId__isAwaitingApproval'
  | 'shipId__hasSubmittedApplication'
  | 'shipId__isApproved'
  | 'shipId__approvedTime'
  | 'shipId__isRejected'
  | 'shipId__rejectedTime'
  | 'shipId__poolId'
  | 'shipId__hatId'
  | 'shipId__shipContractAddress'
  | 'shipId__shipLaunched'
  | 'shipId__poolActive'
  | 'shipId__isAllocated'
  | 'shipId__allocatedAmount'
  | 'shipId__isDistributed'
  | 'shipId__distributedAmount'
  | 'lastUpdated'
  | 'grantStatus'
  | 'grantApplicationBytes'
  | 'currentMilestoneIndex'
  | 'milestonesAmount'
  | 'milestones'
  | 'shipApprovalReason'
  | 'shipApprovalReason__id'
  | 'shipApprovalReason__protocol'
  | 'shipApprovalReason__pointer'
  | 'hasShipApproved'
  | 'amtAllocated'
  | 'amtDistributed'
  | 'allocatedBy'
  | 'facilitatorReason'
  | 'facilitatorReason__id'
  | 'facilitatorReason__protocol'
  | 'facilitatorReason__pointer'
  | 'hasFacilitatorApproved'
  | 'milestonesApproved'
  | 'milestonesApprovedReason'
  | 'milestonesApprovedReason__id'
  | 'milestonesApprovedReason__protocol'
  | 'milestonesApprovedReason__pointer'
  | 'currentMilestoneRejectedReason'
  | 'currentMilestoneRejectedReason__id'
  | 'currentMilestoneRejectedReason__protocol'
  | 'currentMilestoneRejectedReason__pointer';

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

export type Milestone = {
  id: Scalars['ID'];
  amountPercentage: Scalars['Bytes'];
  mmetadata: Scalars['BigInt'];
  amount: Scalars['BigInt'];
  status: Scalars['Int'];
  lastUpdated: Scalars['BigInt'];
};

export type Milestone_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  amountPercentage?: InputMaybe<Scalars['Bytes']>;
  amountPercentage_not?: InputMaybe<Scalars['Bytes']>;
  amountPercentage_gt?: InputMaybe<Scalars['Bytes']>;
  amountPercentage_lt?: InputMaybe<Scalars['Bytes']>;
  amountPercentage_gte?: InputMaybe<Scalars['Bytes']>;
  amountPercentage_lte?: InputMaybe<Scalars['Bytes']>;
  amountPercentage_in?: InputMaybe<Array<Scalars['Bytes']>>;
  amountPercentage_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  amountPercentage_contains?: InputMaybe<Scalars['Bytes']>;
  amountPercentage_not_contains?: InputMaybe<Scalars['Bytes']>;
  mmetadata?: InputMaybe<Scalars['BigInt']>;
  mmetadata_not?: InputMaybe<Scalars['BigInt']>;
  mmetadata_gt?: InputMaybe<Scalars['BigInt']>;
  mmetadata_lt?: InputMaybe<Scalars['BigInt']>;
  mmetadata_gte?: InputMaybe<Scalars['BigInt']>;
  mmetadata_lte?: InputMaybe<Scalars['BigInt']>;
  mmetadata_in?: InputMaybe<Array<Scalars['BigInt']>>;
  mmetadata_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  amount?: InputMaybe<Scalars['BigInt']>;
  amount_not?: InputMaybe<Scalars['BigInt']>;
  amount_gt?: InputMaybe<Scalars['BigInt']>;
  amount_lt?: InputMaybe<Scalars['BigInt']>;
  amount_gte?: InputMaybe<Scalars['BigInt']>;
  amount_lte?: InputMaybe<Scalars['BigInt']>;
  amount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  amount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  status?: InputMaybe<Scalars['Int']>;
  status_not?: InputMaybe<Scalars['Int']>;
  status_gt?: InputMaybe<Scalars['Int']>;
  status_lt?: InputMaybe<Scalars['Int']>;
  status_gte?: InputMaybe<Scalars['Int']>;
  status_lte?: InputMaybe<Scalars['Int']>;
  status_in?: InputMaybe<Array<Scalars['Int']>>;
  status_not_in?: InputMaybe<Array<Scalars['Int']>>;
  lastUpdated?: InputMaybe<Scalars['BigInt']>;
  lastUpdated_not?: InputMaybe<Scalars['BigInt']>;
  lastUpdated_gt?: InputMaybe<Scalars['BigInt']>;
  lastUpdated_lt?: InputMaybe<Scalars['BigInt']>;
  lastUpdated_gte?: InputMaybe<Scalars['BigInt']>;
  lastUpdated_lte?: InputMaybe<Scalars['BigInt']>;
  lastUpdated_in?: InputMaybe<Array<Scalars['BigInt']>>;
  lastUpdated_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<Milestone_filter>>>;
  or?: InputMaybe<Array<InputMaybe<Milestone_filter>>>;
};

export type Milestone_orderBy =
  | 'id'
  | 'amountPercentage'
  | 'mmetadata'
  | 'amount'
  | 'status'
  | 'lastUpdated';

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
  grants: Array<Grant>;
  members?: Maybe<ProfileMemberGroup>;
  totalAmountReceived: Scalars['BigInt'];
};


export type ProjectgrantsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Grant_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Grant_filter>;
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
  grants_?: InputMaybe<Grant_filter>;
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
  totalAmountReceived?: InputMaybe<Scalars['BigInt']>;
  totalAmountReceived_not?: InputMaybe<Scalars['BigInt']>;
  totalAmountReceived_gt?: InputMaybe<Scalars['BigInt']>;
  totalAmountReceived_lt?: InputMaybe<Scalars['BigInt']>;
  totalAmountReceived_gte?: InputMaybe<Scalars['BigInt']>;
  totalAmountReceived_lte?: InputMaybe<Scalars['BigInt']>;
  totalAmountReceived_in?: InputMaybe<Array<Scalars['BigInt']>>;
  totalAmountReceived_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
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
  | 'grants'
  | 'members'
  | 'members__id'
  | 'totalAmountReceived';

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
  poolIdLookup?: Maybe<PoolIdLookup>;
  poolIdLookups: Array<PoolIdLookup>;
  gameManager?: Maybe<GameManager>;
  gameManagers: Array<GameManager>;
  gameRound?: Maybe<GameRound>;
  gameRounds: Array<GameRound>;
  grant?: Maybe<Grant>;
  grants: Array<Grant>;
  milestone?: Maybe<Milestone>;
  milestones: Array<Milestone>;
  profileMemberGroup?: Maybe<ProfileMemberGroup>;
  profileMemberGroups: Array<ProfileMemberGroup>;
  transaction?: Maybe<Transaction>;
  transactions: Array<Transaction>;
  rawMetadata?: Maybe<RawMetadata>;
  rawMetadata_collection: Array<RawMetadata>;
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


export type QuerygrantArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerygrantsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Grant_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Grant_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerymilestoneArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerymilestonesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Milestone_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Milestone_filter>;
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
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryrawMetadata_collectionArgs = {
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
  poolIdLookup?: Maybe<PoolIdLookup>;
  poolIdLookups: Array<PoolIdLookup>;
  gameManager?: Maybe<GameManager>;
  gameManagers: Array<GameManager>;
  gameRound?: Maybe<GameRound>;
  gameRounds: Array<GameRound>;
  grant?: Maybe<Grant>;
  grants: Array<Grant>;
  milestone?: Maybe<Milestone>;
  milestones: Array<Milestone>;
  profileMemberGroup?: Maybe<ProfileMemberGroup>;
  profileMemberGroups: Array<ProfileMemberGroup>;
  transaction?: Maybe<Transaction>;
  transactions: Array<Transaction>;
  rawMetadata?: Maybe<RawMetadata>;
  rawMetadata_collection: Array<RawMetadata>;
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


export type SubscriptiongrantArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptiongrantsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Grant_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Grant_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionmilestoneArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionmilestonesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Milestone_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Milestone_filter>;
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
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionrawMetadata_collectionArgs = {
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

  export type QuerySdk = {
      /** null **/
  project: InContextSdkMethod<Query['project'], QueryprojectArgs, MeshContext>,
  /** null **/
  projects: InContextSdkMethod<Query['projects'], QueryprojectsArgs, MeshContext>,
  /** null **/
  feedItem: InContextSdkMethod<Query['feedItem'], QueryfeedItemArgs, MeshContext>,
  /** null **/
  feedItems: InContextSdkMethod<Query['feedItems'], QueryfeedItemsArgs, MeshContext>,
  /** null **/
  feedItemEntity: InContextSdkMethod<Query['feedItemEntity'], QueryfeedItemEntityArgs, MeshContext>,
  /** null **/
  feedItemEntities: InContextSdkMethod<Query['feedItemEntities'], QueryfeedItemEntitiesArgs, MeshContext>,
  /** null **/
  feedItemEmbed: InContextSdkMethod<Query['feedItemEmbed'], QueryfeedItemEmbedArgs, MeshContext>,
  /** null **/
  feedItemEmbeds: InContextSdkMethod<Query['feedItemEmbeds'], QueryfeedItemEmbedsArgs, MeshContext>,
  /** null **/
  grantShip: InContextSdkMethod<Query['grantShip'], QuerygrantShipArgs, MeshContext>,
  /** null **/
  grantShips: InContextSdkMethod<Query['grantShips'], QuerygrantShipsArgs, MeshContext>,
  /** null **/
  poolIdLookup: InContextSdkMethod<Query['poolIdLookup'], QuerypoolIdLookupArgs, MeshContext>,
  /** null **/
  poolIdLookups: InContextSdkMethod<Query['poolIdLookups'], QuerypoolIdLookupsArgs, MeshContext>,
  /** null **/
  gameManager: InContextSdkMethod<Query['gameManager'], QuerygameManagerArgs, MeshContext>,
  /** null **/
  gameManagers: InContextSdkMethod<Query['gameManagers'], QuerygameManagersArgs, MeshContext>,
  /** null **/
  gameRound: InContextSdkMethod<Query['gameRound'], QuerygameRoundArgs, MeshContext>,
  /** null **/
  gameRounds: InContextSdkMethod<Query['gameRounds'], QuerygameRoundsArgs, MeshContext>,
  /** null **/
  grant: InContextSdkMethod<Query['grant'], QuerygrantArgs, MeshContext>,
  /** null **/
  grants: InContextSdkMethod<Query['grants'], QuerygrantsArgs, MeshContext>,
  /** null **/
  milestone: InContextSdkMethod<Query['milestone'], QuerymilestoneArgs, MeshContext>,
  /** null **/
  milestones: InContextSdkMethod<Query['milestones'], QuerymilestonesArgs, MeshContext>,
  /** null **/
  profileMemberGroup: InContextSdkMethod<Query['profileMemberGroup'], QueryprofileMemberGroupArgs, MeshContext>,
  /** null **/
  profileMemberGroups: InContextSdkMethod<Query['profileMemberGroups'], QueryprofileMemberGroupsArgs, MeshContext>,
  /** null **/
  transaction: InContextSdkMethod<Query['transaction'], QuerytransactionArgs, MeshContext>,
  /** null **/
  transactions: InContextSdkMethod<Query['transactions'], QuerytransactionsArgs, MeshContext>,
  /** null **/
  rawMetadata: InContextSdkMethod<Query['rawMetadata'], QueryrawMetadataArgs, MeshContext>,
  /** null **/
  rawMetadata_collection: InContextSdkMethod<Query['rawMetadata_collection'], QueryrawMetadata_collectionArgs, MeshContext>,
  /** null **/
  log: InContextSdkMethod<Query['log'], QuerylogArgs, MeshContext>,
  /** null **/
  logs: InContextSdkMethod<Query['logs'], QuerylogsArgs, MeshContext>,
  /** Access to subgraph metadata **/
  _meta: InContextSdkMethod<Query['_meta'], Query_metaArgs, MeshContext>
  };

  export type MutationSdk = {
    
  };

  export type SubscriptionSdk = {
      /** null **/
  project: InContextSdkMethod<Subscription['project'], SubscriptionprojectArgs, MeshContext>,
  /** null **/
  projects: InContextSdkMethod<Subscription['projects'], SubscriptionprojectsArgs, MeshContext>,
  /** null **/
  feedItem: InContextSdkMethod<Subscription['feedItem'], SubscriptionfeedItemArgs, MeshContext>,
  /** null **/
  feedItems: InContextSdkMethod<Subscription['feedItems'], SubscriptionfeedItemsArgs, MeshContext>,
  /** null **/
  feedItemEntity: InContextSdkMethod<Subscription['feedItemEntity'], SubscriptionfeedItemEntityArgs, MeshContext>,
  /** null **/
  feedItemEntities: InContextSdkMethod<Subscription['feedItemEntities'], SubscriptionfeedItemEntitiesArgs, MeshContext>,
  /** null **/
  feedItemEmbed: InContextSdkMethod<Subscription['feedItemEmbed'], SubscriptionfeedItemEmbedArgs, MeshContext>,
  /** null **/
  feedItemEmbeds: InContextSdkMethod<Subscription['feedItemEmbeds'], SubscriptionfeedItemEmbedsArgs, MeshContext>,
  /** null **/
  grantShip: InContextSdkMethod<Subscription['grantShip'], SubscriptiongrantShipArgs, MeshContext>,
  /** null **/
  grantShips: InContextSdkMethod<Subscription['grantShips'], SubscriptiongrantShipsArgs, MeshContext>,
  /** null **/
  poolIdLookup: InContextSdkMethod<Subscription['poolIdLookup'], SubscriptionpoolIdLookupArgs, MeshContext>,
  /** null **/
  poolIdLookups: InContextSdkMethod<Subscription['poolIdLookups'], SubscriptionpoolIdLookupsArgs, MeshContext>,
  /** null **/
  gameManager: InContextSdkMethod<Subscription['gameManager'], SubscriptiongameManagerArgs, MeshContext>,
  /** null **/
  gameManagers: InContextSdkMethod<Subscription['gameManagers'], SubscriptiongameManagersArgs, MeshContext>,
  /** null **/
  gameRound: InContextSdkMethod<Subscription['gameRound'], SubscriptiongameRoundArgs, MeshContext>,
  /** null **/
  gameRounds: InContextSdkMethod<Subscription['gameRounds'], SubscriptiongameRoundsArgs, MeshContext>,
  /** null **/
  grant: InContextSdkMethod<Subscription['grant'], SubscriptiongrantArgs, MeshContext>,
  /** null **/
  grants: InContextSdkMethod<Subscription['grants'], SubscriptiongrantsArgs, MeshContext>,
  /** null **/
  milestone: InContextSdkMethod<Subscription['milestone'], SubscriptionmilestoneArgs, MeshContext>,
  /** null **/
  milestones: InContextSdkMethod<Subscription['milestones'], SubscriptionmilestonesArgs, MeshContext>,
  /** null **/
  profileMemberGroup: InContextSdkMethod<Subscription['profileMemberGroup'], SubscriptionprofileMemberGroupArgs, MeshContext>,
  /** null **/
  profileMemberGroups: InContextSdkMethod<Subscription['profileMemberGroups'], SubscriptionprofileMemberGroupsArgs, MeshContext>,
  /** null **/
  transaction: InContextSdkMethod<Subscription['transaction'], SubscriptiontransactionArgs, MeshContext>,
  /** null **/
  transactions: InContextSdkMethod<Subscription['transactions'], SubscriptiontransactionsArgs, MeshContext>,
  /** null **/
  rawMetadata: InContextSdkMethod<Subscription['rawMetadata'], SubscriptionrawMetadataArgs, MeshContext>,
  /** null **/
  rawMetadata_collection: InContextSdkMethod<Subscription['rawMetadata_collection'], SubscriptionrawMetadata_collectionArgs, MeshContext>,
  /** null **/
  log: InContextSdkMethod<Subscription['log'], SubscriptionlogArgs, MeshContext>,
  /** null **/
  logs: InContextSdkMethod<Subscription['logs'], SubscriptionlogsArgs, MeshContext>,
  /** Access to subgraph metadata **/
  _meta: InContextSdkMethod<Subscription['_meta'], Subscription_metaArgs, MeshContext>
  };

  export type Context = {
      ["grant-ships"]: { Query: QuerySdk, Mutation: MutationSdk, Subscription: SubscriptionSdk },
      
    };
}
