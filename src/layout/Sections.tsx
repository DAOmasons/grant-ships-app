import { ActionIcon, Box, Group, Text, useMantineTheme } from '@mantine/core';
import { IconArrowNarrowLeft } from '@tabler/icons-react';
import { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

export const MainSection = ({
  children,
}: {
  children: ReactNode | ReactNode[];
}) => {
  return (
    <Box maw={600} miw={350} w={'100%'} m="xl">
      {children}
    </Box>
  );
};

export const PageTitle = ({
  title,
  backBtn = true,
}: {
  title: string;
  backBtn?: boolean;
}) => {
  const navigate = useNavigate();
  return (
    <Group w="100%" mb="lg">
      {backBtn && (
        <ActionIcon variant="subtle" onClick={() => navigate(-1)}>
          <IconArrowNarrowLeft />
        </ActionIcon>
      )}
      <Text fz={20} fw={500}>
        {title}
      </Text>
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