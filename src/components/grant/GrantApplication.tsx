import { Box, Flex, Text, useMantineTheme } from '@mantine/core';
import { useGrant } from '../../hooks/useGrant';
import { ApplicationDisplay } from './ApplicationDisplay';
import { Display } from '../Display';

export const GrantApplication = () => {
  const { currentApplication } = useGrant();
  const theme = useMantineTheme();

  if (!currentApplication)
    return (
      <Display
        title="Application Not Submitted"
        description="Project has yet to submit their application"
      />
    );

  return (
    <ApplicationDisplay
      id={currentApplication.id}
      status={currentApplication.status}
      timestamp={currentApplication.timestamp}
      receivingAddress={currentApplication.receivingAddress}
      amountRequested={currentApplication.amount}
      dueDate={currentApplication.content.dueDate}
      rtContent={currentApplication.content.content}
      draftNumber={currentApplication.index + 1}
    />
  );
};
