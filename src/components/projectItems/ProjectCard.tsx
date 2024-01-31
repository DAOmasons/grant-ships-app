import { Link } from 'react-router-dom';
import { Avatar, Box, Flex, Paper, Text } from '@mantine/core';

import { ProjectCard as ProjectCardType } from '../../queries/getProjectCards';
import classes from './ProjectCard.module.css';

export const ProjectCard = ({ project }: { project: ProjectCardType }) => {
  return (
    <Paper
      component={Link}
      to={`/project/${project.anchor}`}
      w="100%"
      className={classes.cardLink}
      h={140}
      mb={16}
    >
      <Flex h={'100%'} pt="lg" pl="lg">
        <Box mr="md">
          <Avatar size={65} src={project.imgUrl} />
        </Box>
        <Box mr="md">
          <Text fw={600} mb={'xs'}>
            {project.name}
          </Text>
          <Text fz={'sm'} lineClamp={3}>
            {project.metadata?.description}
          </Text>
        </Box>
      </Flex>
    </Paper>
  );
};
