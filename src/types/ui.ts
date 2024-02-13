export type FeedCardUI = {
  subject: {
    name: string;
    id: string;
    imgUrl: string;
    entityType: 'ship' | 'project' | 'facilitator';
  };
  object?: {
    name: string;
    id: string;
    entityType: 'ship' | 'project' | 'facilitator';
  };
  message: string;
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
};
