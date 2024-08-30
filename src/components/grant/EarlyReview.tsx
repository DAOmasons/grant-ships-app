import { notifications } from '@mantine/notifications';
import { useGrant } from '../../hooks/useGrant';
import { useTx } from '../../hooks/useTx';
import { Tag } from '../../constants/tags';
import { Button, Text, Tooltip } from '@mantine/core';
import { IconExclamationCircle, IconShieldHalf } from '@tabler/icons-react';
import ShipAbi from '../../abi/GrantShip.json';
import { useState } from 'react';
import { Address } from 'viem';
import { ZER0_ADDRESS } from '../../constants/gameSetup';

export const EarlyReviewButton = () => {
  const { tx } = useTx();
  const [isLoading, setIsLoading] = useState(false);
  const { grant, ship, project, refetchGrant } = useGrant();

  const handleRequestEarlyReview = () => {
    try {
      setIsLoading(true);
      if (!ship?.shipContractAddress || !project?.id) {
        notifications.show({
          title: 'Error',
          message: 'Ship not found',
          color: 'red',
        });
        return;
      }

      const args = [
        `${Tag.RequestFacilitator}:${project?.id}`,
        [0n, 'NULL'],
        ZER0_ADDRESS,
      ];

      tx({
        writeContractParams: {
          abi: ShipAbi,
          functionName: 'postUpdate',
          address: ship?.shipContractAddress as Address,
          args,
        },
        writeContractOptions: {
          onPollSuccess() {
            refetchGrant();
            setIsLoading(false);
          },
          onError() {
            setIsLoading(false);
          },
          onPollError() {
            setIsLoading(false);
          },
        },
      });
    } catch (error) {
      console.error(error);
      setIsLoading(false);
      notifications.show({
        title: 'Error',
        message: 'Failed to request early review',
        color: 'red',
      });
    }
  };

  return (
    <Button
      variant="menu"
      leftSection={<IconShieldHalf />}
      rightSection={
        <Tooltip label="Requests an early review from facilitators">
          <IconExclamationCircle size={14} />
        </Tooltip>
      }
      loading={isLoading}
      disabled={grant?.requestingEarlyReview}
      onClick={handleRequestEarlyReview}
    >
      <Text>Early Review</Text>
    </Button>
  );
};
