import {
  Avatar,
  Box,
  Flex,
  Group,
  Paper,
  Skeleton,
  Stack,
  Tabs,
  Text,
  Timeline,
  useMantineTheme,
} from '@mantine/core';
import { MainSection, PageTitle } from '../layout/Sections';

import { useQuery } from '@tanstack/react-query';
import { getFacDashShipData } from '../queries/getFacDashShipData';
import { FacilitatorShipDash } from '../components/dashboard/facilitator/FacilitatorShipDash';
import { FacilitatorGameDash } from '../components/dashboard/facilitator/FacilitatorGameDash';
import { AppAlert } from '../components/UnderContruction';
import { useGameManager } from '../hooks/useGameMangers';
import GameManagerAbi from '../abi/GameManager.json';
import { useMemo } from 'react';
import { SHIP_AMOUNT } from '../constants/gameSetup';
import { useReadContract } from 'wagmi';
import { arbitrumSepolia } from 'viem/chains';
import { ADDR } from '../constants/addresses';
import { GameStatus, GrantStatus } from '../types/common';
import { getFacilitatorGrants } from '../queries/getFacilitatorGrants';
import { DashGrant } from '../resolvers/grantResolvers';
import { DashShip } from '../queries/getShipDash';
import { secondsToRelativeTime } from '../utils/time';
import { getTimelineContents } from '../components/dashboard/grantCardUtils';
import { ReviewApplication } from '../components/dashboard/ReviewApplication';
import { IconCheck, IconClock } from '@tabler/icons-react';

export const FacilitatorDashboard = () => {
  const { data: shipData, isLoading: shipsLoading } = useQuery({
    queryKey: ['facShipData'],
    queryFn: getFacDashShipData,
  });

  const { gm, isLoadingGm } = useGameManager();

  const { data: poolBalance, isLoading: poolLoading } = useReadContract({
    abi: GameManagerAbi,
    chainId: arbitrumSepolia.id,
    functionName: 'getPoolAmount',
    address: ADDR.GAME_MANAGER,
  });

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

    // Game Complete Ready
    // If the gameStatus is 7, then the game is complete and and we can reset the game, stage === 6
    if (gm.currentRound.gameStatus === GameStatus.Completed) {
      return 7;
    }
  }, [shipData, gm, poolBalance]);

  return (
    <MainSection>
      <PageTitle title="Facilitator Dashboard" />
      <Tabs defaultValue="ships">
        <Tabs.List mb="xl" grow>
          <Tabs.Tab value="game-manager">Game</Tabs.Tab>
          <Tabs.Tab value="ships">Ships</Tabs.Tab>
          <Tabs.Tab value="projects">Approvals</Tabs.Tab>
          <Tabs.Tab value="hats">Post</Tabs.Tab>
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
            gameStatusNumber={gameOperationStage}
            isLoading={shipsLoading || isLoadingGm || poolLoading}
            poolBalance={poolBalance as bigint | undefined}
            shipData={shipData}
          />
        </Tabs.Panel>
        <Tabs.Panel value="projects">
          <ProjectApproval />
        </Tabs.Panel>
        <Tabs.Panel value="hats">
          <AppAlert
            title="This Feature is under construction."
            description="Check back soon to try it out!"
          />
        </Tabs.Panel>
      </Tabs>
    </MainSection>
  );
};

const ProjectApproval = () => {
  const {
    data: grants,
    error: grantsError,
    isLoading: grantsLoading,
  } = useQuery({
    queryKey: ['fac-grants'],
    queryFn: getFacilitatorGrants,
  });

  const theme = useMantineTheme();

  if (grantsLoading)
    return (
      <Stack gap={'lg'}>
        <Skeleton w={'100%'} h={228} />
        <Skeleton w={'100%'} h={228} />
        <Skeleton w={'100%'} h={228} />
        <Skeleton w={'100%'} h={228} />
      </Stack>
    );

  if (grantsError)
    return (
      <AppAlert
        title="Error"
        color={theme.colors.pink[6]}
        description={grantsError.message || 'Error loading grants data'}
      />
    );

  if (!grants)
    return (
      <AppAlert
        title="Error"
        color={theme.colors.pink[6]}
        description={'Erro loading grants data'}
      />
    );

  if (grants.length === 0)
    return (
      <AppAlert
        title={'No Grants'}
        description={'Grants have not been submitted to Grant Ships yet'}
      />
    );

  return (
    <Stack gap={'lg'}>
      {grants.map((grant) => (
        <GrantCard grant={grant} />
      ))}
    </Stack>
  );
};

