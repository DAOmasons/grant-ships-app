import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import {
  ActionIcon,
  Avatar,
  Button,
  Container,
  FileButton,
  Flex,
  Group,
  Paper,
  Stack,
  Text,
  TextInput,
  Textarea,
} from '@mantine/core';
import { useState } from 'react';
import { Layout } from './layout/Layout';
import { FormPageLayout } from './layout/FormPageLayout';
import {
  IconBrandDiscord,
  IconBrandGithub,
  IconBrandTelegram,
  IconBrandX,
  IconMail,
  IconPencil,
  IconUser,
} from '@tabler/icons-react';
import { AvatarPickerIPFS } from './components/AvatarPickerIPFS';
import { notifications } from '@mantine/notifications';

export default function App() {
  return (
    <Layout>
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
        <Textarea
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
    </Layout>
  );
}

export const TestCard = ({
  title,
  description,
  onClick,
}: {
  title: string;
  description: string;
  onClick: () => any | Promise<any> | PromiseLike<any>;
}) => {
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    try {
      setLoading(true);
      await onClick();
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  return (
    <Paper p={'xl'}>
      <Text size="xl" fw={500} mb="md">
        {title}
      </Text>
      <Text>{description}</Text>
      <Flex mt="xl">
        <Button ml="auto" onClick={handleClick}>
          Test
        </Button>
      </Flex>
    </Paper>
  );
};
