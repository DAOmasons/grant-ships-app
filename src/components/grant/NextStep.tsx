import { Box, Divider, Flex } from '@mantine/core';
import { ReactNode } from 'react';
import { useMobile } from '../../hooks/useBreakpoint';

export const NextStep = ({
  text,
  icon,
}: {
  text: ReactNode;
  icon?: ReactNode;
}) => {
  const isMobile = useMobile();
  return (
    <Box mb="lg">
      <Box pl={isMobile ? 0 : 50} mb="sm" opacity={0.8}>
        <Flex gap="8">
          <Box style={{ flexShrink: 0 }}>{icon}</Box>
          <Box style={{ minWidth: 0, flexGrow: 1 }}>{text}</Box>
        </Flex>
      </Box>
      <Divider />
    </Box>
  );
};
