import '@mantine/core/styles.css';
import {
  Avatar,
  Button,
  Flex,
  InputLabel,
  Paper,
  Stack,
  Text,
  TextInput,
  Textarea,
} from '@mantine/core';
import { useState } from 'react';
import { pinJSONToIPFS } from './utils/ipfs/pin';
import { Layout } from './layout/Layout';
import { FormPageLayout } from './layout/FormPageLayout';
import { IconUser } from '@tabler/icons-react';

export default function App() {
  return (
    <Layout>
      <FormPageLayout title="Register Project Profile">
        <Avatar size={120} mb="lg">
          <IconUser size={80} />
        </Avatar>
        <TextInput w="100%" label="Project Name" required />
        <Textarea
          w="100%"
          label="Team Members"
          description="Paste addresses here. Must be comma separated."
        />
        <Textarea
          w="100%"
          label="Short Project Description"
          description="Max 350 characters"
          required
          autosize
          minRows={4}
        />

        <Stack w="100%" gap={14}>
          <TextInput
            w="100%"
            label="Links/Contact"
            description="Please provide at least one contact method"
            placeholder="Email"
            required
          />
          <TextInput w="100%" placeholder="Twitter" />
          <TextInput w="100%" placeholder="Github" />
          <TextInput w="100%" placeholder="Discord" />
          <TextInput w="100%" placeholder="Telegram" />
        </Stack>
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
