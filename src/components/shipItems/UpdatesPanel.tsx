import { Box } from '@mantine/core';
import { ShipPageUI } from '../../types/ui';
import { UpdateInput } from '../forms/UpdateInput';
import { useTx } from '../../hooks/useTx';
import { notifications } from '@mantine/notifications';
import { Tag } from '../../constants/tags';
import { ZER0_ADDRESS } from '../../constants/gameSetup';
import ShipAbi from '../../abi/GrantShip.json';
import { Address } from 'viem';
import { pinJSONToIPFS } from '../../utils/ipfs/pin';
import { ContentSchema } from '../forms/validationSchemas/updateSchemas';

export const UpdatesPanel = ({
  ship,
  isShipOperator,
}: {
  ship?: ShipPageUI;
  isShipOperator?: boolean;
}) => {
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

    const pinRes = await pinJSONToIPFS({
      text,
      contentSchema: ContentSchema.BasicUpdate,
    });

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

  return (
    <Box>
      {isShipOperator && (
        <UpdateInput imgUrl={ship?.imgUrl} onClick={handlePostUpdate} />
      )}
    </Box>
  );
};
