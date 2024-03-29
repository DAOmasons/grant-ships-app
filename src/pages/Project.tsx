import {
  Avatar,
  Box,
  Flex,
  Group,
  Paper,
  Stack,
  Tabs,
  Text,
  Tooltip,
  useMantineTheme,
} from '@mantine/core';
import { MainSection, PageTitle } from '../layout/Sections';
import { IconAward, IconInfoCircle } from '@tabler/icons-react';
import { FeedPanel } from '../components/shipItems/FeedPanel';
import { GAME_TOKEN } from '../constants/gameSetup';
import { MilestoneProgress } from '../components/projectItems/MilestoneProgress';
import { GrantsPanel } from '../components/projectItems/GrantsPanel';
import { Contact } from '../components/Contact';

import { formatEther } from 'viem';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getProjectPage } from '../queries/getProjectPage';
import { AddressAvatarGroup } from '../components/AddressAvatar';
import { AppAlert } from '../components/UnderContruction';
import { GrantStatus } from '../types/common';
import { SingleItemPageSkeleton } from '../components/skeletons';
import { getEntityFeed } from '../queries/getFeed';
import { getProjectGrants } from '../queries/getProjectGrants';
import { DashGrant } from '../resolvers/grantResolvers';
import { useMemo } from 'react';
import { useUserData } from '../hooks/useUserState';
import { ProjectUpdatesPanel } from '../components/projectItems/ProjectUpdatesPanel';

export const Project = () => {
  const { id } = useParams();
  const { userData } = useUserData();

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

  const isProjectMember = useMemo(() => {
    return (
      userData && !!userData.projects?.find((project) => project.anchor === id)
    );
  }, [userData, id]);

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

  const activeGrants = grants?.filter(
    (grant: DashGrant) => grant.grantStatus >= GrantStatus.FacilitatorApproved
  );

  return (
    <Flex w="100%">
      <MainSection maw={600}>
        <PageTitle title={project.name} />
        <Avatar size={160} mt={'xl'} mb="md" src={project.imgUrl} />
        <Group gap={'xs'} mb="md">
          <Text fz="lg" fw={600}>
            {project.name}
          </Text>
          {isProjectMember && (
            <Tooltip label="You are a member of this project">
              <Group align="start" gap={6}>
                <IconAward
                  size={16}
                  color={theme.colors.blue[5]}
                  style={{ transform: 'translateY(2px)' }}
                />{' '}
                <Text fz="sm" c={theme.colors.blue[5]}>
                  Project Member
                </Text>
              </Group>
            </Tooltip>
          )}
        </Group>
        <Text fz="sm" mb={'md'} className="ws-pre-wrap">
          {project.description}
        </Text>
        <Box mb="xl">
          <AddressAvatarGroup
            addresses={project.members}
            avatarProps={{ size: 32 }}
          />
        </Box>
        <Tabs defaultValue="feed">
          <Tabs.List mb={'xl'}>
            <Tabs.Tab value="feed" w="6rem">
              Feed
            </Tabs.Tab>
            <Tabs.Tab w="6rem" value="updates">
              Updates
            </Tabs.Tab>
            <Tabs.Tab w="6rem" value="grants">
              Grants
            </Tabs.Tab>
            <Tabs.Tab w="6rem" value="details">
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
          <Tabs.Panel value="updates">
            <ProjectUpdatesPanel
              grants={grants}
              project={project}
              isProjectMember={isProjectMember}
            />
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
          <Text size="lg" mb={2}>
            {totalFundsAllocated} {GAME_TOKEN.SYMBOL}
          </Text>
          <Group mb="md" gap={4}>
            <Text size="sm">Funding allocated </Text>
            <Tooltip
              position="bottom"
              label="Total funding allocated to this project"
            >
              <IconInfoCircle size={14} color={theme.colors.violet[4]} />
            </Tooltip>
          </Group>

          <Text size="lg" mb={2}>
            {totalFundsReceived} {GAME_TOKEN.SYMBOL}
          </Text>
          <Group gap={4}>
            <Text size="sm">Funding Received</Text>
            <Tooltip
              label="Total funding received for work completed"
              position="bottom"
            >
              <IconInfoCircle size={14} color={theme.colors.violet[4]} />
            </Tooltip>
          </Group>
        </Paper>
        {activeGrants?.length !== 0 && (
          <Paper p="md" bg={theme.colors.dark[6]}>
            <Stack gap="lg">
              <Text>Active Grants</Text>
              {activeGrants?.map((grant: DashGrant, i: number) => (
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
