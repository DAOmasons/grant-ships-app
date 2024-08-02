import {
  Box,
  Button,
  Divider,
  Group,
  Spoiler,
  Stack,
  Text,
  useMantineTheme,
} from '@mantine/core';
import {
  IconChevronDown,
  IconChevronUp,
  IconCircleCheck,
  IconClock,
  IconExclamationCircle,
  IconExternalLink,
  IconFileX,
  IconQuestionMark,
} from '@tabler/icons-react';
import { PlayerAvatar } from '../PlayerAvatar';
import { Player } from '../../types/ui';
import { useGrant } from '../../hooks/useGrant';
import { Content } from '@tiptap/react';
import { RTDisplay } from '../RTDisplay';
import { secondsToLongDate } from '../../utils/time';
import { formatEther } from 'viem';
import { GAME_TOKEN } from '../../constants/gameSetup';
import { SCAN_URL } from '../../constants/enpoints';
import { GameStatus } from '../../types/common';
import classes from '../../styles/Spoiler.module.css';
import { ApplicationVerdictControls } from './ApplicationVerdictControls';

export const ApplicationDisplay = ({
  amountRequested,
  receivingAddress,
  dueDate,
  rtContent,
  status,
  id,
}: {
  id: string;
  amountRequested: string;
  receivingAddress: string;
  dueDate: number;
  rtContent: Content;
  status: GameStatus;
}) => {
  const theme = useMantineTheme();
  const { project, ship, grant, isShipOperator } = useGrant();

  const formattedTime = secondsToLongDate(dueDate);
  const formattedAmount = formatEther(BigInt(amountRequested));

  const isCurrentDraft = grant?.currentApplication?.id === id;

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
      ? 'Application Not Approved'
      : !isCurrentDraft
        ? 'Inactive: Previous Draft'
        : status === GameStatus.Pending
          ? 'Application in Review'
          : status === GameStatus.Accepted
            ? 'Application Approved'
            : 'Unknown Status';

  const isOldOrRejected = !isCurrentDraft || status === GameStatus.Rejected;

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
      <Box pl={50} mb="lg">
        <Group gap={8} mb={'lg'}>
          <PlayerAvatar
            playerType={Player.Project}
            name={project?.name}
            display="grantTimeline"
            imgUrl={project?.metadata?.imgUrl}
          />
          <Text size="sm" opacity={0.8}>
            submitted a grant application to {ship?.name}
          </Text>
        </Group>
        <Divider variant="dotted" mb="lg" />
        <Stack gap="sm" mb="sm">
          <Box>
            <Text size="sm" fw={700} mb={4}>
              Amount Requested
            </Text>
            <Text size="sm" td={isOldOrRejected ? 'line-through' : undefined}>
              {formattedAmount} {GAME_TOKEN.SYMBOL}
            </Text>
          </Box>
          <Box>
            <Text size="sm" fw={700}>
              Expected Delivery
            </Text>
            <Text size="sm" td={isOldOrRejected ? 'line-through' : undefined}>
              {formattedTime}
            </Text>
          </Box>
          <Box>
            <Text size="sm" fw={700}>
              Send Address
            </Text>
            <Text
              td={isOldOrRejected ? 'line-through' : 'underline'}
              size="sm"
              component="a"
              href={`${SCAN_URL}address/${receivingAddress}`}
              target="_blank"
              c={theme.colors.blue[3]}
              rel="noopener noreferrer"
            >
              {receivingAddress} <IconExternalLink size={14} />
            </Text>
          </Box>
        </Stack>
        {isOldOrRejected ? (
          <Spoiler
            hideLabel={<IconChevronUp stroke={1} />}
            showLabel={<IconChevronDown stroke={1} />}
            classNames={{
              root: classes.embedTextBox,
              control: classes.embedTextControl,
            }}
            maxHeight={40}
          >
            <RTDisplay content={rtContent} minified />
          </Spoiler>
        ) : (
          <RTDisplay content={rtContent} minified />
        )}
        {isShipOperator && status === GameStatus.Pending && isCurrentDraft && (
          <ApplicationVerdictControls />
        )}
      </Box>
      <Divider mb="lg" />
    </Box>
  );
};
