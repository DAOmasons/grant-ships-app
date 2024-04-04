import {
  Box,
  Button,
  Container,
  Flex,
  MantineProvider,
  Menu,
  Modal,
  Stack,
  Text,
  useMantineTheme,
} from '@mantine/core';
import { theme } from '../theme';
import { DesktopNav } from './DesktopNav/DesktopNav';
import { Notifications, notifications } from '@mantine/notifications';
import { useMobile } from '../hooks/useBreakpoint';
import {
  IconAward,
  IconChevronUp,
  IconClock,
  IconCopy,
  IconExclamationCircle,
  IconExternalLink,
  IconLogout,
  IconPacman,
  IconRocket,
  IconShieldHalf,
  IconUserCircle,
} from '@tabler/icons-react';
import { navItems } from '../constants/navItems';
import { useState } from 'react';
import { useAccount, useConnect, useDisconnect, useSwitchChain } from 'wagmi';
import { useClipboard, useDisclosure } from '@mantine/hooks';
import { appNetwork } from '../utils/config';
import { useUserData } from '../hooks/useUserState';
import { Link } from 'react-router-dom';

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

const MobileNav = () => {
  const theme = useMantineTheme();
  const { address, isConnected, chain } = useAccount();
  const { switchChain } = useSwitchChain();
  const { copy } = useClipboard();
  const { disconnect } = useDisconnect();

  const [menuOpen, setMenuOpen] = useState(false);

  const isCorrectNetwork = appNetwork.id === chain?.id;
  return (
    <Box w="100%">
      <Box
        pos="fixed"
        bottom={0}
        bg={theme.colors.dark[7]}
        w="100%"
        py={4}
        style={{ zIndex: 10, borderTop: '1px solid #333' }}
      >
        <Flex justify={'space-around'} align="center">
          {navItems
            .filter((item) => item.link)
            .map((item) => (
              <Flex
                component={Link}
                to={item.link as string}
                direction="column"
                align="center"
                w="fit-content"
                td="none"
              >
                <item.icon size={24} />
                <Text size="xs" mt={2}>
                  {item.label}
                </Text>
              </Flex>
            ))}
          {isConnected ? (
            <Menu opened={menuOpen} onChange={setMenuOpen} offset={12}>
              <Menu.Target>
                <IconChevronUp size={24} />
              </Menu.Target>
              <Menu.Dropdown w="100%">
                {!isCorrectNetwork && (
                  <Menu.Item
                    onClick={() => {
                      switchChain({ chainId: appNetwork.id });
                    }}
                    leftSection={
                      <IconExclamationCircle color={theme.colors.yellow[6]} />
                    }
                  >
                    Switch to {appNetwork.name}
                  </Menu.Item>
                )}
                <DashboardLink />
                <Menu.Item
                  leftSection={<IconPacman />}
                  rightSection={<IconExternalLink opacity={0.7} size={18} />}
                  component="a"
                  href="https://rules.grantships.fun"
                  target="_blank"
                  rel="noreferrer"
                >
                  Game Rules
                </Menu.Item>
                <Menu.Item
                  leftSection={<IconCopy />}
                  onClick={() => {
                    copy(address);
                    notifications.show({
                      title: 'Address Copied',
                      message: `Address: ${address} has been copied to clipboard`,
                    });
                  }}
                >
                  Copy Address
                </Menu.Item>

                <Menu.Item
                  leftSection={<IconLogout />}
                  onClick={() => disconnect()}
                >
                  Disconnect
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          ) : (
            <Connect />
          )}
        </Flex>
      </Box>
    </Box>
  );
};

const Connect = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const { connectors, connect } = useConnect();
  return (
    <>
      <Flex direction="column" align="center" w="fit-content" onClick={open}>
        <IconUserCircle size={24} />
        <Text size="xs">Connect</Text>
      </Flex>
      <Modal opened={opened} onClose={close} centered title="Connect Wallet">
        <Stack>
          {[...connectors]?.reverse()?.map((connector) => (
            <Button
              key={connector.uid}
              onClick={() => {
                close();
                connect({ connector });
              }}
            >
              {connector.name}
            </Button>
          ))}
        </Stack>
      </Modal>
    </>
  );
};

const DashboardLink = () => {
  const { address } = useAccount();
  const { userData, userLoading } = useUserData();
  const theme = useMantineTheme();

  if (userLoading)
    return <Menu.Item leftSection={<IconClock />}> Loading...</Menu.Item>;

  if (userData?.isFacilitator)
    return (
      <Menu.Item
        component={Link}
        to="/facilitator-dashboard"
        leftSection={
          <IconShieldHalf stroke={1.5} color={theme.colors.pink[5]} />
        }
      >
        Dashboard
      </Menu.Item>
    );

  if (userData?.isShipOperator && userData?.shipAddress)
    return (
      <Menu.Item
        component={Link}
        to={`/ship-operator-dashboard/${userData?.shipAddress}`}
        leftSection={<IconRocket stroke={1.5} color={theme.colors.violet[5]} />}
      >
        Ship Operator Dashboard
      </Menu.Item>
    );

  if (address && userData?.shipApplicants?.length) {
    return (
      <Menu.Item
        to={`/my-projects/${address}`}
        component={Link}
        leftSection={<IconRocket stroke={1.5} color={theme.colors.violet[5]} />}
      >
        Ship Applications
      </Menu.Item>
    );
  }

  if (address && !userData?.projects?.length) {
    return (
      <Menu.Item
        component={Link}
        to={`/my-projects/${address}`}
        leftSection={<IconAward stroke={1.5} color={theme.colors.blue[5]} />}
      >
        Create a Project
      </Menu.Item>
    );
  }

  if (address) {
    return (
      <Menu.Item
        leftSection={<IconAward stroke={1.5} color={theme.colors.blue[5]} />}
      >
        My Projects
      </Menu.Item>
    );
  }
};
