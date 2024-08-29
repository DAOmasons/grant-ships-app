import { Text } from '@mantine/core';
import { ReactNode } from 'react';

export const Bold = ({ children }: { children: ReactNode }) => (
  <Text component="span" fw={900} fz="inherit">
    {children}
  </Text>
);

export const Italic = ({ children }: { children: ReactNode }) => (
  <Text component="span" fw={'inherit'} fz="inherit" fs="italic">
    {children}
  </Text>
);
