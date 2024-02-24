import { z } from 'zod';
import {
  ProjectProfileMetadata,
  grantApplicationMetadata,
  reasonSchema,
} from '../utils/ipfs/metadataValidation';
import { Hex, decodeAbiParameters, parseAbiParameters } from 'viem';
import { getGatewayUrl, getIpfsJson } from '../utils/ipfs/get';
import { GrantDashFragment } from '../.graphclient';

export type ApplicationMetadata = z.infer<typeof grantApplicationMetadata> & {
  projectId: string;
  receivingAddress: string;
  grantAmount: bigint;
};

export type ProjectMetadata = z.infer<typeof ProjectProfileMetadata> & {
  imgUrl: string;
};

export type DashGrant = GrantDashFragment & {
  projectMetadata: ProjectMetadata;
  applicationData: ApplicationMetadata;
  shipApprovalReason: string | null;
};

export const resolveGrantApplicationData = async (bytes: string) => {
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

export const resolveShipApprovalReason = async (pointer?: string) => {
  if (!pointer) {
    return null;
  }

  const json = await getIpfsJson(pointer);

  const validated = reasonSchema.safeParse(json);

  if (!validated.success) {
    console.error('Invalid metadata', validated.error);
    throw new Error('Invalid metadata: Data does not match the schema');
  }

  return validated.data;
};

export const resolveProjectMetadata = async (pointer?: string) => {
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
