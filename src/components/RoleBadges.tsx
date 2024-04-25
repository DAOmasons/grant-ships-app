import { Tooltip, useMantineTheme } from '@mantine/core';

import { IconAward, IconRocket, IconShieldHalf } from '@tabler/icons-react';

export const ProjectBadge = ({ size = 16 }: { size?: number }) => {
  const theme = useMantineTheme();

  return (
    <Tooltip label="Project" position="bottom">
      <IconAward size={size} color={theme.colors.blue[5]} />
    </Tooltip>
  );
};

export const ShipBadge = ({ size = 16 }: { size?: number }) => {
  const theme = useMantineTheme();

  return (
    <Tooltip label="Grant Ship Operator" position="bottom">
      <IconRocket size={size} color={theme.colors.violet[5]} />
    </Tooltip>
  );
};

export const FacilitatorBadge = ({ size = 16 }: { size?: number }) => {
  const theme = useMantineTheme();

  return (
    <Tooltip label="Facilitator" position="bottom">
      <IconShieldHalf size={size} color={theme.colors.pink[5]} />
    </Tooltip>
  );
};
