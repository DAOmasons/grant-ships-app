import {
  Alert,
  Avatar,
  Box,
  Button,
  Flex,
  Group,
  Skeleton,
  Stack,
  Text,
  TextInput,
} from '@mantine/core';
import { FacShipData } from '../../../queries/getFacDashShipData';
import { useMemo, useState } from 'react';
import { getGatewayUrl } from '../../../utils/ipfs/get';
import { DateTimePicker } from '@mantine/dates';
import { Timeline, TimelineContent } from '../../Timeline';
import { GAME_TOKEN, SHIP_AMOUNT } from '../../../constants/gameSetup';
import GameManagerAbi from '../../../abi/GameManager.json';
import { formatEther, parseEther } from 'viem';
import { useTx } from '../../../hooks/useTx';
import { ADDR } from '../../../constants/addresses';
import { GameManager } from '../../../.graphclient';
import { Link } from 'react-router-dom';

export const FacilitatorGameDash = ({
  shipsLoading,
  shipData,
  gameStatusNumber,
  gm,
}: {
  gm?: GameManager;
  shipData?: FacShipData;
  gameStatusNumber?: number;
  shipsLoading: boolean;
}) => {
  const steps = useMemo((): TimelineContent[] | null => {
    if (shipsLoading || !shipData || !gm || gameStatusNumber === undefined) {
      return null;
    }

    return [
      {
        title: 'Create Game Round',
        description:
          gameStatusNumber > 0
            ? 'Game Round Created'
            : 'Game Round Not Created',
        content: (
          <CreateGamePanel gameStatusNumber={gameStatusNumber} gm={gm} />
        ),
      },
      {
        title: 'Applications',
        description: `${shipData.approvedShips.length}/${SHIP_AMOUNT} Ships Approved`,
        content: <ShipApplicationPanel shipData={shipData} />,
      },
      {
        title: 'Allocate',
        description:
          gameStatusNumber > 2 ? 'Funds Allocated' : 'Not yet allocated',
        content: <AllocationPanel />,
      },
      {
        title: 'Distribute',
        description:
          gameStatusNumber > 3 ? 'Funds Distributed' : 'Not yet Distributed',
        content: <DistributePanel />,
      },
      {
        title: 'Start Game',
        description:
          gameStatusNumber > 3
            ? 'Game round started'
            : 'Game Round has not started',
        content: <Button>Start Game</Button>,
      },
      {
        title: 'End Game',
        description: gameStatusNumber > 5 ? 'Game Ended' : 'Game Not Finished',
        content: <Button>End Game</Button>,
      },
      {
        title: 'Game Complete',
        description:
          gameStatusNumber > 6 ? 'Game is not yet complete' : 'Game Complete',
      },
    ];
  }, [shipData, shipsLoading, gameStatusNumber, gm]);

  if (!gameStatusNumber) {
    return (
      <Stack>
        <Skeleton w="100%" h={120} />
        <Skeleton w="100%" h={120} />
        <Skeleton w="100%" h={120} />
        <Skeleton w="100%" h={120} />
        <Skeleton w="100%" h={120} />
      </Stack>
    );
  }

  return (
    <Flex direction="column">
      {steps && (
        <Timeline
          subKey="game-manager"
          steps={steps}
          currentNumber={gameStatusNumber}
          containerProps={{ w: '100%' }}
        />
      )}
    </Flex>
  );
};

const CreateGamePanel = ({
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
      <Button onClick={handleCreateRound} disabled={isLoading}>
        Create Game Round
      </Button>
    </Box>
  );
};

const ShipApplicationPanel = ({ shipData }: { shipData: FacShipData }) => {
  return (
    <Box>
      <Text fz="sm" mb="md">
        This Game Requires {SHIP_AMOUNT} approved ships before allocating
      </Text>
      {shipData.approvedShips.length ? (
        <Stack>
          {shipData.approvedShips.map((ship, index) => (
            <Group gap="0" key={ship.id}>
              <Text>{index + 1}</Text>
              <Button
                variant="subtle"
                size="sm"
                component={Link}
                to={`/ship/${ship.id}`}
                style={{ display: 'flex', justifyItems: 'center' }}
                leftSection={
                  <Avatar
                    size={32}
                    src={
                      ship.profileMetadata.avatarHash_IPFS &&
                      getGatewayUrl(ship.profileMetadata.avatarHash_IPFS)
                    }
                  />
                }
              >
                <Text fz="sm">{ship.name}</Text>
              </Button>
            </Group>
          ))}
        </Stack>
      ) : (
        <Alert w={350}>
          <Text size="md" mb="sm">
            No ships approved yet
          </Text>
          <Text size="sm" opacity={0.7}>
            This game requires {SHIP_AMOUNT} ships to play. The next step will
            be complete once you approve three Grant Ship applications
          </Text>
        </Alert>
      )}
    </Box>
  );
};

export const AllocationPanel = () => {
  return (
    <Box>
      <TextInput label="Ship 1" w={350} placeholder="22.5 ETH" mb="xs" />
      <TextInput label="Ship 2" w={350} placeholder="22.5 ETH" mb="xs" />
      <TextInput label="Ship 3" w={350} placeholder="22.5 ETH" mb="xs" />
      <Button>Allocate</Button>
    </Box>
  );
};

export const DistributePanel = () => {
  return (
    <Box>
      <DateTimePicker label="Start Time" w={350} mb={'md'} />
      <DateTimePicker label="End Time" w={350} mb="md" />
      <Button>Distribute Allocations</Button>
    </Box>
  );
};
