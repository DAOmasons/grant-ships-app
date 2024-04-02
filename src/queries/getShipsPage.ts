import { ShipProfileMetadata } from '../utils/ipfs/metadataValidation';
import { BaseShipDataFragment, getBuiltGraphSDK } from '../.graphclient';
import { getGatewayUrl, getIpfsJson } from '../utils/ipfs/get';
import { ShipsCardUI } from '../types/ui';
import { SUBGRAPH_URL } from '../constants/gameSetup';

const resolveProfileMetadata = async (
  shipCard: BaseShipDataFragment
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
    amtAllocated: shipCard.totalAllocated,
    amtDistributed: shipCard.totalDistributed,
    amtAvailable: shipCard.totalAvailableFunds,
    balance: shipCard.balance,
  };
};

export const getShipsPageData = async () => {
  try {
    const { ShipsPageQuery } = getBuiltGraphSDK({
      apiEndpoint: SUBGRAPH_URL,
    });

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
