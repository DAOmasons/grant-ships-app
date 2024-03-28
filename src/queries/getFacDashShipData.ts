import { z } from 'zod';
import { ShipProfileMetadata } from '../utils/ipfs/metadataValidation';
import { FacShipDataFragment, getBuiltGraphSDK } from '../.graphclient';
import { getIpfsJson } from '../utils/ipfs/get';

type ShipMetadataType = z.infer<typeof ShipProfileMetadata>;

type RawReason = {
  pointer: string;
};
type QueryApplicant = FacShipDataFragment;
type QueryApproved = FacShipDataFragment & {
  approvedTime?: string | null;
  applicationReviewReason?: RawReason | null;
  allocatedAmount?: string | null;
  distributedAmount?: string | null;
};
type QueryRejected = FacShipDataFragment & {
  rejectedTime?: string | null;
  applicationReviewReason?: RawReason | null;
};

export type CompressedShipApplicant = Omit<
  QueryApplicant,
  'profileMetadata'
> & {
  profileMetadata: ShipMetadataType;
  profilePointer: string;
};

export type CompressedApprovedShip = Omit<QueryApproved, 'profileMetadata'> & {
  profileMetadata: ShipMetadataType;
  profilePointer: string;
};

export type CompressedRejectedShip = Omit<QueryRejected, 'profileMetadata'> & {
  profileMetadata: ShipMetadataType;
  profilePointer: string;
};

export type FacShipData = {
  shipApplicants: CompressedShipApplicant[];
  rejectedShips: CompressedRejectedShip[];
  approvedShips: CompressedApprovedShip[];
};

const resolveProfileMetadata = async (
  applicant: QueryApplicant | QueryApplicant | QueryRejected
): Promise<CompressedShipApplicant> => {
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
    ...applicant,
    profileMetadata: metadata as ShipMetadataType,
    profilePointer: applicant.profileMetadata.pointer,
  };
};

const applicantMetadataResolver = async (applicant: QueryApplicant) => {
  const withProfileData = await resolveProfileMetadata(applicant);

  return withProfileData as CompressedShipApplicant;
};

const approvedMetadataResolver = async (applicant: QueryApproved) => {
  const withProfileData = await resolveProfileMetadata(applicant);

  return withProfileData as CompressedApprovedShip;
};

const rejectedMetadataResolver = async (applicant: QueryRejected) => {
  const withProfileData = await resolveProfileMetadata(applicant);

  return withProfileData as CompressedRejectedShip;
};

export const getFacDashShipData = async (): Promise<FacShipData> => {
  try {
    const { facDashShipData } = getBuiltGraphSDK();

    const { shipApplicants, approvedShips, rejectedShips } =
      await facDashShipData();

    const [resolvedApplicants, resolvedRejected, resolvedApproved] =
      await Promise.all([
        Promise.all(shipApplicants.map(applicantMetadataResolver)),
        Promise.all(rejectedShips.map(rejectedMetadataResolver)),
        Promise.all(approvedShips.map(approvedMetadataResolver)),
      ]);

    return {
      shipApplicants: resolvedApplicants,
      rejectedShips: resolvedRejected,
      approvedShips: resolvedApproved,
    };
  } catch (error: any) {
    console.error(error);
    throw new Error(error?.mesasge || 'Error fetching ships');
  }
};
