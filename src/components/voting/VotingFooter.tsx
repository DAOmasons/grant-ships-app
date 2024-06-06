import { UseFormReturnType } from '@mantine/form';
import { VotingFormValues } from '../../pages/Vote';
import { Box, Button, Group, NumberInput, Text, Textarea } from '@mantine/core';
import { VotingWeightProgress } from './VotingWeightProgress';

export const VotingFooter = ({
  form,
  index,
  nextStep,
  prevStep,
  isVotingActive,
}: {
  index: number;
  form: UseFormReturnType<
    VotingFormValues,
    (values: VotingFormValues) => VotingFormValues
  >;
  nextStep: () => void;
  prevStep: () => void;
  isVotingActive: boolean;
}) => {
  const shipPercs = form.values.ships.map((s) => s.shipPerc);
  const totalPercLeft = Number(
    (100 - shipPercs.reduce((acc, perc) => acc + Number(perc), 0)).toFixed(2)
  );
  return (
    <Box mt="xl">
      <Text fz="md" mb="xs" fw={600}>
        Vote Allocation
      </Text>
      <Text fz="sm" mb="md" fs="italic">
        Read through the ship's portfolio and allocate a percentage of your
        voting power and a reason for that percentage. You will be able to
        adjust values and reasons in the final step.
      </Text>

      <Group align="flex-end" mb="md">
        <NumberInput
          label="Amount (%)"
          maw={298}
          min={0}
          max={100}
          placeholder="30%"
          disabled={!isVotingActive}
          {...form.getInputProps(`ships.${index}.shipPerc`)}
        />
        <Group>
          <VotingWeightProgress
            shipVotePercs={{
              ship1: shipPercs[0],
              ship2: shipPercs[1],
              ship3: shipPercs[2],
            }}
          />
          <Text fz="sm" opacity={0.8}>
            {totalPercLeft}% left
          </Text>
        </Group>
      </Group>
      <Textarea
        label="Vote Allocation Reason"
        w="100%"
        autosize
        minRows={4}
        maxRows={8}
        disabled={!isVotingActive}
        placeholder="I am awarding this ship 32% of my voting power because..."
        {...form.getInputProps(`ships.${index}.shipComment`)}
      />
      <Group justify="space-between" mt="lg">
        <Button
          size="md"
          variant="outline"
          onClick={prevStep}
          disabled={index === 0 || !isVotingActive}
        >
          Back
        </Button>
        <Button size="md" onClick={nextStep} disabled={!isVotingActive}>
          Next
        </Button>
      </Group>
    </Box>
  );
};
