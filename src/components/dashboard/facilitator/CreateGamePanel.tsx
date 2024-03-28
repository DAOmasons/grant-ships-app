import { useMemo, useState } from 'react';

import { useTx } from '../../../hooks/useTx';
import { formatEther, parseEther } from 'viem';
import GameManagerAbi from '../../../abi/GameManager.json';
import { ADDR } from '../../../constants/addresses';
import { Box, Text, TextInput } from '@mantine/core';
import { GAME_TOKEN } from '../../../constants/gameSetup';
import { GameManager } from '../../../queries/getGameManger';
import { TxButton } from '../../TxButton';
import { useQueryClient } from '@tanstack/react-query';

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
  const queryClient = useQueryClient();

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
        onComplete() {
          queryClient.invalidateQueries({ queryKey: ['game-manager-state'] });
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
      <TxButton onClick={handleCreateRound} w="100%" disabled={!amountInWei}>
        Create Game Round
      </TxButton>
    </Box>
  );
};
