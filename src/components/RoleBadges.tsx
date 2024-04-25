import { Tooltip, useMantineTheme } from '@mantine/core';

import { IconAward, IconRocket, IconShieldHalf } from '@tabler/icons-react';

export const ProjectBadge = () => {
  const theme = useMantineTheme();

  return (
    <Tooltip label="Project">
      <IconAward size={16} color={theme.colors.blue[5]} />
    </Tooltip>
  );
};

export const ShipBadge = () => {
  const theme = useMantineTheme();

  return (
    <Tooltip label="Grant Ship Operator">
      <IconRocket size={16} color={theme.colors.violet[5]} />
    </Tooltip>
  );
};

export const FacilitatorBadge = () => {
  const theme = useMantineTheme();

  return (
    <Tooltip label="Facilitator">
      <IconShieldHalf size={16} color={theme.colors.pink[5]} />
    </Tooltip>
  );
};
