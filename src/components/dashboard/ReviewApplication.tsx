import { useDisclosure } from '@mantine/hooks';
import { useState } from 'react';
import { ReviewPage } from '../../layout/ReviewPage';
import { formatEther, isAddress } from 'viem';
import GrantShipAbi from '../../abi/GrantShip.json';
import { notifications } from '@mantine/notifications';
import { useAccount } from 'wagmi';

import {
  Button,
  Flex,
  Group,
  Modal,
  Text,
  Textarea,
  useMantineTheme,
} from '@mantine/core';
import { GrantStatus } from '../../types/common';
import { useTx } from '../../hooks/useTx';
import { pinJSONToIPFS } from '../../utils/ipfs/pin';
import { GAME_TOKEN, ZER0_ADDRESS } from '../../constants/gameSetup';
import { secondsToLongDateTime } from '../../utils/time';
import { DashGrant } from '../../resolvers/grantResolvers';
import { AppAlert } from '../UnderContruction';
import { IconCheck, IconX } from '@tabler/icons-react';
import { TxButton } from '../TxButton';

export const ReviewApplication = ({
  grant,
  shipAddress,
  isShipOperator,
  view,
}: {
  grant: DashGrant;
  isShipOperator?: boolean;
  shipAddress: string;
  view: 'project-page' | 'ship-dash';
}) => {
  const theme = useMantineTheme();

  const [reasonText, setReasonText] = useState('');
  const [opened, { open, close }] = useDisclosure(false);
  const { address } = useAccount();
  const { tx } = useTx();

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

  return (
    <>
      <Group align="start" justify="space-between">
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
              {grant.shipApprovalReason && (
                <AppAlert
                  mt={0}
                  mb={'xl'}
                  icon={hasShipApproved ? <IconCheck /> : <IconX />}
                  title={`${hasShipApproved ? 'Approval' : 'Rejection'} from
                    Grant Ship`}
                  description={`"${grant.shipApprovalReason}"`}
                  bg={
                    hasShipApproved ? theme.colors.blue[8] : theme.colors.red[6]
                  }
                />
              )}
              {grant.facilitatorReason && (
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
                        disabled={!reasonText}
                        onClick={() => handleApprove(true)}
                      >
                        Approve
                      </TxButton>
                    </Flex>
                  </>
                )}
            </>
          }
        />
      </Modal>
    </>
  );
};
