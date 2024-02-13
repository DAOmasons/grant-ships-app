import { Box, Flex, Group, Text, useMantineTheme } from '@mantine/core';
import { MilestoneStatus, MilestoneStep } from '../../types/ui';
import classes from './ProjectItems.module.css';
import { useMemo } from 'react';
import { IconEye, IconX } from '@tabler/icons-react';
import { IconCheck } from '@tabler/icons-react';
import { formatEther, isAddress } from 'viem';
import { GAME_TOKEN } from '../../constants/gameSetup';
import { AddressAvatar } from '../AddressAvatar';

type MilestoneProgressProps = {
  steps: MilestoneStep[];
  fundedBy: string;
};

const getBarStyle = ({ status }: MilestoneStep) => {
  if (status === MilestoneStatus.Idle)
    return `${classes.bar} ${classes.bgIdle}`;
  if (status === MilestoneStatus.InReview)
    return `${classes.bar} ${classes.bgInReview}`;
  if (status === MilestoneStatus.Approved)
    return `${classes.bar} ${classes.bgApproved}`;
  if (status === MilestoneStatus.Rejected)
    return `${classes.bar} ${classes.bgRejected}`;
  return `${classes.bar}`;
};

const getCircleStyle = ({ status }: MilestoneStep) => {
  if (status === MilestoneStatus.Idle)
    return `${classes.statusIcon} ${classes.borderIdle}`;
  if (status === MilestoneStatus.InReview)
    return `${classes.statusIcon} ${classes.borderInReview}`;
  if (status === MilestoneStatus.Approved)
    return `${classes.statusIcon} ${classes.borderApproved}`;
  if (status === MilestoneStatus.Rejected)
    return `${classes.statusIcon} ${classes.borderRejected}`;
  return `${classes.statusIcon}`;
};

export const MilestoneProgress = ({
  steps,
  fundedBy,
}: MilestoneProgressProps) => {
  const totalAmount = useMemo(() => {
    return formatEther(steps.reduce((acc, step) => acc + step.amount, 0n));
  }, [steps]);

  const amtAccepted = steps.filter(
    (step) => step.status === MilestoneStatus.Approved
  ).length;
  return (
    <Box>
      <Group gap={5} mb={6}>
        <Text fz="sm">
          <Text fz="sm" component="span" fw={600}>
            {totalAmount} {GAME_TOKEN.SYMBOL}
          </Text>{' '}
          funded by
        </Text>
        {isAddress(fundedBy) && (
          <AddressAvatar address={fundedBy} size={18} displayText={false} />
        )}
      </Group>
      <MilestoneProgressSteps steps={steps} />
      <Text fz="xs" mt={6} opacity={0.8}>
        {amtAccepted.toString()}/{steps.length} Milestones distributed
      </Text>
    </Box>
  );
};

export const MilestoneProgressSteps = ({
  steps,
}: {
  steps: MilestoneStep[];
}) => {
  const theme = useMantineTheme();

  const getCircleContent = ({ status }: MilestoneStep, index: number) => {
    if (status === MilestoneStatus.Idle)
      return (
        <Text c={theme.colors.dark[3]} style={{ transform: 'translateY(1px)' }}>
          {index + 1}
        </Text>
      );
    if (status === MilestoneStatus.InReview)
      return <IconEye size={16} color={theme.colors.violet[6]} />;
    if (status === MilestoneStatus.Approved)
      return <IconCheck size={16} color={theme.colors.blue[6]} />;
    if (status === MilestoneStatus.Rejected)
      return <IconX size={16} color={theme.colors.red[6]} />;
  };
  return (
    <Flex w={237} className={classes.milestoneBox}>
      {steps.map((step, index) => (
        <>
          {index !== 0 && (
            <Box key={`milestone-bar-${index}`} className={getBarStyle(step)} />
          )}
          <Flex
            key={`milestone-step-${index}`}
            className={getCircleStyle(step)}
          >
            {getCircleContent(step, index)}
          </Flex>
        </>
      ))}
    </Flex>
  );
};
