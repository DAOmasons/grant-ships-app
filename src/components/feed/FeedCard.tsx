import {
  Avatar,
  Box,
  Divider,
  Flex,
  Group,
  Spoiler,
  Text,
  useMantineTheme,
} from '@mantine/core';
import { useMemo } from 'react';
import { Address } from 'viem';
import { useEnsName } from 'wagmi';
import { ensConfig } from '../../utils/config';
import { mainnet } from 'viem/chains';
import { FeedCardUI } from '../../types/ui';
import {
  IconAward,
  IconChevronCompactDown,
  IconChevronCompactUp,
  IconRocket,
} from '@tabler/icons-react';
import classes from './FeedStyles.module.css';
import { secondsToShortRelativeTime } from '../../utils/time';

export const FeedCard = ({
  subject,
  object,
  content,
  embedText,
  timestamp,
  sender,
}: FeedCardUI) => {
  const theme = useMantineTheme();
  const { data: ensName } = useEnsName({
    address: sender as Address,
    config: ensConfig,
    chainId: mainnet.id,
  });
  const icon = useMemo(() => {
    if (subject.entityType === 'project') {
      return <IconAward size={16} color={theme.colors.blue[5]} />;
    }
    if (subject.entityType === 'ship') {
      return <IconRocket size={16} color={theme.colors.violet[5]} />;
    }
    if (subject.entityType === 'facilitators') {
      return <IconAward size={16} color={theme.colors.pink[5]} />;
    }
  }, [subject.entityType, theme]);

  const time = useMemo(() => {
    return secondsToShortRelativeTime(timestamp);
  }, [timestamp]);

  const messageWithLinks = useMemo(() => {
    return content;
  }, [content]);

  return (
    <Box mb="lg">
      <Flex mb="lg">
        <Box mr="xs">
          <Avatar size={32} src={subject.imgUrl && subject.imgUrl} />
        </Box>
        <Box>
          <Group gap={8} mb={8}>
            <Text size="sm">{subject.name}</Text>
            {icon}
            <Text size="sm" opacity={0.8}>
              ·
            </Text>
            <Text size="sm" opacity={0.8}>
              {time}
            </Text>
          </Group>
          <Text size="sm" mb={10}>
            {messageWithLinks}
          </Text>
          {embedText && (
            <Spoiler
              mb={'xs'}
              hideLabel={<IconChevronCompactUp />}
              showLabel={<IconChevronCompactDown />}
              classNames={{
                root: classes.embedTextBox,
                control: classes.embedTextControl,
              }}
              maxHeight={48}
            >
              <Text fz="sm">{embedText}</Text>
            </Spoiler>
          )}
          <Text size="xs" opacity={0.85}>
            Posted by{' '}
            {ensName ? ensName : sender.slice(0, 6) + '...' + sender.slice(-4)}
          </Text>
        </Box>
      </Flex>
      <Divider />
    </Box>
  );
};
