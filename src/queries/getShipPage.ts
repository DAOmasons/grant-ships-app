import { decodeAbiParameters, parseAbiParameters } from 'viem';
import { getBuiltGraphSDK } from '../.graphclient';
import { PINATA_GATEWAY, getIpfsJson } from '../utils/ipfs/get';
import {
  ShipApplicationMetadata,
  ShipProfileMetadata,
} from '../utils/ipfs/metadataValidation';
import { ShipPageUI } from '../types/ui';

export const getShipPageData = async (id: string): Promise<ShipPageUI> => {
  try {
    const { shipPageQuery } = getBuiltGraphSDK();

    const { grantShip } = await shipPageQuery({ id });

    const pointer = grantShip?.profileMetadata?.pointer;
    if (!pointer) {
      console.error('No metadata pointer', grantShip);
      throw new Error('No metadata pointer');
    }

    const profileMetadata = await getIpfsJson(pointer);
    const validated = ShipProfileMetadata.safeParse(profileMetadata);

    if (!validated.success) {
      console.error('Invalid metadata', validated.error);
      throw new Error('Invalid metadata');
    }

    const decodedApplicationData = decodeAbiParameters(
      parseAbiParameters('address, string, (uint256, string)'),
      grantShip.shipApplicationBytesData
    );

    const CID = decodedApplicationData[2][1];
    const applicationData = await getIpfsJson(CID);

    const validatedApplicationData =
      ShipApplicationMetadata.safeParse(applicationData);

    if (!validatedApplicationData.success) {
      console.error('Invalid metadata', validatedApplicationData.error);
      throw new Error('Invalid metadata');
    }

    const applyData = validatedApplicationData.data;
    const profileData = validated.data;

    const members = [
      grantShip.owner,
      ...(grantShip.alloProfileMembers?.addresses || []),
    ];

    console.log('validatedApplicationData', validatedApplicationData);

    return {
      name: grantShip.name,
      description: profileMetadata.mission,
      imgUrl: `${PINATA_GATEWAY}/${profileMetadata.avatarHash_IPFS}`,
      status: grantShip.status,
      amtAllocated: grantShip.allocatedAmount || '0',
      amtDistributed: grantShip.distributedAmount || '0',
      amtAvailable: '0',
      shipContractAddress: grantShip.shipContractAddress,
      members,
      details: {
        thesis: applyData.thesis,
        apply: applyData.guidelines,
        extraInfo: applyData.extraInfo,
        extraLink: applyData.extraLink,
        website: profileData.website,
        email: profileData.email,
        x: profileData.x,
        discord: profileData.discord,
        telegram: profileData.telegram,
        github: profileData.github,
      },
    };
  } catch (error: any) {
    console.error(error);
    throw new Error(error?.mesasge || 'Error fetching ship');
  }
};
