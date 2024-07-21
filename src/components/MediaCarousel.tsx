import { Carousel } from '@mantine/carousel';
import { Box, Image, useMantineTheme } from '@mantine/core';
import React from 'react';
import { MediaType } from '../utils/media';

type CarouselContent = {
  url: string;
  id: string;
  mediaType: MediaType;
};

const SIZES = {
  sm: { h: 152, w: 270 },
  md: { h: 305, w: 540 },
} as const;

type MediaCarouselProps = {
  items: CarouselContent[];
  size?: keyof typeof SIZES;
  containerProps?: React.ComponentProps<typeof Box>;
};

export const MediaCarousel = ({
  items,
  size = 'md',
  containerProps,
}: MediaCarouselProps) => {
  const { h, w } = SIZES[size];

  const theme = useMantineTheme();

  return (
    <Box {...containerProps}>
      <Carousel
        withIndicators
        w={w}
        h={h}
        controlSize="22"
        bg={theme.colors.dark[5]}
      >
        {items?.map((item) => {
          if (item.mediaType === MediaType.ImageLink) {
            return (
              <Carousel.Slide key={item.id}>
                <Image src={item.url} fit="cover" h={h} />
              </Carousel.Slide>
            );
          }
          if (item.mediaType === MediaType.Youtube) {
            return (
              <Carousel.Slide key={item.id}>
                <iframe
                  width={w}
                  height={h}
                  src={item.url}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                ></iframe>
              </Carousel.Slide>
            );
          }
          if (item.mediaType === MediaType.Vimeo) {
            return (
              <Carousel.Slide key={item.id}>
                <iframe
                  src={item.url}
                  width={w}
                  height={h}
                  frameBorder="0"
                  allow="autoplay; fullscreen; picture-in-picture"
                  title="Vimeo video"
                ></iframe>
              </Carousel.Slide>
            );
          }
        })}
      </Carousel>
    </Box>
  );
};
