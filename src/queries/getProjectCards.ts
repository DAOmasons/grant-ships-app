import {
  MetadataDetailsFragment,
  ProjectDetailsFragment,
  getBuiltGraphSDK,
} from '../.graphclient';
import { PINATA_GATEWAY } from '../utils/ipfs/get';

export type ProjectCardFromQuery = ProjectDetailsFragment & {
  metadata?: MetadataDetailsFragment | null;
};

export type ProjectCard = ProjectCardFromQuery & {
  imgUrl: string;
};

export const metadataRedunantCheck = async (project: ProjectCardFromQuery) => {
  if (!project.metadata) {
    console.log('Pin not found');
    const res = await fetch(`${PINATA_GATEWAY}/${project.metadata_pointer}`);
    const metadata = await res.json();
    return {
      ...project,
      metadata,
      imgUrl: `${PINATA_GATEWAY}/${metadata.avatarHash_IPFS}`,
    };
  } else {
    return {
      ...project,
      imgUrl: `${PINATA_GATEWAY}/${project.metadata.avatarHash_IPFS}`,
    };
  }
};

export const getProjectCards = async () => {
  try {
    const { GetProjects } = getBuiltGraphSDK();

    const { projects } = await GetProjects();

    const resolvedProjects = await Promise.all(
      projects?.map((project) => metadataRedunantCheck(project))
    );

    return resolvedProjects as ProjectCard[];
  } catch (error: any) {
    console.error(error);
    throw new Error(error?.mesasge || 'Error fetching projects');
  }
};
