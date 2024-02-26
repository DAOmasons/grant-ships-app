import {
  Avatar,
  Box,
  Button,
  Flex,
  Group,
  Modal,
  Paper,
  Stack,
  Text,
  TextInput,
  Textarea,
  Timeline,
  useMantineTheme,
} from '@mantine/core';
import { DashGrant } from '../../resolvers/grantResolvers';
import { AlloStatus, GrantStatus } from '../../types/common';
import { secondsToRelativeTime } from '../../utils/time';
import { getTimelineContents } from './grantCardUtils';
import { ReviewApplication } from './ReviewApplication';
import { IconCheck, IconClock, IconPlus } from '@tabler/icons-react';
import { useMemo, useState } from 'react';
import { useDisclosure } from '@mantine/hooks';
import { ReviewPage } from '../../layout/ReviewPage';
import { useUserData } from '../../hooks/useUserState';
import { AppAlert } from '../UnderContruction';
import { notifications } from '@mantine/notifications';
import { pinJSONToIPFS } from '../../utils/ipfs/pin';
import { useTx } from '../../hooks/useTx';
import GrantShipAbi from '../../abi/GrantShip.json';
import { DatePickerInput } from '@mantine/dates';
import { set } from 'zod';

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
                    <MilestonesReview
                      view={view}
                      isProjectMember={true}
                      grant={grant}
                      isShipOperator={isShipOperator}
                    />
                  ),
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

const MilestonesReview = ({
  isProjectMember,
  isShipOperator,
  view,
  grant,
}: {
  grant: DashGrant;
  isProjectMember: boolean;
  isShipOperator?: boolean;
  view: 'project-page' | 'ship-dash';
}) => {
  const [opened, { open, close }] = useDisclosure(false);

  const currentStatus = grant.grantStatus;
  const milestoneReviewSections = useMemo(() => {
    if (!grant || !view) return [];

    if (
      isProjectMember &&
      view === 'project-page' &&
      currentStatus === GrantStatus.FacilitatorApproved
    ) {
      return [
        {
          subtitle: '',
          content: (
            <AppAlert
              title="Awaiting Milestones"
              description="Ship Operators are awaiting milestones for your grant"
            />
          ),
        },
        {
          subtitle: 'Create your Milestones',
          content: <MilestoneBuilder grant={grant} />,
        },
      ];
    }
    return [];
  }, [grant, view, isProjectMember, isShipOperator, currentStatus]);

  return (
    <>
      <Group justify="space-between" align="start">
        <Text size="sm">Awaiting Milestones</Text>
        {isProjectMember && view === 'project-page' ? (
          <Button
            size="xs"
            style={{
              transform: 'translateY(-2px)',
            }}
            onClick={open}
          >
            Submit
          </Button>
        ) : (
          <Button
            size="xs"
            style={{
              transform: 'translateY(-2px)',
            }}
            variant="subtle"
            onClick={open}
          >
            View
          </Button>
        )}
      </Group>
      <Modal
        opened={opened}
        onClose={close}
        fullScreen
        transitionProps={{ transition: 'fade', duration: 200 }}
      >
        <ReviewPage
          title={`Milestone Review for ${grant.projectId.name}`}
          sections={milestoneReviewSections}
        />
      </Modal>
    </>
  );
};

