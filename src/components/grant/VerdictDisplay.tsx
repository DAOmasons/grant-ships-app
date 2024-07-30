import { InsetUpdate } from './InsetUpdate';
import { IconCircleCheck, IconExclamationCircle } from '@tabler/icons-react';
import { Text, useMantineTheme } from '@mantine/core';
import { useGrant } from '../../hooks/useGrant';
import { GameStatus } from '../../types/common';
import { NextStep } from './NextStep';
import { Bold } from '../Typography';

export const VerdictDisplay = ({
  hasApproved,
  posterName,
  timestamp,
  reason,
  entityReviewed,
}: {
  entityReviewed: string;
  reason: string;
  timestamp: number;
  hasApproved: boolean;
  posterName: string;
}) => {
  const { grant, isProjectMember } = useGrant();
  const theme = useMantineTheme();
  const tagLine = hasApproved
    ? ` has approved this ${entityReviewed}`
    : ` has rejected this ${entityReviewed}`;

  const currentDraftIsRejected =
    isProjectMember &&
    grant?.currentApplication?.status === GameStatus.Rejected;
  const currentDraftIsApproved =
    isProjectMember &&
    grant?.currentApplication?.status === GameStatus.Accepted &&
    grant.currentMilestones == null;

  return (
    <>
      {currentDraftIsApproved && (
        <NextStep
          text={
            <Text fz="sm">
              <Bold>Next step:</Bold> submit <Bold>Milestones</Bold> for review
            </Text>
          }
        />
      )}
      {currentDraftIsRejected && (
        <NextStep
          text={
            <Text fz="sm">
              <Bold>Next step:</Bold> Incorporate feedback and resubmit your
              <Bold> Application</Bold>
            </Text>
          }
        />
      )}
      <InsetUpdate
        bodyUI={<Text fz="sm">{reason}</Text>}
        timestamp={timestamp}
        posterName={posterName}
        tagline={tagLine}
        symbolUI={
          hasApproved ? (
            <IconCircleCheck size={20} color={theme.colors.green[6]} />
          ) : (
            <IconExclamationCircle size={20} color={theme.colors.red[6]} />
          )
        }
      />
    </>
  );
};
