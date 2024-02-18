import { Flex, Skeleton, Stack } from '@mantine/core';
import { FacShipData } from '../../../queries/getFacDashShipData';
import { useMemo } from 'react';
import { Timeline, TimelineContent } from '../../Timeline';
import { SHIP_AMOUNT } from '../../../constants/gameSetup';
import { GameManager } from '../../../.graphclient';
import { FundPoolPanel } from './FundPoolPanel';
import { CreateGamePanel } from './CreateGamePanel';
import { ShipApplicationPanel } from './ShipApplicationPanel';
import { DistributePanel } from './DistributePanel';
import { AllocationPanel } from './AllocationPanel';
import { StartGamePanel } from './StartGamePanel';
import { StopGamePanel } from './StopGamePanel';

export const FacilitatorGameDash = ({
  isLoading,
  shipData,
  gameStatusNumber,
  poolBalance,
  gm,
}: {
  gm?: GameManager;
  shipData?: FacShipData;
  gameStatusNumber?: number;
  isLoading: boolean;
  poolBalance?: bigint;
}) => {
  const steps = useMemo((): TimelineContent[] | null => {
    if (
      isLoading ||
      !shipData ||
      !gm ||
      gameStatusNumber === undefined ||
      poolBalance == null
    ) {
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
        title: 'Fund Pool',
        description: poolBalance ? `Pool Funded` : 'Pool Not Funded',
        content: (
          <FundPoolPanel
            roundAmount={gm.currentRound?.totalRoundAmount as string}
            poolBalance={poolBalance}
            gameStatusNumber={gameStatusNumber}
          />
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
        content: (
          <AllocationPanel
            poolBalance={poolBalance}
            approvedShips={shipData.approvedShips}
          />
        ),
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
        content: <StartGamePanel />,
      },
      {
        title: 'End Game',
        description: gameStatusNumber > 5 ? 'Game Ended' : 'Game Not Finished',
        content: <StopGamePanel />,
      },
      {
        title: 'Game Complete',
        description:
          gameStatusNumber > 6 ? 'Game is not yet complete' : 'Game Complete',
      },
    ];
  }, [shipData, isLoading, gameStatusNumber, gm, poolBalance]);

  if (
    !gameStatusNumber ||
    poolBalance === undefined ||
    isLoading ||
    !gm ||
    !shipData
  ) {
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
