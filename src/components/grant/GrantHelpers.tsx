import { useGrant } from '../../hooks/useGrant';
import { GrantStatus } from '../../types/common';

export const ProjectGrantHelpers = () => {
  const { grant } = useGrant();

  const { status, hasPendingMilestones, hasRejectedMilestones } = grant || {};

  if (status === GrantStatus.ProjectInitiated) {
    return 'Submit Application';
  }
  if (status === GrantStatus.ShipInitiated) {
    return 'You have been invited to submit an application';
  }
  if (status === GrantStatus.ApplicationSubmitted) {
    return 'Application Submitted. Please wait for Ship operators to review your application.';
  }
  if (status === GrantStatus.ApplicationRejected) {
    return 'Your application has not been approved. Please review the feedback and resubmit.';
  }
  if (status === GrantStatus.ApplicationApproved) {
    return 'Application Approved. Please submit milestones.';
  }
  if (status === GrantStatus.MilestonesSubmitted) {
    return 'Milestones Submitted. Please wait for Ship operators to review your milestones.';
  }
  if (status === GrantStatus.MilestonesRejected) {
    return 'Milestones Rejected. Please review the feedback and resubmit.';
  }
  if (status === GrantStatus.MilestonesApproved) {
    return 'Milestones Approved. Please wait for facilitator to review.';
  }
  if (status === GrantStatus.FacilitatorRejected) {
    return 'Facilitator Rejected. Please review the feedback and resubmit.';
  }
  if (status === GrantStatus.Allocated) {
    if (hasRejectedMilestones) {
      return 'One or more milestones were not approved. Please review the feedback and resubmit.';
    }
    if (hasPendingMilestones) {
      return 'You have pending milestones. Ship operators are reviewing your work.';
    }
    return 'Allocated. Please start working on your project. Submit your milestones once completed.';
  }
  if (status === GrantStatus.AllMilestonesComplete) {
    return 'All milestones complete. Press the complete button to finish the grant.';
  }
  if (status === GrantStatus.Completed) {
    return 'Grant completed. Thank you for your hard work!';
  }
};

export const ShipGrantHelpers = () => {
  const { grant } = useGrant();

  const { status, hasPendingMilestones } = grant || {};

  if (status === GrantStatus.ProjectInitiated) {
    return 'Project lead has started negotiating a grant. Please respond and wait for an application.';
  }
  if (status === GrantStatus.ShipInitiated) {
    return 'You have initiated a grant. Please wait for the project lead to submit an application.';
  }
  if (status === GrantStatus.ApplicationSubmitted) {
    return 'Application Submitted. Please review the application and leave helpful feedback.';
  }
  if (status === GrantStatus.ApplicationRejected) {
    return null;
  }
  if (status === GrantStatus.ApplicationApproved) {
    return null;
  }
  if (status === GrantStatus.MilestonesSubmitted) {
    return 'Milestones Submitted. Please review the milestones and leave helpful feedback.';
  }
  if (status === GrantStatus.MilestonesRejected) {
    return null;
  }
  if (status === GrantStatus.MilestonesApproved) {
    return 'Milestones Approved. Waiting for Facilitator to finalize the grant.';
  }
  if (status === GrantStatus.FacilitatorRejected) {
    return null;
  }
  if (status === GrantStatus.Allocated) {
    if (hasPendingMilestones) {
      return 'This grant has Pending milestones. Please review the work and approve.';
    }
    return null;
  }
  if (status === GrantStatus.AllMilestonesComplete) {
    return 'All milestones complete. Press the complete button to finish the grant.';
  }
  if (status === GrantStatus.Completed) {
    return 'Grant completed. Thank you for your hard work!';
  }
};

export const FacilitatorGrantHelpers = () => {
  const { grant } = useGrant();

  const { status } = grant || {};
  if (status === GrantStatus.MilestonesApproved) {
    return 'Milestones Approved. Please review the grant, perform any necessary KYC checks, and finalize the allocation.';
  }
};
