import { getBuiltGraphSDK } from '../.graphclient';
import { resolveShipMetadata } from '../resolvers/shipResolvers';

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
