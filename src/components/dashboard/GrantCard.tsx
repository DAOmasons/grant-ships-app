import {
  Avatar,
  Box,
  Flex,
  Group,
  Paper,
  Text,
  Timeline,
  useMantineTheme,
} from '@mantine/core';
import { DashGrant } from '../../resolvers/grantResolvers';
import { GrantStatus } from '../../types/common';
import { secondsToRelativeTime } from '../../utils/time';
import { getTimelineContents } from './grantCardUtils';
import { ReviewApplication } from './ReviewApplication';
import { IconCheck, IconClock } from '@tabler/icons-react';
import { useUserData } from '../../hooks/useUserState';
import { MilestonesSubmit } from './MilestonesSubmit';
import { MilestonesReview } from './MilestonesReview';
import { MilestonesView } from './MilestonesView';
import { useMemo } from 'react';

export const GrantCard = ({
  grant,
  view,
}: {
  grant: DashGrant;
  view: 'project-page' | 'ship-dash';
}) => {
  const { userData } = useUserData();
  const theme = useMantineTheme();

  const currentStage = grant.grantStatus;
  const shipAddress = grant.shipId.id;

  const isShipDash = view === 'ship-dash';
  const isProjectPage = view === 'project-page';

  const isShipOperator =
    userData && userData.isShipOperator && userData.shipAddress === shipAddress;

  const isProjectMember = useMemo(() => {
    return (
      userData &&
      !!userData.projects?.find(
        (project) => project.anchor === grant.projectId.id
      )
    );
  }, [userData, grant.projectId.id]);

  return (
    <Paper bg={theme.colors.dark[6]} mih={220} w="100%" p="lg">
      <Flex>
        <Box w="100%">
          {isShipDash && (
            <Group wrap="nowrap" mr="sm">
              <Avatar size={66} src={grant?.projectMetadata?.imgUrl} />
              <Box>
                <Text fw={600} lineClamp={1}>
                  {grant.projectId.name}
                </Text>
                <Text fz="sm">
                  Last Updated {secondsToRelativeTime(grant.lastUpdated)}
                </Text>
              </Box>
            </Group>
          )}
          {isProjectPage && (
            <Group wrap="nowrap" mr="sm">
              <Avatar size={44} src={grant?.shipMetadata?.imgUrl} />
              <Box>
                <Text fw={600} lineClamp={1}>
                  {grant.shipId.name}
                </Text>
                <Text fz="sm">
                  Last Updated {secondsToRelativeTime(grant.lastUpdated)}
                </Text>
              </Box>
            </Group>
          )}
        </Box>
        <Box w="100%">
          <Timeline bulletSize={20} lineWidth={2} active={4}>
            <Timeline.Item
              h={12}
              w="100%"
              {...(getTimelineContents(
                currentStage,
                GrantStatus.Applied,
                GrantStatus.ShipRejected,
                GrantStatus.ShipApproved,
                1,
                theme,
                {
                  onNotStarted: <Text fz="sm">Application Not Submitted </Text>,
                  onPending: (
                    <ReviewApplication
                      view={view}
                      grant={grant}
                      shipAddress={shipAddress}
                      isShipOperator={isShipOperator}
                    />
                  ),
                  onRejected: (
                    <ReviewApplication
                      view={view}
                      grant={grant}
                      shipAddress={shipAddress}
                      isShipOperator={isShipOperator}
                    />
                  ),
                  onCompleted: (
                    <ReviewApplication
                      view={view}
                      grant={grant}
                      shipAddress={shipAddress}
                      isShipOperator={isShipOperator}
                    />
                  ),
                }
              ) || {})}
            />
            <Timeline.Item
              h={12}
              w="100%"
              {...(getTimelineContents(
                currentStage,
                GrantStatus.ShipApproved,
                GrantStatus.FacilitatorRejected,
                GrantStatus.FacilitatorApproved,
                2,
                theme,
                {
                  onNotStarted: <Text fz="sm">Facilitator Review</Text>,
                  onPending: (
                    <Group justify="space-between" mr="sm">
                      <Text fz="sm">Awaiting Facilitator Review</Text>
                      <IconClock size={16} />
                    </Group>
                  ),
                  onRejected: <Text fz="sm">Facilitator Rejected</Text>,
                  onCompleted: <Text fz="sm">Facilitator Approved</Text>,
                }
              ) || {})}
            />
            <Timeline.Item
              h={12}
              w="100%"
              {...(getTimelineContents(
                currentStage,
                GrantStatus.MilestonesProposed,
                GrantStatus.MilestonesRejected,
                GrantStatus.MilestonesApproved,
                3,
                theme,
                {
                  onNotStarted: (
                    <MilestonesSubmit
                      view={view}
                      grant={grant}
                      isProjectMember={isProjectMember}
                      isShipOperator={isShipOperator}
                    />
                  ),
                  onPending: <MilestonesReview grant={grant} view={view} />,
                  onRejected: <MilestonesReview grant={grant} view={view} />,
                  onCompleted: (
                    <MilestonesView
                      grant={grant}
                      view={view}
                      isShipOperator={isShipOperator}
                      isProjectMember={isProjectMember}
                    />
                  ),
                }
              ) || {})}
            />
            <Timeline.Item
              h={12}
              w="100%"
              {...(getTimelineContents(
                currentStage,
                GrantStatus.MilestoneSubmitted,
                GrantStatus.MilestoneRejected,
                GrantStatus.Completed,
                4,
                theme,
                {
                  onNotStarted: <MilestoneSubmission grant={grant} />,
                  onPending: <MilestoneSubmission grant={grant} />,
                  onRejected: <MilestoneSubmission grant={grant} />,
                  onCompleted: <MilestoneSubmission grant={grant} />,
                }
              ) || {})}
            />
            <Timeline.Item
              h={12}
              w="100%"
              bullet={
                currentStage === GrantStatus.Completed ? (
                  <IconCheck />
                ) : (
                  <Text fz="xs" opacity={0.75}>
                    5
                  </Text>
                )
              }
              color={
                currentStage === GrantStatus.Completed
                  ? theme.colors.blue[6]
                  : theme.colors.dark[5]
              }
            >
              <Text fz="sm">Grant Complete</Text>
            </Timeline.Item>
          </Timeline>
        </Box>
      </Flex>
    </Paper>
  );
};

