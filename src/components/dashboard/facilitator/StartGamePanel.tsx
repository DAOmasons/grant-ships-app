import { Alert, Box, Button, Text } from '@mantine/core';
import { GameManager } from '../../../queries/getGameManger';
import { secondsToLongDateTime } from '../../../utils/time';
import { useTx } from '../../../hooks/useTx';
import { ADDR } from '../../../constants/addresses';
import GameManagerAbi from '../../../abi/GameManager.json';

export const StartGamePanel = ({
  gm,
  gameStatusNumber,
}: {
  gm: GameManager;
  gameStatusNumber: number;
}) => {
  const STATUS_NUMBER = 5;
  const { tx } = useTx();

  console.log('gm', gm);

  const nowInSeconds = Math.floor(Date.now() / 1000);

  const isReadyToStart =
    gm?.currentRound?.startTime &&
    Number(gm.currentRound.startTime) < nowInSeconds;

  const handleStartGame = () => {
    tx({
      writeContractParams: {
        abi: GameManagerAbi,
        functionName: 'startGame',
        address: ADDR.GAME_MANAGER,
      },
    });
  };

  if (gameStatusNumber > STATUS_NUMBER) {
    return (
      <Box>
        <Alert w={350}>
          <Text fw={600} mb="sm">
            Game Started
          </Text>
        </Alert>
      </Box>
    );
  }

  return (
    <Box>
      <Text mb="md">Start Game</Text>
      <Text fz="sm" fw={600}>
        Game Start Time
      </Text>
      <Text fz="sm" mb="md">
        {gm?.currentRound?.startTime
          ? secondsToLongDateTime(Number(gm.currentRound?.startTime))
          : 'Start time not yet set'}
      </Text>
      {!isReadyToStart && (
        <Text size="sm" mb="md" c="red">
          The game cannot be started until the start time has passed
        </Text>
      )}
      <Button disabled={!isReadyToStart} onClick={handleStartGame}>
        Start Game
      </Button>
    </Box>
  );
};
