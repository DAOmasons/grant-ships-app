import { FeedCardUI } from '../../types/ui';
import { FeedCard } from './FeedCard';
import { Box, Paper, Text, useMantineTheme } from '@mantine/core';

export const Feed = ({
  feed,
  fetchNext,
}: {
  feed?: FeedCardUI[];
  fetchNext: () => void;
}) => {
  const theme = useMantineTheme();

  return feed?.length ? (
    <Box h="100%">
      {feed.map((feedCard, i) => (
        <FeedCard
          key={`${i}-${feedCard.subject.id}`}
          {...feedCard}
          cardIndex={i}
          cardCount={feed.length}
          onIntersect={fetchNext}
        />
      ))}
    </Box>
  ) : (
    <Paper p="lg" bg={theme.colors.dark[6]}>
      <Text size="lg" mb="sm">
        Feed is empty
      </Text>
      <Text size="sm" opacity={0.6}>
        There are no feed items related to this topic
      </Text>
    </Paper>
  );
};
