import {
  Avatar,
  Box,
  Flex,
  Group,
  Text,
  Tooltip,
  useMantineTheme,
} from '@mantine/core';
import classes from './ProjectItems.module.css';
import { Fragment } from 'react';
import { IconEye, IconX } from '@tabler/icons-react';
import { IconCheck } from '@tabler/icons-react';
import { formatEther } from 'viem';
import { GAME_TOKEN } from '../../constants/gameSetup';
// import { DashGrant, PackedMilestoneData } from '../../resolvers/grantResolvers';
import { AlloStatus, GameStatus } from '../../types/common';
import { Link } from 'react-router-dom';
import { IconExclamationMark } from '@tabler/icons-react';

type Milestone = {
  percentage: number;
  status: GameStatus;
  index: number;
  id: string;
};

type MilestoneProgressProps = {
  onlyMilestones?: boolean;
  amount: bigint;
  shipName: string;
  shipAvatar: string;
  shipId: string;
  milestones?: Milestone[];
  //   grant: DashGrant;
};

const MilestoneStatusText: Record<number, string> = {
  [AlloStatus.None]: "This milestone hasn't been submitted yet",
  [AlloStatus.Pending]:
    'Milestone submitted! \n Awaiting a review from Ship Operators',
  [AlloStatus.Accepted]:
    'Ship Operators approved this milestone. \n Funds have sent.',
  [AlloStatus.Rejected]: 'Ship Operators have rejected this milestone',
} as const;

const getBarStyle = (status: GameStatus) => {
  if (status === GameStatus.None) return `${classes.bar} ${classes.bgIdle}`;
  if (status === GameStatus.Pending)
    return `${classes.bar} ${classes.bgInReview}`;
  if (status === GameStatus.Accepted)
    return `${classes.bar} ${classes.bgApproved}`;
  if (status === GameStatus.Rejected)
    return `${classes.bar} ${classes.bgRejected}`;
  return `${classes.bar}`;
};

const getCircleStyle = (status: GameStatus) => {
  if (status === GameStatus.None)
    return `${classes.statusIcon} ${classes.borderIdle}`;
  if (status === GameStatus.Pending)
    return `${classes.statusIcon} ${classes.borderInReview}`;
  if (status === GameStatus.Accepted)
    return `${classes.statusIcon} ${classes.borderApproved}`;
  if (status === GameStatus.Rejected)
    return `${classes.statusIcon} ${classes.borderRejected}`;
  return `${classes.statusIcon}`;
};

export const MilestoneProgress = ({
  amount,
  onlyMilestones,
  shipName,
  shipAvatar,
  shipId,
  milestones,
}: MilestoneProgressProps) => {
  const grantAmount = amount ? formatEther(amount) : 0;

  const amtCompleted = milestones
    ? milestones.filter((ms) => ms.status === GameStatus.Accepted).length
    : [];

  return (
    <Box>
      {!onlyMilestones && (
        <Group gap={6} mb={10} align="start">
          <Text fz="sm">
            <Text fz="sm" component="span" fw={600}>
              {grantAmount} {GAME_TOKEN.SYMBOL}{' '}
            </Text>
            funded by
          </Text>
          <Tooltip
            label={
              <Box p={8}>
                <Avatar src={shipAvatar} size={66} mb={'xs'} />
                <Text fz="sm">{shipName}</Text>
              </Box>
            }
          >
            <Avatar
              src={shipAvatar}
              size={20}
              component={Link}
              to={`/ship/${shipId}`}
            />
          </Tooltip>
        </Group>
      )}
      <MilestoneProgressSteps
        totalAmount={amount ? BigInt(amount) : 0n}
        steps={milestones}
      />
      <Text fz="xs" mt={8} opacity={0.8}>
        {amtCompleted.toString()}/{milestones?.length} Milestones distributed
      </Text>
    </Box>
  );
};

export const MilestoneProgressSteps = ({
  steps,
  totalAmount,
}: {
  totalAmount: bigint;
  steps?: Milestone[];
}) => {
  const theme = useMantineTheme();

  const getCircleContent = ({ status }: Milestone, index: number) => {
    if (status === GameStatus.None)
      return (
        <Text c={theme.colors.dark[3]} style={{ transform: 'translateY(1px)' }}>
          {index + 1}
        </Text>
      );
    if (status === GameStatus.Pending)
      return <IconEye size={16} color={theme.colors.violet[6]} />;
    if (status === GameStatus.Accepted)
      return <IconCheck size={16} color={theme.colors.blue[6]} />;
    if (status === GameStatus.Rejected)
      return <IconX size={16} color={theme.colors.red[6]} />;
  };
  return (
    <Flex w={237} className={classes.milestoneBox}>
      {steps?.map((step, index) => (
        <Fragment key={`milestone-circle-${index}`}>
          {index !== 0 && <Box className={getBarStyle(step.status)} />}
          <Tooltip
            label={
              <Box p={8}>
                <Group mb="xs" gap={6}>
                  <Text fz="sm" fw={600}>
                    Milestone {index + 1}
                  </Text>
                  {step.status !== GameStatus.None &&
                    getCircleContent(step, index)}
                </Group>

                <Text
                  fz="xs"
                  mb="xs"
                  opacity={0.8}
                  style={{ whiteSpace: 'pre-line' }}
                >
                  {MilestoneStatusText[step.status]}
                </Text>
                <Group mb="xs" gap={6}>
                  <Text fz="xs">
                    {formatEther(
                      (totalAmount * BigInt(step.percentage)) /
                        1000000000000000000n
                    )}{' '}
                    {GAME_TOKEN.SYMBOL}
                  </Text>
                  ·
                  <Text fz="xs">
                    {formatEther(BigInt(step.percentage) * BigInt(100))}% of
                    total grant.
                  </Text>
                </Group>
              </Box>
            }
          >
            <Flex className={getCircleStyle(step.status)}>
              {getCircleContent(step, index)}
            </Flex>
          </Tooltip>
        </Fragment>
      ))}
    </Flex>
  );
};
