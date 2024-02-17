import {
  Alert,
  Avatar,
  Box,
  Button,
  Flex,
  Stack,
  Text,
  TextInput,
} from '@mantine/core';
import { FacShipData } from '../../../queries/getFacDashShipData';
import { useMemo, useState } from 'react';
import { getGatewayUrl } from '../../../utils/ipfs/get';
import { DateTimePicker } from '@mantine/dates';
import { Timeline, TimelineContent } from '../../Timeline';
import { SHIP_AMOUNT } from '../../../constants/gameSetup';
import GameManagerAbi from '../../../abi/GameManager.json';
import { parseEther } from 'viem';
import { useTx } from '../../../hooks/useTx';
import { ADDR } from '../../../constants/addresses';

export const FacilitatorGameDash = ({
  shipsLoading,
  shipData,
}: {
  shipData?: FacShipData;
  shipsLoading: boolean;
}) => {
  const gameStatusNumber = 1;

  const steps = useMemo((): TimelineContent[] | null => {
    if (shipsLoading || !shipData) {
      return null;
    }

    return [
      {
        title: 'Create Game Round',
        description: 'Not Yet Started',
        content: <CreateGamePanel />,
      },
      {
        title: 'Applications',
        description: `${shipData.approvedShips.length}/${SHIP_AMOUNT} Ships Approved`,
        content: (
          <Box>
            {shipData.approvedShips.length ? (
              <Stack>
                {shipData.approvedShips.map((ship) => (
                  <Button
                    key={ship.id}
                    variant="subtle"
                    size="sm"
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
                ))}
              </Stack>
            ) : (
              <Alert w={350}>
                <Text size="md" mb="sm">
                  No ships approved yet
                </Text>
                <Text size="sm" opacity={0.7}>
                  This game requires {SHIP_AMOUNT} ships to play. The next step
                  will be complete once you approve three Grant Ship
                  applications
                </Text>
              </Alert>
            )}
          </Box>
        ),
      },
      {
        title: 'Allocate',
        description: 'Not yet allocated',
        content: (
          <Box>
            <TextInput label="Ship 1" w={350} placeholder="22.5 ETH" mb="xs" />
            <TextInput label="Ship 2" w={350} placeholder="22.5 ETH" mb="xs" />
            <TextInput label="Ship 3" w={350} placeholder="22.5 ETH" mb="xs" />
            <Button>Allocate</Button>
          </Box>
        ),
      },
      {
        title: 'Distribute',
        description: 'Not yet distributed',
        content: (
          <Box>
            <DateTimePicker label="Start Time" w={350} mb={'md'} />
            <DateTimePicker label="End Time" w={350} mb="md" />
            <Button>Distribute Allocations</Button>
          </Box>
        ),
      },
      {
        title: 'Start Game',
        description: 'Game Round is not yet started',
        content: <Button>Start Game</Button>,
      },
      {
        title: 'End Game',
        description: 'Game is not yet Active',
        content: <Button>End Game</Button>,
      },
      {
        title: 'Game Complete',
        description: 'Game is not yet complete',
      },
    ];
  }, [shipData, shipsLoading]);

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

const CreateGamePanel = () => {
  const [amount, setAmount] = useState(0);
  const { tx } = useTx();
  const [isLoading, setIsLoading] = useState(false);

  const amountInWei = useMemo(() => {
    return parseEther(amount.toString());
  }, [amount]);

  const handleCreateRound = () => {
    try {
      console.log(amountInWei);
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
