import { Box, Divider, Group, Skeleton, Text } from '@mantine/core';
import { ResolvedUpdate } from '../resolvers/updates';
import { Display } from './Display';
import { PlayerAvatar } from './PlayerAvatar';
import { secondsToShortRelativeTime } from '../utils/time';
import { Player } from '../types/ui';
import { RTDisplay } from './RTDisplay';

export const UpdatesPanel = ({
  updates,
  name,
  isLoading,
  error,
  imgUrl,
  playerType,
}: {
  playerType: Player;
  updates?: ResolvedUpdate[];
  imgUrl?: string;
  name: string;
  isLoading: boolean;
  error: Error | null;
}) => {
  if (isLoading) {
    return (
      <Box>
        <Box mt="200" />
        <Skeleton h={1} mb={200} />
        <Skeleton h={1} mb={200} />
      </Box>
    );
  }

  if (error) {
    return <Display title="Error" description={error.message} />;
  }

  if (!updates || updates?.length === 0) {
    return (
      <Display
        title="Just Getting Started"
        description={`${name} hasn't posted any updates yet.`}
      />
    );
  }

  return (
    <Box>
      {updates.map((update) => (
        <Box pb="lg" key={update.id}>
          <Group mb="sm" gap={8}>
            <PlayerAvatar
              imgUrl={imgUrl || ''}
              name={name}
              playerType={playerType}
            />
            <Text size="sm" opacity={0.8}>
              ·
            </Text>
            <Text size="sm" opacity={0.8}>
              {secondsToShortRelativeTime(update.timestamp)}
            </Text>
          </Group>
          <Box mb="lg" pl={50}>
            <RTDisplay content={update.content} />
          </Box>
          <Divider mb="lg" />
        </Box>
      ))}
    </Box>
  );
};
