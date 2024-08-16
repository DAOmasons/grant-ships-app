import { Box, Stack, Tabs, Text, useMantineTheme } from '@mantine/core';
import { MainSection, PageTitle } from '../layout/Sections';

import { useQuery } from '@tanstack/react-query';
import { getFacDashShipData } from '../queries/getFacDashShipData';
import { FacilitatorShipDash } from '../components/dashboard/facilitator/FacilitatorShipDash';
import { FacilitatorGameDash } from '../components/dashboard/facilitator/FacilitatorGameDash';
import { useGameManager } from '../hooks/useGameMangers';
import GameManagerAbi from '../abi/GameManager.json';
import { useMemo } from 'react';
import { GAME_MANAGER, NETWORK_ID, SHIP_AMOUNT } from '../constants/gameSetup';
import { useReadContract } from 'wagmi';
import { ADDR } from '../constants/addresses';
import { GameStatus, GrantStatus } from '../types/common';
import { FacPostUpdatePanel } from '../components/dashboard/facilitator/FacPostUpdatePanel';
import { useVoting } from '../hooks/useVoting';
import { getFacilitatorGrants } from '../queries/getFacilitatorGrants';
import { GrantCard } from '../components/grant/GrantCard';

export const FacilitatorDashboard = () => {
  const { data: shipData, isLoading: shipsLoading } = useQuery({
    queryKey: ['fac-ship-data'],
    queryFn: getFacDashShipData,
  });

  const {
    data: grants,
    // isLoading: grantsLoading,
    // error: grantsError,
  } = useQuery({
    queryKey: [`facilitator-grants`, GAME_MANAGER.ADDRESS],
    queryFn: () => getFacilitatorGrants(GAME_MANAGER.ADDRESS),
    enabled: !!GAME_MANAGER.ADDRESS,
  });

  const { gm, isLoadingGm } = useGameManager();

  const { data: poolBalance, isLoading: poolLoading } = useReadContract({
    abi: GameManagerAbi,
    chainId: NETWORK_ID,
    functionName: 'getPoolAmount',
    address: ADDR.GAME_MANAGER,
  });

  const { isLoadingVoting } = useVoting();
  const theme = useMantineTheme();

  const gameOperationStage = useMemo(() => {
    if (!gm || !shipData || typeof poolBalance !== 'bigint') {
      return undefined;
    }

    // Create Round Ready
    // if there is no game round, or game status === 0, then the game is not started
    if (!gm.currentRound) {
      return 0;
    }

    if (
      gm.currentRound.gameStatus === GameStatus.Pending &&
      poolBalance < BigInt(gm.currentRound?.totalRoundAmount)
    ) {
      return 1;
    }
    // Application Phase Ready
    // if there is is not enough ships, then we are in the application stage, stage === 1
    if (
      gm.currentRound.gameStatus === GameStatus.Pending &&
      shipData.approvedShips.length < SHIP_AMOUNT
    ) {
      return 2;
    }

    // Allocation Ready
    // if there are enough ships, then we are in the game, stage === 2
    if (
      gm.currentRound.gameStatus === GameStatus.Pending &&
      shipData.approvedShips.length >= SHIP_AMOUNT
    ) {
      return 3;
    }

    // Distribution Ready
    // if the gameStatus is 4, then we are in the distribution, stage === 3
    if (gm.currentRound.gameStatus === GameStatus.Allocated) {
      return 4;
    }

    // Start Game Ready
    // if the gameStatus is 5, then we are in the funded stage and are ready to start the game, stage === 4
    if (gm.currentRound.gameStatus === GameStatus.Funded) {
      return 5;
    }

    // Stop Game Ready
    // if the gameStatus is 6, then we are in the the we in the active stage, and can stop the game, stage === 5
    if (gm.currentRound.gameStatus === GameStatus.Active) {
      return 6;
    }

    // // Populating Ready
    // // Checks to see if the voting contracts exists, if it does, then we await choices and approve them
    // if (votingExists && contestStatus === ContestStatus.Populating) {
    //   return 7;
    // }

    // // Voting Ready
    // // Voting is ready to be initiated
    // if (contestStatus === ContestStatus.Voting && !isVotingActive) {
    //   return 8;
    // }

    // // Voting is active
    // // Awaiting the end of the voting period
    // if (isVotingActive) {
    //   return 9;
    // }

    // // Finalized
    // // The contest is finalized
    // if (contestStatus === ContestStatus.Finalized) {
    //   return 10;
    // }
  }, [shipData, gm, poolBalance]);

  const { needsAttention, idleGrants } = useMemo(() => {
    if (!grants)
      return {
        needsAttention: null,
        idleGrants: null,
      };

    let needsAttention = [];
    let idleGrants = [];

    for (let grant of grants) {
      if (grant.status === GrantStatus.MilestonesApproved) {
        needsAttention.push(grant);
      } else {
        idleGrants.push(grant);
      }
    }
    return {
      needsAttention,
      idleGrants,
    };
  }, [grants]);

  return (
    <MainSection>
      <PageTitle title="Facilitator Dashboard" />
      <Tabs defaultValue="game-manager">
        <Tabs.List mb="xl" grow>
          <Tabs.Tab value="game-manager">Game</Tabs.Tab>
          <Tabs.Tab value="ships">Ships</Tabs.Tab>
          <Tabs.Tab value="grants">Grants</Tabs.Tab>
          <Tabs.Tab value="post">Post</Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel value="ships">
          <FacilitatorShipDash
            gm={gm}
            shipData={shipData}
            isLoading={shipsLoading || isLoadingGm}
          />
        </Tabs.Panel>
        <Tabs.Panel value="game-manager">
          <FacilitatorGameDash
            gm={gm}
            isLoadingVoting={isLoadingVoting}
            gameStatusNumber={gameOperationStage}
            isLoading={shipsLoading || isLoadingGm || poolLoading}
            poolBalance={poolBalance as bigint | undefined}
            shipData={shipData}
          />
        </Tabs.Panel>
        <Tabs.Panel value="grants">
          <Stack>
            <Box>
              <Text fz="sm" mb={'md'} c={theme.colors.gray[6]}>
                Needs Attention
              </Text>
              <Stack>
                {needsAttention?.map((grant) => (
                  <GrantCard
                    hasPending={grant.hasPendingMilestones}
                    hasRejected={grant.hasRejectedMilestones}
                    allCompleted={grant.allMilestonesApproved}
                    key={grant.id}
                    avatarUrls={[
                      grant.project?.metadata?.imgUrl || '',
                      grant.ship?.profileMetadata.imgUrl || '',
                    ]}
                    label={`${grant.project.name}`}
                    isActive={grant.status >= GrantStatus.Allocated}
                    linkUrl={`/grant/${grant.id}/timeline`}
                    status={grant.status}
                    notify
                  />
                ))}
              </Stack>
            </Box>
            <Box>
              <Text fz="sm" mb={'md'} c={theme.colors.gray[6]}>
                Idle
              </Text>
              <Stack>
                {idleGrants?.map((grant) => (
                  <GrantCard
                    hasPending={grant.hasPendingMilestones}
                    hasRejected={grant.hasRejectedMilestones}
                    allCompleted={grant.allMilestonesApproved}
                    key={grant.id}
                    avatarUrls={[
                      grant.project?.metadata?.imgUrl || '',
                      grant.ship?.profileMetadata.imgUrl || '',
                    ]}
                    label={`${grant.project.name}`}
                    isActive={grant.status >= GrantStatus.Allocated}
                    linkUrl={`/grant/${grant.id}/timeline`}
                    status={grant.status}
                  />
                ))}
              </Stack>
            </Box>
          </Stack>
        </Tabs.Panel>
        <Tabs.Panel value="post">
          <FacPostUpdatePanel />
        </Tabs.Panel>
      </Tabs>
    </MainSection>
  );
};
