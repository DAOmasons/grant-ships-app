import { Stack } from '@mantine/core';
import React from 'react';
import { GmDeployment } from '../../../resolvers/gmResolvers';

export const DeploymentsPanel = ({
  deploys,
  error,
  isLoading,
}: {
  deploys: GmDeployment[];
  error: Error | null;
  isLoading: boolean;
}) => {
  return <Stack>DeploymentsPanel</Stack>;
};
