import { useMemo, useState } from 'react';
import { GameManager } from '../../../.graphclient';
import { useTx } from '../../../hooks/useTx';
import { formatEther, parseEther } from 'viem';
import GameManagerAbi from '../../../abi/GameManager.json';
import { ADDR } from '../../../constants/addresses';
import { Box, Button, Text, TextInput } from '@mantine/core';
import { GAME_TOKEN } from '../../../constants/gameSetup';

export const CreateGamePanel = ({
  gameStatusNumber,
  gm,
}: {
  gm: GameManager;
  gameStatusNumber: number;
}) => {
  const STATUS_NUMBER = 0;

  const [amount, setAmount] = useState(0);
  const { tx } = useTx();
  const [isLoading, setIsLoading] = useState(false);

  const amountInWei = useMemo(() => {
    return parseEther(amount.toString());
  }, [amount]);

  const handleCreateRound = () => {
    try {
      tx({
        writeContractParams: {
          functionName: 'createRound',
          abi: GameManagerAbi,
          address: ADDR.GAME_MANAGER,
          args: [amountInWei],
        },
      });
    } catch (error) {
      console.error('Error creating game round:', error);
    }
  };

  if (gameStatusNumber > STATUS_NUMBER) {
    return (
      <Box>
        <Text fw={600} mb="sm">
          Round {gm.currentRoundId} Created
        </Text>
        <Text size="sm" mb="xs">
          Amount funded for this round:{' '}
          {gm?.currentRound?.totalRoundAmount
            ? formatEther(gm.currentRound?.totalRoundAmount)
            : 0}{' '}
          {GAME_TOKEN.SYMBOL}
        </Text>
      </Box>
    );
  }
  return (
    <Box>
      <TextInput
        label="Game Funding Amount"
        placeholder="22.5 ETH"
        w={350}
        mb="lg"
        onChange={(e) => setAmount(Number(e.target.value))}
        type="number"
      />
      <Button onClick={handleCreateRound} disabled={isLoading} w="100%">
        Create Game Round
      </Button>
    </Box>
  );
};
