import React from 'react';
import { MainSection, PageTitle } from '../layout/Sections';
import { Alert, Box, Group, Text } from '@mantine/core';
import { IconBell } from '@tabler/icons-react';

export const Apply = () => {
  return (
    <MainSection>
      <PageTitle title="Applications" />
      <Box w="100%">
        <Alert mt="xl">
          <Group>
            <IconBell size={24} />
            <Box>
              <Text mb={2}>
                It looks like you haven't started any projects yet
              </Text>
              <Text size="xs" opacity={0.8}>
                Don't worry, getting started is easy!
              </Text>
            </Box>
          </Group>
        </Alert>
      </Box>
    </MainSection>
  );
};
