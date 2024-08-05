import { Box, Drawer, Flex } from '@mantine/core';
import { ReactNode } from 'react';
import { PageTitle } from '../layout/Sections';

export const PageDrawer = ({
  children,
  pageTitle,
  opened,
  onClose,
}: {
  children: ReactNode;
  pageTitle?: string;
  opened: boolean;
  onClose: () => void;
}) => {
  return (
    <Drawer.Root opened={opened} size={720} onClose={onClose} position="right">
      <Drawer.Overlay />
      <Drawer.Content>
        <Flex w="100%" justify={'center'}>
          <Box mt="xl" w="600px">
            <PageTitle title={pageTitle} />
            {children}
          </Box>
        </Flex>
      </Drawer.Content>
    </Drawer.Root>
  );
};
