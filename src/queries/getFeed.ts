import { FeedDataFragment, getBuiltGraphSDK } from '../.graphclient';
import { DAO_MASONS, GAME_MANAGER, SUBGRAPH_URL } from '../constants/gameSetup';
import { resolveRichTextMetadata } from '../resolvers/updates';
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

const isPlayerType = (type: number): type is Player => {
  return Object.values(Player).includes(type as any);
};

export const handleSubjectMetadata = async (
  playerType: number,
  metadataPointer: string
) => {
  if (playerType === Player.Facilitators) {
    return {
      imgCID: DAO_MASONS.AVATAR_IMG,
      description:
        'DAO Masons is an independent product and service guild for DAOs.',
    };
  }

  if (playerType === Player.Ship || playerType === Player.Project) {
    const data = await getIpfsJson(metadataPointer);

    const cid = data?.avatarHash_IPFS;
    const mission = data?.mission;
    const description = data?.description || mission;

    if (!isCID(cid)) {
      console.log('No image found in metadata for project: ', data.name, cid);
      return { imgCID: undefined, description };
    }

    return { imgCID: cid, description };
  }

  console.warn('No image found for entity type', playerType);
  return { imgCID: undefined, description: '' };
};

export const resolveFeedItem = async (
  item: FeedDataFragment
): Promise<FeedCardUI> => {
  //check entity type

  if (!item.subject) {
    console.warn('No subject found in feed item', item);
    throw new Error(`No subject found in feed`);
  }

  const { imgCID, description } = await handleSubjectMetadata(
    item.subject.playerType,
    item.subjectMetadataPointer
  );

  if (!isPlayerType(item.subject.playerType)) {
    console.warn('Invalid entity type', item.subject.playerType);
  }
  if (item.object?.playerType && !isPlayerType(item.object.playerType)) {
    console.warn('Invalid entity type', item.object.playerType);
  }

  const hasObject = item.object?.playerType != null && item.object?.name;
  const hasEmbed =
    (item.embed?.pointer && item.embed?.key) || item.embed?.content;

  const embedText = hasEmbed ? await handleEmbedText(item.embed!) : undefined;

  const richTextPointer = item.richTextContent?.pointer;

  const richTextContent = richTextPointer
    ? await resolveRichTextMetadata(richTextPointer)
    : undefined;

  return {
    subject: {
      name: item.subject.name,
      id: item.subject.id,
      playerType: item.subject.playerType as Player,
      imgUrl: imgCID ? getGatewayUrl(imgCID) : undefined,
      description,
    },
    object: hasObject
      ? {
          name: item.object?.name || '',
          id: item.object?.id || '',
          playerType: item.object?.playerType as Player,
        }
      : undefined,
    message: item.message as string | undefined,
    timestamp: item.timestamp,
    sender: item.sender!!,
    embedText,
    richTextContent,
    internalLink: item.internalLink || undefined,
    externalLink: item.externalLink || undefined,
    tag: item.tag,
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

    const { FeedCard } = await getFeed({
      first,
      skip,
      orderBy: { timestamp: 'desc' },
      domainId: GAME_MANAGER.ADDRESS,
    });

    const feedItems = FeedCard;

    if (!feedItems) {
      throw new Error('No feed items found');
    }

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
      orderBy: { timestamp: 'desc' },
      domainId: GAME_MANAGER.ADDRESS,
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
