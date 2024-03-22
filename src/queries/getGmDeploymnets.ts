import { GmDeploymentFragment, getBuiltGraphSDK } from '../.graphclient';

export const getGameManagerDeployments = async () => {
  const { getGmDeployments } = getBuiltGraphSDK();

  try {
    const versions = await getGmDeployments();

    return versions.gmDeployments as GmDeploymentFragment[];
  } catch (error) {
    throw new Error(`Failed to get game manager versions: ${error}`);
  }
};
