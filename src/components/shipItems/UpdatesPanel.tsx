import { Box, useMantineTheme } from '@mantine/core';
import { ShipPageUI } from '../../types/ui';
import { UpdateInput } from '../forms/UpdateInput';
import { useTx } from '../../hooks/useTx';
import { notifications } from '@mantine/notifications';
import { Tag } from '../../constants/tags';
import { ZER0_ADDRESS } from '../../constants/gameSetup';
import ShipAbi from '../../abi/GrantShip.json';
import { Address } from 'viem';
import { pinJSONToIPFS } from '../../utils/ipfs/pin';
import {
  ContentSchema,
  basicUpdateSchema,
} from '../forms/validationSchemas/updateSchemas';
import { useQuery } from '@tanstack/react-query';
import { FeedSkeletonCard } from '../skeletons';
import { AppAlert } from '../UnderContruction';
import { IconX } from '@tabler/icons-react';
import { getUpdates } from '../../queries/getUpdates';
import { FeedCard } from '../feed/FeedCard';

export const UpdatesPanel = ({
  ship,
  shipId,
  isShipOperator,
}: {
  shipId?: string;
  ship?: ShipPageUI;
  isShipOperator?: boolean;
}) => {
  const {
    data: posts,
    isLoading,
    error,
  } = useQuery({
    queryKey: [`ship-updates-${shipId}`],
    queryFn: () => getUpdates(shipId as string),
    enabled: !!shipId,
  });

  const theme = useMantineTheme();
  const { tx } = useTx();

  const handlePostUpdate = async (text: string) => {
    if (!ship || !ship.shipContractAddress) {
      notifications.show({
        title: 'Error',
        message: 'Ship ID is missing',
        color: 'red',
      });

      return;
    }

    if (text === '' || text === null) {
      notifications.show({
        title: 'Error',
        message: 'Update text is missing',
        color: 'red',
      });

      return;
    }

    const metadata = basicUpdateSchema.safeParse({
      text,
      contentSchema: ContentSchema.BasicUpdate,
    });

    if (!metadata.success) {
      notifications.show({
        title: 'Validation Error',
        message: "Update text doesn't match the schema",
        color: 'red',
      });

      return;
    }

    const pinRes = await pinJSONToIPFS(metadata.data);

    if (typeof pinRes.IpfsHash !== 'string' && pinRes.IpfsHash[0] !== 'Q') {
      notifications.show({
        title: 'IPFS Upload Error',
        message: pinRes.IpfsHash[1],
        color: 'red',
      });
      return;
    }

    tx({
      writeContractParams: {
        abi: ShipAbi,
        functionName: 'postUpdate',
        address: ship?.shipContractAddress as Address,
        args: [Tag.ShipPostUpdate, [1n, pinRes.IpfsHash], ZER0_ADDRESS],
      },
    });
  };

  if (isLoading) {
    return (
      <>
        <FeedSkeletonCard />
        <FeedSkeletonCard />
        <FeedSkeletonCard />
        <FeedSkeletonCard />
        <FeedSkeletonCard />
      </>
    );
  }

  if (error) {
    return (
      <AppAlert
        title="Error"
        description=""
        color={theme.colors.red[6]}
        icon={<IconX />}
      />
    );
  }

  return (
    <Box>
      {isShipOperator && (
        <UpdateInput imgUrl={ship?.imgUrl} onClick={handlePostUpdate} />
      )}
      {/* {posts?.length ? <FeedCard subject={} object={} con/>} */}
    </Box>
  );
};
