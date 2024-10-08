import {
  Box,
  Divider,
  Group,
  Spoiler,
  Stack,
  Text,
  useMantineTheme,
} from '@mantine/core';
import { useGrant } from '../../hooks/useGrant';
import { GameStatus } from '../../types/common';
import {
  IconChevronDown,
  IconChevronUp,
  IconCircleCheck,
  IconClock,
  IconExclamationCircle,
  IconFileX,
  IconQuestionMark,
} from '@tabler/icons-react';
import { MilestonesDisplay } from '../../queries/getGrant';
import { PlayerAvatar } from '../PlayerAvatar';
import { Player } from '../../types/ui';
import { formatEther } from 'viem';
import {
  secondsToLongDate,
  secondsToShortRelativeTime,
} from '../../utils/time';
import { MilestoneSetVerdictControls } from './MilestoneSetVerdictControls';
import { useMemo } from 'react';
import classes from '../../styles/Spoiler.module.css';
import { useMobile } from '../../hooks/useBreakpoint';

export const MilestoneSetDisplay = ({ doc }: { doc: MilestonesDisplay }) => {
  const theme = useMantineTheme();
  const isMobile = useMobile();

  const { status, id, resolvedMilestones } = doc;
  const { project, grant, isShipOperator } = useGrant();

  const isCurrentDraft = grant?.currentMilestones?.id === id;

  const time = useMemo(() => {
    if (!doc.timestamp) return '';
    return secondsToShortRelativeTime(doc.timestamp);
  }, [doc]);

  const color =
    status === GameStatus.Rejected
      ? theme.colors.red[6]
      : !isCurrentDraft
        ? theme.colors.dark[2]
        : status === GameStatus.Pending
          ? theme.colors.yellow[6]
          : status === GameStatus.Accepted
            ? theme.colors.green[6]
            : theme.colors.dark[2];

  const tagIcon =
    status === GameStatus.Rejected ? (
      <IconExclamationCircle size={18} color={color} />
    ) : !isCurrentDraft ? (
      <IconFileX size={18} color={color} />
    ) : status === GameStatus.Pending ? (
      <IconClock size={18} color={color} />
    ) : status === GameStatus.Accepted ? (
      <IconCircleCheck size={18} color={color} />
    ) : (
      <IconQuestionMark size={18} color={color} />
    );

  const applicationText =
    status === GameStatus.Rejected
      ? 'Milestones Not Approved'
      : !isCurrentDraft
        ? 'Inactive Draft'
        : status === GameStatus.Pending
          ? 'Milestones in Review'
          : status === GameStatus.Accepted
            ? 'Milestones Approved'
            : 'Unknown Status';

  const isOldOrRejected = !isCurrentDraft || status === GameStatus.Rejected;

  const milestoneUI = useMemo(() => {
    return resolvedMilestones?.map((milestone, index) => (
      <Stack gap="sm" mb="xl" key={milestone.id}>
        <Text fw={600}>Milestone {index + 1}</Text>
        <Box>
          <Text size="sm" fw={700} mb={4}>
            Payment Percentage
          </Text>
          <Text size="sm" td={isOldOrRejected ? 'line-through' : undefined}>
            {Math.round(
              Number(formatEther(milestone.percentage as bigint)) * 100
            )}
            %
          </Text>
        </Box>
        <Box>
          <Text size="sm" fw={700} mb={4}>
            Expected Delivery
          </Text>
          <Text size="sm" td={isOldOrRejected ? 'line-through' : undefined}>
            {secondsToLongDate(milestone.milestoneContent.date)}
          </Text>
        </Box>
        <Box>
          <Text size="sm" fw={700} mb={4}>
            Description
          </Text>
          <Text
            size="sm"
            td={isOldOrRejected ? 'line-through' : undefined}
            className="ws-pre-wrap"
          >
            {milestone.milestoneContent.milestoneDetails}
          </Text>
        </Box>
      </Stack>
    ));
  }, [resolvedMilestones, isOldOrRejected]);

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
          <Text fz={'sm'} c={color}>
            {applicationText}
          </Text>
        </Group>
      </Box>
      <Box pl={isMobile ? 0 : 50} mb="lg">
        <Group gap={8} mb={'lg'}>
          <PlayerAvatar
            playerType={Player.Project}
            name={project?.name}
            display="grantTimeline"
            imgUrl={project?.metadata?.imgUrl}
          />
          <Text fz="sm" opacity={0.8}>
            submitted their milestones
          </Text>
          {time && (
            <>
              <Text fz="sm" opacity={0.8}>
                ·
              </Text>
              <Text fz="sm" opacity={0.8}>
                {time}
              </Text>
            </>
          )}
        </Group>
        <Divider variant="dotted" mb="lg" />
        {isOldOrRejected ? (
          <Spoiler
            hideLabel={<IconChevronUp stroke={1} />}
            showLabel={<IconChevronDown stroke={1} />}
            classNames={{
              root: classes.embedTextBox,
              control: classes.embedTextControl,
            }}
            maxHeight={80}
          >
            {milestoneUI}
          </Spoiler>
        ) : (
          milestoneUI
        )}

        {status === GameStatus.Pending && isShipOperator && isCurrentDraft && (
          <MilestoneSetVerdictControls />
        )}
      </Box>
      <Divider mb="lg" />
    </Box>
  );
};
