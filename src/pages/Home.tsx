import { Box, Tabs, Text } from '@mantine/core';
import { Feed } from '../components/feed/Feed';
import { MainSection } from '../layout/Sections';
import { AppAlert } from '../components/UnderContruction';
import { useQuery } from '@tanstack/react-query';
import { getFeed } from '../queries/getFeed';
import { FeedSkeletonCard } from '../components/skeletons';
import { Banner } from '../components/Banner';
import { useBreakpoints } from '../hooks/useBreakpoint';

export const Home = () => {
  const { isThin, isMobile, isTablet, isLaptop, isDesktop } = useBreakpoints();

  return (
    <Box w="100%">
      <Banner />
      <MainSection>
        {isThin && <Text>Thin</Text>}
        {isMobile && <Text>Mobile</Text>}
        {isTablet && <Text>Tablet</Text>}
        {isLaptop && <Text>Laptop</Text>}
        {isDesktop && <Text>Desktop</Text>}
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
