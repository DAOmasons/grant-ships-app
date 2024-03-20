import { getBuiltGraphSDK } from '../.graphclient';

export const getGameManagerVersions = async () => {
  const { getGmVersions } = getBuiltGraphSDK();

  try {
    const versions = await getGmVersions();

    return versions.gmVersions;
  } catch (error) {
    throw new Error(`Failed to get game manager versions: ${error}`);
  }
};
