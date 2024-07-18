import { Hex, decodeAbiParameters, parseAbiParameters } from 'viem';
import { getBuiltGraphSDK } from '../.graphclient';
import { getGatewayUrl, getIpfsJson } from '../utils/ipfs/get';
import {
  ShipApplicationMetadata,
  ShipProfileMetadata,
} from '../utils/ipfs/metadataValidation';
import { ShipPageUI } from '../types/ui';
import { SUBGRAPH_URL } from '../constants/gameSetup';

export const getShipPageData = async (id: string): Promise<ShipPageUI> => {
  try {
    const { shipPageQuery } = getBuiltGraphSDK({
      apiEndpoint: SUBGRAPH_URL,
    });

    const { GrantShip } = await shipPageQuery({ id });

    if (!GrantShip?.[0]) {
      throw new Error('No ship found');
    }

    const grantShip = GrantShip[0];

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

    let applyData;

    if (grantShip.shipApplicationBytesData) {
      const decodedApplicationData = decodeAbiParameters(
        parseAbiParameters('address, string, (uint256, string)'),
        grantShip.shipApplicationBytesData as Hex
      );
      const CID = decodedApplicationData[2][1];
      const applicationData = await getIpfsJson(CID);
      const validatedApplicationData =
        ShipApplicationMetadata.safeParse(applicationData);

      if (!validatedApplicationData.success) {
        console.error('Invalid metadata', validatedApplicationData.error);
        throw new Error('Invalid metadata');
      }

      applyData = validatedApplicationData.data;
    }

    const profileData = validated.data;

    const members = [
      ...new Set([
        grantShip.owner,
        ...(Array.isArray(grantShip.alloProfileMembers?.addresses)
          ? (grantShip.alloProfileMembers?.addresses as string[])
          : []),
      ]),
    ];

    return {
      name: grantShip.name,
      description: profileMetadata.mission,
      imgUrl: getGatewayUrl(profileMetadata.avatarHash_IPFS),
      status: grantShip.status,
      amtAllocated: grantShip.totalAllocated || '0',
      amtDistributed: grantShip.totalDistributed || '0',
      balance: grantShip.balance || '0',
      totalRoundAmount: grantShip.totalRoundAmount || '0',
      amtAvailable: grantShip.totalAvailableFunds || '0',
      shipContractAddress: grantShip.shipContractAddress,
      members,
      details: {
        thesis: applyData?.thesis,
        apply: applyData?.guidelines,
        fee: applyData?.fee,
        extraInfo: applyData?.extraInfo,
        extraLink: applyData?.extraLink,
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
