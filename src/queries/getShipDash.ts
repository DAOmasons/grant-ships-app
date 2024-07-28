import { ShipDashFragment, getBuiltGraphSDK } from '../.graphclient';
import { ShipMetadata, resolveShipMetadata } from '../resolvers/shipResolvers';

export type DashShip = ShipDashFragment & {
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

    return {
      ...ship,
      profileMetadata: metadata as ShipMetadata,
    } as DashShip;
  } catch (error) {
    console.error('Error getting ship dash', error);
    throw error;
  }
};
