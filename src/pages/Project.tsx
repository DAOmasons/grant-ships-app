import {
  Avatar,
  Flex,
  Group,
  Paper,
  Stack,
  Tabs,
  Text,
  useMantineTheme,
} from '@mantine/core';
import { MainSection, PageTitle } from '../layout/Sections';
import { IconInfoCircle } from '@tabler/icons-react';
import { FeedPanel } from '../components/shipItems/FeedPanel';
import { GAME_TOKEN } from '../constants/gameSetup';
import { GrantUI, MilestoneStatus, MilestoneStep } from '../types/ui';
import { MilestoneProgress } from '../components/projectItems/MilestoneProgress';
import { GrantsPanel } from '../components/projectItems/GrantsPanel';
import { MilestonePanel } from '../components/projectItems/MilestonePanel';
import { Contact } from '../components/Contact';
import { useMemo } from 'react';

import { formatEther } from 'viem';

const milestoneDescription = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut dignissim velit porta elit placerat, sit amet efficitur est elementum. Praesent semper, quam vel convallis tincidunt, nisi arcu lacinia leo, at bibendum lorem orci et arcu.`;

const dummyMilestoneSteps1: MilestoneStep[] = [
  {
    status: MilestoneStatus.Approved,
    amount: 2000000000000000000n,
    description: milestoneDescription,
  },
  {
    status: MilestoneStatus.InReview,
    amount: 5000000000000000000n,
    description: milestoneDescription,
  },
  {
    status: MilestoneStatus.Idle,
    amount: 2000000000000000000n,
    description: milestoneDescription,
  },
  {
    status: MilestoneStatus.Idle,
    amount: 4000000000000000000n,
    description: milestoneDescription,
  },
];

const dummyMilestoneSteps2: MilestoneStep[] = [
  {
    status: MilestoneStatus.Approved,
    amount: 2000000000000000000n,
    description: milestoneDescription,
  },
  {
    status: MilestoneStatus.Approved,
    amount: 5000000000000000000n,
    description: milestoneDescription,
  },
  {
    status: MilestoneStatus.InReview,
    amount: 4000000000000000000n,
    description: milestoneDescription,
  },
];

const grant1: GrantUI = {
  milestones: dummyMilestoneSteps1,
  shipName: 'Devrel Gallactica',
  shipAddress: '0x1234567890123456789012345678901234567890',
  reason: 'I like it',
  milestonesStatus: MilestoneStatus.Approved,
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

const grant2: GrantUI = {
  milestones: dummyMilestoneSteps2,
  shipName: 'Public Goods Deathstar',
  shipAddress: '0x1234567890123456789034345678901234567890',
  reason: 'I like it',
  milestonesStatus: MilestoneStatus.InReview,
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

const grants = [grant1, grant2];

const DummyProject = {
  name: 'Project X',
  status: 'Accepted',
  imgUrl: 'https://i.pravatar.cc/300',
  description: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.`,
  grants: grants,
  website: 'https://www.google.com',
  email: 'email@email.email',
  github: 'https://www.google.com',
  x: 'https://www.google.com',
  discord: 'https://www.google.com',
  telegram: 'https://www.google.com',
  members: [
    '0x756ee8B8E898D497043c2320d9909f1DD5a7077F',
    '0xD800B05c70A2071BC1E5Eac5B3390Da1Eb67bC9D',
    '0x57abda4ee50Bb3079A556C878b2c345310057569',
    '0xDE6bcde54CF040088607199FC541f013bA53C21E',
  ],
};

export const Project = () => {
  const project = DummyProject;

  const theme = useMantineTheme();

  const totalFunds = useMemo(() => {
    if (!project.grants) return formatEther(0n);

    return formatEther(
      project.grants.reduce((acc: bigint, grant: GrantUI) => {
        return acc + grant.grantApplication.grantAmount;
      }, 0n)
    );
  }, [project.grants]);

  return (
    <Flex>
      <MainSection maw={534}>
        <PageTitle title={project.name} />
        <Avatar size={160} mt={'xl'} mb="md" src={project.imgUrl} />
        <Text fz="lg" fw={600}>
          {project.name}
        </Text>
        <Group mb="xs" gap={6}>
          <Text>{project.status}</Text>
          <IconInfoCircle size={18} color={theme.colors.violet[8]} />
        </Group>
        <Text fz="sm" mb={'md'}>
          {project.description}
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
            <Tabs.Tab w="20%" value="milestones">
              Milestones
            </Tabs.Tab>
            <Tabs.Tab w="20%" value="details">
              Contact
            </Tabs.Tab>
          </Tabs.List>
          <Tabs.Panel value="feed">
            <FeedPanel />
          </Tabs.Panel>
          <Tabs.Panel value="grants">
            {project.grants && <GrantsPanel grants={project.grants} />}
          </Tabs.Panel>
          <Tabs.Panel value="milestones">
            {project.grants && <MilestonePanel grants={project.grants} />}
          </Tabs.Panel>
          <Tabs.Panel value="details">
            <Contact
              website={project.website}
              email={project.email}
              github={project.github}
              x={project.x}
              discord={project.discord}
              telegram={project.telegram}
              members={project.members}
            />
          </Tabs.Panel>
        </Tabs>
      </MainSection>
      <Stack gap={'xs'} mt={72} w={270}>
        <Paper p="md" bg={theme.colors.dark[6]}>
          <Text size="sm" mb="lg">
            Funding Received
          </Text>
          <Text size="xl" mb={4}>
            {totalFunds} {GAME_TOKEN.SYMBOL}
          </Text>
          <Text size="sm">Funds received this round</Text>
        </Paper>
        {project?.grants?.length !== 0 && (
          <Paper p="md" bg={theme.colors.dark[6]}>
            <Stack gap="lg">
              <Text>Grants</Text>
              {project?.grants?.map((grant: GrantUI, i: number) => (
                <MilestoneProgress
                  key={`milestone-progress-bar-${i}`}
                  steps={grant.milestones}
                  fundedBy={grant.shipAddress}
                />
              ))}
            </Stack>
          </Paper>
        )}
      </Stack>
    </Flex>
  );
};
