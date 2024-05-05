import { useDisclosure } from '@mantine/hooks';
import { useState } from 'react';
import { formatEther, isAddress } from 'viem';
import { notifications } from '@mantine/notifications';
import { useAccount } from 'wagmi';
import {
  ActionIcon,
  Button,
  Flex,
  Group,
  Modal,
  Text,
  Textarea,
  Tooltip,
  useMantineTheme,
} from '@mantine/core';
import {
  IconCheck,
  IconEdit,
  IconExclamationCircle,
  IconInfoCircle,
  IconX,
} from '@tabler/icons-react';

import { ReviewPage } from '../../layout/ReviewPage';
import GrantShipAbi from '../../abi/GrantShip.json';
import { GrantStatus } from '../../types/common';
import { useTx } from '../../hooks/useTx';
import { pinJSONToIPFS } from '../../utils/ipfs/pin';
import { GAME_TOKEN, ZER0_ADDRESS } from '../../constants/gameSetup';
import { secondsToLongDateTime } from '../../utils/time';
import { DashGrant } from '../../resolvers/grantResolvers';
import { AppAlert } from '../UnderContruction';
import { TxButton } from '../TxButton';
import { scanAddressLink } from '../../utils/scan';
import { useQueryClient } from '@tanstack/react-query';
import { Link } from 'react-router-dom';

