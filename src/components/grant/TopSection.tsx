import {
  Avatar,
  Box,
  Flex,
  Group,
  Paper,
  Skeleton,
  Text,
  Tooltip,
  useMantineTheme,
} from '@mantine/core';
import { useBreakpoints } from '../../hooks/useBreakpoint';
import { useGrant } from '../../hooks/useGrant';
import { IconCircleCheck, IconExclamationCircle } from '@tabler/icons-react';
import { ReactNode } from 'react';
import { GrantStatus } from '../../types/common';

export const TopSection = () => {
  const { project, ship, isLoadingGrant } = useGrant();
  const theme = useMantineTheme();
  const { isTablet, isMobile } = useBreakpoints();

  const avatarSize = isMobile ? 80 : 115;

  const shipImg = ship?.profileMetadata?.imgUrl;
  const projectImg = project?.metadata?.imgUrl;
  const shipName = ship?.name;
  const projectName = project?.name;

  return (
    <Paper
      py="lg"
      px="md"
      mb={'lg'}
      bg={theme.colors.dark[6]}
      w={isTablet ? '100%' : 600}
    >
      <Flex
        align={isTablet ? 'flex-start' : 'center'}
        gap="md"
        direction={isTablet ? 'column' : 'row'}
        mb={'md'}
      >
        <Avatar.Group spacing={'xl'}>
          <Avatar size={avatarSize} src={shipImg ? shipImg : null}>
            <Skeleton h={avatarSize} w={avatarSize} circle />
          </Avatar>
          <Avatar size={avatarSize} src={projectImg ? projectImg : null}>
            <Skeleton h={avatarSize} w={avatarSize} circle />
          </Avatar>
        </Avatar.Group>
        <Box>
          {isLoadingGrant ? (
            <Skeleton w={175} h={20} mb="sm" />
          ) : (
            <Text
              fz="xl"
              fw={600}
              c={theme.colors.dark[0]}
              mb={'sm'}
              lineClamp={1}
            >
              {projectName} {'<>'} {shipName}
            </Text>
          )}
          <Group justify="space-between">
            <Box>
              <Group gap={4}>
                <Text fz="sm" c={theme.colors.gray[6]}>
                  Funding Allocated
                </Text>
                <Tooltip label={'Amount set aside for this grant'}>
                  <IconExclamationCircle
                    size={16}
                    color={theme.colors.yellow[6]}
                  />
                </Tooltip>
              </Group>
              <Text>1500 GSBT</Text>
            </Box>
            <Box>
              <Group gap={4}>
                <Text fz="sm" c={theme.colors.gray[6]}>
                  Funding Received
                </Text>
                <Tooltip label={'Amount sent to the project'}>
                  <IconExclamationCircle
                    size={16}
                    color={theme.colors.yellow[6]}
                  />
                </Tooltip>
              </Group>
              <Text>777 GSBT</Text>
            </Box>
          </Group>
        </Box>
      </Flex>
      <Group gap={6}>
        <ApplicationProgress />
        <MilestonesProgress />
        <FacilitatorReview />
        <MilestoneSubmitProgress />
        <GrantCompleteProgress />
      </Group>
    </Paper>
  );
};

const ApplicationProgress = () => {
  const { grant } = useGrant();
  const { colors } = useMantineTheme();

  const color = !grant?.status
    ? colors.dark[2]
    : grant.status < GrantStatus.ApplicationSubmitted
      ? colors.dark[2]
      : grant.status === GrantStatus.ApplicationSubmitted
        ? colors.yellow[6]
        : grant.status === GrantStatus.ApplicationRejected
          ? colors.red[6]
          : colors.green[6];

  return (
    <ProgressText
      color={color}
      icon={<IconCircleCheck size={16} color={color} />}
      text="Grant Application"
    />
  );
};

const MilestonesProgress = () => {
  const { colors } = useMantineTheme();
  const { grant } = useGrant();

  const color = !grant?.status
    ? colors.dark[2]
    : grant.status < GrantStatus.MilestonesSubmitted
      ? colors.dark[2]
      : grant.status === GrantStatus.MilestonesSubmitted
        ? colors.yellow[6]
        : grant.status === GrantStatus.MilestonesRejected
          ? colors.red[6]
          : colors.green[6];

  return (
    <ProgressText
      color={color}
      icon={<IconExclamationCircle size={16} color={color} />}
      text="Milestone Plan"
    />
  );
};

const FacilitatorReview = () => {
  const { colors } = useMantineTheme();
  const { grant } = useGrant();

  const color = !grant?.status
    ? colors.dark[2]
    : grant.status < GrantStatus.MilestonesApproved
      ? colors.dark[2]
      : grant.status === GrantStatus.MilestonesApproved
        ? colors.yellow[6]
        : grant.status === GrantStatus.FacilitatorRejected
          ? colors.red[6]
          : colors.green[6];
  return (
    <ProgressText
      color={color}
      icon={<IconExclamationCircle size={16} color={color} />}
      text="Facilitator Approval"
    />
  );
};

const MilestoneSubmitProgress = () => {
  const { colors } = useMantineTheme();
  const { grant } = useGrant();

  const color = !grant?.status
    ? colors.dark[2]
    : grant.status < GrantStatus.Allocated
      ? colors.dark[2]
      : grant.status > GrantStatus.Allocated
        ? colors.green[6]
        : grant.allMilestonesApproved
          ? colors.green[6]
          : grant.hasRejectedMilestones
            ? colors.red[6]
            : grant.hasPendingMilestones
              ? colors.yellow[6]
              : colors.dark[2];

  return (
    <ProgressText
      color={color}
      icon={<IconExclamationCircle size={16} color={color} />}
      text="Milestones (0/0)"
    />
  );
};

const GrantCompleteProgress = () => {
  const { colors } = useMantineTheme();
  const { grant } = useGrant();

  const color = !grant?.status
    ? colors.dark[2]
    : grant.status < GrantStatus.AllMilestonesComplete
      ? colors.dark[2]
      : grant.status === GrantStatus.AllMilestonesComplete
        ? colors.yellow[6]
        : colors.green[6];
  return (
    <ProgressText
      color={color}
      icon={<IconExclamationCircle size={16} color={color} />}
      text="Completed"
    />
  );
};

const ProgressText = ({
  color,
  icon,
  text,
}: {
  color: string;
  icon: ReactNode;
  text: string;
}) => {
  const theme = useMantineTheme();
  return (
    <Group gap={4} bg={theme.colors.dark[8]}>
      {icon}
      <Text fz={10} c={color} fw={600}>
        {text}
      </Text>
    </Group>
  );
};
