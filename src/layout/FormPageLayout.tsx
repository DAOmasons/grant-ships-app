import { Button, Group, Stack } from '@mantine/core';

import { ReactNode } from 'react';
import { NestedButton } from '../types/common';
import { PageTitle } from './Sections';
import { useMobile } from '../hooks/useBreakpoint';

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
  const isMobile = useMobile();
  return (
    <form onSubmit={onSubmit}>
      <Stack
        maw={600}
        miw={300}
        w={'100%'}
        p={isMobile ? 'xs' : 'xl'}
        mb={isMobile ? 72 : 'xl'}
      >
        {title && <PageTitle title={title} />}
        {children}
        <Group w="100%" mt="md" justify="flex-end">
          {secondaryBtn && (
            <Button variant="light" onClick={secondaryBtn.onClick}>
              {secondaryBtn.label}
            </Button>
          )}
          {primaryBtn && (
            <Button
              disabled={disableSubmit}
              onClick={() => primaryBtn?.onClick?.()}
            >
              {primaryBtn.label}
            </Button>
          )}
        </Group>
      </Stack>
    </form>
  );
};
