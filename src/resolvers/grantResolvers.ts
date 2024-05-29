import { z } from 'zod';
import {
  ShipProfileMetadata,
  grantApplicationMetadata,
  reasonSchema,
} from '../utils/ipfs/metadataValidation';
import { Address, Hex, decodeAbiParameters, parseAbiParameters } from 'viem';
import { getGatewayUrl, getIpfsJson } from '../utils/ipfs/get';
import { GrantDashFragment } from '../.graphclient';
import { publicClient } from '../utils/config';
import GrantShipAbi from '../abi/GrantShip.json';
import { GrantStatus } from '../types/common';
import { ProjectMetadata, resolveProjectMetadata } from './projectResolvers';
import { portfolioReportSchema } from '../components/forms/validationSchemas/portfolioReportSchema';

export type ApplicationMetadata = z.infer<typeof grantApplicationMetadata> & {
  projectId: string;
  receivingAddress: string;
  grantAmount: bigint;
};

export type ShipProfileMetadata = z.infer<typeof ShipProfileMetadata> & {
  imgUrl: string;
};

export type PackedMilestoneData = {
  amountPercentage: bigint;
  metadata: {
    pointer: string;
    protocol: number;
  };
  milestoneStatus: number;
};

export type DashGrant = GrantDashFragment & {
  projectMetadata: ProjectMetadata;
  applicationData: ApplicationMetadata;
  shipMetadata: ShipProfileMetadata;
  shipApprovalReason: string | null;
  facilitatorReason: string | null;
  milestones: PackedMilestoneData[] | null;
  milestonesApprovedReason: string | null;
  milestoneRejectedReason: string | null;
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

export const resolveFacilitatorReason = async (pointer?: string) => {
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

export const resolveShipMetadata = async (pointer?: string) => {
  if (!pointer) {
    console.error('No metadata pointer', pointer);
    throw new Error('No metadata pointer');
  }

  const json = await getIpfsJson(pointer);

  const validated = ShipProfileMetadata.safeParse(json);

  if (!validated.success) {
    console.error('Invalid metadata', validated.error);
    throw new Error('Invalid metadata: Data does not match the schema');
  }

  return {
    ...validated.data,
    imgUrl: getGatewayUrl(validated.data.avatarHash_IPFS),
  };
};

export const resolveMilestones = async (
  hasMilestones: boolean,
  recipientAddress: string,
  shipAddress: string
) => {
  if (!hasMilestones) {
    return null;
  }

  const result = await publicClient.readContract({
    address: shipAddress as Address,
    abi: GrantShipAbi,
    functionName: 'getMilestones',
    args: [recipientAddress],
  });

  if (!result || (result as any)?.length === 0) {
    return null;
  }

  return result as any as PackedMilestoneData[];
};

export const resolveMilestoneReviewReason = async (pointer?: string) => {
  if (!pointer) {
    return null;
  }

  const data = await getIpfsJson(pointer);

  const validated = reasonSchema.safeParse(data);

  if (!validated.success) {
    console.error('Invalid metadata', validated.error);
    return null;
  }

  return validated.data;
};

export const resolveMilestoneRejectedReason = async (pointer?: string) => {
  if (!pointer) {
    return null;
  }

  const data = await getIpfsJson(pointer);

  const validated = reasonSchema.safeParse(data);

  if (!validated.success) {
    console.error('Invalid metadata', validated.error);
    return null;
  }

  return validated.data;
};

export const resolveGrants = async (grants: GrantDashFragment[]) => {
  const resolvedGrants = await Promise.all(
    grants.map(async (grant) => {
      const [
        profileMetadata,
        shipMetadata,
        applicationData,
        shipApprovalReason,
        facilitatorReason,
        milestones,
        milestonesApprovedReason,
        milestoneRejectedReason,
      ] = await Promise.all([
        resolveProjectMetadata(grant?.projectId?.metadata?.pointer),
        resolveShipMetadata(grant?.shipId?.profileMetadata?.pointer),
        resolveGrantApplicationData(grant.grantApplicationBytes),
        resolveShipApprovalReason(grant.shipApprovalReason?.pointer),
        resolveFacilitatorReason(grant.facilitatorReason?.pointer),
        resolveMilestones(
          grant.grantStatus >= GrantStatus.MilestonesProposed &&
            grant.milestonesAmount,
          grant.projectId.id,
          grant.shipId.shipContractAddress
        ),
        resolveMilestoneReviewReason(grant.milestonesApprovedReason?.pointer),
        resolveMilestoneRejectedReason(
          grant.currentMilestoneRejectedReason?.pointer
        ),
      ]);

      return {
        ...grant,
        projectMetadata: profileMetadata,
        shipMetadata: shipMetadata,
        applicationData,
        shipApprovalReason: shipApprovalReason
          ? (shipApprovalReason.reason as string)
          : null,
        facilitatorReason: facilitatorReason
          ? (facilitatorReason.reason as string)
          : null,
        milestones: milestones ? milestones : null,
        milestonesApprovedReason: milestonesApprovedReason
          ? milestonesApprovedReason.reason
          : null,
        milestoneRejectedReason: milestoneRejectedReason
          ? milestoneRejectedReason.reason
          : null,
      };
    })
  );

  return resolvedGrants;
};

export const resolvePortfolioReport = async (pointer: string) => {
  const json = await getIpfsJson(pointer);

  const validated = portfolioReportSchema.safeParse(json);

  if (!validated.success) {
    throw new Error('Invalid metadata: Data does not match the schema');
  }
  return validated.data;
};
