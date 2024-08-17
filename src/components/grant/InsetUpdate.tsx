import { Box, Divider, Flex, Group, Text } from '@mantine/core';
import { ReactNode, useMemo } from 'react';
import { Bold } from '../Typography';
import { secondsToShortRelativeTime } from '../../utils/time';
import { useMobile } from '../../hooks/useBreakpoint';

export const InsetUpdate = ({
  posterName,
  timestamp,
  tagline,
  bodyUI,
  symbolUI,
}: {
  symbolUI?: ReactNode;
  tagline?: string;
  bodyUI?: ReactNode;
  posterName: string;
  timestamp: number;
}) => {
  const isMobile = useMobile();

  const time = useMemo(() => {
    if (!timestamp) return '';
    return secondsToShortRelativeTime(timestamp);
  }, [timestamp]);
  return (
    <>
      <Box pl={isMobile ? 0 : 50}>
        <Flex gap={8} mb="xs" style={{ flexShrink: 0, flexWrap: 'wrap' }}>
          {symbolUI}
          <Text size="sm">
            <Bold>{posterName}</Bold> {tagline}
          </Text>
          <Text size="sm" opacity={0.8}>
            ·
          </Text>
          <Text size="sm" opacity={0.8}>
            {time}
          </Text>
        </Flex>
        <Box mb="lg">{bodyUI}</Box>
      </Box>
      <Divider mb="lg" />
    </>
  );
};
