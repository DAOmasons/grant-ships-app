import {
  Avatar,
  AvatarGroup,
  Box,
  Button,
  Divider,
  Flex,
  Menu,
  MenuItem,
  Modal,
  Stack,
  Text,
  useMantineTheme,
} from '@mantine/core';
import { useClipboard, useDisclosure } from '@mantine/hooks';
import { useState } from 'react';
import { useAccount, useConnect, useDisconnect, useSwitchChain } from 'wagmi';
import { appNetwork } from '../../utils/config';
import { navItems } from '../../constants/navItems';
import { Link, useLocation } from 'react-router-dom';
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
import { notifications } from '@mantine/notifications';
import { useUserData } from '../../hooks/useUserState';

import { getAllUserGrants } from '../../queries/getProjectGrants';
import { GAME_MANAGER } from '../../constants/gameSetup';
import { Address } from 'viem';
import { useQuery } from '@tanstack/react-query';

export const MobileNav = () => {
  const theme = useMantineTheme();
  const location = useLocation();
  const { address, isConnected, chain } = useAccount();
  const { switchChain } = useSwitchChain();
  const { copy } = useClipboard();
  const { disconnect } = useDisconnect();

  const [menuOpen, setMenuOpen] = useState(false);

  const {
    data: grants,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['user-project-grants', address, GAME_MANAGER.ADDRESS],
    queryFn: () => getAllUserGrants(address as Address, GAME_MANAGER.ADDRESS),
    enabled: !!address,
  });

  const isCorrectNetwork = appNetwork.id === chain?.id;
  return (
    <Box w="100%">
      <Box
        pos="fixed"
        bottom={0}
        bg={theme.colors.dark[7]}
        w="100%"
        style={{ zIndex: 10, borderTop: '1px solid #333' }}
      >
        <Flex justify={'space-around'} align="center">
          {navItems
            .filter((item) => item.link)
            .map((item) => {
              const isActive = location.pathname === item.link;
              return (
                <Flex
                  key={item.link}
                  component={Link}
                  to={item.link as string}
                  direction="column"
                  align="center"
                  w="fit-content"
                  p={4}
                  px={'xs'}
                  td="none"
                  style={{
                    borderBottom: `2px solid ${isActive ? theme.colors.blue[6] : 'transparent'}`,
                  }}
                >
                  <item.icon size={24} />
                  <Text size="xs" mt={2}>
                    {item.label}
                  </Text>
                </Flex>
              );
            })}

          {isConnected ? (
            <Menu opened={menuOpen} onChange={setMenuOpen} offset={12}>
              <Menu.Target>
                <IconChevronUp size={24} />
              </Menu.Target>
              <Menu.Dropdown w="100%">
                {grants?.length && grants.length > 0 && (
                  <Box mb="md" mt="sm">
                    <Text fz="sm" ml="sm" mb="sm" c={theme.colors.gray[6]}>
                      Grants
                    </Text>
                    {grants?.map((grant, index) => (
                      <MenuItem
                        component={Link}
                        to={`grant/${grant.id}`}
                        key={grant.id}
                        mb={grants?.length - 1 === index ? 'md' : 0}
                      >
                        <Flex align="center" gap={8}>
                          <AvatarGroup>
                            <Avatar
                              src={grant.project.metadata.imgUrl}
                              size={24}
                            />
                            <Avatar
                              src={grant.ship.profileMetadata.imgUrl}
                              size={24}
                            />
                          </AvatarGroup>
                          <Text
                            fz="sm"
                            style={{
                              flexGrow: 1,
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              whiteSpace: 'nowrap',
                            }}
                          >
                            {grant.project?.name} {'<>'} {grant.ship?.name}
                          </Text>
                        </Flex>
                      </MenuItem>
                    ))}

                    <Divider />
                  </Box>
                )}
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
        component={Link}
        to={`/my-projects/${address}`}
        leftSection={<IconAward stroke={1.5} color={theme.colors.blue[5]} />}
      >
        My Projects
      </Menu.Item>
    );
  }
};
