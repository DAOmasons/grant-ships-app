import { MainSection, PageTitle } from '../layout/Sections';
import {
  Button,
  Center,
  Flex,
  SegmentedControl,
  Stack,
  Text,
  useMantineTheme,
} from '@mantine/core';
import { useBreakpoints } from '../hooks/useBreakpoint';
import {
  Route,
  Routes,
  useLocation,
  useNavigate,
  useParams,
} from 'react-router-dom';
import {
  IconFileDescription,
  IconGitCommit,
  IconPencil,
  IconPennant,
  IconPlus,
  IconRoute,
} from '@tabler/icons-react';
import { Player } from '../types/ui';
import { TopSection } from '../components/grant/TopSection';
import { GrantContextProvider } from '../contexts/GrantContext';
import { useGrant } from '../hooks/useGrant';
import { GrantTimeline } from '../components/grant/GrantTimeline';
import { PostGrantDrawer } from '../components/grant/PostGrantDrawer';
import { useDisclosure } from '@mantine/hooks';
import { ApplicationDrawer } from '../components/grant/ApplicationDrawer';
import { GameStatus, GrantStatus } from '../types/common';
import { MilestonesDrawer } from '../components/grant/MilestonesDrawer';
import { useUserData } from '../hooks/useUserState';
import { FacilitatorApprovalDrawer } from '../components/grant/FacilitatorApprovalDrawer';
import { PageDrawer } from '../components/PageDrawer';
import { SubmitMilestoneDrawer } from '../components/grant/SubmitMilestoneDrawer';
import { formatEther, parseEther, weiUnits } from 'viem';
import { ProjectActions } from '../components/grant/ProjectActions';
import { FacilitatorActions } from '../components/grant/FacilitatorActions';
import { ShipActions } from '../components/grant/ShipActions';
import { GrantApplication } from '../components/grant/GrantApplication';
import { GrantMilestones } from '../components/grant/GrantMilestones';

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
            mb="xl"
            data={[
              {
                value: 'timeline',
                label: (
                  <Center style={{ gap: 8 }}>
                    <IconGitCommit size={16} />
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
  const { userData } = useUserData();

  const { isFacilitator } = userData || {};
  const { isProjectMember, isShipOperator } = useGrant();
  return (
    <Flex h="100%" pos="relative" style={{ flexGrow: 1 }}>
      {isFacilitator ? (
        <FacilitatorActions />
      ) : isShipOperator ? (
        <ShipActions />
      ) : isProjectMember ? (
        <ProjectActions />
      ) : null}
    </Flex>
  );
};
