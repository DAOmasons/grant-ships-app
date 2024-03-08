/* eslint-disable prefer-const */
import { Alert, Box, Text, TextInput, useMantineTheme } from '@mantine/core';
import {
  Address,
  encodeAbiParameters,
  formatEther,
  parseAbiParameters,
  parseEther,
} from 'viem';
import { GAME_MANAGER, GAME_TOKEN } from '../../../constants/gameSetup';
import { CompressedApprovedShip } from '../../../queries/getFacDashShipData';
import { useMemo, useState } from 'react';
import { useTx } from '../../../hooks/useTx';
import AlloAbi from '../../../abi/Allo.json';
import { ADDR } from '../../../constants/addresses';
import { TxButton } from '../../TxButton';
import { useQueryClient } from '@tanstack/react-query';

export const AllocationPanel = ({
  poolBalance,
  approvedShips,
  gameStatusNumber,
}: {
  gameStatusNumber: number;
  poolBalance: bigint;
  approvedShips: CompressedApprovedShip[];
}) => {
  const STATUS_NUMBER = 3;
  const isNotReady = gameStatusNumber < STATUS_NUMBER;
  const queryClient = useQueryClient();

  const theme = useMantineTheme();
  const { tx } = useTx();

  const [shipData, setShipData] = useState<Record<string, number>>({});

  const totals = useMemo(() => {
    const total = Object.values(shipData).reduce((acc, curr) => acc + curr, 0);
    return {
      total,
      totalInWei: parseEther(total.toString()),
      doesExceed: parseEther(total.toString()) > poolBalance,
    };
  }, [shipData, poolBalance]);

  const handleAllocate = () => {
    // eslint-disable-next-line prefer-const
    let shipIds = [];
    let amounts = [];

    for (const [key, value] of Object.entries(shipData)) {
      shipIds.push(key);
      amounts.push(parseEther(value.toString()));
    }

    const encoded = encodeAbiParameters(
      parseAbiParameters('address[], uint256[], uint256'),
      [shipIds as Address[], amounts, totals.totalInWei]
    );

    tx({
      writeContractParams: {
        functionName: 'allocate',
        abi: AlloAbi,
        address: ADDR.ALLO,
        args: [GAME_MANAGER.POOL.ID, encoded],
      },
      onComplete() {
        queryClient.invalidateQueries({ queryKey: ['game-manager-state'] });
      },
    });
  };

  if (gameStatusNumber > STATUS_NUMBER) {
    return (
      <Box>
        <Alert w={350}>
          <Text fw={600} mb="sm">
            Allocation Complete
          </Text>
          {approvedShips.map((ship) => (
            <Text fz={'sm'} key={`allocation-txt-${ship.id}`} mb="xs">
              {ship.name}:{' '}
              {ship.allocatedAmount
                ? formatEther(BigInt(ship.allocatedAmount))
                : 'Error'}{' '}
              {GAME_TOKEN.SYMBOL}
            </Text>
          ))}
        </Alert>
      </Box>
    );
  }

  return (
    <Box>
      <Text mb="sm" fw={600}>
        Allocate to Grant Ships
      </Text>
      <Alert mb="sm" bg={theme.colors.yellow[9]} w={350}>
        <Text fz="sm" mb="sm" fw={600}>
          Warning!
        </Text>
        <Text fz="sm">
          Make sure allocations are correct before submitting. This function can
          only be called once!
        </Text>
      </Alert>
      <Text fz="sm" mb="sm">
        Pool Balance: {poolBalance ? formatEther(poolBalance) : 0}{' '}
        {GAME_TOKEN.SYMBOL}
      </Text>
      <Text fz="sm" mb="sm">
        Total Funding: {totals.total} {GAME_TOKEN.SYMBOL}
      </Text>
      {totals.doesExceed && (
        <Text fz={'sm'} mb="sm" c={theme.colors.red[6]}>
          Allocations Exceed Pool Balance
        </Text>
      )}
      {approvedShips.map((ship) => (
        <TextInput
          key={`allocation-input-${ship.id}`}
          label={ship.name}
          w={350}
          placeholder="22.5"
          mb="xs"
          type="number"
          onChange={(e) => {
            setShipData((prev) => ({
              ...prev,
              [ship.id]: Number(e.target.value),
            }));
          }}
        />
      ))}

      <TxButton onClick={handleAllocate} disabled={isNotReady}>
        Allocate
      </TxButton>
    </Box>
  );
};
