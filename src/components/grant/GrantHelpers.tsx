import {
  IconFileDescription,
  IconMessage,
  IconPennant,
  IconRoute,
  IconShieldHalf,
} from '@tabler/icons-react';
import { useGrant } from '../../hooks/useGrant';
import { GrantStatus } from '../../types/common';
import { NextStep } from './NextStep';
import { Text } from '@mantine/core';
import { Bold } from '../Typography';
import { GrantComplete } from './GrantComplete';
import { useUserData } from '../../hooks/useUserState';

export const ProjectGrantHelpers = () => {
  const { grant } = useGrant();

  const { status, hasPendingMilestones, hasRejectedMilestones } = grant || {};

  if (status === GrantStatus.None) {
    return (
      <NextStep
        icon={<IconFileDescription size={20} />}
        text={
          <Text fz="sm">
            <Bold>Next Step: </Bold> send a <Bold>Message</Bold> to the Ship{' '}
            Operator or submit an <Bold>Application</Bold>
          </Text>
        }
      />
    );
  }

  if (status === GrantStatus.ProjectInitiated) {
    return (
      <NextStep
        icon={<IconFileDescription size={20} />}
        text={
          <Text fz="sm">
            <Bold>Next Step: </Bold> wait for a response from the Operator or{' '}
            submit an <Bold>application</Bold>
          </Text>
        }
      />
    );
  }
  if (status === GrantStatus.ShipInitiated) {
    return (
      <NextStep
        icon={<IconFileDescription size={20} />}
        text={
          <Text fz="sm">
            <Bold>Next Step: </Bold> Submit an <Bold>application</Bold>
          </Text>
        }
      />
    );
  }
  if (status === GrantStatus.ApplicationSubmitted) {
    return (
      <NextStep
        icon={<IconFileDescription size={20} />}
        text={
          <Text fz="sm">
            <Bold>In Review: </Bold> Ship Operators are reviewing your{' '}
            <Bold>application</Bold>
          </Text>
        }
      />
    );
  }
  if (status === GrantStatus.ApplicationRejected) {
    return (
      <NextStep
        icon={<IconFileDescription size={20} />}
        text={
          <Text fz="sm">
            <Bold>Next Step: </Bold> Review the feedback and resubmit your{' '}
            <Bold>application</Bold>
          </Text>
        }
      />
    );
  }
  if (status === GrantStatus.ApplicationApproved) {
    return (
      <NextStep
        icon={<IconRoute size={20} />}
        text={
          <Text fz="sm">
            <Bold>Next Step: </Bold> Prepare and submit your{' '}
            <Bold>Milestones</Bold>
          </Text>
        }
      />
    );
  }
  if (status === GrantStatus.MilestonesSubmitted) {
    return (
      <NextStep
        icon={<IconRoute size={20} />}
        text={
          <Text fz="sm">
            <Bold>In Review: </Bold> Ship Operators are reviewing your{' '}
            <Bold>Milestones</Bold>
          </Text>
        }
      />
    );
  }
  if (status === GrantStatus.MilestonesRejected) {
    return (
      <NextStep
        icon={<IconRoute size={20} />}
        text={
          <Text fz="sm">
            <Bold>Next Step: </Bold> Review feedback and resubmit your{' '}
            <Bold>Milestones</Bold>
          </Text>
        }
      />
    );
  }
  if (status === GrantStatus.MilestonesApproved) {
    return (
      <NextStep
        icon={<IconShieldHalf size={20} />}
        text={
          <Text fz="sm">
            <Bold>In Review: </Bold> Facilitators are reviewing your application{' '}
          </Text>
        }
      />
    );
  }
  if (status === GrantStatus.FacilitatorRejected) {
    return (
      <NextStep
        icon={<IconShieldHalf size={20} />}
        text={
          <Text fz="sm">
            <Bold>Next Step: </Bold> Incorporate the feedback and resubmit your{' '}
            <Bold>Application</Bold>{' '}
          </Text>
        }
      />
    );
  }
  if (status === GrantStatus.Allocated) {
    if (hasRejectedMilestones) {
      return (
        <NextStep
          icon={<IconPennant size={20} />}
          text={
            <Text fz="sm">
              <Bold>Next Step: </Bold> Incorporate the feedback and resubmit{' '}
              your <Bold>Milestone</Bold>{' '}
            </Text>
          }
        />
      );
    }
    if (hasPendingMilestones) {
      return (
        <NextStep
          icon={<IconPennant size={20} />}
          text={
            <Text fz="sm">
              <Bold>In Review: </Bold> Ship Operators are reviewing your{' '}
              <Bold>Milestone</Bold>{' '}
            </Text>
          }
        />
      );
    }
    return (
      <NextStep
        icon={<IconPennant size={20} />}
        text={
          <Text fz="sm">
            <Bold>Next Step: </Bold> Begin work and submit a{' '}
            <Bold>Milestone</Bold> once the work is complete
          </Text>
        }
      />
    );
  }
  if (
    status === GrantStatus.AllMilestonesComplete ||
    status === GrantStatus.Completed
  ) {
    return <GrantComplete />;
  }
};

