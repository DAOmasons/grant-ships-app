import { Content } from '@tiptap/react';
import { GameStatus, VotingStage } from '../types/common';

export const SHIP_STATUS_INFO: Record<number | string, string> = {
  [GameStatus.Accepted]:
    'This ship has been accepted and is ready for allocation.',
  [GameStatus.Allocated]:
    'This ship has been allocated and is ready for funding.',
  [GameStatus.Active]:
    'This ship is actively funding and is accepting applications.',
  [GameStatus.Completed]:
    'This ship has completed funding and is no longer accepting applications.',
  Flagged:
    'This ship has received a red flag and is currently under review. It cannot fund or accept applications until the flag is resolved.',
};

export const VOTING_STAGE_INFO: Record<number | string, string> = {
  [VotingStage.None]: 'Voting has not been initiated.',
  [VotingStage.Initiated]: 'Voting has been initiated, but is not yet active.',
  [VotingStage.Active]: 'Voting is currently active.',
  [VotingStage.Closed]: 'Voting is over, but results have not been finalized.',
  [VotingStage.Finalized]: 'Voting results have been finalized.',
};

export const beaconNotSubmitted: Content = {
  type: 'doc',
  content: [
    {
      attrs: { level: 3 },
      type: 'heading',
      content: [{ type: 'text', text: 'Beacon Not Submitted' }],
    },
    {
      type: 'paragraph',
      content: [
        {
          type: 'text',
          text: 'The beacon has not been submitted for this ship.',
        },
      ],
    },
  ],
};

export const defaultApplication: Content = {
  type: 'doc',
  content: [
    {
      type: 'paragraph',
      content: [
        {
          marks: [{ type: 'bold' }],
          type: 'text',
          text: 'Game Description: ',
        },
      ],
    },
    {
      type: 'paragraph',
      content: [
        {
          type: 'text',
          text: '(A brief 1-2 description of your project)',
        },
        {
          type: 'text',
          text: '\n',
        },
      ],
    },
    {
      type: 'paragraph',
      content: [
        {
          marks: [{ type: 'bold' }],
          type: 'text',
          text: 'Deliverables: ',
        },
      ],
    },
    {
      type: 'paragraph',
      content: [
        {
          type: 'text',
          text: '(Provide 1-3 objectives or deliverables)',
        },
        {
          type: 'text',
          text: '\n',
        },
      ],
    },
    {
      type: 'paragraph',
      content: [
        {
          marks: [{ type: 'bold' }],
          type: 'text',
          text: 'Additional Links: ',
        },
      ],
    },
    {
      type: 'paragraph',
      content: [
        {
          type: 'text',
          text: 'Optional, provide some links to any project deployments or demos)',
        },
        {
          type: 'text',
          text: '\n',
        },
      ],
    },
    {
      type: 'paragraph',
      content: [
        {
          marks: [{ type: 'bold' }],
          type: 'text',
          text: 'Additional Information: ',
        },
      ],
    },
    {
      type: 'paragraph',
      content: [
        {
          type: 'text',
          text: '(Any additional information that can be provided)',
        },
        {
          type: 'text',
          text: '\n',
        },
      ],
    },
  ],
};
