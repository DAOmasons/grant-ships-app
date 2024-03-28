import { Tabs } from '@mantine/core';
import { MainSection, PageTitle } from '../layout/Sections';

import { useQuery } from '@tanstack/react-query';
import { getFacDashShipData } from '../queries/getFacDashShipData';
import { FacilitatorShipDash } from '../components/dashboard/facilitator/FacilitatorShipDash';
import { FacilitatorGameDash } from '../components/dashboard/facilitator/FacilitatorGameDash';
import { useGameManager } from '../hooks/useGameMangers';
import GameManagerAbi from '../abi/GameManager.json';
import { useMemo } from 'react';
import { NETWORK_ID, SHIP_AMOUNT } from '../constants/gameSetup';
import { useReadContract } from 'wagmi';
import { ADDR } from '../constants/addresses';
import { GameStatus } from '../types/common';
import { ProjectApproval } from '../components/dashboard/facilitator/ProjectApproval';
import { FacPostUpdatePanel } from '../components/dashboard/facilitator/FacPostUpdatePanel';

export const FacilitatorDashboard = () => {
  const { data: shipData, isLoading: shipsLoading } = useQuery({
    queryKey: ['fac-ship-data'],
    queryFn: getFacDashShipData,
  });

  const { gm, isLoadingGm } = useGameManager();

  const { data: poolBalance, isLoading: poolLoading } = useReadContract({
    abi: GameManagerAbi,
    chainId: NETWORK_ID,
    functionName: 'getPoolAmount',
    address: ADDR.GAME_MANAGER,
  });

  const gameOperationStage = useMemo(() => {
    if (!gm || !shipData || typeof poolBalance !== 'bigint') {
      return undefined;
    }

    // Create Round Ready
    // if there is no game round, or game status === 0, then the game is not started
    if (!gm.currentRound) {
      return 0;
    }

    if (
      gm.currentRound.gameStatus === GameStatus.Pending &&
      poolBalance < BigInt(gm.currentRound?.totalRoundAmount)
    ) {
      return 1;
    }
    // Application Phase Ready
    // if there is is not enough ships, then we are in the application stage, stage === 1
    if (
      gm.currentRound.gameStatus === GameStatus.Pending &&
      shipData.approvedShips.length < SHIP_AMOUNT
    ) {
      return 2;
    }

    // Allocation Ready
    // if there are enough ships, then we are in the game, stage === 2
    if (
      gm.currentRound.gameStatus === GameStatus.Pending &&
      shipData.approvedShips.length >= SHIP_AMOUNT
    ) {
      return 3;
    }

    // Distribution Ready
    // if the gameStatus is 4, then we are in the distribution, stage === 3
    if (gm.currentRound.gameStatus === GameStatus.Allocated) {
      return 4;
    }

    // Start Game Ready
    // if the gameStatus is 5, then we are in the funded stage and are ready to start the game, stage === 4
    if (gm.currentRound.gameStatus === GameStatus.Funded) {
      return 5;
    }

    // Stop Game Ready
    // if the gameStatus is 6, then we are in the the we in the active stage, and can stop the game, stage === 5
    if (gm.currentRound.gameStatus === GameStatus.Active) {
      return 6;
    }

    // Game Complete Ready
    // If the gameStatus is 7, then the game is complete and and we can reset the game, stage === 6
    if (gm.currentRound.gameStatus === GameStatus.Completed) {
      return 7;
    }
  }, [shipData, gm, poolBalance]);

  return (
    <MainSection>
      <PageTitle title="Facilitator Dashboard" />
      <Tabs defaultValue="ships">
        <Tabs.List mb="xl" grow>
          <Tabs.Tab value="game-manager">Game</Tabs.Tab>
          <Tabs.Tab value="ships">Ships</Tabs.Tab>
          <Tabs.Tab value="projects">Approvals</Tabs.Tab>
          <Tabs.Tab value="post">Post</Tabs.Tab>
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
            isLoading={shipsLoading || isLoadingGm || poolLoading}
            poolBalance={poolBalance as bigint | undefined}
            shipData={shipData}
          />
        </Tabs.Panel>
        <Tabs.Panel value="projects">
          <ProjectApproval />
        </Tabs.Panel>
        <Tabs.Panel value="post">
          <FacPostUpdatePanel />
        </Tabs.Panel>
      </Tabs>
    </MainSection>
  );
};
