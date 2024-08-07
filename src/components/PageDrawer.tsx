import { Box, Drawer, Flex } from '@mantine/core';
import { ReactNode } from 'react';
import { PageTitle } from '../layout/Sections';

export const PageDrawer = ({
  children,
  pageTitle,
  opened,
  onClose,
  closeOnBack = false,
}: {
  children: ReactNode;
  pageTitle?: string | ReactNode;
  opened: boolean;
  onClose: () => void;
  closeOnBack?: boolean;
}) => {
  return (
    <Drawer.Root opened={opened} size={720} onClose={onClose} position="right">
      <Drawer.Overlay />
      <Drawer.Content>
        <Flex w="100%" justify={'center'}>
          <Box mt="xl" w="600px">
            <PageTitle
              title={pageTitle}
              backAction={closeOnBack ? onClose : undefined}
            />
            {children}
          </Box>
        </Flex>
      </Drawer.Content>
    </Drawer.Root>
  );
};
