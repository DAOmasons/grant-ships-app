import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { MainSection, PageTitle } from '../layout/Sections';
import { ActionIcon, Avatar, Box, Divider, Group, Text } from '@mantine/core';
import { Address } from 'viem';
import { useChainId, useEnsAvatar, useEnsName } from 'wagmi';
import { ensConfig } from '../utils/config';
import { mainnet } from 'viem/chains';
import { normalize } from 'path';
import { IconCopy } from '@tabler/icons-react';
import { useClipboard } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import { getUserProfile } from '../queries/getUserProfile';

export const Profile = () => {
  const { id } = useParams();
  const chainId = useChainId();

  const { data } = useQuery({
    queryKey: ['profile', id],
    queryFn: () => getUserProfile(id as string, chainId),
    enabled: !!id && !!chainId,
  });

  const { userData, badges } = data || {};

  const { data: ensName } = useEnsName({
    address: id as Address,
    config: ensConfig,
    chainId: mainnet.id,
  });
  const { copy } = useClipboard();

  const { data: ensAvatar } = useEnsAvatar({
    name: ensName ? normalize(ensName) : undefined,
    config: ensConfig,
    chainId: mainnet.id,
  });

  const name = ensName || id!.slice(0, 6) + '...' + id!.slice(-4);
  const imgUrl = ensAvatar || `https://effigy.im/a/${id}.svg`;

  return (
    <MainSection>
      <PageTitle title="Profile" />
      <Box mt="xl">
        <Avatar size={160} mb="md" src={imgUrl} />
        <Group gap={'8'}>
          <Text fz={'lg'} fw={500}>
            {name}
          </Text>
          <ActionIcon
            radius={'xl'}
            variant="secondary"
            onClick={() => {
              copy(id);
              notifications.show({
                title: 'Address Copied',
                message: `Address: ${id} has been copied to clipboard`,
              });
            }}
          >
            <IconCopy size={16} />
          </ActionIcon>
        </Group>
        <Divider />
      </Box>
    </MainSection>
  );
};
