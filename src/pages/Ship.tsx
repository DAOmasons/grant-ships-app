import {
  Avatar,
  Box,
  Flex,
  Group,
  Loader,
  Paper,
  Stack,
  Tabs,
  Text,
  Tooltip,
  useMantineTheme,
} from '@mantine/core';
import { MainSection, PageTitle } from '../layout/Sections';
import {
  IconExternalLink,
  IconInfoCircle,
  IconRocket,
} from '@tabler/icons-react';
import { FundingIndicator } from '../components/shipItems/FundingIndicator';
import { FeedPanel } from '../components/shipItems/FeedPanel';
import { DetailsPanel } from '../components/shipItems/DetailsPanel';
import { useParams } from 'react-router-dom';
import { GAME_MANAGER, GAME_TOKEN } from '../constants/gameSetup';
import { AddressAvatarGroup } from '../components/AddressAvatar';
import { GameStatus, GrantStatus, UpdateScope } from '../types/common';

import { getShipPageData } from '../queries/getShipPage';
import { useQuery, useInfiniteQuery } from '@tanstack/react-query';
import { SCAN_URL } from '../constants/enpoints';
import { AppAlert } from '../components/UnderContruction';
import { SingleItemPageSkeleton } from '../components/skeletons';
import { getEntityFeed } from '../queries/getFeed';
import { formatEther } from 'viem';
import { useUserData } from '../hooks/useUserState';
import { SHIP_STATUS_INFO } from '../constants/copy';
import { useLaptop, useTablet } from '../hooks/useBreakpoint';
import { useMemo } from 'react';
import { ShipBadge } from '../components/RoleBadges';
import { ApplyButton } from '../components/shipItems/ApplyButton';
import { getShipGrants } from '../queries/getShipGrants';
import { GrantCard } from '../components/grant/GrantCard';
import { PostDrawer } from '../components/PostDrawer';
import { Player } from '../types/ui';
import { PostAffix } from '../components/PostAffix';
import { getUpdates } from '../queries/getUpdates';

const infiniteWrapper = async ({ pageParam }: any) => {
  const result = await getEntityFeed(pageParam);
  return result;
};

