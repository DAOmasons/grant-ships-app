import { GameStatus } from '../types/common';

export const getGameStatusText = (status: GameStatus) => {
  return Object.keys(GameStatus)[status];
};
