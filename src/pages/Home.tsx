import {
  BackgroundImage,
  Box,
  Button,
  Group,
  Paper,
  Tabs,
  Text,
  useMantineTheme,
} from '@mantine/core';
import { Feed } from '../components/feed/Feed';
import { MainSection } from '../layout/Sections';
import bgSvg from '../assets/BgSvg.svg';
import { FeedCardUI } from '../types/ui';
import { AppAlert } from '../components/UnderContruction';

const DummyFeed: FeedCardUI[] = [
  {
    subject: {
      name: 'Project X',
      id: '0x123',
      entityType: 'project',
      imgUrl: 'https://i.pravatar.cc/300',
    },
    object: {
      name: 'Devrel Gallactica',
      id: '0x123',
      entityType: 'ship',
    },
    message:
      'Project X has submitted Milestone 1 for Devrel Gallactica for approval',
    timestamp: 1630000000,
    sender: '0x57abda4ee50Bb3079A556C878b2c345310057569',
    embedText:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen...",
  },

  {
    subject: {
      name: 'Devrel Gallactica',
      id: '0x123',
      entityType: 'ship',
      imgUrl: 'https://i.pravatar.cc/300',
    },
    object: {
      name: 'Project X',
      id: '0x123',
      entityType: 'project',
    },
    message:
      'Ship Devrel Gallactica has distributed 1000 ARB to Project X for Milestone 1',
    timestamp: 1630000000,
    sender: '0x57abda4ee50Bb3079A556C878b2c345310057569',
  },
  {
    subject: {
      name: 'Public Goods Death Star ',
      id: '0x123',
      entityType: 'ship',
      imgUrl: 'https://i.pravatar.cc/300',
    },
    object: {
      name: 'Devrel Gallactica',
      id: '0x123',
      entityType: 'ship',
    },
    message:
      'Ship Devrel Gallactica has distributed 1000 ARB to Project X for Milestone 1',
    timestamp: 1630000000,
    sender: '0x57abda4ee50Bb3079A556C878b2c345310057569',
  },
  {
    subject: {
      name: 'Facilitator Crew',
      id: '0x123',
      entityType: 'facilitator',
      imgUrl: 'https://i.pravatar.cc/300',
    },
    object: {
      name: 'Pumpsville',
      id: '0x123',
      entityType: 'ship',
    },
    message: 'Facilitator Crew has rejected grant application for Pumpsville',
    embedText:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen...",
    timestamp: 1630000000,
    sender: '0x57abda4ee50Bb3079A556C878b2c345310057569',
  },
  {
    subject: {
      name: 'Project X',
      id: '0x123',
      entityType: 'project',
      imgUrl: 'https://i.pravatar.cc/300',
    },
    object: {
      name: 'Devrel Gallactica',
      id: '0x123',
      entityType: 'ship',
    },
    message:
      'Project X has submitted Milestone 1 for Devrel Gallactica for approval',
    timestamp: 1630000000,
    sender: '0x57abda4ee50Bb3079A556C878b2c345310057569',
  },
  {
    subject: {
      name: 'Facilitator Crew',
      id: '0x123',
      entityType: 'facilitator',
      imgUrl: 'https://i.pravatar.cc/300',
    },
    message: 'Facilitator Crew has created Game Round 1',

    timestamp: 1630000000,
    sender: '0x57abda4ee50Bb3079A556C878b2c345310057569',
  },
];

export const Home = () => {
  return (
    <Box w="100%">
      <Banner />
      <MainSection>
        <Tabs defaultValue="feed">
          <Tabs.List mb={'xl'}>
            <Tabs.Tab value="feed" w="20%">
              Feed
            </Tabs.Tab>
            <Tabs.Tab value="stats" w="20%">
              Stats
            </Tabs.Tab>
          </Tabs.List>
          <Tabs.Panel value="feed">
            <Feed feed={DummyFeed} />
          </Tabs.Panel>
          <Tabs.Panel value="stats">
            <AppAlert
              title="This Feature is under construction."
              description="Check back soon to try it out!"
            />
          </Tabs.Panel>
        </Tabs>
      </MainSection>
    </Box>
  );
};

const Banner = () => {
  const theme = useMantineTheme();
  return (
    <Paper h={150} w="100%" bg={theme.colors.dark[8]} p="xl">
      <Text fz={24} fw={700} c="white" mb="md">
        Now Accepting Grant Ships! Submit your application today!
      </Text>
      <Group>
        <Button>Submit Grant Ship Application</Button>
        <Button variant="transparent"> What is a Grant Ship? </Button>
      </Group>
    </Paper>
  );
};
