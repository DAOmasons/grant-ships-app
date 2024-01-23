import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import { Button, Group, Stack, TextInput, Textarea } from '@mantine/core';

import { FormPageLayout } from '../../layout/FormPageLayout';
import {
  IconBrandDiscord,
  IconBrandGithub,
  IconBrandTelegram,
  IconBrandX,
  IconMail,
} from '@tabler/icons-react';
import { AvatarPickerIPFS } from '../../components/AvatarPickerIPFS';
import { notifications } from '@mantine/notifications';
import { AddressBox } from '../../components/AddressBox';

export const RegisterProject = () => {
  return (
    <FormPageLayout title="Register Project Profile">
      <AvatarPickerIPFS
        onUploadSuccess={(hash: string) => {
          notifications.show({
            title: 'IPFS Image Uploaded',
            message: `IPFS Hash: ${hash}`,
          });
        }}
        onUploadError={(errMsg: string) => {
          notifications.show({
            title: 'IPFS Upload Error',
            message: errMsg,
            color: 'red',
          });
        }}
      />
      <TextInput
        w="100%"
        label="Project Name"
        required
        placeholder="Project Name"
      />
      <AddressBox
        w="100%"
        label="Team Members"
        description="Paste addresses here. Must be comma separated."
        placeholder="Paste here"
      />

      <Textarea
        w="100%"
        label="Short Project Description"
        description="Max 350 characters"
        required
        autosize
        minRows={4}
        placeholder="Project Description"
      />
      <Stack w="100%" gap={14}>
        <TextInput
          w="100%"
          label="Links/Contact"
          description="Email is required. Please provide at least one other contact "
          placeholder="Email"
          required
          leftSection={<IconMail />}
        />
        <TextInput w="100%" placeholder="X" leftSection={<IconBrandX />} />
        <TextInput
          w="100%"
          placeholder="Github"
          leftSection={<IconBrandGithub />}
        />
        <TextInput
          w="100%"
          placeholder="Discord"
          leftSection={<IconBrandDiscord />}
        />
        <TextInput
          w="100%"
          placeholder="Telegram"
          leftSection={<IconBrandTelegram />}
        />
      </Stack>
      <Group w="100%" mt="md" justify="flex-end">
        <Button variant="light">Back</Button>
        <Button>Register Profile</Button>
      </Group>
    </FormPageLayout>
  );
};
