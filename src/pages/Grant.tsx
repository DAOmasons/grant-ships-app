import React from 'react';
import { MainSection, PageTitle, ProfileSection } from '../layout/Sections';
import {
  Avatar,
  Box,
  Center,
  Flex,
  Paper,
  SegmentedControl,
  Skeleton,
  Text,
  useMantineTheme,
} from '@mantine/core';
import { useBreakpoints, useTablet } from '../hooks/useBreakpoint';
import {
  Route,
  Routes,
  useLocation,
  useNavigate,
  useParams,
} from 'react-router-dom';
import {
  IconFileDescription,
  IconPennant,
  IconRoute,
} from '@tabler/icons-react';
import { getGrant } from '../queries/getGrant';
import { useQuery } from '@tanstack/react-query';

export const Grant = () => {
  const theme = useMantineTheme();
  const { isMobile } = useBreakpoints();

  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();
  const layout = location.pathname.split('/').pop();

  const { data, isLoading } = useQuery({
    queryKey: ['grant', id],
    queryFn: () => getGrant(id as string),
  });

  const { project, ship } = data || {};

  return (
    <MainSection maw={640}>
      <PageTitle title="Grant" />
      <TopSection
        projectImg={project?.metadata?.imgUrl}
        shipImg={ship?.profileMetadata?.imgUrl}
        isLoading={isLoading}
        shipName={ship?.name}
        projectName={project?.name}
      />
      <SegmentedControl
        value={layout || 'timeline'}
        size={isMobile ? 'sm' : 'md'}
        bg={theme.colors.dark[6]}
        data={[
          {
            value: 'timeline',
            label: (
              <Center style={{ gap: 8 }}>
                <IconRoute size={16} />
                <span>Timeline</span>
              </Center>
            ),
          },
          {
            value: 'application',
            label: (
              <Center style={{ gap: 8 }}>
                <IconFileDescription size={16} />
                <span>Application</span>
              </Center>
            ),
          },
          {
            value: 'milestones',
            label: (
              <Center style={{ gap: 8 }}>
                <IconPennant size={16} />
                <span>Milestones</span>
              </Center>
            ),
          },
        ]}
        onChange={(value) => navigate(`/grant/${id}/${value}`)}
      />
      <Routes>
        <Route path="/" element={<GrantTimeline />} />
        <Route path="application" element={<GrantApplication />} />
        <Route path="milestones" element={<GrantMilestones />} />
        <Route path="timeline" element={<GrantTimeline />} />
        <Route path="*" element={<GrantTimeline />} />
      </Routes>
    </MainSection>
  );
};

const TopSection = ({
  isLoading,
  projectName,
  shipName,
  shipImg,
  projectImg,
}: {
  isLoading: boolean;
  projectName?: string;
  shipName?: string;
  shipImg?: string;
  projectImg?: string;
}) => {
  const theme = useMantineTheme();
  const { isTablet, isMobile } = useBreakpoints();

  const avatarSize = isMobile ? 80 : 115;

  return (
    <Paper
      py="lg"
      px="md"
      mb={'lg'}
      bg={theme.colors.dark[6]}
      w={isTablet ? '100%' : 640}
    >
      <Flex
        align={isTablet ? 'flex-start' : 'center'}
        gap="md"
        direction={isTablet ? 'column' : 'row'}
      >
        <Avatar.Group spacing={'xl'}>
          <Avatar size={avatarSize} src={projectImg ? projectImg : null}>
            <Skeleton h={avatarSize} w={avatarSize} circle />
          </Avatar>
          <Avatar size={avatarSize} src={shipImg ? shipImg : null}>
            <Skeleton h={avatarSize} w={avatarSize} circle />
          </Avatar>
        </Avatar.Group>
        <Box>
          {isLoading ? (
            <Skeleton w={175} h={20} mb="sm" />
          ) : (
            <Text fz="xl" fw={600} c={theme.colors.dark[0]} mb={2}>
              Grant Partnership
            </Text>
          )}
          {isLoading ? (
            <Skeleton w={120} h={16} />
          ) : (
            <Text fz="sm" c={theme.colors.dark[2]}>
              {projectName} {'<>'} {shipName}
            </Text>
          )}
        </Box>
      </Flex>
    </Paper>
  );
};

const GrantTimeline = () => <Text>Grant</Text>;
const GrantApplication = () => <Text>Application</Text>;
const GrantMilestones = () => <Text>Milestones</Text>;
