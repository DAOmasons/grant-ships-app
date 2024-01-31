import { useQuery } from '@tanstack/react-query';
import { MainSection, PageDescription, PageTitle } from '../layout/Sections';
import { Button } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';
import { Link } from 'react-router-dom';
import { getProjectCards } from '../queries/getProjectCards';
import { ProjectCard } from '../components/projectItems/ProjectCard';

export const Projects = () => {
  const { data } = useQuery({
    queryKey: ['projects'],
    queryFn: getProjectCards,
  });

  return (
    <MainSection>
      <PageTitle title="Projects" />
      <PageDescription description="Start by creating a project profile to outline your goals, objectives, and team. Let's bring your ideas to life! Click below to register your project profile." />
      <Button
        component={Link}
        to="/create-project"
        size="md"
        mb="xl"
        leftSection={<IconPlus />}
      >
        Create a Project
      </Button>
      {data?.map((project) => (
        <ProjectCard key={project.anchor} project={project} />
      ))}
    </MainSection>
  );
};
