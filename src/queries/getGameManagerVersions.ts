import { getBuiltGraphSDK } from '../.graphclient';

export type GmVersion = {
  id: string;
  name: string;
  address: string;
};

export const getGameManagerVersions = async () => {
  const { getGmVersions } = getBuiltGraphSDK();

  try {
    const versions = await getGmVersions();

    return versions.gmVersions as GmVersion[];
  } catch (error) {
    throw new Error(`Failed to get game manager versions: ${error}`);
  }
};
