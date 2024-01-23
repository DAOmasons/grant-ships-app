import { useState } from 'react';
import {
  Group,
  Code,
  Title,
  Button,
  Modal,
  Stack,
  Avatar,
} from '@mantine/core';
import { useClipboard, useDisclosure } from '@mantine/hooks';
import {
  IconHome,
  IconRocket,
  IconPacman,
  IconAward,
  IconFileDescription,
  IconSquareRoundedLetterG,
  IconList,
  IconUserCircle,
  IconLogout,
} from '@tabler/icons-react';
import classes from './DesktoNavStyles.module.css';
import Logo from '../../assets/Logo.svg';
import {
  createConfig,
  useAccount,
  useChainId,
  useConnect,
  useDisconnect,
  useEnsAvatar,
  useEnsName,
} from 'wagmi';
import { Address, http } from 'viem';
import { mainnet } from 'viem/chains';
import { notifications } from '@mantine/notifications';

const data = [
  { link: '', label: 'Home', icon: IconHome },
  { link: '', label: 'Ships', icon: IconRocket },
  { link: '', label: 'Projects', icon: IconAward },
  { link: '', label: 'Game Rules', icon: IconPacman },
  { link: '', label: 'Apply', icon: IconFileDescription },
  { link: '', label: 'About', icon: IconSquareRoundedLetterG },
];

export function DesktopNav() {
  const [active, setActive] = useState('Home');
  const [, { open }] = useDisclosure(false);

  const links = data.map((item) => (
    <a
      className={classes.link}
      data-active={item.label === active || undefined}
      href={item.link}
      key={item.label}
      onClick={(event) => {
        event.preventDefault();
        setActive(item.label);
      }}
    >
      <item.icon className={classes.linkIcon} stroke={1.5} />
      <span>{item.label}</span>
    </a>
  ));

  return (
    <nav className={classes.navbar}>
      <div className={classes.navbarMain}>
        <Group className={classes.header}>
          <Logo />
          <Title order={1} fw={100} fz={32}>
            Grant Ships
          </Title>
        </Group>
        {links}
      </div>

      <Code w="fit-content" ml={'md'}>
        App Version: {process.env.PACKAGE_VERSION}
      </Code>
      <div className={classes.footer}>
        <a
          href="#"
          className={classes.link}
          onClick={(event) => event.preventDefault()}
        >
          <IconList className={classes.linkIcon} stroke={1.5} />
          <span>My Projects</span>
        </a>
      </div>
      <ConnectButton />
    </nav>
  );
}

const ConnectButton = () => {
  const { address, isConnected } = useAccount();

  // console.log('isConnected', isConnected);

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

const NetworksModal = ({ opened }: { opened: boolean; close: () => void }) => {
  const { connectors, connect } = useConnect();
  return (
    <Modal opened={opened} onClose={close} centered title="Connect Wallet">
      <Stack>
        {[...connectors]?.reverse()?.map((connector) => (
          <Button
            key={connector.uid}
            onClick={() => {
              connect({ connector });
              close();
            }}
          >
            {connector.name}
          </Button>
        ))}
      </Stack>
    </Modal>
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
