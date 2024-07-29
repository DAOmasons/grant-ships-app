import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import { Content, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { useTx } from '../../hooks/useTx';
import { notifications } from '@mantine/notifications';
import { tiptapContentSchema } from '../forms/validationSchemas/tiptap';
import { pinJSONToIPFS } from '../../utils/ipfs/pin';
import ShipAbi from '../../abi/GrantShip.json';
import { Address } from 'viem';
import { Tag } from '../../constants/tags';
import { ZER0_ADDRESS } from '../../constants/gameSetup';
import { PageDrawer } from '../PageDrawer';
import { Group } from '@mantine/core';
import { PlayerAvatar } from '../PlayerAvatar';
import { Player } from '../../types/ui';
import { TxButton } from '../TxButton';
import { IconMessage } from '@tabler/icons-react';
import { RTEditor } from '../RTEditor';

export const PostGrantDrawer = ({
  opened,
  onClose,
  avatarImg,
  avatarName,
  shipSrcAddress,
  projectId,
  content,
  refetch,
  playerType,
}: {
  playerType: Player;
  shipSrcAddress: string;
  projectId: string;
  avatarImg: string;
  avatarName: string;
  opened: boolean;
  onClose: () => void;
  content?: Content;
  refetch?: () => void;
}) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Link,
      Image.configure({ inline: true, allowBase64: true }),
    ],
    content,
  });

  const { tx } = useTx();

  const handleGrantPost = async () => {
    if (!shipSrcAddress || !projectId) {
      notifications.show({
        title: 'Error',
        message: 'Ship address or project ID is missing',
        color: 'red',
      });

      return;
    }

    if (!editor) {
      notifications.show({
        title: 'Error',
        message: 'No content to post',
        color: 'red',
      });

      return;
    }

    const rtMetadata = tiptapContentSchema.safeParse(editor.getJSON());

    if (!rtMetadata.success) {
      notifications.show({
        title: 'Validation Error',
        message: "Beacon text doesn't match the schema",
        color: 'red',
      });

      return;
    }

    onClose();
    const pinRes = await pinJSONToIPFS(rtMetadata.data);

    if (typeof pinRes.IpfsHash !== 'string' && pinRes.IpfsHash[0] !== 'Q') {
      notifications.show({
        title: 'IPFS Upload Error',
        message: pinRes.IpfsHash[1],
        color: 'red',
      });
      return;
    }

    const FULL_TAG = `${Tag.ProjectGrantUpdate}:${projectId}`;

    tx({
      writeContractParams: {
        abi: ShipAbi,
        functionName: 'postUpdate',
        address: shipSrcAddress as Address,
        args: [
          FULL_TAG,
          [1n, pinRes.IpfsHash],
          playerType === Player.Project ? projectId : ZER0_ADDRESS,
        ],
      },
      writeContractOptions: {
        onPollSuccess() {
          refetch?.();
        },
      },
    });
  };

  return (
    <PageDrawer pageTitle="Post Message" opened={opened} onClose={onClose}>
      <Group mt="40" mb="lg" w="100%" justify="space-between">
        <PlayerAvatar
          playerType={playerType}
          imgUrl={avatarImg}
          name={avatarName}
        />
        <TxButton leftSection={<IconMessage />} onClick={handleGrantPost}>
          Post
        </TxButton>
      </Group>
      <RTEditor editor={editor} />
    </PageDrawer>
  );
};
