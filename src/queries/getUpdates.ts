import { getBuiltGraphSDK } from '../.graphclient';
import { resolveUpdates } from '../resolvers/updates';
import { UpdateScope } from '../types/common';

export const getUpdates = async (entityAddress: string, scope: UpdateScope) => {
  try {
    const { getUpdates } = getBuiltGraphSDK();

    const result = await getUpdates({
      entityAddress: entityAddress,
      scope: scope,
    });

    if (!result.Update) {
      throw new Error('No updates found');
    }

    const resolvedUpdates = await resolveUpdates(result.Update);

    return resolvedUpdates;
  } catch (error) {
    console.error('Error in getUpdates', error);
  }
};
