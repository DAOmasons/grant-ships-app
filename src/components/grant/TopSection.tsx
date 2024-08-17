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
import { useBreakpoints, useMobile } from '../../hooks/useBreakpoint';
import { useGrant } from '../../hooks/useGrant';
import {
  IconCircle,
  IconCircleCheck,
  IconCircleX,
  IconExclamationCircle,
} from '@tabler/icons-react';
import { ReactNode } from 'react';
import { GameStatus, GrantStatus } from '../../types/common';
import { Link } from 'react-router-dom';
import { formatEther } from 'viem';
import { charLimit } from '../../utils/helpers';

export const TopSection = () => {
  const { project, ship, isLoadingGrant, grant } = useGrant();
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
          <Avatar
            size={avatarSize}
            src={shipImg ? shipImg : null}
            component={Link}
            to={ship?.id ? `/ship/${ship?.id}` : ''}
          >
            <Skeleton h={avatarSize} w={avatarSize} circle />
          </Avatar>
          <Avatar
            size={avatarSize}
            src={projectImg ? projectImg : null}
            component={Link}
            to={project?.id ? `/project/${project?.id}` : ''}
          >
            <Skeleton h={avatarSize} w={avatarSize} circle />
          </Avatar>
        </Avatar.Group>
        <Box>
          {isLoadingGrant ? (
            <Skeleton w={175} h={20} mb="sm" />
          ) : (
            <Group mb={'sm'}>
              <Text fz="xl" fw={600} c={theme.colors.dark[0]} lineClamp={1}>
                <Link
                  to={project?.id ? `/project/${project?.id}` : ''}
                  style={{ textDecoration: 'none' }}
                >
                  {shipName ? charLimit(shipName, 18) : ''}
                </Link>
                {/* </Text> */}
                {/* <Text fz="xl" fw={600} c={theme.colors.dark[0]} lineClamp={1}> */}
                {' <> '}
                {/* </Text> */}
                {/* <Text
                fz="xl"
                fw={600}
                component={Link}
                to={project?.id ? `/project/${project?.id}` : ''}
                c={theme.colors.dark[0]}
                lineClamp={1}
              > */}

                <Link
                  to={project?.id ? `/project/${project?.id}` : ''}
                  style={{ textDecoration: 'none' }}
                >
                  {projectName}
                </Link>
              </Text>
            </Group>
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
              <Text>
                {grant?.status && grant.status >= GrantStatus.Allocated
                  ? formatEther(BigInt(grant?.amount || 0))
                  : 0}{' '}
                GSBT
              </Text>
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
              <Text>
                {formatEther(BigInt(grant?.amountDistributed || 0))} GSBT
              </Text>
            </Box>
          </Group>
        </Box>
      </Flex>
      <Group
        gap={0}
        justify="space-around"
        px={8}
        py={2}
        bg={theme.colors.dark[8]}
        style={{
          borderRadius: '6px',
          flexDirection: isTablet ? 'column' : 'row',
          alignItems: 'start',
        }}
      >
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
    ? colors.dark[4]
    : grant.status < GrantStatus.ApplicationSubmitted
      ? colors.dark[3]
      : grant.status === GrantStatus.ApplicationSubmitted
        ? colors.yellow[6]
        : grant.status === GrantStatus.ApplicationRejected
          ? colors.red[6]
          : colors.green[6];

  const icon = !grant?.status ? (
    <IconCircle size={16} color={color} />
  ) : grant.status < GrantStatus.ApplicationSubmitted ? (
    <IconCircle size={16} color={color} />
  ) : grant.status === GrantStatus.ApplicationSubmitted ? (
    <IconExclamationCircle size={16} color={color} />
  ) : grant.status === GrantStatus.ApplicationRejected ? (
    <IconCircleX size={16} color={color} />
  ) : (
    <IconCircleCheck size={16} color={color} />
  );

  return <ProgressText color={color} icon={icon} text="Grant Application" />;
};

const MilestonesProgress = () => {
  const { colors } = useMantineTheme();
  const { grant } = useGrant();

  const color = !grant?.status
    ? colors.dark[4]
    : grant.status < GrantStatus.ApplicationApproved
      ? colors.dark[4]
      : grant.status === GrantStatus.ApplicationApproved
        ? colors.dark[3]
        : grant.status === GrantStatus.MilestonesSubmitted
          ? colors.yellow[6]
          : grant.status === GrantStatus.MilestonesRejected
            ? colors.red[6]
            : colors.green[6];

  const icon = !grant?.status ? (
    <IconCircle size={16} color={color} />
  ) : grant.status < GrantStatus.ApplicationApproved ? (
    <IconCircle size={16} color={color} />
  ) : grant.status === GrantStatus.ApplicationApproved ? (
    <IconExclamationCircle size={16} color={color} />
  ) : grant.status === GrantStatus.MilestonesSubmitted ? (
    <IconExclamationCircle size={16} color={color} />
  ) : grant.status === GrantStatus.MilestonesRejected ? (
    <IconCircleX size={16} color={color} />
  ) : (
    <IconCircleCheck size={16} color={color} />
  );

  return <ProgressText color={color} icon={icon} text="Milestone Plan" />;
};

const FacilitatorReview = () => {
  const { colors } = useMantineTheme();
  const { grant } = useGrant();

  const color = !grant?.status
    ? colors.dark[4]
    : grant.status < GrantStatus.MilestonesApproved
      ? colors.dark[4]
      : grant.status === GrantStatus.MilestonesApproved
        ? colors.yellow[6]
        : grant.status === GrantStatus.FacilitatorRejected
          ? colors.red[6]
          : colors.green[6];

  const icon = !grant?.status ? (
    <IconCircle size={16} color={color} />
  ) : grant.status < GrantStatus.MilestonesApproved ? (
    <IconCircle size={16} color={color} />
  ) : grant.status === GrantStatus.MilestonesApproved ? (
    <IconExclamationCircle size={16} color={color} />
  ) : grant.status === GrantStatus.FacilitatorRejected ? (
    <IconCircleX size={16} color={color} />
  ) : (
    <IconCircleCheck size={16} color={color} />
  );
  return <ProgressText color={color} icon={icon} text="Facilitator Approval" />;
};

const MilestoneSubmitProgress = () => {
  const { colors } = useMantineTheme();
  const { grant, currentMilestoneSet } = useGrant();

  const milestoneAmt = currentMilestoneSet?.milestones?.length || 0;
  const milestonesCompleted =
    currentMilestoneSet?.milestones?.filter(
      (ms) => ms.status === GameStatus.Accepted
    ).length || 0;

  const color = !grant?.status
    ? colors.dark[4]
    : grant.status < GrantStatus.Allocated
      ? colors.dark[4]
      : grant.status > GrantStatus.Allocated
        ? colors.green[6]
        : grant.allMilestonesApproved
          ? colors.green[6]
          : grant.hasRejectedMilestones
            ? colors.red[6]
            : grant.hasPendingMilestones
              ? colors.yellow[6]
              : colors.dark[3];

  const icon = !grant?.status ? (
    <IconCircle size={16} color={color} />
  ) : grant.status < GrantStatus.Allocated ? (
    <IconCircle size={16} color={color} />
  ) : grant.status > GrantStatus.Allocated ? (
    <IconCircleCheck size={16} color={color} />
  ) : grant.allMilestonesApproved ? (
    <IconCircleCheck size={16} color={color} />
  ) : grant.hasRejectedMilestones ? (
    <IconCircleX size={16} color={color} />
  ) : grant.hasPendingMilestones ? (
    <IconExclamationCircle size={16} color={color} />
  ) : (
    <IconExclamationCircle size={16} color={color} />
  );

  return (
    <ProgressText
      color={color}
      icon={icon}
      text={`Milestones (${milestonesCompleted}/${milestoneAmt})`}
    />
  );
};

const GrantCompleteProgress = () => {
  const { colors } = useMantineTheme();
  const { grant } = useGrant();

  const color = !grant?.status
    ? colors.dark[4]
    : grant.status < GrantStatus.AllMilestonesComplete
      ? colors.dark[4]
      : grant.status === GrantStatus.AllMilestonesComplete
        ? colors.dark[3]
        : colors.green[6];

  const icon = !grant?.status ? (
    <IconCircle size={16} color={color} />
  ) : grant.status < GrantStatus.AllMilestonesComplete ? (
    <IconCircle size={16} color={color} />
  ) : grant.status === GrantStatus.AllMilestonesComplete ? (
    <IconExclamationCircle size={16} color={color} />
  ) : (
    <IconCircleCheck size={16} color={color} />
  );
  return <ProgressText color={color} icon={icon} text="Completed" />;
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
  return (
    <Group px={6} gap={4} style={{ cursor: 'default' }}>
      {icon}
      <Text fz={10} c={color} fw={600}>
        {text}
      </Text>
    </Group>
  );
};
