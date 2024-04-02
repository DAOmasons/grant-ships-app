import {
  GameManager as ClientGameManger,
  getBuiltGraphSDK,
} from '../.graphclient';
import { SUBGRAPH_URL } from '../constants/gameSetup';

import { GAME_MANAGER } from '../constants/gameSetup';

export type GameManager = ClientGameManger;

export const getGameManger = async (): Promise<GameManager> => {
  try {
    const { getGameManager } = getBuiltGraphSDK({
      apiEndpoint: SUBGRAPH_URL,
    });

    const gameManager = await getGameManager({ id: GAME_MANAGER.ADDRESS });

    return { ...gameManager.gameManager } as GameManager;
  } catch (error) {
    console.error('Error getting game manager:', error);
    throw error;
  }
};
