import { getBuiltGraphSDK } from '../.graphclient';
import { resolveUpdates } from '../resolvers/updates';
import { UpdateScope } from '../types/common';

export const getUpdates = async (entityAddress: string, scope: UpdateScope) => {
  try {
    const { getUpdatesQuery } = getBuiltGraphSDK();

    const result = await getUpdatesQuery({
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
