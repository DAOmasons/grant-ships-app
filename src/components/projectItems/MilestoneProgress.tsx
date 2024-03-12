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
import { DashGrant, PackedMilestoneData } from '../../resolvers/grantResolvers';
import { AlloStatus } from '../../types/common';
import { Link } from 'react-router-dom';

type MilestoneProgressProps = {
  fundedBy: string;
  grant: DashGrant;
};

const MilestoneStatusText: Record<number, string> = {
  [AlloStatus.None]: "This milestone hasn't been submitted yet",
  [AlloStatus.Pending]:
    'Milestone submitted! \n Awaiting a review from Ship Operators',
  [AlloStatus.Accepted]:
    'Ship Operators approved this milestone. \n Funds have sent.',
  [AlloStatus.Rejected]: 'Ship Operators have rejected this milestone',
} as const;

const getBarStyle = ({ milestoneStatus }: PackedMilestoneData) => {
  if (milestoneStatus === AlloStatus.None)
    return `${classes.bar} ${classes.bgIdle}`;
  if (milestoneStatus === AlloStatus.Pending)
    return `${classes.bar} ${classes.bgInReview}`;
  if (milestoneStatus === AlloStatus.Accepted)
    return `${classes.bar} ${classes.bgApproved}`;
  if (milestoneStatus === AlloStatus.Rejected)
    return `${classes.bar} ${classes.bgRejected}`;
  return `${classes.bar}`;
};

const getCircleStyle = ({ milestoneStatus }: PackedMilestoneData) => {
  if (milestoneStatus === AlloStatus.None)
    return `${classes.statusIcon} ${classes.borderIdle}`;
  if (milestoneStatus === AlloStatus.Pending)
    return `${classes.statusIcon} ${classes.borderInReview}`;
  if (milestoneStatus === AlloStatus.Accepted)
    return `${classes.statusIcon} ${classes.borderApproved}`;
  if (milestoneStatus === AlloStatus.Rejected)
    return `${classes.statusIcon} ${classes.borderRejected}`;
  return `${classes.statusIcon}`;
};

export const MilestoneProgress = ({ grant }: MilestoneProgressProps) => {
  const grantAmount = grant.applicationData.grantAmount
    ? formatEther(grant.applicationData.grantAmount)
    : 0;

  if (!grant.milestones)
    return (
      <>
        <Box>
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
                  <Avatar src={grant.shipMetadata.imgUrl} size={66} mb={'xs'} />
                  <Text>{grant.shipMetadata.name}</Text>
                </Box>
              }
            >
              <Avatar
                src={grant.shipMetadata.imgUrl}
                size={20}
                component={Link}
                to={`/ship/${grant.shipId.id}`}
              />
            </Tooltip>
          </Group>
          <Text fz="xs">Awaiting Milestones</Text>
        </Box>
      </>
    );

  const amtCompleted = grant.milestones
    ? grant.milestones.filter(
        (ms) => ms.milestoneStatus === AlloStatus.Accepted
      ).length
    : [];

  return (
    <Box>
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
              <Avatar src={grant.shipMetadata.imgUrl} size={66} mb={'xs'} />
              <Text fz="sm">{grant.shipMetadata.name}</Text>
            </Box>
          }
        >
          <Avatar
            src={grant.shipMetadata.imgUrl}
            size={20}
            component={Link}
            to={`/ship/${grant.shipId.id}`}
          />
        </Tooltip>
      </Group>
      <MilestoneProgressSteps
        totalAmount={grant.applicationData.grantAmount}
        steps={grant.milestones}
      />
      <Text fz="xs" mt={8} opacity={0.8}>
        {amtCompleted.toString()}/{grant.milestones.length} Milestones
        distributed
      </Text>
    </Box>
  );
};

export const MilestoneProgressSteps = ({
  steps,
  totalAmount,
}: {
  totalAmount: bigint;
  steps: PackedMilestoneData[];
}) => {
  const theme = useMantineTheme();

  const getCircleContent = (
    { milestoneStatus }: PackedMilestoneData,
    index: number
  ) => {
    if (milestoneStatus === AlloStatus.None)
      return (
        <Text c={theme.colors.dark[3]} style={{ transform: 'translateY(1px)' }}>
          {index + 1}
        </Text>
      );
    if (milestoneStatus === AlloStatus.Pending)
      return <IconEye size={16} color={theme.colors.violet[6]} />;
    if (milestoneStatus === AlloStatus.Accepted)
      return <IconCheck size={16} color={theme.colors.blue[6]} />;
    if (milestoneStatus === AlloStatus.Rejected)
      return <IconX size={16} color={theme.colors.red[6]} />;
  };
  return (
    <Flex w={237} className={classes.milestoneBox}>
      {steps.map((step, index) => (
        <Fragment key={`milestone-circle-${index}`}>
          {index !== 0 && <Box className={getBarStyle(step)} />}
          <Tooltip
            label={
              <Box p={8}>
                <Group mb="xs" gap={6}>
                  <Text fz="sm" fw={600}>
                    Milestone {index + 1}
                  </Text>
                  {step.milestoneStatus !== AlloStatus.None &&
                    getCircleContent(step, index)}
                </Group>

                <Text
                  fz="xs"
                  mb="xs"
                  opacity={0.8}
                  style={{ whiteSpace: 'pre-line' }}
                >
                  {MilestoneStatusText[step.milestoneStatus]}
                </Text>
                <Group mb="xs" gap={6}>
                  <Text fz="xs">
                    {formatEther(
                      (totalAmount * step.amountPercentage) /
                        1000000000000000000n
                    )}{' '}
                    {GAME_TOKEN.SYMBOL}
                  </Text>
                  ·
                  <Text fz="xs">
                    {formatEther(step.amountPercentage * BigInt(100))}% of total
                    grant.
                  </Text>
                </Group>
              </Box>
            }
          >
            <Flex className={getCircleStyle(step)}>
              {getCircleContent(step, index)}
            </Flex>
          </Tooltip>
        </Fragment>
      ))}
    </Flex>
  );
};
