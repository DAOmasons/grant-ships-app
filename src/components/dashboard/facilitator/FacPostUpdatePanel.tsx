import React from 'react';
import { DAO_MASONS } from '../../../constants/gameSetup';
import { UpdateInput } from '../../forms/UpdateInput';
import { PINATA_GATEWAY, getGatewayUrl } from '../../../utils/ipfs/get';
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
import { Group } from '@mantine/core';
import { PlayerAvatar } from '../../PlayerAvatar';
import { Player } from '../../../types/ui';
import { TxButton } from '../../TxButton';
import { IconPlus } from '@tabler/icons-react';
import { RTEditor } from '../../RTEditor';
import { useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import { tiptapContentSchema } from '../../forms/validationSchemas/tiptap';
import { useGameManager } from '../../../hooks/useGameMangers';

const defaultContent = { type: 'doc', content: [] };
export const FacPostUpdatePanel = () => {
  const { tx } = useTx();
  const { refetchGameManager } = useGameManager();

  const editor = useEditor({
    extensions: [
      StarterKit,
      Link,
      Image.configure({ inline: true, allowBase64: true }),
    ],

    content: defaultContent,
  });

  const handlePostUpdate = async () => {
    const metadata = tiptapContentSchema.safeParse(editor?.getJSON());

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
        refetchGameManager();
      },
    });
  };

  return (
    <>
      <Group mt="40" mb="lg" w="100%" justify="space-between">
        <PlayerAvatar
          playerType={Player.Facilitators}
          imgUrl={getGatewayUrl(DAO_MASONS.AVATAR_IMG)}
          name={'Facilitators'}
        />
        <Group gap="sm">
          <TxButton leftSection={<IconPlus />} onClick={handlePostUpdate}>
            Post
          </TxButton>
        </Group>
      </Group>
      <RTEditor editor={editor} />
    </>
  );
};

// <UpdateInput
//   imgUrl={`${PINATA_GATEWAY}/${DAO_MASONS.AVATAR_IMG}`}
//   onClick={handlePostUpdate}
// />
