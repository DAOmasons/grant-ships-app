import { Stack, Tabs, Text } from '@mantine/core';
import { MainSection, PageTitle } from '../layout/Sections';
import { ShipDashCard } from '../components/dashboard/ShipDashCard';
import { GameStatus } from '../types/common';

export const FacilitatorDashboard = () => {
  return (
    <MainSection>
      <PageTitle title="Facilitator Dashboard" />
      <Tabs defaultValue="ships">
        <Tabs.List mb="xl" grow>
          <Tabs.Tab value="game-manager">Game</Tabs.Tab>
          <Tabs.Tab px="xl" value="ships">
            Ships
          </Tabs.Tab>
          {/* <Tabs.Tab value="projects">Projects</Tabs.Tab> */}

          <Tabs.Tab value="hats">Hats</Tabs.Tab>
          {/* <Tabs.Tab value="flags">Flags</Tabs.Tab> */}
        </Tabs.List>
        <Tabs.Panel value="ships">
          <FacilitatorShipDash />
        </Tabs.Panel>
        <Tabs.Panel value="game-manager">Game Manager</Tabs.Panel>
      </Tabs>
    </MainSection>
  );
};

export const FacilitatorGameDash = () => {
  return (
    <Stack gap="xl">
      <Text>Game Manager</Text>
    </Stack>
  );
};

export const FacilitatorShipDash = () => {
  return (
    <Stack gap="xl">
      <Stack>
        <Text fw={500}>Open Applications (3)</Text>
        <ShipDashCard
          name="Public Goods Deathstar"
          lastUpdate="1 day ago"
          shipStatus={GameStatus.Pending}
        />
        <ShipDashCard
          name="Money Beam"
          lastUpdate="3 days ago"
          shipStatus={GameStatus.Pending}
        />
        <ShipDashCard
          name="Warp 3"
          lastUpdate="4 hours ago"
          shipStatus={GameStatus.Pending}
        />
      </Stack>
      <Stack>
        <Text fw={500}>Accepted Applications (1)</Text>
        <ShipDashCard
          name="Prince Perfact"
          lastUpdate="1 day ago"
          shipStatus={GameStatus.Accepted}
        />
      </Stack>
      <Stack>
        <Text fw={500}>Rejected Applications (2)</Text>
        <ShipDashCard
          name="Scams Enterprise"
          shipStatus={GameStatus.Rejected}
        />
        <ShipDashCard
          name="Nigerian Prince Sweepstakes"
          shipStatus={GameStatus.Rejected}
        />
      </Stack>
    </Stack>
  );
};