const MilestoneBuilder = ({ grant }: { grant: DashGrant }) => {
  const { tx } = useTx();

  const [formData, setFormData] = useState<Record<string, string>>({
    'milestone-description-1': '',
    'milestone-perc-1': '0',
  });
  const [inputs, setInputs] = useState([true]);

  const handleChanges = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleDateChange = (dateObj: Date | null, key: string) => {
    if (!dateObj) return;

    setFormData({
      ...formData,
      [key]: Math.floor(dateObj.getTime() / 1000).toString(),
    });
  };

  const handleAddInput = async () => {
    setInputs([...inputs, true]);
  };

  const submitMilestones = async () => {
    const percentTotal = inputs.reduce((acc, _, index) => {
      const value = formData[`milestone-perc-${index + 1}`];
      return acc + Number(value);
    }, 0);

    if (percentTotal !== 100) {
      return notifications.show({
        title: 'Error',
        message: 'Milestone percentages must add up to 100',
        color: 'red',
      });
    }

    console.log('formData', formData);

    if (Object.values(formData).some((value) => value === '')) {
      return notifications.show({
        title: 'Error',
        message: 'Please fill out all fields',
        color: 'red',
      });
    }

    const percentagesInOrder = inputs
      .map((_, index) => formData[`milestone-perc-${index + 1}`])
      .filter(Boolean);

    const descriptionsInOrder = inputs
      .map((_, index) => formData[`milestone-description-${index + 1}`])
      .filter(Boolean);

    const datesInOrder = inputs
      .map((_, index) => formData[`milestone-date-${index + 1}`])
      .filter(Boolean);

    if (
      percentagesInOrder.length !== descriptionsInOrder.length ||
      descriptionsInOrder.length !== datesInOrder.length
    ) {
      return notifications.show({
        title: 'Error',
        message: 'Data length mismatch: Please fill out all fields',
        color: 'red',
      });
    }

    const milestones = await Promise.all(
      inputs.map(async (_, index) => {
        const milestoneDetails = formData[`milestone-description-${index + 1}`];
        const formPercentage = Number(formData[`milestone-perc-${index + 1}`]);

        if (formPercentage === 0) {
          notifications.show({
            title: 'Error',
            message: 'Milestone percentage cannot be 0',
            color: 'red',
          });
          return false;
        }

        const solidityPercentage = BigInt(
          formPercentage === 0 ? 0 : (formPercentage / 100) * 1e18
        );

        const pinRes = await pinJSONToIPFS({ milestoneDetails });

        if (typeof pinRes.IpfsHash !== 'string' && pinRes.IpfsHash[0] !== 'Q') {
          notifications.show({
            title: 'IPFS Upload Error',
            message: pinRes.IpfsHash[1],
            color: 'red',
          });

          return false;
        }

        return {
          amountPercentage: solidityPercentage,
          metadata: { protocol: 1n, pointer: pinRes.IpfsHash },
          milestoneStatus: AlloStatus.None,
        };
      })
    );

    console.log(milestones, 'milestones');

    const hasPinError = milestones.some((milestone) => milestone === false);

    if (hasPinError) {
      return;
    }

    // _setMilestones(address _recipientId, Milestone[] memory _milestones)

    tx({
      writeContractParams: {
        abi: GrantShipAbi,
        address: grant.shipId.shipContractAddress,
        functionName: 'setMilestones',
        args: [grant.projectId.id, milestones, [1n, 'NULL']],
      },
    });
  };
  console.log(formData, 'formData');
  return (
    <Box>
      <Text opacity={0.75} mb="xl">
        Let’s break down tasks into milestone(s). Minimum 1 Milestone required.
        Once each is done, submit to the ship operator for grant processing.
        Your detailed input is key!
      </Text>
      <Stack align="center" mb="md">
        {inputs.map((_, index) => (
          <Box key={`milestone-${index}`} w="100%" mb="md">
            <Text mb="sm" fw={600}>
              Milestone {index + 1}
            </Text>
            <Group>
              <TextInput
                required
                fw={400}
                label={`Percentage`}
                name={`milestone-perc-${index + 1}`}
                type="number"
                placeholder="33"
                w={'48%'}
                onChange={handleChanges}
                mb="xs"
              />
              <DatePickerInput
                required
                fw={400}
                label={`Estimated Delivery`}
                name={`milestone-date-${index + 1}`}
                placeholder="Date"
                w={'48%'}
                onChange={(date) =>
                  handleDateChange(date, `milestone-date-${index + 1}`)
                }
                mb="xs"
              />
            </Group>
            <Textarea
              name={`milestone-description-${index + 1}`}
              fw={400}
              label={`Description`}
              value={formData[`milestone-description-${index + 1}`]}
              w="100%"
              placeholder="Describe the task and the deliverable."
              onChange={handleChanges}
              autosize
              required
              minRows={4}
              maxRows={8}
            />
          </Box>
        ))}
        <Button
          leftSection={<IconPlus />}
          w="fit-content"
          variant="light"
          onClick={handleAddInput}
        >
          Add Milestone
        </Button>
      </Stack>
      <Flex w="100%">
        <Button ml="auto" onClick={submitMilestones}>
          Submit
        </Button>
      </Flex>
    </Box>
  );
};
