import { GmDeploymentFragment, getBuiltGraphSDK } from '../.graphclient';
import { GmDeployment, resolveDeployments } from '../resolvers/gmResolvers';

export const getGameManagerDeployments = async () => {
  const { getGmDeployments } = getBuiltGraphSDK();

  try {
    const data = await getGmDeployments();

    const res = await resolveDeployments(
      data.gmDeployments as GmDeploymentFragment[]
    );
    console.log('res', res);
    return res as GmDeployment[];
  } catch (error) {
    throw new Error(`Failed to get game manager versions: ${error}`);
  }
};
