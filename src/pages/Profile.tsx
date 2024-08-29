import { useQuery } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { MainSection, PageTitle } from '../layout/Sections';
import {
  ActionIcon,
  Avatar,
  Box,
  Flex,
  Group,
  Modal,
  Stack,
  Tabs,
  Text,
  useMantineTheme,
} from '@mantine/core';
import { Address, formatEther } from 'viem';
import { useChainId, useEnsAvatar, useEnsName } from 'wagmi';
import { ensConfig } from '../utils/config';
import { mainnet } from 'viem/chains';
import { normalize } from 'path';
import { IconCopy } from '@tabler/icons-react';
import { useClipboard, useDisclosure } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import { getUserProfile, UserBadge } from '../queries/getUserProfile';
import { useState } from 'react';
import { Bold } from '../components/Typography';

export const Profile = () => {
  const { id } = useParams();
  const chainId = useChainId();

  const { data } = useQuery({
    queryKey: ['profile', id],
    queryFn: () => getUserProfile(id as string, chainId),
    enabled: !!id && !!chainId,
  });

  const navigate = useNavigate();

  const { userData, badges, sharesTokenSymbol, lootTokenSymbol } = data || {};

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

  const tab = location.pathname.split('/')[3] || 'badges';

  return (
    <MainSection>
      <PageTitle title="Profile" />
      <Box mt="xl">
        <Avatar size={160} mb="md" src={imgUrl} />
        <Group gap={'8'} mb="lg">
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
        <Tabs value={tab} onChange={(tab) => navigate(`/profile/${id}/${tab}`)}>
          <Tabs.List mb="lg">
            <Tabs.Tab value="badges">Badges</Tabs.Tab>
            <Tabs.Tab value="entities">Projects</Tabs.Tab>
          </Tabs.List>
          <Tabs.Panel value="badges">
            {badges && (
              <BadgeTab
                badges={badges}
                lootTokenSymbol={lootTokenSymbol || ''}
                sharesTokenSymbol={sharesTokenSymbol || ''}
              />
            )}
          </Tabs.Panel>
        </Tabs>
      </Box>
    </MainSection>
  );
};

const BadgeTab = ({
  badges,
  lootTokenSymbol,
  sharesTokenSymbol,
}: {
  badges: UserBadge[];
  lootTokenSymbol: string;
  sharesTokenSymbol: string;
}) => {
  const [viewOpened, { open: openView, close: closeView }] = useDisclosure();

  const theme = useMantineTheme();

  const [selectedBadge, setSelectedBadge] = useState<UserBadge | null>(null);

  const handleOpen = (badge: UserBadge) => {
    setSelectedBadge(badge);
    openView();
  };

  const handleClose = () => {
    closeView();
    setSelectedBadge(null);
  };

  return (
    <Flex gap="md" wrap={'wrap'}>
      {badges?.map((badge) => (
        <Avatar
          style={{ cursor: 'pointer' }}
          src={badge.imgUrl}
          key={badge.id}
          size={80}
          radius="md"
          onClick={() => handleOpen(badge)}
        />
      ))}
      <Modal
        opened={viewOpened}
        onClose={handleClose}
        title={<Text fz="lg">{selectedBadge?.name}</Text>}
        centered
      >
        <Modal.Body>
          <Flex w="100%" gap="sm">
            <Avatar src={selectedBadge?.imgUrl} size={200} radius="md" />
            <Stack gap={4}>
              <Text fw={600} mb="xs">
                {selectedBadge?.name}
              </Text>
              <Text fz={'sm'} opacity={0.8}>
                <Bold>ID: </Bold>
                {selectedBadge?.badgeId}
              </Text>
              <Text
                fz={'sm'}
                opacity={0.8}
                c={
                  selectedBadge?.isSlash
                    ? theme.colors.red[7]
                    : theme.colors.green[7]
                }
              >
                <Bold>Amount: </Bold>
                {selectedBadge?.amount
                  ? formatEther(selectedBadge?.amount)
                  : 0}{' '}
                {selectedBadge?.isVotingToken
                  ? sharesTokenSymbol
                  : lootTokenSymbol}
              </Text>
            </Stack>
          </Flex>
        </Modal.Body>
      </Modal>
    </Flex>
  );
};
