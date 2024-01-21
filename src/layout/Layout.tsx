import { Container, Flex, MantineProvider } from '@mantine/core';
import { theme } from '../theme';
import { DesktopNav } from './DesktopNav/DesktopNav';

export const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <MantineProvider theme={theme} defaultColorScheme="dark">
      <Container size={1200}>
        <Flex maw={1200}>
          <DesktopNav />
          {children}
        </Flex>
      </Container>
    </MantineProvider>
  );
};
