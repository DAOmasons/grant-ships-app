import { Box } from '@mantine/core';
import { useGrant } from '../../hooks/useGrant';
import { UserUpdate } from './UserUpdate';
import { BeaconMessage } from './BeaconMessage';
import { ApplicationDisplay } from './ApplicationDisplay';
import {
  ApplicationDisplay as ApplicationDisplayType,
  GrantUpdate,
  MilestonesDisplay,
  VerdictUpdate,
} from '../../queries/getGrant';
import { VerdictDisplay } from './VerdictDisplay';
import { MilestoneDisplay } from './MilestoneDisplay';

export const GrantTimeline = () => {
  const { timeline, ship, project } = useGrant();
  return (
    <Box>
      {timeline.map((item) => {
        if (item.tag === 'beacon') {
          const update = item as GrantUpdate;

          return (
            <BeaconMessage
              key={update.id}
              content={update.updateContent}
              posterImg={ship?.profileMetadata?.imgUrl || ''}
              posterName={ship?.name || ''}
              playerType={update.playerType}
              timestamp={update.timestamp}
            />
          );
        }
        if (item.tag === 'grant/update/ship') {
          const update = item as GrantUpdate;

          return (
            <UserUpdate
              key={update.id}
              content={update.updateContent}
              posterImg={ship?.profileMetadata?.imgUrl || ''}
              posterName={ship?.name || ''}
              playerType={update.playerType}
              timestamp={update.timestamp}
            />
          );
        }
        if (item.tag === 'grant/update/project') {
          const update = item as GrantUpdate;
          return (
            <UserUpdate
              key={update.id}
              content={update.updateContent}
              posterImg={project?.metadata?.imgUrl || ''}
              posterName={project?.name || ''}
              playerType={update.playerType}
              timestamp={update.timestamp}
            />
          );
        }
        if (item.tag === 'application') {
          const doc = item as any as ApplicationDisplayType;
          return (
            <ApplicationDisplay
              key={doc.id}
              id={doc.id}
              status={doc.status}
              receivingAddress={doc.receivingAddress}
              amountRequested={doc.amount}
              dueDate={doc.content.dueDate}
              rtContent={doc.content.content}
            />
          );
        }
        if (
          item.tag === 'grant/approve/application' ||
          item.tag === 'grant/reject/application'
        ) {
          const update = item as VerdictUpdate;
          return (
            <VerdictDisplay
              timestamp={update.timestamp}
              posterName={ship?.name || ''}
              reason={update.reason}
              key={update.id}
              hasApproved={
                update.tag === 'grant/approve/application' ? true : false
              }
            />
          );
        }
        if (item.tag === 'milestoneSet') {
          const doc = item as any as MilestonesDisplay;
          return <MilestoneDisplay key={doc.id} doc={doc} />;
        }
      })}
    </Box>
  );
};
