import { useAccount, useReadContracts } from 'wagmi';
import { useTx } from '../../../hooks/useTx';
import { Address, erc20Abi, formatEther, parseEther } from 'viem';
import { arbitrumSepolia } from 'viem/chains';
import { GAME_MANAGER, GAME_TOKEN } from '../../../constants/gameSetup';
import { ADDR } from '../../../constants/addresses';
import { Alert, Box, Button, Skeleton, Text, TextInput } from '@mantine/core';
import { useState } from 'react';
import AlloAbi from '../../../abi/Allo.json';

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
  const isNotReady = gameStatusNumber < STATUS_NUMBER;

  const { address } = useAccount();
  const { tx } = useTx();
  const { data: queries, isLoading } = useReadContracts({
    contracts: [
      {
        abi: erc20Abi,
        chainId: arbitrumSepolia.id,
        address: GAME_TOKEN.ADDRESS as Address,
        functionName: 'allowance',
        args: [address as Address, ADDR.ALLO as Address],
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

  const [error, setError] = useState<string | null>(null);

  const [inputText, setInputText] = useState(0);

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
        args: [ADDR.ALLO as Address, parseEther(roundAmount)],
      },
      viewParams: {
        awaitGraphPoll: false,
      },
    });
  };

  const fundPool = () => {
    tx({
      writeContractParams: {
        functionName: 'fundPool',
        abi: AlloAbi,
        address: ADDR.ALLO,
        args: [GAME_MANAGER.POOL.ID, parseEther(inputText.toString())],
      },
      viewParams: {
        awaitGraphPoll: false,
      },
    });
  };

  if (gameStatusNumber > STATUS_NUMBER) {
    return (
      <Box>
        <Alert w={350} mb="sm">
          <Text fw={600} mb="sm">
            Pool Funded
          </Text>
          <Text size="sm" mb="sm">
            Proposed Round Amount: {formatEther(BigInt(roundAmount))}{' '}
            {GAME_TOKEN.SYMBOL}
          </Text>
          <Text size="sm">
            Pool Funded: {formatEther(poolBalance)} {GAME_TOKEN.SYMBOL}
          </Text>
        </Alert>
      </Box>
    );
  }
  if (roundAmount && allowance < BigInt(roundAmount)) {
    return (
      <Box>
        <Alert w={350} mb="sm">
          <Text fw={600} mb="sm">
            Approve Allo Protocol
          </Text>
          <Text size="xs" mb="sm" opacity={0.8}>
            You need to approve Allo Protocol to use your Tokens to fund the
            pool
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
        <Button onClick={approveGameManager} w="100%">
          Approve {formatEther(BigInt(roundAmount))} {GAME_TOKEN.SYMBOL}
        </Button>
      </Box>
    );
  }

  const validateBalance = (amount: number) => {
    if (amount > Number(formatEther(balance))) {
      setError('Insufficient balance');
    } else {
      setError(null);
    }
  };

  return (
    <Box>
      <Alert w={350} mb="sm">
        <Text fw={600} mb="sm">
          Fund Pool
        </Text>
        <Text size="sm" mb="sm">
          Proposed Round Amount:{' '}
          {roundAmount
            ? formatEther(BigInt(roundAmount))
            : 'Round Not created yet'}{' '}
          {roundAmount ? GAME_TOKEN.SYMBOL : ''}
        </Text>
        <Text size="sm">
          Pool Funded: {formatEther(poolBalance)} {GAME_TOKEN.SYMBOL}
        </Text>
      </Alert>
      <TextInput
        label="Amount to Fund Pool"
        placeholder="22.5"
        w={350}
        mb="md"
        onChange={(e) => {
          setInputText(Number(e.target.value));
          validateBalance(Number(e.target.value));
        }}
        type="number"
        error={error}
        disabled={isNotReady}
      />
      <Text size="sm" mb="sm">
        Your Balance: {formatEther(BigInt(balance))} {GAME_TOKEN.SYMBOL}
      </Text>
      <Button w="100%" onClick={() => fundPool()} disabled={isNotReady}>
        Fund Pool
      </Button>
    </Box>
  );
};
