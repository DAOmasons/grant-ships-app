import { Tooltip, useMantineTheme } from '@mantine/core';

import { IconAward, IconRocket, IconShieldHalf } from '@tabler/icons-react';

export const ProjectBadge = () => {
  const theme = useMantineTheme();

  return (
    <Tooltip label="Project" position="bottom">
      <IconAward size={16} color={theme.colors.blue[5]} />
    </Tooltip>
  );
};

export const ShipBadge = () => {
  const theme = useMantineTheme();

  return (
    <Tooltip label="Grant Ship Operator" position="bottom">
      <IconRocket size={16} color={theme.colors.violet[5]} />
    </Tooltip>
  );
};

export const FacilitatorBadge = () => {
  const theme = useMantineTheme();

  return (
    <Tooltip label="Facilitator" position="bottom">
      <IconShieldHalf size={16} color={theme.colors.pink[5]} />
    </Tooltip>
  );
};
