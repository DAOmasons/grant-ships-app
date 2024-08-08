import { z } from 'zod';
import {
  ProjectDetailsFragment,
  RawMetadataFragment,
  getBuiltGraphSDK,
} from '../.graphclient';
import { getGatewayUrl, getIpfsJson } from '../utils/ipfs/get';
import { ProjectProfileMetadata } from '../utils/ipfs/metadataValidation';
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

export const getProjectCards = async ({ chainId }: { chainId: number }) => {
  try {
    const { GetProjects } = getBuiltGraphSDK();
    const result = await GetProjects({ chainId });

    const filteredProjects = result.Project?.filter(
      (project) => !PROJECT_FILTER_LIST.includes(project.id.toLocaleLowerCase())
    );

    const resolvedProjects = await Promise.all(
      filteredProjects?.map((project) =>
        projectMetadataResolver(project as ProjectCardFromQuery)
      )
    );

    return resolvedProjects as ProjectCard[];
  } catch (error: any) {
    console.error(error);
    throw new Error(error?.mesasge || 'Error fetching projects');
  }
};
