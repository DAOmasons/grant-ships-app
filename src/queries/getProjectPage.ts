import { getBuiltGraphSDK } from '../.graphclient';
import { ProjectPageUI } from '../types/ui';
import { PINATA_GATEWAY, getIpfsJson } from '../utils/ipfs/get';
import { ProjectProfileMetadata } from '../utils/ipfs/metadataValidation';

export const getProjectPage = async (id: string): Promise<ProjectPageUI> => {
  try {
    console.log('id', id);
    const { projectPageQuery } = getBuiltGraphSDK();

    const { project } = await projectPageQuery({ id });

    if (!project) {
      throw new Error('No project found');
    }

    const pointer = project.metadata?.pointer;

    if (!pointer) {
      console.error('No metadata pointer', project);
      throw new Error('No metadata pointer');
    }

    const json = await getIpfsJson(pointer);

    const validated = ProjectProfileMetadata.safeParse(json);

    if (!validated.success) {
      console.error('Invalid metadata', validated.error);
      throw new Error('Invalid metadata: Data does not match the schema');
    }

    const profileData = validated.data;

    return {
      id: project.id,
      name: project.name,
      description: profileData.description,
      imgUrl: `${PINATA_GATEWAY}/${profileData.avatarHash_IPFS}`,
      status: project.status,
      members: [project.owner, ...(project.members?.addresses || [])],
      grants: [],
      website: profileData.website,
      github: profileData.github,
      email: profileData.email,
      x: profileData.x,
      discord: profileData.discord,
      telegram: profileData.telegram,
    };
  } catch (error) {
    console.error('Error in getProjectPage', error);
    throw error;
  }
};
