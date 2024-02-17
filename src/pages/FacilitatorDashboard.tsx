import { Tabs } from '@mantine/core';
import { MainSection, PageTitle } from '../layout/Sections';

import { useQuery } from '@tanstack/react-query';
import { getFacDashShipData } from '../queries/getFacDashShipData';
import { FacilitatorShipDash } from '../components/dashboard/facilitator/FacilitatorShipDash';
import { FacilitatorGameDash } from '../components/dashboard/facilitator/FacilitatorGameDash';
import { AppAlert } from '../components/UnderContruction';
import { useGameManager } from '../hooks/useGameMangers';
import { useMemo } from 'react';
import { SHIP_AMOUNT } from '../constants/gameSetup';

export const FacilitatorDashboard = () => {
  const { data: shipData, isLoading: shipsLoading } = useQuery({
    queryKey: ['facShipData'],
    queryFn: getFacDashShipData,
  });

  const { gm, isLoadingGm } = useGameManager();

  const gameOperationStage = useMemo(() => {
    if (!gm || !shipData) {
      return undefined;
    }

    // Create Round Ready
    // if there is no game round, or game status === 0, then the game is not started
    if (!gm.currentRound || gm.currentRound.gameStatus === 0) {
      return 0;
    }

    // Application Phase Ready
    // if there is is not enough ships, then we are in the application stage, stage === 1
    if (shipData.approvedShips.length < SHIP_AMOUNT) {
      return 1;
    }

    // Allocation Ready
    // if there are enough ships, then we are in the game, stage === 2
    if (shipData.approvedShips.length >= SHIP_AMOUNT) {
      return 2;
    }

    // Distribution Ready
    // if the gameStatus is 4, then we are in the distribution, stage === 3
    if (gm.currentRound.gameStatus === 4) {
      return 3;
    }

    // Start Game Ready
    // if the gameStatus is 5, then we are in the funded stage and are ready to start the game, stage === 4
    if (gm.currentRound.gameStatus === 5) {
      return 4;
    }

    // Stop Game Ready
    // if the gameStatus is 6, then we are in the the we in the active stage, and can stop the game, stage === 5
    if (gm.currentRound.gameStatus === 6) {
      return 5;
    }

    // Game Complete Ready
    // If the gameStatus is 7, then the game is complete and and we can reset the game, stage === 6
    if (gm.currentRound.gameStatus === 7) {
      return 6;
    }
  }, [shipData, gm]);

  return (
    <MainSection>
      <PageTitle title="Facilitator Dashboard" />
      <Tabs defaultValue="ships">
        <Tabs.List mb="xl" grow>
          <Tabs.Tab value="game-manager">Game</Tabs.Tab>
          <Tabs.Tab value="ships">Ships</Tabs.Tab>
          <Tabs.Tab value="hats">Post</Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel value="ships">
          <FacilitatorShipDash
            gm={gm}
            shipData={shipData}
            isLoading={shipsLoading || isLoadingGm}
          />
        </Tabs.Panel>
        <Tabs.Panel value="game-manager">
          <FacilitatorGameDash
            gm={gm}
            gameStatusNumber={gameOperationStage}
            shipsLoading={shipsLoading}
            shipData={shipData}
          />
        </Tabs.Panel>
        <Tabs.Panel value="hats">
          <AppAlert
            title="This Feature is under construction."
            description="Check back soon to try it out!"
          />
        </Tabs.Panel>
      </Tabs>
    </MainSection>
  );
};
