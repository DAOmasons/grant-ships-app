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
import { MilestoneSetDisplay } from './MilestoneSetDisplay';
import { AllocationComplete } from './AllocationComplete';
import { MilestoneDisplay } from './MilestoneDisplay';
import { FundsDistributed } from './FundsDistributed';

import { GrantHelper } from './GrantHelpers';
import { InsetUpdate } from './InsetUpdate';
import { IconMail } from '@tabler/icons-react';
import { DAO_MASONS } from '../../constants/gameSetup';
import { getGatewayUrl } from '../../utils/ipfs/get';

export const GrantTimeline = () => {
  const { timeline, ship, project } = useGrant();
  console.log('timeLine', timeline);
  return (
    <Box>
      <GrantHelper />
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
        if (item.tag === 'grant/update/facilitator') {
          const update = item as GrantUpdate;

          return (
            <UserUpdate
              key={update.id}
              content={update.updateContent}
              posterImg={getGatewayUrl(DAO_MASONS.AVATAR_IMG)}
              posterName={'Facilitators'}
              playerType={update.playerType}
              timestamp={update.timestamp}
            />
          );
        }
        if (item.tag === 'grant/invite/ship') {
          const update = item as GrantUpdate;

          return (
            <InsetUpdate
              key={update.id}
              posterName={ship?.name || ''}
              tagline={`has invited ${project?.name} to start a grant!`}
              symbolUI={<IconMail />}
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
              timestamp={doc.timestamp}
              receivingAddress={doc.receivingAddress}
              amountRequested={doc.amount}
              dueDate={doc.content.dueDate}
              rtContent={doc.content.content}
              draftNumber={doc.index + 1}
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
              key={update.id}
              timestamp={update.timestamp}
              entityReviewed={'Application'}
              posterName={ship?.name || ''}
              reason={update.reason}
              hasApproved={
                update.tag === 'grant/approve/application' ? true : false
              }
            />
          );
        }
        if (
          item.tag === 'grant/approve/milestoneSet' ||
          item.tag === 'grant/reject/milestoneSet'
        ) {
          const update = item as VerdictUpdate;
          return (
            <VerdictDisplay
              key={update.id}
              timestamp={update.timestamp}
              entityReviewed={'Milestone Draft'}
              posterName={ship?.name || ''}
              reason={update.reason}
              hasApproved={update.tag === 'grant/approve/milestoneSet'}
            />
          );
        }
        if (
          item.tag === 'grant/allocate/approved' ||
          item.tag === 'grant/allocate/rejected'
        ) {
          const update = item as VerdictUpdate;
          return (
            <VerdictDisplay
              key={update.id}
              timestamp={update.timestamp}
              entityReviewed={'Grant Allocation'}
              posterName={'Facilitator Crew'}
              reason={update.reason}
              hasApproved={update.tag === 'grant/allocate/approved'}
            />
          );
        }
        if (item.tag === 'grant/allocation/locked') {
          const update = item as GrantUpdate;
          return (
            <AllocationComplete key={item.id} timestamp={update.timestamp} />
          );
        }
        if (item.tag === 'milestoneSet') {
          const doc = item as any as MilestonesDisplay;
          return <MilestoneSetDisplay key={doc.id} doc={doc} />;
        }
        if (item.tag === 'grant/milestone/submit') {
          const doc = item as GrantUpdate;
          return <MilestoneDisplay key={doc.id} updateData={doc} />;
        }
        if (item.tag === 'grant/milestone/rejected') {
          const doc = item as VerdictUpdate;

          return (
            <VerdictDisplay
              key={doc.id}
              timestamp={doc.timestamp}
              entityReviewed={'Milestone'}
              posterName={ship?.name || ''}
              reason={doc.reason}
              hasApproved={false}
            />
          );
        }
        if (item.tag === 'grant/milestone/accepted') {
          const doc = item as VerdictUpdate;

          const milestoneNumber = doc.id.split(':')[0];

          return (
            <VerdictDisplay
              key={doc.id}
              timestamp={doc.timestamp}
              entityReviewed={`Milestone ${Number(milestoneNumber) + 1}`}
              posterName={ship?.name || ''}
              reason={doc.reason}
              hasApproved={true}
            />
          );
        }
        if (item.tag === 'grant/distributed') {
          const doc = item as GrantUpdate;

          const amount = doc.id.split(':')[0];
          return (
            <FundsDistributed
              key={item.id}
              amount={amount}
              timestamp={item.timestamp}
            />
          );
        }
      })}
    </Box>
  );
};
