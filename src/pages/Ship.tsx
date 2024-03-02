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
import { Link, useParams } from 'react-router-dom';
import { GAME_TOKEN } from '../constants/gameSetup';
import { AddressAvatarGroup } from '../components/AddressAvatar';
import { GameStatus } from '../types/common';

import { getShipPageData } from '../queries/getShipPage';
import { useQuery } from '@tanstack/react-query';
import { SCAN_URL } from '../constants/enpoints';
import { AppAlert } from '../components/UnderContruction';
import { SingleItemPageSkeleton } from '../components/skeletons';
import { getEntityFeed } from '../queries/getFeed';
import { formatEther } from 'viem';

export const Ship = () => {
  const theme = useMantineTheme();
  const { id } = useParams<{ id: string }>();

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
    data: ship,
    isLoading,
    error,
  } = useQuery({
    queryKey: [`ship-page-${id}`],
    queryFn: () => getShipPageData(id as string),
    enabled: !!id,
  });

  if (isLoading) {
    return <SingleItemPageSkeleton />;
  }

  if (error) {
    return (
      <MainSection>
        <PageTitle title="Ship Not Found" />
        <AppAlert
          title="Error: Ship Page 404"
          description={error.message}
          bg={theme.colors.pink[8]}
        />
      </MainSection>
    );
  }

  if (!ship) {
    return (
      <MainSection>
        <PageTitle title="Ship Not Found" />
        <AppAlert
          title="Error: Ship Page 404"
          description={'Ship not found, check the URL and try again.'}
          bg={theme.colors.pink[8]}
        />
      </MainSection>
    );
  }

  const totalFunding = [
    BigInt(ship.amtDistributed ? ship.amtDistributed : 0),
    BigInt(ship.amtAvailable ? ship.amtAvailable : 0),
    BigInt(ship.amtAvailable ? ship.amtAvailable : 0),
  ]
    .reduce((acc, amt) => acc + amt, 0n)
    .toString();

  const isShipActive = ship.status === GameStatus.Active;

  return (
    <Flex>
      <MainSection maw={534}>
        <PageTitle title={ship.name} />
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
          <Button
            component={Link}
            to={`/apply-funding/${id}`}
            disabled={!isShipActive}
          >
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
            <FeedPanel
              feedItems={feedCards}
              isLoading={feedLoading}
              error={feedError}
            />
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
          <Group gap={4}>
            <Text size="sm">Ship Model:</Text>
            <a href={`${SCAN_URL}/address/${ship.shipContractAddress}`}>
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
          <Text size="lg" mb={2}>
            {formatEther(BigInt(ship.totalRoundAmount))} {GAME_TOKEN.SYMBOL}
          </Text>
          <Text size="sm" mb="md">
            Total Round Amount
          </Text>
          <Text size="lg" mb={2}>
            {formatEther(BigInt(ship.amtAvailable))} {GAME_TOKEN.SYMBOL}
          </Text>
          <Text size="sm">Funding Available</Text>
        </Paper>
        <Paper p="md" bg={theme.colors.dark[6]}>
          <Text size="sm" mb="lg">
            {ship.status == GameStatus.Active
              ? 'Funding Available'
              : 'Not Funded'}
          </Text>
          <FundingIndicator
            available={ship.amtAvailable}
            distributed={ship.amtDistributed}
            allocated={ship.amtAllocated}
          />
        </Paper>
      </Stack>
    </Flex>
  );
};
