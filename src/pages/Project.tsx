import {
  Avatar,
  Flex,
  Group,
  Paper,
  Stack,
  Tabs,
  TabsPanel,
  Text,
  useMantineTheme,
} from '@mantine/core';
import { MainSection, PageTitle } from '../layout/Sections';
import { IconInfoCircle } from '@tabler/icons-react';
import { FeedPanel } from '../components/shipItems/FeedPanel';
import { GAME_TOKEN } from '../constants/gameSetup';
import { MilestoneStatus, MilestoneStep } from '../types/ui';
import { MilestoneProgress } from '../components/projectItems/MilestoneProgress';
import { GrantsPanel } from '../components/projectItems/GrantsPanel';

const dummyMilestoneSteps1: MilestoneStep[] = [
  { status: MilestoneStatus.Approved, amount: 2000000000000000000n },
  { status: MilestoneStatus.InReview, amount: 5000000000000000000n },
  { status: MilestoneStatus.Idle, amount: 2000000000000000000n },
  { status: MilestoneStatus.Idle, amount: 4000000000000000000n },
];

const dummyMilestoneSteps2: MilestoneStep[] = [
  { status: MilestoneStatus.Approved, amount: 2000000000000000000n },
  { status: MilestoneStatus.Approved, amount: 5000000000000000000n },
  { status: MilestoneStatus.InReview, amount: 4000000000000000000n },
];

const grant1 = {
  steps: dummyMilestoneSteps1,
  shipName: 'Devrel Gallactica',
  shipAddress: '0x1234567890123456789012345678901234567890',
  reason: 'I like it',
  grantApplication: {
    expectedDelivery: 1713035658,
    grantAmount: 13000000000000000000n,
    receiverAddress: '0x1234567890123456789034345678901234567890',
    grantObjectives:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut dignissim velit porta elit placerat, sit amet efficitur est elementum. Praesent semper, quam vel convallis tincidunt, nisi arcu lacinia leo, at bibendum lorem orci et arcu.',
    proposalLink: 'https://www.google.com',
    additionalLink: 'https://www.google.com',
    extraInfo:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut dignissim velit porta elit placerat, sit amet efficitur est elementum. Praesent semper, quam vel convallis tincidunt, nisi arcu lacinia leo, at bibendum lorem orci et arcu. Etiam tincidunt accumsan tellus et pretium. Ut tempor tempor libero ac molestie',
  },
};

const grant2 = {
  steps: dummyMilestoneSteps2,
  shipName: 'Public Goods Deathstar',
  shipAddress: '0x1234567890123456789034345678901234567890',
  reason: 'I like it',
  grantApplication: {
    expectedDelivery: 1713035658,
    grantAmount: 11000000000000000000n,
    receiverAddress: '0x1234567890123456789034345678901234567890',
    grantObjectives:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut dignissim velit porta elit placerat, sit amet efficitur est elementum. Praesent semper, quam vel convallis tincidunt, nisi arcu lacinia leo, at bibendum lorem orci et arcu.',
    proposalLink: 'https://www.google.com',
    additionalLink: 'https://www.google.com',
    extraInfo:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut dignissim velit porta elit placerat, sit amet efficitur est elementum. Praesent semper, quam vel convallis tincidunt, nisi arcu lacinia leo, at bibendum lorem orci et arcu. Etiam tincidunt accumsan tellus et pretium. Ut tempor tempor libero ac molestie',
  },
};

export type GrantUI = {
  steps: MilestoneStep[];
  shipName: string;
  shipAddress: string;
  reason: string;
  grantApplication: {
    expectedDelivery: number;
    grantAmount: bigint;
    receiverAddress: string;
    grantObjectives: string;
    proposalLink: string;
    additionalLink: string;
    extraInfo: string;
  };
};

const grants = [grant1, grant2];

export const Project = () => {
  const theme = useMantineTheme();
  return (
    <Flex>
      <MainSection maw={534}>
        <PageTitle title="Dummy Project" />
        <Avatar size={160} mt={'xl'} mb="md" />
        <Text fz="lg" fw={600}>
          Dummy Project
        </Text>
        <Group mb="xs" gap={6}>
          <Text>Approved</Text>
          <IconInfoCircle size={16} color={theme.colors.yellow[7]} />
        </Group>
        <Text fz="sm" mb={'md'}>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book.
        </Text>
        <Avatar.Group mb="xl">
          <Avatar size={36} src="https://i.pravatar.cc/300" />
          <Avatar size={36} src="https://i.pravatar.cc/301" />
          <Avatar size={36} src="https://i.pravatar.cc/302" />
          <Avatar size={36} src="https://i.pravatar.cc/302" />
        </Avatar.Group>
        <Tabs defaultValue="feed">
          <Tabs.List mb={'xl'}>
            <Tabs.Tab value="feed" w="20%">
              Feed
            </Tabs.Tab>
            <Tabs.Tab w="20%" value="grants">
              Grants
            </Tabs.Tab>
            <Tabs.Tab w="20%" value="details">
              Contact
            </Tabs.Tab>
          </Tabs.List>
          <TabsPanel value="feed">
            <FeedPanel />
          </TabsPanel>
          <TabsPanel value="grants">
            <GrantsPanel grants={grants} />
          </TabsPanel>
        </Tabs>
      </MainSection>
      <Stack gap={'xs'} mt={72} w={270}>
        <Paper p="md" bg={theme.colors.dark[6]}>
          <Text size="sm" mb="lg">
            Funding Received
          </Text>
          <Text size="xl" mb={4}>
            0 {GAME_TOKEN.SYMBOL}
          </Text>
          <Text size="sm">Funds received this round</Text>
        </Paper>
        <Paper p="md" bg={theme.colors.dark[6]}>
          <Stack gap="lg">
            <Text>Grants</Text>
            <MilestoneProgress
              steps={grant1.steps}
              fundedBy={grant1.shipAddress}
            />
            <MilestoneProgress
              steps={grant2.steps}
              fundedBy={grant2.shipAddress}
            />
          </Stack>
        </Paper>
      </Stack>
    </Flex>
  );
};
