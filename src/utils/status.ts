import { GameStatus, VotingStage } from '../types/common';

export const getGameStatusText = (status: GameStatus) => {
  return Object.keys(GameStatus)[status];
};

export const getVoteStageStatus = (status: VotingStage) => {
  console.log('Object.keys(VotingStage)', Object.keys(VotingStage));
  return Object.keys(VotingStage)[status];
};
