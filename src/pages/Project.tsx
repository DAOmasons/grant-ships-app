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
import { MilestonePanel } from '../components/projectItems/MilestonePanel';
import { Contact } from '../components/Contact';

import { formatEther } from 'viem';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getProjectPage } from '../queries/getProjectPage';
import { AddressAvatarGroup } from '../components/AddressAvatar';
import { AppAlert } from '../components/UnderContruction';

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

  const theme = useMantineTheme();

  // I tried building a nice SkeletonLoader for the ship page,
  // However, it struggled with state changes. So I'm using
  // null for now

  // TODO: Get SkeletonLoader working

  if (isLoading) return null;

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

  const totalFunds = !project.grants
    ? formatEther(0n)
    : formatEther(
        project.grants.reduce((acc: bigint, grant: GrantUI) => {
          return acc + grant.grantApplication.grantAmount;
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
          <Text>{project.status}</Text>
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
            <Tabs.Tab w="20%" value="milestones">
              Milestones
            </Tabs.Tab>
            <Tabs.Tab w="20%" value="details">
              Contact
            </Tabs.Tab>
          </Tabs.List>
          <Tabs.Panel value="feed">
            <FeedPanel />
          </Tabs.Panel>
          <Tabs.Panel value="grants">
            {project.grants && <GrantsPanel grants={project.grants} />}
          </Tabs.Panel>
          <Tabs.Panel value="milestones">
            {project.grants && <MilestonePanel grants={project.grants} />}
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
          <Text size="sm" mb="lg">
            Funding Received
          </Text>
          <Text size="xl" mb={4}>
            {totalFunds} {GAME_TOKEN.SYMBOL}
          </Text>
          <Text size="sm">Funds received this round</Text>
        </Paper>
        {project?.grants?.length !== 0 && (
          <Paper p="md" bg={theme.colors.dark[6]}>
            <Stack gap="lg">
              <Text>Grants</Text>
              {project?.grants?.map((grant: GrantUI, i: number) => (
                <MilestoneProgress
                  key={`milestone-progress-bar-${i}`}
                  steps={grant.milestones}
                  fundedBy={grant.shipAddress}
                />
              ))}
            </Stack>
          </Paper>
        )}
      </Stack>
    </Flex>
  );
};
