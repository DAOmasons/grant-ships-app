import { useClipboard, useDisclosure } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import { IconCopy, IconLogout, IconUserCircle } from '@tabler/icons-react';
import { useAccount, useConnect, useDisconnect } from 'wagmi';

import { Address } from 'viem';
import classes from './DesktoNavStyles.module.css';
import { Button, Combobox, Menu, Modal, Stack } from '@mantine/core';
import { AddressAvatar } from '../../components/AddressAvatar';

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
  return (
    <>
      <button
        className={classes.button}
        onClick={() => {
          open();
        }}
      >
        <IconUserCircle className={classes.linkIcon} stroke={1.5} />
        <span>Connect Wallet</span>
      </button>
    </>
  );
};

const IsConnected = ({ address }: { address: Address }) => {
  const { disconnect } = useDisconnect();
  const { copy } = useClipboard();

  return (
    <Menu>
      <Menu.Target>
        <Button className={classes.button}>
          <AddressAvatar address={address} />
        </Button>
      </Menu.Target>
      <Menu.Dropdown w={267}>
        <Menu.Item
          value="1"
          key="1"
          leftSection={<IconLogout />}
          onClick={() => disconnect()}
        >
          Disconnect
        </Menu.Item>
        <Menu.Item
          value="2"
          key="2"
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
      </Menu.Dropdown>
    </Menu>
  );
};

// <button
//   className={classes.button}
//   onClick={() => {
//     disconnect();
//   }}
// >
//   <IconLogout className={classes.linkIcon} stroke={1.5} />
//   <span>Disconnect</span>
// </button>
