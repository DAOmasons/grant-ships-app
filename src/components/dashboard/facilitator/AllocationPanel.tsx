import { Box, Button, TextInput } from '@mantine/core';

export const AllocationPanel = () => {
  return (
    <Box>
      <TextInput label="Ship 1" w={350} placeholder="22.5 ETH" mb="xs" />
      <TextInput label="Ship 2" w={350} placeholder="22.5 ETH" mb="xs" />
      <TextInput label="Ship 3" w={350} placeholder="22.5 ETH" mb="xs" />
      <Button>Allocate</Button>
    </Box>
  );
};