const GrantCard = ({ grant }: { grant: DashGrant }) => {
  const currentStage = grant.grantStatus;
  const theme = useMantineTheme();

  return (
    <Paper bg={theme.colors.dark[6]} mih={220} w="100%" p="lg">
      <Flex>
        <Box w="100%">
          <Group>
            <Avatar size={66} src={grant.projectMetadata.imgUrl} />
            <Box>
              <Text fw={600}>{grant.projectId.name}</Text>
              <Text fz="sm">
                Last Updated {secondsToRelativeTime(grant.lastUpdated)}
              </Text>
            </Box>
          </Group>
        </Box>
        <Box w="100%">
          <Timeline bulletSize={20} lineWidth={2} active={4}>
            <Timeline.Item
              h={12}
              w="100%"
              {...(getTimelineContents(
                currentStage,
                GrantStatus.Applied,
                GrantStatus.ShipRejected,
                GrantStatus.ShipApproved,
                1,
                theme,
                {
                  onNotStarted: <Text fz="sm">Application Not Submitted </Text>,
                  onPending: (
                    <ReviewApplication
                      grant={grant}
                      shipAddress={grant.shipId.id}
                    />
                  ),
                  onRejected: (
                    <ReviewApplication
                      grant={grant}
                      shipAddress={grant.shipId.id}
                    />
                  ),
                  onCompleted: (
                    <ReviewApplication
                      grant={grant}
                      shipAddress={grant.shipId.id}
                    />
                  ),
                }
              ) || {})}
            />
            <Timeline.Item
              h={12}
              w="100%"
              {...(getTimelineContents(
                currentStage,
                GrantStatus.ShipApproved,
                GrantStatus.FacilitatorRejected,
                GrantStatus.FacilitatorApproved,
                2,
                theme,
                {
                  onNotStarted: <Text fz="sm">Facilitator Review</Text>,
                  onPending: (
                    <Group justify="space-between" mr="sm">
                      <Text fz="sm">Awaiting Facilitator Review</Text>
                      <IconClock size={16} />
                    </Group>
                  ),
                  onRejected: <Text fz="sm">Facilitator Rejected</Text>,
                  onCompleted: <Text fz="sm">Facilitator Approved</Text>,
                }
              ) || {})}
            />
            <Timeline.Item
              h={12}
              w="100%"
              {...(getTimelineContents(
                currentStage,
                GrantStatus.MilestonesProposed,
                GrantStatus.MilestonesRejected,
                GrantStatus.MilestonesApproved,
                3,
                theme,
                {
                  onNotStarted: <Text fz="sm">Milestones Planning</Text>,
                  onPending: <Text fz="sm">Milestones Pending</Text>,
                  onRejected: <Text fz="sm">Milestones Rejected</Text>,
                  onCompleted: <Text fz="sm">Milestones Approved</Text>,
                }
              ) || {})}
            />
            <Timeline.Item
              h={12}
              w="100%"
              {...(getTimelineContents(
                currentStage,
                GrantStatus.MilestoneSubmitted,
                GrantStatus.MilestoneRejected,
                GrantStatus.MilestoneApproved,
                4,
                theme,
                {
                  onNotStarted: <Text fz="sm">Milestone Process</Text>,
                  onPending: <Text fz="sm">Milestone Pending</Text>,
                  onRejected: <Text fz="sm">Milestone Rejected</Text>,
                  onCompleted: <Text fz="sm">Milestone Approved</Text>,
                }
              ) || {})}
            />
            <Timeline.Item
              h={12}
              w="100%"
              bullet={
                currentStage === GrantStatus.Completed ? (
                  <IconCheck />
                ) : (
                  <Text fz="xs" opacity={0.75}>
                    5
                  </Text>
                )
              }
              color={
                currentStage === GrantStatus.Completed
                  ? theme.colors.blue[6]
                  : theme.colors.dark[5]
              }
            >
              <Text fz="sm">Grant Complete</Text>
            </Timeline.Item>
          </Timeline>
        </Box>
      </Flex>
    </Paper>
  );
};
