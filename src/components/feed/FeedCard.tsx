import { Avatar, Box, Flex, Group, Text } from '@mantine/core';
import { useMemo } from 'react';
import { Address } from 'viem';
import { useEnsName } from 'wagmi';
import { ensConfig } from '../../utils/config';
import { mainnet } from 'viem/chains';
import { FeedCardUI } from '../../types/ui';

export const FeedCard = ({
  subject,
  object,
  message,
  embedText,
  timestamp,
  sender,
}: FeedCardUI) => {
  const icon = null;

  const { data: ensName } = useEnsName({
    address: sender as Address,
    config: ensConfig,
    chainId: mainnet.id,
  });

  const time = useMemo(() => {
    return '2d';
  }, [timestamp]);

  const messageWithLinks = useMemo(() => {
    return message;
  }, [message]);

  return (
    <Flex>
      <Box mr="xs">
        <Avatar size={32} src={subject.imgUrl} />
      </Box>
      <Box>
        <Group mb="xs">
          <Text size="sm">{subject.name}</Text>
          {icon} ·{' '}
          <Text size="sm" opacity={0.8}>
            {time}
          </Text>
        </Group>
        <Text size="sm" mb="xs">
          {messageWithLinks}
        </Text>
        <Text size="xs">
          Posted by{' '}
          {ensName ? ensName : sender.slice(0, 6) + '...' + sender.slice(-4)}
        </Text>
      </Box>
    </Flex>
  );
};
