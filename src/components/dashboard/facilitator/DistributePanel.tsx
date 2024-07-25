import { Alert, Box, Divider, Text, useMantineTheme } from '@mantine/core';
import { DateTimePicker, DateValue } from '@mantine/dates';
import { notifications } from '@mantine/notifications';
import { useMemo, useState } from 'react';
import { encodeAbiParameters, formatEther, parseAbiParameters } from 'viem';
import AlloAbi from '../../../abi/Allo.json';
import { ADDR } from '../../../constants/addresses';
import { GAME_MANAGER, GAME_TOKEN } from '../../../constants/gameSetup';
import { useTx } from '../../../hooks/useTx';
import { CompressedApprovedShip } from '../../../queries/getFacDashShipData';
import { TxButton } from '../../TxButton';
import { GameStatus } from '../../../types/common';
import { useQueryClient } from '@tanstack/react-query';
import { useGameManager } from '../../../hooks/useGameMangers';

export const DistributePanel = ({
  approvedShips,
  gameStatusNumber,
}: {
  gameStatusNumber: number;
  approvedShips: CompressedApprovedShip[];
}) => {
  const STATUS_NUMBER = 4;
  const isNotReady = gameStatusNumber < STATUS_NUMBER;

  const queryClient = useQueryClient();

  const [startTime, setStartTime] = useState<DateValue>(null);
  const [endTime, setEndTime] = useState<DateValue>(null);
  const { tx } = useTx();

  const { gm } = useGameManager();

  const theme = useMantineTheme();

  const allocatedShips = useMemo(() => {
    return approvedShips.filter((ship) => ship.status === GameStatus.Allocated);
  }, [approvedShips]);

  const handleDistribute = () => {
    if (!startTime || !endTime) {
      notifications.show({
        title: 'Error',
        message: 'Please select a start and end time',
        color: 'red',
      });
      return;
    }

    const startTimeSeconds = BigInt(Math.round(startTime.getTime() / 1000));
    const endTimeSeconds = BigInt(Math.round(endTime.getTime() / 1000));

    const encoded = encodeAbiParameters(
      parseAbiParameters('uint256, uint256'),
      [startTimeSeconds, endTimeSeconds]
    );

    const shipIds = allocatedShips.map((ship) => ship.id);

    tx({
      writeContractParams: {
        functionName: 'distribute',
        abi: AlloAbi,
        address: ADDR.ALLO,
        args: [gm?.poolId, shipIds, encoded],
      },
      onComplete() {
        queryClient.invalidateQueries({ queryKey: ['game-manager-state'] });
      },
    });
  };

  if (gameStatusNumber > STATUS_NUMBER) {
    return (
      <Box>
        <Alert>
          <Text fw={600} mb="sm">
            Distribution Complete
          </Text>
          {approvedShips.map((ship) => (
            <Text fz={'sm'} key={`distro-txt-${ship.id}`} mb="xs">
              {ship.name}:{' '}
              {ship.totalAvailableFunds
                ? formatEther(BigInt(ship.totalAvailableFunds))
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
        Distribute Funds to Grant Ships
      </Text>
      <Alert mb="sm" bg={theme.colors.yellow[9]}>
        <Text fz="sm" mb="sm" fw={600}>
          Warning!
        </Text>
        <Text fz="sm">
          Make sure that the dates are correct before submitting. This function
          can only be called once
        </Text>
      </Alert>

      <Text fz="sm" mb="sm" fw={600}>
        Preview:
      </Text>
      {allocatedShips.map((ship) => (
        <Text fz={'sm'} key={`allocated-ship-${ship.id}`} mb="xs">
          {ship.name}:{' '}
          {ship.shipAllocation
            ? formatEther(BigInt(ship.shipAllocation))
            : 'Error'}{' '}
          {GAME_TOKEN.SYMBOL}
        </Text>
      ))}
      <Divider mb="md" mt="md" />

      <DateTimePicker
        clearable
        label="Start Time"
        mb={'md'}
        onChange={setStartTime}
        placeholder="Select a date and time"
        disabled={isNotReady}
      />
      <DateTimePicker
        clearable
        label="End Time"
        mb="md"
        onChange={setEndTime}
        placeholder="Select a date and time"
        disabled={isNotReady}
      />
      <TxButton onClick={handleDistribute} disabled={isNotReady}>
        Distribute Allocations
      </TxButton>
    </Box>
  );
};
