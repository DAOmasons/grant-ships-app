import {
  GrantBasicFragment,
  ShipDisplayFragment,
  getBuiltGraphSDK,
} from '../.graphclient';
import { ShipMetadata, resolveShipMetadata } from '../resolvers/shipResolvers';

type ProjectGrantBasic = GrantBasicFragment & {
  amountDistributed: string;
  amountAllocated: string;
};

export type ProjectGrant = ProjectGrantBasic & {
  ship: ShipDisplayFragment & {
    profileMetadata: ShipMetadata;
  };
};

export const getProjectGrants = async (projectId: string, gameId: string) => {
  const { getProjectGrants } = getBuiltGraphSDK();

  const data = await getProjectGrants({
    projectId,
    gameId,
  });

  if (!data?.grants) {
    console.error('No grants found for project', projectId);
    throw new Error('No grants found for project');
  }

  const resolvedGrants = await Promise.all(
    data.grants.map(async (grant) => {
      const shipMetadata = await resolveShipMetadata(
        grant.ship?.profileMetadata?.pointer
      );

      return {
        ...grant,
        ship: {
          ...grant.ship,
          profileMetadata: shipMetadata,
        },
      };
    })
  );

  return resolvedGrants;
};
