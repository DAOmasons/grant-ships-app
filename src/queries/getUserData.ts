import { getBuiltGraphSDK } from '../.graphclient';

export type UserData = {
  projects: {
    name: string;
    id: string;
    anchor: string;
  }[];
};

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
