import {
  Avatar,
  Box,
  Group,
  Skeleton,
  Stack,
  Tabs,
  Text,
  useMantineTheme,
} from '@mantine/core';
import { Link as TipTapLink } from '@tiptap/extension-link';
import { Image as TipTapImage } from '@tiptap/extension-image';
import { MainSection, PageTitle } from '../layout/Sections';
import { Link, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { DashShip, getShipDash } from '../queries/getShipDash';
import { AppAlert } from '../components/UnderContruction';
import { useTx } from '../hooks/useTx';
import { notifications } from '@mantine/notifications';
import { pinJSONToIPFS } from '../utils/ipfs/pin';
import ShipAbi from '../abi/GrantShip.json';
import { Address } from 'viem';
import { GAME_MANAGER, ZER0_ADDRESS } from '../constants/gameSetup';

import { SettingsPanel } from '../components/dashboard/ship/SettingsPanel';
import { getShipGrants } from '../queries/getShipGrants';
import { GrantCard } from '../components/grant/GrantCard';
import { GrantStatus } from '../types/common';
import { useMemo } from 'react';
import { Player } from '../types/ui';

import { PlayerAvatar } from '../components/PlayerAvatar';
import { TxButton } from '../components/TxButton';
import { IconPlus } from '@tabler/icons-react';
import { tiptapContentSchema } from '../components/forms/validationSchemas/tiptap';
import { useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { RTEditor } from '../components/RTEditor';

export const ShipOpDashboard = () => {
  const { id } = useParams();

  const theme = useMantineTheme();

  const {
    data: shipData,
    error: shipError,
    isLoading: shipLoading,
    refetch: refetchShip,
  } = useQuery({
    queryKey: [`ship-dash-${id}`],
    queryFn: () => getShipDash(id as string),
    enabled: !!id,
  });

  const {
    data: grants,
    // isLoading: grantsLoading,
    // error: grantsError,
  } = useQuery({
    queryKey: [`ship-grants-${id}`],
    queryFn: () => getShipGrants(id as string, GAME_MANAGER.ADDRESS),
    enabled: !!id,
  });

  const { needsAttention, idleGrants } = useMemo(() => {
    if (!grants)
      return {
        needsAttention: null,
        idleGrants: null,
      };

    let needsAttention = [];
    let idleGrants = [];

    for (let grant of grants) {
      if (
        grant.hasPendingMilestones ||
        grant.status === GrantStatus.ProjectInitiated ||
        grant.status === GrantStatus.ApplicationSubmitted ||
        grant.status === GrantStatus.MilestonesSubmitted ||
        grant.status === GrantStatus.FacilitatorRejected
        // grant.status === GrantStatus.AllMilestonesComplete
      ) {
        needsAttention.push(grant);
      } else {
        idleGrants.push(grant);
      }
    }
    return {
      needsAttention,
      idleGrants,
    };
  }, [grants]);

  return (
    <MainSection>
      <PageTitle title="Ship Dashboard" />
      <Link
        to={`/ship/${shipData?.id}`}
        style={{
          display: 'flex',
          alignItems: 'center',
          marginBottom: '1rem',
          textDecoration: 'none',
        }}
      >
        <Avatar size={30} src={shipData?.profileMetadata?.imgUrl} mr={8} />
        <Text td="none" fz="sm">
          {shipData?.name}
        </Text>
      </Link>
      <Tabs defaultValue="grants">
        <Tabs.List mb="xl" grow>
          <Tabs.Tab value="grants">Grants</Tabs.Tab>
          <Tabs.Tab value="settings">Settings</Tabs.Tab>
          {/* <Tabs.Tab value="application">Portfolio Report</Tabs.Tab> */}
          <Tabs.Tab value="postUpdate">Post</Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel value="grants">
          <Stack>
            <Box>
              <Text fz="sm" mb={'md'} c={theme.colors.gray[6]}>
                Needs Attention
              </Text>
              <Stack>
                {needsAttention?.map((grant) => (
                  <GrantCard
                    hasPending={grant.hasPendingMilestones}
                    hasRejected={grant.hasRejectedMilestones}
                    allCompleted={grant.allMilestonesApproved}
                    key={grant.id}
                    avatarUrls={[grant.project?.metadata?.imgUrl || '']}
                    label={`${grant.project.name}`}
                    isActive={grant.status >= GrantStatus.Allocated}
                    linkUrl={`/grant/${grant.id}/timeline`}
                    status={grant.status}
                    notify
                  />
                ))}
              </Stack>
            </Box>
            <Box>
              <Text fz="sm" mb={'md'} c={theme.colors.gray[6]}>
                Idle
              </Text>
              <Stack>
                {idleGrants?.map((grant) => (
                  <GrantCard
                    hasPending={grant.hasPendingMilestones}
                    hasRejected={grant.hasRejectedMilestones}
                    allCompleted={grant.allMilestonesApproved}
                    key={grant.id}
                    avatarUrls={[grant.project?.metadata?.imgUrl || '']}
                    label={`${grant.project.name}`}
                    isActive={grant.status >= GrantStatus.Allocated}
                    linkUrl={`/grant/${grant.id}/timeline`}
                    status={grant.status}
                  />
                ))}
              </Stack>
            </Box>
          </Stack>
        </Tabs.Panel>
        <Tabs.Panel value="settings">
          <SettingsPanel
            shipSrcAddress={shipData?.shipContractAddress as string | undefined}
            shipAvatar={shipData?.profileMetadata?.imgUrl}
            shipName={shipData?.name}
            refetch={refetchShip}
            beacon={shipData?.beaconMessage}
          />
        </Tabs.Panel>
        {/* <Tabs.Panel value="application">
          {id && (
            <PortfolioReport
              grants={porfolioGrants}
              isLoading={shipLoading}
              error={shipError}
              shipId={id}
              reportStatus={reportStatus}
              shipHatId={shipData?.hatId}
              onReportSubmit={() => {
                refetchRecentRecord();
              }}
              reportData={recentRecord}
            />
          )}
        </Tabs.Panel> */}
        <Tabs.Panel value="postUpdate">
          <PostUpdatePanel ship={shipData} />
        </Tabs.Panel>
      </Tabs>
    </MainSection>
  );
};

export const GrantManager = ({
  shipData,
  shipError,
  shipLoading,
}: {
  shipData?: DashShip;
  shipError: Error | null;
  shipLoading: boolean;
}) => {
  const theme = useMantineTheme();

  if (shipLoading)
    return (
      <Stack gap={'lg'}>
        <Skeleton w={'100%'} h={228} />
        <Skeleton w={'100%'} h={228} />
        <Skeleton w={'100%'} h={228} />
        <Skeleton w={'100%'} h={228} />
      </Stack>
    );

  if (shipError)
    return (
      <AppAlert
        title="Error"
        color={theme.colors.pink[6]}
        description={shipError.message || 'Error loading ship data'}
      />
    );

  if (!shipData)
    return (
      <AppAlert
        title={'Ship Not Found'}
        description={'The ship you are looking for does not exist.'}
      />
    );

  // if (shipData.grants.length === 0)
  //   return (
  //     <AppAlert
  //       title={'No Grants'}
  //       description={'There are no grants for this ship.'}
  //     />
  //   );

  return null;
  // <Stack gap={'lg'}>
  //   {shipData?.grants.map((grant) => (
  //     <GrantCard key={grant.id} grant={grant} view="ship-dash" />
  //   ))}
  // </Stack>
};

const defaultContent = { type: 'doc', content: [] };
const PostUpdatePanel = ({ ship }: { ship?: DashShip }) => {
  const { tx } = useTx();

  const editor = useEditor({
    extensions: [
      StarterKit,
      TipTapLink,
      TipTapImage.configure({ inline: true, allowBase64: true }),
    ],
    content: defaultContent,
  });

  const handlePostUpdate = async () => {
    if (!editor) {
      return;
    }
    if (!ship || !ship.shipContractAddress) {
      notifications.show({
        title: 'Error',
        message: 'Ship ID is missing',
        color: 'red',
      });

      return;
    }

    const metadata = tiptapContentSchema.safeParse(editor.getJSON());

    if (!metadata.success) {
      notifications.show({
        title: 'Validation Error',
        message: "Update text doesn't match the schema",
        color: 'red',
      });

      return;
    }

    const pinRes = await pinJSONToIPFS(metadata.data);
    const tag = `TAG:SHIP_POST:${GAME_MANAGER.ADDRESS}`;
    if (typeof pinRes.IpfsHash !== 'string' && pinRes.IpfsHash[0] !== 'Q') {
      notifications.show({
        title: 'IPFS Upload Error',
        message: pinRes.IpfsHash[1],
        color: 'red',
      });
      return;
    }

    tx({
      writeContractParams: {
        abi: ShipAbi,
        functionName: 'postUpdate',
        address: ship?.shipContractAddress as Address,
        args: [tag, [1n, pinRes.IpfsHash], ZER0_ADDRESS],
      },
    });
  };

  return (
    <>
      <Group mt="40" mb="lg" w="100%" justify="space-between">
        <PlayerAvatar
          playerType={Player.Ship}
          imgUrl={ship?.profileMetadata?.imgUrl}
          name={ship?.name}
        />
        <Group gap="sm">
          <TxButton leftSection={<IconPlus />} onClick={handlePostUpdate}>
            Post
          </TxButton>
        </Group>
      </Group>
      <RTEditor editor={editor} growHeight={false} />
    </>
  );
};
