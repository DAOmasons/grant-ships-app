import { Box, Select, useMantineTheme } from '@mantine/core';
import { Player, ProjectPageUI } from '../../types/ui';
import { UpdateInput } from '../forms/UpdateInput';
import { useTx } from '../../hooks/useTx';
import { notifications } from '@mantine/notifications';
import { Tag } from '../../constants/tags';
import ShipAbi from '../../abi/GrantShip.json';
import { Address } from 'viem';
import { pinJSONToIPFS } from '../../utils/ipfs/pin';
import {
  ContentSchema,
  basicUpdateSchema,
} from '../forms/validationSchemas/updateSchemas';
import { useQuery } from '@tanstack/react-query';
import { FeedSkeletonCard } from '../skeletons';
import { AppAlert } from '../UnderContruction';
import { IconX } from '@tabler/icons-react';
import { getUpdates } from '../../queries/getUpdates';
import { FeedCard } from '../feed/FeedCard';
import { DashGrant } from '../../resolvers/grantResolvers';
import { useState } from 'react';

export const ProjectUpdatesPanel = ({
  project,
  grants,
  isProjectMember,
}: {
  project?: ProjectPageUI;
  grants?: DashGrant[];
  isProjectMember?: boolean;
}) => {
  const {
    data: posts,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: [`ship-updates-${project?.id}`],
    queryFn: () => getUpdates(project?.id as string),
    enabled: !!project?.id && !!grants,
  });

  const theme = useMantineTheme();
  const { tx } = useTx();
  const [grant, setGrant] = useState<string | null>(null);

  const handlePostUpdate = async (text: string, clear: () => void) => {
    if (!project) {
      notifications.show({
        title: 'Error',
        message: 'Project ID is missing',
        color: 'red',
      });

      return;
    }

    if (text === '' || text === null) {
      notifications.show({
        title: 'Error',
        message: 'Update text is missing',
        color: 'red',
      });

      return;
    }

    const selectedGrant = grants?.find((g) => g.shipId.name === grant);

    if (!selectedGrant) {
      notifications.show({
        title: 'Error',
        message: 'Grant is missing',
        color: 'red',
      });
      return;
    }

    const shipContractAddress = selectedGrant.shipId.shipContractAddress;

    const metadata = basicUpdateSchema.safeParse({
      text,
      contentSchema: ContentSchema.BasicUpdate,
    });

    if (!metadata.success) {
      notifications.show({
        title: 'Validation Error',
        message: "Update text doesn't match the schema",
        color: 'red',
      });

      return;
    }

    const pinRes = await pinJSONToIPFS(metadata.data);

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
        address: shipContractAddress as Address,
        args: [Tag.ProjectPostUpdate, [1n, pinRes.IpfsHash], project.id],
      },
      onComplete() {
        refetch();
        clear?.();
      },
    });
  };

  if (isLoading) {
    return (
      <>
        <FeedSkeletonCard />
        <FeedSkeletonCard />
        <FeedSkeletonCard />
        <FeedSkeletonCard />
        <FeedSkeletonCard />
      </>
    );
  }

  if (error) {
    return (
      <AppAlert
        title="Error"
        description=""
        color={theme.colors.red[6]}
        icon={<IconX />}
      />
    );
  }

  if (!grants?.length)
    return (
      <AppAlert
        title="No Grants"
        description="No updates to show"
        color={theme.colors.gray[6]}
      />
    );

  return (
    <Box>
      {isProjectMember && (
        <Box mb="md">
          <Select
            onChange={(v) => setGrant(v)}
            data={grants.map((grant) => grant.shipId.name)}
            w="100%"
            placeholder="Select a grant"
            mb="md"
          />
          <UpdateInput
            imgUrl={project?.imgUrl}
            onClick={handlePostUpdate}
            disabled={!grant}
          />
        </Box>
      )}
      {posts?.length ? (
        posts.map((post) => (
          <FeedCard
            key={post.id}
            timestamp={post.timestamp}
            sender={post.postedBy}
            subject={{
              name: project?.name as string,
              id: project?.id as string,
              imgUrl: project?.imgUrl,
              entityType: Player.Ship,
            }}
            content={post.content.text}
          />
        ))
      ) : (
        <AppAlert
          title="No updates"
          description="No updates to show"
          color={theme.colors.gray[6]}
        />
      )}
    </Box>
  );
};
