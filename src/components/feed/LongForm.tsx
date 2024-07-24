import React from 'react';
import { MainSection, PageTitle } from '../../layout/Sections';
import { RTDisplay } from '../PostDrawer';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { getBuiltGraphSDK } from '../../.graphclient';
import { useChainId } from 'wagmi';
import { getIpfsJson } from '../../utils/ipfs/get';
import { tiptapContentSchema } from '../forms/validationSchemas/tiptap';
import { resolveProjectMetadata } from '../../resolvers/projectResolvers';
import { Content } from '@tiptap/react';
import { Box } from '@mantine/core';

export const resolveRichTextMetadata = async (rtfPointer: string) => {
  const rtfJSON = await getIpfsJson(rtfPointer);

  const validatedRt = tiptapContentSchema.safeParse(rtfJSON);

  if (!validatedRt.success) {
    throw new Error('Invalid RTF');
  }

  return validatedRt.data as Content;
};

export const getRTUpdate = async (id: string, chainId: number) => {
  const { getRTUpdate } = getBuiltGraphSDK();

  const { Update } = await getRTUpdate({
    id: id,
    chainId: chainId,
  });

  if (!Update) {
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

export const LongForm = () => {
  const { id } = useParams();
  const chainId = useChainId();

  const {
    data: content,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['post', id],
    queryFn: () => getRTUpdate(id as string, chainId),
    enabled: !!id,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!content || !content.content || !content.posterProfile) {
    return <div>No content found</div>;
  }

  return (
    <MainSection>
      <PageTitle title="Post" />
      <Box>
        <RTDisplay content={content.content} />
      </Box>
    </MainSection>
  );
};
