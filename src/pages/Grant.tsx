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

const FacilitatorActions = () => {
  const [approvalOpened, { open: openApprove, close: closeApprove }] =
    useDisclosure();
  return (
    <>
      <Stack pos="fixed" top={'260px'} gap="sm">
        <Button variant="menu" leftSection={<IconPlus />} onClick={openApprove}>
          <Text>Review Grantee</Text>
        </Button>
      </Stack>
      <FacilitatorApprovalDrawer
        opened={approvalOpened}
        onClose={closeApprove}
      />
    </>
  );
};

const ShipActions = () => {
  const { refetchGrant, project, ship } = useGrant();
  const [postOpened, { open: openPost, close: closePost }] = useDisclosure();

  return (
    <>
      <Stack pos="fixed" top={'260px'} gap="sm">
        <Button variant="menu" leftSection={<IconPlus />} onClick={openPost}>
          <Text>Message</Text>
        </Button>
      </Stack>
      <PostGrantDrawer
        opened={postOpened}
        onClose={closePost}
        projectId={project?.id || ''}
        avatarImg={ship?.profileMetadata?.imgUrl || ''}
        avatarName={ship?.name || ''}
        shipSrcAddress={ship?.shipContractAddress || ''}
        playerType={Player.Ship}
        refetch={refetchGrant}
      />
    </>
  );
};

const ProjectActions = () => {
  const {
    project,
    ship,
    refetchGrant,
    applicationTemplate,
    grant,
    currentApplication,
  } = useGrant();
  const [postOpened, { open: openPost, close: closePost }] = useDisclosure();
  const [
    applicationOpened,
    { open: openApplication, close: closeApplication },
  ] = useDisclosure();
  const [milestonesOpened, { open: openMilestones, close: closeMilestones }] =
    useDisclosure();

  const isApplicationStage =
    !grant || (grant?.status && grant.status < GrantStatus.ApplicationApproved);
  const isMilestonePlanning =
    grant?.status &&
    grant.status >= GrantStatus.ApplicationApproved &&
    grant?.status <= GrantStatus.Allocated;

  const areMilestonesLocked =
    grant?.status &&
    grant.status === GrantStatus.Allocated &&
    grant?.currentMilestones?.status === GameStatus.Accepted;

  const alreadyHasApplication = !!currentApplication;
  const alreadyHasMilestoneSet = !!grant?.currentMilestones;
  const hasSetButNotLockedMilestones =
    alreadyHasMilestoneSet && !areMilestonesLocked;

  return (
    <>
      <Stack pos="fixed" top={'260px'} gap="sm">
        {isMilestonePlanning && (
          <Button
            variant="menu"
            leftSection={
              alreadyHasMilestoneSet &&
              grant?.status !== GrantStatus.Allocated ? (
                <IconPencil />
              ) : (
                <IconPlus />
              )
            }
            onClick={openMilestones}
          >
            <Text>Milestones</Text>
          </Button>
        )}
        {isApplicationStage && alreadyHasApplication && (
          <Button
            variant="menu"
            leftSection={<IconPencil />}
            onClick={openApplication}
          >
            <Text>Resubmit Application</Text>
          </Button>
        )}

        {isApplicationStage && !alreadyHasApplication && (
          <Button
            variant="menu"
            leftSection={<IconPlus />}
            onClick={openApplication}
          >
            <Text>Application</Text>
          </Button>
        )}
        <Button variant="menu" leftSection={<IconPlus />} onClick={openPost}>
          <Text>Message</Text>
        </Button>
      </Stack>
      {alreadyHasApplication ? (
        <ApplicationDrawer
          key={`application-drawer-${currentApplication?.id}`}
          opened={applicationOpened}
          onClose={closeApplication}
          content={currentApplication?.content?.content}
          initialDueDate={
            new Date(currentApplication?.content.dueDate * 1000 || '')
          }
          initialAmount={
            currentApplication?.amount
              ? formatEther(currentApplication?.amount)
              : ''
          }
          initialSendAddress={currentApplication?.receivingAddress}
        />
      ) : (
        <ApplicationDrawer
          key={`application-drawer-new`}
          opened={applicationOpened}
          onClose={closeApplication}
          content={applicationTemplate}
        />
      )}
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
      {areMilestonesLocked ? (
        <SubmitMilestoneDrawer
          opened={milestonesOpened}
          onClose={closeMilestones}
        />
      ) : (
        <MilestonesDrawer opened={milestonesOpened} onClose={closeMilestones} />
      )}
    </>
  );
};

const GrantApplication = () => <Text>Application</Text>;
const GrantMilestones = () => <Text>Milestones</Text>;
