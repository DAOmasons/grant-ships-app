import {
  GameManager as ClientGameManger,
  getBuiltGraphSDK,
} from '../.graphclient';
import { GAME_MANAGER } from '../constants/gameSetup';
import { publicClient } from '../utils/config';
import GameManagerAbi from '../abi/GameManager.json';

export type GameManager = ClientGameManger & {
  endTime?: bigint;
  startTime?: bigint;
};

export const getRoundTimes = async (gameRound: string) => {
  const crappyViemUnknownData = await publicClient.readContract({
    address: GAME_MANAGER.ADDRESS,
    abi: GameManagerAbi,
    functionName: 'getGameRound',
    args: [BigInt(gameRound)],
  });

  const data = crappyViemUnknownData as any;

  if (
    !data ||
    data?.startTime === undefined ||
    data?.endTime === undefined ||
    typeof data?.startTime !== 'bigint' ||
    typeof data?.startTime !== 'bigint'
  ) {
    console.log('Error getting round times:', data);
  }

  return {
    startTime: data?.startTime as bigint,
    endTime: data?.endTime as bigint,
  };
};

export const getGameManger = async (): Promise<GameManager> => {
  try {
    const { getGameManager } = getBuiltGraphSDK();

    const gameManager = await getGameManager({ id: GAME_MANAGER.ADDRESS });

    // Todo, remove this one when GMv1.1 is deployed
    const { startTime, endTime } = await getRoundTimes(
      gameManager?.gameManager?.currentRoundId
    );
    return { ...gameManager.gameManager, startTime, endTime } as GameManager;
  } catch (error) {
    console.error('Error getting game manager:', error);
    throw error;
  }
};
