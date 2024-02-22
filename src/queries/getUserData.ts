import { getBuiltGraphSDK } from '../.graphclient';
import HatsAbi from '../abi/Hats.json';
import { HATS } from '../constants/gameSetup';
import { publicClient } from '../utils/config';

export type UserData = {
  isFacilitator: boolean;
  isShipOperator: boolean;
  projects: {
    name: string;
    id: string;
    anchor: string;
  }[];
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

    return results.some((result) => result.isOperator);
  } catch (error) {
    console.error('Error in isFacilitator', error);
    throw error;
  }
};

// const isShipOperator = async (address: string) => {};

export const getUserData = async (address: string): Promise<UserData> => {
  try {
    const { getUserData } = getBuiltGraphSDK();
    const data = await getUserData({ id: address });
    const isFacilitator = await checkIsFacilitator(address);
    const isShipOperator = await checkIsShipOperator(address);
    return { ...data, isFacilitator, isShipOperator };
  } catch (error) {
    console.error('Error in getUserData', error);
    throw error;
  }
};
