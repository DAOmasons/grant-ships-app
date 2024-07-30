// Arbitrary JSON type to ensure that non-JSON serializable types are not used

import { formatEther } from 'viem';

export type Json =
  | string
  | number
  | boolean
  | null
  | Json[]
  | { [key: string]: Json };

export type Metadata = {
  pointer: string;
  protocol: number;
};

export type NestedButton = {
  label: string;
  onClick: () => void;
};

export type AlloMetadata = {
  protocol: bigint;
  pointer: string;
};

export enum TxStates {
  Idle,
  Pinning,
  Signing,
  Validating,
  Syncing,
  Success,
  Error,
  SyncError,
}

export enum GrantStatus {
  None,
  Applied,
  ShipRejected,
  ShipApproved,
  MilestonesProposed,
  MilestonesRejected,
  MilestonesApproved,
  FacilitatorRejected,
  FacilitatorApproved,
  MilestoneSubmitted,
  MilestoneRejected,
  MilestoneApproved,
  Completed,
}

export enum GameStatus {
  None,
  Pending,
  Accepted,
  Rejected,
  Allocated,
  Funded,
  Active,
  Completed,
}

export enum AlloStatus {
  None,
  Pending,
  Accepted,
  Rejected,
  Appealed,
  InReview,
  Canceled,
}
export enum ReportStatus {
  Submit,
  Review,
  Vote,
}

export enum ContestStatus {
  None,
  Populating,
  Voting,
  Continuous,
  Finalized,
  Executed,
}

export enum VotingStage {
  None,
  Initiated,
  Active,
  Closed,
  Finalized,
  Unknown,
}

export const formatBalance = (balance?: bigint) => {
  if (!balance || typeof balance !== 'bigint') return 0;
  return Number(Number(formatEther(balance)).toFixed(2));
};
