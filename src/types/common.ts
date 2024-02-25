// Arbitrary JSON type to ensure that non-JSON serializable types are not used

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
  FacilitatorRejected,
  FacilitatorApproved,
  MilestonesProposed,
  MilestonesRejected,
  MilestonesApproved,
  MilestoneSubmitted,
  MilestoneRejected,
  MilestoneApproved,
  Completed,
}

// export const GameStatus = {
//   None: 0,
//   Pending: 1,
//   Accepted: 2,
//   Rejected: 3,
//   Allocated: 4,
//   Funded: 5,
//   Active: 6,
//   Completed: 7,
// } as const;

export enum GameStatus {
  None = 0,
  Pending = 1,
  Accepted = 2,
  Rejected = 3,
  Allocated = 4,
  Funded = 5,
  Active = 6,
  Completed = 7,
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
