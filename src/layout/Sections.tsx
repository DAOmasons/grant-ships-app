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
import { useMobile } from '../hooks/useBreakpoint';

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
      m={isMobile ? 'xs' : 'xl'}
      mb={isMobile ? 72 : 'xl'}
    >
      {children}
    </Box>
  );
};

export const PageTitle = ({
  title,
  backBtn = true,
}: {
  title: string | ReactNode;
  backBtn?: boolean;
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
        <ActionIcon variant="subtle" onClick={() => navigate(-1)}>
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
}: {
  pageTitle: ReactNode;
  children: ReactNode;
}) => {
  const theme = useMantineTheme();
  const isMobile = useMobile();

  const [img, setImg] = useState<File | undefined>(undefined);
  const [modalOpened, setModalOpened] = useState(false);

  const handleUpload = (file: File | null) => {
    if (file) {
      setImg(file);
    }
  };

  return (
    <Box>
      <Box mt="xl" ml="xl">
        <PageTitle title={pageTitle} />
      </Box>
      <Box pos="relative" mr="xl">
        <Box bg={theme.colors.dark[6]} h={152} pos="absolute" top={0} w="100%">
          <BackgroundImage
            src={img ? URL.createObjectURL(img) : ''}
            w="100%"
            h="100%"
            opacity={0.6}
          />
        </Box>
        <MainSection>
          <Box pt={1}>{children}</Box>
        </MainSection>
      </Box>
    </Box>
  );
};
