import { Carousel } from '@mantine/carousel';
import { Box, Image, useMantineTheme } from '@mantine/core';
import React from 'react';
import { MediaType } from '../utils/media';
import classes from '../styles/MediaCarousel.module.css';

type CarouselContent = {
  url: string;
  id: string;
  mediaType: MediaType;
};

const SIZES = {
  sm: { h: 152, w: 270 },
  md: { h: 305, w: 540 },
  lg: { h: 361, w: 640 },
} as const;

type MediaCarouselProps = {
  items: CarouselContent[];
  size?: keyof typeof SIZES;
  containerProps?: React.ComponentProps<typeof Box>;
  deluxe?: boolean;
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
        withIndicators={items.length > 1}
        withControls={items.length > 1}
        w={w}
        h={h}
        controlSize={size === 'lg' ? '44' : size === 'md' ? '33' : '22'}
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
                  src={`${item.url}`}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                ></iframe>
              </Carousel.Slide>
            );
          }
          if (item.mediaType === MediaType.Vimeo) {
            return (
              <Carousel.Slide key={item.id}>
                <div style={{ position: 'relative', paddingBottom: '56.25%' }}>
                  <iframe
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                    }}
                    src={item.url}
                    frameBorder="0"
                    allow="autoplay; fullscreen; picture-in-picture; clipboard-write"
                    // title={item.url}
                  ></iframe>
                </div>
              </Carousel.Slide>
            );
          }
        })}
      </Carousel>
    </Box>
  );
};
