import { useMemo } from 'react';
import { GrantUpdate } from '../../queries/getGrant';
import {
  Box,
  Divider,
  Group,
  Stack,
  Text,
  useMantineTheme,
} from '@mantine/core';
import { GameStatus } from '../../types/common';
import {
  IconCircleCheck,
  IconClock,
  IconExclamationCircle,
  IconQuestionMark,
} from '@tabler/icons-react';
import { useGrant } from '../../hooks/useGrant';
import { PlayerAvatar } from '../PlayerAvatar';
import { Player } from '../../types/ui';
import { formatEther } from 'viem';
import { secondsToLongDate } from '../../utils/time';
import { RTDisplay } from '../RTDisplay';
import { MilestoneVerdictControls } from './MilestoneVerdictControls';
import { useMobile } from '../../hooks/useBreakpoint';

export const MilestoneDisplay = ({
  updateData,
}: {
  updateData: GrantUpdate;
}) => {
  const theme = useMantineTheme();
  const isMobile = useMobile();

  const { currentMilestoneSet, project, isShipOperator } = useGrant();

  const milestoneId = updateData.id.split(':')[0];

  const currentMilestone = useMemo(() => {
    if (!currentMilestoneSet || !currentMilestoneSet) return null;
    return currentMilestoneSet?.resolvedMilestones.find(
      (milestone) => milestone.index === Number(milestoneId)
    );
  }, [milestoneId, currentMilestoneSet]);

  const status = currentMilestone?.status;

  const color =
    status === GameStatus.Rejected
      ? theme.colors.red[6]
      : status === GameStatus.Pending
        ? theme.colors.yellow[6]
        : status === GameStatus.Accepted
          ? theme.colors.green[6]
          : theme.colors.dark[2];

  const tagIcon =
    status === GameStatus.Rejected ? (
      <IconExclamationCircle size={18} color={color} />
    ) : status === GameStatus.Pending ? (
      <IconClock size={18} color={color} />
    ) : status === GameStatus.Accepted ? (
      <IconCircleCheck size={18} color={color} />
    ) : (
      <IconQuestionMark size={18} color={color} />
    );

  const applicationText =
    status === GameStatus.Rejected
      ? 'Milestone Not Approved'
      : status === GameStatus.Pending
        ? 'Milestone in Review'
        : status === GameStatus.Accepted
          ? 'Milestone Approved'
          : 'Unknown Status';

  return (
    <Box>
      <Box
        py={6}
        px={12}
        style={{ borderRadius: '4px' }}
        display="inline-block"
        bg={theme.colors.dark[5]}
        mb="md"
      >
        <Group gap={6}>
          {tagIcon}
          <Text fz="sm" c={color}>
            {applicationText}
          </Text>
        </Group>
      </Box>
      <Box pl={isMobile ? 0 : 50} mb="lg">
        <Group gap="8" mb="lg">
          <PlayerAvatar
            playerType={Player.Project}
            name={project?.name}
            display="grantTimeline"
            imgUrl={project?.metadata?.imgUrl}
          />
          <Text size="sm" opacity={0.9}>
            submitted milestone {Number(milestoneId) + 1}
          </Text>
        </Group>
        <Divider variant="dotted" mb="lg" />
        <Stack>
          <Box>
            <Text fz="sm" fw={700} mb={4}>
              Payment Percentage
            </Text>
            <Text fz="sm">
              {Number(formatEther(currentMilestone?.percentage)) * 100}%
            </Text>
          </Box>
          <Box>
            <Text fz="sm" fw={700} mb={4}>
              Expected Delivery
            </Text>
            <Text fz="sm">
              {currentMilestone?.milestoneContent.date
                ? secondsToLongDate(currentMilestone?.milestoneContent.date)
                : ''}
            </Text>
          </Box>
          <Box>
            <Text fz="sm" fw={700} mb={4}>
              Description
            </Text>
            <Text fz="sm" className="ws-pre-wrap">
              {currentMilestone?.milestoneContent.milestoneDetails}
            </Text>
          </Box>
          <Box>
            <Text fz="sm" fw={700} mb={4}>
              Grantee Comments
            </Text>
            <Box fz="sm">
              <RTDisplay content={updateData.updateContent} minified />
            </Box>
          </Box>
        </Stack>
        {milestoneId && isShipOperator && status === GameStatus.Pending && (
          <MilestoneVerdictControls milestoneId={milestoneId} />
        )}
      </Box>
      <Divider mb="lg" />
    </Box>
  );
};
