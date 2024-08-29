import { getBuiltGraphSDK } from '../.graphclient';
import { badgeTemplateSchema } from '../components/forms/validationSchemas/badge';
import { getGatewayUrl, getIpfsJson } from '../utils/ipfs/get';
import { reasonSchema } from '../utils/ipfs/metadataValidation';
import { getUserData } from './getUserData';

export type UserBadge = {
  id: string;
  badgeId: string;
  amount: bigint;
  imgUrl: string;
  name: string;
  comment: string | null;
  hasFixedAmount: boolean;
  isSlash: boolean;
  isVotingToken: boolean;
};

export const getUserProfile = async (address: string, chainId: number) => {
  try {
    const { getUserBadges } = getBuiltGraphSDK({});

    const userData = await getUserData(address, chainId);
    const badges = await getUserBadges({ address });

    if (!badges.BadgeHolder) {
      throw new Error('No badges found');
    }

    const badgeHolder = badges.BadgeHolder[0];

    const withBadgeMetadata = await Promise.all(
      badgeHolder.badges.map(async (badge): Promise<UserBadge> => {
        const templatePointer = badge?.template?.metadata?.pointer;

        if (!templatePointer) {
          return {
            id: badge.id,
            badgeId: badge?.template?.badgeId || 'UNKNOWN',
            amount: BigInt(badge.amount),
            imgUrl: '',
            name: badge?.template?.name || '',
            comment: null,
            isSlash: badge?.template?.isSlash || false,
            isVotingToken: badge?.template?.isVotingToken || false,
            hasFixedAmount: badge?.template?.hasFixedAmount || false,
          };
        }
        const templateMetadata = await getIpfsJson(templatePointer);

        const validated = badgeTemplateSchema.safeParse(templateMetadata);

        if (!validated.success) {
          console.warn('Invalid metadata', validated.error);
          console.warn('Metadata', templateMetadata);
          return {
            id: badge.id,
            badgeId: badge?.template?.badgeId || 'UNKNOWN',
            amount: BigInt(badge.amount),
            imgUrl: '',
            name: badge?.template?.name || '',
            comment: null,
            isSlash: badge?.template?.isSlash || false,
            isVotingToken: badge?.template?.isVotingToken || false,
            hasFixedAmount: badge?.template?.hasFixedAmount || false,
          };
        }

        const commentPointer = badge.reason?.pointer;
        const commentProtocol = badge.reason?.protocol;

        let comment;

        if (commentProtocol === '0') {
          comment = '';
        } else if (!commentPointer || !commentProtocol) {
          comment = '';
        } else {
          const resolvedComment = await getIpfsJson(commentPointer);

          const validated = reasonSchema.safeParse(resolvedComment);

          if (!validated.success) {
            console.error('Invalid metadata', validated.error);
            throw new Error('Invalid metadata: Data does not match the schema');
          }

          comment = validated.data.reason;
        }

        return {
          id: badge.id,
          badgeId: badge?.template?.badgeId,
          amount: BigInt(badge.amount),
          imgUrl: getGatewayUrl(validated.data.avatarIPFSHash),
          name: badge?.template?.name || '',
          comment: comment,
          isSlash: badge?.template?.isSlash || false,
          isVotingToken: badge?.template?.isVotingToken || false,
          hasFixedAmount: badge?.template?.hasFixedAmount || false,
        };
      })
    );

    return {
      userData,
      badges: withBadgeMetadata as UserBadge[],
      lootTokenSymbol: badgeHolder.shaman?.lootToken?.symbol,
      sharesTokenSymbol: badgeHolder.shaman?.sharesToken?.symbol,
      badgeBalance: BigInt(badgeHolder.badgeBalance),
    };
  } catch (error) {
    console.error(error);
  }
};
