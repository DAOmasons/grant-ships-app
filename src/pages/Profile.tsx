import { useQuery } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { MainSection, PageTitle } from '../layout/Sections';
import {
  ActionIcon,
  Avatar,
  Box,
  Divider,
  Flex,
  Group,
  Modal,
  Paper,
  Stack,
  Tabs,
  Text,
  Tooltip,
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
import { Bold, Italic } from '../components/Typography';
import { resolveProjectMetadata } from '../resolvers/projectResolvers';
import {
  ProjectCardFromQuery,
  ProjectCard as ProjectCardType,
} from '../queries/getProjectCards';
import { ProjectCard } from '../components/projectItems/ProjectCard';
import { Display } from '../components/Display';
import { IconInfoCircle } from '@tabler/icons-react';
import { DAO_VOTE_TOKEN } from '../constants/gameSetup';

const getUserProjects = async (projects: ProjectCardFromQuery[]) => {
  const res = await Promise.all(
    projects.map(async (project) => {
      const metadata = await resolveProjectMetadata(project.metadata.pointer);
      return {
        ...project,
        metadata: metadata,
        imgUrl: metadata.imgUrl,
      } as any as ProjectCardType;
    })
  );
  return res;
};

export const Profile = () => {
  const { id } = useParams();
  const theme = useMantineTheme();
  const chainId = useChainId();

  const { data } = useQuery({
    queryKey: ['profile', id],
    queryFn: () => getUserProfile(id as string, chainId),
    enabled: !!id && !!chainId,
  });
  const { badges, sharesTokenSymbol, lootTokenSymbol, userData, badgeBalance } =
    data || {};

  const { data: projects } = useQuery({
    queryKey: [`user-projects-${id}`],
    queryFn: () =>
      getUserProjects(userData?.projects as ProjectCardFromQuery[]),
    enabled: !!(userData?.projects?.length || 0 > 0),
  });

  const navigate = useNavigate();

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
    <Flex w="100%">
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
          <Tabs
            value={tab}
            onChange={(tab) => navigate(`/profile/${id}/${tab}`)}
          >
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
            <Tabs.Panel value="entities">
              {projects && projects?.length > 0 ? (
                projects?.map((project) => (
                  <ProjectCard key={project.anchor} project={project} />
                ))
              ) : (
                <Display
                  title="No Projects"
                  description="This user has not created any projects yet."
                />
              )}
            </Tabs.Panel>
          </Tabs>
        </Box>
      </MainSection>
      <Stack gap="xs" mt={84} w={270}>
        <Paper p="md" bg={theme.colors.dark[6]} w="100%">
          <Text size="lg" mb={2}>
            {formatEther(0n)}
          </Text>
          <Group gap={4}>
            <Text size="sm" c={theme.colors.dark[2]}>
              Total Delegated {DAO_VOTE_TOKEN.SYMBOL}
            </Text>
            <Tooltip label={'ARB token delegated to this account'}>
              <IconInfoCircle size={16} color={theme.colors.violet[5]} />
            </Tooltip>
          </Group>
        </Paper>
        <Paper p="md" bg={theme.colors.dark[6]} w="100%">
          <Text size="lg" mb={2}>
            {formatEther(badgeBalance || 0n)}
          </Text>
          <Group gap={4}>
            <Text size="sm" c={theme.colors.dark[2]}>
              Total {lootTokenSymbol}
            </Text>
            <Tooltip
              label={`${lootTokenSymbol} is a community voting token, awarded for participation and detailed knowledge of Grant Ships`}
            >
              <IconInfoCircle size={16} color={theme.colors.violet[5]} />
            </Tooltip>
          </Group>
        </Paper>
      </Stack>
    </Flex>
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
    setTimeout(() => setSelectedBadge(null), 200);
  };

  return (
    <Flex gap="md" wrap={'wrap'}>
      {badges?.map((badge) => (
        <Avatar
          style={{ cursor: 'pointer' }}
          src={badge.imgUrl}
          key={badge.id}
          size={80}
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
          <Flex w="100%" gap="sm" mb="xl">
            <Avatar src={selectedBadge?.imgUrl} size={200} />
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
          <Divider mb="xs" />
          <Text fz="sm" mb="md">
            <Bold>Badge Description: </Bold>
            {selectedBadge?.description || 'N/A'}
          </Text>
          <Divider mb="xs" />
          {selectedBadge?.comment && (
            <Text fz="sm" mb="md">
              <Bold>Minter Comment: </Bold>
              <Italic>"{selectedBadge?.comment} </Italic>
            </Text>
          )}
        </Modal.Body>
      </Modal>
    </Flex>
  );
};
