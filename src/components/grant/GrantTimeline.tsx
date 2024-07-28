import { Box, Divider, Flex, Group, ScrollArea, Text } from '@mantine/core';
import { useGrant } from '../../hooks/useGrant';
import { FeedCard } from '../feed/FeedCard';
import { RTDisplay } from '../RTDisplay';
import { Content } from '@tiptap/react';
import { PlayerAvatar } from '../PlayerAvatar';
import { Player } from '../../types/ui';
import { Fragment, ReactNode, useMemo } from 'react';
import { secondsToShortRelativeTime } from '../../utils/time';
import { IconRoute } from '@tabler/icons-react';
import { Bold } from '../Typography';

export const GrantTimeline = () => {
  const { timeline, beacon, ship } = useGrant();
  return (
    <Box>
      {/* <ScrollArea h="30%"> */}
      {timeline.map((item, index) => {
        if (item.tag === 'beacon') {
          return (
            <Fragment key={item.id}>
              <NextStep
                text={
                  <Text fz="sm">
                    Next Step: Please submit an <Bold>Application</Bold> or
                    select <Bold>Start Grant</Bold> to signal your intent to
                    apply.
                  </Text>
                }
              />
              <UserUpdate
                content={item.updateContent}
                posterImg={ship?.profileMetadata?.imgUrl || ''}
                posterName={ship?.name || ''}
                playerType={item.playerType}
                timestamp={item.timestamp}
              />
            </Fragment>
          );
        }
      })}
      {/* </ScrollArea> */}
    </Box>
  );
};

const UserUpdate = ({
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
    return secondsToShortRelativeTime(timestamp);
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

const NextStep = ({ text }: { text: ReactNode }) => {
  return (
    <Box mb="lg">
      <Box pl={50} mb="lg" opacity={0.8}>
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
