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
import {
  MilestoneProgress,
  MilestoneProgressSteps,
} from '../components/projectItems/MilestoneProgress';

const dummyMilestoneSteps1: MilestoneStep[] = [
  { status: MilestoneStatus.Approved, amount: 2000000000000000000n },
  { status: MilestoneStatus.InReview, amount: 5000000000000000000n },
  { status: MilestoneStatus.Idle, amount: 2000000000000000000n },
  { status: MilestoneStatus.Idle, amount: 4000000000000000000n },
];

const dummyMilestoneSteps2: MilestoneStep[] = [
  { status: MilestoneStatus.Approved, amount: 200030000000000000n },
  { status: MilestoneStatus.Approved, amount: 543000000000000000n },
  { status: MilestoneStatus.Approved, amount: 2000000000000000000n },
  { status: MilestoneStatus.InReview, amount: 4000000000000000000n },
];

const dummyMilestones1 = {
  steps: dummyMilestoneSteps1,
  fundedBy: '0x1234567890123456789012345678901234567890',
};

const dummyMilestones2 = {
  steps: dummyMilestoneSteps2,
  fundedBy: '0x1234567890123456789034345678901234567890',
};

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
            <Tabs.Tab w="20%" value="portfolio">
              Grants
            </Tabs.Tab>
            <Tabs.Tab w="20%" value="details">
              Contact
            </Tabs.Tab>
          </Tabs.List>
          <TabsPanel value="feed">
            <FeedPanel />
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
            <MilestoneProgress {...dummyMilestones1} />
            <MilestoneProgress {...dummyMilestones2} />
          </Stack>
        </Paper>
      </Stack>
    </Flex>
  );
};
