import { ShipProfileMetadata } from '../utils/ipfs/metadataValidation';
import { ShipCardQueryFragment, getBuiltGraphSDK } from '../.graphclient';
import { getGatewayUrl, getIpfsJson } from '../utils/ipfs/get';
import { ShipsCardUI } from '../types/ui';

const resolveProfileMetadata = async (
  shipCard: ShipCardQueryFragment
): Promise<ShipsCardUI> => {
  if (!shipCard?.profileMetadata?.pointer) {
    console.error('No metadata pointer', shipCard);
    throw new Error('No metadata pointer');
  }
  const metadata = await getIpfsJson(shipCard.profileMetadata.pointer);

  const validate = ShipProfileMetadata.safeParse(metadata);

  if (!validate.success) {
    console.error('Invalid metadata', validate.error);
    throw new Error('Invalid metadata');
  }
  return {
    id: shipCard.id,
    name: shipCard.name,
    status: shipCard.status,
    imgUrl: getGatewayUrl(metadata.avatarHash_IPFS),
    description: metadata.mission,
    amtAllocated: '0',
    amtDistributed: '0',
    amtAvailable: '0',
  };
};

export const getShipsPageData = async () => {
  try {
    const { ShipsPageQuery } = getBuiltGraphSDK();

    const { grantShips } = await ShipsPageQuery();

    const resolvedShips = await Promise.all(
      grantShips?.map((ship) => resolveProfileMetadata(ship))
    );

    return resolvedShips as ShipsCardUI[];
  } catch (error: any) {
    console.error(error);
    throw new Error(error?.mesasge || 'Error fetching ships');
  }
};
