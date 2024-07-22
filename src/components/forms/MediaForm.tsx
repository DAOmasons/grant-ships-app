import {
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
  IconDeviceFloppy,
  IconExclamationCircle,
  IconPhoto,
  IconPlus,
  IconWorld,
} from '@tabler/icons-react';
import { MediaCarousel } from '../MediaCarousel';
import { MediaType, ShowcaseLink, parseShowcaseLink } from '../../utils/media';

export const MediaForm = ({
  onSave,
}: {
  onSave?: (sclinks: ShowcaseLink[], demoLink: string) => void;
}) => {
  const [links, setLinks] = React.useState<ShowcaseLink[]>([
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

  const handleSave = () => {
    if (onSave) {
      onSave(links, 'demo link');
    }
  };

  return (
    <Stack
      maw={600}
      miw={300}
      w="100%"
      p={isMobile ? 'xs' : 'xl'}
      mb={isMobile ? 72 : 'xl'}
    >
      <PageTitle title="Media" />
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
      <TextInput label="Demo Link" placeholder="ex. Public Goods Death Star" />
      <Group w="100%" justify="flex-end" mt="md">
        <Button leftSection={<IconDeviceFloppy />} onClick={handleSave}>
          Save
        </Button>
      </Group>
    </Stack>
  );
};
