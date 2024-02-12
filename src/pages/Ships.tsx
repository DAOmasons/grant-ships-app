import { Box, Button, Paper, Text } from '@mantine/core';
import { MainSection, PageDescription, PageTitle } from '../layout/Sections';
import { Link } from 'react-router-dom';
import { ShipCard } from '../components/shipItems/ShipCard';
import { IconPlus } from '@tabler/icons-react';

const NUM_SHIPS = 3;

export const Ships = () => {
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
        {Array.from({ length: NUM_SHIPS }).map((_, i) => (
          <ShipCard key={`shipcard-${i}`} />
        ))}
      </Box>
    </MainSection>
  );
};
