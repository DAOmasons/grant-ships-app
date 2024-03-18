import { Avatar, Button, Divider, Group, Textarea } from '@mantine/core';
import { useState } from 'react';

export const UpdateInput = ({
  imgUrl,
  onClick,
  disabled,
}: {
  imgUrl?: string;
  disabled?: boolean;
  onClick: (text: string) => void;
}) => {
  const [text, setText] = useState('');

  const handleSubmit = () => {
    onClick(text);
  };
  return (
    <>
      <Group align="start" mb="xs">
        <Avatar src={imgUrl} size={40} />
        <Textarea
          placeholder="Post your project update here"
          minRows={3}
          value={text}
          onChange={(event) => setText(event.currentTarget.value)}
          autosize
          style={{ flexGrow: 1 }}
        />
      </Group>
      <Group justify="end" w="100%" mb="lg">
        <Button onClick={handleSubmit} disabled={!text || disabled}>
          Post
        </Button>
      </Group>
      <Divider />
    </>
  );
};
