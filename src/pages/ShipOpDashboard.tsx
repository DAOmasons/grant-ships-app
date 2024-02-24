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
import { IconCheck, IconClock } from '@tabler/icons-react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { DashShip, getShipDash } from '../queries/getShipDash';
import { GrantStatus } from '../types/common';
import { AppAlert } from '../components/UnderContruction';
import { secondsToRelativeTime } from '../utils/time';
import { ReviewApplication } from '../components/dashboard/ReviewApplication';
import { DashGrant } from '../resolvers/grantResolvers';
import { getTimelineContents } from '../components/dashboard/grantCardUtils';

export const ShipOpDashboard = () => {
  const { id } = useParams();

  const {
    data: shipData,
    error: shipError,
    isLoading: shipLoading,
  } = useQuery({
    queryKey: [`ship-dash-${id}`],
    queryFn: () => getShipDash(id as string),
    enabled: !!id,
  });

  return (
    <MainSection>
      <PageTitle title="Ship Dashboard" />
      <Tabs defaultValue="grants">
        <Tabs.List mb="xl" grow>
          <Tabs.Tab value="grants">Grants</Tabs.Tab>
          <Tabs.Tab value="application">Ship Application</Tabs.Tab>
          <Tabs.Tab value="postUpdate">Post</Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel value="grants">
          <GrantManager
            shipData={shipData}
            shipError={shipError}
            shipLoading={shipLoading}
          />
        </Tabs.Panel>
        <Tabs.Panel value="application"> </Tabs.Panel>
        <Tabs.Panel value="postUpdate"> </Tabs.Panel>
      </Tabs>
    </MainSection>
  );
};

export const GrantManager = ({
  shipData,
  shipError,
  shipLoading,
}: {
  shipData?: DashShip;
  shipError: Error | null;
  shipLoading: boolean;
}) => {
  const theme = useMantineTheme();

  if (shipLoading)
    return (
      <Stack gap={'lg'}>
        <Skeleton w={'100%'} h={228} />
        <Skeleton w={'100%'} h={228} />
        <Skeleton w={'100%'} h={228} />
        <Skeleton w={'100%'} h={228} />
      </Stack>
    );

  if (shipError)
    return (
      <AppAlert
        title="Error"
        color={theme.colors.pink[6]}
        description={shipError.message || 'Error loading ship data'}
      />
    );

  if (!shipData)
    return (
      <AppAlert
        title={'Ship Not Found'}
        description={'The ship you are looking for does not exist.'}
      />
    );

  if (shipData.grants.length === 0)
    return (
      <AppAlert
        title={'No Grants'}
        description={'There are no grants for this ship.'}
      />
    );

  return (
    <Stack gap={'lg'}>
      {shipData?.grants.map((grant) => (
        <GrantCard
          key={grant.id}
          currentStage={grant.grantStatus}
          grant={grant}
          ship={shipData}
        />
      ))}
    </Stack>
  );
};

const GrantCard = ({
  currentStage,
  grant,
  ship,
}: {
  currentStage: GrantStatus;
  grant: DashGrant;
  ship: DashShip;
}) => {
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
                      shipAddress={ship.shipContractAddress}
                    />
                  ),
                  onRejected: (
                    <ReviewApplication
                      grant={grant}
                      shipAddress={ship.shipContractAddress}
                    />
                  ),
                  onCompleted: (
                    <ReviewApplication
                      grant={grant}
                      shipAddress={ship.shipContractAddress}
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
