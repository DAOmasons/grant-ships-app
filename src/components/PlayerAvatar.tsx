import { Avatar, Group, Text } from '@mantine/core';
import { Player } from '../types/ui';
import { ProjectBadge } from './RoleBadges';
import { TxButton } from './TxButton';
import { IconPlus } from '@tabler/icons-react';

export const PlayerAvatar = ({
  playerType,
  imgUrl,
  name,
}: {
  playerType: Player;
  imgUrl?: string;
  name?: string;
}) => {
  return (
    <Group gap="sm">
      <Avatar src={imgUrl} alt={name} size={40} />
      <Text fw={600}>{name}</Text>
      <ProjectBadge size={18} />
    </Group>
  );
};
