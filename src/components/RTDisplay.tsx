import { RichTextEditor } from '@mantine/tiptap';
import Image from '@tiptap/extension-image';
import { Content, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import classes from '../styles/tiptap.module.css';
import Link from '@tiptap/extension-link';

export const RTDisplay = ({
  content,
  minified,
}: {
  content: Content;
  minified?: boolean;
}) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Link,
      Image.configure({ inline: true, allowBase64: true }),
    ],
    editable: false,
    content: content,
  });

  return (
    <RichTextEditor
      editor={editor}
      bg={'transparent'}
      style={{ border: 'none' }}
      classNames={{
        root: classes.display,
      }}
    >
      <RichTextEditor.Content fz={minified ? 'sm' : 'md'} bg={'transparent'} />
    </RichTextEditor>
  );
};
