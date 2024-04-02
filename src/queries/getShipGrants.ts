import { getBuiltGraphSDK } from '../.graphclient';
import { DashGrant, resolveGrants } from '../resolvers/grantResolvers';
import { SUBGRAPH_URL } from '../constants/gameSetup';

export const getShipGrants = async (shipId: string) => {
  const { getShipGrants } = getBuiltGraphSDK({
    apiEndpoint: SUBGRAPH_URL,
  });

  const { grantShip } = await getShipGrants({ id: shipId });

  if (!grantShip) return null;

  const resolvedGrants = await resolveGrants(grantShip.grants);

  return resolvedGrants as DashGrant[];
};
