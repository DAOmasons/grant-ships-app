import { getBuiltGraphSDK } from '../.graphclient';
import { DashGrant, resolveGrants } from '../resolvers/grantResolvers';

type FacilitatorGrantsData = {
  requiresAction: DashGrant[];
  rejected: DashGrant[];
  approved: DashGrant[];
};

export const getFacilitatorGrants =
  async (): Promise<FacilitatorGrantsData> => {
    try {
      const { getFacilitatorGrants } = getBuiltGraphSDK();
      const res = await getFacilitatorGrants();

      if (!res || !res.approved || !res.rejected || !res.requiresAction) {
        throw new Error('Error loading grants data');
      }

      const [requiresAction, rejected, approved] = await Promise.all([
        resolveGrants(res.requiresAction),
        resolveGrants(res.rejected),
        resolveGrants(res.approved),
      ]);

      return {
        requiresAction: requiresAction as DashGrant[],
        rejected: rejected as DashGrant[],
        approved: approved as DashGrant[],
      };
    } catch (error: any) {
      console.error(error.message || 'Error loading grants data');
      throw new Error(error.message || 'Error loading grants data');
    }
  };
