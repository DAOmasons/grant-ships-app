import React, { useEffect, useState } from 'react';
import { PageDrawer } from '../PageDrawer';
import {
  Box,
  Button,
  Group,
  NumberInput,
  Stack,
  Text,
  TextInput,
  Textarea,
  useMantineTheme,
} from '@mantine/core';
import { useGrant } from '../../hooks/useGrant';
import { PlayerAvatar } from '../PlayerAvatar';
import { Player } from '../../types/ui';
import { TxButton } from '../TxButton';
import {
  IconPencil,
  IconPennant,
  IconPlus,
  IconTrash,
} from '@tabler/icons-react';
import { DatePickerInput } from '@mantine/dates';
import { notifications } from '@mantine/notifications';
import { pinJSONToIPFS } from '../../utils/ipfs/pin';
import { AlloStatus, GameStatus } from '../../types/common';
import { useTx } from '../../hooks/useTx';
import GrantShipAbi from '../../abi/GrantShip.json';
import { Address, formatEther } from 'viem';
import { ResolvedMilestone } from '../../queries/getGrant';

export const MilestonesDrawer = ({
  opened,
  onClose,
}: {
  opened: boolean;
  onClose: () => void;
}) => {
  const { project, ship, refetchGrant, currentMilestoneSet } = useGrant();
  const theme = useMantineTheme();
  const [isLoading, setIsLoading] = useState(false);
  const { tx } = useTx();

  const [formData, setFormData] = useState<Record<string, string | number>>({
    'milestone-description-1': '',
    'milestone-perc-1': '0',
    'milestone-date-1': '',
  });
  const [inputSets, setInputSets] = useState([true]);

  useEffect(() => {
    if (!currentMilestoneSet?.resolvedMilestones) return;

    const existing = currentMilestoneSet?.resolvedMilestones.reduce(
      (
        acc: Record<string, string | number>,
        milestone: ResolvedMilestone,
        index
      ) => {
        return {
          ...acc,
          [`milestone-description-${index + 1}`]:
            milestone.milestoneContent.milestoneDetails,
          [`milestone-perc-${index + 1}`]: Math.round(
            Number(formatEther(milestone.percentage)) * 100
          ),
          [`milestone-date-${index + 1}`]:
            milestone.milestoneContent.date * 1000,
        };
      },
      {} as Record<string, string | number>
    );

    if (existing) {
      setFormData(existing);
      setInputSets(
        new Array(currentMilestoneSet.resolvedMilestones.length).fill(true)
      );
    }
  }, [currentMilestoneSet]);

  const handleChanges = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSetPerc = (value: number | string, id: string) => {
    setFormData((prevData) => ({ ...prevData, [id]: value }));
  };

  const handleDateChange = (dateObj: Date | null, key: string) => {
    if (!dateObj) return;

    setFormData({
      ...formData,
      [key]: Math.floor(dateObj.getTime()),
    });
  };

  const handleAddInput = async () => {
    setInputSets((prevState) => [...prevState, true]);
  };

  const handleRemoveInput = async (index: number) => {
    setInputSets((prevState) => prevState.filter((_, i) => i !== index));
    setFormData((prevState) => {
      const newState = { ...prevState };
      delete newState[`milestone-description-${index + 1}`];
      delete newState[`milestone-perc-${index + 1}`];
      delete newState[`milestone-date-${index + 1}`];
      return newState;
    });
  };

  console.log('formData', formData);

  const handlePostMilestones = async () => {
    setIsLoading(true);

    const percentTotal = inputSets.reduce((acc, _, index) => {
      const value = formData[`milestone-perc-${index + 1}`];
      return acc + Number(value);
    }, 0);

    if (percentTotal !== 100) {
      setIsLoading(false);
      notifications.show({
        title: 'Error',
        message: 'Milestone percentages must add up to 100',
        color: 'red',
      });
      return;
    }
    if (Object.values(formData).some((value) => value === '')) {
      setIsLoading(false);
      return notifications.show({
        title: 'Error',
        message: 'Please fill out all fields',
        color: 'red',
      });
    }

    const percentagesInOrder = inputSets
      .map((_, index) => formData[`milestone-perc-${index + 1}`])
      .filter(Boolean);

    const descriptionsInOrder = inputSets
      .map((_, index) => formData[`milestone-description-${index + 1}`])
      .filter(Boolean);

    const datesInOrder = inputSets
      .map((_, index) => formData[`milestone-date-${index + 1}`])
      .filter(Boolean);

    if (
      percentagesInOrder.length !== descriptionsInOrder.length ||
      descriptionsInOrder.length !== datesInOrder.length
    ) {
      setIsLoading(false);
      return notifications.show({
        title: 'Error',
        message: 'Data length mismatch: Please fill out all fields',
        color: 'red',
      });
    }

    const milestones = await Promise.all(
      inputSets.map(async (_, index) => {
        const milestoneDetails = formData[`milestone-description-${index + 1}`];
        const formPercentage = Number(formData[`milestone-perc-${index + 1}`]);
        const formDate = Number(formData[`milestone-date-${index + 1}`]) / 1000;

        const scaleFactor = BigInt(1e18);
        const formPercentageBigInt = BigInt(formPercentage * 1e16);

        const solidityPercentage = BigInt(
          formPercentageBigInt === 0n
            ? 0n
            : (formPercentageBigInt * scaleFactor) / BigInt(1e16 * 100)
        );

        const pinRes = await pinJSONToIPFS({
          milestoneDetails,
          date: formDate,
        });

        if (typeof pinRes.IpfsHash !== 'string' && pinRes.IpfsHash[0] !== 'Q') {
          notifications.show({
            title: 'IPFS Upload Error',
            message: pinRes.IpfsHash[1],
            color: 'red',
          });
          setIsLoading(false);
          return false;
        }

        return {
          amountPercentage: solidityPercentage,
          metadata: { protocol: 1n, pointer: pinRes.IpfsHash },
          milestoneStatus: AlloStatus.None,
        };
      })
    );

    const hasPinError = milestones.some((milestone) => milestone === false);

    if (hasPinError) {
      setIsLoading(false);
      notifications.show({
        title: 'Error',
        message: 'Failed to pin content to IPFS',
        color: 'red',
      });
      return;
    }

    if (!ship || !project) {
      setIsLoading(false);
      notifications.show({
        title: 'Error',
        message: 'Failed to get ship or project',
        color: 'red',
      });
      return;
    }
    setIsLoading(false);
    onClose();

    tx({
      writeContractParams: {
        abi: GrantShipAbi,
        address: ship.shipContractAddress as Address,
        functionName: 'setMilestones',
        args: [project.id, milestones, [1n, 'NULL']],
      },
      writeContractOptions: {
        onPollSuccess() {
          refetchGrant();
        },
      },
    });
  };

  const alreadyHasMilestones = !!currentMilestoneSet;

  return (
    <PageDrawer opened={opened} onClose={onClose}>
      <Group mt="40" mb="lg" w="100%" justify="space-between">
        <PlayerAvatar
          playerType={Player.Project}
          imgUrl={project?.metadata?.imgUrl}
          name={project?.name}
        />
        <TxButton
          leftSection={alreadyHasMilestones ? <IconPencil /> : <IconPennant />}
          onClick={handlePostMilestones}
          disabled={isLoading}
        >
          {alreadyHasMilestones ? 'Resubmit Milestones' : 'Submit Milestones'}
        </TxButton>
      </Group>
      {alreadyHasMilestones &&
        currentMilestoneSet.status !== GameStatus.Rejected && (
          <Text mb="md" size="sm" c={theme.colors.yellow[6]}>
            You have already submitted an application. Resubmitting an old
            application will overwrite the previous one.
          </Text>
        )}
      <Stack align="center" mb="md">
        {inputSets.map((_, index) => (
          <Box key={`milestone-${index}`} w="100%" mb="md">
            <Group justify="space-between" mb={index === 0 ? 4 : 'sm'}>
              <Text fw={600}>Milestone {index + 1}</Text>
              {index !== 0 && index === inputSets.length - 1 && (
                <Button
                  leftSection={<IconTrash size={16} />}
                  variant="subtle"
                  c={theme.colors.dark[2]}
                  onClick={() => handleRemoveInput(index)}
                  size="xs"
                >
                  Remove
                </Button>
              )}
            </Group>
            {index === 0 && (
              <Text fz="xs" mb="sm" opacity={0.8}>
                At least one milestone is required. For each milestone, you need
                to provide a deadline and specify the percentage of the grant
                allocated to that milestone.
              </Text>
            )}
            <Group>
              <NumberInput
                required
                fw={400}
                label={`Percentage`}
                name={`milestone-perc-${index + 1}`}
                placeholder="30"
                suffix="%"
                w={'48%'}
                min={0}
                max={100}
                allowDecimal={false}
                allowNegative={false}
                value={formData[`milestone-perc-${index + 1}`]}
                onChange={(value) =>
                  handleSetPerc(value, `milestone-perc-${index + 1}`)
                }
                mb="xs"
              />

              <DatePickerInput
                required
                fw={400}
                label={`Estimated Delivery`}
                name={`milestone-date-${index + 1}`}
                placeholder="Date"
                value={
                  formData[`milestone-date-${index + 1}`]
                    ? new Date(formData[`milestone-date-${index + 1}`])
                    : undefined
                }
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
          variant="secondary"
          onClick={handleAddInput}
        >
          Add Milestone
        </Button>
      </Stack>
    </PageDrawer>
  );
};
