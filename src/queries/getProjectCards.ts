import { z } from 'zod';
import {
  ProjectDetailsFragment,
  RawMetadataFragment,
  getBuiltGraphSDK,
} from '../.graphclient';
import { PINATA_GATEWAY, getIpfsJson } from '../utils/ipfs/get';
import { ProjectProfileMetadata } from '../utils/ipfs/metadataValidation';

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
    imgUrl: `${PINATA_GATEWAY}/${metadata.avatarHash_IPFS}`,
    metadata: metadata as ProjectMetadataType,
  };
};

export const getProjectCards = async () => {
  try {
    const { GetProjects } = getBuiltGraphSDK();

    const { projects } = await GetProjects();

    const resolvedProjects = await Promise.all(
      projects?.map((project) => projectMetadataResolver(project))
    );

    return resolvedProjects as ProjectCard[];
  } catch (error: any) {
    console.error(error);
    throw new Error(error?.mesasge || 'Error fetching projects');
  }
};
