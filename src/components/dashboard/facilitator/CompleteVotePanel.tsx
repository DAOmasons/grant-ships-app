import React from 'react';
import { useVoting } from '../../../hooks/useVoting';
import { VotingStage } from '../../../types/common';
import { Box, Text } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { useTx } from '../../../hooks/useTx';
import TimedVotes from '../../../abi/TimedVotes.json';
import { Address } from 'viem';
import { TxButton } from '../../TxButton';

export const CompleteVotePanel = () => {
  const { contest, refetchGsVotes, votingStage } = useVoting();

  const { tx } = useTx();

  const finalizeVoting = () => {
    if (!contest || votingStage !== VotingStage.Closed) {
      notifications.show({
        title: 'Error',
        message: 'Voting is not closed',
        color: 'red',
      });
      return;
    }

    tx({
      writeContractParams: {
        abi: TimedVotes,
        functionName: 'finalizeVoting',
        address: contest?.contest.votesModule_id as Address,
      },
      writeContractOptions: {
        onPollSuccess() {
          refetchGsVotes();
        },
      },
    });
  };

  if (votingStage < VotingStage.Closed) {
    return (
      <Box>
        <Text>Vote is not complete</Text>
      </Box>
    );
  }

  if (votingStage > VotingStage.Closed) {
    return (
      <Box>
        <Text>Vote is finalized</Text>
      </Box>
    );
  }

  return (
    <Box>
      <Text mb="md">Voting is closed and ready to Finalize</Text>
      <TxButton onClick={finalizeVoting}>Finalize Voting</TxButton>
    </Box>
  );
};
