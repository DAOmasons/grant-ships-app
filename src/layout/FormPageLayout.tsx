import { ActionIcon, Group, Stack, Text } from '@mantine/core';
import { IconArrowNarrowLeft } from '@tabler/icons-react';
import { ReactNode } from 'react';

export const FormPageLayout = ({
  title,
  children,
}: {
  title?: string;
  children?: ReactNode;
}) => {
  return (
    <form>
      <Stack maw={375} miw={300} w={'100%'} align="center" m="xl" mt="lg">
        <Group w="100%" mb="xl">
          <ActionIcon variant="subtle">
            <IconArrowNarrowLeft />
          </ActionIcon>
          <Text fz={24} fw={500}>
            {title}
          </Text>
        </Group>
        {children}
      </Stack>
    </form>
  );
};
