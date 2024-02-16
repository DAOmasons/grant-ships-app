import { FeedDataFragment, getBuiltGraphSDK } from '../.graphclient';
import { DAO_MASONS } from '../constants/gameSetup';
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
  const isRawMessage = embed?.content && typeof embed?.content === 'string';

  const isPointer = isCID(embed?.pointer) && embed?.key;

  if (isRawMessage) {
    return embed?.content as string;
  }

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

export const handleSubjectImgCID = async (
  entityType: string,
  metadataPointer: string
) => {
  if (entityType === 'facilitators') {
    return DAO_MASONS.AVATAR_IMG;
  }

  if (entityType === 'ship' || entityType === 'project') {
    const data = await getIpfsJson(metadataPointer);

    const imgUrl = data?.avatarHash_IPFS;

    if (isCID(imgUrl)) {
      console.log(
        'No image found in metadata for project: ',
        data.name,
        imgUrl
      );
      return undefined;
    }

    return imgUrl;
  }

  console.warn('No image found for entity type', entityType);
  return undefined;
};

export const resolveFeedItem = async (
  item: FeedDataFragment
): Promise<FeedCardUI> => {
  //check entity type

  const imgCID = await handleSubjectImgCID(
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

  // if entity type is ship or project
  // then get metadata from ipfs so we can get the image
  // is there an embed?
  // if so, is the content already included?
  // if so, return the content
  // if so, does the metadata have pointer for content?
  // if so, get content from ipfs
};

export const getFeed = async ({
  first,
  skip,
}: {
  first: number;
  skip: number;
}) => {
  try {
    const { getFeed } = getBuiltGraphSDK();

    const { feedItems } = await getFeed({
      first,
      skip,
      orderBy: 'timestamp',
      orderDirection: 'desc',
    });
    console.log('feedItems', feedItems);
    const resolved = await Promise.all(
      feedItems.map(async (item) => await resolveFeedItem(item))
    );
    return resolved;
  } catch (error) {
    console.error('Error in getFeed', error);
    throw error;
  }
};
