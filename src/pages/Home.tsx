import { Box, Button, Tabs } from '@mantine/core';
import { Feed } from '../components/feed/Feed';
import { MainSection } from '../layout/Sections';
import { AppAlert } from '../components/UnderContruction';
import { useInfiniteQuery } from '@tanstack/react-query';
import { getFeed } from '../queries/getFeed';
import { FeedSkeletonCard } from '../components/skeletons';
import { Banner } from '../components/Banner';
import Logo from '../assets/Logo.svg';

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

const infiniteWrapper = async ({ pageParam }: any) => {
  const result = await getFeed(pageParam);
  return result;
};

const FeedPanel = () => {
  const {
    data: feedPages,
    isLoading,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ['main-feed'],
    initialPageParam: { first: 8, skip: 0 },
    queryFn: infiniteWrapper,
    getNextPageParam: (lastPage, _allPages, lastPageParam) =>
      lastPage.length === 0
        ? undefined
        : { first: lastPageParam.first, skip: lastPageParam.skip + 8 },
  });

  const feedItems = feedPages?.pages?.flat();

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

  return (
    <>
      <Feed feed={feedItems} fetchNext={fetchNextPage} />
      <Logo />
    </>
  );
};
