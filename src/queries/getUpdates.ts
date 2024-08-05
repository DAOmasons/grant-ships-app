import { getBuiltGraphSDK } from '../.graphclient';
import { resolveUpdates } from '../resolvers/updates';

export const getUpdates = async (entityAddress: string) => {
  try {
    const { getUpdates } = getBuiltGraphSDK();

    const result = await getUpdates({ entityAddress: entityAddress });

    if (!result.Update) {
      throw new Error('No updates found');
    }

    const resolvedUpdates = await resolveUpdates(result.Update);

    return resolvedUpdates;
  } catch (error) {
    console.error('Error in getUpdates', error);
  }
};
