import {
  Avatar,
  Box,
  Button,
  Flex,
  Group,
  MantineTheme,
  Paper,
  Stack,
  Tabs,
  Text,
  Timeline,
  useMantineTheme,
} from '@mantine/core';
import { MainSection, PageTitle } from '../layout/Sections';
import { IconCheck, IconEye, IconX } from '@tabler/icons-react';

export const ShipOpDashboard = () => {
  return (
    <MainSection>
      <PageTitle title="Ship Dashboard" />
      <Tabs defaultValue="grants">
        <Tabs.List mb="xl" grow>
          <Tabs.Tab value="grants">Grants</Tabs.Tab>
          <Tabs.Tab value="application">Ship Application</Tabs.Tab>
          <Tabs.Tab value="postUpdate">Post</Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel value="grants">
          <GrantManager />
        </Tabs.Panel>
        <Tabs.Panel value="application"> </Tabs.Panel>
        <Tabs.Panel value="postUpdate"> </Tabs.Panel>
      </Tabs>
    </MainSection>
  );
};

const getTimelineContents = (
  currentStage: GrantStatus,
  isPendingAt: GrantStatus,
  isRejected: GrantStatus,
  isCompletedAt: GrantStatus,
  uiStage: number,
  theme: MantineTheme,
  content: {
    onNotStarted?: React.ReactNode;
    onPending?: React.ReactNode;
    onRejected?: React.ReactNode;
    onCompleted?: React.ReactNode;
  }
) => {
  if (currentStage < isPendingAt) {
    return {
      bullet: (
        <Text fz="xs" opacity={0.7}>
          {uiStage}
        </Text>
      ),
      color: theme.colors.dark[5],
      children: content.onNotStarted,
    };
  }
  if (currentStage === isPendingAt) {
    return {
      bullet: <IconEye />,
      color: theme.colors.violet[6],
      children: content.onPending,
    };
  }
  if (currentStage === isRejected) {
    return {
      bullet: <IconX />,
      color: theme.colors.pink[6],
      children: content.onRejected,
    };
  }
  if (currentStage >= isCompletedAt) {
    return {
      bullet: <IconCheck />,
      color: theme.colors.blue[6],
      children: content.onCompleted,
    };
  }
};

enum GrantStatus {
  None,
  Applied,
  ShipRejected,
  ShipApproved,
  FacilitatorRejected,
  FacilitatorApproved,
  MilestonesProposed,
  MilestonesRejected,
  MilestonesApproved,
  MilestoneSubmitted,
  MilestoneRejected,
  MilestoneApproved,
  Completed,
}

export const GrantManager = () => {
  const currentStage = 6;
  return (
    <Stack gap={'lg'}>
      <GrantCard currentStage={currentStage} />
      <GrantCard currentStage={currentStage} />
      <GrantCard currentStage={currentStage} />
      <GrantCard currentStage={currentStage} />
      <GrantCard currentStage={currentStage} />
      <GrantCard currentStage={currentStage} />
      <GrantCard currentStage={currentStage} />
    </Stack>
  );
};

const GrantCard = ({ currentStage }: { currentStage: GrantStatus }) => {
  const theme = useMantineTheme();
  return (
    <Paper bg={theme.colors.dark[6]} mih={220} w="100%" p="lg">
      <Flex>
        <Box w="100%">
          <Group>
            <Avatar size={66} />
            <Box>
              <Text fw={600}>Project Name</Text>
              <Text fz="sm">Last Updated 3 days ago</Text>
            </Box>
          </Group>
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
                  onNotStarted: (
                    <Group align="start" justify="space-between">
                      <Text fz="sm">Application </Text>
                      <Button
                        size="xs"
                        variant="subtle"
                        style={{
                          transform: 'translateY(-2px)',
                        }}
                      >
                        View
                      </Button>
                    </Group>
                  ),

                  onPending: <Text fz="sm">Application Submitted</Text>,
                  onRejected: <Text fz="sm">Application Rejected</Text>,
                  onCompleted: <Text fz="sm">Application Approved</Text>,
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
                  onNotStarted: (
                    <Group align="start" justify="space-between">
                      <Text fz="sm">Application </Text>
                      <Button
                        size="xs"
                        // variant="subtle"
                        style={{
                          transform: 'translateY(-4px)',
                        }}
                      >
                        View
                      </Button>
                    </Group>
                  ),
                  onPending: <Text fz="sm">Awaiting Facilitator Review</Text>,
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
                  onNotStarted: <Text fz="sm">Milestones Planning</Text>,
                  onPending: <Text fz="sm">Milestones Pending</Text>,
                  onRejected: <Text fz="sm">Milestones Rejected</Text>,
                  onCompleted: <Text fz="sm">Milestones Approved</Text>,
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
                GrantStatus.MilestoneApproved,
                4,
                theme,
                {
                  onNotStarted: <Text fz="sm">Milestone Process</Text>,
                  onPending: <Text fz="sm">Milestone Pending</Text>,
                  onRejected: <Text fz="sm">Milestone Rejected</Text>,
                  onCompleted: <Text fz="sm">Milestone Approved</Text>,
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
