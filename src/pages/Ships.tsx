import { Box, Button, Skeleton, Stack, useMantineTheme } from '@mantine/core';
import { MainSection, PageDescription, PageTitle } from '../layout/Sections';
import { Link } from 'react-router-dom';
import { ShipCard } from '../components/shipItems/ShipCard';
import { IconExclamationMark, IconPlus } from '@tabler/icons-react';

import { getShipsPageData } from '../queries/getShipsPage';
import { useQuery } from '@tanstack/react-query';
import { AppAlert } from '../components/UnderContruction';
import { ReactNode, useMemo } from 'react';
import { GameStatus } from '../types/common';
import { useGameManager } from '../hooks/useGameMangers';

export const Ships = () => {
  const { gm, isLoadingGm, gmError } = useGameManager();

  const {
    data: ships,
    isLoading: isLoadingShips,
    error,
  } = useQuery({
    queryKey: ['ships-page'],
    queryFn: getShipsPageData,
  });

  const isLoading = isLoadingShips || isLoadingGm;

  const currentRoundStatus = gm?.currentRound?.gameStatus as
    | GameStatus
    | undefined;
  const theme = useMantineTheme();

  if (isLoading) {
    return (
      <PageLayout gameStatus={currentRoundStatus || GameStatus.None}>
        <LoadingState />
      </PageLayout>
    );
  }

  if (error || gmError) {
    return (
      <PageLayout gameStatus={currentRoundStatus || GameStatus.None}>
        <AppAlert
          title="Ships Page 404"
          description={
            error?.message || gmError?.message || 'Error fetching ships'
          }
          bg={theme.colors.pink[8]}
          icon={<IconExclamationMark size={24} />}
        />
      </PageLayout>
    );
  }

  if (!ships || ships.length === 0 || !currentRoundStatus) {
    return (
      <PageLayout gameStatus={currentRoundStatus || GameStatus.None}>
        <AppAlert
          title="No Ships Yet"
          description={"There aren't any ships approved for this round yet"}
        />
      </PageLayout>
    );
  }

  return (
    <PageLayout gameStatus={currentRoundStatus || GameStatus.None}>
      {ships.map((ship, i) => (
        <ShipCard
          key={`shipcard-${i}`}
          {...ship}
          gameStatus={currentRoundStatus}
        />
      ))}
    </PageLayout>
  );
};

const PageLayout = ({
  children,
  gameStatus,
}: {
  children: ReactNode;
  gameStatus: GameStatus;
}) => {
  const pageDescriptionText = useMemo(() => {
    if (gameStatus < GameStatus.Allocated) {
      return 'Grant Ships are individual Grant programs that compete to fund projects within an ecosystem. If you are interested , click below to get started.';
    }
    if (gameStatus === GameStatus.Completed) {
      return 'Grant Ships are individual Grant programs that compete to fund projects within an ecosystem. If you are interested in running a ship next round, click below to get started.';
    }

    return 'Grant Ships are individual Grant programs that compete to fund projects within an ecosystem.';
  }, [gameStatus]);

  const canApply =
    gameStatus < GameStatus.Allocated || gameStatus === GameStatus.Completed;

  return (
    <MainSection>
      <PageTitle title="Grant Ships" />
      <Box w="100%">
        <PageDescription description={pageDescriptionText} />
        <Button
          component={Link}
          to="/create-ship"
          mb="xl"
          leftSection={<IconPlus />}
          disabled={!canApply}
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
