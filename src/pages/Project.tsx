import {
  Avatar,
  Flex,
  Group,
  Paper,
  Stack,
  Tabs,
  Text,
  useMantineTheme,
} from '@mantine/core';
import { MainSection, PageTitle } from '../layout/Sections';
import { IconInfoCircle } from '@tabler/icons-react';
import { FeedPanel } from '../components/shipItems/FeedPanel';
import { GAME_TOKEN } from '../constants/gameSetup';
import { GrantUI } from '../types/ui';
import { MilestoneProgress } from '../components/projectItems/MilestoneProgress';
import { GrantsPanel } from '../components/projectItems/GrantsPanel';
import { Contact } from '../components/Contact';

import { formatEther } from 'viem';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getProjectPage } from '../queries/getProjectPage';
import { AddressAvatarGroup } from '../components/AddressAvatar';
import { AppAlert } from '../components/UnderContruction';
import { GameStatus } from '../types/common';
import { SingleItemPageSkeleton } from '../components/skeletons';
import { getEntityFeed } from '../queries/getFeed';
import { getProjectGrants } from '../queries/getProjectGrants';
import { DashGrant } from '../resolvers/grantResolvers';

export const Project = () => {
  const { id } = useParams();

  const {
    data: project,
    isLoading,
    error,
  } = useQuery({
    queryKey: [`project-page-${id}`],
    queryFn: () => getProjectPage(id as string),
    enabled: !!id,
  });

  const {
    data: feedCards,
    isLoading: feedLoading,
    error: feedError,
  } = useQuery({
    queryKey: [`entity-feed-${id}`],
    queryFn: () =>
      getEntityFeed({ first: 10, skip: 0, entityId: id as string }),
    enabled: !!id,
  });

  const {
    data: grants,
    isLoading: grantsLoading,
    error: grantsError,
  } = useQuery({
    queryKey: [`project-grants-${id}`],
    queryFn: () => getProjectGrants(id as string),
    enabled: !!id,
  });

  const theme = useMantineTheme();

  if (isLoading) return <SingleItemPageSkeleton />;

  if (error) {
    return (
      <MainSection>
        <PageTitle title="Project Not Found" />
        <AppAlert
          title="Error: Project Page 404"
          description={error.message}
          bg={theme.colors.pink[8]}
        />
      </MainSection>
    );
  }
  if (!project)
    return (
      <MainSection>
        <PageTitle title="Project Not Found" />
        <AppAlert title="Error: Project Page 404" bg={theme.colors.pink[8]} />
      </MainSection>
    );

  const totalFundsReceived = !grants
    ? '0'
    : formatEther(
        grants.reduce((acc: bigint, grant: DashGrant) => {
          return (
            acc + (grant.amtDistributed ? BigInt(grant.amtDistributed) : 0n)
          );
        }, 0n)
      );

  const totalFundsAllocated = !grants
    ? '0'
    : formatEther(
        grants.reduce((acc: bigint, grant: DashGrant) => {
          return acc + (grant.amtAllocated ? BigInt(grant.amtAllocated) : 0n);
        }, 0n)
      );

  return (
    <Flex>
      <MainSection maw={534}>
        <PageTitle title={project.name} />
        <Avatar size={160} mt={'xl'} mb="md" src={project.imgUrl} />
        <Text fz="lg" fw={600}>
          {project.name}
        </Text>
        <Group mb="xs" gap={6}>
          <Text>{GameStatus[project.status]}</Text>
          <IconInfoCircle size={18} color={theme.colors.violet[8]} />
        </Group>
        <Text fz="sm" mb={'md'}>
          {project.description}
        </Text>
        <AddressAvatarGroup
          addresses={project.members}
          avatarProps={{ size: 32 }}
        />
        <Tabs defaultValue="feed">
          <Tabs.List mb={'xl'}>
            <Tabs.Tab value="feed" w="20%">
              Feed
            </Tabs.Tab>
            <Tabs.Tab w="20%" value="grants">
              Grants
            </Tabs.Tab>
            <Tabs.Tab w="20%" value="details">
              Contact
            </Tabs.Tab>
          </Tabs.List>
          <Tabs.Panel value="feed">
            <FeedPanel
              feedItems={feedCards}
              isLoading={feedLoading}
              error={feedError}
            />
          </Tabs.Panel>
          <Tabs.Panel value="grants">
            {project.grants && (
              <GrantsPanel
                grants={grants}
                isLoading={grantsLoading}
                error={grantsError}
              />
            )}
          </Tabs.Panel>
          <Tabs.Panel value="details">
            <Contact
              website={project.website}
              email={project.email}
              github={project.github}
              x={project.x}
              discord={project.discord}
              telegram={project.telegram}
              members={project.members}
            />
          </Tabs.Panel>
        </Tabs>
      </MainSection>
      <Stack gap={'xs'} mt={72} w={270}>
        <Paper p="md" bg={theme.colors.dark[6]}>
          <Text size="sm" mb="xs">
            Funding Received
          </Text>
          <Text size="xl" mb={4}>
            {totalFundsReceived} {GAME_TOKEN.SYMBOL}
          </Text>
          <Text size="sm" c={theme.colors.blue[2]} opacity={0.8}>
            {totalFundsAllocated} {GAME_TOKEN.SYMBOL} allocated
          </Text>
        </Paper>
        {grants?.length !== 0 && (
          <Paper p="md" bg={theme.colors.dark[6]}>
            <Stack gap="lg">
              <Text>Grants</Text>
              {grants?.map((grant: DashGrant, i: number) => (
                <MilestoneProgress
                  key={`milestone-progress-bar-${i}`}
                  grant={grant}
                  fundedBy={grant.shipId.id}
                />
              ))}
            </Stack>
          </Paper>
        )}
      </Stack>
    </Flex>
  );
};
