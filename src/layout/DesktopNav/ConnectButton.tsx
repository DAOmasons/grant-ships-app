import { useClipboard, useDisclosure } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import { IconLogout, IconUserCircle } from '@tabler/icons-react';
import { mainnet } from 'viem/chains';
import {
  createConfig,
  http,
  useAccount,
  useConnect,
  useDisconnect,
  useEnsAvatar,
  useEnsName,
} from 'wagmi';

import { Address } from 'viem';
import classes from './DesktoNavStyles.module.css';
import { Avatar, Button, Modal, Stack } from '@mantine/core';
import { ensConfig } from '../../utils/config';

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
  const { data: ensName } = useEnsName({
    address,
    config: ensConfig,
    chainId: mainnet.id,
  });

  const { data: ensAvatar } = useEnsAvatar({ name: ensName! });
  const { disconnect } = useDisconnect();
  const { copy } = useClipboard();

  return (
    <>
      <button
        className={classes.button}
        onClick={() => {
          copy(address);
          notifications.show({
            title: 'Address Copied',
            message: `Address: ${address} has been copied to clipboard`,
          });
        }}
      >
        <Avatar
          className={classes.avatar}
          src={ensAvatar || `https://effigy.im/a/${address}.svg`}
          size={28}
        />
        <span>
          {ensName ? ensName : address.slice(0, 6) + '...' + address.slice(-4)}
        </span>
      </button>
      <button
        className={classes.button}
        onClick={() => {
          disconnect();
        }}
      >
        <IconLogout className={classes.linkIcon} stroke={1.5} />
        <span>Disconnect</span>
      </button>
    </>
  );
};
