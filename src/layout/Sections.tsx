import {
  ActionIcon,
  BackgroundImage,
  Box,
  Button,
  DefaultMantineColor,
  FileButton,
  Group,
  Image,
  Modal,
  StyleProp,
  Text,
  useMantineTheme,
} from '@mantine/core';
import { IconArrowNarrowLeft } from '@tabler/icons-react';
import { ReactNode, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLaptop, useMobile } from '../hooks/useBreakpoint';

export const MainSection = ({
  children,
  maw = 600,
  bg,
}: {
  children: ReactNode | ReactNode[];
  maw?: number;
  bg?: StyleProp<DefaultMantineColor | undefined>;
}) => {
  const isMobile = useMobile();
  return (
    <Box
      maw={maw}
      miw={320}
      w={'100%'}
      bg={bg}
      p={isMobile ? 'xs' : 'xl'}
      mb={isMobile ? 72 : 'xl'}
    >
      {children}
    </Box>
  );
};

export const PageTitle = ({
  title,
  backBtn = true,
  backAction,
}: {
  title: string | ReactNode;
  backBtn?: boolean;
  backAction?: () => void;
}) => {
  const navigate = useNavigate();

  const processedTitle = useMemo(() => {
    if (typeof title === 'string') {
      return (
        <Text fz={20} fw={500}>
          {title}
        </Text>
      );
    }
    return title;
  }, [title]);

  return (
    <Group w="100%" mb="lg">
      {backBtn && (
        <ActionIcon
          variant="subtle"
          onClick={() => {
            if (backAction) {
              backAction?.();
            } else {
              navigate(-1);
            }
          }}
        >
          <IconArrowNarrowLeft />
        </ActionIcon>
      )}
      {processedTitle}
    </Group>
  );
};

export const PageDescription = ({ description }: { description: string }) => {
  const theme = useMantineTheme();
  return (
    <Text fz="md" fw={400} c={theme.colors.dark[2]} mb="md">
      {description}
    </Text>
  );
};

export const ProfileSection = ({
  pageTitle,
  children,
  bannerImg,
  addBannerElement,
  bannerBg,
  spaceToRight = true,
}: {
  pageTitle: ReactNode;
  children: ReactNode;
  bannerImg?: string;
  addBannerElement?: ReactNode;
  bannerBg?: string;
  spaceToRight?: boolean;
}) => {
  const theme = useMantineTheme();
  const isMobile = useMobile();
  const isLaptop = useLaptop();
  return (
    <Box miw={isLaptop ? undefined : 600} maw={650} w="100%">
      <Box mt="xl" ml="xl">
        <PageTitle title={pageTitle} />
      </Box>
      <Box
        pos="relative"
        mr={isLaptop ? undefined : spaceToRight ? 'xl' : undefined}
      >
        <Box
          bg={bannerBg || theme.colors.dark[6]}
          h={150}
          pos="absolute"
          top={0}
          w="100%"
        >
          <BackgroundImage
            src={bannerImg || ''}
            w="100%"
            h="100%"
            opacity={0.6}
          />
          {addBannerElement}
        </Box>
        <MainSection>
          <Box pt={1}>{children}</Box>
        </MainSection>
      </Box>
    </Box>
  );
};
