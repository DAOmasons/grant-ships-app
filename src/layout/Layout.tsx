import {
  Container,
  Flex,
  MantineProvider,
  Paper,
  Text,
  useMantineTheme,
} from '@mantine/core';
import { theme } from '../theme';
import { DesktopNav } from './DesktopNav/DesktopNav';
import { Notifications } from '@mantine/notifications';

export const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <MantineProvider theme={theme} defaultColorScheme="dark">
      <Notifications />
      <Container size={1200}>
        <Flex maw={1200}>
          <DesktopNav />
          {children}
        </Flex>
      </Container>
    </MantineProvider>
  );
};
