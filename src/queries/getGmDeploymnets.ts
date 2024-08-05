// import { GmDeploymentFragment, getBuiltGraphSDK } from '../.graphclient';
// import { GmDeployment, resolveDeployments } from '../resolvers/gmResolvers';
// import { SUBGRAPH_URL } from '../constants/gameSetup';

// export const getGameManagerDeployments = async () => {
//   const { getGmDeployments } = getBuiltGraphSDK({
//     apiEndpoint: SUBGRAPH_URL,
//   });

//   try {
//     const data = await getGmDeployments();

//     const res = await resolveDeployments(
//       data.gmDeployments as GmDeploymentFragment[]
//     );
//     return res as GmDeployment[];
//   } catch (error) {
//     throw new Error(`Failed to get game manager versions: ${error}`);
//   }
// };
