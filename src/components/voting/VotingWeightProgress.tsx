import { RingProgress, useMantineTheme } from '@mantine/core';
import { ComponentProps, useMemo } from 'react';

export const VotingWeightProgress = (
  props: Omit<ComponentProps<typeof RingProgress>, 'sections'> & {
    shipVotePercs: {
      ship1: string;
      ship2: string;
      ship3: string;
    };
  }
) => {
  const { shipVotePercs, ...rest } = props;

  const theme = useMantineTheme();

  const sections = useMemo(() => {
    return [
      {
        value: Number(shipVotePercs.ship1) || 0,
        color: theme.colors.blue[5],
      },
      {
        value: Number(shipVotePercs.ship2) || 0,
        color: theme.colors.violet[5],
      },
      {
        value: Number(shipVotePercs.ship3) || 0,
        color: theme.colors.pink[5],
      },
    ];
  }, [shipVotePercs, theme]);

  return <RingProgress {...rest} size={36} thickness={2} sections={sections} />;
};
