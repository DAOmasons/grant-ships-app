import {
  Avatar,
  Box,
  Container,
  Drawer,
  Flex,
  Group,
  ScrollArea,
  Text,
  useMantineTheme,
} from '@mantine/core';
import { useEditor } from '@tiptap/react';
import { useLocation, useNavigate } from 'react-router-dom';

import StarterKit from '@tiptap/starter-kit';
import {
  RichTextEditor,
  useRichTextEditorContext,
  Link,
} from '@mantine/tiptap';
import { PageTitle } from '../layout/Sections';
import { IconHeading, IconPhoto } from '@tabler/icons-react';
import { Image } from '@tiptap/extension-image';
import { ImageControl } from './RTEditor/ImageControl';

type PostDrawerProps = {
  avatarImg?: string;
  name?: string;
};

export const PostDrawer = ({
  avatarImg,
  name = 'Project 576',
}: PostDrawerProps) => {
  const theme = useMantineTheme();
  const editor = useEditor({
    extensions: [
      StarterKit,
      Link,
      Image.configure({ inline: true, allowBase64: true }),
    ],
  });

  const location = useLocation();
  const navigate = useNavigate();

  const isOpen = location.pathname.includes('post');

  const onClose = () =>
    navigate(location.pathname.replace(/\/(post(-media)?)$/, ''));

  return (
    <Drawer.Root opened={isOpen} size="xl" onClose={onClose} position="right">
      <Drawer.Overlay />
      <Drawer.Content bg={theme.colors.dark[6]}>
        <Flex w="100%" justify={'center'}>
          <Box mt="xl" w="600px">
            <PageTitle title="Post Update" />
            <Group mt="40" mb="lg">
              <Avatar src={avatarImg} alt={name} size={40} />
              <Text fw={600}>{name}</Text>
            </Group>
            <RichTextEditor editor={editor} h="70vh">
              <RichTextEditor.Toolbar bg={theme.colors.dark[6]}>
                <RichTextEditor.ControlsGroup>
                  <RichTextEditor.H3 icon={IconHeading} />
                  <RichTextEditor.Bold />
                  <RichTextEditor.Italic />
                </RichTextEditor.ControlsGroup>
                <RichTextEditor.ControlsGroup>
                  <RichTextEditor.BulletList />
                  <RichTextEditor.OrderedList />
                </RichTextEditor.ControlsGroup>
                <RichTextEditor.ControlsGroup>
                  <RichTextEditor.Link />
                  <ImageControl />
                </RichTextEditor.ControlsGroup>
              </RichTextEditor.Toolbar>

              <RichTextEditor.Content bg={theme.colors.dark[6]} h="100%" />
            </RichTextEditor>
            {/* <RegisterProject
            existingProject={project}
            refetchOnEdit={refetchProject}
        /> */}
          </Box>
        </Flex>
      </Drawer.Content>
    </Drawer.Root>
  );
};
