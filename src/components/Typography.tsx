import { Text } from '@mantine/core';
import { ReactNode } from 'react';

export const Bold = ({ children }: { children: ReactNode }) => (
  <Text component="span" fw={900} fz="inherit">
    {children}
  </Text>
);
