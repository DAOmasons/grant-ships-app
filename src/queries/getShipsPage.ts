import { z } from 'zod';
import { ShipProfileMetadata } from '../utils/ipfs/metadataValidation';
import { ShipCardQueryFragment, getBuiltGraphSDK } from '../.graphclient';
import { PINATA_GATEWAY, getIpfsJson } from '../utils/ipfs/get';
import { ShipsCardUI } from '../types/ui';

const resolveProfileMetadata = async (
  applicant: ShipCardQueryFragment
): Promise<ShipsCardUI> => {
  if (!applicant?.profileMetadata?.pointer) {
    console.error('No metadata pointer', applicant);
    throw new Error('No metadata pointer');
  }
  const metadata = await getIpfsJson(applicant.profileMetadata.pointer);

  const validate = ShipProfileMetadata.safeParse(metadata);

  if (!validate.success) {
    console.error('Invalid metadata', validate.error);
    throw new Error('Invalid metadata');
  }
  return {
    id: applicant.id,
    name: applicant.name,
    status: applicant.status,
    imgUrl: `${PINATA_GATEWAY}/${metadata.avatarHash_IPFS}`,
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
