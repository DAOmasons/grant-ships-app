import { GameStatus } from '../types/common';

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
