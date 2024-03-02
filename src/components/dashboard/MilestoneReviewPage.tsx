import {
  Button,
  Flex,
  Skeleton,
  Stack,
  Text,
  Textarea,
  useMantineTheme,
} from '@mantine/core';
import { ReviewPage } from '../../layout/ReviewPage';
import { DashGrant, PackedMilestoneData } from '../../resolvers/grantResolvers';
import { useQuery } from '@tanstack/react-query';
import { useAccount } from 'wagmi';
import { useTx } from '../../hooks/useTx';
import { useState } from 'react';
import { isAddress } from 'viem';
import { pinJSONToIPFS } from '../../utils/ipfs/pin';
import { notifications } from '@mantine/notifications';
import { AlloStatus, GrantStatus } from '../../types/common';
import { AppAlert } from '../UnderContruction';
import GrantShipAbi from '../../abi/GrantShip.json';
import { getIpfsJson } from '../../utils/ipfs/get';
import { IconCheck } from '@tabler/icons-react';
import { IconX } from '@tabler/icons-react';
import { MilestoneTimeline } from './MilestoneTimeline';

export type UnpackedMilestoneData = PackedMilestoneData & {
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
