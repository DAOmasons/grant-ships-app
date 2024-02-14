import { Box, Button, Skeleton, Stack, useMantineTheme } from '@mantine/core';
import { MainSection, PageDescription, PageTitle } from '../layout/Sections';
import { Link } from 'react-router-dom';
import { ShipCard } from '../components/shipItems/ShipCard';
import { IconExclamationMark, IconPlus } from '@tabler/icons-react';

import { getShipsPageData } from '../queries/getShipsPage';
import { useQuery } from '@tanstack/react-query';
import { AppAlert } from '../components/UnderContruction';
import { ReactNode } from 'react';

export const Ships = () => {
  const {
    data: ships,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['ships-page'],
    queryFn: getShipsPageData,
  });
  const theme = useMantineTheme();

  if (isLoading) {
    return <PageLayout>{<LoadingState />}</PageLayout>;
  }

  if (error) {
    return (
      <PageLayout>
        <AppAlert
          title="Ships Page 404"
          description={error?.message || 'Error fetching ships'}
          bg={theme.colors.pink[8]}
          icon={<IconExclamationMark size={24} />}
        />
      </PageLayout>
    );
  }

  if (!ships || ships.length === 0) {
    return (
      <PageLayout>
        <AppAlert
          title="No Ships Yet"
          description={"There aren't any ships approved for this round yet"}
        />
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      {ships.map((ship, i) => (
        <ShipCard key={`shipcard-${i}`} {...ship} />
      ))}
    </PageLayout>
  );
};

const PageLayout = ({ children }: { children: ReactNode }) => {
  return (
    <MainSection>
      <PageTitle title="Grant Ships" />
      <Box w="100%">
        <PageDescription description="Grant Ships are individual Grant programs that compete to fund projects within an ecosystem. If you are interested , click below to get started." />
        <Button
          component={Link}
          to="/create-ship"
          mb="xl"
          leftSection={<IconPlus />}
        >
          Start a Grant Ship
        </Button>
        {children}
      </Box>
    </MainSection>
  );
};

const LoadingState = () => {
  return (
    <Stack>
      <Skeleton mih={235} w="100%" />
      <Skeleton mih={235} w="100%" />
      <Skeleton mih={235} w="100%" />
    </Stack>
  );
};
