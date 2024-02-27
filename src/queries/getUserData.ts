import { getBuiltGraphSDK } from '../.graphclient';
import HatsAbi from '../abi/Hats.json';
import { HATS } from '../constants/gameSetup';
import { publicClient } from '../utils/config';
import { ProjectCardFromQuery } from './getProjectCards';

export type UserData = {
  isFacilitator: boolean;
  isShipOperator: boolean;
  shipAddress?: string;
  shipHatId?: bigint;
  projects: ProjectCardFromQuery[];
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
      const { getShipIdByHatId } = getBuiltGraphSDK();
      const result = await getShipIdByHatId({
        hatId: isOperator.hatId.toString(),
      });

      const shipAddress = result?.grantShips?.[0]?.id;

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

export const getUserData = async (address: string): Promise<UserData> => {
  try {
    const { getUserData } = getBuiltGraphSDK();
    const data = await getUserData({ id: address });
    const isFacilitator = await checkIsFacilitator(address);
    const isShipOperator = await checkIsShipOperator(address);

    if (!getUserData) {
      throw new Error('No user data found');
    }

    if (isShipOperator) {
      return {
        ...data,
        projects: data.projects as ProjectCardFromQuery[],
        isFacilitator,
        isShipOperator: true,
        shipAddress: isShipOperator.shipAddress,
        shipHatId: isShipOperator.shipHatId,
      };
    }

    return {
      ...data,
      projects: data.projects as ProjectCardFromQuery[],
      isFacilitator,
      isShipOperator,
    };
  } catch (error) {
    console.error('Error in getUserData', error);
    throw error;
  }
};
