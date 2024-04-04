import { useClipboard, useDisclosure } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import {
  IconChevronDown,
  IconChevronUp,
  IconCopy,
  IconExclamationCircle,
  IconLogout,
  IconUserCircle,
} from '@tabler/icons-react';
import { useAccount, useConnect, useDisconnect, useSwitchChain } from 'wagmi';

import { Address } from 'viem';
import classes from './DesktoNavStyles.module.css';
import {
  Box,
  Button,
  Menu,
  Modal,
  Stack,
  Tooltip,
  useMantineTheme,
} from '@mantine/core';
import { AddressAvatar } from '../../components/AddressAvatar';
import { appNetwork } from '../../utils/config';
import { useState } from 'react';
import { useTablet } from '../../hooks/useBreakpoint';

export const ConnectButton = () => {
  const { address, isConnected } = useAccount();
  const [opened, { open, close }] = useDisclosure(false);
  const { connectors, connect } = useConnect();

  return (
    <>
      {address && isConnected ? (
        <IsConnected address={address} />
      ) : (
        <IsNotConnected open={open} />
      )}

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

const IsNotConnected = ({ open }: { open: () => void }) => {
  const isTablet = useTablet();
  return (
    <>
      <button
        className={classes.button}
        onClick={() => {
          open();
        }}
      >
        <IconUserCircle className={classes.linkIcon} stroke={1.5} size={26} />
        {!isTablet && <span>Connect Wallet</span>}
      </button>
    </>
  );
};

const IsConnected = ({ address }: { address: Address }) => {
  const { disconnect } = useDisconnect();
  const { copy } = useClipboard();
  const theme = useMantineTheme();
  const { chain } = useAccount();
  const { switchChain } = useSwitchChain();
  const isTablet = useTablet();

  const [menuOpen, setMenuOpen] = useState(false);

  const isCorrectNetwork = appNetwork.id === chain?.id;

  return (
    <Menu opened={menuOpen} onChange={setMenuOpen}>
      <Menu.Target>
        <Button
          className={classes.button}
          w="100%"
          classNames={{ inner: classes.fullWidth }}
          pos="relative"
        >
          <AddressAvatar address={address} size={26} displayText={!isTablet} />
          {!isCorrectNetwork ? (
            <Tooltip
              label={'You are connected to the wrong network'}
              position="right"
            >
              <Box pos="absolute" right={12}>
                <IconExclamationCircle
                  color={theme.colors.yellow[6]}
                  size={18}
                />
              </Box>
            </Tooltip>
          ) : (
            <Box pos="absolute" right={isTablet ? -4 : 12}>
              {menuOpen ? (
                <IconChevronDown size={18} />
              ) : (
                <IconChevronUp size={18} />
              )}
            </Box>
          )}
        </Button>
      </Menu.Target>
      <Menu.Dropdown w={267}>
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
        <Menu.Item leftSection={<IconLogout />} onClick={() => disconnect()}>
          Disconnect
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};
