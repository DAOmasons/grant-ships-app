import { ActionIcon, Affix, useMantineTheme } from '@mantine/core';
import { useBreakpoints } from '../hooks/useBreakpoint';
import { IconPlus } from '@tabler/icons-react';
import { Link } from 'react-router-dom';

export const PostAffix = ({ subUrl = 'post' }: { subUrl?: string }) => {
  const theme = useMantineTheme();

  const { isLaptop, isTablet, isMobile } = useBreakpoints();

  return (
    <Affix
      bottom={isMobile ? 70 : 32}
      right={isMobile ? '5%' : isTablet ? '10%' : isLaptop ? '10%' : '32%'}
    >
      <ActionIcon
        size="xl"
        radius="45"
        bg={theme.colors.blue[5]}
        component={Link}
        to={subUrl}
      >
        <IconPlus />
      </ActionIcon>
    </Affix>
  );
};
