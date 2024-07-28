import { Box } from '@mantine/core';
import { useGrant } from '../../hooks/useGrant';
import { FeedCard } from '../feed/FeedCard';

export const GrantTimeline = () => {
  const { timeline, beacon } = useGrant();
  return <Box></Box>;
};
