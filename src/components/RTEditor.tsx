import { RichTextEditor } from '@mantine/tiptap';
import classes from '../styles/tiptap.module.css';
import { Editor } from '@tiptap/react';
import { IconHeading } from '@tabler/icons-react';
import { ImageControl } from './RTEditor/ImageControl';
import { useEffect, useRef, useState } from 'react';

export const RTEditor = ({
  editor,
  noHeading = false,
  growHeight = true,
}: {
  editor: Editor | null;
  noHeading?: boolean;
  growHeight?: boolean;
}) => {
  const editorContainerRef = useRef<HTMLDivElement | null>(null);
  const [editorHeight, setEditorHeight] = useState('auto');

  useEffect(() => {
    if (growHeight && editorContainerRef.current) {
      const containerTop =
        editorContainerRef.current.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;
      const newHeight = windowHeight - containerTop - 55; // 20px for some bottom margin
      setEditorHeight(`${newHeight}px`);
    }
  }, []);

  const handleContentEditorFocus = () => {
    if (editor && !editor.isActive('link')) {
      editor.commands.focus();
    }
  };

  return (
    <RichTextEditor
      ref={editorContainerRef}
      editor={editor}
      h={editorHeight}
      bg={'transparent'}
      classNames={{ root: classes.editor }}
    >
      <RichTextEditor.Toolbar bg={'transparent'}>
        <RichTextEditor.ControlsGroup style={{ border: 'none' }}>
          {!noHeading && (
            <RichTextEditor.H3 icon={IconHeading} h={'2rem'} w="2rem" />
          )}
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
        p="lg"
        fz="md"
        bg={'transparent'}
        mih={editorHeight}
        onClick={handleContentEditorFocus}
      />
    </RichTextEditor>
  );
};
