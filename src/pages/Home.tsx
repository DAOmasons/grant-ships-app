import { Box, Button, Group, Paper, Skeleton, Tabs, Text } from '@mantine/core';
import { Feed } from '../components/feed/Feed';
import { MainSection } from '../layout/Sections';
import { AppAlert } from '../components/UnderContruction';
import classes from './PageStyles.module.css';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getFeed } from '../queries/getFeed';
import { FeedSkeletonCard } from '../components/skeletons';

export const Home = () => {
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
            <FeedPanel />
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
      <Text fz={24} fw={700} c="white">
        Now Accepting Grant Ships.{' '}
        <Text fz={24} fw={700} component="span">
          Submit your application today.{' '}
        </Text>
      </Text>
      <Group mt="md">
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

const FeedPanel = () => {
  const { data: feedItems, isLoading } = useQuery({
    queryKey: ['main-feed'],
    queryFn: () => getFeed({ first: 10, skip: 0 }),
  });

  if (isLoading)
    return (
      <>
        <FeedSkeletonCard />
        <FeedSkeletonCard />
        <FeedSkeletonCard />
        <FeedSkeletonCard />
        <FeedSkeletonCard />
        <FeedSkeletonCard />
        <FeedSkeletonCard />
      </>
    );
  if (!feedItems) return null;

  return <Feed feed={feedItems} />;
};
