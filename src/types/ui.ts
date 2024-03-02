import { GameStatus } from './common';

export enum Player {
  Facilitators = 'facilitators',
  Ship = 'ship',
  Project = 'project',
}

export type FeedCardUI = {
  subject: {
    name: string;
    id: string;
    imgUrl?: string;
    entityType: Player;
  };
  object?: {
    name: string;
    id: string;
    entityType: Player;
  };
  content: string;
  timestamp: number;
  embedText?: string;
  embed?: {
    text: string;
    url: string;
  };
  sender: string;
};

export enum MilestoneStatus {
  Idle,
  InReview,
  Approved,
  Rejected,
}

export type MilestoneStep = {
  status: MilestoneStatus;
  amount: bigint;
  description: string;
};

export type ShipsCardUI = {
  id: string;
  name: string;
  status: GameStatus;
  imgUrl: string;
  description: string;
  amtAllocated: string;
  amtDistributed: string;
  amtAvailable: string;
  balance: string;
};

export type ShipPageUI = {
  name: string;
  description: string;
  imgUrl: string;
  status: GameStatus;
  amtAllocated: string;
  amtDistributed: string;
  amtAvailable: string;
  shipContractAddress: string;
  members: string[];
  details: {
    thesis?: string;
    apply?: string;
    fee?: string;
    extraInfo?: string;
    extraLink?: string;
    website?: string;
    email?: string;
    x?: string;
    discord?: string;
    telegram?: string;
    github?: string;
  };
};

export type GrantUI = {
  milestones: MilestoneStep[];
  shipName: string;
  shipAddress: string;
  reason: string;
  milestonesStatus: MilestoneStatus;
  grantApplication: {
    expectedDelivery: number;
    grantAmount: bigint;
    receiverAddress: string;
    grantObjectives: string;
    proposalLink: string;
    additionalLink: string;
    extraInfo: string;
  };
};

export type ProjectPageUI = {
  id: string;
  name: string;
  imgUrl: string;
  status: GameStatus;
  description: string;
  grants: GrantUI[] | null;
  website: string;
  email: string;
  github: string;
  x: string;
  discord: string;
  telegram: string;
  members: string[];
};
