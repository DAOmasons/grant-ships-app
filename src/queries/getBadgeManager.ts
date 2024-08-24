import { BadgeTemplateFragment, getBuiltGraphSDK } from '../.graphclient';
import { badgeTemplateSchema } from '../components/forms/validationSchemas/badge';
import { BADGE_SHAMAN } from '../constants/addresses';
import { SUBGRAPH_URL } from '../constants/gameSetup';
import { getIpfsJson } from '../utils/ipfs/get';

export type ResolvedTemplate = BadgeTemplateFragment & {
  templateMetadata: { description: string; avatarIPFSHash: string };
};

export const getBadgeShamans = async () => {
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

                return {
                  ...template,
                  templateMetadata: {
                    description: '',
                    avatarIPFSHash: '',
                  },
                };
              }

              return {
                ...template,
                templateMetadata: validated,
              };
            })
          )
        : null;
      return {
        address: shaman?.address,
        templates: withMetadata as ResolvedTemplate[],
      };
    }
  } catch (error) {
    console.error(error);
  }
};
