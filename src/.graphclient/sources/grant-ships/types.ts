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

export type BlockChangedFilter = {
  number_gte: Scalars['Int'];
};

export type Block_height = {
  hash?: InputMaybe<Scalars['Bytes']>;
  number?: InputMaybe<Scalars['Int']>;
  number_gte?: InputMaybe<Scalars['Int']>;
};

/** Defines the order direction, either ascending or descending */
export type OrderDirection =
  | 'asc'
  | 'desc';

export type Project = {
  id: Scalars['Bytes'];
  profileId: Scalars['Bytes'];
  nonce: Scalars['BigInt'];
  name: Scalars['String'];
  metadata_protocol: Scalars['BigInt'];
  metadata_pointer: Scalars['String'];
  metadata: ProjectMetadata;
  owner: Scalars['Bytes'];
  anchor: Scalars['Bytes'];
  blockNumber: Scalars['BigInt'];
  blockTimestamp: Scalars['BigInt'];
  transactionHash: Scalars['Bytes'];
};

export type ProjectMetadata = {
  id: Scalars['String'];
  name?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  avatarHash_IPFS?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  x?: Maybe<Scalars['String']>;
  github?: Maybe<Scalars['String']>;
  discord?: Maybe<Scalars['String']>;
  telegram?: Maybe<Scalars['String']>;
  website?: Maybe<Scalars['String']>;
  members?: Maybe<Array<Scalars['Bytes']>>;
};

