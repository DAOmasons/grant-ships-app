import { getBuiltGraphSDK } from '../.graphclient';
import { resolveProjectMetadata } from '../resolvers/projectResolvers';
import { resolveShipMetadata } from '../resolvers/shipResolvers';

export const getFacilitatorGrants = async (gameId: string) => {
  const { getFacilitatorGrants } = getBuiltGraphSDK();

  const data = await getFacilitatorGrants({
    gameId,
  });

  if (!data?.grants) {
    console.error('No grants found for gameId: ', gameId);
    throw new Error('No grants found');
  }

  const resolvedGrants = await Promise.all(
    data.grants.map(async (grant) => {
      const projectMetadata = await resolveProjectMetadata(
        grant.project?.metadata?.pointer
      );
      const shipMetadata = await resolveShipMetadata(
        grant.ship?.profileMetadata?.pointer
      );

      return {
        ...grant,
        project: {
          ...grant.project,
          metadata: projectMetadata,
        },
        ship: {
          ...grant.ship,
          profileMetadata: shipMetadata,
        },
      };
    })
  );

  return resolvedGrants;
};
