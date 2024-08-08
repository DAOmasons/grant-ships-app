import {
  Avatar,
  Box,
  Group,
  Paper,
  Text,
  Tooltip,
  useMantineTheme,
} from '@mantine/core';
import { GrantStatus } from '../../types/common';
import {
  IconCheck,
  IconChecks,
  IconFileCheck,
  IconFileDescription,
  IconFilePlus,
  IconFileX,
  IconPennant,
  IconPennantOff,
  IconRoute,
  IconRouteX,
  IconShieldX,
} from '@tabler/icons-react';
import { Link } from 'react-router-dom';
import { ReactNode } from 'react';

export const GrantCard = ({
  avatarUrls,
  label,
  isActive,
  linkUrl,
  status,
  hasPending,
  hasRejected,
  allCompleted,
}: {
  linkUrl: string;
  isActive: boolean;
  avatarUrls: string[];
  label: string;
  status: GrantStatus;
  hasPending: boolean;
  hasRejected: boolean;
  allCompleted: boolean;
}) => {
  const theme = useMantineTheme();

  return (
    <Paper
      w="100%"
      bg={theme.colors.dark[6]}
      p="lg"
      component={Link}
      to={linkUrl}
    >
      <Group justify="space-between">
        <Group gap={8}>
          <Avatar.Group>
            {avatarUrls.map((url) => (
              <Avatar size={32} src={url} key={url} />
            ))}
          </Avatar.Group>
          <Text fz="sm" fw={500}>
            {label}
          </Text>
          <Tooltip label={isActive ? 'Active' : 'Inactive'}>
            <IconCheck
              size={16}
              color={isActive ? theme.colors.blue[6] : theme.colors.dark[5]}
            />
          </Tooltip>
        </Group>
        <GrantStatusIndicator
          hasPending={hasPending}
          hasRejected={hasRejected}
          allCompleted={allCompleted}
          status={status}
        />
      </Group>
    </Paper>
  );
};

const GrantStatusIndicator = ({
  status,
  hasPending,
  hasRejected,
  allCompleted,
}: {
  status: GrantStatus;
  hasPending: boolean;
  hasRejected: boolean;
  allCompleted: boolean;
}) => {
  const theme = useMantineTheme();

  if (status === GrantStatus.ProjectInitiated)
    return (
      <StatusIndicator text="Grant Started" icon={<IconFilePlus size={16} />} />
    );
  if (status === GrantStatus.ShipInitiated) {
    return (
      <StatusIndicator text="Grant Started" icon={<IconFilePlus size={16} />} />
    );
  }
  if (status === GrantStatus.ApplicationSubmitted) {
    return (
      <StatusIndicator
        text="Application Submitted"
        icon={<IconFileDescription size={16} />}
      />
    );
  }
  if (status === GrantStatus.ApplicationRejected) {
    return (
      <StatusIndicator
        text="Application Not Approved"
        icon={<IconFileX size={16} />}
      />
    );
  }
  if (status === GrantStatus.ApplicationApproved) {
    return (
      <StatusIndicator
        text="Application Approved"
        icon={<IconFileCheck size={16} />}
      />
    );
  }
  if (status === GrantStatus.MilestonesSubmitted) {
    return (
      <StatusIndicator
        text="Milestones Submitted"
        icon={<IconRoute size={16} />}
      />
    );
  }
  if (status === GrantStatus.MilestonesRejected) {
    return (
      <StatusIndicator
        text="Milestones Not Approved"
        icon={<IconRouteX size={16} />}
      />
    );
  }

  if (status === GrantStatus.MilestonesApproved) {
    return (
      <StatusIndicator
        text="Milestones Approved"
        icon={<IconRoute size={16} />}
      />
    );
  }
  if (status === GrantStatus.FacilitatorRejected) {
    return (
      <StatusIndicator
        text="Facilitator Rejected"
        icon={<IconShieldX size={16} />}
      />
    );
  }

  if (status === GrantStatus.Allocated) {
    if (hasPending) {
      return (
        <StatusIndicator
          text="Milestone Submitted"
          icon={<IconPennant size={16} />}
        />
      );
    }
    if (hasRejected) {
      return (
        <StatusIndicator
          text="Milestone Submitted"
          icon={<IconPennantOff size={16} />}
        />
      );
    }

    // state to tell project that the milestone has been approved
    return (
      <StatusIndicator text="Allocated" icon={<IconPennant size={16} />} />
    );
  }

  if (status === GrantStatus.AllMilestonesComplete) {
    return (
      <StatusIndicator
        text="Milestones Complete"
        icon={<IconCheck size={16} />}
      />
    );
  }

  if (status === GrantStatus.Completed) {
    return (
      <StatusIndicator text="Grant Complete" icon={<IconChecks size={16} />} />
    );
  }
};

const StatusIndicator = ({ text, icon }: { text: string; icon: ReactNode }) => {
  return (
    <Group gap={8}>
      <Text fz="xs">{text}</Text>
      <span style={{ transform: 'translateY(2px)' }}>{icon}</span>
    </Group>
  );
};
