import { getBuiltGraphSDK } from '../.graphclient';
import { resolveProjectMetadata } from '../resolvers/projectResolvers';

export const getShipGrants = async (shipId: string, gameId: string) => {
  const { getShipGrants } = getBuiltGraphSDK();

  const data = await getShipGrants({
    shipId,
    gameId,
  });

  if (!data?.grants) {
    console.error('No grants found for Ship', shipId);
    throw new Error('No grants found for Ship');
  }

  const resolvedGrants = await Promise.all(
    data.grants.map(async (grant) => {
      const projectMetadata = await resolveProjectMetadata(
        grant.project?.metadata?.pointer
      );

      return {
        ...grant,
        project: {
          ...grant.project,
          metadata: projectMetadata,
        },
      };
    })
  );

  return resolvedGrants;
};
