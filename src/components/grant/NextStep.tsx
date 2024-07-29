import { Box, Divider, Flex } from '@mantine/core';
import { IconRoute } from '@tabler/icons-react';
import { ReactNode } from 'react';

export const NextStep = ({ text }: { text: ReactNode }) => {
  return (
    <Box mb="lg">
      <Box pl={50} mb="sm" opacity={0.8}>
        <Flex gap="8">
          <Box style={{ flexShrink: 0 }}>
            <IconRoute size={20} />
          </Box>
          <Box style={{ minWidth: 0, flexGrow: 1 }}>{text}</Box>
        </Flex>
      </Box>
      <Divider />
    </Box>
  );
};
