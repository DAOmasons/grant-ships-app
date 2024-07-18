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

    const gameManager = await getGameManager({
      id: '0x6525E305b79EB0BF8291b4235ee7952Bad130Ed8',
    });
    console.log('gameManager', gameManager);
    return { ...gameManager.GameManager }?.[0] as GameManager;
  } catch (error) {
    console.error('Error getting game manager:', error);
    throw error;
  }
};
