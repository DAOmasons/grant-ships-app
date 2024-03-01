import { useState } from 'react';
import { DashGrant } from '../../resolvers/grantResolvers';
import { useTx } from '../../hooks/useTx';
import { useAccount } from 'wagmi';
import { notifications } from '@mantine/notifications';
import GrantShipAbi from '../../abi/GrantShip.json';
import AlloAbi from '../../abi/Allo.json';
import { pinJSONToIPFS } from '../../utils/ipfs/pin';
import { ADDR } from '../../constants/addresses';
import { Box, Button, Divider, Flex, Textarea } from '@mantine/core';

export const ReviewMilestone = ({
  grant,
  currentMilestone,
  isShipOperator,
  close,
}: {
  isShipOperator?: boolean;
  grant: DashGrant;
  currentMilestone: number;
  close: () => void;
}) => {
  const [reasonText, setReasonText] = useState('');
  const [isPinning, setIsPinning] = useState(false);

  const { tx } = useTx();
  const { address } = useAccount();

  const handleApprove = () => {
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

    close();

    tx({
      writeContractParams: {
        abi: AlloAbi,
        address: ADDR.ALLO,
        functionName: 'distribute',
        args: [grant.shipId.poolId, [grant.projectId.id], ''],
      },
    });
  };
  const handleReject = async () => {
    // rejectMilestone(address _recipientId, uint256 _milestoneId, Metadata calldata _reason)

    setIsPinning(true);

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

    close();
    setIsPinning(false);

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
        <Button
          variant="light"
          onClick={handleReject}
          disabled={!reasonText}
          loading={isPinning}
        >
          Reject
        </Button>
        <Button ml="auto" onClick={handleApprove}>
          Approve
        </Button>
      </Flex>
    </Box>
  );
};