export const ReviewApplication = ({
  grant,
  shipAddress,
  isShipOperator,
  isProjectMember,
  view,
}: {
  grant: DashGrant;
  isShipOperator?: boolean;
  shipAddress: string;
  view: 'project-page' | 'ship-dash';
  isProjectMember?: boolean;
}) => {
  const theme = useMantineTheme();

  const [reasonText, setReasonText] = useState('');
  const [opened, { open, close }] = useDisclosure(false);
  const { address } = useAccount();
  const { tx } = useTx();
  const queryClient = useQueryClient();

  const handleApprove = async (isApproved: boolean) => {
    if (view === 'project-page') {
      console.error('Invalid View');
      return;
    }

    close();

    if (!isAddress(shipAddress)) {
      console.error('Invalid Ship Address');
      return;
    }

    const metadata = {
      reason: reasonText,
      reviewer: address as string,
    };

    const pinRes = await pinJSONToIPFS(metadata);
    if (typeof pinRes.IpfsHash !== 'string' && pinRes.IpfsHash[0] !== 'Q') {
      notifications.show({
        title: 'IPFS Upload Error',
        message: pinRes.IpfsHash[1],
        color: 'red',
      });
      return;
    }

    const TAG = `TAG:SHIP_REVIEW_GRANT:${grant.id}:${isApproved ? 'APPROVED' : 'REJECTED'}`;

    tx({
      writeContractParams: {
        abi: GrantShipAbi,
        address: grant.shipId.shipContractAddress,
        functionName: 'postUpdate',
        args: [TAG, [1n, pinRes.IpfsHash], ZER0_ADDRESS],
      },
      onComplete() {
        queryClient.invalidateQueries({
          queryKey: [`project-grants-${grant.projectId.id}`],
        });
        queryClient.invalidateQueries({
          queryKey: [`ship-dash-${grant.shipId.id}`],
        });
      },
    });
  };

  const isProjectView = view === 'project-page';
  const isShipView = view === 'ship-dash';

  const hasShipApproved = grant.grantStatus >= GrantStatus.ShipApproved;
  const hasFacilitatorApproved =
    grant.grantStatus >= GrantStatus.FacilitatorApproved;

  const projectPageIndicator =
    grant.grantStatus === GrantStatus.Applied
      ? 'Application Submitted'
      : 'Application Reviewed';
  const shipDashIndicator =
    grant.grantStatus === GrantStatus.Applied
      ? 'Review Application'
      : 'Application Reviewed';

  const hasFunds =
    BigInt(grant.applicationData.grantAmount) <=
    BigInt(grant.shipId.totalAvailableFunds);

  const scanLink = scanAddressLink(grant.applicationData.receivingAddress);
  const canResubmit =
    grant.grantStatus <= GrantStatus.FacilitatorRejected && isProjectMember;

  return (
    <>
      <Group align="start" justify="space-between" wrap="nowrap">
        <Text fz="sm">
          {isShipView ? shipDashIndicator : null}
          {isProjectView ? projectPageIndicator : null}
        </Text>
        <Button
          size="xs"
          style={{
            transform: 'translateY(-2px)',
          }}
          onClick={open}
          variant={
            grant.grantStatus === GrantStatus.Applied && isShipView
              ? undefined
              : 'subtle'
          }
        >
          {grant.grantStatus === GrantStatus.Applied && isShipView
            ? 'Review'
            : 'View'}
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
              content: hasFunds ? (
                `${formatEther(grant.applicationData.grantAmount)} ${GAME_TOKEN.SYMBOL}`
              ) : (
                <Group gap={'xs'} align="start">
                  <Text fz="sm" c={theme.colors.red[5]}>
                    {formatEther(grant.applicationData.grantAmount)}{' '}
                    {GAME_TOKEN.SYMBOL}
                  </Text>
                  <Tooltip label="Amount requested exceeds funding available. Application cannot be approved">
                    <IconExclamationCircle
                      color={theme.colors.red[5]}
                      size={18}
                    />
                  </Tooltip>
                </Group>
              ),
            },
            {
              subtitle: 'Expected Delivery',
              content: secondsToLongDateTime(
                Number(grant.applicationData.dueDate)
              ),
            },
            {
              subtitle: 'Receiving Address',
              content: (
                <Text
                  component="a"
                  href={scanLink}
                  fz="sm"
                  rel="noopener noreferrer"
                  target="_blank"
                  td="underline"
                >
                  {grant.applicationData.receivingAddress}
                </Text>
              ),
            },
            {
              subtitle: 'Proposal Link',
              content: (
                <Text
                  component="a"
                  href={grant.applicationData.extraLink}
                  fz="sm"
                  rel="noopener noreferrer"
                  target="_blank"
                  td="underline"
                >
                  {grant.applicationData.extraLink}
                </Text>
              ),
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
                    <Text
                      component="a"
                      href={grant.applicationData.extraLink}
                      fz="sm"
                      rel="noopener noreferrer"
                      target="_blank"
                      td="underline"
                    >
                      {grant.applicationData.extraLink}
                    </Text>
                  ),
                }
              : null,
          ]}
          footerSection={
            <>
              {grant.grantStatus >= GrantStatus.ShipRejected &&
                grant.shipApprovalReason && (
                  <AppAlert
                    mt={0}
                    mb={'xl'}
                    icon={hasShipApproved ? <IconCheck /> : <IconX />}
                    title={`${hasShipApproved ? 'Approval' : 'Rejection'} from
                    ${grant.shipId.name}`}
                    description={`"${grant.shipApprovalReason}"`}
                    bg={
                      hasShipApproved
                        ? theme.colors.blue[8]
                        : theme.colors.red[6]
                    }
                  />
                )}
              {grant.grantStatus >= GrantStatus.FacilitatorRejected &&
                grant.facilitatorReason && (
                  <AppAlert
                    mt={0}
                    mb={'xl'}
                    icon={hasFacilitatorApproved ? <IconCheck /> : <IconX />}
                    title={`${hasFacilitatorApproved ? 'Approval' : 'Rejection'} from
                    Facilitators`}
                    description={`"${grant.facilitatorReason}"`}
                    bg={
                      hasFacilitatorApproved
                        ? theme.colors.blue[8]
                        : theme.colors.red[6]
                    }
                  />
                )}
              {grant.grantStatus === GrantStatus.Applied &&
                isShipOperator &&
                isShipView && (
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
                      <TxButton
                        variant="outline"
                        disabled={!reasonText}
                        onClick={() => handleApprove(false)}
                      >
                        Reject
                      </TxButton>
                      <TxButton
                        disabled={!reasonText || !hasFunds}
                        onClick={() => handleApprove(true)}
                      >
                        Approve
                      </TxButton>
                    </Flex>
                  </>
                )}
              {grant.hasResubmitted && (
                <Group mb="md" mt="md" align="start" gap={'xs'}>
                  <IconInfoCircle color={theme.colors.yellow[6]} />
                  <Text fs="italic">Application has been resubmitted</Text>
                </Group>
              )}

              {canResubmit && (
                <Group mt="xl" justify="end">
                  <Tooltip label="Resubmit Application">
                    <ActionIcon
                      variant="subtle"
                      component={Link}
                      to={`/resubmit-funding/${grant.shipId.id}/${grant.projectId.id}`}
                    >
                      <IconEdit />
                    </ActionIcon>
                  </Tooltip>
                </Group>
              )}
            </>
          }
        />
      </Modal>
    </>
  );
};
