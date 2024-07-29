import { Box, Divider, Group, Text } from '@mantine/core';
import { Content } from '@tiptap/react';
import React, { ReactNode, useMemo } from 'react';
import { Bold } from '../Typography';
import { secondsToLongDate } from '../../utils/time';

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
  const time = useMemo(() => {
    if (!timestamp) return '';
    return secondsToLongDate(timestamp);
  }, [timestamp]);
  return (
    <>
      <Box pl={50}>
        <Group gap={8} mb="xs">
          {symbolUI}
          <Text size="sm">
            <Bold>{posterName}</Bold>
            {tagline}
          </Text>
          <Text size="sm" opacity={0.8}>
            ·
          </Text>
          <Text size="sm" opacity={0.8}>
            {time}
          </Text>
        </Group>
        <Box mb="lg">{bodyUI}</Box>
      </Box>
      <Divider mb="lg" />
    </>
  );
};
