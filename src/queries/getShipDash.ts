import { ShipDashFragment, getBuiltGraphSDK } from '../.graphclient';
import { DashGrant, resolveGrants } from '../resolvers/grantResolvers';
import { ShipMetadata, resolveShipMetadata } from '../resolvers/shipResolvers';

export type DashShip = ShipDashFragment & {
  grants: DashGrant[];
  profileMetadata?: ShipMetadata;
};

export const getShipDash = async (shipId: string): Promise<DashShip> => {
  try {
    const { getShipDash } = getBuiltGraphSDK();

    const res = await getShipDash({ id: shipId });

    if (!res.grantShip) {
      throw new Error('No grant ship found');
    }

    const metadata = await resolveShipMetadata(
      res.grantShip.profileMetadata?.pointer
    );

    const unpackedGrantData = await resolveGrants(res.grantShip.grants);

    return {
      ...res.grantShip,
      grants: unpackedGrantData,
      profileMetadata: metadata as ShipMetadata,
    } as DashShip;
  } catch (error) {
    console.error('Error getting ship dash', error);
    throw error;
  }
};