export type ProjectMetadata_filter = {
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
  avatarHash_IPFS?: InputMaybe<Scalars['String']>;
  avatarHash_IPFS_not?: InputMaybe<Scalars['String']>;
  avatarHash_IPFS_gt?: InputMaybe<Scalars['String']>;
  avatarHash_IPFS_lt?: InputMaybe<Scalars['String']>;
  avatarHash_IPFS_gte?: InputMaybe<Scalars['String']>;
  avatarHash_IPFS_lte?: InputMaybe<Scalars['String']>;
  avatarHash_IPFS_in?: InputMaybe<Array<Scalars['String']>>;
  avatarHash_IPFS_not_in?: InputMaybe<Array<Scalars['String']>>;
  avatarHash_IPFS_contains?: InputMaybe<Scalars['String']>;
  avatarHash_IPFS_contains_nocase?: InputMaybe<Scalars['String']>;
  avatarHash_IPFS_not_contains?: InputMaybe<Scalars['String']>;
  avatarHash_IPFS_not_contains_nocase?: InputMaybe<Scalars['String']>;
  avatarHash_IPFS_starts_with?: InputMaybe<Scalars['String']>;
  avatarHash_IPFS_starts_with_nocase?: InputMaybe<Scalars['String']>;
  avatarHash_IPFS_not_starts_with?: InputMaybe<Scalars['String']>;
  avatarHash_IPFS_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  avatarHash_IPFS_ends_with?: InputMaybe<Scalars['String']>;
  avatarHash_IPFS_ends_with_nocase?: InputMaybe<Scalars['String']>;
  avatarHash_IPFS_not_ends_with?: InputMaybe<Scalars['String']>;
  avatarHash_IPFS_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  email?: InputMaybe<Scalars['String']>;
  email_not?: InputMaybe<Scalars['String']>;
  email_gt?: InputMaybe<Scalars['String']>;
  email_lt?: InputMaybe<Scalars['String']>;
  email_gte?: InputMaybe<Scalars['String']>;
  email_lte?: InputMaybe<Scalars['String']>;
  email_in?: InputMaybe<Array<Scalars['String']>>;
  email_not_in?: InputMaybe<Array<Scalars['String']>>;
  email_contains?: InputMaybe<Scalars['String']>;
  email_contains_nocase?: InputMaybe<Scalars['String']>;
  email_not_contains?: InputMaybe<Scalars['String']>;
  email_not_contains_nocase?: InputMaybe<Scalars['String']>;
  email_starts_with?: InputMaybe<Scalars['String']>;
  email_starts_with_nocase?: InputMaybe<Scalars['String']>;
  email_not_starts_with?: InputMaybe<Scalars['String']>;
  email_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  email_ends_with?: InputMaybe<Scalars['String']>;
  email_ends_with_nocase?: InputMaybe<Scalars['String']>;
  email_not_ends_with?: InputMaybe<Scalars['String']>;
  email_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  x?: InputMaybe<Scalars['String']>;
  x_not?: InputMaybe<Scalars['String']>;
  x_gt?: InputMaybe<Scalars['String']>;
  x_lt?: InputMaybe<Scalars['String']>;
  x_gte?: InputMaybe<Scalars['String']>;
  x_lte?: InputMaybe<Scalars['String']>;
  x_in?: InputMaybe<Array<Scalars['String']>>;
  x_not_in?: InputMaybe<Array<Scalars['String']>>;
  x_contains?: InputMaybe<Scalars['String']>;
  x_contains_nocase?: InputMaybe<Scalars['String']>;
  x_not_contains?: InputMaybe<Scalars['String']>;
  x_not_contains_nocase?: InputMaybe<Scalars['String']>;
  x_starts_with?: InputMaybe<Scalars['String']>;
  x_starts_with_nocase?: InputMaybe<Scalars['String']>;
  x_not_starts_with?: InputMaybe<Scalars['String']>;
  x_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  x_ends_with?: InputMaybe<Scalars['String']>;
  x_ends_with_nocase?: InputMaybe<Scalars['String']>;
  x_not_ends_with?: InputMaybe<Scalars['String']>;
  x_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  github?: InputMaybe<Scalars['String']>;
  github_not?: InputMaybe<Scalars['String']>;
  github_gt?: InputMaybe<Scalars['String']>;
  github_lt?: InputMaybe<Scalars['String']>;
  github_gte?: InputMaybe<Scalars['String']>;
  github_lte?: InputMaybe<Scalars['String']>;
  github_in?: InputMaybe<Array<Scalars['String']>>;
  github_not_in?: InputMaybe<Array<Scalars['String']>>;
  github_contains?: InputMaybe<Scalars['String']>;
  github_contains_nocase?: InputMaybe<Scalars['String']>;
  github_not_contains?: InputMaybe<Scalars['String']>;
  github_not_contains_nocase?: InputMaybe<Scalars['String']>;
  github_starts_with?: InputMaybe<Scalars['String']>;
  github_starts_with_nocase?: InputMaybe<Scalars['String']>;
  github_not_starts_with?: InputMaybe<Scalars['String']>;
  github_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  github_ends_with?: InputMaybe<Scalars['String']>;
  github_ends_with_nocase?: InputMaybe<Scalars['String']>;
  github_not_ends_with?: InputMaybe<Scalars['String']>;
  github_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  discord?: InputMaybe<Scalars['String']>;
  discord_not?: InputMaybe<Scalars['String']>;
  discord_gt?: InputMaybe<Scalars['String']>;
  discord_lt?: InputMaybe<Scalars['String']>;
  discord_gte?: InputMaybe<Scalars['String']>;
  discord_lte?: InputMaybe<Scalars['String']>;
  discord_in?: InputMaybe<Array<Scalars['String']>>;
  discord_not_in?: InputMaybe<Array<Scalars['String']>>;
  discord_contains?: InputMaybe<Scalars['String']>;
  discord_contains_nocase?: InputMaybe<Scalars['String']>;
  discord_not_contains?: InputMaybe<Scalars['String']>;
  discord_not_contains_nocase?: InputMaybe<Scalars['String']>;
  discord_starts_with?: InputMaybe<Scalars['String']>;
  discord_starts_with_nocase?: InputMaybe<Scalars['String']>;
  discord_not_starts_with?: InputMaybe<Scalars['String']>;
  discord_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  discord_ends_with?: InputMaybe<Scalars['String']>;
  discord_ends_with_nocase?: InputMaybe<Scalars['String']>;
  discord_not_ends_with?: InputMaybe<Scalars['String']>;
  discord_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  telegram?: InputMaybe<Scalars['String']>;
  telegram_not?: InputMaybe<Scalars['String']>;
  telegram_gt?: InputMaybe<Scalars['String']>;
  telegram_lt?: InputMaybe<Scalars['String']>;
  telegram_gte?: InputMaybe<Scalars['String']>;
  telegram_lte?: InputMaybe<Scalars['String']>;
  telegram_in?: InputMaybe<Array<Scalars['String']>>;
  telegram_not_in?: InputMaybe<Array<Scalars['String']>>;
  telegram_contains?: InputMaybe<Scalars['String']>;
  telegram_contains_nocase?: InputMaybe<Scalars['String']>;
  telegram_not_contains?: InputMaybe<Scalars['String']>;
  telegram_not_contains_nocase?: InputMaybe<Scalars['String']>;
  telegram_starts_with?: InputMaybe<Scalars['String']>;
  telegram_starts_with_nocase?: InputMaybe<Scalars['String']>;
  telegram_not_starts_with?: InputMaybe<Scalars['String']>;
  telegram_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  telegram_ends_with?: InputMaybe<Scalars['String']>;
  telegram_ends_with_nocase?: InputMaybe<Scalars['String']>;
  telegram_not_ends_with?: InputMaybe<Scalars['String']>;
  telegram_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  website?: InputMaybe<Scalars['String']>;
  website_not?: InputMaybe<Scalars['String']>;
  website_gt?: InputMaybe<Scalars['String']>;
  website_lt?: InputMaybe<Scalars['String']>;
  website_gte?: InputMaybe<Scalars['String']>;
  website_lte?: InputMaybe<Scalars['String']>;
  website_in?: InputMaybe<Array<Scalars['String']>>;
  website_not_in?: InputMaybe<Array<Scalars['String']>>;
  website_contains?: InputMaybe<Scalars['String']>;
  website_contains_nocase?: InputMaybe<Scalars['String']>;
  website_not_contains?: InputMaybe<Scalars['String']>;
  website_not_contains_nocase?: InputMaybe<Scalars['String']>;
  website_starts_with?: InputMaybe<Scalars['String']>;
  website_starts_with_nocase?: InputMaybe<Scalars['String']>;
  website_not_starts_with?: InputMaybe<Scalars['String']>;
  website_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  website_ends_with?: InputMaybe<Scalars['String']>;
  website_ends_with_nocase?: InputMaybe<Scalars['String']>;
  website_not_ends_with?: InputMaybe<Scalars['String']>;
  website_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  members?: InputMaybe<Array<Scalars['Bytes']>>;
  members_not?: InputMaybe<Array<Scalars['Bytes']>>;
  members_contains?: InputMaybe<Array<Scalars['Bytes']>>;
  members_contains_nocase?: InputMaybe<Array<Scalars['Bytes']>>;
  members_not_contains?: InputMaybe<Array<Scalars['Bytes']>>;
  members_not_contains_nocase?: InputMaybe<Array<Scalars['Bytes']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<ProjectMetadata_filter>>>;
  or?: InputMaybe<Array<InputMaybe<ProjectMetadata_filter>>>;
};