const MilestoneSubmission = ({ grant }: { grant: DashGrant }) => {
  if (
    !grant.milestones ||
    grant.milestones.length === 0 ||
    !grant.currentMilestoneIndex
  ) {
    return <Text fz="sm">Manage Milestones</Text>;
  }

  if (grant.grantStatus === GrantStatus.MilestonesApproved) {
    return (
      <Text fz="sm">
        Awaiting Milestone ({Number(grant.currentMilestoneIndex) + 1}/
        {grant.milestones?.length})
      </Text>
    );
  }

  if (grant.grantStatus === GrantStatus.MilestoneSubmitted) {
    return (
      <Text fz="sm">
        Milestone ({Number(grant.currentMilestoneIndex) + 1}/
        {grant.milestones?.length}) Submitted
      </Text>
    );
  }

  if (grant.grantStatus === GrantStatus.MilestoneRejected) {
    return (
      <Text fz="sm">
        Milestone ({Number(grant.currentMilestoneIndex) + 1}/
        {grant.milestones?.length}) Rejected
      </Text>
    );
  }

  if (grant.grantStatus === GrantStatus.MilestoneApproved) {
    return (
      <Text fz="sm">
        Milestone ({Number(grant.currentMilestoneIndex) + 1}/
        {grant.milestones?.length}) Approved
      </Text>
    );
  }

  return (
    <Text fz="sm">
      Milestone ({Number(grant.currentMilestoneIndex) + 1}/
      {grant.milestones?.length})
    </Text>
  );
};
