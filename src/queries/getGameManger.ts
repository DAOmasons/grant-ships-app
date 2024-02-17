import { GameManager, getBuiltGraphSDK } from '../.graphclient';
import { GAME_MANAGER } from '../constants/gameSetup';

export const getGameManger = async (): Promise<GameManager> => {
  try {
    const { getGameManager } = getBuiltGraphSDK();

    const gameManager = await getGameManager({ id: GAME_MANAGER.ADDRESS });

    return gameManager.gameManager as GameManager;
  } catch (error) {
    console.error('Error getting game manager:', error);
    throw error;
  }
};
