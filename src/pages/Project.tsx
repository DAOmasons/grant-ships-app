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
import { GrantUI, MilestoneStatus } from '../types/ui';
import { MilestoneProgress } from '../components/projectItems/MilestoneProgress';
import { GrantsPanel } from '../components/projectItems/GrantsPanel';
import { MilestonePanel } from '../components/projectItems/MilestonePanel';
import { Contact } from '../components/Contact';

import { formatEther } from 'viem';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getProjectPage } from '../queries/getProjectPage';
import { AddressAvatarGroup } from '../components/AddressAvatar';
import { AppAlert } from '../components/UnderContruction';
import { GameStatus } from '../types/common';
import { SingleItemPageSkeleton } from '../components/skeletons';
import { getEntityFeed } from '../queries/getFeed';
import { useMemo } from 'react';
import { getProjectGrants } from '../queries/getProjectGrants';

const ClearVote: GrantUI = {
  shipName: 'Creative Commons Catalyst',
  shipAddress: '0x3841bca654e95673ae89fd9d1a432b37697ff133',
  reason:
    'Voting is central to the overall day to day function of DAOs. Clear vote is a great opportunity to create a high impact sea-change in how DAOs gather signal from their communities and make decisions.',
  milestonesStatus: MilestoneStatus.Approved,
  milestones: [
    {
      description:
        'During this milestone, we will spend time researching the best in privacy proofs and building a basic onchain proof of concept',
      amount: 1000000000000000000n,
      status: MilestoneStatus.Approved,
    },
    {
      amount: 2000000000000000000n,
      description:
        'Create a basic voting app. This will be a simple app that allows users to vote on a proposal, privately onchain. It will be built on Arb Sepolia. It will not be hooked up to the DAO yet',
      status: MilestoneStatus.Approved,
    },
    {
      amount: 1000000000000000000n,
      description:
        'Integrate with Arbitrum DAO. Clear Vote will create a deployment on Arbitrum Mainnet that utilizes the ARB voting token.',
      status: MilestoneStatus.InReview,
    },
    {
      amount: 500000000000000000n,
      description:
        'Test Vote. The Clear Vote team will help organize a test voting event for the DAO to use the app and provide feedback.',
      status: MilestoneStatus.Idle,
    },
  ],
  grantApplication: {
    expectedDelivery: 1713550570,
    grantAmount: 4500000000000000000n,
    receiverAddress: '0x511449dD36e5dB31980AA0452aAAB95b9a68ae99',
    grantObjectives:
      'Bring Privacy voting to Arbitrum to Arbitrum. Create a voting app for DAOs. Integrate the protocol with Arbitrum DAO. Host a test voting event with the DAO.',
    proposalLink: 'https://gov.arbitrum.io/t/clear-vote/123',
    additionalLink: 'https://clearvote.io',
    extraInfo:
      'We are a team of 3 developers with experience in ZK and voting protocols. We are excited to work on this project and believe we can deliver a working prototype in 2 months.',
  },
} as const;

const DummyGrants: Record<string, GrantUI[]> = {
  '0xe8c6faa845d16a1c16d7edae3f405dc6234a8fb8': [ClearVote],
} as const;

export const Project = () => {
  const { id } = useParams();

  const {
    data: project,
    isLoading,
    error,
  } = useQuery({
    queryKey: [`project-page-${id}`],
    queryFn: () => getProjectPage(id as string),
    enabled: !!id,
  });

  const {
    data: feedCards,
    isLoading: feedLoading,
    error: feedError,
  } = useQuery({
    queryKey: [`entity-feed-${id}`],
    queryFn: () =>
      getEntityFeed({ first: 10, skip: 0, entityId: id as string }),
    enabled: !!id,
  });

  const {
    data: grants,
    isLoading: grantsLoading,
    error: grantsError,
  } = useQuery({
    queryKey: [`project-grants-${id}`],
    queryFn: () => getProjectGrants(id as string),
    enabled: !!id,
  });

  const withDummyGrants = useMemo(() => {
    if (!project || !id) return project;

    const hasDummyGrant = DummyGrants[id];
    if (hasDummyGrant) {
      return {
        ...project,
        status: GameStatus.Accepted,
        grants: hasDummyGrant,
      };
    } else {
      return project;
    }
  }, [project, id]);

  const theme = useMantineTheme();

  if (isLoading) return <SingleItemPageSkeleton />;

  if (error) {
    return (
      <MainSection>
        <PageTitle title="Project Not Found" />
        <AppAlert
          title="Error: Project Page 404"
          description={error.message}
          bg={theme.colors.pink[8]}
        />
      </MainSection>
    );
  }
  if (!withDummyGrants)
    return (
      <MainSection>
        <PageTitle title="Project Not Found" />
        <AppAlert title="Error: Project Page 404" bg={theme.colors.pink[8]} />
      </MainSection>
    );

  const totalFunds = !withDummyGrants.grants
    ? formatEther(0n)
    : formatEther(
        withDummyGrants.grants.reduce((acc: bigint, grant: GrantUI) => {
          return acc + grant.grantApplication.grantAmount;
        }, 0n)
      );

  return (
    <Flex>
      <MainSection maw={534}>
        <PageTitle title={withDummyGrants.name} />
        <Avatar size={160} mt={'xl'} mb="md" src={withDummyGrants.imgUrl} />
        <Text fz="lg" fw={600}>
          {withDummyGrants.name}
        </Text>
        <Group mb="xs" gap={6}>
          <Text>{GameStatus[withDummyGrants.status]}</Text>
          <IconInfoCircle size={18} color={theme.colors.violet[8]} />
        </Group>
        <Text fz="sm" mb={'md'}>
          {withDummyGrants.description}
        </Text>
        <AddressAvatarGroup
          addresses={withDummyGrants.members}
          avatarProps={{ size: 32 }}
        />
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
            <FeedPanel
              feedItems={feedCards}
              isLoading={feedLoading}
              error={feedError}
            />
          </Tabs.Panel>
          <Tabs.Panel value="grants">
            {withDummyGrants.grants && (
              <GrantsPanel
                grants={grants}
                isLoading={grantsLoading}
                error={grantsError}
              />
            )}
          </Tabs.Panel>
          <Tabs.Panel value="milestones">
            {withDummyGrants.grants && (
              <MilestonePanel grants={withDummyGrants.grants} />
            )}
          </Tabs.Panel>
          <Tabs.Panel value="details">
            <Contact
              website={withDummyGrants.website}
              email={withDummyGrants.email}
              github={withDummyGrants.github}
              x={withDummyGrants.x}
              discord={withDummyGrants.discord}
              telegram={withDummyGrants.telegram}
              members={withDummyGrants.members}
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
        {withDummyGrants?.grants?.length !== 0 && (
          <Paper p="md" bg={theme.colors.dark[6]}>
            <Stack gap="lg">
              <Text>Grants</Text>
              {withDummyGrants?.grants?.map((grant: GrantUI, i: number) => (
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