export type ProjectMetadata_orderBy =
  | 'id'
  | 'name'
  | 'description'
  | 'avatarHash_IPFS'
  | 'email'
  | 'x'
  | 'github'
  | 'discord'
  | 'telegram'
  | 'website'
  | 'members';

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
  metadata_protocol?: InputMaybe<Scalars['BigInt']>;
  metadata_protocol_not?: InputMaybe<Scalars['BigInt']>;
  metadata_protocol_gt?: InputMaybe<Scalars['BigInt']>;
  metadata_protocol_lt?: InputMaybe<Scalars['BigInt']>;
  metadata_protocol_gte?: InputMaybe<Scalars['BigInt']>;
  metadata_protocol_lte?: InputMaybe<Scalars['BigInt']>;
  metadata_protocol_in?: InputMaybe<Array<Scalars['BigInt']>>;
  metadata_protocol_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  metadata_pointer?: InputMaybe<Scalars['String']>;
  metadata_pointer_not?: InputMaybe<Scalars['String']>;
  metadata_pointer_gt?: InputMaybe<Scalars['String']>;
  metadata_pointer_lt?: InputMaybe<Scalars['String']>;
  metadata_pointer_gte?: InputMaybe<Scalars['String']>;
  metadata_pointer_lte?: InputMaybe<Scalars['String']>;
  metadata_pointer_in?: InputMaybe<Array<Scalars['String']>>;
  metadata_pointer_not_in?: InputMaybe<Array<Scalars['String']>>;
  metadata_pointer_contains?: InputMaybe<Scalars['String']>;
  metadata_pointer_contains_nocase?: InputMaybe<Scalars['String']>;
  metadata_pointer_not_contains?: InputMaybe<Scalars['String']>;
  metadata_pointer_not_contains_nocase?: InputMaybe<Scalars['String']>;
  metadata_pointer_starts_with?: InputMaybe<Scalars['String']>;
  metadata_pointer_starts_with_nocase?: InputMaybe<Scalars['String']>;
  metadata_pointer_not_starts_with?: InputMaybe<Scalars['String']>;
  metadata_pointer_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  metadata_pointer_ends_with?: InputMaybe<Scalars['String']>;
  metadata_pointer_ends_with_nocase?: InputMaybe<Scalars['String']>;
  metadata_pointer_not_ends_with?: InputMaybe<Scalars['String']>;
  metadata_pointer_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
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
  metadata_?: InputMaybe<ProjectMetadata_filter>;
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
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<Project_filter>>>;
  or?: InputMaybe<Array<InputMaybe<Project_filter>>>;
};

