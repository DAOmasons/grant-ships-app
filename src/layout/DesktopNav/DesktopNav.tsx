import {
  Group,
  Code,
  Title,
  useMantineTheme,
  Tooltip,
  Text,
} from '@mantine/core';
import {
  IconHome,
  IconRocket,
  IconPacman,
  IconAward,
  IconFileDescription,
  IconShieldHalf,
  IconClock,
  IconInfoCircle,
  IconExternalLink,
} from '@tabler/icons-react';
import classes from './DesktoNavStyles.module.css';
import Logo from '../../assets/Logo.svg';
import { ConnectButton } from './ConnectButton';
import { Link, useLocation } from 'react-router-dom';

import { useMemo } from 'react';
import { useUserData } from '../../hooks/useUserState';
import { useAccount } from 'wagmi';

const data = [
  { link: '/', label: 'Home', icon: IconHome },
  { link: '/ships', label: 'Ships', icon: IconRocket },
  { link: '/projects', label: 'Projects', icon: IconAward },
  { link: '/apply', label: 'Apply', icon: IconFileDescription },
  {
    href: 'https://rules.grantships.fun',
    label: (
      <Group gap={'xs'}>
        <Text>Game Rules</Text>
        <IconExternalLink
          size={14}
          style={{ transform: 'translateY(-2px)' }}
          opacity={0.7}
        />
      </Group>
    ),
    icon: IconPacman,
  },
];

export function DesktopNav() {
  const location = useLocation();
  const { userData, userLoading } = useUserData();
  const { address } = useAccount();

  const theme = useMantineTheme();

  const links = data.map((item) => {
    if (item.href)
      return (
        <a
          className={classes.link}
          href={item.href}
          target="_blank"
          rel="noreferrer"
          key={item.link || item.href}
        >
          <item.icon className={classes.linkIcon} stroke={1.5} />
          <span>{item.label}</span>
        </a>
      );

    if (item.link)
      return (
        <Link
          className={classes.link}
          data-active={location.pathname === item.link ? item.link : undefined}
          to={item.link}
          key={item.label}
        >
          <item.icon className={classes.linkIcon} stroke={1.5} />
          <span>{item.label}</span>
        </Link>
      );
  });

  const dashboardLink = useMemo(() => {
    if (userLoading)
      return (
        <Link to="#" className={classes.link}>
          <IconClock className={classes.linkIcon} stroke={1.5} />
          <span>Loading...</span>
        </Link>
      );

    if (userData?.isFacilitator) {
      return (
        <Link to="/facilitator-dashboard" className={classes.link}>
          <IconShieldHalf
            className={classes.linkIcon}
            stroke={1.5}
            color={theme.colors.pink[5]}
          />
          <span>Dashboard</span>
        </Link>
      );
    }

    if (userData?.isShipOperator && userData?.shipAddress) {
      return (
        <Link
          to={`/ship-operator-dashboard/${userData?.shipAddress}`}
          className={classes.link}
        >
          <IconRocket
            className={classes.linkIcon}
            stroke={1.5}
            color={theme.colors.violet[5]}
          />
          <span>Dashboard</span>
        </Link>
      );
    }

    if (address && !userData?.projects?.length) {
      return (
        <Link to={`/my-projects/${address}`} className={classes.link}>
          <IconAward
            className={classes.linkIcon}
            stroke={1.5}
            color={theme.colors.blue[5]}
          />
          <span>My Projects</span>
          <Tooltip ml="auto" label={"You don't have any projects yet"}>
            <IconInfoCircle
              size={18}
              color={theme.colors.yellow[6]}
              style={{ marginLeft: 'auto' }}
            />
          </Tooltip>
        </Link>
      );
    }

    if (address) {
      return (
        <Link to={`/my-projects/${address}`} className={classes.link}>
          <IconAward
            className={classes.linkIcon}
            stroke={1.5}
            color={theme.colors.blue[5]}
          />
          <span>My Projects</span>
        </Link>
      );
    }

    return null;
  }, [userData, theme, address, userLoading]);

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

      <div className={classes.footer}>{dashboardLink}</div>
      <ConnectButton />

      <Code w="fit-content" ml={'sm'} mt={'lg'}>
        v{process.env.PACKAGE_VERSION}
      </Code>
    </nav>
  );
}
