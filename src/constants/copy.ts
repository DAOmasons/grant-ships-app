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
