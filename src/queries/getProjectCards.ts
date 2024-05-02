import { z } from 'zod';
import {
  ProjectDetailsFragment,
  RawMetadataFragment,
  getBuiltGraphSDK,
} from '../.graphclient';
import { getGatewayUrl, getIpfsJson } from '../utils/ipfs/get';
import { ProjectProfileMetadata } from '../utils/ipfs/metadataValidation';
import { SUBGRAPH_URL } from '../constants/gameSetup';
import { PROJECT_FILTER_LIST } from '../constants/filterLists';

type ProjectMetadataType = z.infer<typeof ProjectProfileMetadata>;

export type ProjectCardFromQuery = ProjectDetailsFragment & {
  metadata: RawMetadataFragment;
};

export type ProjectCard = ProjectCardFromQuery & {
  imgUrl: string;
  metadata: ProjectMetadataType;
};

const projectMetadataResolver = async (project: ProjectCardFromQuery) => {
  const metadata = await getIpfsJson(project.metadata.pointer);

  const validate = ProjectProfileMetadata.safeParse(metadata);

  if (!validate.success) {
    console.error('Invalid metadata', validate.error);
    throw new Error('Invalid metadata');
  }

  return {
    ...project,
    imgUrl: getGatewayUrl(metadata.avatarHash_IPFS),
    metadata: metadata as ProjectMetadataType,
  };
};

export const getProjectCards = async () => {
  try {
    const { GetProjects } = getBuiltGraphSDK({
      apiEndpoint: SUBGRAPH_URL,
    });

    const { projects } = await GetProjects();

    const filteredProjects = projects?.filter(
      (project) => !PROJECT_FILTER_LIST.includes(project.id)
    );

    const resolvedProjects = await Promise.all(
      filteredProjects?.map((project) => projectMetadataResolver(project))
    );

    return resolvedProjects as ProjectCard[];
  } catch (error: any) {
    console.error(error);
    throw new Error(error?.mesasge || 'Error fetching projects');
  }
};

export const getUserProjects = async (userId: string) => {
  try {
    const { GetUserProjects } = getBuiltGraphSDK({
      apiEndpoint: SUBGRAPH_URL,
    });

    const { projects } = await GetUserProjects({ id: userId });

    const filteredProjects = projects?.filter(
      (project) => !PROJECT_FILTER_LIST.includes(project.id)
    );

    console.log('filteredProjects', filteredProjects);

    const resolvedProjects = await Promise.all(
      filteredProjects?.map((project) => projectMetadataResolver(project))
    );

    return resolvedProjects as ProjectCard[];
  } catch (error: any) {
    console.error(error);
    throw new Error(error?.mesasge || 'Error fetching projects');
  }
};
