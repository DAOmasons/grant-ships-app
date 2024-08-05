import { Box, Text } from '@mantine/core';
import { useGrant } from '../../hooks/useGrant';

export const GrantMilestones = () => {
  const { currentMilestoneSet } = useGrant();

  // if(!currentMilestoneSet) return a display that says "No milestones set yet"

  return <Box></Box>;
};
