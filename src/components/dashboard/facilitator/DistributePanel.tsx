import { Box, Button } from '@mantine/core';
import { DateTimePicker } from '@mantine/dates';

export const DistributePanel = () => {
  return (
    <Box>
      <DateTimePicker label="Start Time" w={350} mb={'md'} />
      <DateTimePicker label="End Time" w={350} mb="md" />
      <Button>Distribute Allocations</Button>
    </Box>
  );
};
