import {
  Box,
  Button,
  Divider,
  Flex,
  Skeleton,
  Stack,
  Text,
  Textarea,
  Timeline,
  useMantineTheme,
} from '@mantine/core';
import { secondsToLongDate } from '../../utils/time';
import { ReviewPage } from '../../layout/ReviewPage';
import { DashGrant, PackedMilestoneData } from '../../resolvers/grantResolvers';
import { useQuery } from '@tanstack/react-query';
import { useAccount } from 'wagmi';
import { useTx } from '../../hooks/useTx';
import { useState } from 'react';
import { formatEther, isAddress } from 'viem';
import { pinJSONToIPFS } from '../../utils/ipfs/pin';
import { notifications } from '@mantine/notifications';
import { AlloStatus, GrantStatus } from '../../types/common';
import { AppAlert } from '../UnderContruction';
import GrantShipAbi from '../../abi/GrantShip.json';
import { getIpfsJson } from '../../utils/ipfs/get';
import { IconCheck, IconEye, IconThumbUp } from '@tabler/icons-react';
import { IconX } from '@tabler/icons-react';
import { GAME_TOKEN } from '../../constants/gameSetup';

type UnpackedMilestoneData = PackedMilestoneData & {
  milestoneDetails: string | null;
  date: number | null;
};

const resolveMilestoneMetadata = async (milestone: PackedMilestoneData) => {
  const res = await getIpfsJson(milestone.metadata.pointer);

  return {
    ...milestone,
    milestoneDetails: res?.milestoneDetails || null,
    date: res?.date || null,
  };
};

const unpackMilestones = async (milestones: PackedMilestoneData[]) => {
  const unpackedMilestones = await Promise.all(
    milestones.map((milestone) => resolveMilestoneMetadata(milestone))
  );
  return unpackedMilestones;
};

