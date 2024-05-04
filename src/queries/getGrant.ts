import { GrantDashFragment, getBuiltGraphSDK } from '../.graphclient';
import { SUBGRAPH_URL } from '../constants/gameSetup';
import { DashGrant, resolveGrants } from '../resolvers/grantResolvers';

export const getGrant = async (grantId: string) => {
  const { getGrant } = getBuiltGraphSDK({
    apiEndpoint: SUBGRAPH_URL,
  });

  const res = await getGrant({ id: grantId });

  const resolvedGrant = await resolveGrants([res.grant as GrantDashFragment]);

  return resolvedGrant[0] as DashGrant;
};
