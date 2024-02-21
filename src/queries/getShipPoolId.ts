import { getBuiltGraphSDK } from '../.graphclient';

export const getShipPoolId = async (address: string): Promise<string> => {
  try {
    const { getShipPoolId } = getBuiltGraphSDK();
    const data = await getShipPoolId({ id: address });

    return data.grantShip?.poolId;
  } catch (error) {
    console.error('Error in getPoolId', error);
    throw error;
  }
};
