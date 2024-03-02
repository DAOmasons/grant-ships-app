import { Box, Flex, Group, Text, useMantineTheme } from '@mantine/core';
import classes from './ProjectItems.module.css';
import { Fragment } from 'react';
import { IconEye, IconX } from '@tabler/icons-react';
import { IconCheck } from '@tabler/icons-react';
import { formatEther, isAddress } from 'viem';
import { GAME_TOKEN } from '../../constants/gameSetup';
import { AddressAvatar } from '../AddressAvatar';
import { DashGrant, PackedMilestoneData } from '../../resolvers/grantResolvers';
import { AlloStatus } from '../../types/common';

type MilestoneProgressProps = {
  fundedBy: string;
  grant: DashGrant;
};

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

export const MilestoneProgress = ({
  fundedBy,
  grant,
}: MilestoneProgressProps) => {
  const grantAmount = grant.applicationData.grantAmount
    ? formatEther(grant.applicationData.grantAmount)
    : 0;

  if (!grant.milestones) return;

  const amtCompleted = grant.milestones?.filter(
    (ms) => ms.milestoneStatus === AlloStatus.Accepted
  ).length;

  return (
    <Box>
      <Group gap={5} mb={10}>
        <Text fz="sm">
          <Text fz="sm" component="span" fw={600}>
            {grantAmount} {GAME_TOKEN.SYMBOL}{' '}
          </Text>
          funded by
        </Text>
        {isAddress(fundedBy) && (
          <AddressAvatar address={fundedBy} size={18} displayText={false} />
        )}
      </Group>
      <MilestoneProgressSteps steps={grant.milestones} />
      <Text fz="xs" mt={8} opacity={0.8}>
        {amtCompleted.toString()}/{grant.milestones.length} Milestones
        distributed
      </Text>
    </Box>
  );
};

export const MilestoneProgressSteps = ({
  steps,
}: {
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
          <Flex className={getCircleStyle(step)}>
            {getCircleContent(step, index)}
          </Flex>
        </Fragment>
      ))}
    </Flex>
  );
};