export type Project_orderBy =
  | 'id'
  | 'profileId'
  | 'nonce'
  | 'name'
  | 'metadata_protocol'
  | 'metadata_pointer'
  | 'metadata'
  | 'metadata__id'
  | 'metadata__name'
  | 'metadata__description'
  | 'metadata__avatarHash_IPFS'
  | 'metadata__email'
  | 'metadata__x'
  | 'metadata__github'
  | 'metadata__discord'
  | 'metadata__telegram'
  | 'metadata__website'
  | 'owner'
  | 'anchor'
  | 'blockNumber'
  | 'blockTimestamp'
  | 'transactionHash';

export type Query = {
  project?: Maybe<Project>;
  projects: Array<Project>;
  projectMetadata: Array<ProjectMetadata>;
  shipProfile?: Maybe<ShipProfile>;
  shipProfiles: Array<ShipProfile>;
  shipProfileMetadata: Array<ShipProfileMetadata>;
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


export type QueryprojectMetadataArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<ProjectMetadata_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<ProjectMetadata_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryshipProfileArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryshipProfilesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<ShipProfile_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<ShipProfile_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryshipProfileMetadataArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<ShipProfileMetadata_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<ShipProfileMetadata_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Query_metaArgs = {
  block?: InputMaybe<Block_height>;
};

export type ShipProfile = {
  id: Scalars['Bytes'];
  profileId: Scalars['Bytes'];
  nonce: Scalars['BigInt'];
  name: Scalars['String'];
  metadata_protocol: Scalars['BigInt'];
  metadata_pointer: Scalars['String'];
  metadata: ShipProfileMetadata;
  owner: Scalars['Bytes'];
  anchor: Scalars['Bytes'];
  blockNumber: Scalars['BigInt'];
  blockTimestamp: Scalars['BigInt'];
  transactionHash: Scalars['Bytes'];
};

export type ShipProfileMetadata = {
  id: Scalars['String'];
  name?: Maybe<Scalars['String']>;
  mission?: Maybe<Scalars['String']>;
  avatarHash_IPFS?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  x?: Maybe<Scalars['String']>;
  github?: Maybe<Scalars['String']>;
  discord?: Maybe<Scalars['String']>;
  telegram?: Maybe<Scalars['String']>;
  website?: Maybe<Scalars['String']>;
};

export type ShipProfileMetadata_filter = {
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
  mission?: InputMaybe<Scalars['String']>;
  mission_not?: InputMaybe<Scalars['String']>;
  mission_gt?: InputMaybe<Scalars['String']>;
  mission_lt?: InputMaybe<Scalars['String']>;
  mission_gte?: InputMaybe<Scalars['String']>;
  mission_lte?: InputMaybe<Scalars['String']>;
  mission_in?: InputMaybe<Array<Scalars['String']>>;
  mission_not_in?: InputMaybe<Array<Scalars['String']>>;
  mission_contains?: InputMaybe<Scalars['String']>;
  mission_contains_nocase?: InputMaybe<Scalars['String']>;
  mission_not_contains?: InputMaybe<Scalars['String']>;
  mission_not_contains_nocase?: InputMaybe<Scalars['String']>;
  mission_starts_with?: InputMaybe<Scalars['String']>;
  mission_starts_with_nocase?: InputMaybe<Scalars['String']>;
  mission_not_starts_with?: InputMaybe<Scalars['String']>;
  mission_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  mission_ends_with?: InputMaybe<Scalars['String']>;
  mission_ends_with_nocase?: InputMaybe<Scalars['String']>;
  mission_not_ends_with?: InputMaybe<Scalars['String']>;
  mission_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  avatarHash_IPFS?: InputMaybe<Scalars['String']>;
  avatarHash_IPFS_not?: InputMaybe<Scalars['String']>;
  avatarHash_IPFS_gt?: InputMaybe<Scalars['String']>;
  avatarHash_IPFS_lt?: InputMaybe<Scalars['String']>;
  avatarHash_IPFS_gte?: InputMaybe<Scalars['String']>;
  avatarHash_IPFS_lte?: InputMaybe<Scalars['String']>;
  avatarHash_IPFS_in?: InputMaybe<Array<Scalars['String']>>;
  avatarHash_IPFS_not_in?: InputMaybe<Array<Scalars['String']>>;
  avatarHash_IPFS_contains?: InputMaybe<Scalars['String']>;
  avatarHash_IPFS_contains_nocase?: InputMaybe<Scalars['String']>;
  avatarHash_IPFS_not_contains?: InputMaybe<Scalars['String']>;
  avatarHash_IPFS_not_contains_nocase?: InputMaybe<Scalars['String']>;
  avatarHash_IPFS_starts_with?: InputMaybe<Scalars['String']>;
  avatarHash_IPFS_starts_with_nocase?: InputMaybe<Scalars['String']>;
  avatarHash_IPFS_not_starts_with?: InputMaybe<Scalars['String']>;
  avatarHash_IPFS_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  avatarHash_IPFS_ends_with?: InputMaybe<Scalars['String']>;
  avatarHash_IPFS_ends_with_nocase?: InputMaybe<Scalars['String']>;
  avatarHash_IPFS_not_ends_with?: InputMaybe<Scalars['String']>;
  avatarHash_IPFS_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  email?: InputMaybe<Scalars['String']>;
  email_not?: InputMaybe<Scalars['String']>;
  email_gt?: InputMaybe<Scalars['String']>;
  email_lt?: InputMaybe<Scalars['String']>;
  email_gte?: InputMaybe<Scalars['String']>;
  email_lte?: InputMaybe<Scalars['String']>;
  email_in?: InputMaybe<Array<Scalars['String']>>;
  email_not_in?: InputMaybe<Array<Scalars['String']>>;
  email_contains?: InputMaybe<Scalars['String']>;
  email_contains_nocase?: InputMaybe<Scalars['String']>;
  email_not_contains?: InputMaybe<Scalars['String']>;
  email_not_contains_nocase?: InputMaybe<Scalars['String']>;
  email_starts_with?: InputMaybe<Scalars['String']>;
  email_starts_with_nocase?: InputMaybe<Scalars['String']>;
  email_not_starts_with?: InputMaybe<Scalars['String']>;
  email_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  email_ends_with?: InputMaybe<Scalars['String']>;
  email_ends_with_nocase?: InputMaybe<Scalars['String']>;
  email_not_ends_with?: InputMaybe<Scalars['String']>;
  email_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  x?: InputMaybe<Scalars['String']>;
  x_not?: InputMaybe<Scalars['String']>;
  x_gt?: InputMaybe<Scalars['String']>;
  x_lt?: InputMaybe<Scalars['String']>;
  x_gte?: InputMaybe<Scalars['String']>;
  x_lte?: InputMaybe<Scalars['String']>;
  x_in?: InputMaybe<Array<Scalars['String']>>;
  x_not_in?: InputMaybe<Array<Scalars['String']>>;
  x_contains?: InputMaybe<Scalars['String']>;
  x_contains_nocase?: InputMaybe<Scalars['String']>;
  x_not_contains?: InputMaybe<Scalars['String']>;
  x_not_contains_nocase?: InputMaybe<Scalars['String']>;
  x_starts_with?: InputMaybe<Scalars['String']>;
  x_starts_with_nocase?: InputMaybe<Scalars['String']>;
  x_not_starts_with?: InputMaybe<Scalars['String']>;
  x_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  x_ends_with?: InputMaybe<Scalars['String']>;
  x_ends_with_nocase?: InputMaybe<Scalars['String']>;
  x_not_ends_with?: InputMaybe<Scalars['String']>;
  x_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  github?: InputMaybe<Scalars['String']>;
  github_not?: InputMaybe<Scalars['String']>;
  github_gt?: InputMaybe<Scalars['String']>;
  github_lt?: InputMaybe<Scalars['String']>;
  github_gte?: InputMaybe<Scalars['String']>;
  github_lte?: InputMaybe<Scalars['String']>;
  github_in?: InputMaybe<Array<Scalars['String']>>;
  github_not_in?: InputMaybe<Array<Scalars['String']>>;
  github_contains?: InputMaybe<Scalars['String']>;
  github_contains_nocase?: InputMaybe<Scalars['String']>;
  github_not_contains?: InputMaybe<Scalars['String']>;
  github_not_contains_nocase?: InputMaybe<Scalars['String']>;
  github_starts_with?: InputMaybe<Scalars['String']>;
  github_starts_with_nocase?: InputMaybe<Scalars['String']>;
  github_not_starts_with?: InputMaybe<Scalars['String']>;
  github_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  github_ends_with?: InputMaybe<Scalars['String']>;
  github_ends_with_nocase?: InputMaybe<Scalars['String']>;
  github_not_ends_with?: InputMaybe<Scalars['String']>;
  github_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  discord?: InputMaybe<Scalars['String']>;
  discord_not?: InputMaybe<Scalars['String']>;
  discord_gt?: InputMaybe<Scalars['String']>;
  discord_lt?: InputMaybe<Scalars['String']>;
  discord_gte?: InputMaybe<Scalars['String']>;
  discord_lte?: InputMaybe<Scalars['String']>;
  discord_in?: InputMaybe<Array<Scalars['String']>>;
  discord_not_in?: InputMaybe<Array<Scalars['String']>>;
  discord_contains?: InputMaybe<Scalars['String']>;
  discord_contains_nocase?: InputMaybe<Scalars['String']>;
  discord_not_contains?: InputMaybe<Scalars['String']>;
  discord_not_contains_nocase?: InputMaybe<Scalars['String']>;
  discord_starts_with?: InputMaybe<Scalars['String']>;
  discord_starts_with_nocase?: InputMaybe<Scalars['String']>;
  discord_not_starts_with?: InputMaybe<Scalars['String']>;
  discord_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  discord_ends_with?: InputMaybe<Scalars['String']>;
  discord_ends_with_nocase?: InputMaybe<Scalars['String']>;
  discord_not_ends_with?: InputMaybe<Scalars['String']>;
  discord_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  telegram?: InputMaybe<Scalars['String']>;
  telegram_not?: InputMaybe<Scalars['String']>;
  telegram_gt?: InputMaybe<Scalars['String']>;
  telegram_lt?: InputMaybe<Scalars['String']>;
  telegram_gte?: InputMaybe<Scalars['String']>;
  telegram_lte?: InputMaybe<Scalars['String']>;
  telegram_in?: InputMaybe<Array<Scalars['String']>>;
  telegram_not_in?: InputMaybe<Array<Scalars['String']>>;
  telegram_contains?: InputMaybe<Scalars['String']>;
  telegram_contains_nocase?: InputMaybe<Scalars['String']>;
  telegram_not_contains?: InputMaybe<Scalars['String']>;
  telegram_not_contains_nocase?: InputMaybe<Scalars['String']>;
  telegram_starts_with?: InputMaybe<Scalars['String']>;
  telegram_starts_with_nocase?: InputMaybe<Scalars['String']>;
  telegram_not_starts_with?: InputMaybe<Scalars['String']>;
  telegram_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  telegram_ends_with?: InputMaybe<Scalars['String']>;
  telegram_ends_with_nocase?: InputMaybe<Scalars['String']>;
  telegram_not_ends_with?: InputMaybe<Scalars['String']>;
  telegram_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  website?: InputMaybe<Scalars['String']>;
  website_not?: InputMaybe<Scalars['String']>;
  website_gt?: InputMaybe<Scalars['String']>;
  website_lt?: InputMaybe<Scalars['String']>;
  website_gte?: InputMaybe<Scalars['String']>;
  website_lte?: InputMaybe<Scalars['String']>;
  website_in?: InputMaybe<Array<Scalars['String']>>;
  website_not_in?: InputMaybe<Array<Scalars['String']>>;
  website_contains?: InputMaybe<Scalars['String']>;
  website_contains_nocase?: InputMaybe<Scalars['String']>;
  website_not_contains?: InputMaybe<Scalars['String']>;
  website_not_contains_nocase?: InputMaybe<Scalars['String']>;
  website_starts_with?: InputMaybe<Scalars['String']>;
  website_starts_with_nocase?: InputMaybe<Scalars['String']>;
  website_not_starts_with?: InputMaybe<Scalars['String']>;
  website_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  website_ends_with?: InputMaybe<Scalars['String']>;
  website_ends_with_nocase?: InputMaybe<Scalars['String']>;
  website_not_ends_with?: InputMaybe<Scalars['String']>;
  website_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<ShipProfileMetadata_filter>>>;
  or?: InputMaybe<Array<InputMaybe<ShipProfileMetadata_filter>>>;
};

export type ShipProfileMetadata_orderBy =
  | 'id'
  | 'name'
  | 'mission'
  | 'avatarHash_IPFS'
  | 'email'
  | 'x'
  | 'github'
  | 'discord'
  | 'telegram'
  | 'website';

export type ShipProfile_filter = {
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
  metadata_protocol?: InputMaybe<Scalars['BigInt']>;
  metadata_protocol_not?: InputMaybe<Scalars['BigInt']>;
  metadata_protocol_gt?: InputMaybe<Scalars['BigInt']>;
  metadata_protocol_lt?: InputMaybe<Scalars['BigInt']>;
  metadata_protocol_gte?: InputMaybe<Scalars['BigInt']>;
  metadata_protocol_lte?: InputMaybe<Scalars['BigInt']>;
  metadata_protocol_in?: InputMaybe<Array<Scalars['BigInt']>>;
  metadata_protocol_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  metadata_pointer?: InputMaybe<Scalars['String']>;
  metadata_pointer_not?: InputMaybe<Scalars['String']>;
  metadata_pointer_gt?: InputMaybe<Scalars['String']>;
  metadata_pointer_lt?: InputMaybe<Scalars['String']>;
  metadata_pointer_gte?: InputMaybe<Scalars['String']>;
  metadata_pointer_lte?: InputMaybe<Scalars['String']>;
  metadata_pointer_in?: InputMaybe<Array<Scalars['String']>>;
  metadata_pointer_not_in?: InputMaybe<Array<Scalars['String']>>;
  metadata_pointer_contains?: InputMaybe<Scalars['String']>;
  metadata_pointer_contains_nocase?: InputMaybe<Scalars['String']>;
  metadata_pointer_not_contains?: InputMaybe<Scalars['String']>;
  metadata_pointer_not_contains_nocase?: InputMaybe<Scalars['String']>;
  metadata_pointer_starts_with?: InputMaybe<Scalars['String']>;
  metadata_pointer_starts_with_nocase?: InputMaybe<Scalars['String']>;
  metadata_pointer_not_starts_with?: InputMaybe<Scalars['String']>;
  metadata_pointer_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  metadata_pointer_ends_with?: InputMaybe<Scalars['String']>;
  metadata_pointer_ends_with_nocase?: InputMaybe<Scalars['String']>;
  metadata_pointer_not_ends_with?: InputMaybe<Scalars['String']>;
  metadata_pointer_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
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
  metadata_?: InputMaybe<ShipProfileMetadata_filter>;
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
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<ShipProfile_filter>>>;
  or?: InputMaybe<Array<InputMaybe<ShipProfile_filter>>>;
};

export type ShipProfile_orderBy =
  | 'id'
  | 'profileId'
  | 'nonce'
  | 'name'
  | 'metadata_protocol'
  | 'metadata_pointer'
  | 'metadata'
  | 'metadata__id'
  | 'metadata__name'
  | 'metadata__mission'
  | 'metadata__avatarHash_IPFS'
  | 'metadata__email'
  | 'metadata__x'
  | 'metadata__github'
  | 'metadata__discord'
  | 'metadata__telegram'
  | 'metadata__website'
  | 'owner'
  | 'anchor'
  | 'blockNumber'
  | 'blockTimestamp'
  | 'transactionHash';

export type Subscription = {
  project?: Maybe<Project>;
  projects: Array<Project>;
  projectMetadata: Array<ProjectMetadata>;
  shipProfile?: Maybe<ShipProfile>;
  shipProfiles: Array<ShipProfile>;
  shipProfileMetadata: Array<ShipProfileMetadata>;
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


export type SubscriptionprojectMetadataArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<ProjectMetadata_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<ProjectMetadata_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionshipProfileArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionshipProfilesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<ShipProfile_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<ShipProfile_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionshipProfileMetadataArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<ShipProfileMetadata_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<ShipProfileMetadata_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscription_metaArgs = {
  block?: InputMaybe<Block_height>;
};

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
  projectMetadata: InContextSdkMethod<Query['projectMetadata'], QueryprojectMetadataArgs, MeshContext>,
  /** null **/
  shipProfile: InContextSdkMethod<Query['shipProfile'], QueryshipProfileArgs, MeshContext>,
  /** null **/
  shipProfiles: InContextSdkMethod<Query['shipProfiles'], QueryshipProfilesArgs, MeshContext>,
  /** null **/
  shipProfileMetadata: InContextSdkMethod<Query['shipProfileMetadata'], QueryshipProfileMetadataArgs, MeshContext>,
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
  projectMetadata: InContextSdkMethod<Subscription['projectMetadata'], SubscriptionprojectMetadataArgs, MeshContext>,
  /** null **/
  shipProfile: InContextSdkMethod<Subscription['shipProfile'], SubscriptionshipProfileArgs, MeshContext>,
  /** null **/
  shipProfiles: InContextSdkMethod<Subscription['shipProfiles'], SubscriptionshipProfilesArgs, MeshContext>,
  /** null **/
  shipProfileMetadata: InContextSdkMethod<Subscription['shipProfileMetadata'], SubscriptionshipProfileMetadataArgs, MeshContext>,
  /** Access to subgraph metadata **/
  _meta: InContextSdkMethod<Subscription['_meta'], Subscription_metaArgs, MeshContext>
  };

  export type Context = {
      ["grant-ships"]: { Query: QuerySdk, Mutation: MutationSdk, Subscription: SubscriptionSdk },
      
    };
}
