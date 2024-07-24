import {
  ActionIcon,
  Avatar,
  Box,
  Collapse,
  Flex,
  Group,
  Loader,
  Modal,
  Paper,
  Stack,
  Tabs,
  Text,
  Tooltip,
  useMantineTheme,
} from '@mantine/core';
import { MainSection, PageTitle, ProfileSection } from '../layout/Sections';
import {
  IconAward,
  IconChevronDown,
  IconChevronUp,
  IconInfoCircle,
  IconMaximize,
  IconPencil,
} from '@tabler/icons-react';
import { FeedPanel } from '../components/shipItems/FeedPanel';
import { GAME_TOKEN } from '../constants/gameSetup';
import { MilestoneProgress } from '../components/projectItems/MilestoneProgress';
import { Contact } from '../components/Contact';

import { formatEther } from 'viem';
import { Link, useParams } from 'react-router-dom';
import { useQuery, useInfiniteQuery } from '@tanstack/react-query';
import { getProjectPage } from '../queries/getProjectPage';
import { AddressAvatarGroup } from '../components/AddressAvatar';
import { AppAlert } from '../components/UnderContruction';
import { GrantStatus } from '../types/common';
import { SingleItemPageSkeleton } from '../components/skeletons';
import { getEntityFeed } from '../queries/getFeed';
import { DashGrant } from '../resolvers/grantResolvers';
import { useMemo } from 'react';
import { useUserData } from '../hooks/useUserState';
import { useLaptop, useTablet } from '../hooks/useBreakpoint';
import { useDisclosure } from '@mantine/hooks';
import { ProjectBadge } from '../components/RoleBadges';
import { MediaCarousel } from '../components/MediaCarousel';

import { EditProfileDrawer } from '../components/projectItems/EditProfileDrawer';
import { FullScreenGallery } from '../components/FullScreenGallery';
import { IconPlayerPlay } from '@tabler/icons-react';
import { PostAffix } from '../components/PostAffix';
import { PostDrawer } from '../components/PostDrawer';
import { Player } from '../types/ui';

const infiniteWrapper = async ({ pageParam }: any) => {
  const result = await getEntityFeed(pageParam);
  return result;
};

