import { Avatar, Group, MantineSize, StyleProp, Text } from '@mantine/core';
import { Player } from '../types/ui';
import { FacilitatorBadge, ProjectBadge, ShipBadge } from './RoleBadges';
import { useMemo } from 'react';

type DisplayParams = {
  gap: string | number;
  fontSize: StyleProp<number | MantineSize | (string & object)> | undefined;
  avatarSize: number;
  displayBadge: boolean;
};

const displayParams: Record<string, DisplayParams> = {
  feedCard: {
    gap: 8,
    fontSize: 'sm',
    avatarSize: 40,
    displayBadge: true,
  },
  postDrawer: {
    gap: 'sm',
    fontSize: 'md',
    avatarSize: 40,
    displayBadge: true,
  },
  fullPage: {
    gap: 'sm',
    fontSize: 'md',
    avatarSize: 40,
    displayBadge: true,
  },
  grantTimeline: {
    gap: 8,
    fontSize: 'sm',
    avatarSize: 24,
    displayBadge: false,
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
    if (!displayParams[display].displayBadge) return null;
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
  }, [playerType, display]);

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
