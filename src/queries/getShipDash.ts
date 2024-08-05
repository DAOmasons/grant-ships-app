import { Content } from '@tiptap/react';
import { ShipDashFragment, getBuiltGraphSDK } from '../.graphclient';
import { ShipMetadata, resolveShipMetadata } from '../resolvers/shipResolvers';
import { resolveRichTextMetadata } from '../resolvers/updates';

export type DashShip = ShipDashFragment & {
  profileMetadata?: ShipMetadata;
  beaconMessage?: Content | null;
};

export const getShipDash = async (shipId: string): Promise<DashShip> => {
  try {
    const { getShipDash } = getBuiltGraphSDK();

    const res = await getShipDash({ id: shipId });

    const ship = res.GrantShip?.[0];

    if (!ship) {
      throw new Error('No grant ship found');
    }

    const metadata = await resolveShipMetadata(ship.profileMetadata?.pointer);
    const resolvedBeacon = ship.beaconMessage?.pointer
      ? await resolveRichTextMetadata(ship.beaconMessage.pointer)
      : null;

    return {
      ...ship,
      profileMetadata: metadata as ShipMetadata,
      beaconMessage: resolvedBeacon as Content | null,
    } as DashShip;
  } catch (error) {
    console.error('Error getting ship dash', error);
    throw error;
  }
};
