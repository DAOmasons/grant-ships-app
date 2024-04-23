import { ActionIcon, Group, Stack, Text } from '@mantine/core';
import {
  IconBrandDiscord,
  IconBrandGithub,
  IconBrandTelegram,
  IconBrandX,
  IconMail,
  IconWorld,
} from '@tabler/icons-react';

import { isAddress } from 'viem';
import { AddressAvatar } from './AddressAvatar';
import { useClipboard } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';

type ContactProps = {
  website?: string;
  email?: string;
  github?: string;
  x?: string;
  discord?: string;
  telegram?: string;
  members: string[];
};

export const Contact = ({
  website,
  email,
  github,
  x,
  discord,
  telegram,
  members,
}: ContactProps) => {
  const { copy } = useClipboard();

  const handleCopy = (text: string) => {
    copy(text);
    notifications.show({
      title: 'Copied to clipboard',
      message: text,
      color: 'teal',
    });
  };

  return (
    <>
      <Text fw={700} fz="lg" mb={'md'} mt="xl">
        Contact
      </Text>
      <Group gap={20} mb="xl">
        {website && (
          <ActionIcon
            variant="subtle"
            component="a"
            href={website}
            rel="noopener noreferrer"
            target="_blank"
          >
            <IconWorld size={22} />
          </ActionIcon>
        )}
        {email && (
          <ActionIcon variant="subtle" onClick={() => handleCopy(email)}>
            <IconMail size={22} />
          </ActionIcon>
        )}
        {github && (
          <ActionIcon
            variant="subtle"
            href={github}
            component="a"
            rel="noopener noreferrer"
            target="_blank"
          >
            <IconBrandGithub size={22} />
          </ActionIcon>
        )}
        {x && (
          <ActionIcon
            variant="subtle"
            href={x}
            component="a"
            rel="noopener noreferrer"
            target="_blank"
          >
            <IconBrandX size={22} />
          </ActionIcon>
        )}
        {discord && (
          <ActionIcon
            variant="subtle"
            href={discord}
            component="a"
            rel="noopener noreferrer"
            target="_blank"
          >
            <IconBrandDiscord size={22} />
          </ActionIcon>
        )}
        {telegram && (
          <ActionIcon
            variant="subtle"
            href={telegram}
            component="a"
            rel="noopener noreferrer"
            target="_blank"
          >
            <IconBrandTelegram size={22} />
          </ActionIcon>
        )}
      </Group>
      <Text fw={700} fz="lg" mb={'md'}>
        Members
      </Text>
      <Stack>
        {members.map((address) =>
          isAddress(address) ? (
            <AddressAvatar key={address} address={address} fz={'sm'} canCopy />
          ) : null
        )}
      </Stack>
    </>
  );
};
