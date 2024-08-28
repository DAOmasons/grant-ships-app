import { getBuiltGraphSDK } from '../.graphclient';
import { getUserData } from './getUserData';

export const getUserProfile = async (address: string, chainId: number) => {
  try {
    const { getUserBadges } = getBuiltGraphSDK({});

    const userData = await getUserData(address, chainId);
    const badges = await getUserBadges({ address });

    return {
      userData,
      badges,
    };
  } catch (error) {
    console.error(error);
  }
};
