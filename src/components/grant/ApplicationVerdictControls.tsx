import { useInputState } from '@mantine/hooks';
import { useGrant } from '../../hooks/useGrant';
import { useState } from 'react';
import { useTx } from '../../hooks/useTx';
import { notifications } from '@mantine/notifications';
import { reasonSchema } from '../../utils/ipfs/metadataValidation';
import { pinJSONToIPFS } from '../../utils/ipfs/pin';
import { Tag } from '../../constants/tags';
import GrantShipAbi from '../../abi/GrantShip.json';
import { Address } from 'viem';
import { ZER0_ADDRESS } from '../../constants/gameSetup';
import { Box, Group, Textarea, useMantineTheme } from '@mantine/core';
import { GameStatus } from '../../types/common';
import { TxButton } from '../TxButton';

export const ApplicationVerdictControls = () => {
  const { ship, project, refetchGrant } = useGrant();
  const [reason, setReason] = useInputState('');
  const [isLoading, setIsLoading] = useState(false);
  const { tx } = useTx();
  const theme = useMantineTheme();

  const handleApprove = async (isApproved: boolean) => {
    try {
      setIsLoading(true);
      if (!ship || !ship.shipContractAddress) {
        notifications.show({
          title: 'Error',
          message: 'Ship not found',
          color: 'red',
        });
        setIsLoading(false);
        return;
      }

      if (!project) {
        notifications.show({
          title: 'Error',
          message: 'Project not found',
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

      const TAG = `${Tag.ShipReviewGrant}:${project.id}:${isApproved ? GameStatus.Accepted : GameStatus.Rejected}`;

      tx({
        writeContractParams: {
          abi: GrantShipAbi,
          address: ship.shipContractAddress as Address,
          functionName: 'postUpdate',
          args: [TAG, [1n, pinRes.IpfsHash], ZER0_ADDRESS],
        },
        writeContractOptions: {
          onPollSuccess() {
            refetchGrant();
            setIsLoading(false);
          },
          onError() {
            setIsLoading(false);
          },
          onPollTimeout() {
            setIsLoading(false);
          },
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
        <TxButton
          variant="danger-light"
          disabled={isLoading || !reason}
          onClick={() => handleApprove(false)}
        >
          Not Approve
        </TxButton>
        <TxButton
          disabled={isLoading || !reason}
          onClick={() => handleApprove(true)}
        >
          Approve
        </TxButton>
      </Group>
    </Box>
  );
};
