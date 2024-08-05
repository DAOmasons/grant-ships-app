import { Flex, Group, Text, useMantineTheme } from '@mantine/core';
import { IconCircleCheck, IconExclamationCircle } from '@tabler/icons-react';
import { ReactNode } from 'react';

export const Display = ({
  title,
  description,
  state = 'empty',
}: {
  state?: 'error' | 'warning' | 'empty' | 'success';
  title: ReactNode;
  description: ReactNode;
}) => {
  const theme = useMantineTheme();

  const icon =
    state === 'error' ? (
      <IconExclamationCircle color={theme.colors.red[5]} />
    ) : state === 'warning' ? (
      <IconExclamationCircle color={theme.colors.yellow[6]} />
    ) : state === 'success' ? (
      <IconCircleCheck color={theme.colors.green[6]} />
    ) : null;

  return (
    <Flex
      justify="center"
      align="center"
      py="lg"
      mb="lg"
      style={{
        border: `1px solid ${theme.colors.dark[5]}`,
        borderRadius: '8px',
      }}
      direction="column"
    >
      {typeof title === 'string' ? (
        <Group gap={8} mb="sm">
          <span style={{ transform: 'translateY(1px)' }}>{icon}</span>
          <Text fz="md" fw={600}>
            {title}
          </Text>
        </Group>
      ) : (
        title
      )}
      {typeof description === 'string' ? (
        <Text fz="sm" opacity={0.8}>
          {description}
        </Text>
      ) : (
        description
      )}
    </Flex>
  );
};
