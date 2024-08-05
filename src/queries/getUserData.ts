import { z } from 'zod';
import {
  FacShipDataFragment,
  ProjectDetailsFragment,
  RawMetadataFragment,
  getBuiltGraphSDK,
} from '../.graphclient';
import HatsAbi from '../abi/Hats.json';
import { HATS } from '../constants/gameSetup';
import { publicClient } from '../utils/config';
import { getIpfsJson } from '../utils/ipfs/get';
import { ShipProfileMetadata } from '../utils/ipfs/metadataValidation';
import { PROJECT_FILTER_LIST } from '../constants/filterLists';

type ShipMetadataType = z.infer<typeof ShipProfileMetadata>;

type UserProjectData = ProjectDetailsFragment & {
  metadata: RawMetadataFragment | null;
  grants: { grantStatus: number; shipId: { id: string } }[];
};

type ShipApplicantData = FacShipDataFragment & {
  profileMetadata: ShipMetadataType;
};

export type UserData = {
  isFacilitator: boolean;
  isShipOperator: boolean;
  shipAddress?: string;
  shipHatId?: bigint;
  projects: UserProjectData[];
  shipApplicants?: (FacShipDataFragment & ShipApplicantData)[];
};

// Todo: Use subgraph once we migrate to Arbitrum
const checkIsFacilitator = async (address: string) => {
  try {
    const data = await publicClient.readContract({
      address: HATS.ADDRESS,
      abi: HatsAbi,
      functionName: 'isWearerOfHat',
      args: [address, HATS.FACILITATOR],
    });

    return data as boolean;
  } catch (error) {
    console.error('Error in isFacilitator', error);
    throw error;
  }
};

const checkIsShipOperator = async (address: string) => {
  try {
    const results = await Promise.all(
      HATS.SHIP_OP.map(async (hatId) => {
        const data = await publicClient.readContract({
          address: HATS.ADDRESS,
          abi: HatsAbi,
          functionName: 'isWearerOfHat',
          args: [address, hatId],
        });

        return { isOperator: data as boolean, hatId };
      })
    );

    const isOperator = results.find((result) => result.isOperator);

    if (isOperator) {
      const { getShipIdByHatId } = getBuiltGraphSDK({});
      const result = await getShipIdByHatId({
        hatId: isOperator.hatId.toString(),
      });

      const shipAddress = result?.GrantShip?.[0]?.id;

      if (!shipAddress) {
        return false;
      }
      return {
        isOperator,
        shipAddress,
        shipHatId: isOperator.hatId,
      };
    }

    return false;
  } catch (error) {
    console.error('Error in isFacilitator', error);
    throw error;
  }
};

const resolveShipApplicationProfile = async (
  applicant: FacShipDataFragment
) => {
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
  };
};

export const getUserData = async (
  address: string,
  chainId: number
): Promise<UserData> => {
  try {
    const sdk = getBuiltGraphSDK();
    const { getUserData } = sdk;
    const data = await getUserData({ id: address, chainId });
    const isFacilitator = await checkIsFacilitator(address);
    const isShipOperator = await checkIsShipOperator(address);

    if (!getUserData) {
      throw new Error('No user data found');
    }

    const filteredProjects = data.projects?.filter(
      (project) => !PROJECT_FILTER_LIST.includes(project.id)
    );

    if (isShipOperator) {
      return {
        ...data,
        projects: filteredProjects as UserProjectData[],
        isFacilitator,
        isShipOperator: true,
        shipAddress: isShipOperator.shipAddress,
        shipHatId: isShipOperator.shipHatId,
        shipApplicants: [],
      };
    }

    if (data.shipApplicants?.length) {
      const resolved = await Promise.all(
        data.shipApplicants.map(async (profile) => {
          const res = await resolveShipApplicationProfile(profile);
          return res;
        })
      );

      return {
        ...data,
        projects: filteredProjects as UserProjectData[],
        isFacilitator,
        isShipOperator: false,
        shipApplicants: resolved as ShipApplicantData[],
      };
    }

    return {
      ...data,
      projects: filteredProjects as UserProjectData[],
      isFacilitator,
      isShipOperator,
      shipApplicants: [],
    };
  } catch (error) {
    console.error('Error in getUserData', error);
    throw error;
  }
};
