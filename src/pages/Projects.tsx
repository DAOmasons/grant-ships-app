import { useQuery } from '@tanstack/react-query';
import { MainSection, PageDescription, PageTitle } from '../layout/Sections';
import { Button, useMantineTheme } from '@mantine/core';
import { IconExclamationMark, IconPlus } from '@tabler/icons-react';
import { Link } from 'react-router-dom';
import { getProjectCards } from '../queries/getProjectCards';
import {
  ProjectCard,
  ProjectCardSkeleton,
} from '../components/projectItems/ProjectCard';
import { ReactNode } from 'react';
import { AppAlert } from '../components/UnderContruction';

export const Projects = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['projects'],
    queryFn: getProjectCards,
  });

  const theme = useMantineTheme();

  if (isLoading) {
    return (
      <PageLayout>
        {Array.from({ length: 6 }).map((_, index) => (
          <ProjectCardSkeleton key={index} />
        ))}
      </PageLayout>
    );
  }

  if (error || !data) {
    <PageLayout>
      <AppAlert
        title="Projects Page 404"
        description={error?.message || 'Error fetching projects'}
        bg={theme.colors.pink[8]}
        icon={<IconExclamationMark size={24} />}
      />
    </PageLayout>;
  }

  if (data?.length === 0) {
    return (
      <PageLayout>
        <AppAlert
          title="No Projects Yet"
          description={"Users haven't created any projects yet"}
        />
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      {data?.map((project) => (
        <ProjectCard key={project.anchor} project={project} />
      ))}
    </PageLayout>
  );
};

const PageLayout = ({ children }: { children: ReactNode }) => {
  return (
    <MainSection>
      <PageTitle title="Projects" />
      <PageDescription description="Start by creating a project profile to outline your goals, objectives, and team. Let's bring your ideas to life! Click below to register your project profile." />
      <Button
        component={Link}
        to="/create-project"
        mb="xl"
        leftSection={<IconPlus />}
      >
        Create a Project
      </Button>
      {children}
    </MainSection>
  );
};