export const MilestoneReviewPage = ({
  grant,
  opened,
  isShipOperator,
  isProjectMember,
  handleClose,
  view,
}: {
  view: 'project-page' | 'ship-dash';
  grant: DashGrant;
  opened: boolean;
  isShipOperator?: boolean;
  isProjectMember?: boolean;
  handleClose: () => void;
}) => {
  const {
    data: milestones,
    isLoading,
    error,
  } = useQuery({
    queryKey: [`grant-${grant.id}-milestones`],
    queryFn: () => unpackMilestones(grant.milestones as PackedMilestoneData[]),
    enabled: !!grant.milestones && opened,
  });

  const { address } = useAccount();
  const { tx } = useTx();
  const theme = useMantineTheme();

  const [reasonText, setReasonText] = useState('');
  const [isPinning, setIsPinning] = useState(false);

  const reviewMilestones = async (isApproved: boolean) => {
    try {
      setIsPinning(true);
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
      setIsPinning(true);
      handleClose();
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
    } catch (error) {
      console.error(error);
      notifications.show({
        title: 'Error',
        message: 'Error submitting application',
        color: 'red',
      });
    }
  };

  if (isLoading) {
    return (
      <Stack w={600}>
        <Skeleton height={200} w="100%" />
        <Skeleton height={200} w="100%" />
        <Skeleton height={200} w="100%" />
        <Skeleton height={200} w="100%" />
      </Stack>
    );
  }

  if (error) {
    return (
      <AppAlert
        title="Error"
        description={
          error?.message || 'An error occurred while fetching milestones'
        }
      />
    );
  }

  if (!milestones) {
    return (
      <AppAlert
        title="Error"
        description={
          "No milestones found. This is likely an error with the grant's data. Please contact support."
        }
      />
    );
  }

  if (
    grant.grantStatus === GrantStatus.MilestonesRejected ||
    grant.grantStatus === GrantStatus.MilestonesApproved
  ) {
    const reasonDisplay = GrantStatus.MilestoneApproved ? (
      <AppAlert
        mt={0}
        mb={'xl'}
        icon={<IconCheck />}
        title="Milestones Approved"
        description={`"${grant.milestonesApprovedReason}"`}
        bg={theme.colors.blue[8]}
      />
    ) : (
      <AppAlert
        mt={0}
        mb={'xl'}
        icon={<IconX />}
        title="Milestones Rejected"
        description={`"${grant.milestonesApprovedReason}"`}
        bg={theme.colors.red[6]}
      />
    );

    return (
      <ReviewPage
        title="Grant Milestones"
        sections={[
          'DIVIDER',
          {
            subtitle: ' ',
            content: (
              <MilestoneTimeline
                close={handleClose}
                milestones={milestones}
                grant={grant}
                view={view}
                isShipOperator={isShipOperator}
                isProjectMember={isProjectMember}
              />
            ),
          },
        ]}
        footerSection={reasonDisplay}
      />
    );
  }

  if (
    view === 'ship-dash' &&
    isShipOperator &&
    grant.grantStatus === GrantStatus.MilestonesProposed
  ) {
    return (
      <ReviewPage
        title="Grant Milestones"
        sections={[
          'DIVIDER',
          {
            subtitle: ' ',
            content: (
              <MilestoneTimeline
                close={handleClose}
                milestones={milestones}
                grant={grant}
                view={view}
                isShipOperator={isShipOperator}
                isProjectMember={isProjectMember}
              />
            ),
          },
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
                loading={isPinning}
                onClick={() => reviewMilestones(false)}
              >
                Reject
              </Button>
              <Button
                size="sm"
                onClick={() => reviewMilestones(true)}
                loading={isPinning}
              >
                Approve
              </Button>
            </Flex>
          </>
        }
      />
    );
  }

  return (
    <ReviewPage
      title="Grant Milestones"
      sections={[
        'DIVIDER',
        {
          subtitle: ' ',
          content: (
            <MilestoneTimeline
              close={handleClose}
              milestones={milestones}
              grant={grant}
              view={view}
              isShipOperator={isShipOperator}
              isProjectMember={isProjectMember}
            />
          ),
        },
      ]}
    />
  );
};

const MilestoneTimeline = ({
  milestones,
  close,
  grant,
  view,
  isShipOperator,
  isProjectMember,
}: {
  close: () => void;
  isProjectMember?: boolean;
  isShipOperator?: boolean;
  view: 'project-page' | 'ship-dash';
  milestones: UnpackedMilestoneData[];
  grant: DashGrant;
}) => {
  const theme = useMantineTheme();
  return (
    <Timeline bulletSize={32} lineWidth={2} active={milestones?.length - 1}>
      {milestones.map((milestone, index) => {
        const milestoneStatus = milestone.milestoneStatus;
        const isCurrentMilestone =
          index === Number(grant.currentMilestoneIndex);

        return (
          <Timeline.Item
            key={`milestone-${index}`}
            bullet={
              milestoneStatus === AlloStatus.Accepted ? (
                <IconCheck />
              ) : milestoneStatus === AlloStatus.Rejected ? (
                <IconX />
              ) : milestoneStatus === AlloStatus.Pending ? (
                <IconEye />
              ) : (
                index + 1
              )
            }
            color={
              milestoneStatus === AlloStatus.Accepted
                ? theme.colors.blue[6]
                : milestoneStatus === AlloStatus.Pending
                  ? theme.colors.violet[6]
                  : milestoneStatus === AlloStatus.Rejected
                    ? theme.colors.pink[6]
                    : theme.colors.dark[5]
            }
          >
            <Text mb={2}>
              Milestone{' '}
              {milestoneStatus === AlloStatus.Accepted
                ? 'Approved'
                : milestoneStatus === AlloStatus.Rejected
                  ? 'Rejected'
                  : milestoneStatus === AlloStatus.Pending
                    ? 'In Review'
                    : index + 1}
            </Text>
            <Text mb="xs" size="xs" opacity={0.8}>
              Payment Percentage:{' '}
              {formatEther((milestone.amountPercentage || 0n) * 100n)}% (
              {formatEther(
                (grant.applicationData.grantAmount *
                  milestone.amountPercentage) /
                  1000000000000000000n
              )}{' '}
              {GAME_TOKEN.SYMBOL})
            </Text>
            {milestone.date && (
              <Text mb="xs" size="xs" opacity={0.8}>
                {secondsToLongDate(milestone.date)}
              </Text>
            )}
            <Text size="sm">{milestone.milestoneDetails}</Text>
            {isCurrentMilestone && (
              <MilestoneAction
                close={close}
                grant={grant}
                view={view}
                currentMilestone={index}
                isProjectMember={isProjectMember}
                isShipOperator={isShipOperator}
                milestone={milestone}
              />
            )}
          </Timeline.Item>
        );
      })}
    </Timeline>
  );
};

const MilestoneAction = ({
  close,
  milestone,
  view,
  isShipOperator,
  grant,
  isProjectMember,
  currentMilestone,
}: {
  close: () => void;
  isProjectMember?: boolean;
  isShipOperator?: boolean;
  currentMilestone: number;
  view: 'project-page' | 'ship-dash';
  grant: DashGrant;
  milestone: UnpackedMilestoneData;
}) => {
  const canSubmitMilestone =
    isProjectMember &&
    view === 'project-page' &&
    milestone.milestoneStatus === AlloStatus.None;

  const canReviewMilestone =
    isShipOperator &&
    view === 'ship-dash' &&
    milestone.milestoneStatus === AlloStatus.Pending;

  const canResubmitMilestone =
    isProjectMember &&
    view === 'project-page' &&
    milestone.milestoneStatus === AlloStatus.Rejected;

  if (canSubmitMilestone) {
    return (
      <SubmitMilestone
        grant={grant}
        milestone={milestone}
        currentMilestone={currentMilestone}
        isProjectMember={isProjectMember}
        close={close}
      />
    );
  }

  if (canResubmitMilestone) {
    return (
      <SubmitMilestone
        grant={grant}
        isResubmitting
        milestone={milestone}
        currentMilestone={currentMilestone}
        isProjectMember={isProjectMember}
        close={close}
      />
    );
  }

  if (canReviewMilestone) {
    return (
      <ReviewMilestone
        grant={grant}
        milestone={milestone}
        currentMilestone={currentMilestone}
        isShipOperator={isShipOperator}
      />
    );
  }

  return null;
};

const ReviewMilestone = ({
  grant,
  milestone,
  currentMilestone,
  isShipOperator,
}: {
  isShipOperator?: boolean;
  grant: DashGrant;
  milestone: UnpackedMilestoneData;
  currentMilestone: number;
}) => {
  console.log('currentMilestone', currentMilestone);
  const [reasonText, setReasonText] = useState('');
  const { tx } = useTx();
  const { address } = useAccount();

  const handleApprove = () => {
    // function _distribute(address[] memory _recipientIds, bytes memory, address _sender)
  };
  const handleReject = async () => {
    // rejectMilestone(address _recipientId, uint256 _milestoneId, Metadata calldata _reason)

    if (
      !grant.shipId.shipContractAddress ||
      currentMilestone == null ||
      !grant.projectId.id
    ) {
      notifications.show({
        title: 'Error',
        message: 'Function call arguments are missing',
        color: 'red',
      });
      return;
    }

    if (!isShipOperator) {
      notifications.show({
        title: 'Error',
        message: 'You are not a ship operator',
        color: 'red',
      });
      return;
    }

    const ipfsRes = await pinJSONToIPFS({
      reason: reasonText,
      reviewer: address as string,
    });

    if (ipfsRes.IpfsHash[0] !== 'Q') {
      notifications.show({
        title: 'IPFS Error',
        message: ipfsRes.IpfsHash[1],
        color: 'red',
      });
      return;
    }

    tx({
      writeContractParams: {
        abi: GrantShipAbi,
        address: grant.shipId.shipContractAddress,
        functionName: 'rejectMilestone',
        args: [grant.projectId.id, currentMilestone, [1n, ipfsRes.IpfsHash]],
      },
    });
  };

  return (
    <Box mt="lg">
      <Divider mb="md" />
      <Textarea
        label="Rejection Reason"
        description="Only needed if rejecting this milestone"
        value={reasonText}
        onChange={(e) => setReasonText(e.currentTarget.value)}
        autosize
        fw={400}
        minRows={4}
        maxRows={8}
        mb="lg"
      />
      <Flex>
        <Button variant="light" onClick={handleReject} disabled={!reasonText}>
          Reject
        </Button>
        <Button ml="auto" onClick={handleApprove}>
          Approve
        </Button>
      </Flex>
    </Box>
  );
};

const SubmitMilestone = ({
  grant,
  milestone,
  currentMilestone,
  isProjectMember,
  isResubmitting,
  close,
}: {
  close: () => void;
  isProjectMember?: boolean;
  currentMilestone: number;
  grant: DashGrant;
  milestone: UnpackedMilestoneData;
}) => {
  const { tx } = useTx();
  const [isPinning, setPinning] = useState(false);

  const handleSubmitMilestone = async () => {
    const dateInSeconds = Date.now() / 1000;

    setPinning(true);

    if (!isProjectMember) {
      notifications.show({
        title: 'Error',
        message: 'You are not a member of this project',
        color: 'red',
      });
      return;
    }

    if (!milestone.milestoneDetails) {
      notifications.show({
        title: 'Error',
        message: 'Data is missing',
        color: 'red',
      });
      return;
    }

    if (
      !grant.projectId.id ||
      !grant.shipId.shipContractAddress ||
      currentMilestone == null
    ) {
      notifications.show({
        title: 'Error',
        message: 'Function call arguments is missing',
        color: 'red',
      });
      return;
    }

    const ipfsRes = await pinJSONToIPFS({
      milestoneDetails: milestone.milestoneDetails,
      date: milestone.date,
      lastUpdated: dateInSeconds,
    });

    if (ipfsRes.IpfsHash[0] !== 'Q') {
      notifications.show({
        title: 'IPFS Error',
        message: ipfsRes.IpfsHash[1],
        color: 'red',
      });
      return;
    }

    setPinning(false);
    close();

    tx({
      writeContractParams: {
        abi: GrantShipAbi,
        address: grant.shipId.shipContractAddress,
        functionName: 'submitMilestone',
        args: [grant.projectId.id, currentMilestone, [1n, ipfsRes.IpfsHash]],
      },
    });
  };

  return (
    <Box mt="lg">
      <Divider mb="md" />
      <Flex>
        <Button
          ml="auto"
          onClick={() => handleSubmitMilestone()}
          loading={isPinning}
        >
          {isResubmitting ? 'Resubmit milestone' : 'Submit Milestone'}
        </Button>
      </Flex>
    </Box>
  );
};
