import { Alert, Box, Button, Text } from '@mantine/core';
import { GameManager } from '../../../queries/getGameManger';
import { secondsToLongDateTime } from '../../../utils/time';
import { useTx } from '../../../hooks/useTx';
import { ADDR } from '../../../constants/addresses';
import GameManagerAbi from '../../../abi/GameManager.json';

export const StopGamePanel = ({
  gm,
  gameStatusNumber,
}: {
  gm: GameManager;
  gameStatusNumber: number;
}) => {
  const STATUS_NUMBER = 6;
  const { tx } = useTx();

  const nowInSeconds = Math.floor(Date.now() / 1000);

  const isReadyToStop = gm?.endTime && Number(gm.endTime) < nowInSeconds;

  const handleStopGame = () => {
    tx({
      writeContractParams: {
        abi: GameManagerAbi,
        functionName: 'stopGame',
        address: ADDR.GAME_MANAGER,
      },
    });
  };

  if (gameStatusNumber > STATUS_NUMBER) {
    return (
      <Box>
        <Alert w={350}>
          <Text fw={600} mb="sm">
            Game Stopped
          </Text>
        </Alert>
      </Box>
    );
  }

  return (
    <Box>
      <Text mb="md">Stop Game</Text>
      <Text fz="sm" fw={600}>
        Game Stop Time
      </Text>
      <Text fz="sm" mb="md">
        {gm?.endTime
          ? secondsToLongDateTime(Number(gm.endTime))
          : 'Stop time not yet set'}
      </Text>
      {!isReadyToStop && (
        <Text size="sm" mb="md" c="red">
          The game cannot be stopped until the start time has passed
        </Text>
      )}
      <Button disabled={!isReadyToStop} onClick={handleStopGame}>
        Stop Game
      </Button>
    </Box>
  );
};
