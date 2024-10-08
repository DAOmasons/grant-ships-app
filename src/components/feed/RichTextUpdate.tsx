import { MainSection, PageTitle } from '../../layout/Sections';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { getBuiltGraphSDK } from '../../.graphclient';
import { useChainId, useConfig } from 'wagmi';
import { resolveProjectMetadata } from '../../resolvers/projectResolvers';
import { Box, Divider, Group, Skeleton, Text } from '@mantine/core';
import { resolveRichTextMetadata } from '../../resolvers/updates';
import { PlayerAvatar } from '../PlayerAvatar';
import { useMemo } from 'react';
import { secondsToShortRelativeTime } from '../../utils/time';
import { AddressAvatar } from '../AddressAvatar';
import { Address } from 'viem';
import { RTDisplay } from '../RTDisplay';
import { Player } from '../../types/ui';
import { getGatewayUrl } from '../../utils/ipfs/get';
import { DAO_MASONS } from '../../constants/gameSetup';

const getRTUpdate = async (id: string, chainId: number) => {
  const { getRTUpdate } = getBuiltGraphSDK();

  const { Update } = await getRTUpdate({
    id: id,
    chainId: chainId,
  });

  if (!Update[0].content) {
    throw new Error('No update found');
  }

  const richText = Update[0];

  const profileData = richText.entityMetadata_id
    ? await resolveProjectMetadata(richText.entityMetadata_id)
    : null;
  const content = richText.content
    ? await resolveRichTextMetadata(richText.content.pointer)
    : null;

  return {
    ...richText,
    posterProfile: profileData,
    content: content,
  };
};

export const RichTextUpdate = () => {
  const { id } = useParams();
  const chainId = useChainId();

  const {
    data: update,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['post', id, chainId],
    queryFn: () => getRTUpdate(id as string, chainId),
    enabled: !!id,
  });

  const time = useMemo(() => {
    if (!update?.timestamp) return '';

    return secondsToShortRelativeTime(update.timestamp);
  }, [update]);

  if (isLoading) {
    return (
      <MainSection maw={675}>
        <PageTitle title="Post" />
        <Box>
          <Skeleton height={40} mt={'xl'} w={250} />
          <Skeleton mt="lg" height={400} ml={54} w="100%" />
        </Box>
      </MainSection>
    );
  }

  if (error) {
    return <MainSection maw={675}>Error: {error.message}</MainSection>;
  }

  if (!update || !update.content) {
    return <MainSection maw={675}>404: No update found</MainSection>;
  }

  const imgUrl =
    update.playerType === Player.Facilitators
      ? getGatewayUrl(DAO_MASONS.AVATAR_IMG)
      : update?.posterProfile?.imgUrl
        ? update.posterProfile.imgUrl
        : '?';

  const name =
    update?.playerType === Player.Facilitators
      ? 'Facilitators'
      : update?.posterProfile?.name
        ? update?.posterProfile?.name
        : 'Unknown';

  return (
    <MainSection maw={675}>
      <PageTitle title="Post" />
      <Group mt="xl" gap={8}>
        <PlayerAvatar
          display="fullPage"
          playerType={update.playerType}
          imgUrl={imgUrl}
          name={name}
        />
        <Text size="sm" opacity={0.8}>
          ·
        </Text>
        <Text size="sm" opacity={0.8}>
          {time}
        </Text>
      </Group>
      <Box ml={54} mt={'lg'}>
        <RTDisplay content={update.content} />
        <Divider mt="lg" />
        {update.postedBy && (
          <Group mt="lg" gap={'md'}>
            <Text size="sm" opacity={0.8}>
              Posted by:{' '}
            </Text>
            <AddressAvatar address={update.postedBy as Address} canCopy />
          </Group>
        )}
      </Box>
    </MainSection>
  );
};
