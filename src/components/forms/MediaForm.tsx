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
import {
  IconBrandVimeo,
  IconBrandYoutube,
  IconExclamationCircle,
  IconPhoto,
  IconPlus,
  IconWorld,
} from '@tabler/icons-react';
import { MediaCarousel } from '../MediaCarousel';
import {
  MediaType,
  detectMediaTypeFromUrl,
  parseShowcaseLink,
} from '../../utils/media';

type ShowcaseLink = {
  id: string;
  url: string;
  mediaType: MediaType;
};

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

  const handleLinkChange = (id: string, value: string) => {
    setLinks((prev) =>
      prev.map((link) => {
        if (link.id === id) {
          const { url, mediaType } = parseShowcaseLink(value);

          if (url === null) {
            return {
              ...link,
              url: '',
              mediaType: MediaType.Unknown,
            };
          } else {
            return {
              ...link,
              url,
              mediaType,
            };
          }
        }
        return link;
      })
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

      {links.map((link) => {
        const icon =
          link.mediaType === MediaType.ImageLink ? (
            <IconPhoto size={18} />
          ) : link.mediaType === MediaType.Youtube ? (
            <IconBrandYoutube size={18} />
          ) : link.mediaType === MediaType.Vimeo ? (
            <IconBrandVimeo size={18} />
          ) : link.mediaType === MediaType.Unknown ? (
            <IconExclamationCircle size={18} />
          ) : (
            <IconWorld size={18} />
          );
        return (
          <TextInput
            key={link.id}
            leftSection={icon}
            placeholder="https://image-hosting/id.png"
            onBlur={(e) => handleLinkChange(link.id, e.currentTarget.value)}
          />
        );
      })}

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
