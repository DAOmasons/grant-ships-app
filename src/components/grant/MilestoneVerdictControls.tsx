import { Box, Button, Group, Textarea } from '@mantine/core';
import { useInputState } from '@mantine/hooks';
import React, { useState } from 'react';
import { useTx } from '../../hooks/useTx';
import { useGrant } from '../../hooks/useGrant';
import { notifications } from '@mantine/notifications';
import { reasonSchema } from '../../utils/ipfs/metadataValidation';
import { pinJSONToIPFS } from '../../utils/ipfs/pin';
import GrantShipAbi from '../../abi/GrantShip.json';
import { Address } from 'viem';
import { AlloStatus } from '../../types/common';

export const MilestoneVerdictControls = () => {
  const [reason, setReason] = useInputState('');
  const [isLoading, setIsLoading] = useState(false);
  const { ship, project } = useGrant();
  const { tx } = useTx();

  const handleApprove = async (isApproved: boolean) => {
    try {
      setIsLoading(true);
      if (!ship || !ship.shipContractAddress || !project) {
        notifications.show({
          title: 'Error',
          message: 'Ship or project not found',
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
          functionName: 'reviewSetMilestones',
          args: [
            project.id,
            isApproved ? AlloStatus.Accepted : AlloStatus.Rejected,
            [1n, pinRes.IpfsHash],
          ],
        },
      });
    } catch (error) {
      console.error(error);
      notifications.show({
        title: 'Error',
        message: 'Failed to approve grant',
        color: 'red',
      });
      setIsLoading(false);
    }
  };

  return (
    <Box mt="sm">
      <Textarea
        value={reason}
        onChange={setReason}
        label="Reason"
        placeholder="Provide constructive feedback and reasoning for your decision."
        minRows={3}
        autosize
        required
        mb="lg"
      />
      <Group justify="flex-end">
        <Button
          variant="secondary"
          disabled={isLoading || !reason}
          onClick={() => handleApprove(false)}
        >
          Not Approve
        </Button>
        <Button
          variant="primary"
          disabled={isLoading || !reason}
          onClick={() => handleApprove(true)}
        >
          Approve
        </Button>
      </Group>
    </Box>
  );
};
