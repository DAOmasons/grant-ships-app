/* eslint-disable prefer-const */
import {
  Alert,
  Box,
  Button,
  Text,
  TextInput,
  useMantineTheme,
} from '@mantine/core';
import {
  Address,
  encodeAbiParameters,
  formatEther,
  parseAbi,
  parseAbiParameters,
  parseEther,
} from 'viem';
import { GAME_MANAGER, GAME_TOKEN } from '../../../constants/gameSetup';
import { CompressedApprovedShip } from '../../../queries/getFacDashShipData';
import { useMemo, useState } from 'react';
import { useTx } from '../../../hooks/useTx';
import AlloAbi from '../../../abi/Allo.json';
import { ADDR } from '../../../constants/addresses';

export const AllocationPanel = ({
  poolBalance,
  approvedShips,
}: {
  poolBalance: bigint;
  approvedShips: CompressedApprovedShip[];
}) => {
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
    });
  };

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

      <Button onClick={handleAllocate}>Allocate</Button>
    </Box>
  );
};
