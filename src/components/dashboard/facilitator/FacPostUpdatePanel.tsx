import React from 'react';
import { DAO_MASONS } from '../../../constants/gameSetup';
import { UpdateInput } from '../../forms/UpdateInput';
import { PINATA_GATEWAY } from '../../../utils/ipfs/get';
import { useTx } from '../../../hooks/useTx';
import GameManagerAbi from '../../../abi/GameManager.json';
import { ADDR } from '../../../constants/addresses';
import { Tag } from '../../../constants/tags';
import { notifications } from '@mantine/notifications';
import {
  ContentSchema,
  basicUpdateSchema,
} from '../../forms/validationSchemas/updateSchemas';
import { pinJSONToIPFS } from '../../../utils/ipfs/pin';

export const FacPostUpdatePanel = () => {
  const { tx } = useTx();

  const handlePostUpdate = async (text: string, clear: () => void) => {
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
        abi: GameManagerAbi,
        address: ADDR.GAME_MANAGER,
        functionName: 'postUpdate',
        args: [Tag.GameUpdate, [1n, pinRes.IpfsHash]],
      },
      onComplete() {
        clear?.();
      },
    });
  };

  return (
    <UpdateInput
      imgUrl={`${PINATA_GATEWAY}/${DAO_MASONS.AVATAR_IMG}`}
      onClick={handlePostUpdate}
    />
  );
};
