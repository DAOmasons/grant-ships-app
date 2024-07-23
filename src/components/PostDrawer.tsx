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
    <Drawer.Root opened={isOpen} size={720} onClose={onClose} position="right">
      <Drawer.Overlay />
      <Drawer.Content bg={theme.colors.dark[6]}>
        <Flex w="100%" justify={'center'}>
          <Box mt="xl" w="600px">
            <PageTitle title="Post Update" />
            <Group mt="40" mb="lg">
              <Avatar src={avatarImg} alt={name} size={40} />
              <Text fw={600}>{name}</Text>
            </Group>
            <RichTextEditor editor={editor} h="70vh" bg={theme.colors.dark[6]}>
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

              <RichTextEditor.Content
                fz="sm"
                bg={theme.colors.dark[6]}
                h="100%"
              />
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

const RTEditor = () => {};
