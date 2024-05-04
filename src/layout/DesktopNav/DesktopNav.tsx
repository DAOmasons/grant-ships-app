import { Group, Code, Title, useMantineTheme, Tooltip } from '@mantine/core';
import {
  IconRocket,
  IconAward,
  IconShieldHalf,
  IconClock,
  IconInfoCircle,
} from '@tabler/icons-react';
import classes from './DesktoNavStyles.module.css';
import Logo from '../../assets/Logo.svg';
import { ConnectButton } from './ConnectButton';
import { Link, useLocation } from 'react-router-dom';

import { useMemo } from 'react';
import { useUserData } from '../../hooks/useUserState';
import { useAccount } from 'wagmi';
import { navItems } from '../../constants/navItems';
import { useTablet } from '../../hooks/useBreakpoint';

export function DesktopNav() {
  const location = useLocation();
  const { userData, userLoading } = useUserData();
  const { address } = useAccount();

  const isTablet = useTablet();

  const theme = useMantineTheme();

  const links = navItems.map((item) => {
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
          {!isTablet && <span>{item.label}</span>}
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
          {!isTablet && <span>{item.label}</span>}
        </Link>
      );
  });

  const dashboardLink = useMemo(() => {
    if (userLoading)
      return (
        <Link to="#" className={classes.link}>
          <IconClock className={classes.linkIcon} stroke={1.5} />
          {!isTablet && <span>Loading...</span>}
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
          {!isTablet && <span>Dashboard</span>}
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
          {!isTablet && <span>Dashboard</span>}
        </Link>
      );
    }

    if (address && userData?.shipApplicants?.length) {
      return (
        <Link to={`/my-projects/${address}`} className={classes.link}>
          <IconRocket
            className={classes.linkIcon}
            stroke={1.5}
            color={theme.colors.violet[5]}
          />
          {!isTablet && <span>Ship Applications</span>}
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
          {!isTablet && <span>My Projects</span>}
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
          {!isTablet && <span>My Projects</span>}
        </Link>
      );
    }

    return null;
  }, [userData, theme, address, userLoading, isTablet]);

  return (
    <nav className={classes.navbar}>
      <div className={classes.navbarMain}>
        <Group className={classes.header}>
          <Link to="/">
            <Logo />
          </Link>
          {!isTablet && (
            <Title order={1} fw={100} fz={32}>
              Grant Ships
            </Title>
          )}
        </Group>
        {links}
      </div>

      <div className={classes.footer}>{dashboardLink}</div>
      <ConnectButton />

      {!isTablet && (
        <Code w="fit-content" ml={'sm'} mt={'lg'}>
          v{process.env.PACKAGE_VERSION}
        </Code>
      )}
    </nav>
  );
}
