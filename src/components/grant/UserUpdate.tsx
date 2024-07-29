import { Box, Divider, Group, Text } from '@mantine/core';
import { PlayerAvatar } from '../PlayerAvatar';
import {
  secondsToLongDate,
  secondsToShortRelativeTime,
} from '../../utils/time';
import { ReactNode, useMemo } from 'react';
import { Player } from '../../types/ui';
import { RTDisplay } from '../RTDisplay';
import { Content } from '@tiptap/react';

export const UserUpdate = ({
  content,
  posterImg,
  posterName,
  playerType,
  timestamp,
  innerUI,
}: {
  content: Content;
  posterImg: string;
  posterName: string;
  playerType: Player;
  timestamp: number;
  innerUI?: ReactNode;
}) => {
  const time = useMemo(() => {
    if (!timestamp) return '';
    return secondsToLongDate(timestamp);
  }, [timestamp]);

  return (
    <Box mb="lg">
      <Group gap={8}>
        <PlayerAvatar
          playerType={playerType}
          imgUrl={posterImg}
          name={posterName}
        />
        {time && (
          <>
            <Text size="sm" opacity={0.8}>
              ·
            </Text>
            <Text size="sm" opacity={0.8}>
              {time}
            </Text>
          </>
        )}
      </Group>
      <Box pl={50} mb="lg">
        <RTDisplay content={content} minified={true} />
        {innerUI}
      </Box>
      <Divider />
    </Box>
  );
};
