import { getBuiltGraphSDK } from '../.graphclient';
import { SUBGRAPH_URL } from '../constants/gameSetup';

export const getShipPoolId = async (address: string): Promise<string> => {
  try {
    const { getShipPoolId } = getBuiltGraphSDK({
      apiEndpoint: SUBGRAPH_URL,
    });
    const data = await getShipPoolId({ id: address });

    return data.GrantShip?.[0]?.poolId;
  } catch (error) {
    console.error('Error in getPoolId', error);
    throw error;
  }
};
