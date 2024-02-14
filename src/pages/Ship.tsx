import {
  Avatar,
  Button,
  Flex,
  Group,
  Paper,
  Stack,
  Tabs,
  Text,
  useMantineTheme,
} from '@mantine/core';
import { MainSection, PageTitle } from '../layout/Sections';
import { IconExternalLink, IconInfoCircle } from '@tabler/icons-react';
import { FundingIndicator } from '../components/shipItems/FundingIndicator';
import { FeedPanel } from '../components/shipItems/FeedPanel';
import { PortfolioPanel } from '../components/shipItems/PortfolioPanel';
import { DetailsPanel } from '../components/shipItems/DetailsPanel';
import { Link } from 'react-router-dom';
import { GAME_TOKEN } from '../constants/gameSetup';
import { AddressAvatarGroup } from '../components/AddressAvatar';
import { GameStatus } from '../types/common';
import { useMemo } from 'react';
import { formatEther } from 'viem';

const DummyShip = {
  name: 'Ship 1',
  description:
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
  status: GameStatus.Accepted,
  imgUrl: 'https://i.pravatar.cc/300',
  amtAllocated: '5000000000000000000',
  amtDistributed: '5000000000000000000',
  amtAvailable: '20000000000000000000',
  members: [
    '0x756ee8B8E898D497043c2320d9909f1DD5a7077F',
    '0xD800B05c70A2071BC1E5Eac5B3390Da1Eb67bC9D',
    '0x57abda4ee50Bb3079A556C878b2c345310057569',
    '0xDE6bcde54CF040088607199FC541f013bA53C21E',
  ],
  details: {
    thesis:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut dignissim velit porta elit placerat, sit amet efficitur est elementum. Praesent semper, quam vel convallis tincidunt, nisi arcu lacinia leo, at bibendum lorem orci et arcu. Etiam tincidunt accumsan tellus et pretium. Ut tempor tempor libero ac molestie. Cras lacinia, orci id posuere consequat, sapien nunc commodo velit, ut laoreet felis orci sollicitudin lacus.',
    apply:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut dignissim velit porta elit placerat, sit amet efficitur est elementum. Praesent semper, quam vel convallis tincidunt, nisi arcu',
    extraInfo:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    extraLink: 'https://www.google.com',
    website: 'https://www.google.com',
    email: 'email@email.email',
    x: 'https://www.google.com',
    discord: 'https://www.google.com',
    telegram: 'https://www.google.com',
    github: 'https://www.google.com',
  },
};

type ShipPageUI = {
  name: string;
  description: string;
  imgUrl: string;
  status: GameStatus;
  amtAllocated: string;
  amtDistributed: string;
  amtAvailable: string;
  members: string[];
  details: {
    thesis: string;
    apply: string;
    extraInfo: string;
    extraLink: string;
    website: string;
    email: string;
    x: string;
    discord: string;
    telegram: string;
    github: string;
  };
};

export const Ship = () => {
  const theme = useMantineTheme();

  const ship = DummyShip as ShipPageUI;

  const fundingStats = useMemo(() => {
    const amtAllocated = Number(ship.amtAllocated);
    const amtDistributed = Number(ship.amtDistributed);
    const amtAvailable = Number(ship.amtAvailable);
    const total = amtAllocated + amtDistributed + amtAvailable;

    return {
      amounts: [amtAllocated, amtDistributed, amtAvailable].map((amt) => {
        return (Number(amt) / total) * 100;
      }) as [number, number, number],
      totalFunding: formatEther(BigInt(total)),
    };
  }, [ship]);

  return (
    <Flex>
      <MainSection maw={534}>
        <PageTitle title="Ship 1" />
        <Avatar size={160} mt={'xl'} mb="md" src={ship.imgUrl} />
        <Text fz="lg" fw={600}>
          {ship.name}
        </Text>
        <Group mb="xs" gap={6}>
          <Text>{GameStatus[ship.status]}</Text>
          <IconInfoCircle size={18} color={theme.colors.violet[6]} />
        </Group>
        <Text fz="sm" mb={'md'} mih={60}>
          {ship.description}
        </Text>
        <Group mb="xl" justify="space-between">
          <AddressAvatarGroup
            addresses={ship.members}
            avatarProps={{ size: 32 }}
          />
          <Button component={Link} to="/apply-funding/not-ready">
            Apply for Funding
          </Button>
        </Group>
        <Tabs defaultValue="feed">
          <Tabs.List mb={'xl'}>
            <Tabs.Tab value="feed" w="20%">
              Feed
            </Tabs.Tab>
            <Tabs.Tab w="20%" value="details">
              Details
            </Tabs.Tab>
            <Tabs.Tab w="20%" value="portfolio">
              Portfolio
            </Tabs.Tab>
          </Tabs.List>
          <Tabs.Panel value="feed">
            <FeedPanel />
          </Tabs.Panel>
          <Tabs.Panel value="details">
            <DetailsPanel details={ship.details} members={ship.members} />
          </Tabs.Panel>
          <Tabs.Panel value="portfolio">
            <PortfolioPanel />
          </Tabs.Panel>
        </Tabs>
      </MainSection>
      <Stack mt={72} w={270}>
        <Paper p="md" bg={theme.colors.dark[6]}>
          <Group>
            <Text size="sm">Ship Model: </Text>
            <a href="#">
              <Group>
                <Text fz="sm" mr={-10}>
                  Grant Ship Alpha
                </Text>
                <IconExternalLink
                  size={16}
                  style={{ transform: 'translateY(-1px)' }}
                />
              </Group>
            </a>
          </Group>
        </Paper>
        <Paper p="md" bg={theme.colors.dark[6]}>
          <Text size="sm" mb="lg">
            Funding Received
          </Text>
          <Text size="xl">
            {fundingStats.totalFunding} {GAME_TOKEN.SYMBOL}
          </Text>
        </Paper>
        <Paper p="md" bg={theme.colors.dark[6]}>
          <Text size="sm" mb="lg">
            Funding Available
          </Text>
          <FundingIndicator amounts={fundingStats.amounts} />
        </Paper>
      </Stack>
    </Flex>
  );
};
