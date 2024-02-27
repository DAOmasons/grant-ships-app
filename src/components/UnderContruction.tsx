import {
  Box,
  Group,
  Text,
  Alert,
  StyleProp,
  DefaultMantineColor,
  MantineSpacing,
} from '@mantine/core';

import { IconBell } from '@tabler/icons-react';
import React from 'react';

type AppAlertProps = {
  title: string;
  description?: React.ReactNode;
  icon?: React.ReactNode;
  color?: StyleProp<DefaultMantineColor>;
  bg?: StyleProp<DefaultMantineColor>;
  opacity?: number;
  mt?: StyleProp<MantineSpacing>;
  mb?: StyleProp<MantineSpacing>;
};

export const AppAlert = ({
  title,
  description,
  icon = <IconBell size={24} />,
  color,
  bg,
  opacity,
  mt = 'xl',
  mb = 56,
}: AppAlertProps) => {
  return (
    <Alert mt={mt} mb={mb} c={color} bg={bg} opacity={opacity}>
      <Group wrap="nowrap">
        <Box>{icon}</Box>
        <Box>
          <Text mb={2}>{title}</Text>
          {description && typeof description === 'string' && (
            <Text size="xs" opacity={0.8}>
              {description}
            </Text>
          )}
          {description && typeof description !== 'string' && description}
        </Box>
      </Group>
    </Alert>
  );
};
