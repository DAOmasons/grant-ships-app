import {
  ActionIcon,
  Box,
  Button,
  Divider,
  Group,
  Stack,
  Text,
  TextInput,
} from '@mantine/core';
import React from 'react';
import { useMobile } from '../../hooks/useBreakpoint';
import { PageTitle } from '../../layout/Sections';
import { IconArrowNarrowLeft, IconGlobe, IconWorld } from '@tabler/icons-react';

const links = [
  {
    id: 'showcase-link-0',
    url: '',
    mediaType: '',
  },
];

export const MediaForm = () => {
  const isMobile = useMobile();

  return (
    <Box>
      <PageTitle title="Media" backAction={() => console.log('back')} />
      <Stack
        maw={600}
        miw={300}
        w="100%"
        p={isMobile ? 'xs' : 'xl'}
        mb={isMobile ? 72 : 'xl'}
      >
        <Text>Carousel Media</Text>
        {links.map((link, index) => (
          <TextInput
            key={link.id}
            leftSection={<IconWorld size={18} />}
            placeholder="https://image-hosting/id.png"
          />
        ))}

        <Group>
          <Button variant="secondary">Add Another Link</Button>
        </Group>

        <Divider />
        <Text>Demo Links</Text>
        <TextInput
          label="Demo Link"
          placeholder="ex. Public Goods Death Star"
        />
      </Stack>
    </Box>
  );
};
