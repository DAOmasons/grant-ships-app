import { ShipDashFragment, getBuiltGraphSDK } from '../.graphclient';
import { DashGrant, resolveGrants } from '../resolvers/grantResolvers';
import { ShipMetadata, resolveShipMetadata } from '../resolvers/shipResolvers';
import { SUBGRAPH_URL } from '../constants/gameSetup';

export type DashShip = ShipDashFragment & {
  // grants: DashGrant[];
  profileMetadata?: ShipMetadata;
};

export const getShipDash = async (shipId: string): Promise<DashShip> => {
  try {
    const { getShipDash } = getBuiltGraphSDK({});

    const res = await getShipDash({ id: shipId });

    const ship = res.GrantShip?.[0];

    if (!ship) {
      throw new Error('No grant ship found');
    }

    const metadata = await resolveShipMetadata(ship.profileMetadata?.pointer);

    // const unpackedGrantData = await resolveGrants(ship.grants);

    return {
      ...ship,
      // grants: unpackedGrantData,
      profileMetadata: metadata as ShipMetadata,
    } as DashShip;
  } catch (error) {
    console.error('Error getting ship dash', error);
    throw error;
  }
};
