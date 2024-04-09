import { Container, Flex, MantineProvider } from '@mantine/core';
import { theme } from '../theme';
import { DesktopNav } from './DesktopNav/DesktopNav';
import { Notifications } from '@mantine/notifications';
import { useMobile } from '../hooks/useBreakpoint';
import { MobileNav } from './MobileNav/MobileNav';

export const Layout = ({ children }: { children: React.ReactNode }) => {
  const isMobile = useMobile();

  return (
    <MantineProvider theme={theme} defaultColorScheme="dark">
      <Notifications />
      <Container size={1250} p={0}>
        <Flex
          maw={1250}
          direction={isMobile ? 'column-reverse' : 'row'}
          justify={isMobile ? 'space-between' : 'start'}
          pos="relative"
        >
          {isMobile ? <MobileNav /> : <DesktopNav />}
          {children}
        </Flex>
      </Container>
    </MantineProvider>
  );
};
