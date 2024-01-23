import { useClipboard, useDisclosure } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import { IconLogout, IconUserCircle } from '@tabler/icons-react';
import { mainnet } from 'viem/chains';
import {
  createConfig,
  http,
  useAccount,
  useDisconnect,
  useEnsAvatar,
  useEnsName,
} from 'wagmi';
import { NetworksModal } from './NetworksModal';
import { Address } from 'viem';
import classes from './DesktoNavStyles.module.css';
import { Avatar } from '@mantine/core';

export const ConnectButton = () => {
  const { address, isConnected } = useAccount();

  if (isConnected && address) return <IsConnected address={address} />;

  return <IsNotConnected />;
};

const IsNotConnected = () => {
  const [opened, { open, close }] = useDisclosure(false);
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
      <NetworksModal opened={opened} close={close} />
    </>
  );
};

const ensConfig = createConfig({
  chains: [mainnet],
  transports: {
    [mainnet.id]: http(import.meta.env.VITE_RPC_URL_ENS_MAINNET),
  },
});

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
