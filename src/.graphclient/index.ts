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

/** Defines the order direction, either ascending or descending */
export type OrderDirection =
  | 'asc'
  | 'desc';

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
  nonce: Scalars['BigInt'];
  name: Scalars['String'];
  metadata_protocol: Scalars['BigInt'];
  metadata_pointer: Scalars['String'];
  metadata?: Maybe<ProjectMetadata>;
  owner: Scalars['Bytes'];
  anchor: Scalars['Bytes'];
  blockNumber: Scalars['BigInt'];
  blockTimestamp: Scalars['BigInt'];
  transactionHash: Scalars['Bytes'];
  members?: Maybe<ProfileMemberGroup>;
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
  | 'website';

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
  | 'transactionHash'
  | 'members'
  | 'members__id';

export type Query = {
  project?: Maybe<Project>;
  projects: Array<Project>;
  projectMetadata: Array<ProjectMetadata>;
  shipProfile?: Maybe<ShipProfile>;
  shipProfiles: Array<ShipProfile>;
  shipProfileMetadata: Array<ShipProfileMetadata>;
  profileMemberGroup?: Maybe<ProfileMemberGroup>;
  profileMemberGroups: Array<ProfileMemberGroup>;
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
  alloProfileMembers?: Maybe<ProfileMemberGroup>;
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
  | 'transactionHash'
  | 'alloProfileMembers'
  | 'alloProfileMembers__id';

export type Subscription = {
  project?: Maybe<Project>;
  projects: Array<Project>;
  projectMetadata: Array<ProjectMetadata>;
  shipProfile?: Maybe<ShipProfile>;
  shipProfiles: Array<ShipProfile>;
  shipProfileMetadata: Array<ShipProfileMetadata>;
  profileMemberGroup?: Maybe<ProfileMemberGroup>;
  profileMemberGroups: Array<ProfileMemberGroup>;
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
  Float: ResolverTypeWrapper<Scalars['Float']>;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  Int8: ResolverTypeWrapper<Scalars['Int8']>;
  OrderDirection: OrderDirection;
  ProfileMemberGroup: ResolverTypeWrapper<ProfileMemberGroup>;
  ProfileMemberGroup_filter: ProfileMemberGroup_filter;
  ProfileMemberGroup_orderBy: ProfileMemberGroup_orderBy;
  Project: ResolverTypeWrapper<Project>;
  ProjectMetadata: ResolverTypeWrapper<ProjectMetadata>;
  ProjectMetadata_filter: ProjectMetadata_filter;
  ProjectMetadata_orderBy: ProjectMetadata_orderBy;
  Project_filter: Project_filter;
  Project_orderBy: Project_orderBy;
  Query: ResolverTypeWrapper<{}>;
  ShipProfile: ResolverTypeWrapper<ShipProfile>;
  ShipProfileMetadata: ResolverTypeWrapper<ShipProfileMetadata>;
  ShipProfileMetadata_filter: ShipProfileMetadata_filter;
  ShipProfileMetadata_orderBy: ShipProfileMetadata_orderBy;
  ShipProfile_filter: ShipProfile_filter;
  ShipProfile_orderBy: ShipProfile_orderBy;
  String: ResolverTypeWrapper<Scalars['String']>;
  Subscription: ResolverTypeWrapper<{}>;
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
  ProfileMemberGroup: ProfileMemberGroup;
  ProfileMemberGroup_filter: ProfileMemberGroup_filter;
  Project: Project;
  ProjectMetadata: ProjectMetadata;
  ProjectMetadata_filter: ProjectMetadata_filter;
  Project_filter: Project_filter;
  Query: {};
  ShipProfile: ShipProfile;
  ShipProfileMetadata: ShipProfileMetadata;
  ShipProfileMetadata_filter: ShipProfileMetadata_filter;
  ShipProfile_filter: ShipProfile_filter;
  String: Scalars['String'];
  Subscription: {};
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

export interface Int8ScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Int8'], any> {
  name: 'Int8';
}

export type ProfileMemberGroupResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['ProfileMemberGroup'] = ResolversParentTypes['ProfileMemberGroup']> = ResolversObject<{
  id?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  addresses?: Resolver<Maybe<Array<ResolversTypes['Bytes']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ProjectResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['Project'] = ResolversParentTypes['Project']> = ResolversObject<{
  id?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  profileId?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  nonce?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  metadata_protocol?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  metadata_pointer?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  metadata?: Resolver<Maybe<ResolversTypes['ProjectMetadata']>, ParentType, ContextType>;
  owner?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  anchor?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  blockNumber?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  blockTimestamp?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  transactionHash?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  members?: Resolver<Maybe<ResolversTypes['ProfileMemberGroup']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ProjectMetadataResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['ProjectMetadata'] = ResolversParentTypes['ProjectMetadata']> = ResolversObject<{
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  avatarHash_IPFS?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  email?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  x?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  github?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  discord?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  telegram?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  website?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type QueryResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  project?: Resolver<Maybe<ResolversTypes['Project']>, ParentType, ContextType, RequireFields<QueryprojectArgs, 'id' | 'subgraphError'>>;
  projects?: Resolver<Array<ResolversTypes['Project']>, ParentType, ContextType, RequireFields<QueryprojectsArgs, 'skip' | 'first' | 'subgraphError'>>;
  projectMetadata?: Resolver<Array<ResolversTypes['ProjectMetadata']>, ParentType, ContextType, RequireFields<QueryprojectMetadataArgs, 'skip' | 'first' | 'subgraphError'>>;
  shipProfile?: Resolver<Maybe<ResolversTypes['ShipProfile']>, ParentType, ContextType, RequireFields<QueryshipProfileArgs, 'id' | 'subgraphError'>>;
  shipProfiles?: Resolver<Array<ResolversTypes['ShipProfile']>, ParentType, ContextType, RequireFields<QueryshipProfilesArgs, 'skip' | 'first' | 'subgraphError'>>;
  shipProfileMetadata?: Resolver<Array<ResolversTypes['ShipProfileMetadata']>, ParentType, ContextType, RequireFields<QueryshipProfileMetadataArgs, 'skip' | 'first' | 'subgraphError'>>;
  profileMemberGroup?: Resolver<Maybe<ResolversTypes['ProfileMemberGroup']>, ParentType, ContextType, RequireFields<QueryprofileMemberGroupArgs, 'id' | 'subgraphError'>>;
  profileMemberGroups?: Resolver<Array<ResolversTypes['ProfileMemberGroup']>, ParentType, ContextType, RequireFields<QueryprofileMemberGroupsArgs, 'skip' | 'first' | 'subgraphError'>>;
  _meta?: Resolver<Maybe<ResolversTypes['_Meta_']>, ParentType, ContextType, Partial<Query_metaArgs>>;
}>;

export type ShipProfileResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['ShipProfile'] = ResolversParentTypes['ShipProfile']> = ResolversObject<{
  id?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  profileId?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  nonce?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  metadata_protocol?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  metadata_pointer?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  metadata?: Resolver<ResolversTypes['ShipProfileMetadata'], ParentType, ContextType>;
  owner?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  anchor?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  blockNumber?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  blockTimestamp?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  transactionHash?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  alloProfileMembers?: Resolver<Maybe<ResolversTypes['ProfileMemberGroup']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ShipProfileMetadataResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['ShipProfileMetadata'] = ResolversParentTypes['ShipProfileMetadata']> = ResolversObject<{
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  mission?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  avatarHash_IPFS?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  email?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  x?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  github?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  discord?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  telegram?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  website?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type SubscriptionResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['Subscription'] = ResolversParentTypes['Subscription']> = ResolversObject<{
  project?: SubscriptionResolver<Maybe<ResolversTypes['Project']>, "project", ParentType, ContextType, RequireFields<SubscriptionprojectArgs, 'id' | 'subgraphError'>>;
  projects?: SubscriptionResolver<Array<ResolversTypes['Project']>, "projects", ParentType, ContextType, RequireFields<SubscriptionprojectsArgs, 'skip' | 'first' | 'subgraphError'>>;
  projectMetadata?: SubscriptionResolver<Array<ResolversTypes['ProjectMetadata']>, "projectMetadata", ParentType, ContextType, RequireFields<SubscriptionprojectMetadataArgs, 'skip' | 'first' | 'subgraphError'>>;
  shipProfile?: SubscriptionResolver<Maybe<ResolversTypes['ShipProfile']>, "shipProfile", ParentType, ContextType, RequireFields<SubscriptionshipProfileArgs, 'id' | 'subgraphError'>>;
  shipProfiles?: SubscriptionResolver<Array<ResolversTypes['ShipProfile']>, "shipProfiles", ParentType, ContextType, RequireFields<SubscriptionshipProfilesArgs, 'skip' | 'first' | 'subgraphError'>>;
  shipProfileMetadata?: SubscriptionResolver<Array<ResolversTypes['ShipProfileMetadata']>, "shipProfileMetadata", ParentType, ContextType, RequireFields<SubscriptionshipProfileMetadataArgs, 'skip' | 'first' | 'subgraphError'>>;
  profileMemberGroup?: SubscriptionResolver<Maybe<ResolversTypes['ProfileMemberGroup']>, "profileMemberGroup", ParentType, ContextType, RequireFields<SubscriptionprofileMemberGroupArgs, 'id' | 'subgraphError'>>;
  profileMemberGroups?: SubscriptionResolver<Array<ResolversTypes['ProfileMemberGroup']>, "profileMemberGroups", ParentType, ContextType, RequireFields<SubscriptionprofileMemberGroupsArgs, 'skip' | 'first' | 'subgraphError'>>;
  _meta?: SubscriptionResolver<Maybe<ResolversTypes['_Meta_']>, "_meta", ParentType, ContextType, Partial<Subscription_metaArgs>>;
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
  Int8?: GraphQLScalarType;
  ProfileMemberGroup?: ProfileMemberGroupResolvers<ContextType>;
  Project?: ProjectResolvers<ContextType>;
  ProjectMetadata?: ProjectMetadataResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  ShipProfile?: ShipProfileResolvers<ContextType>;
  ShipProfileMetadata?: ShipProfileMetadataResolvers<ContextType>;
  Subscription?: SubscriptionResolvers<ContextType>;
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
        document: GetProjectsDocument,
        get rawSDL() {
          return printWithCache(GetProjectsDocument);
        },
        location: 'GetProjectsDocument.graphql'
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
export type ProjectDetailsFragment = Pick<Project, 'id' | 'name' | 'profileId' | 'nonce' | 'anchor' | 'metadata_protocol' | 'metadata_pointer' | 'owner'>;

export type MetadataDetailsFragment = Pick<ProjectMetadata, 'name' | 'description' | 'avatarHash_IPFS'>;

export type GetProjectsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetProjectsQuery = { projects: Array<(
    Pick<Project, 'id' | 'name' | 'profileId' | 'nonce' | 'anchor' | 'metadata_protocol' | 'metadata_pointer' | 'owner'>
    & { metadata?: Maybe<Pick<ProjectMetadata, 'name' | 'description' | 'avatarHash_IPFS'>> }
  )> };

export const ProjectDetailsFragmentDoc = gql`
    fragment ProjectDetails on Project {
  id
  name
  profileId
  nonce
  anchor
  metadata_protocol
  metadata_pointer
  owner
}
    ` as unknown as DocumentNode<ProjectDetailsFragment, unknown>;
export const MetadataDetailsFragmentDoc = gql`
    fragment MetadataDetails on ProjectMetadata {
  name
  description
  avatarHash_IPFS
}
    ` as unknown as DocumentNode<MetadataDetailsFragment, unknown>;
export const GetProjectsDocument = gql`
    query GetProjects {
  projects {
    ...ProjectDetails
    metadata {
      ...MetadataDetails
    }
  }
}
    ${ProjectDetailsFragmentDoc}
${MetadataDetailsFragmentDoc}` as unknown as DocumentNode<GetProjectsQuery, GetProjectsQueryVariables>;


export type Requester<C = {}, E = unknown> = <R, V>(doc: DocumentNode, vars?: V, options?: C) => Promise<R> | AsyncIterable<R>
export function getSdk<C, E>(requester: Requester<C, E>) {
  return {
    GetProjects(variables?: GetProjectsQueryVariables, options?: C): Promise<GetProjectsQuery> {
      return requester<GetProjectsQuery, GetProjectsQueryVariables>(GetProjectsDocument, variables, options) as Promise<GetProjectsQuery>;
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;