export const ShipGrantHelpers = () => {
  const { grant } = useGrant();

  const { status, hasPendingMilestones } = grant || {};

  if (status === GrantStatus.None) {
    return (
      <NextStep
        icon={<IconMessage size={20} />}
        text={
          <Text fz="sm">
            <Bold>Next Step: </Bold> send a <Bold>message</Bold> to let the
            project know you are interested
          </Text>
        }
      />
    );
  }

  if (status === GrantStatus.ProjectInitiated) {
    return (
      <NextStep
        icon={<IconMessage size={20} />}
        text={
          <Text fz="sm">
            <Bold>Next Step: </Bold> respond to the Grantee's{' '}
            <Bold>message</Bold> and help them submit their application
          </Text>
        }
      />
    );
  }
  //   if (status === GrantStatus.ShipInitiated) {
  //     return null;
  //   }
  if (status === GrantStatus.ApplicationSubmitted) {
    return (
      <NextStep
        icon={<IconFileDescription size={20} />}
        text={
          <Text fz="sm">
            <Bold>Next Step: </Bold> Review the <Bold>Application</Bold> and
            provide feedback
          </Text>
        }
      />
    );
  }
  //   if (status === GrantStatus.ApplicationRejected) {
  //     return null;
  //   }
  //   if (status === GrantStatus.ApplicationApproved) {
  //     return null;
  //   }
  if (status === GrantStatus.MilestonesSubmitted) {
    return (
      <NextStep
        icon={<IconRoute size={20} />}
        text={
          <Text fz="sm">
            <Bold>Next Step: </Bold> Review the <Bold>Milestones</Bold> and
            provide feedback
          </Text>
        }
      />
    );
  }
  //   if (status === GrantStatus.MilestonesRejected) {
  //     return null;
  //   }
  if (status === GrantStatus.MilestonesApproved) {
    return (
      <NextStep
        icon={<IconShieldHalf size={20} />}
        text={
          <Text fz="sm">
            <Bold>In Review: </Bold> Facilitators are reviewing this{' '}
            <Bold>application</Bold>.
          </Text>
        }
      />
    );
  }
  //   if (status === GrantStatus.FacilitatorRejected) {
  //     return null;
  //   }
  if (status === GrantStatus.Allocated) {
    if (hasPendingMilestones) {
      return (
        <NextStep
          icon={<IconPennant size={20} />}
          text={
            <Text fz="sm">
              <Bold>Next Step: </Bold> Review the submitted{' '}
              <Bold>Milestone(s)</Bold> and provide feedback
            </Text>
          }
        />
      );
    }
    // return null;
  }
  if (
    status === GrantStatus.AllMilestonesComplete ||
    status === GrantStatus.Completed
  ) {
    return <GrantComplete />;
  }
};

export const FacilitatorGrantHelpers = () => {
  const { grant } = useGrant();

  const { status } = grant || {};
  if (status === GrantStatus.MilestonesApproved) {
    return (
      <NextStep
        icon={<IconShieldHalf size={20} />}
        text={
          <Text fz="sm">
            <Bold>Next Step: </Bold> review this grant and ensure that it
            adheres to the domain standards
          </Text>
        }
      />
    );
  }
  if (
    status === GrantStatus.AllMilestonesComplete ||
    status === GrantStatus.Completed
  ) {
    return <GrantComplete />;
  }
};

export const GrantHelper = () => {
  const { userData } = useUserData();
  const { isFacilitator } = userData || {};
  const { isProjectMember, isShipOperator } = useGrant();

  if (isFacilitator) {
    return <FacilitatorGrantHelpers />;
  }

  if (isShipOperator) {
    return <ShipGrantHelpers />;
  }

  if (isProjectMember) {
    return <ProjectGrantHelpers />;
  }

  return null;
};
