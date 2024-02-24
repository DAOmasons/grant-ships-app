import { GrantDashFragment, getBuiltGraphSDK } from '../.graphclient';
import {
  DashGrant,
  resolveGrantApplicationData,
  resolveProjectMetadata,
  resolveShipApprovalReason,
} from '../resolvers/grantResolvers';

export const resolveGrants = async (grants: GrantDashFragment[]) => {
  const resolvedGrants = await Promise.all(
    grants.map(async (grant) => {
      const [profileMetadata, applicationData, shipApprovalReason] =
        await Promise.all([
          resolveProjectMetadata(grant?.projectId?.metadata?.pointer),
          resolveGrantApplicationData(grant.grantApplicationBytes),
          resolveShipApprovalReason(grant.shipApprovalReason?.pointer),
        ]);

      return {
        ...grant,
        projectMetadata: profileMetadata,
        applicationData,
        shipApprovalReason: shipApprovalReason
          ? (shipApprovalReason.reason as string)
          : null,
      };
    })
  );

  return resolvedGrants;
};

export const getFacilitatorGrants = async () => {
  const { getFacilitatorGrants } = getBuiltGraphSDK();

  const res = await getFacilitatorGrants();

  if (!res.grants) {
    throw new Error('No grant ship found');
  }

  const unpackedGrantData = await resolveGrants(res.grants);

  return unpackedGrantData as DashGrant[];
};
