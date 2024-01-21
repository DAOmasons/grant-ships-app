import '@mantine/core/styles.css';
import {
  Button,
  Container,
  Flex,
  Grid,
  MantineProvider,
  Paper,
  Stack,
  Text,
} from '@mantine/core';
import { theme } from './theme';
import { useState } from 'react';
import { ADDR } from './constants/addresses';
import { pinJSONToIPFS } from './utils/ipfs/pin';
import { DesktopNav } from './layout/DesktopNav/DesktopNav';
import { Layout } from './layout/Layout';

export default function App() {
  return (
    <Layout>
      <Stack>
        <TestCard
          title="Register GameManager Pool"
          description="This function sets up the GameManager Pool. It should be called once."
          onClick={() => {}}
        />
        <TestCard
          title="Pin Test Data"
          description="This function pins test data to IPFS."
          onClick={() => pinJSONToIPFS({})}
        />
        <TestCard
          title="Register GameManager Pool"
          description="This function sets up the GameManager Pool. It should be called once."
          onClick={() => {}}
        />
        <TestCard
          title="Pin Test Data"
          description="This function pins test data to IPFS."
          onClick={() => pinJSONToIPFS({})}
        />
        <TestCard
          title="Register GameManager Pool"
          description="This function sets up the GameManager Pool. It should be called once."
          onClick={() => {}}
        />
        <TestCard
          title="Pin Test Data"
          description="This function pins test data to IPFS."
          onClick={() => pinJSONToIPFS({})}
        />
      </Stack>
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
