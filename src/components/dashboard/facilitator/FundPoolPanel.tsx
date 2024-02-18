import { useAccount, useReadContracts } from 'wagmi';
import { useTx } from '../../../hooks/useTx';
import { Address, erc20Abi, formatEther, parseEther } from 'viem';
import { arbitrumSepolia } from 'viem/chains';
import { GAME_TOKEN } from '../../../constants/gameSetup';
import { ADDR } from '../../../constants/addresses';
import { Alert, Box, Button, Skeleton, Text, TextInput } from '@mantine/core';

export const FundPoolPanel = ({
  poolBalance,
  roundAmount,
  gameStatusNumber,
}: {
  poolBalance: bigint;
  roundAmount: string;
  gameStatusNumber: number;
}) => {
  const STATUS_NUMBER = 1;

  const { address } = useAccount();
  const { tx } = useTx();
  const { data: queries, isLoading } = useReadContracts({
    contracts: [
      {
        abi: erc20Abi,
        chainId: arbitrumSepolia.id,
        address: GAME_TOKEN.ADDRESS as Address,
        functionName: 'allowance',
        args: [address as Address, ADDR.GAME_MANAGER as Address],
      },
      {
        abi: erc20Abi,
        chainId: arbitrumSepolia.id,
        address: GAME_TOKEN.ADDRESS as Address,
        functionName: 'balanceOf',
        args: [address as Address],
      },
    ],
  });

  if (!queries) {
    return null;
  }

  if (isLoading) {
    return <Skeleton w={350} h={120} />;
  }

  if (queries[0].status !== 'success' || queries[1].status !== 'success') {
    return <Text>Something went wrong</Text>;
  }

  const allowance = queries[0].result as bigint;
  const balance = queries[1].result as bigint;

  const approveGameManager = () => {
    tx({
      writeContractParams: {
        functionName: 'approve',
        abi: erc20Abi,
        address: GAME_TOKEN.ADDRESS as Address,
        args: [ADDR.GAME_MANAGER as Address, parseEther(roundAmount)],
      },
      viewParams: {
        awaitGraphPoll: false,
      },
    });
  };

  if (gameStatusNumber > STATUS_NUMBER) {
    return (
      <Box>
        <Text size="sm" mb="sm">
          Pool Funded: {formatEther(poolBalance)} {GAME_TOKEN.SYMBOL}
        </Text>
      </Box>
    );
  }
  if (allowance < BigInt(roundAmount)) {
    return (
      <Box>
        <Alert w={350} mb="sm">
          <Text fw={600} mb="sm">
            Approve GameManager contract
          </Text>
          <Text size="xs" mb="sm" opacity={0.8}>
            You need to approve the game manager to spend your funds
          </Text>
          <Text size="sm" mb="sm">
            Proposed Round Amount: {formatEther(BigInt(roundAmount))}{' '}
            {GAME_TOKEN.SYMBOL}
          </Text>
          <Text size="sm" mb="sm">
            Approved amount: {formatEther(BigInt(allowance))}{' '}
            {GAME_TOKEN.SYMBOL}
          </Text>
        </Alert>
        <Button onClick={approveGameManager}>
          Approve {formatEther(BigInt(roundAmount))} {GAME_TOKEN.SYMBOL}
        </Button>
      </Box>
    );
  }

  return (
    <Box>
      <Alert w={350} mb="sm">
        <Text fw={600} mb="sm">
          Fund Pool
        </Text>
        <Text size="sm" mb="sm">
          Proposed Round Amount: {formatEther(BigInt(roundAmount))}{' '}
          {GAME_TOKEN.SYMBOL}
        </Text>
        <Text size="sm">
          Pool Funded: {formatEther(poolBalance)} {GAME_TOKEN.SYMBOL}
        </Text>
      </Alert>
      <TextInput type="number" label="Funding amount" w={350} mb="sm" />
      <Text size="sm" mb="sm">
        Your Balance: {formatEther(BigInt(balance))} {GAME_TOKEN.SYMBOL}
      </Text>
      <Button>Fund Pool</Button>
    </Box>
  );
};
