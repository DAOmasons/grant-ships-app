import { getBuiltGraphSDK } from '../.graphclient';
import { resolveGrants } from '../resolvers/grantResolvers';

export const getShipGrants = async (shipId: string) => {
  const { getShipGrants } = getBuiltGraphSDK();

  const { grantShip } = await getShipGrants({ id: shipId });

  if (!grantShip) return null;

  const resolvedGrants = await resolveGrants(grantShip.grants);

  return resolvedGrants;
};
