import { useState } from 'react';
import { Group, Code, Title } from '@mantine/core';
import {
  IconHome,
  IconRocket,
  IconPacman,
  IconAward,
  IconFileDescription,
  IconSquareRoundedLetterG,
} from '@tabler/icons-react';
import classes from './DesktoNavStyles.module.css';
import Logo from '../../assets/Logo.svg';

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
          <Title order={1} fw={100}>
            Grant Ships
          </Title>
          <Code w="fit-content">v{process.env.PACKAGE_VERSION}</Code>
        </Group>
        {links}
      </div>
    </nav>
  );
}
