import { Content } from '@tiptap/react';
import { ShowcaseLink } from '../utils/media';
import { GameStatus } from './common';

export enum Player {
  Project,
  Ship,
  Facilitators,
  System,
}

export type FeedCardUI = {
  subject: {
    name: string;
    id: string;
    imgUrl?: string;
    playerType: Player;
    description?: string;
  };
  object?: {
    name: string;
    id: string;
    playerType: Player;
  };
  message?: string;
  timestamp: number;
  embedText?: string;
  embed?: {
    text: string;
    url: string;
  };
  sender: string;
  richTextContent?: Content;
  limitHeight?: boolean;
  internalLink?: string;
  externalLink?: string;
  tag: string;
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

  balance: string;
  shipContractAddress?: string | null;
};

export type ShipPageUI = {
  name: string;
  description: string;
  imgUrl: string;
  status: GameStatus;
  amtAllocated: string;
  amtDistributed: string;
  hatId?: string;
  totalRoundAmount: string;
  balance: string;
  shipContractAddress?: string | null;
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
  profileId: string;
  imgUrl: string;
  avatarHash: string;
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
  showcaseLinks?: ShowcaseLink[];
  bannerImage?: string;
  bannerImgUrl?: string;
  mainDemoLink?: string;
};
