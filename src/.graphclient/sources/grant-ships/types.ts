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
  | 'currentRound__gameStatus'
  | 'poolFunds';

export type GameRound = {
  id: Scalars['ID'];
  startTime: Scalars['BigInt'];
  endTime: Scalars['BigInt'];
  totalRoundAmount: Scalars['BigInt'];
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
  hasSubmittedApplication?: Maybe<Scalars['Boolean']>;
  isApproved?: Maybe<Scalars['Boolean']>;
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
  hasSubmittedApplication?: InputMaybe<Scalars['Boolean']>;
  hasSubmittedApplication_not?: InputMaybe<Scalars['Boolean']>;
  hasSubmittedApplication_in?: InputMaybe<Array<Scalars['Boolean']>>;
  hasSubmittedApplication_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  isApproved?: InputMaybe<Scalars['Boolean']>;
  isApproved_not?: InputMaybe<Scalars['Boolean']>;
  isApproved_in?: InputMaybe<Array<Scalars['Boolean']>>;
  isApproved_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
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
  | 'hasSubmittedApplication'
  | 'isApproved'
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

  export type QuerySdk = {
      /** null **/
  project: InContextSdkMethod<Query['project'], QueryprojectArgs, MeshContext>,
  /** null **/
  projects: InContextSdkMethod<Query['projects'], QueryprojectsArgs, MeshContext>,
  /** null **/
  grantShip: InContextSdkMethod<Query['grantShip'], QuerygrantShipArgs, MeshContext>,
  /** null **/
  grantShips: InContextSdkMethod<Query['grantShips'], QuerygrantShipsArgs, MeshContext>,
  /** null **/
  grantShipLookup: InContextSdkMethod<Query['grantShipLookup'], QuerygrantShipLookupArgs, MeshContext>,
  /** null **/
  grantShipLookups: InContextSdkMethod<Query['grantShipLookups'], QuerygrantShipLookupsArgs, MeshContext>,
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
  grantShip: InContextSdkMethod<Subscription['grantShip'], SubscriptiongrantShipArgs, MeshContext>,
  /** null **/
  grantShips: InContextSdkMethod<Subscription['grantShips'], SubscriptiongrantShipsArgs, MeshContext>,
  /** null **/
  grantShipLookup: InContextSdkMethod<Subscription['grantShipLookup'], SubscriptiongrantShipLookupArgs, MeshContext>,
  /** null **/
  grantShipLookups: InContextSdkMethod<Subscription['grantShipLookups'], SubscriptiongrantShipLookupsArgs, MeshContext>,
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
