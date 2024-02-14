import { Box, Button } from '@mantine/core';
import { MainSection, PageDescription, PageTitle } from '../layout/Sections';
import { Link } from 'react-router-dom';
import { ShipCard } from '../components/shipItems/ShipCard';
import { IconPlus } from '@tabler/icons-react';
import { GameStatus } from '../types/common';

const NUM_SHIPS = 3;

export type ShipCardProps = {
  id: string;
  name: string;
  status: GameStatus;
  imgUrl: string;
  description: string;
  amtAllocated: string;
  amtDistributed: string;
  amtAvailable: string;
};

const DummyShips: ShipCardProps[] = [
  {
    id: '0xDE6bcde54CF040088607199FC541f013bA53C21E',
    name: 'Grant Ship 1',
    status: GameStatus.Pending,
    imgUrl: 'https://i.pravatar.cc/300',
    description:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s. Lorem Ipsum has been the industry standard dummy text ever since the 1500s.',
    amtAllocated: '5000000000000000000',
    amtDistributed: '5000000000000000000',
    amtAvailable: '20000000000000000000',
  },
  {
    id: '0xDE6bcde54CF040088607199FC541f013bA53C21E',
    name: 'Grant Ship 1',
    status: GameStatus.Pending,
    imgUrl: 'https://i.pravatar.cc/300',
    description:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s. Lorem Ipsum has been the industry standard dummy text ever since the 1500s.',
    amtAllocated: '5000000000000000000',
    amtDistributed: '5000000000000000000',
    amtAvailable: '20000000000000000000',
  },
  {
    id: '0xDE6bcde54CF040088607199FC541f013bA53C21E',
    name: 'Grant Ship 1',
    status: GameStatus.Pending,
    imgUrl: 'https://i.pravatar.cc/300',
    description:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s.',
    amtAllocated: '5000000000000000000',
    amtDistributed: '5000000000000000000',
    amtAvailable: '20000000000000000000',
  },
];

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
        {DummyShips.map((ship, i) => (
          <ShipCard key={`shipcard-${i}`} {...ship} />
        ))}
      </Box>
    </MainSection>
  );
};
