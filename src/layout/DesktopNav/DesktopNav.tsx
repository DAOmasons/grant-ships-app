import { useState } from 'react';
import { Group, Code, Title } from '@mantine/core';
import {
  IconHome,
  IconRocket,
  IconPacman,
  IconAward,
  IconFileDescription,
  IconSquareRoundedLetterG,
  IconList,
} from '@tabler/icons-react';
import classes from './DesktoNavStyles.module.css';
import Logo from '../../assets/Logo.svg';
import { ConnectButton } from './ConnectButton';

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
