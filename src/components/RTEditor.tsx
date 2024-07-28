import { RichTextEditor } from '@mantine/tiptap';
import classes from '../styles/tiptap.module.css';
import { Editor } from '@tiptap/react';
import { IconHeading } from '@tabler/icons-react';
import { ImageControl } from './RTEditor/ImageControl';

export const RTEditor = ({ editor }: { editor: Editor | null }) => {
  return (
    <RichTextEditor
      editor={editor}
      mih="70vh"
      h="100%"
      bg={'transparent'}
      classNames={{ root: classes.editor }}
    >
      <RichTextEditor.Toolbar bg={'transparent'}>
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
      <RichTextEditor.Content p="lg" fz="md" bg={'transparent'} h="100%" />
    </RichTextEditor>
  );
};
