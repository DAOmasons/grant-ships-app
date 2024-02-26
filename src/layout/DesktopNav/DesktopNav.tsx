import { Group, Code, Title, useMantineTheme } from '@mantine/core';
import {
  IconHome,
  IconRocket,
  IconPacman,
  IconAward,
  IconFileDescription,
  IconShieldHalf,
  IconClock,
} from '@tabler/icons-react';
import classes from './DesktoNavStyles.module.css';
import Logo from '../../assets/Logo.svg';
import { ConnectButton } from './ConnectButton';
import { Link, useLocation } from 'react-router-dom';

import { useMemo } from 'react';
import { useUserData } from '../../hooks/useUserState';

const data = [
  { link: '/', label: 'Home', icon: IconHome },
  { link: '/ships', label: 'Ships', icon: IconRocket },
  { link: '/projects', label: 'Projects', icon: IconAward },
  {
    href: 'https://rules.grantships.fun',
    label: 'Game Rules',
    icon: IconPacman,
  },
  { link: '/apply', label: 'Apply', icon: IconFileDescription },
];

export function DesktopNav() {
  const location = useLocation();
  const { userData } = useUserData();

  const theme = useMantineTheme();

  const links = data.map((item) => {
    if (item.href)
      return (
        <a
          className={classes.link}
          href={item.href}
          target="_blank"
          rel="noreferrer"
          key={item.label}
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
    if (!userData)
      return (
        <Link to="#" className={classes.link}>
          <IconClock className={classes.linkIcon} stroke={1.5} />
          <span>Loading...</span>
        </Link>
      );

    if (userData.isFacilitator) {
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

    if (userData.isShipOperator && userData.shipAddress) {
      return (
        <Link
          to={`/ship-operator-dashboard/${userData.shipAddress}`}
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
    } else {
      return (
        <Link to="/my-projects" className={classes.link}>
          <IconAward
            className={classes.linkIcon}
            stroke={1.5}
            color={theme.colors.blue[5]}
          />
          <span>My Projects</span>
        </Link>
      );
    }
  }, [userData, theme]);

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
