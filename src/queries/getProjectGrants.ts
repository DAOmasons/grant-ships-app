// import { getBuiltGraphSDK } from '../.graphclient';
// import { DashGrant, resolveGrants } from '../resolvers/grantResolvers';
// import { SUBGRAPH_URL } from '../constants/gameSetup';

// export const getProjectGrants = async (
//   projectId: string
// ): Promise<DashGrant[]> => {
//   try {
//     const { getProjectGrants } = getBuiltGraphSDK({
//       apiEndpoint: SUBGRAPH_URL,
//     });

//     const res = await getProjectGrants({ id: projectId });

//     if (!res.project) {
//       throw new Error('No grant ship found');
//     }

//     const unpackedGrantData = await resolveGrants(res.project.grants);

//     return unpackedGrantData as DashGrant[];
//   } catch (error) {
//     console.error('Error getting ship dash', error);
//     throw error;
//   }
// };
