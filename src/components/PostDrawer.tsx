import {
  Avatar,
  Box,
  Button,
  Drawer,
  Flex,
  Group,
  Text,
  useMantineTheme,
} from '@mantine/core';
import { Editor, useEditor } from '@tiptap/react';
import { useLocation, useNavigate } from 'react-router-dom';

import StarterKit from '@tiptap/starter-kit';
import { RichTextEditor, Link } from '@mantine/tiptap';
import { PageTitle } from '../layout/Sections';
import { IconHeading, IconPlus } from '@tabler/icons-react';
import { Image } from '@tiptap/extension-image';
import { ImageControl } from './RTEditor/ImageControl';
import { ProjectBadge } from './RoleBadges';
import { useEffect } from 'react';
import { Player } from '../types/ui';
import { useTx } from '../hooks/useTx';
import AlloPoster from '../abi/AlloPoster.json';
import { ADDR } from '../constants/addresses';
import { pinJSONToIPFS } from '../utils/ipfs/pin';
import { notifications } from '@mantine/notifications';
import { TxButton } from './TxButton';

type PostDrawerProps = {
  avatarImg?: string;
  name?: string;
  posterType: Player;
  posterId: string;
  postType: string;
  postIndex: number;
  refetch: () => void;
};

export const PostDrawer = ({
  avatarImg,
  name,
  postType,
  posterId,
  postIndex,
  refetch,
}: PostDrawerProps) => {
  const theme = useMantineTheme();
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
    content: { type: 'doc', content: [] },
  });
  const { tx } = useTx();

  const postId = `${postType}-${posterId}-${postIndex}`;

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

    tx({
      writeContractParams: {
        abi: AlloPoster,
        address: ADDR.ALLO_POSTER,
        functionName: 'postUpdate',
        args: [postId, posterId, [1n, metadata]],
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
    <Drawer.Root opened={isOpen} size={720} onClose={onClose} position="right">
      <Drawer.Overlay />
      <Drawer.Content bg={theme.colors.dark[6]}>
        <Flex w="100%" justify={'center'}>
          <Box mt="xl" w="600px">
            <PageTitle title="Post Update" />
            <Group mt="40" mb="lg" w="100%" justify="space-between">
              <Group gap="sm">
                <Avatar src={avatarImg} alt={name} size={40} />
                <Text fw={600}>{name}</Text>
                <ProjectBadge size={18} />
              </Group>
              <Group gap="sm">
                <TxButton leftSection={<IconPlus />} onClick={postContent}>
                  Post
                </TxButton>
              </Group>
            </Group>
            <RTEditor editor={editor} />
          </Box>
        </Flex>
      </Drawer.Content>
    </Drawer.Root>
  );
};

const RTEditor = ({ editor }: { editor: Editor | null }) => {
  const theme = useMantineTheme();

  return (
    <RichTextEditor
      editor={editor}
      mih="70vh"
      h="100%"
      bg={theme.colors.dark[6]}
    >
      <RichTextEditor.Toolbar bg={theme.colors.dark[6]}>
        <RichTextEditor.ControlsGroup style={{ border: 'none' }}>
          <RichTextEditor.H3 icon={IconHeading} h={'2rem'} w="2rem" />
          <RichTextEditor.Bold h={'2rem'} w="2rem" />
          <RichTextEditor.Italic h={'2rem'} w="2rem" />
          <RichTextEditor.Strikethrough h={'2rem'} w="2rem" />
        </RichTextEditor.ControlsGroup>
        <RichTextEditor.ControlsGroup>
          <RichTextEditor.BulletList h={'2rem'} w="2rem" />
          <RichTextEditor.OrderedList h={'2rem'} w="2rem" />
          <RichTextEditor.Code h={'2rem'} w="2rem" />
        </RichTextEditor.ControlsGroup>
        <RichTextEditor.ControlsGroup>
          <RichTextEditor.Link h={'2rem'} w="2rem" />
          <ImageControl />
        </RichTextEditor.ControlsGroup>
      </RichTextEditor.Toolbar>
      <RichTextEditor.Content fz="sm" bg={theme.colors.dark[6]} h="100%" />
    </RichTextEditor>
  );
};
