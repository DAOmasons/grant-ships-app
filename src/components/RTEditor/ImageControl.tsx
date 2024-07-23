import { Button, Popover, TextInput } from '@mantine/core';
import { useDisclosure, useInputState } from '@mantine/hooks';
import { RichTextEditor, useRichTextEditorContext } from '@mantine/tiptap';
import { IconPhoto } from '@tabler/icons-react';

export const ImageControl = () => {
  const { editor, getStyles, labels } = useRichTextEditorContext();

  const [url, setUrl] = useInputState('');
  const [opened, { close, open }] = useDisclosure();

  const handleClose = () => {
    setUrl('');
    close();
  };

  const setLink = () => {
    if (url.trim() === '') {
      return;
    }

    editor?.chain().focus().setImage({ src: url }).run();
    handleClose();
  };

  const handleInputKeydown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      setLink();
    }
  };

  return (
    <Popover
      trapFocus
      shadow="md"
      withinPortal
      opened={opened}
      onClose={handleClose}
      offset={-44}
      zIndex={10000}
    >
      <Popover.Target>
        <RichTextEditor.Control
          onClick={() => {
            open();
          }}
          title="Add Image"
        >
          <IconPhoto stroke={1.5} size={'1rem'} />
        </RichTextEditor.Control>
      </Popover.Target>
      <Popover.Dropdown {...getStyles('linkEditorDropdown')}>
        <div {...getStyles('linkEditor')}>
          <TextInput
            placeholder={labels.linkEditorInputPlaceholder}
            aria-label={labels.linkEditorInputLabel}
            type="url"
            onChange={setUrl}
            onKeyDown={handleInputKeydown}
            classNames={{ input: getStyles('linkEditorInput').className }}
          />
          <Button
            variant="default"
            onClick={setLink}
            {...getStyles('linkEditorSave')}
          >
            {labels.linkEditorSave}
          </Button>
        </div>
      </Popover.Dropdown>
    </Popover>
  );
};
