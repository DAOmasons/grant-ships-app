import { Group, Text } from '@mantine/core';
import {
  IconAward,
  IconExternalLink,
  IconFileDescription,
  IconHome,
  IconPacman,
  IconRocket,
} from '@tabler/icons-react';

export const navItems = [
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
