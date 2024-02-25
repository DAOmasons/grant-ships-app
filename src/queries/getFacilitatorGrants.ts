import { getBuiltGraphSDK } from '../.graphclient';
import { DashGrant, resolveGrants } from '../resolvers/grantResolvers';

export const getFacilitatorGrants = async () => {
  const { getFacilitatorGrants } = getBuiltGraphSDK();

  const res = await getFacilitatorGrants();

  if (!res.grants) {
    throw new Error('No grant ship found');
  }

  const unpackedGrantData = await resolveGrants(res.grants);

  return unpackedGrantData as DashGrant[];
};
