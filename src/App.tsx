import '@mantine/core/styles.css';
import {
  Button,
  Container,
  Flex,
  Grid,
  MantineProvider,
  Paper,
  Text,
  Title,
} from '@mantine/core';
import { theme } from './theme';
import { useState } from 'react';

export default function App() {
  return (
    <MantineProvider theme={theme} defaultColorScheme="dark">
      <Container mt="xl">
        <Title mb="xl">Test Functions</Title>
        <Grid overflow="hidden">
          <Grid.Col span={6}>
            <TestCard
              title="Register GameManager Pool"
              description="This function sets up the GameManager Pool. It should be called once."
              onClick={() => {}}
            />
          </Grid.Col>
        </Grid>
      </Container>
    </MantineProvider>
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
