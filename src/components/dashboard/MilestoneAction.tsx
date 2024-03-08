import { DashGrant } from '../../resolvers/grantResolvers';
import { AlloStatus, GrantStatus } from '../../types/common';
import { UnpackedMilestoneData } from './MilestoneReviewPage';
import { ReviewMilestone } from './ReviewMilestone';
import { SubmitMilestone } from './SubmitMilestone';

export const MilestoneAction = ({
  close,
  milestone,
  view,
  isShipOperator,
  grant,
  isProjectMember,
  currentMilestone,
}: {
  close: () => void;
  isProjectMember?: boolean;
  isShipOperator?: boolean;
  currentMilestone: number;
  view: 'project-page' | 'ship-dash';
  grant: DashGrant;
  milestone: UnpackedMilestoneData;
}) => {
  const canSubmitMilestone =
    isProjectMember &&
    view === 'project-page' &&
    grant.grantStatus >= GrantStatus.MilestonesApproved &&
    milestone.milestoneStatus === AlloStatus.None;

  const canReviewMilestone =
    isShipOperator &&
    view === 'ship-dash' &&
    grant.grantStatus >= GrantStatus.MilestonesApproved &&
    milestone.milestoneStatus === AlloStatus.Pending;

  const canResubmitMilestone =
    isProjectMember &&
    view === 'project-page' &&
    grant.grantStatus >= GrantStatus.MilestonesApproved &&
    milestone.milestoneStatus === AlloStatus.Rejected;

  if (canSubmitMilestone) {
    return (
      <SubmitMilestone
        grant={grant}
        milestone={milestone}
        currentMilestone={currentMilestone}
        isProjectMember={isProjectMember}
        close={close}
      />
    );
  }

  if (canResubmitMilestone) {
    return (
      <SubmitMilestone
        grant={grant}
        isResubmitting
        milestone={milestone}
        currentMilestone={currentMilestone}
        isProjectMember={isProjectMember}
        close={close}
      />
    );
  }

  if (canReviewMilestone) {
    return (
      <ReviewMilestone
        grant={grant}
        currentMilestone={currentMilestone}
        isShipOperator={isShipOperator}
        close={close}
      />
    );
  }

  return null;
};
