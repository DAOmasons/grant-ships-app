import { Link, useParams } from 'react-router-dom';
import {
  Avatar,
  Box,
  Button,
  Group,
  Paper,
  Skeleton,
  Text,
  useMantineTheme,
} from '@mantine/core';
import { IconExclamationCircle, IconPlus } from '@tabler/icons-react';

import { ReactNode } from 'react';
import { MainSection, PageDescription, PageTitle } from '../layout/Sections';
import {
  ProjectCard,
  ProjectCardSkeleton,
} from '../components/projectItems/ProjectCard';
import { AppAlert } from '../components/UnderContruction';
import { useUserData } from '../hooks/useUserState';
import { useQuery } from '@tanstack/react-query';
import { resolveProjectMetadata } from '../resolvers/projectResolvers';
import {
  ProjectCard as ProjectCardType,
  ProjectCardFromQuery,
} from '../queries/getProjectCards';
import { PINATA_GATEWAY } from '../utils/ipfs/get';

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

export const MyProjects = () => {
  const { id } = useParams();
  const theme = useMantineTheme();

  const { userData, userLoading, userError } = useUserData();

  const {
    data: projects,
    isLoading: projectsLoading,
    error: projectsError,
  } = useQuery({
    queryKey: [`user-projects-${id}`],
    queryFn: () =>
      getUserProjects(userData?.projects as ProjectCardFromQuery[]),
    enabled: !!(userData?.projects?.length || 0 > 0),
  });

  if (userLoading) {
    return (
      <ProjectPageLayout>
        <Skeleton w="100%" h={300} mt={80} />
      </ProjectPageLayout>
    );
  }

  if (projectsLoading) {
    return (
      <ProjectPageLayout>
        <ProjectCardSkeleton />
        <ProjectCardSkeleton />
        <ProjectCardSkeleton />
      </ProjectPageLayout>
    );
  }

  if (userError || !userData) {
    return (
      <ProjectPageLayout>
        <AppAlert
          icon={<IconExclamationCircle />}
          color={theme.colors.red[6]}
          title="Error:"
          description={userError?.message || 'Unknown error.'}
        />
      </ProjectPageLayout>
    );
  }

  if (projectsError) {
    return (
      <ProjectPageLayout>
        <AppAlert
          icon={<IconExclamationCircle />}
          color={theme.colors.red[6]}
          title="Error:"
          description={projectsError?.message || 'Unknown error.'}
        />
      </ProjectPageLayout>
    );
  }

  if (!projects?.length && !userData?.shipApplicants?.length) {
    return (
      <ProjectPageLayout>
        <Box mt={80} py={68} px={25}>
          <Text component="h2" fz={24} fw={700} mb={'md'} c="white">
            It looks like you haven’t started any projects yet.
          </Text>
          <Text size="md" c={theme.colors.dark[2]} mb="xl">
            Start by creating a project profile. Let's bring your ideas to life!
            Click below to register your project profile.
          </Text>
          <Button
            component={Link}
            leftSection={<IconPlus />}
            to="/create-project"
          >
            Start a Project
          </Button>
        </Box>
      </ProjectPageLayout>
    );
  }

  return (
    <ProjectPageLayout>
      <PageDescription description="Want to create another project? " />
      <Button
        component={Link}
        to="/create-project"
        mb="xl"
        leftSection={<IconPlus />}
      >
        Create a Project
      </Button>
      {projects && projects?.length > 0 && (
        <>
          <Text fw={600} mb="md">
            My Projects ({projects?.length})
          </Text>
          {projects?.map((project) => (
            <ProjectCard key={project.anchor} project={project} />
          ))}
        </>
      )}

      {userData?.shipApplicants && userData?.shipApplicants.length > 0 && (
        <>
          <Text fw={600} mb="md">
            Ship Applications ({userData?.shipApplicants?.length})
          </Text>
          {userData?.shipApplicants.map((applicant) => (
            <Paper
              key={applicant.id}
              bg={theme.colors.dark[6]}
              p="md"
              style={{ pointer: 'cursor' }}
            >
              <Group align="start">
                <Avatar
                  size={65}
                  src={`${PINATA_GATEWAY}/${applicant.profileMetadata.avatarHash_IPFS}`}
                />
                <Box style={{ flexGrow: 1 }} w="min-content">
                  <Text fw={600} mb={4} size="sm" truncate maw={115}>
                    {applicant.name}
                  </Text>
                  <Text size="sm" opacity={0.8}>
                    {applicant.profileMetadata.mission}
                  </Text>
                </Box>
              </Group>
            </Paper>
          ))}
        </>
      )}
    </ProjectPageLayout>
  );
};

const ProjectPageLayout = ({ children }: { children: ReactNode }) => {
  return (
    <MainSection>
      <PageTitle title="My Projects" />
      {children}
    </MainSection>
  );
};
