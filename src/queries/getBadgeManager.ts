import { BadgeTemplate_Fragment, getBuiltGraphSDK } from '../.graphclient';
import { badgeTemplateSchema } from '../components/forms/validationSchemas/badge';
import { BADGE_SHAMAN } from '../constants/addresses';
import { SUBGRAPH_URL } from '../constants/gameSetup';
import { getGatewayUrl, getIpfsJson } from '../utils/ipfs/get';
import { reasonSchema } from '../utils/ipfs/metadataValidation';

export type BadgeManager = {
  address: string;
  lootToken: { address: string; symbol: string };
  sharesToken: { address: string; symbol: string };
  templates: ResolvedTemplate[];
};
export type ResolvedTemplate = BadgeTemplate_Fragment & {
  templateMetadata: {
    description: string;
    avatarIPFSHash: string;
    imgUrl: string;
  };
  resolvedBadges: ResolvedBadge[];
};

export type ResolvedBadge = {
  wearer: string;
  amount: bigint;
  reason: string | null;
};

export const getBadgeShaman = async () => {
  try {
    const { getBadgeManager } = getBuiltGraphSDK({
      apiEndpoint: SUBGRAPH_URL,
    });

    const badgeManager = await getBadgeManager({
      shamanId: BADGE_SHAMAN,
    });

    if (!badgeManager) {
      throw new Error('No badge manager found');
    } else {
      const shaman = badgeManager.ScaffoldShaman_by_pk;
      const withMetadata = shaman?.templates
        ? await Promise.all(
            shaman?.templates?.map(async (template) => {
              const metadata = await getIpfsJson(
                template.metadata?.pointer as string
              );

              const validated = badgeTemplateSchema.safeParse(metadata);

              if (!validated.success) {
                console.warn('Invalid metadata', validated.error);
                console.warn('Metadata', metadata);
                return {
                  ...template,
                  templateMetadata: {
                    description: '',
                    avatarIPFSHash: '',
                    imgUrl: '',
                  },
                };
              }

              const resolvedBadges = await Promise.all(
                template.badges.map(async (badge) => {
                  if (badge.reason?.protocol === '0') {
                    return {
                      wearer: badge?.wearer?.address,
                      amount: badge.amount,
                      reason: null,
                    } as ResolvedBadge;
                  }

                  const metadata = await getIpfsJson(
                    badge.reason?.pointer as string
                  );

                  const validated = reasonSchema.safeParse(metadata);

                  if (!validated.success) {
                    console.warn('Invalid metadata', validated.error);
                    console.warn('Metadata', metadata);
                    return null;
                  }

                  return {
                    wearer: badge?.wearer?.address,
                    amount: badge.amount,
                    reason: validated.data.reason,
                  } as ResolvedBadge;
                })
              );

              return {
                ...template,
                resolvedBadges,
                templateMetadata: {
                  ...validated.data,
                  imgUrl: getGatewayUrl(validated.data.avatarIPFSHash),
                },
              };
            })
          )
        : null;

      if (!withMetadata) {
        throw new Error('No metadata found');
      }
      return {
        address: shaman?.address,
        lootToken: {
          address: shaman?.lootToken?.address,
          symbol: shaman?.lootToken?.symbol,
        },
        sharesToken: {
          address: shaman?.sharesToken?.address,
          symbol: shaman?.sharesToken?.symbol,
        },
        templates: withMetadata as ResolvedTemplate[],
      } as BadgeManager;
    }
  } catch (error) {
    console.error(error);
  }
};