export const Ship = () => {
  const theme = useMantineTheme();
  const { id } = useParams<{ id: string }>();
  const isTablet = useTablet();
  const isLaptop = useLaptop();

  const {
    data: feedPages,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading: feedLoading,
    error: feedError,
  } = useInfiniteQuery({
    queryKey: [`entity-feed-${id}`],
    initialPageParam: { first: 8, skip: 0, entityId: id as string },
    getNextPageParam: (lastPage, _allPages, lastPageParam) => {
      return lastPage.length === 0
        ? undefined
        : {
            ...lastPageParam,
            skip: lastPageParam.skip + 8,
            entityId: id as string,
          };
    },
    queryFn: infiniteWrapper,
    enabled: !!id,
  });

  const feedCards = useMemo(
    () => feedPages?.pages.flat().sort((a, b) => b.timestamp - a.timestamp),
    [feedPages]
  );

  const {
    data: ship,
    isLoading,
    error,
  } = useQuery({
    queryKey: [`ship-page-${id}`],
    queryFn: () => getShipPageData(id as string),
    enabled: !!id,
  });

  const {
    data: updates,
    error: updatesError,
    isLoading: updatesLoading,
    refetch: refetchUpdates,
  } = useQuery({
    queryKey: [`project-updates-${id}`],
    queryFn: () => getUpdates(id as string, UpdateScope.Ship),
    enabled: !!id,
  });

  const { userData } = useUserData();

  const {
    data: grants,
    // isLoading: grantsLoading,
    // error: grantsError,
  } = useQuery({
    queryKey: [`ship-grants-${id}`],
    queryFn: () => getShipGrants(id as string, GAME_MANAGER.ADDRESS),
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

  const isShipActive = ship.status === GameStatus.Active;
  const isShipOperator =
    userData && userData.isShipOperator && userData.shipAddress === id;

  return (
    <Flex w="100%">
      <MainSection maw={600}>
        <PageTitle
          title={
            <Group gap={'sm'}>
              <Text fz={20} fw={500}>
                {ship.name}
              </Text>
              <ShipBadge size={24} />
            </Group>
          }
        />
        <Avatar size={160} mt={'xl'} mb="md" src={ship.imgUrl} />
        <Group gap={'xs'} mb="xs">
          <Text fz="lg" fw={600}>
            {ship.name}
          </Text>
          {isShipOperator && (
            <Tooltip label="You are an operator of this program.">
              <Group align="start" gap={6}>
                <IconRocket
                  size={16}
                  color={theme.colors.violet[5]}
                  style={{ transform: 'translateY(2px)' }}
                />{' '}
                <Text fz="sm" c={theme.colors.violet[5]}>
                  Ship Operator
                </Text>
              </Group>
            </Tooltip>
          )}
        </Group>
        <Group mb="xs" gap={6}>
          <Text>{GameStatus[ship.status]}</Text>
          <Tooltip label={SHIP_STATUS_INFO[ship.status]}>
            <IconInfoCircle size={18} color={theme.colors.violet[6]} />
          </Tooltip>
        </Group>
        {isLaptop && (
          <Stack gap="md" mb="md">
            {ship.status == GameStatus.Active && (
              <Box>
                <FundingIndicator
                  fullWidth
                  available={ship.balance}
                  distributed={ship.amtDistributed}
                  allocated={ship.amtAllocated}
                />
              </Box>
            )}
            <Box>
              <Group gap={4}>
                <Text size="sm">Ship Model:</Text>
                <a
                  rel="noopener noreferrer"
                  target="_blank"
                  href={`${SCAN_URL}/address/${ship.shipContractAddress}`}
                >
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
            </Box>
          </Stack>
        )}
        <Text fz="sm" mb={'lg'}>
          {ship.description}
        </Text>
        <Group mb="xl" justify="space-between">
          <AddressAvatarGroup
            addresses={ship.members}
            avatarProps={{ size: 32 }}
          />
          {ship.shipContractAddress && (
            <ApplyButton
              shipSrcAddress={ship.shipContractAddress}
              disabled={!isShipActive}
            />
          )}
        </Group>
        <Tabs defaultValue="updates">
          <Tabs.List mb={'xl'}>
            <Tabs.Tab w={isTablet ? '4.5rem' : '6rem'} value="updates">
              Updates
            </Tabs.Tab>
            <Tabs.Tab w={isTablet ? '4.5rem' : '6rem'} value="grants">
              Grants
            </Tabs.Tab>
            <Tabs.Tab value="history" w={isTablet ? '4.5rem' : '6rem'}>
              History
            </Tabs.Tab>
            <Tabs.Tab w={isTablet ? '4.5rem' : '6rem'} value="details">
              Details
            </Tabs.Tab>
          </Tabs.List>
          <Tabs.Panel value="history">
            <FeedPanel
              feedItems={feedCards}
              isLoading={feedLoading}
              error={feedError}
              fetchNext={fetchNextPage}
            />
            {isFetchingNextPage && (
              <Group w="100%" justify="center">
                <Loader size="xl" />
              </Group>
            )}
            {!hasNextPage && (
              <Flex w="100%" justify="center" align="center" direction="column">
                <Text opacity={0.8}>You're all caught up!</Text>
                <Text opacity={0.7} fz="sm">
                  Come back later to see more
                </Text>
              </Flex>
            )}
          </Tabs.Panel>
          <Tabs.Panel value="details">
            <DetailsPanel details={ship.details} members={ship.members} />
          </Tabs.Panel>
          {/* <Tabs.Panel value="updates">
            <UpdatesPanel
              ship={ship}
              isShipOperator={isShipOperator}
              shipId={id}
            />
          </Tabs.Panel> */}
          <Tabs.Panel value="grants">
            <Stack>
              {grants?.map((grant) => (
                <GrantCard
                  key={grant.id}
                  avatarUrls={[grant.project?.metadata?.imgUrl || '']}
                  label={`${grant.project.name}`}
                  isActive={grant.status >= GrantStatus.Allocated}
                  linkUrl={`/grant/${grant.id}/timeline`}
                  status={grant.status}
                />
              ))}
            </Stack>
          </Tabs.Panel>
        </Tabs>
      </MainSection>
      {!isLaptop && (
        <Stack mt={72} w={270}>
          <Paper p="md" bg={theme.colors.dark[6]}>
            <Group gap={4}>
              <Text size="sm">Ship Model:</Text>
              <a
                rel="noopener noreferrer"
                target="_blank"
                href={`${SCAN_URL}/address/${ship.shipContractAddress}`}
              >
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
              {formatEther(BigInt(ship.balance))} {GAME_TOKEN.SYMBOL}
            </Text>
            <Text size="sm">Funding Available</Text>
          </Paper>
          <Paper p="md" bg={theme.colors.dark[6]}>
            <Text size="sm" mb="lg">
              {ship.status == GameStatus.Active
                ? 'Funding Available'
                : 'Not Funded'}
            </Text>
            {ship.status >= GameStatus.Active && (
              <FundingIndicator
                available={ship.balance}
                distributed={ship.amtDistributed}
                allocated={ship.amtAllocated}
              />
            )}
          </Paper>
        </Stack>
      )}
      {isShipOperator && <PostAffix />}
      {isShipOperator && ship.shipContractAddress && (
        <PostDrawer
          avatarImg={ship.imgUrl}
          name={ship.name}
          posterType={Player.Ship}
          posterId={ship.shipContractAddress}
          refetch={() => {
            // refetchUpdates();
          }}
        />
      )}
    </Flex>
  );
};
