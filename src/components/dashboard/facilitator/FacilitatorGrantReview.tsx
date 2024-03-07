import { useDisclosure } from '@mantine/hooks';
import { useTx } from '../../../hooks/useTx';
import { useState } from 'react';
import { AlloStatus, GrantStatus } from '../../../types/common';
import { notifications } from '@mantine/notifications';
import { pinJSONToIPFS } from '../../../utils/ipfs/pin';
import { encodeAbiParameters, formatEther, parseAbiParameters } from 'viem';
import AlloAbi from '../../../abi/Allo.json';
import { ReviewPage } from '../../../layout/ReviewPage';
import { Alert, Button, Flex, Modal, Text, Textarea } from '@mantine/core';
import { TxButton } from '../../TxButton';
import { secondsToLongDateTime } from '../../../utils/time';
import { ADDR } from '../../../constants/addresses';
import { DashGrant } from '../../../resolvers/grantResolvers';
import { GAME_TOKEN } from '../../../constants/gameSetup';

export const FacilitatorReview = ({ grant }: { grant: DashGrant }) => {
  const [opened, { open, close }] = useDisclosure(false);
  const { tx } = useTx();
  const [reasonText, setReasonText] = useState('');

  const handleApprove = async (isApproved: boolean) => {
    if (grant.grantStatus !== GrantStatus.ShipApproved) {
      return;
    }

    const poolId = grant.shipId.poolId;
    const grantAmount = grant.applicationData.grantAmount;

    if (
      isApproved === undefined ||
      !reasonText ||
      !poolId ||
      !grant.shipId.id ||
      !grantAmount
    ) {
      console.error(
        `Invalid Data for review ${isApproved} ${reasonText} ${poolId} ${isApproved} ${grantAmount}`
      );
      notifications.show({
        title: 'Error',
        message: 'Invalid Data for review',
        color: 'red',
      });

      return;
    }

    close();

    const pinRes = await pinJSONToIPFS({
      reason: reasonText,
      reviewer: grant.shipId.id,
    });

    if (typeof pinRes.IpfsHash !== 'string' && pinRes.IpfsHash[0] !== 'Q') {
      notifications.show({
        title: 'IPFS Upload Error',
        message: pinRes.IpfsHash[1],
        color: 'red',
      });
      return;
    }

    // (address recipientId, Status recipientStatus, uint256 grantAmount, Metadata memory _reason)

    const encoded = encodeAbiParameters(
      parseAbiParameters('address, uint8, uint256, (uint256, string)'),
      [
        grant.projectId.id,
        isApproved ? AlloStatus.Accepted : AlloStatus.Rejected,
        grantAmount,
        [1n, pinRes.IpfsHash],
      ]
    );

    tx({
      writeContractParams: {
        address: ADDR.ALLO,
        abi: AlloAbi,
        functionName: 'allocate',
        args: [poolId, encoded],
      },
    });
  };

  return (
    <>
      <Button size="xs" ml="auto" onClick={open}>
        Review
      </Button>
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
                <Alert mb="xl">
                  <Text mb="sm">Approval from Grant Ship</Text>
                  <Text fz="sm" opacity={0.75} fs={'italic'}>
                    "{grant.shipApprovalReason}"
                  </Text>
                </Alert>
              )}
              {grant.grantStatus === GrantStatus.ShipApproved && (
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