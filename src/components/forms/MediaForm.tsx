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
import { IconPlus, IconWorld } from '@tabler/icons-react';
import { MediaCarousel } from '../MediaCarousel';
import { MediaType } from '../../utils/media';

export const MediaForm = () => {
  const [links, setLinks] = React.useState([
    {
      id: 'showcase-link-0',
      url: '',
      mediaType: MediaType.None,
    },
  ]);
  const isMobile = useMobile();

  const handleAddLink = () => {
    setLinks((prev) => [
      ...prev,
      {
        id: `showcase-link-${prev.length}`,
        url: '',
        mediaType: MediaType.None,
      },
    ]);
  };
  console.log('links', links);
  const handleLinkChange = (id: string, value: string) => {
    setLinks((prev) =>
      prev.map((link) =>
        link.id === id
          ? { ...link, url: value, mediaType: MediaType.ImageLink }
          : link
      )
    );
  };

  return (
    <Stack
      maw={600}
      miw={300}
      w="100%"
      p={isMobile ? 'xs' : 'xl'}
      mb={isMobile ? 72 : 'xl'}
    >
      <PageTitle title="Media" backAction={() => console.log('back')} />
      <Box>
        <Text fw={700} mb="xs">
          Showcase Media
        </Text>
        <Text fz={'sm'} fs="italic" opacity={0.8}>
          Add image or video links here to create a media showcase for your
          project. The showcase supports links to png, jpg, webp, youtube, and
          vimeo.
        </Text>
      </Box>
      <MediaCarousel items={links} containerProps={{ my: 'md' }} />

      {links.map((link, index) => (
        <TextInput
          key={link.id}
          leftSection={<IconWorld size={18} />}
          placeholder="https://image-hosting/id.png"
          onBlur={(e) => handleLinkChange(link.id, e.currentTarget.value)}
        />
      ))}

      <Group w="100%" justify="center">
        <Button
          variant="secondary"
          leftSection={<IconPlus size={18} />}
          onClick={handleAddLink}
          disabled={links.length >= 4}
        >
          Add Another Link
        </Button>
      </Group>

      <Divider />
      <Text>Demo Links</Text>
      <TextInput label="Demo Link" placeholder="ex. Public Goods Death Star" />
    </Stack>
  );
};
