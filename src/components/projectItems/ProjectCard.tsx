import { Link } from 'react-router-dom';
import { Avatar, Box, Flex, Paper, Skeleton, Text } from '@mantine/core';

import { ProjectCard as ProjectCardType } from '../../queries/getProjectCards';
import classes from './ProjectItems.module.css';

export const ProjectCard = ({ project }: { project: ProjectCardType }) => {
  return (
    <Paper
      component={Link}
      to={`/project/${project.id}`}
      w="100%"
      className={classes.cardLink}
      h={140}
      mb={16}
    >
      <Flex h={'100%'} p="lg">
        <Box mr="md">
          <Avatar size={65} src={project.imgUrl} />
        </Box>
        <Box>
          <Text fw={600} mb={'xs'}>
            {project.name}
          </Text>
          <Text fz={'sm'} lineClamp={3} className="ws-pre-wrap">
            {project.metadata?.description}
          </Text>
        </Box>
      </Flex>
    </Paper>
  );
};

export const ProjectCardSkeleton = () => <Skeleton h={140} mb={16} w="100%" />;
