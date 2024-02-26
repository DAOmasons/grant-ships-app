import { MantineTheme, Text } from '@mantine/core';
import { GrantStatus } from '../../types/common';
import { IconCheck, IconEye, IconX } from '@tabler/icons-react';

export const getTimelineContents = (
  currentStage: GrantStatus,
  isPendingAt: GrantStatus,
  isRejected: GrantStatus,
  isCompletedAt: GrantStatus,
  uiStage: number,
  theme: MantineTheme,
  content: {
    onNotStarted?: React.ReactNode;
    onPending?: React.ReactNode;
    onRejected?: React.ReactNode;
    onCompleted?: React.ReactNode;
  }
) => {
  if (currentStage < isPendingAt) {
    return {
      bullet: (
        <Text fz="xs" opacity={0.7}>
          {uiStage}
        </Text>
      ),
      color: theme.colors.dark[5],
      children: content.onNotStarted,
    };
  }
  if (currentStage === isPendingAt) {
    return {
      bullet: <IconEye />,
      color: theme.colors.violet[6],
      children: content.onPending,
    };
  }
  if (currentStage === isRejected) {
    return {
      bullet: <IconX />,
      color: theme.colors.pink[6],
      children: content.onRejected,
    };
  }
  if (currentStage >= isCompletedAt) {
    return {
      bullet: <IconCheck />,
      color: theme.colors.blue[6],
      children: content.onCompleted,
    };
  }
};
