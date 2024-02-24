import { Hex, decodeAbiParameters, parseAbiParameters } from 'viem';
import {
  ShipDashFragment,
  ShipDashGrantFragment,
  getBuiltGraphSDK,
} from '../.graphclient';
import { getGatewayUrl, getIpfsJson } from '../utils/ipfs/get';
import {
  ProjectProfileMetadata,
  grantApplicationMetadata,
} from '../utils/ipfs/metadataValidation';
import { z } from 'zod';

type ProjectMetadata = z.infer<typeof ProjectProfileMetadata> & {
  imgUrl: string;
};
type ApplicationMetadata = z.infer<typeof grantApplicationMetadata> & {
  projectId: string;
  receivingAddress: string;
  grantAmount: bigint;
};

export type DashShipGrant = ShipDashGrantFragment & {
  projectMetadata: ProjectMetadata;
  applicationData: ApplicationMetadata;
};

export type DashShip = ShipDashFragment & {
  grants: DashShipGrant[];
};

const resolveProjectMetadata = async (pointer?: string) => {
  if (!pointer) {
    console.error('No metadata pointer', pointer);
    throw new Error('No metadata pointer');
  }

  const json = await getIpfsJson(pointer);

  const validated = ProjectProfileMetadata.safeParse(json);

  if (!validated.success) {
    console.error('Invalid metadata', validated.error);
    throw new Error('Invalid metadata: Data does not match the schema');
  }

  return {
    ...validated.data,
    imgUrl: getGatewayUrl(validated.data.avatarHash_IPFS),
  };
};

const resolveGrantApplicationData = async (bytes: string) => {
  if (!bytes) {
    console.error('No application data', bytes);
    throw new Error('No application data');
  }

  const decodedApplicationData = decodeAbiParameters(
    parseAbiParameters('address, address, uint256, (uint256, string)'),
    bytes as Hex
  );

  const projectId = decodedApplicationData[0];
  const receivingAddress = decodedApplicationData[1];
  const grantAmount = decodedApplicationData[2];
  const CID = decodedApplicationData[3][1];

  if (!CID) {
    console.error('No CID found in application data', CID);
    throw new Error('No CID found in application data');
  }

  const json = await getIpfsJson(CID);

  const validated = grantApplicationMetadata.safeParse(json);

  if (!validated.success) {
    console.error('Invalid metadata', validated.error);
    throw new Error('Invalid metadata: Data does not match the schema');
  }

  return { ...validated.data, projectId, receivingAddress, grantAmount };
};

const resolveGrants = async (grants: ShipDashGrantFragment[]) => {
  const resolvedGrants = await Promise.all(
    grants.map(async (grant) => {
      const [profileMetadata, applicationData] = await Promise.all([
        resolveProjectMetadata(grant?.projectId?.metadata?.pointer),
        resolveGrantApplicationData(grant.grantApplicationBytes),
      ]);

      return {
        ...grant,
        projectMetadata: profileMetadata,
        applicationData,
      };
    })
  );

  return resolvedGrants;
};

export const getShipDash = async (shipId: string): Promise<DashShip> => {
  const { getShipDash } = getBuiltGraphSDK();

  const res = await getShipDash({ id: shipId });

  if (!res.grantShip) {
    throw new Error('No grant ship found');
  }

  const unpackedGrantData = await resolveGrants(res.grantShip.grants);

  // Todo, better typing needed
  return { ...res.grantShip, grants: unpackedGrantData } as DashShip;
};
