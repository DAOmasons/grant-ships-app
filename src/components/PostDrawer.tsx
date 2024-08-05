import { Group } from '@mantine/core';
import { Content, useEditor } from '@tiptap/react';
import { useLocation, useNavigate } from 'react-router-dom';

import StarterKit from '@tiptap/starter-kit';
import { Link } from '@mantine/tiptap';
import { IconPlus } from '@tabler/icons-react';
import { Image } from '@tiptap/extension-image';
import { useEffect } from 'react';
import { Player } from '../types/ui';
import { useTx } from '../hooks/useTx';
import AlloPoster from '../abi/AlloPoster.json';
import { ADDR } from '../constants/addresses';
import { pinJSONToIPFS } from '../utils/ipfs/pin';
import { notifications } from '@mantine/notifications';
import { TxButton } from './TxButton';
import { PlayerAvatar } from './PlayerAvatar';
import { GAME_MANAGER } from '../constants/gameSetup';
import { RTEditor } from './RTEditor';
import { PageDrawer } from './PageDrawer';

type PostDrawerProps = {
  avatarImg?: string;
  name?: string;
  posterType: Player;
  posterId: string;
  postType: string;
  refetch: () => void;
  content?: Content;
};

export const PostDrawer = ({
  avatarImg,
  name,
  postType,
  posterId,

  refetch,
  content = { type: 'doc', content: [] },
}: PostDrawerProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const editor = useEditor({
    extensions: [
      StarterKit,
      Link,
      Image.configure({ inline: true, allowBase64: true }),
    ],
    onUpdate({ editor }) {
      const newContent = editor.getJSON();
      localStorage.setItem(postId, JSON.stringify(newContent));
    },
    content,
  });
  const { tx } = useTx();

  const postId = `${postType}-${posterId}`;

  useEffect(() => {
    const draft = localStorage.getItem(postId);
    if (editor && draft) {
      editor.commands.setContent(JSON.parse(draft));
    }
  }, [postId, editor]);

  const isOpen = location.pathname.includes('post');

  const onClose = () =>
    navigate(location.pathname.replace(/\/(post(-media)?)$/, ''));

  const postContent = async () => {
    const metadata = editor?.getJSON();

    if (!metadata) {
      notifications.show({
        title: 'Error',
        message: 'No content to post',
        color: 'red',
      });
      return;
    }

    const pinRes = await pinJSONToIPFS(metadata);

    if (!pinRes.IpfsHash) {
      notifications.show({
        title: 'Error',
        message: 'Failed to pin content to IPFS',
        color: 'red',
      });
      return;
    }

    onClose();

    // tag: TAG tells the indexer to await for instructions
    // action: PROJECT_POST action code to be executed index side
    // postId:
    // - posterId: the id of the poster, in this case it's the profileID
    /// -  GAME_MANAGER.ADDRESS ensures that this post is only available within this game scope

    const tag = `TAG:PROJECT_POST:${postId}:${GAME_MANAGER.ADDRESS}`;

    tx({
      writeContractParams: {
        abi: AlloPoster,
        address: ADDR.ALLO_POSTER,
        functionName: 'postUpdate',
        args: [tag, posterId, [1n, pinRes.IpfsHash]],
      },
      writeContractOptions: {
        onPollSuccess() {
          refetch();
          localStorage.removeItem(postId);
        },
      },
    });
  };

  return (
    <PageDrawer pageTitle="Post Update" opened={isOpen} onClose={onClose}>
      <Group mt="40" mb="lg" w="100%" justify="space-between">
        <PlayerAvatar
          playerType={Player.Project}
          imgUrl={avatarImg}
          name={name}
        />
        <Group gap="sm">
          <TxButton leftSection={<IconPlus />} onClick={postContent}>
            Post
          </TxButton>
        </Group>
      </Group>
      <RTEditor editor={editor} />
    </PageDrawer>
  );
};
