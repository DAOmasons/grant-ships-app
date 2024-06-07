import { Box, Switch, Text } from '@mantine/core';
import React from 'react';
import TimedVotes from '../../../abi/TimedVotes.json';
import { TxButton } from '../../TxButton';
import { DateTimePicker } from '@mantine/dates';
import { useTx } from '../../../hooks/useTx';
import { useVoting } from '../../../hooks/useVoting';
import { notifications } from '@mantine/notifications';
import { Address } from 'viem';

export const StartVotingPanel = () => {
  const { contest, refetchGsVotes } = useVoting();

  const { tx } = useTx();

  const [startNow, setChecked] = React.useState(true);
  const [votingTimeInSeconds, setVotingTime] = React.useState<number>(0);

  const handleSetVotingTime = (value: Date | null) => {
    if (!value) {
      setVotingTime(0);
      return;
    }
    const dateInSeconds = Math.floor(value?.getTime() / 1000);

    setVotingTime(dateInSeconds);
  };

  const handleSwitchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(e.currentTarget.checked);
  };

  const handleInititateVoting = () => {
    const finalVotingTime = startNow ? 0 : votingTimeInSeconds;

    const contestAddress = contest?.contest?.votesModule_id;

    if (!contestAddress) {
      notifications.show({
        title: 'Error',
        message: 'No contest address found',
        color: 'red',
      });
      return;
    }

    tx({
      viewParams: {
        awaitEnvioPoll: true,
      },
      writeContractParams: {
        abi: TimedVotes,
        functionName: 'setVotingTime',
        address: contestAddress as Address,
        args: [BigInt(finalVotingTime)],
      },
      writeContractOptions: {
        onPollSuccess() {
          refetchGsVotes();
        },
      },
    });
  };

  return (
    <Box>
      <Box mb={'md'}>
        <Text mb="sm">Initiate the voting round</Text>
        <Text fz="sm" mb="sm">
          You can choose to to start the voting round now, or set it at a later
          date.
        </Text>
      </Box>
      <Box mb={'xl'}>
        <Switch
          mb="md"
          defaultChecked={startNow}
          label={
            startNow
              ? 'Voting will start after transaction is initiated'
              : 'Voting will start at a specified date'
          }
          onChange={handleSwitchChange}
        />
        {!startNow && (
          <DateTimePicker
            value={
              votingTimeInSeconds ? new Date(votingTimeInSeconds * 1000) : null
            }
            label="Specified Date"
            placeholder="-- Select date --"
            onChange={(value) => handleSetVotingTime(value)}
          />
        )}
      </Box>
      <TxButton fullWidth onClick={handleInititateVoting}>
        Initiate Voting Period
      </TxButton>
    </Box>
  );
};
