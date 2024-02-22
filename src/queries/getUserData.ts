import { getBuiltGraphSDK } from '../.graphclient';

export type UserData = {
  projects: {
    name: string;
    id: string;
    anchor: string;
  }[];
};

// const isFacilitator = async (address: string) => {
//     try {

//         const data = await publicClient.readContract({
//           address: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2',
//           abi: ,
//           functionName: 'totalSupply',
//         });

//     } catch (error) {
//         console.error('Error in isFacilitator', error);
//         throw error;
//     }

// };

// const isShipOperator = async (address: string) => {};

export const getUserData = async (address: string): Promise<UserData> => {
  try {
    const { getUserData } = getBuiltGraphSDK();
    const data = await getUserData({ id: address });

    return data;
  } catch (error) {
    console.error('Error in getUserData', error);
    throw error;
  }
};
