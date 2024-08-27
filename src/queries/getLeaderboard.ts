import { getBuiltGraphSDK } from '../.graphclient';
import { badgeTemplateSchema } from '../components/forms/validationSchemas/badge';
import { getGatewayUrl, getIpfsJson } from '../utils/ipfs/get';

type LeaderboardBadges = {
  amount: bigint;
  imgUrl: string;
  name: string;
};

export type LeaderboardHolder = {
  address: string;
  badgeBalance: bigint;
  badges: LeaderboardBadges[];
};
export const getLeaderboardQuery = async (): Promise<LeaderboardHolder[]> => {
  try {
    const { getLeaderboard } = getBuiltGraphSDK({});

    const leaderboard = await getLeaderboard();

    const holders = leaderboard.BadgeHolder;

    if (!holders) {
      throw new Error('No holders found');
    }

    const withBadgeMetadata = await Promise.all(
      holders.map(async (holder) => {
        const badgesWithMetadata = await Promise.all(
          holder.badges.map(async (badge) => {
            const pointer = badge?.template?.metadata?.pointer;

            if (!pointer) {
              return {
                amount: BigInt(badge.amount),
                imgUrl: '',
                name: badge?.template?.name,
              };
            }
            const metadata = await getIpfsJson(pointer);

            const validated = badgeTemplateSchema.safeParse(metadata);

            if (!validated.success) {
              return {
                amount: BigInt(badge.amount),
                imgUrl: '',
                name: badge?.template?.name,
              };
            }

            return {
              amount: BigInt(badge.amount),
              imgUrl: getGatewayUrl(validated.data.avatarIPFSHash),
              name: metadata?.name,
            };
          })
        );
        return {
          badgeBalance: BigInt(holder.badgeBalance),
          address: holder.address,
          badges: badgesWithMetadata,
        };
      })
    );

    return withBadgeMetadata;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
