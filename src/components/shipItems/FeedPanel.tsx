import { useMantineTheme } from '@mantine/core';
import { FeedCardUI } from '../../types/ui';
import { AppAlert } from '../UnderContruction';
import { Feed } from '../feed/Feed';
import { FeedSkeletonCard } from '../skeletons';

export const FeedPanel = ({
  feedItems,
  isLoading,
  error,
}: {
  feedItems?: FeedCardUI[];
  isLoading: boolean;
  error: Error | null;
}) => {
  const theme = useMantineTheme();

  if (isLoading)
    return (
      <>
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
        color={theme.colors.pink[6]}
        description={error.message || 'Error loading feed data'}
      />
    );

  return <Feed feed={feedItems} />;
};
