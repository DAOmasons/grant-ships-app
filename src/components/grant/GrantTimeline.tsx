import { Box } from '@mantine/core';
import { useGrant } from '../../hooks/useGrant';
import { UserUpdate } from './UserUpdate';
import { BeaconMessage } from './BeaconMessage';
import { ApplicationDisplay } from './ApplicationDisplay';
import {
  ApplicationDisplay as ApplicationDisplayType,
  GrantUpdate,
} from '../../queries/getGrant';
import { InsetUpdate } from './InsetUpdate';
import { VerdictDisplay } from './VerdictDisplay';

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
          console.log('item', item);
          return (
            <VerdictDisplay
              timestamp={item.timestamp}
              posterName={ship?.name || ''}
              reason={item.reason || ''}
              key={item.id}
              hasApproved={
                item.tag === 'grant/approve/application' ? true : false
              }
            />
          );
        }
      })}
    </Box>
  );
};
