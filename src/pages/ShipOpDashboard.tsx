import {
  Avatar,
  Box,
  Button,
  Flex,
  Group,
  MantineTheme,
  Modal,
  Paper,
  Skeleton,
  Stack,
  Tabs,
  Text,
  Textarea,
  Timeline,
  useMantineTheme,
} from '@mantine/core';
import { MainSection, PageTitle } from '../layout/Sections';
import { IconCheck, IconEye, IconX } from '@tabler/icons-react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { DashShip, DashShipGrant, getShipDash } from '../queries/getShipDash';
import { GrantStatus } from '../types/common';
import { AppAlert } from '../components/UnderContruction';
import { secondsToLongDateTime, secondsToRelativeTime } from '../utils/time';
import { useDisclosure } from '@mantine/hooks';
import { ReactNode, useState } from 'react';
import { ReviewPage } from '../layout/ReviewPage';
import { formatEther } from 'viem';
import { GAME_TOKEN } from '../constants/gameSetup';

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

  console.log('shipData', shipData);

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

const getTimelineContents = (
  currentStage: GrantStatus,
  isPendingAt: GrantStatus,
  isRejected: GrantStatus,
  isCompletedAt: GrantStatus,
  uiStage: number,
  theme: MantineTheme,
  content: {
    onNotStarted?: React.ReactNode;
    onPending?: React.ReactNode;
    onRejected?: React.ReactNode;
    onCompleted?: React.ReactNode;
  }
) => {
  if (currentStage < isPendingAt) {
    return {
      bullet: (
        <Text fz="xs" opacity={0.7}>
          {uiStage}
        </Text>
      ),
      color: theme.colors.dark[5],
      children: content.onNotStarted,
    };
  }
  if (currentStage === isPendingAt) {
    return {
      bullet: <IconEye />,
      color: theme.colors.violet[6],
      children: content.onPending,
    };
  }
  if (currentStage === isRejected) {
    return {
      bullet: <IconX />,
      color: theme.colors.pink[6],
      children: content.onRejected,
    };
  }
  if (currentStage >= isCompletedAt) {
    return {
      bullet: <IconCheck />,
      color: theme.colors.blue[6],
      children: content.onCompleted,
    };
  }
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
        />
      ))}
    </Stack>
  );
};

const GrantCard = ({
  currentStage,
  grant,
}: {
  currentStage: GrantStatus;
  grant: DashShipGrant;
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
                  onPending: <ReviewApplication grant={grant} />,
                  onRejected: <Text fz="sm">Rejected Application</Text>,
                  onCompleted: <Text fz="sm">Approved Application</Text>,
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
                  onPending: <Text fz="sm">Awaiting Facilitator Review</Text>,
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

const ReviewApplication = ({ grant }: { grant: DashShipGrant }) => {
  const [reasonText, setReasonText] = useState('');
  const [opened, { open, close }] = useDisclosure(false);

  const handleApprove = (isApproved: boolean) => {};

  return (
    <>
      <Group align="start" justify="space-between">
        <Text fz="sm">Review Application </Text>
        <Button
          size="xs"
          style={{
            transform: 'translateY(-2px)',
          }}
          onClick={open}
        >
          Review
        </Button>
      </Group>
      <Modal
        opened={opened}
        onClose={close}
        fullScreen
        transitionProps={{ transition: 'fade', duration: 200 }}
      >
        <ReviewPage
          title={`Application from ${grant.projectId.name}`}
          sections={[
            {
              subtitle: 'Project Description',
              content: grant.projectMetadata.description,
            },
            'DIVIDER',
            {
              subtitle: 'The Ask',
              content: `${formatEther(grant.applicationData.grantAmount)} ${GAME_TOKEN.SYMBOL}`,
            },
            {
              subtitle: 'Expected Delivery',
              content: secondsToLongDateTime(
                Number(grant.applicationData.dueDate)
              ),
            },
            {
              subtitle: 'Receiving Address',
              content: grant.applicationData.receivingAddress,
            },
            {
              subtitle: 'Proposal Link',
              content: grant.applicationData.proposalLink,
            },
            {
              subtitle: 'Objectives',
              content: grant.applicationData.objectives,
            },
            grant.applicationData.extraInfo
              ? {
                  subtitle: 'Additional Information',
                  content: grant.applicationData.extraInfo,
                }
              : null,
            grant.applicationData.extraLink
              ? {
                  subtitle: 'Additional Link',
                  content: (
                    <Text component="a">grant.applicationData.extraLink </Text>
                  ),
                }
              : null,
          ]}
          footerSection={
            <>
              <Text mb="md" fw={600}>
                Approve or Reject Applicant
              </Text>
              <Textarea
                label="Reasoning"
                description="Why are you approving or rejecting this application?"
                value={reasonText}
                onChange={(e) => setReasonText(e.currentTarget.value)}
                autosize
                required
                minRows={4}
                maxRows={8}
                mb="xl"
              />
              <Flex justify="space-between">
                <Button
                  variant="outline"
                  disabled={!reasonText}
                  onClick={() => handleApprove(false)}
                >
                  Reject
                </Button>
                <Button
                  disabled={!reasonText}
                  onClick={() => handleApprove(true)}
                >
                  Approve
                </Button>
              </Flex>
            </>
          }
        />
      </Modal>
    </>
  );
};
