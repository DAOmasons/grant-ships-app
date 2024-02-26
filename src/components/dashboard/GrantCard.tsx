import {
  Avatar,
  Box,
  Button,
  Flex,
  Group,
  Modal,
  Paper,
  Stack,
  Text,
  Textarea,
  Timeline,
  useMantineTheme,
} from '@mantine/core';
import { DashGrant, PackedMilestoneData } from '../../resolvers/grantResolvers';
import { AlloStatus, GrantStatus } from '../../types/common';
import { secondsToLongDate, secondsToRelativeTime } from '../../utils/time';
import { getTimelineContents } from './grantCardUtils';
import { ReviewApplication } from './ReviewApplication';
import { IconCheck, IconClock } from '@tabler/icons-react';
import { useUserData } from '../../hooks/useUserState';
import { MilestonesSubmit } from './MilestonesSubmit';
import { useQuery } from '@tanstack/react-query';
import { getIpfsJson } from '../../utils/ipfs/get';
import { ReviewPage } from '../../layout/ReviewPage';
import { useDisclosure } from '@mantine/hooks';
import { useMemo, useState } from 'react';
import { useTx } from '../../hooks/useTx';
import { isAddress } from 'viem';
import { useAccount } from 'wagmi';
import { pinJSONToIPFS } from '../../utils/ipfs/pin';
import GrantShipAbi from '../../abi/GrantShip.json';
import { notifications } from '@mantine/notifications';

export const GrantCard = ({
  grant,
  view,
}: {
  grant: DashGrant;
  view: 'project-page' | 'ship-dash';
}) => {
  const { userData } = useUserData();
  const theme = useMantineTheme();

  const currentStage = grant.grantStatus;
  const shipAddress = grant.shipId.id;

  const isShipDash = view === 'ship-dash';
  const isProjectPage = view === 'project-page';

  const isShipOperator =
    userData && userData.isShipOperator && userData.shipAddress === shipAddress;

  return (
    <Paper bg={theme.colors.dark[6]} mih={220} w="100%" p="lg">
      <Flex>
        <Box w="100%">
          {isShipDash && (
            <Group wrap="nowrap" mr="sm">
              <Avatar size={66} src={grant?.projectMetadata?.imgUrl} />
              <Box>
                <Text fw={600} lineClamp={1}>
                  {grant.projectId.name}
                </Text>
                <Text fz="sm">
                  Last Updated {secondsToRelativeTime(grant.lastUpdated)}
                </Text>
              </Box>
            </Group>
          )}
          {isProjectPage && (
            <Group wrap="nowrap" mr="sm">
              <Avatar size={44} src={grant?.shipMetadata?.imgUrl} />
              <Box>
                <Text fw={600} lineClamp={1}>
                  {grant.shipId.name}
                </Text>
                <Text fz="sm">
                  Last Updated {secondsToRelativeTime(grant.lastUpdated)}
                </Text>
              </Box>
            </Group>
          )}
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
                      view={view}
                      grant={grant}
                      shipAddress={shipAddress}
                      isShipOperator={isShipOperator}
                    />
                  ),
                  onRejected: (
                    <ReviewApplication
                      view={view}
                      grant={grant}
                      shipAddress={shipAddress}
                      isShipOperator={isShipOperator}
                    />
                  ),
                  onCompleted: (
                    <ReviewApplication
                      view={view}
                      grant={grant}
                      shipAddress={shipAddress}
                      isShipOperator={isShipOperator}
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
                  onNotStarted: (
                    <MilestonesSubmit
                      view={view}
                      isProjectMember={true}
                      grant={grant}
                      isShipOperator={isShipOperator}
                    />
                  ),
                  onPending: <MilestonesReview grant={grant} />,
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

const resolveMilestone = async (milestone: PackedMilestoneData) => {
  const res = await getIpfsJson(milestone.metadata.pointer);

  return {
    ...res,
    milestoneDetails: res?.milestoneDetails || null,
    date: res?.date || null,
  };
};

const unpackMilestones = async (milestones: PackedMilestoneData[]) => {
  const unpackedMilestones = await Promise.all(
    milestones.map((milestone) => resolveMilestone(milestone))
  );
  return unpackedMilestones;
};

export const MilestonesReview = ({ grant }: { grant: DashGrant }) => {
  const [opened, { open, close }] = useDisclosure(false);
  const { address } = useAccount();
  const [reasonText, setReasonText] = useState('');

  const { tx } = useTx();

  const {
    data: milestones,
    isLoading,
    error,
  } = useQuery({
    queryKey: [`grant-${grant.id}-milestones`],
    queryFn: () => unpackMilestones(grant.milestones as PackedMilestoneData[]),
    enabled: !!grant.milestones && opened,
  });

  const reviewMilestones = async (isApproved: boolean) => {
    if (!isAddress(grant.shipId.shipContractAddress)) {
      console.error('Invalid Ship Address');
      return;
    }

    const pinRes = await pinJSONToIPFS({
      reason: reasonText,
      reviewer: address as string,
    });

    if (typeof pinRes.IpfsHash !== 'string' && pinRes.IpfsHash[0] !== 'Q') {
      notifications.show({
        title: 'IPFS Upload Error',
        message: pinRes.IpfsHash[1],
        color: 'red',
      });
      return;
    }

    // reviewSetMilestones(address _recipientId, Status _status, Metadata calldata _reason)
    tx({
      writeContractParams: {
        abi: GrantShipAbi,
        address: grant.shipId.shipContractAddress,
        functionName: 'reviewSetMilestones',
        args: [
          grant.projectId.id,
          isApproved ? AlloStatus.Accepted : AlloStatus.Rejected,
          [1n, pinRes.IpfsHash],
        ],
      },
    });
  };

  const pageUI = useMemo(() => {
    if (isLoading) {
      return <Text>Loading...</Text>;
    }

    if (error) {
      return <Text>Error</Text>;
    }

    if (!milestones) {
      return <Text>No milestones</Text>;
    }

    return (
      <ReviewPage
        title="Grant Milestones"
        sections={[
          'DIVIDER',
          ...milestones.map((milestone, index) => {
            return {
              subtitle: `Milestone ${index + 1}`,
              content: (
                <Stack gap="xs">
                  <Text>{milestone.milestoneDetails}</Text>
                  {milestone.date && (
                    <Text>{secondsToLongDate(milestone.date)}</Text>
                  )}
                </Stack>
              ),
            };
          }),
        ]}
        footerSection={
          <>
            <Text mb="md" fw={600}>
              Approve or Reject Milestones
            </Text>
            <Textarea
              label="Reasoning"
              description="Why are you approving or rejecting these Milestones?"
              value={reasonText}
              onChange={(e) => setReasonText(e.currentTarget.value)}
              autosize
              fw={400}
              required
              minRows={4}
              maxRows={8}
              mb="xl"
            />
            <Flex justify="space-between">
              <Button
                size="sm"
                variant="light"
                onClick={() => reviewMilestones(false)}
              >
                Reject
              </Button>
              <Button size="sm" onClick={() => reviewMilestones(true)}>
                Approve
              </Button>
            </Flex>
          </>
        }
      />
    );
  }, [milestones, isLoading, error, reasonText, close]);

  return (
    <>
      <Group justify="space-between" align="start">
        <Text fz="sm">Awaiting Milestones</Text>
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
        {pageUI}
      </Modal>
    </>
  );
};
