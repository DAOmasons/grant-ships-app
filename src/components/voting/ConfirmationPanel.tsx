import { Avatar, Box, Group, Text, TextInput, Textarea } from '@mantine/core';
import { UseFormReturnType } from '@mantine/form';

import { ShipsCardUI } from '../../types/ui';
import { VotingFormValues } from '../../pages/Vote';
import { useVoting } from '../../hooks/useVoting';
import { VotingStage } from '../../types/common';
import { TxButton } from '../TxButton';

export const ConfirmationPanel = ({
  ships,
  form,
}: {
  ships: ShipsCardUI[];
  form: UseFormReturnType<
    VotingFormValues,
    (values: VotingFormValues) => VotingFormValues
  >;
}) => {
  const { votingStage } = useVoting();
  const isVotingActive = votingStage === VotingStage.Active;
  return (
    <Box mt="md">
      {ships.map((ship, index) => {
        return (
          <Box key={ship.id} mb="xl">
            <Group mb={'sm'}>
              <Avatar src={ship.imgUrl} alt={ship.name} size={32} />
              <Text fz="md">{ship.name}</Text>
            </Group>
            <Box ml={48}>
              <TextInput
                maw={430}
                mb="md"
                label="Amount (%)"
                placeholder="22%"
                disabled={!isVotingActive}
                {...form.getInputProps(`ships.${index}.shipPerc`)}
              />
              <Textarea
                label="Vote Allocation Reason"
                w="100%"
                autosize
                minRows={4}
                maw={430}
                maxRows={8}
                disabled={!isVotingActive}
                placeholder="I am awarding this ship 32% of my voting power because..."
                {...form.getInputProps(`ships.${index}.shipComment`)}
              />
            </Box>
          </Box>
        );
      })}
      <Group justify="flex-end" maw={480}>
        <TxButton size="md">Submit</TxButton>
      </Group>
    </Box>
  );
};
