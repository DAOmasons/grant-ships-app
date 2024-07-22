import { getBuiltGraphSDK } from '../.graphclient';
import { ProjectPageUI } from '../types/ui';
import { getGatewayUrl, getIpfsJson } from '../utils/ipfs/get';
import { ProjectProfileMetadata } from '../utils/ipfs/metadataValidation';
import { SUBGRAPH_URL } from '../constants/gameSetup';
import { ShowcaseLink } from '../utils/media';

export const getProjectPage = async (id: string): Promise<ProjectPageUI> => {
  try {
    const { projectPageQuery } = getBuiltGraphSDK({
      apiEndpoint: SUBGRAPH_URL,
    });

    const { Project } = await projectPageQuery({ id });

    if (!Project[0]) {
      throw new Error('No Project found');
    }

    const project = Project[0];

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
      profileId: project.profileId,
      description: profileData.description,
      imgUrl: getGatewayUrl(profileData.avatarHash_IPFS),
      avatarHash: profileData.avatarHash_IPFS,
      status: project.status,
      members: [
        ...new Set([project.owner, ...(project.members?.addresses || [])]),
      ],
      grants: [],
      website: profileData.website,
      github: profileData.github,
      email: profileData.email,
      x: profileData.x,
      discord: profileData.discord,
      telegram: profileData.telegram,
      mainDemoLink: profileData.mainDemoLink,
      bannerImage: profileData.bannerImage,
      bannerImgUrl: profileData.bannerImage
        ? getGatewayUrl(profileData.bannerImage)
        : undefined,
      showcaseLinks: profileData.showcaseLinks as ShowcaseLink[] | undefined,
    };
  } catch (error) {
    console.error('Error in getProjectPage', error);
    throw error;
  }
};
