import {
  Box,
  Flex,
  Group,
  Loader,
  Tabs,
  Text,
  useMantineTheme,
} from '@mantine/core';
import { Feed } from '../components/feed/Feed';
import { MainSection } from '../layout/Sections';
import { AppAlert } from '../components/UnderContruction';
import { useInfiniteQuery } from '@tanstack/react-query';
import { getFeed } from '../queries/getFeed';
import { FeedSkeletonCard } from '../components/skeletons';
import { Banner } from '../components/Banner';
import { useMemo } from 'react';

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
            <></>
            {/* <FeedPanel /> */}
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

const infiniteWrapper = async ({ pageParam }: any) => {
  const result = await getFeed(pageParam);
  return result;
};

const FeedPanel = () => {
  const theme = useMantineTheme();
  const {
    data: feedPages,
    isLoading,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
    error,
  } = useInfiniteQuery({
    queryKey: ['main-feed'],
    initialPageParam: { first: 8, skip: 0 },
    queryFn: infiniteWrapper,
    getNextPageParam: (lastPage, _allPages, lastPageParam) =>
      lastPage.length === 0
        ? undefined
        : { first: lastPageParam.first, skip: lastPageParam.skip + 8 },
  });

  const feedItems = useMemo(() => feedPages?.pages?.flat(), [feedPages]);

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

  if (error)
    return (
      <AppAlert
        title="Error"
        color={theme.colors.red[6]}
        description={
          error.message || 'An error occurred while fetching the feed.'
        }
      />
    );

  if (!feedItems)
    return <AppAlert title="Empty Feed" description={'No feed items found.'} />;

  return (
    <>
      <Feed feed={feedItems} fetchNext={fetchNextPage} />
      {isFetchingNextPage && (
        <Group w="100%" justify="center">
          <Loader size="xl" />
        </Group>
      )}
      {!hasNextPage && (
        <Flex w="100%" justify="center" align="center" direction="column">
          <Text opacity={0.8}>You're all caught up!</Text>
          <Text opacity={0.7} fz="sm">
            Come back later to see more
          </Text>
        </Flex>
      )}
    </>
  );
};
