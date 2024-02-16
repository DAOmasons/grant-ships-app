import { Box, Button, Group, Paper, Tabs, Text } from '@mantine/core';
import { Feed } from '../components/feed/Feed';
import { MainSection } from '../layout/Sections';
import { FeedCardUI } from '../types/ui';
import { AppAlert } from '../components/UnderContruction';
import classes from './PageStyles.module.css';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getFeed } from '../queries/getFeed';

export const Home = () => {
  const { data: feedItems, isLoading } = useQuery({
    queryKey: ['main-feed'],
    queryFn: () => getFeed({ first: 10, skip: 0 }),
  });

  if (!feedItems) return null;

  return (
    <Box w="100%">
      <Banner />
      <MainSection>
        <Tabs defaultValue="feed">
          <Tabs.List mb={'xl'}>
            <Tabs.Tab value="feed" w="20%">
              Feed
            </Tabs.Tab>
            <Tabs.Tab value="stats" w="20%">
              Stats
            </Tabs.Tab>
          </Tabs.List>
          <Tabs.Panel value="feed">
            <Feed feed={feedItems} />
          </Tabs.Panel>
          <Tabs.Panel value="stats">
            <AppAlert
              title="This Feature is under construction."
              description="Check back soon to try it out!"
            />
          </Tabs.Panel>
        </Tabs>
      </MainSection>
    </Box>
  );
};

const Banner = () => {
  return (
    <Paper h={180} w="100%" p="xl" classNames={{ root: classes.banner }}>
      <Text fz={22} fw={700} c="white" mb="lg">
        Now Accepting Grant Ships!{' '}
        <Text fz={22} fw={700} component="span" opacity={0.7}>
          Submit your application today.{' '}
        </Text>
      </Text>
      <Group>
        <Button component={Link} to="create-ship">
          Submit Grant Ship Application
        </Button>
        <Button
          component="a"
          href="https://rules.grantships.fun/"
          variant="transparent"
          rel="noopener noreferrer"
          target="_blank"
        >
          {' '}
          What is a Grant Ship?{' '}
        </Button>
      </Group>
    </Paper>
  );
};