export const Project = () => {
  const { id } = useParams();
  const { userData } = useUserData();
  const isTablet = useTablet();
  const isLaptop = useLaptop();
  const [opened, { toggle }] = useDisclosure(false);
  const [showcaseOpened, { toggle: toggleShowcase }] = useDisclosure(false);

  const {
    data: project,
    isLoading,
    error,
    refetch: refetchProject,
  } = useQuery({
    queryKey: [`project-page-${id}`],
    queryFn: () => getProjectPage(id as string),
    enabled: !!id,
  });

  const {
    data: feedPages,
    isLoading: feedLoading,
    error: feedError,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: [`entity-feed-${id}`],
    initialPageParam: { first: 8, skip: 0, entityId: id as string },
    getNextPageParam: (lastPage, _allPages, lastPageParam) => {
      return lastPage.length === 0
        ? undefined
        : {
            first: lastPageParam.first,
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

  // const {
  //   data: grants,
  //   isLoading: grantsLoading,
  //   error: grantsError,
  // } = useQuery({
  //   queryKey: [`project-grants-${id}`],
  //   queryFn: () => getProjectGrants(id as string),
  //   enabled: !!id,
  // });
  const grants = [] as const;

  const theme = useMantineTheme();

  const isProjectMember = useMemo(() => {
    return (
      userData && !!userData.projects?.find((project) => project.anchor === id)
    );
  }, [userData, id]);

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
  if (!project)
    return (
      <MainSection>
        <PageTitle title="Project Not Found" />
        <AppAlert title="Error: Project Page 404" bg={theme.colors.pink[8]} />
      </MainSection>
    );

  const totalFundsReceived = !grants
    ? '0'
    : formatEther(
        grants.reduce((acc: bigint, grant: DashGrant) => {
          return (
            acc + (grant.amtDistributed ? BigInt(grant.amtDistributed) : 0n)
          );
        }, 0n)
      );

  const totalFundsAllocated = !grants
    ? '0'
    : formatEther(
        grants.reduce((acc: bigint, grant: DashGrant) => {
          return acc + (grant.amtAllocated ? BigInt(grant.amtAllocated) : 0n);
        }, 0n)
      );

  const activeGrants = grants?.filter(
    (grant: DashGrant) => grant.grantStatus >= GrantStatus.FacilitatorApproved
  );

  return (
    <Flex w="100%">
      <ProfileSection
        bannerImg={project.bannerImgUrl}
        pageTitle={
          <Group gap={'sm'} style={{ zIndex: 1 }}>
            <Text fz={20} fw={500}>
              {project.name}
            </Text>
            <ProjectBadge size={24} />
          </Group>
        }
      >
        <Avatar size={160} mb="md" src={project.imgUrl} />
        <Group gap={'xs'} mb="md">
          <Text fz="lg" fw={600}>
            {project.name}
          </Text>
          {isProjectMember && (
            <Tooltip label="You are a member of this project">
              <Group align="start" gap={6}>
                <IconAward
                  size={16}
                  color={theme.colors.blue[5]}
                  style={{ transform: 'translateY(2px)' }}
                />{' '}
                <Text fz="sm" c={theme.colors.blue[5]}>
                  Project Member
                </Text>
              </Group>
            </Tooltip>
          )}
        </Group>
        {isLaptop && (
          <Stack mb="md">
            {activeGrants?.length !== 0 && (
              <Box>
                <Group mb={opened ? 'sm' : 0}>
                  <Text fz="sm">Active Grants</Text>
                  <ActionIcon size="xs" onClick={toggle}>
                    {opened ? <IconChevronUp /> : <IconChevronDown />}
                  </ActionIcon>
                </Group>
                <Collapse in={opened}>
                  <Stack gap="sm">
                    {activeGrants?.map((grant: DashGrant, i: number) => (
                      <MilestoneProgress
                        key={`milestone-progress-bar-${i}`}
                        grant={grant}
                      />
                    ))}
                  </Stack>
                </Collapse>
              </Box>
            )}
            <Group>
              <Box>
                <Group gap={4}>
                  <Text size="sm">Funding allocated </Text>
                  <Tooltip
                    position="bottom"
                    label="Total funding allocated to this project"
                  >
                    <IconInfoCircle size={14} color={theme.colors.violet[4]} />
                  </Tooltip>
                </Group>
                <Text size="sm" mb={2}>
                  {totalFundsAllocated} {GAME_TOKEN.SYMBOL}
                </Text>
              </Box>
              <Box>
                <Group gap={4}>
                  <Text size="sm">Funding Received</Text>
                  <Tooltip
                    label="Total funding received for work completed"
                    position="bottom"
                  >
                    <IconInfoCircle size={14} color={theme.colors.violet[4]} />
                  </Tooltip>
                </Group>
                <Text size="sm" mb={2}>
                  {totalFundsReceived} {GAME_TOKEN.SYMBOL}
                </Text>
              </Box>
            </Group>
          </Stack>
        )}

        <Text fz="sm" mb={'md'} className="ws-pre-wrap">
          {project.description}
        </Text>
        <Group mb="xl" justify="space-between">
          <AddressAvatarGroup
            addresses={project.members}
            avatarProps={{ size: 32 }}
          />
          <Group gap={8}>
            {project.mainDemoLink && (
              <Tooltip label="Try Demo" position="bottom">
                <ActionIcon
                  variant="priority"
                  size="lg"
                  radius={100}
                  component="a"
                  href={project.mainDemoLink}
                  rel="noreferrer"
                  target="_blank"
                >
                  <IconPlayerPlay size={16} />
                </ActionIcon>
              </Tooltip>
            )}
            {isProjectMember && (
              <Tooltip label="Edit Profile" position="bottom">
                <ActionIcon
                  variant="secondary"
                  size="lg"
                  bg={theme.colors.dark[5]}
                  radius={100}
                  component={Link}
                  to={'edit'}
                >
                  <IconPencil size={16} />
                </ActionIcon>
              </Tooltip>
            )}
          </Group>
        </Group>
        <Tabs defaultValue="feed">
          <Tabs.List mb={'xl'}>
            <Tabs.Tab value="feed" w={isTablet ? '4.5rem' : '6rem'}>
              Feed
            </Tabs.Tab>
            <Tabs.Tab w={isTablet ? '4.5rem' : '6rem'} value="updates">
              Updates
            </Tabs.Tab>
            <Tabs.Tab w={isTablet ? '4.5rem' : '6rem'} value="grants">
              Grants
            </Tabs.Tab>
            <Tabs.Tab w={isTablet ? '4.5rem' : '6rem'} value="details">
              Contact
            </Tabs.Tab>
          </Tabs.List>
          <Tabs.Panel value="feed">
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
          <Tabs.Panel value="grants">
            {/* {project.grants && (
              <GrantsPanel
                grants={grants}
                isLoading={grantsLoading}
                error={grantsError}
              />
            )} */}
            <></>
          </Tabs.Panel>
          <Tabs.Panel value="updates">
            {/* <ProjectUpdatesPanel
              grants={grants}
              project={project}
              isProjectMember={isProjectMember}
            /> */}
            <></>
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
      </ProfileSection>
      {!isLaptop && (
        <Stack gap={'xs'} mt={84} w={270}>
          {project.showcaseLinks && project.showcaseLinks?.length > 0 && (
            <Box>
              <Group mt="4" gap={4} align="center">
                <ActionIcon variant="subtle" onClick={() => toggleShowcase()}>
                  <IconMaximize />
                </ActionIcon>
                <Text fz="xs" style={{ cursor: 'pointer' }}>
                  Showcase Gallery
                </Text>
              </Group>
              <MediaCarousel size="sm" items={project.showcaseLinks} />
            </Box>
          )}
          <Paper p="md" bg={theme.colors.dark[6]} w="100%">
            <Text size="lg" mb={2}>
              {totalFundsAllocated} {GAME_TOKEN.SYMBOL}
            </Text>
            <Group mb="md" gap={4}>
              <Text size="sm">Funding allocated </Text>
              <Tooltip
                position="bottom"
                label="Total funding allocated to this project"
              >
                <IconInfoCircle size={14} color={theme.colors.violet[4]} />
              </Tooltip>
            </Group>
            <Text size="lg" mb={2}>
              {totalFundsReceived} {GAME_TOKEN.SYMBOL}
            </Text>
            <Group gap={4}>
              <Text size="sm">Funding Received</Text>
              <Tooltip
                label="Total funding received for work completed"
                position="bottom"
              >
                <IconInfoCircle size={14} color={theme.colors.violet[4]} />
              </Tooltip>
            </Group>
          </Paper>
          {activeGrants?.length !== 0 && (
            <Paper p="md" bg={theme.colors.dark[6]}>
              <Stack gap="lg">
                <Text>Active Grants</Text>
                {activeGrants?.map((grant: DashGrant, i: number) => (
                  <MilestoneProgress
                    key={`milestone-progress-bar-${i}`}
                    grant={grant}
                  />
                ))}
              </Stack>
            </Paper>
          )}
        </Stack>
      )}
      {isProjectMember && <PostAffix />}
      {isProjectMember && (
        <PostDrawer
          avatarImg={project.imgUrl}
          name={project.name}
          posterType={Player.Project}
          posterId={project.profileId}
          postType="richtext/post"
          postIndex={1}
          refetch={refetchProject}
        />
      )}
      <EditProfileDrawer project={project} refetchProject={refetchProject} />
      {project.showcaseLinks && project.showcaseLinks.length > 0 && (
        <FullScreenGallery
          items={project.showcaseLinks}
          isOpen={showcaseOpened}
          close={toggleShowcase}
        />
      )}
    </Flex>
  );
};
