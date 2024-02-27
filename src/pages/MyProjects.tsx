import { useQuery } from '@tanstack/react-query';
import { Link, useParams } from 'react-router-dom';
import { Box, Button, Text, useMantineTheme } from '@mantine/core';
import { IconExclamationCircle, IconPlus } from '@tabler/icons-react';

import { getUserProjects } from '../queries/getProjectCards';
import { ReactNode } from 'react';
import { MainSection, PageDescription, PageTitle } from '../layout/Sections';
import {
  ProjectCard,
  ProjectCardSkeleton,
} from '../components/projectItems/ProjectCard';
import { AppAlert } from '../components/UnderContruction';

export const MyProjects = () => {
  const { id } = useParams();
  const theme = useMantineTheme();

  const {
    data: userProjects,
    error,
    isLoading,
  } = useQuery({
    queryKey: [`user-projects-${id}`],
    queryFn: () => getUserProjects(id as string),
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <ProjectPageLayout>
        <ProjectCardSkeleton />
        <ProjectCardSkeleton />
        <ProjectCardSkeleton />
      </ProjectPageLayout>
    );
  }

  if (error || !userProjects) {
    return (
      <ProjectPageLayout>
        <AppAlert
          icon={<IconExclamationCircle />}
          color={theme.colors.red[6]}
          title="Error: No projects found for this user."
          description={error?.message || 'Unknown error.'}
        />
      </ProjectPageLayout>
    );
  }

  if (userProjects.length === 0) {
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
      <PageDescription description="Start by creating a project profile to outline your goals, objectives, and team. Let's bring your ideas to life! Click below to register your project profile." />
      <Button
        component={Link}
        to="/create-project"
        mb="xl"
        leftSection={<IconPlus />}
      >
        Create a Project
      </Button>
      {userProjects.map((project) => (
        <ProjectCard key={project.anchor} project={project} />
      ))}
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
