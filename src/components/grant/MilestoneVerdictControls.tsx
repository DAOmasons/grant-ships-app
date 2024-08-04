import { Box, Group, Textarea } from '@mantine/core';
import { useInputState } from '@mantine/hooks';
import { useState } from 'react';
import { TxButton } from '../TxButton';
import { useTx } from '../../hooks/useTx';
import { useGrant } from '../../hooks/useGrant';
import { notifications } from '@mantine/notifications';
import { reasonSchema } from '../../utils/ipfs/metadataValidation';
import { pinJSONToIPFS } from '../../utils/ipfs/pin';
import GrantShipAbi from '../../abi/GrantShip.json';
import AlloAbi from '../../abi/Allo.json';
import { Address, encodeAbiParameters, parseAbiParameters } from 'viem';
import { ADDR } from '../../constants/addresses';

export const MilestoneVerdictControls = ({
  milestoneId,
}: {
  milestoneId: string;
}) => {
  const [reason, setReason] = useInputState('');
  const [isLoading, setIsLoading] = useState(false);
  const { ship, project, refetchGrant } = useGrant();
  const { tx } = useTx();

  const handleReject = async () => {
    setIsLoading(true);
    if (!ship || !project) {
      notifications.show({
        title: 'Error',
        message: 'Ship or project not found',
        color: 'red',
      });
      setIsLoading(false);
      return;
    }

    if (!reason) {
      notifications.show({
        title: 'Error',
        message: 'Please provide a reason',
        color: 'red',
      });
      setIsLoading(false);
      return;
    }
    if (!milestoneId) {
      notifications.show({
        title: 'Error',
        message: 'Milestone not found',
        color: 'red',
      });
      setIsLoading(false);
      return;
    }

    const metadata = {
      reason: reason,
    };

    const parsed = reasonSchema.safeParse(metadata);

    if (!parsed.success) {
      notifications.show({
        title: 'Error',
        message: 'Invalid metadata',
        color: 'red',
      });
      setIsLoading(false);
      return;
    }

    const pinRes = await pinJSONToIPFS(parsed.data);

    if (typeof pinRes.IpfsHash !== 'string' && pinRes.IpfsHash[0] !== 'Q') {
      notifications.show({
        title: 'IPFS Upload Error',
        message: pinRes.IpfsHash[1],
        color: 'red',
      });
      setIsLoading(false);
      return;
    }

    tx({
      writeContractParams: {
        abi: GrantShipAbi,
        address: ship.shipContractAddress as Address,
        functionName: 'rejectMilestone',
        args: [project.id, milestoneId, [1n, pinRes.IpfsHash]],
      },
      onComplete() {
        refetchGrant();
        setIsLoading(false);
      },
      onError() {
        setIsLoading(false);
      },
    });
  };

  const handleApprove = async () => {
    setIsLoading(true);
    if (!ship || !project) {
      notifications.show({
        title: 'Error',
        message: 'Ship or project not found',
        color: 'red',
      });
      setIsLoading(false);
      return;
    }
    if (!milestoneId) {
      notifications.show({
        title: 'Error',
        message: 'Milestone not found',
        color: 'red',
      });
      setIsLoading(false);
      return;
    }

    const encoded = encodeAbiParameters(parseAbiParameters('uint256[]'), [
      [BigInt(milestoneId)],
    ]);

    tx({
      writeContractParams: {
        abi: AlloAbi,
        address: ADDR.ALLO,
        functionName: 'distribute',
        args: [ship.poolId, [project.id], encoded],
      },
      writeContractOptions: {
        onPollSuccess() {
          refetchGrant();
          setIsLoading(false);
        },
        onError() {
          setIsLoading(false);
        },
      },
    });
  };

  return (
    <Box mt="sm">
      <Textarea
        value={reason}
        onChange={setReason}
        description={'Reason is only visible for milestone rejection'}
        minRows={3}
        label="Reason"
        placeholder="Provide constructive feedback and reasoning for your decision."
        autosize
        required
        mb="lg"
      />
      <Group justify="flex-end">
        <TxButton
          variant="danger-light"
          disabled={!reason || isLoading}
          onClick={handleReject}
        >
          Not Approve
        </TxButton>
        <TxButton
          variant="success"
          disabled={isLoading}
          onClick={handleApprove}
        >
          Approve
        </TxButton>
      </Group>
    </Box>
  );
};
