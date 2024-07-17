import { Flex, Skeleton, Stack } from '@mantine/core';
import { FacShipData } from '../../../queries/getFacDashShipData';
import { useMemo } from 'react';
import { Timeline, TimelineContent } from '../../Timeline';
import { SHIP_AMOUNT } from '../../../constants/gameSetup';

import { FundPoolPanel } from './FundPoolPanel';
import { CreateGamePanel } from './CreateGamePanel';
import { ShipApplicationPanel } from './ShipApplicationPanel';
import { DistributePanel } from './DistributePanel';
import { AllocationPanel } from './AllocationPanel';
import { StartGamePanel } from './StartGamePanel';
import { StopGamePanel } from './StopGamePanel';
import { GameManager } from '../../../queries/getGameManger';
import { PopulateChoicesPanel } from './PopulateChoicesPanel';
import { StartVotingPanel } from './StartVotingPanel';
import { CompleteVotePanel } from './CompleteVotePanel';

export const FacilitatorGameDash = ({
  isLoading,
  shipData,
  gameStatusNumber,
  poolBalance,
  gm,
  isLoadingVoting,
}: {
  gm?: GameManager;
  shipData?: FacShipData;
  gameStatusNumber?: number;
  isLoading: boolean;
  poolBalance?: bigint;
  isLoadingVoting: boolean;
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

    console.log('gameStatusNumber', gameStatusNumber);

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
            gameStatusNumber={gameStatusNumber}
          />
        ),
      },
      {
        title: 'Distribute',
        description:
          gameStatusNumber > 3 ? 'Funds Distributed' : 'Not yet Distributed',
        content: (
          <DistributePanel
            approvedShips={shipData.approvedShips}
            gameStatusNumber={gameStatusNumber}
          />
        ),
      },
      {
        title: 'Start Game',
        description:
          gameStatusNumber > 3
            ? 'Game round started'
            : 'Game Round has not started',
        content: <StartGamePanel gm={gm} gameStatusNumber={gameStatusNumber} />,
      },
      {
        title: 'End Round',
        description: gameStatusNumber > 5 ? 'Game Ended' : 'Game Not Finished',
        content: <StopGamePanel gm={gm} gameStatusNumber={gameStatusNumber} />,
      },
      {
        title: 'Populate Choices',
        description:
          gameStatusNumber > 7
            ? 'Choices have been approved'
            : "Choices haven't been approved",
        content: <PopulateChoicesPanel ships={shipData.approvedShips} />,
      },
      {
        title: 'Initiate DAO Voting',
        description:
          gameStatusNumber > 8
            ? 'DAO Vote started'
            : 'DAO Voting has not started',
        content: <StartVotingPanel gameStatusNumber={gameStatusNumber} />,
      },
      {
        title: 'Finalize Voting',
        description:
          gameStatusNumber > 9 ? 'DAO vote is complete' : 'DAO vote is ongoing',
        content: <CompleteVotePanel />,
      },
      {
        title: 'End Voting',
        description:
          gameStatusNumber > 10 ? 'Voting complete!' : 'Voting Ongoing',
      },
    ];
  }, [shipData, isLoading, gameStatusNumber, gm, poolBalance]);

  if (
    // !gameStatusNumber ||
    poolBalance === undefined ||
    isLoading ||
    !gm ||
    !shipData ||
    isLoadingVoting
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
          currentNumber={gameStatusNumber || 0}
          containerProps={{ w: '100%' }}
        />
      )}
    </Flex>
  );
};
