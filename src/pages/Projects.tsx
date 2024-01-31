import { getBuiltGraphSDK } from '../.graphclient';
import { useQuery } from '@tanstack/react-query';
import { MainSection, PageDescription, PageTitle } from '../layout/Sections';
import {
  Avatar,
  Box,
  Button,
  Flex,
  Paper,
  Text,
  useMantineTheme,
} from '@mantine/core';
import { PINATA_GATEWAY } from '../utils/ipfs/gateway';
import { IconPlus } from '@tabler/icons-react';
import { Link } from 'react-router-dom';

const getProjects = async () => {
  const { GetProjects } = getBuiltGraphSDK();

  const { projects } = await GetProjects();

  return projects?.map((project) => ({
    ...project,
    imgUrl: `${PINATA_GATEWAY}/${project.metadata?.avatarHash_IPFS}`,
  }));
};

export const Projects = () => {
  const { data } = useQuery({ queryKey: ['projects'], queryFn: getProjects });
  const theme = useMantineTheme();
  return (
    <MainSection>
      <PageTitle title="Projects" />
      <PageDescription description="Start by creating a project profile to outline your goals, objectives, and team. Let's bring your ideas to life! Click below to register your project profile." />
      <Button size="md" mb="xl" leftSection={<IconPlus />}>
        Create a Project
      </Button>
      {data?.map((project) => (
        <Paper
          component={Link}
          to={`project/${project.anchor}`}
          w="100%"
          h={140}
          mb={16}
          bg={theme.colors.dark[6]}
          style={{
            cursor: 'pointer',
            color: theme.colors.dark[0],
          }}
        >
          <Flex h={'100%'} pt="lg" pl="lg">
            <Box mr="md">
              <Avatar size={65} src={project.imgUrl} />
            </Box>
            <Box mr="md">
              <Text fw={600} mb={'xs'}>
                Project 576
                {/* {project.name} */}
              </Text>
              <Text fz={'sm'} lineClamp={3}>
                {/* {project.metadata?.description} */}
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book
              </Text>
            </Box>
          </Flex>
        </Paper>
      ))}
    </MainSection>
  );
};
