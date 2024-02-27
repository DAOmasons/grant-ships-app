import { useQuery } from '@tanstack/react-query';
import { MainSection, PageDescription, PageTitle } from '../layout/Sections';
import { Button } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';
import { Link } from 'react-router-dom';
import { getProjectCards } from '../queries/getProjectCards';
import {
  ProjectCard,
  ProjectCardSkeleton,
} from '../components/projectItems/ProjectCard';
import { ReactNode } from 'react';

export const Projects = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['projects'],
    queryFn: getProjectCards,
  });

  if (isLoading) {
    return (
      <PageLayout>
        {Array.from({ length: 6 }).map((_, index) => (
          <ProjectCardSkeleton key={index} />
        ))}
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
