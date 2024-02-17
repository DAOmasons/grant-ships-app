import { Tabs } from '@mantine/core';
import { MainSection, PageTitle } from '../layout/Sections';

import { useQuery } from '@tanstack/react-query';
import { getFacDashShipData } from '../queries/getFacDashShipData';
import { FacilitatorShipDash } from '../components/dashboard/facilitator/FacilitatorShipDash';
import { FacilitatorGameDash } from '../components/dashboard/facilitator/FacilitatorGameDash';
import { AppAlert } from '../components/UnderContruction';
import { useGameManager } from '../hooks/useGameMangers';

export const FacilitatorDashboard = () => {
  const { data: shipData, isLoading: shipsLoading } = useQuery({
    queryKey: ['facShipData'],
    queryFn: getFacDashShipData,
  });

  const { gm } = useGameManager();

  console.log('gm', gm);

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
          <FacilitatorShipDash shipData={shipData} isLoading={shipsLoading} />
        </Tabs.Panel>
        <Tabs.Panel value="game-manager">
          <FacilitatorGameDash
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
