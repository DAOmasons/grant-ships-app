import { FeedDataFragment, getBuiltGraphSDK } from '../.graphclient';
import { DAO_MASONS, SUBGRAPH_URL } from '../constants/gameSetup';
import { FeedCardUI, Player } from '../types/ui';
import { findValueByKey } from '../utils/helpers';
import { getGatewayUrl, getIpfsJson, isCID } from '../utils/ipfs/get';

const handleEmbedText = async (
  embed:
    | {
        pointer?: string | null;
        content?: string | null;
        key?: string | null;
        protocol?: string | null;
      }
    | undefined
) => {
  if (!embed) return undefined;
  const isRawMessage = embed?.content && typeof embed?.content === 'string';

  if (isRawMessage) {
    return embed?.content as string;
  }
  const isPointer = isCID(embed?.pointer) && embed?.key;

  if (isPointer) {
    const data = await getIpfsJson(embed.pointer as string);
    const value = findValueByKey(data, embed.key as string);

    if (value) {
      // we can assume that Typescript will return a string if truthy
      return value as string;
    } else return undefined;
  }
};

const isPlayerType = (type: string): type is Player => {
  return Object.values(Player).includes(type as any);
};

export const handleSubjectMetadata = async (
  entityType: string,
  metadataPointer: string
) => {
  if (entityType === 'facilitators') {
    return {
      imgCID: DAO_MASONS.AVATAR_IMG,
      description: 'DAO Masons description',
    };
  }

  if (entityType === 'ship' || entityType === 'project') {
    const data = await getIpfsJson(metadataPointer);

    const cid = data?.avatarHash_IPFS;
    const description = data?.description;

    if (!isCID(cid)) {
      console.log('No image found in metadata for project: ', data.name, cid);
      return { imgCID: undefined, description: '' };
    }

    return { imgCID: cid, description };
  }

  console.warn('No image found for entity type', entityType);
  return { imgCID: undefined, description: '' };
};

export const resolveFeedItem = async (
  item: FeedDataFragment
): Promise<FeedCardUI> => {
  //check entity type

  const { imgCID, description } = await handleSubjectMetadata(
    item.subject.type,
    item.subjectMetadataPointer
  );

  if (!isPlayerType(item.subject.type)) {
    console.warn('Invalid entity type', item.subject.type);
  }
  if (item.object?.type && !isPlayerType(item.object.type)) {
    console.warn('Invalid entity type', item.object.type);
  }

  const hasObject = item.object?.type && item.object?.name;
  const hasEmbed =
    (item.embed?.pointer && item.embed?.key) || item.embed?.content;

  const embedText = hasEmbed ? await handleEmbedText(item.embed!) : undefined;

  return {
    subject: {
      name: item.subject.name,
      id: item.subject.id,
      entityType: item.subject.type as Player,
      imgUrl: imgCID ? getGatewayUrl(imgCID) : undefined,
      description,
    },
    object: hasObject
      ? {
          name: item.object?.name || '',
          id: item.object?.id || '',
          entityType: (item.object?.type as Player) || '',
        }
      : undefined,
    content: item.content,
    timestamp: item.timestamp,
    sender: item.sender,
    embedText,
  };
};

export const getFeed = async ({
  first,
  skip,
}: {
  first: number;
  skip: number;
}) => {
  try {
    const { getFeed } = getBuiltGraphSDK({
      apiEndpoint: SUBGRAPH_URL,
    });

    const { feedItems } = await getFeed({
      first,
      skip,
      orderBy: 'timestamp',
      orderDirection: 'desc',
    });

    const resolved = await Promise.all(
      feedItems.map(async (item) => await resolveFeedItem(item))
    );

    return resolved;
  } catch (error) {
    console.error('Error in getFeed', error);
    throw error;
  }
};

export const getEntityFeed = async ({
  entityId,
  first,
  skip,
}: {
  entityId: string;
  first: number;
  skip: number;
}) => {
  try {
    const { getEntityFeed } = getBuiltGraphSDK({
      apiEndpoint: SUBGRAPH_URL,
    });

    const { subjectItems, objectItems } = await getEntityFeed({
      first: first,
      skip: skip,
      entityId: entityId,
      orderBy: 'timestamp',
      orderDirection: 'desc',
    });

    const resolved = await Promise.all(
      [...subjectItems, ...objectItems].map(
        async (item) => await resolveFeedItem(item)
      )
    );

    return resolved;
  } catch (error) {
    console.error('Error in getEntityFeed', error);
    throw error;
  }
};
