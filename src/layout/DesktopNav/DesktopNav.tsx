import { useEffect, useState } from 'react';
import { Group, Code, Title } from '@mantine/core';
import {
  IconHome,
  IconRocket,
  IconPacman,
  IconAward,
  IconList,
  IconFileDescription,
} from '@tabler/icons-react';
import classes from './DesktoNavStyles.module.css';
import Logo from '../../assets/Logo.svg';
import { ConnectButton } from './ConnectButton';
import { Link, useLocation } from 'react-router-dom';

const data = [
  { link: '/', label: 'Home', icon: IconHome },
  { link: '/ships', label: 'Ships', icon: IconRocket },
  { link: '/projects', label: 'Projects', icon: IconAward },
  { link: '/game-rules', label: 'Game Rules', icon: IconPacman },
  { link: '/apply', label: 'Apply', icon: IconFileDescription },
];

export function DesktopNav() {
  const location = useLocation();

  const links = data.map((item) => {
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

      <Code w="fit-content" ml={'sm'} mt={'lg'}>
        v{process.env.PACKAGE_VERSION}
      </Code>
    </nav>
  );
}
