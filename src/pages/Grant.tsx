import { MainSection, PageTitle } from '../layout/Sections';
import {
  Center,
  Flex,
  Group,
  SegmentedControl,
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
  IconPennant,
} from '@tabler/icons-react';
import { TopSection } from '../components/grant/TopSection';
import { GrantContextProvider } from '../contexts/GrantContext';
import { useGrant } from '../hooks/useGrant';
import { GrantTimeline } from '../components/grant/GrantTimeline';
import { useUserData } from '../hooks/useUserState';
import {
  ProjectActions,
  ProjectActionsMobile,
} from '../components/grant/ProjectActions';
import {
  FacActionsMobile,
  FacilitatorActions,
} from '../components/grant/FacilitatorActions';
import {
  ShipActions,
  ShipActionsMobile,
} from '../components/grant/ShipActions';
import { GrantApplication } from '../components/grant/GrantApplication';
import { GrantMilestones } from '../components/grant/GrantMilestones';
import { useMediaQuery } from '@mantine/hooks';

export const Grant = () => {
  const theme = useMantineTheme();
  const { isMobile } = useBreakpoints();

  const isObstructed = useMediaQuery(`(max-width: 1064px`);

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
          {isObstructed && <ActionsPanelMobile />}

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
        {!isObstructed && <ActionsPanel />}
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

const ActionsPanelMobile = () => {
  const { userData } = useUserData();

  const { isFacilitator } = userData || {};
  const { isProjectMember, isShipOperator } = useGrant();
  return (
    <Group mb="md">
      {isFacilitator ? (
        <FacActionsMobile />
      ) : isShipOperator ? (
        <ShipActionsMobile />
      ) : isProjectMember ? (
        <ProjectActionsMobile />
      ) : null}
    </Group>
  );
};
