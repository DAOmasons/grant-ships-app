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
  IconMessage,
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
import { PostGrantDrawer } from '../components/grant/PostGrantDrawer';
import { useDisclosure } from '@mantine/hooks';

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
        <ActionsPanel />
      </Flex>
    </GrantContextProvider>
  );
};

const ActionsPanel = () => {
  const { isProjectMember, isShipOperator } = useGrant();
  return (
    <Flex h="100%" pos="relative" style={{ flexGrow: 1 }}>
      {isProjectMember && <ProjectActions />}
      {isShipOperator && <ShipActions />}
    </Flex>
  );
};

const ShipActions = () => {
  const {} = useGrant();

  return (
    <>
      <Stack pos="fixed" top={'260px'} gap="sm">
        <Button variant="menu" leftSection={<IconMessage />} onClick={openPost}>
          <Text>Message</Text>
        </Button>
      </Stack>
      <PostGrantDrawer
        opened={postOpened}
        onClose={closePost}
        projectId={project?.id || ''}
        avatarImg={project?.metadata?.imgUrl || ''}
        avatarName={project?.name || ''}
        shipSrcAddress={ship?.shipContractAddress || ''}
        playerType={Player.Project}
        refetch={refetchGrant}
      />
    </>
  );
};

const ProjectActions = () => {
  const { project, ship, refetchGrant } = useGrant();
  const [postOpened, { open: openPost, close: closePost }] = useDisclosure();
  return (
    <>
      <Stack pos="fixed" top={'260px'} gap="sm">
        <Button variant="menu" leftSection={<IconFileDescription />}>
          <Text>Application</Text>
        </Button>
        <Button variant="menu" leftSection={<IconMessage />} onClick={openPost}>
          <Text>Message</Text>
        </Button>
      </Stack>
      <PostGrantDrawer
        opened={postOpened}
        onClose={closePost}
        projectId={project?.id || ''}
        avatarImg={project?.metadata?.imgUrl || ''}
        avatarName={project?.name || ''}
        shipSrcAddress={ship?.shipContractAddress || ''}
        playerType={Player.Project}
        refetch={refetchGrant}
      />
    </>
  );
};

const GrantApplication = () => <Text>Application</Text>;
const GrantMilestones = () => <Text>Milestones</Text>;
