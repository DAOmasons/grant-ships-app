import {
  Avatar,
  Group,
  MantineSize,
  MantineStyleProps,
  StyleProp,
  Text,
} from '@mantine/core';
import { Player } from '../types/ui';
import { FacilitatorBadge, ProjectBadge, ShipBadge } from './RoleBadges';
import { useMemo } from 'react';
import { fontSize } from '@mui/system';

type DisplayParams = {
  gap: string | number;
  fontSize: StyleProp<number | MantineSize | (string & {})> | undefined;
  avatarSize: number;
};

const displayParams: Record<string, DisplayParams> = {
  feedCard: {
    gap: 8,
    fontSize: 'sm',
    avatarSize: 40,
  },
  postDrawer: {
    gap: 'sm',
    fontSize: 'md',
    avatarSize: 40,
  },
  fullPage: {
    gap: 'sm',
    fontSize: 'md',
    avatarSize: 40,
  },
};

export const PlayerAvatar = ({
  playerType,
  imgUrl,
  name,
  display = 'feedCard',
}: {
  playerType: Player;
  imgUrl?: string;
  name?: string;
  display?: keyof typeof displayParams;
}) => {
  const badge = useMemo(() => {
    if (playerType === Player.Project) {
      return <ProjectBadge size={18} />;
    }
    if (playerType === Player.Ship) {
      return <ShipBadge size={18} />;
    }
    if (playerType === Player.Facilitators) {
      return <FacilitatorBadge size={18} />;
    }
    return null;
  }, [playerType]);

  const { gap, fontSize, avatarSize } = displayParams[display];

  return (
    <Group gap={gap}>
      <Avatar src={imgUrl} alt={name} size={avatarSize} />
      <Text fw={600} fz={fontSize}>
        {name}
      </Text>
      {badge}
    </Group>
  );
};