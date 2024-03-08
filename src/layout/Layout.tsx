import { Container, Flex, MantineProvider } from '@mantine/core';
import { theme } from '../theme';
import { DesktopNav } from './DesktopNav/DesktopNav';
import { Notifications } from '@mantine/notifications';

export const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <MantineProvider theme={theme} defaultColorScheme="dark">
      <Notifications />
      <Container size={1275}>
        <Flex maw={1275}>
          <DesktopNav />
          {children}
        </Flex>
      </Container>
    </MantineProvider>
  );
};
