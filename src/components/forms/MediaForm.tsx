import {
  ActionIcon,
  Box,
  Button,
  Divider,
  Group,
  Stack,
  Text,
  TextInput,
  Tooltip,
} from '@mantine/core';

import { useMobile } from '../../hooks/useBreakpoint';
import { PageTitle } from '../../layout/Sections';
import {
  IconBrandVimeo,
  IconBrandYoutube,
  IconExclamationCircle,
  IconPhoto,
  IconPlayerPlay,
  IconPlus,
  IconWorld,
} from '@tabler/icons-react';
import { MediaCarousel } from '../MediaCarousel';
import { MediaType, ShowcaseLink, parseShowcaseLink } from '../../utils/media';
import { UseFormReturnType } from '@mantine/form';
import { useNavigate } from 'react-router-dom';

export const MediaForm = ({ form }: { form: UseFormReturnType<any> }) => {
  const isMobile = useMobile();
  const navigate = useNavigate();

  const handleAddLink = () => {
    const prevLinks = form.values.showcaseLinks;

    if (!prevLinks) {
      console.error('showcaseLinks not found in form values');
      return;
    }

    form.setFieldValue('showcaseLinks', [
      ...prevLinks,
      {
        id: `showcase-link-${prevLinks.length}`,
        url: '',
        mediaType: MediaType.None,
      },
    ]);
  };

  const handleLinkChange = (id: string, value: string) => {
    const prevLinks = form.values.showcaseLinks;

    if (!prevLinks) {
      console.error('showcaseLinks not found in form values');
      return;
    }
    const newLinks = prevLinks.map((link: ShowcaseLink) => {
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
    });
    form.setFieldValue('showcaseLinks', newLinks);
  };

  const handleUpdate = () => {
    navigate(-1);
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
      <MediaCarousel
        items={form.values.showcaseLinks}
        containerProps={{ my: 'md' }}
      />

      {form.values.showcaseLinks?.map((link: ShowcaseLink, i: number) => {
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
            {...form.getInputProps(`showcaseLinks.${i}.url`)}
            error={link.mediaType === MediaType.Unknown ? 'Invalid link' : null}
            onChange={(e) => {
              form.getInputProps(`showcaseLinks.${link.id}`).onBlur(e);
              handleLinkChange(link.id, e.currentTarget.value);
            }}
          />
        );
      })}

      <Group w="100%" justify="center">
        <Button
          variant="secondary"
          leftSection={<IconPlus size={18} />}
          onClick={handleAddLink}
          disabled={form.values.showcaseLinks.length >= 4}
        >
          Add Another Link
        </Button>
      </Group>

      <Divider />
      <Box mb="md">
        <TextInput
          mb="md"
          leftSection={<IconWorld size={18} />}
          label="Demo Link"
          description="Link to your game or app. This will be displayed front and center on your project page."
          placeholder="https://your-product-demo.com"
          {...form.getInputProps('mainDemoLink')}
        />
        {form.values?.mainDemoLink &&
          form.getInputProps('mainDemoLink').error === undefined && (
            <Group>
              <Text fz="sm" opacity={0.8}>
                Test Demo
              </Text>
              <Tooltip label="Try Demo">
                <ActionIcon
                  variant="priority"
                  size="lg"
                  radius={100}
                  component="a"
                  href={form.values?.mainDemoLink}
                  rel="noreferrer"
                  target="_blank"
                >
                  <IconPlayerPlay size={16} />
                </ActionIcon>
              </Tooltip>
            </Group>
          )}
      </Box>
      <Group w="100%" justify="flex-end" mt="md">
        <Button onClick={handleUpdate}>Update</Button>
      </Group>
    </Stack>
  );
};
