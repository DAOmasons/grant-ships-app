import { Content } from '@tiptap/react';
import {
  BaseShipDataFragment,
  ProjectDataFragment,
  getBuiltGraphSDK,
  GrantUpdateFragment,
  GrantDataFragment,
  GrantApplicationFragment,
  MilestonesFragment,
  MilestoneStepFragment,
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
  resolveReason,
  resolveRichTextMetadata,
} from '../resolvers/updates';
import { Player } from '../types/ui';
import { ContentSchema } from '../components/forms/validationSchemas/updateSchemas';
import { getIpfsJson } from '../utils/ipfs/get';
import { milestoneSchema } from '../utils/ipfs/metadataValidation';

export type ProjectGrant =
  | (ProjectDataFragment & { metadata: ProjectMetadata | null })
  | null;

export type ShipGrant =
  | (BaseShipDataFragment & { profileMetadata: ShipMetadata | null } & {
      beaconMessage: { pointer: string } | null;
      customApplication: { pointer: string } | null;
    })
  | null;

export type GrantUpdate = GrantUpdateFragment & {
  updateContent: Content;
};

export type VerdictUpdate = GrantUpdateFragment & {
  reason: string;
};
export type ApplicationDisplay = GrantApplicationFragment & {
  tag: 'string';
  content: {
    content: Content;
    dueDate: number;
  };
};
export type ResolvedMilestone = MilestoneStepFragment & {
  milestoneContent: {
    milestoneDetails: string;
    date: number;
  };
};

export type MilestonesDisplay = MilestonesFragment & {
  resolvedMilestones: ResolvedMilestone[];
  tag: string;
};

export type TimelineItem =
  | GrantUpdate
  | ApplicationDisplay
  | MilestonesDisplay
  | VerdictUpdate;

export type GrantQueryType = {
  project: ProjectGrant;
  ship: ShipGrant;
  beacon: Content;
  applicationTemplate: Content;
  timeline: TimelineItem[];
  grant: GrantDataFragment | null;
  currentApplication: ApplicationDisplay | null;
  currentMilestoneSet: MilestonesDisplay | null;
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
  const milestoneDrafts = grant?.milestoneDrafts || [];

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
      if (
        update?.content?.pointer &&
        update?.contentSchema === ContentSchema.Reason
      ) {
        const content = await resolveReason(update.content.pointer);

        return {
          ...update,
          reason: content?.reason,
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

  const resolveMilestoneMetadata = async (pointer: string) => {
    const res = await getIpfsJson(pointer);
    const validated = await milestoneSchema.safeParse(res);

    if (!validated.success) {
      console.error('Invalid metadata', validated.error);
      throw new Error('Invalid metadata: Data does not match the schema');
    }

    return validated.data;
  };

  const resolvedMilestoneDrafts = await Promise.all(
    milestoneDrafts.map(async (set) => {
      if (set?.milestones?.length) {
        const resolvedMilestones = await Promise.all(
          set.milestones.map(async (milestone: MilestoneStepFragment) => {
            if (milestone?.metadata?.pointer) {
              const content = await resolveMilestoneMetadata(
                milestone.metadata.pointer
              );
              return {
                ...milestone,
                milestoneContent: content,
              } as ResolvedMilestone;
            }
            return null;
          })
        );
        return {
          ...set,
          resolvedMilestones: resolvedMilestones
            .filter(Boolean)
            .sort((a, b) =>
              a!.index > b!.index ? 1 : -1
            ) as ResolvedMilestone[],
          tag: 'milestoneSet',
        } as MilestonesDisplay;
      } else {
        return null;
      }
    })
  );

  const currentApplication = resolvedApplications.sort((a, b) =>
    a.timestamp < b.timestamp ? 1 : -1
  )[0];

  const currentMilestoneSet = resolvedMilestoneDrafts.sort((a, b) =>
    (a?.timestamp || 0) < (b?.timestamp || 0) ? 1 : -1
  )[0];

  const timeline = [
    ...resolvedUpdates,
    ...resolvedApplications,
    ...(resolvedMilestoneDrafts.filter(Boolean) as MilestonesDisplay[]),
  ].sort((a, b) => (a.timestamp < b.timestamp ? 1 : -1));

  const beaconUpdate: GrantUpdate = {
    id: `${grantId}-beacon`,
    tag: 'beacon',
    playerType: Player.Ship,
    entityAddress: ship?.id || '',
    postedBy: ship?.id,
    updateContent: resolvedBeacon || beaconNotSubmitted,
    contentSchema: ContentSchema.RichText,
    timestamp: ship?.beaconLastUpdated || 0,
  };

  return {
    project: resolvedProject,
    ship: resolvedShip,
    currentApplication,
    currentMilestoneSet,
    beacon: resolvedBeacon || beaconNotSubmitted,
    applicationTemplate: resolvedCustomApplication || defaultApplication,
    timeline: [...timeline, beaconUpdate],
    grant: grant ? grant : null,
  } as GrantQueryType;
};
