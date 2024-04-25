import {
  ActionIcon,
  Box,
  DefaultMantineColor,
  Group,
  StyleProp,
  Text,
  useMantineTheme,
} from '@mantine/core';
import { IconArrowNarrowLeft } from '@tabler/icons-react';
import { ReactNode, useMemo } from 'react';
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
      p={isMobile ? 'xs' : 'xl'}
      w={'100%'}
      bg={bg}
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
