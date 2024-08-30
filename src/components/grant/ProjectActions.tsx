import { useDisclosure } from '@mantine/hooks';
import { useGrant } from '../../hooks/useGrant';
import { GameStatus, GrantStatus } from '../../types/common';
import { Button, Group, Stack, Text } from '@mantine/core';
import { IconPencil, IconPlus } from '@tabler/icons-react';
import { ApplicationDrawer } from './ApplicationDrawer';
import { formatEther } from 'viem';
import { PostGrantDrawer } from './PostGrantDrawer';
import { Player } from '../../types/ui';
import { SubmitMilestoneDrawer } from './SubmitMilestoneDrawer';
import { MilestonesDrawer } from './MilestonesDrawer';

export const ProjectActions = () => {
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
    !grant ||
    (grant?.status != null && grant.status < GrantStatus.MilestonesApproved);

  const isMilestonePlanning =
    grant?.status != null &&
    grant.status >= GrantStatus.ApplicationApproved &&
    grant?.status < GrantStatus.MilestonesApproved;

  const areMilestonesLocked =
    grant?.status != null &&
    grant.status === GrantStatus.Allocated &&
    grant?.currentMilestones?.status === GameStatus.Accepted;

  const alreadyHasApplication = !!currentApplication;
  const alreadyHasMilestoneSet = !!grant?.currentMilestones;

  return (
    <>
      <Stack pos="fixed" top={'260px'} gap="sm">
        {isApplicationStage && alreadyHasApplication && (
          <Button
            variant={
              grant?.status && grant.status > GrantStatus.ApplicationApproved
                ? 'menu-fade'
                : 'menu'
            }
            leftSection={<IconPencil />}
            onClick={openApplication}
          >
            <Text>Application</Text>
          </Button>
        )}

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
        {areMilestonesLocked && (
          <Button
            variant="menu"
            leftSection={<IconPlus />}
            onClick={openMilestones}
          >
            <Text>Milestones</Text>
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

export const ProjectActionsMobile = () => {
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
    !grant ||
    (grant?.status != null && grant.status < GrantStatus.MilestonesApproved);

  const isMilestonePlanning =
    grant?.status != null &&
    grant.status >= GrantStatus.ApplicationApproved &&
    grant?.status < GrantStatus.MilestonesApproved;

  const areMilestonesLocked =
    grant?.status != null &&
    grant.status === GrantStatus.Allocated &&
    grant?.currentMilestones?.status === GameStatus.Accepted;

  const alreadyHasApplication = !!currentApplication;
  const alreadyHasMilestoneSet = !!grant?.currentMilestones;

  return (
    <>
      <Group gap="sm">
        {isApplicationStage && alreadyHasApplication && (
          <Button
            variant={
              grant?.status && grant.status > GrantStatus.ApplicationApproved
                ? 'menu-fade'
                : 'menu'
            }
            leftSection={<IconPencil size={14} />}
            onClick={openApplication}
            size="xs"
          >
            Application
          </Button>
        )}

        {isMilestonePlanning && (
          <Button
            variant="menu"
            size="xs"
            leftSection={
              alreadyHasMilestoneSet &&
              grant?.status !== GrantStatus.Allocated ? (
                <IconPencil size={14} />
              ) : (
                <IconPlus size={14} />
              )
            }
            onClick={openMilestones}
          >
            Milestones
          </Button>
        )}
        {areMilestonesLocked && (
          <Button
            variant="menu"
            size="xs"
            leftSection={<IconPlus size={14} />}
            onClick={openMilestones}
          >
            Milestones
          </Button>
        )}
        {isApplicationStage && !alreadyHasApplication && (
          <Button
            variant="menu"
            size="xs"
            leftSection={<IconPlus size={14} />}
            onClick={openApplication}
          >
            Application
          </Button>
        )}
        <Button
          size="xs"
          variant="menu"
          leftSection={<IconPlus size={14} />}
          onClick={openPost}
        >
          Message
        </Button>
      </Group>
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
