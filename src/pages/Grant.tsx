import React from 'react';
import { MainSection, PageTitle, ProfileSection } from '../layout/Sections';
import {
  ActionIcon,
  Avatar,
  Box,
  Button,
  Center,
  Flex,
  Paper,
  SegmentedControl,
  Skeleton,
  Stack,
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
  IconPlayerPlay,
  IconRoute,
} from '@tabler/icons-react';
import { FeedCard } from '../components/feed/FeedCard';
import { DAO_MASONS } from '../constants/gameSetup';
import { Player } from '../types/ui';
import { getGatewayUrl } from '../utils/ipfs/get';
import { TopSection } from '../components/grant/TopSection';
import { GrantContextProvider } from '../contexts/GrantContext';
import { useGrant } from '../hooks/useGrant';
import { GrantTimeline } from '../components/grant/GrantTimeline';

export const Grant = () => {
  const theme = useMantineTheme();
  const { isMobile } = useBreakpoints();

  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();
  const layout = location.pathname.split('/').pop();

  return (
    <GrantContextProvider grantId={id as string}>
      <Flex pos="relative">
        <MainSection maw={640}>
          <PageTitle title="Grant" />
          <TopSection />
          <SegmentedControl
            value={layout || 'timeline'}
            size={isMobile ? 'sm' : 'md'}
            bg={theme.colors.dark[6]}
            mb="lg"
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
        <Flex h="100%" pos="relative" style={{ flexGrow: 1 }}>
          <ProjectActions />
        </Flex>
      </Flex>
    </GrantContextProvider>
  );
};
const ProjectActions = () => {
  const theme = useMantineTheme();
  return (
    <Stack pos="fixed" top="45%" gap="sm">
      <Button
        leftSection={
          <IconPlayerPlay style={{ transform: 'translateY(-1px)' }} />
        }
        variant="menu"
      >
        <Text>Start Grant</Text>
      </Button>
      <Button variant="menu" leftSection={<IconFileDescription />}>
        <Text>Application</Text>
      </Button>
    </Stack>
  );
};

const GrantApplication = () => <Text>Application</Text>;
const GrantMilestones = () => <Text>Milestones</Text>;
