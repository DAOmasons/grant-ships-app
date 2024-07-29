import { Content } from '@tiptap/react';
import {
  BaseShipDataFragment,
  ProjectDataFragment,
  getBuiltGraphSDK,
  GrantUpdateFragment,
  GrantDataFragment,
  GrantApplicationFragment,
} from '../.graphclient';
import { beaconNotSubmitted, defaultApplication } from '../constants/copy';
import { resolveShipMetadata } from '../resolvers/grantResolvers';
import {
  ProjectMetadata,
  resolveProjectMetadata,
} from '../resolvers/projectResolvers';
import { ShipMetadata } from '../resolvers/shipResolvers';
import {
  resolveRTApplication,
  resolveRichTextMetadata,
} from '../resolvers/updates';
import { Player } from '../types/ui';
import { ContentSchema } from '../components/forms/validationSchemas/updateSchemas';

export type ProjectGrant =
  | (ProjectDataFragment & { metadata: ProjectMetadata | null })
  | null;

export type ShipGrant =
  | (BaseShipDataFragment & { profileMetadata: ShipMetadata | null } & {
      beaconMessage: { pointer: string } | null;
      customApplication: { pointer: string } | null;
    })
  | null;

export type GrantUpdate = GrantUpdateFragment & { updateContent: Content };
export type ApplicationDisplay = GrantApplicationFragment & {
  tag: 'string';
  content: {
    content: Content;
    dueDate: number;
  };
};

export type TimelineItem = GrantUpdate | ApplicationDisplay;

export type GrantQueryType = {
  project: ProjectGrant;
  ship: ShipGrant;
  beacon: Content;
  applicationTemplate: Content;
  timeline: TimelineItem[];
  grant: GrantDataFragment | null;
};

export const getGrant = async (grantId: string) => {
  const { getGrant } = getBuiltGraphSDK();

  if (!grantId) {
    console.error('No grantId', grantId);
    throw new Error('No grantId');
  }

  const [, projectId, shipSrc] = grantId.split('-');

  const data = await getGrant({
    projectId,
    shipSrc,
    grantId,
  });

  const {
    Project_by_pk: project,
    GrantShip: ships,
    Grant_by_pk: grant,
    Update: updates,
  } = data;

  const ship = ships ? ships[0] : null;

  const applications = grant?.applications || [];

  const [projectMetadata, shipMetadata] = await Promise.all([
    project ? await resolveProjectMetadata(project?.metadata?.pointer) : null,
    ship ? await resolveShipMetadata(ship.profileMetadata?.pointer) : null,
  ]);

  const resolvedShip =
    ship && shipMetadata ? { ...ship, profileMetadata: shipMetadata } : null;

  const resolvedProject =
    project && projectMetadata
      ? { ...project, metadata: projectMetadata }
      : null;
  const resolvedBeacon = ship?.beaconMessage?.pointer
    ? await resolveRichTextMetadata(ship.beaconMessage.pointer)
    : null;
  const resolvedCustomApplication = ship?.customApplication?.pointer
    ? await resolveRichTextMetadata(ship.customApplication.pointer)
    : null;

  const resolvedUpdates = await Promise.all(
    updates?.map(async (update) => {
      if (
        update?.content?.pointer &&
        update?.contentSchema === ContentSchema.RichText
      ) {
        const content = await resolveRichTextMetadata(update.content.pointer);
        return {
          ...update,
          updateContent: content,
        };
      }
      return update;
    })
  );

  const resolvedApplications = await Promise.all(
    applications.map(async (doc) => {
      if (doc?.metadata?.pointer) {
        const content = await resolveRTApplication(doc.metadata?.pointer);
        return {
          tag: 'application',
          ...doc,
          content,
        };
      } else {
        return doc;
      }
    })
  );

  console.log('resolvedApplications', resolvedApplications);

  const timeline = [...resolvedUpdates, ...resolvedApplications].sort((a, b) =>
    a.timestamp < b.timestamp ? 1 : -1
  );

  const beaconUpdate: GrantUpdate = {
    id: `${grantId}-beacon`,
    tag: 'beacon',
    playerType: Player.Ship,
    entityAddress: ship?.id || '',
    postedBy: ship?.id,
    updateContent: resolvedBeacon || beaconNotSubmitted,
    contentSchema: ContentSchema.RichText,
    timestamp: 0,
  };

  return {
    project: resolvedProject,
    ship: resolvedShip,
    beacon: resolvedBeacon || beaconNotSubmitted,
    applicationTemplate: resolvedCustomApplication || defaultApplication,
    timeline: [...timeline, beaconUpdate],
    grant: grant ? grant : null,
  } as GrantQueryType;
};
