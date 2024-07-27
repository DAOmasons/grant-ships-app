import React from 'react';
import { MainSection, PageTitle, ProfileSection } from '../layout/Sections';
import {
  Avatar,
  Box,
  Center,
  Flex,
  Group,
  Paper,
  SegmentedControl,
  Text,
  useMantineTheme,
} from '@mantine/core';
import { useTablet } from '../hooks/useBreakpoint';
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

export const Grant = () => {
  const theme = useMantineTheme();
  const isTablet = useTablet();

  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();
  const layout = location.pathname.split('/').pop();

  return (
    <MainSection maw={640}>
      <PageTitle title="Grant" />
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
            <Avatar size={115} />
            <Avatar size={115} />
          </Avatar.Group>
          <Box>
            <Text fz="xl" fw={600} c={theme.colors.dark[0]} mb={2}>
              Grant Partnership
            </Text>
            <Text fz="sm" c={theme.colors.dark[2]}>
              Thrive Protocol {'<>'} DAO Masons
            </Text>
          </Box>
        </Flex>
      </Paper>
      <SegmentedControl
        value={layout || 'timeline'}
        size="md"
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

const GrantTimeline = () => <Text>Grant</Text>;
const GrantApplication = () => <Text>Application</Text>;
const GrantMilestones = () => <Text>Milestones</Text>;
