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
  return (
    <>
      <Text fw={700} fz="lg" mb={'md'} mt="xl">
        Contact
      </Text>
      <Group gap={20} mb="xl">
        {website && (
          <ActionIcon variant="subtle">
            <IconWorld size={22} />
          </ActionIcon>
        )}
        {email && (
          <ActionIcon variant="subtle">
            <IconMail size={22} />
          </ActionIcon>
        )}
        {github && (
          <ActionIcon variant="subtle">
            <IconBrandGithub size={22} />
          </ActionIcon>
        )}
        {x && (
          <ActionIcon variant="subtle">
            <IconBrandX size={22} />
          </ActionIcon>
        )}
        {discord && (
          <ActionIcon variant="subtle">
            <IconBrandDiscord size={22} />
          </ActionIcon>
        )}
        {telegram && (
          <ActionIcon variant="subtle">
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
            <AddressAvatar key={address} address={address} fz={'sm'} />
          ) : null
        )}
      </Stack>
    </>
  );
};
