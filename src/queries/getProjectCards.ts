import { getBuiltGraphSDK } from '../.graphclient';
import { PINATA_GATEWAY } from '../utils/ipfs/gateway';

export type ProjectCards = Awaited<ReturnType<typeof getProjectCards>>;
export type ProjectCard = ProjectCards[number];

export const getProjectCards = async () => {
  try {
    const { GetProjects } = getBuiltGraphSDK();

    const { projects } = await GetProjects();

    return projects?.map((project) => ({
      ...project,
      imgUrl: `${PINATA_GATEWAY}/${project.metadata?.avatarHash_IPFS}`,
    }));
  } catch (error: any) {
    console.error(error);
    throw new Error(error?.mesasge || 'Error fetching projects');
  }
};
