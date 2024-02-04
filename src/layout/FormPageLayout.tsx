import { Button, Group, Stack } from '@mantine/core';

import { ReactNode } from 'react';
import { NestedButton } from '../types/common';
import { PageTitle } from './Sections';

export const FormPageLayout = ({
  title,
  children,
  onSubmit,
  secondaryBtn,
  primaryBtn,
  disableSubmit,
}: {
  title?: string;
  children?: ReactNode;
  disableSubmit?: boolean;
  onSubmit?: () => void;
  secondaryBtn?: NestedButton;
  primaryBtn?: NestedButton;
  errors?: Record<string, string>;
}) => {
  return (
    <form onSubmit={onSubmit} style={{ width: '100%' }}>
      <Stack maw={600} miw={300} w={'100%'} m="xl">
        {title && <PageTitle title={title} />}
        {children}
        <Group w="100%" mt="md" justify="flex-end">
          {secondaryBtn && (
            <Button variant="light" onClick={secondaryBtn.onClick}>
              {secondaryBtn.label}
            </Button>
          )}
          {primaryBtn && (
            <Button type="submit" disabled={disableSubmit}>
              {primaryBtn.label}
            </Button>
          )}
        </Group>
      </Stack>
    </form>
  );
};
