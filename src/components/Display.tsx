import { Flex, Text, useMantineTheme } from '@mantine/core';
import { ReactNode } from 'react';

export const Display = ({
  title,
  description,
}: {
  title: ReactNode;
  description: ReactNode;
}) => {
  const theme = useMantineTheme();

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
        <Text fz="md" mb="sm" fw={600}>
          {title}
        </Text>
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
