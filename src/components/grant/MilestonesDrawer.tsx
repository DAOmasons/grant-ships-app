import React, { useState } from 'react';
import { PageDrawer } from '../PageDrawer';
import {
  Box,
  Button,
  Group,
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
import { IconFileDescription, IconPlus, IconTrash } from '@tabler/icons-react';
import { DatePickerInput } from '@mantine/dates';

export const MilestonesDrawer = ({
  opened,
  onClose,
}: {
  opened: boolean;
  onClose: () => void;
}) => {
  const { project } = useGrant();
  const theme = useMantineTheme();
  const [isPinning, setIsPinning] = useState(false);

  const handlePostMilestones = () => {};
  const [formData, setFormData] = useState<Record<string, string>>({
    'milestone-description-1': '',
    'milestone-perc-1': '0',
  });
  const [inputSets, setInputSets] = useState([true]);

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

  //   const percentagesInOrder = inputSets
  //     .map((_, index) => formData[`milestone-perc-${index + 1}`])
  //     .filter(Boolean);

  //   const descriptionsInOrder = inputSets
  //     .map((_, index) => formData[`milestone-description-${index + 1}`])
  //     .filter(Boolean);

  //   const datesInOrder = inputSets
  //     .map((_, index) => formData[`milestone-date-${index + 1}`])
  //     .filter(Boolean);

  return (
    <PageDrawer opened={opened} onClose={onClose}>
      <Group mt="40" mb="lg" w="100%" justify="space-between">
        <PlayerAvatar
          playerType={Player.Project}
          imgUrl={project?.metadata?.imgUrl}
          name={project?.name}
        />
        <TxButton
          //   leftSection={< />}
          onClick={handlePostMilestones}
        >
          Submit Milestones
        </TxButton>
      </Group>
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
          variant="secondary"
          onClick={handleAddInput}
        >
          Add Milestone
        </Button>
      </Stack>
    </PageDrawer>
  );
};
