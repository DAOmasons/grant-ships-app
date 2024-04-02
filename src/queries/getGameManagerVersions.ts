import { getBuiltGraphSDK } from '../.graphclient';
import { SUBGRAPH_URL } from '../constants/gameSetup';

export type GmVersion = {
  id: string;
  name: string;
  address: string;
};

export const getGameManagerVersions = async () => {
  const { getGmVersions } = getBuiltGraphSDK({
    apiEndpoint: SUBGRAPH_URL,
  });

  try {
    const versions = await getGmVersions();

    return versions.gmVersions as GmVersion[];
  } catch (error) {
    throw new Error(`Failed to get game manager versions: ${error}`);
  }
};
