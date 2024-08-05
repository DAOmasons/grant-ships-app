import {
  Avatar,
  Group,
  Paper,
  Text,
  Tooltip,
  useMantineTheme,
} from '@mantine/core';
import { GrantStatus } from '../../types/common';
import { IconCheck } from '@tabler/icons-react';
import { Link } from 'react-router-dom';

export const GrantCard = ({
  avatarUrls,
  label,
  isActive,
  linkUrl,
  status,
}: {
  linkUrl: string;
  isActive: boolean;
  avatarUrls: string[];
  label: string;
  status: GrantStatus;
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
    </Paper>
  );
};
