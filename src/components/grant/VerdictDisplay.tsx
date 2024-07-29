import React from 'react';
import { InsetUpdate } from './InsetUpdate';
import { IconCircleCheck, IconExclamationCircle } from '@tabler/icons-react';
import { Text, useMantineTheme } from '@mantine/core';

export const VerdictDisplay = ({
  hasApproved,
  posterName,
  timestamp,
  reason,
}: {
  reason: string;
  timestamp: number;
  hasApproved: boolean;
  posterName: string;
}) => {
  const theme = useMantineTheme();
  const tagLine = hasApproved
    ? ' has approved this Grant Application'
    : ' has rejected this Grant Application';
  return (
    <InsetUpdate
      bodyUI={<Text fz="sm">{reason}</Text>}
      timestamp={timestamp}
      posterName={posterName}
      tagline={tagLine}
      symbolUI={
        hasApproved ? (
          <IconCircleCheck size={20} color={theme.colors.green[6]} />
        ) : (
          <IconExclamationCircle size={20} color={theme.colors.red[6]} />
        )
      }
    />
  );
};
