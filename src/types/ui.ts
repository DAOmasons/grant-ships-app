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
  timestamp: string;
  embedText?: string;
  embed?: {
    text: string;
    url: string;
  };
  sender: string;
};
