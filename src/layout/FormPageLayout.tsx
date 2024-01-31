import { ActionIcon, Button, Group, Stack, Text } from '@mantine/core';
import { IconArrowNarrowLeft } from '@tabler/icons-react';
import { ReactNode } from 'react';
import { NestedButton } from '../types/common';

export const FormPageLayout = ({
  title,
  children,
  onSubmit,
  secondaryBtn,
  primaryBtn,
  backBtn,
  disableSubmit,
}: {
  title?: string;
  children?: ReactNode;
  disableSubmit?: boolean;
  onSubmit?: () => void;
  secondaryBtn?: NestedButton;
  primaryBtn?: NestedButton;
  backBtn?: NestedButton;
  errors?: Record<string, string>;
}) => {
  return (
    <>
      <form onSubmit={onSubmit}>
        <Stack maw={375} miw={300} w={'100%'} align="center" m="xl" mt="lg">
          <Group w="100%" mb="xl">
            {backBtn && (
              <ActionIcon variant="subtle" onClick={backBtn.onClick}>
                <IconArrowNarrowLeft />
              </ActionIcon>
            )}
            <Text fz={20} fw={500}>
              {title}
            </Text>
          </Group>
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
    </>
  );
};
