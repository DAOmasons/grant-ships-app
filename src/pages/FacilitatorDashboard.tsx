import { Paper, Stack, Tabs, Text } from '@mantine/core';
import { MainSection, PageTitle } from '../layout/Sections';
import {
  ShipDashCard,
  ShipDashCardSkeleton,
} from '../components/dashboard/ShipDashCard';

export const FacilitatorDashboard = () => {
  return (
    <MainSection>
      <PageTitle title="Facilitator Dashboard" />
      <Tabs>
        <Tabs.List defaultValue="ships" mb="xl">
          <Tabs.Tab px="xl" value="ships">
            Grant Ships
          </Tabs.Tab>
          <Tabs.Tab value="game-manager">Game Manager</Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel value="ships">
          <FacilitatorShipDash />
        </Tabs.Panel>
        <Tabs.Panel value="game-manager">Game Manager</Tabs.Panel>
      </Tabs>
    </MainSection>
  );
};

export const FacilitatorShipDash = () => {
  return (
    <Stack gap="xl">
      <Stack>
        <Text fw={500}>Open Applications</Text>
        <ShipDashCard />
        <ShipDashCard />
        <ShipDashCard />
      </Stack>
      <Stack>
        <Text fw={500}>Accepted Applications</Text>
        <ShipDashCard />
      </Stack>
      <Stack>
        <Text fw={500}>Rejected Applications</Text>
        <ShipDashCard />
        <ShipDashCard />
      </Stack>
    </Stack>
  );
};
