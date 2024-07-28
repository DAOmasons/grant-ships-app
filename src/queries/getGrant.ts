import { getBuiltGraphSDK } from '../.graphclient';
import { resolveShipMetadata } from '../resolvers/grantResolvers';
import { resolveProjectMetadata } from '../resolvers/projectResolvers';

export const getGrant = async (grantId: string) => {
  const { getGrant } = getBuiltGraphSDK();

  if (!grantId) {
    console.error('No grantId', grantId);
    throw new Error('No grantId');
  }

  const [, projectId, shipSrc] = grantId.split('-');

  const grant = await getGrant({
    projectId,
    shipSrc,
    grantId,
  });

  const {
    Project_by_pk: project,
    GrantShip: ship,
    Grant_by_pk: grantData,
    Update: updates,
    Application: applications,
    MilestoneSet: milestonesSets,
  } = grant;

  const [projectMetadata, shipMetadata] = await Promise.all([
    project ? await resolveProjectMetadata(project?.metadata?.pointer) : null,
    ship ? await resolveShipMetadata(ship[0]?.profileMetadata?.pointer) : null,
  ]);

  const resolvedShip =
    ship && shipMetadata ? { ...ship[0], profileMetadata: shipMetadata } : null;

  const resolvedProject =
    project && projectMetadata
      ? { ...project, metadata: projectMetadata }
      : null;

  return {
    project: resolvedProject,
    ship: resolvedShip,
  };
};
