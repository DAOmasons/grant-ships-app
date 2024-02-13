import { ActionIcon, Box, Group, Stack, Text } from '@mantine/core';
import {
  IconBrandDiscord,
  IconBrandGithub,
  IconBrandTelegram,
  IconBrandX,
  IconMail,
  IconWorld,
} from '@tabler/icons-react';
import { AddressAvatar } from '../AddressAvatar';
import { isAddress } from 'viem';

type DetailsPanelProps = {
  details?: {
    thesis: string;
    apply: string;
    extraInfo: string;
    extraLink: string;
    members: string[];
    website: string;
    email: string;
    x: string;
    discord: string;
    telegram: string;
    github: string;
  };
};

const DummyData = {
  thesis:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut dignissim velit porta elit placerat, sit amet efficitur est elementum. Praesent semper, quam vel convallis tincidunt, nisi arcu lacinia leo, at bibendum lorem orci et arcu. Etiam tincidunt accumsan tellus et pretium. Ut tempor tempor libero ac molestie. Cras lacinia, orci id posuere consequat, sapien nunc commodo velit, ut laoreet felis orci sollicitudin lacus.',
  apply:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut dignissim velit porta elit placerat, sit amet efficitur est elementum. Praesent semper, quam vel convallis tincidunt, nisi arcu',
  extraInfo:
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
  extraLink: 'https://www.google.com',
  website: 'https://www.google.com',
  email: 'email@email.email',
  x: 'https://www.google.com',
  discord: 'https://www.google.com',
  telegram: 'https://www.google.com',
  github: 'https://www.google.com',
  members: [
    '0x756ee8B8E898D497043c2320d9909f1DD5a7077F',
    '0xD800B05c70A2071BC1E5Eac5B3390Da1Eb67bC9D',
    '0x57abda4ee50Bb3079A556C878b2c345310057569',
    '0xDE6bcde54CF040088607199FC541f013bA53C21E',
  ],
};

export const DetailsPanel = ({
  details: {
    thesis,
    apply,
    extraInfo,
    extraLink,
    members,
    website,
    email,
    x,
    discord,
    telegram,
    github,
  } = DummyData,
}: DetailsPanelProps) => {
  return (
    <Box>
      <Text fw={700} mb={'md'} fz="lg">
        Funding Vision
      </Text>
      <Text size="sm" fw={600} mb="xs">
        Impact Thesis
      </Text>
      <Text size="sm" mb="xl">
        {thesis}
      </Text>
      <Text size="sm" fw={600} mb="xs">
        How to Apply
      </Text>
      <Text size="sm" mb="xl">
        {apply}
      </Text>
      <Text size="sm" fw={600} mb="xs">
        Additional Information
      </Text>
      <Text size="sm" mb="xl">
        {extraInfo}
      </Text>
      {extraLink && (
        <>
          <Text size="sm" fw={600} mb="xs">
            Read More Here
          </Text>
          <Text
            component={'a'}
            href="#"
            size="sm"
            mb="xl"
            rel="noopener noreferrer"
            target="_blank"
          >
            {extraLink}
          </Text>
        </>
      )}
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
            <AddressAvatar key={address} address={address} />
          ) : null
        )}
      </Stack>
    </Box>
  );
};
