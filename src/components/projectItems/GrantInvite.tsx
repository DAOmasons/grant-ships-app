import { ActionIcon, Tooltip } from '@mantine/core';
import { IconMail } from '@tabler/icons-react';
import { useUserData } from '../../hooks/useUserState';
import { useTx } from '../../hooks/useTx';
import { getBuiltGraphSDK } from '../../.graphclient';
import { notifications } from '@mantine/notifications';
import { Tag } from '../../constants/tags';
import { Address } from 'viem';
import ShipAbi from '../../abi/GrantShip.json';
import { ZER0_ADDRESS } from '../../constants/gameSetup';
import { useState } from 'react';

export const GrantInvite = ({
  grantShipIds,
  projectId,
}: {
  grantShipIds: string[];
  projectId: string;
}) => {
  const { userData, refetchUser } = useUserData();
  const { tx } = useTx();
  const [isLoading, setIsLoading] = useState(false);

  const alreadyHasGrant = grantShipIds.includes(userData?.shipAddress || '');

  const postInvite = async () => {
    setIsLoading(true);
    if (!userData?.shipAddress) {
      notifications.show({
        title: 'Error',
        message: 'Please connect your wallet',
        color: 'red',
      });
      setIsLoading(false);
      return;
    }

    if (!projectId) {
      notifications.show({
        title: 'Error',
        message: 'No project found',
        color: 'red',
      });
      setIsLoading(false);
      return;
    }

    const { getShipAddressById } = getBuiltGraphSDK();
    const res = await getShipAddressById({ shipId: userData.shipAddress });

    const shipContractAddress = res.GrantShip_by_pk?.shipContractAddress;

    if (!shipContractAddress) {
      notifications.show({
        title: 'Error',
        message: 'No ship contract address found',
        color: 'red',
      });
      setIsLoading(false);
      return;
    }

    const FULL_TAG = `${Tag.ShipInvite}:${projectId}`;

    tx({
      writeContractParams: {
        abi: ShipAbi,
        address: shipContractAddress as Address,
        functionName: 'postUpdate',
        args: [FULL_TAG, [1n, 'NULL'], ZER0_ADDRESS],
      },
      writeContractOptions: {
        onPollSuccess() {
          refetchUser();
          setIsLoading(false);
        },
        onError() {
          setIsLoading(false);
        },
      },
    });
  };

  return (
    <Tooltip
      label={
        alreadyHasGrant
          ? 'You are already working with this project on a grant'
          : 'Send grant invitation'
      }
      position="bottom"
    >
      <ActionIcon
        size="lg"
        radius={100}
        disabled={alreadyHasGrant}
        loading={isLoading}
        onClick={postInvite}
      >
        <IconMail size={20} />
      </ActionIcon>
    </Tooltip>
  );
};
