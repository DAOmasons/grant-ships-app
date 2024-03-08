import { useState } from 'react';
import { useTx } from '../../hooks/useTx';
import { DashGrant } from '../../resolvers/grantResolvers';
import { notifications } from '@mantine/notifications';
import { pinJSONToIPFS } from '../../utils/ipfs/pin';
import { AlloStatus } from '../../types/common';
import {
  Box,
  Button,
  Flex,
  Group,
  Stack,
  Text,
  TextInput,
  Textarea,
} from '@mantine/core';
import { DatePickerInput } from '@mantine/dates';
import { IconPlus } from '@tabler/icons-react';
import GrantShipAbi from '../../abi/GrantShip.json';
import { TxButton } from '../TxButton';
import { useQueryClient } from '@tanstack/react-query';

export const MilestoneBuilder = ({
  grant,
  close,
}: {
  grant: DashGrant;
  close: () => void;
}) => {
  const { tx } = useTx();
  const queryClient = useQueryClient();

  const [isPinning, setIsPinning] = useState(false);
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
    setIsPinning(true);
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
        const formDate = Number(formData[`milestone-date-${index + 1}`]);
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
      return;
    }

    setIsPinning(false);
    close();

    tx({
      writeContractParams: {
        abi: GrantShipAbi,
        address: grant.shipId.shipContractAddress,
        functionName: 'setMilestones',
        args: [grant.projectId.id, milestones, [1n, 'NULL']],
      },
      onComplete() {
        queryClient.invalidateQueries({
          queryKey: [`project-grants-${grant.projectId.id}`],
        });
      },
    });
  };

  return (
    <Box>
      <Text opacity={0.75} mb="xl">
        Let’s break down tasks into milestone(s). Minimum 1 Milestone required.
        Once each is done, submit to the ship operator for grant processing.
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
                placeholder="30"
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
        <TxButton ml="auto" onClick={submitMilestones} disabled={isPinning}>
          Submit
        </TxButton>
      </Flex>
    </Box>
  );
};
