import {
  Avatar,
  Box,
  Group,
  NumberInput,
  Progress,
  Text,
  TextInput,
  Textarea,
  useMantineTheme,
} from '@mantine/core';

import { UseFormReturnType } from '@mantine/form';
import { ShipsCardUI } from '../../types/ui';
import { VotingFormValues } from '../../pages/Vote';
import { useVoting } from '../../hooks/useVoting';
import { VotingStage } from '../../types/common';
import { TxButton } from '../TxButton';
import { encodeAbiParameters, formatEther, parseAbiParameters } from 'viem';
import { pinJSONToIPFS } from '../../utils/ipfs/pin';
import { notifications } from '@mantine/notifications';
import { useTx } from '../../hooks/useTx';
import ContestABI from '../../abi/Contest.json';
import { ADDR } from '../../constants/addresses';
import { useMemo } from 'react';
import { validateNumberWithMaxDecimals } from '../forms/validationSchemas/votingFormSchema';
import { FormValidationResult } from '@mantine/form/lib/types';
import { object } from 'zod';

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
  const { votingStage, userTokenData, tokenData, contest, refetchGsVotes } =
    useVoting();
  const { tx } = useTx();
  const theme = useMantineTheme();
  const colors = [
    theme.colors.blue[5],
    theme.colors.violet[5],
    theme.colors.pink[5],
  ];
  const isVotingActive = votingStage === VotingStage.Active;

  const exceeds100percent = useMemo(() => {
    return (
      form.values.ships.reduce((acc, curr) => {
        return acc + Number(curr.shipPerc);
      }, 0) > 100
    );
  }, [form.values]);

  const userHasVotes = userTokenData.totalUserTokenBalance > 0n;

  const handleBatchVote = async () => {
    try {
      if (!contest) {
        notifications.show({
          title: 'Error',
          message: 'Failed to submit vote',
          color: 'red',
        });
        return;
      }

      if (form.values.ships.length !== ships.length) {
        notifications.show({
          title: 'Error',
          message: 'Please fill out all fields',
          color: 'red',
        });
        return;
      }

      if (exceeds100percent) {
        notifications.show({
          title: 'Error',
          message: 'Total vote allocation exceeds 100%',
          color: 'red',
        });
        return;
      }

      const validationResult: FormValidationResult = form.validate();

      if (validationResult.hasErrors) {
        notifications.show({
          title: 'Error',
          message: `Form Validation error `,
          color: 'red',
        });
        return;
      }

      const hasFilledInAllRequiredFields = form.values.ships.every(
        (ship) => ship.shipId && ship.shipPerc != null
      );

      if (!hasFilledInAllRequiredFields) {
        notifications.show({
          title: 'Error',
          message: 'Please fill out all required fields',
          color: 'red',
        });
        return;
      }

      const withParams = await Promise.all(
        form.values.ships
          .filter((ship) => ship.shipPerc !== 0)
          .map(async (ship) => {
            const choiceId = contest.choices.find(
              (choice) => choice.shipId === ship.shipId
            )?.id;

            const tokenAmount =
              (userTokenData.totalUserTokenBalance *
                BigInt(Number(ship.shipPerc) * 1e6)) /
              BigInt(100 * 1e6);

            const pinRes = await pinJSONToIPFS({
              voteReason: ship.shipComment,
            });

            if (!pinRes) {
              throw new Error('Failed to pin to IPFS');
            }

            return {
              ...ship,
              ipfsPointer: pinRes.IpfsHash,
              choiceId,
              tokenAmount,
            };
          })
      );

      const choiceIds = withParams.map((ship) => {
        return ship.choiceId?.split('-')[1];
      });
      const tokenAmounts = withParams.map((ship) => ship.tokenAmount);
      const metadataBytes = withParams.map((ship) =>
        encodeAbiParameters(parseAbiParameters('(uint256, string)'), [
          [1n, ship.ipfsPointer],
        ])
      );

      const tokenSum = tokenAmounts.reduce((acc, curr) => acc + curr, 0n);

      if (tokenSum > userTokenData.totalUserTokenBalance) {
        notifications.show({
          title: 'Error',
          message: 'Voting amounts exceeds balance',
          color: 'red',
        });
        return;
      }

      if (
        choiceIds.length !== tokenAmounts.length ||
        tokenAmounts.length !== metadataBytes.length
      ) {
        notifications.show({
          title: 'Error',
          message: 'data length mismatch',
          color: 'red',
        });
        return;
      }

      tx({
        viewParams: {
          awaitEnvioPoll: true,
        },
        writeContractParams: {
          abi: ContestABI,
          address: ADDR.VOTE_CONTEST,
          functionName: 'batchVote',
          args: [choiceIds, tokenAmounts, metadataBytes, tokenSum],
        },
        writeContractOptions: {
          onPollSuccess() {
            refetchGsVotes();
          },
        },
      });
    } catch (error: any) {
      notifications.show({
        title: 'Error',
        message: `Vote submission failed: ${error.message}`,
        color: 'red',
      });
    }
  };

  return (
    <Box mt="md">
      {ships.map((ship, index) => {
        const shipPerc = form.values.ships[index].shipPerc || '0';
        const voteAmount =
          userTokenData.totalUserTokenBalance && shipPerc
            ? formatEther(
                (userTokenData.totalUserTokenBalance *
                  BigInt(Math.floor(Number(shipPerc) * 1e6))) /
                  BigInt(100 * 1e6)
              )
            : 0n;

        return (
          <Box key={ship.id} mb="xl">
            <Group mb={'sm'}>
              <Avatar src={ship.imgUrl} alt={ship.name} size={32} />
              <Text fz="md">{ship.name}</Text>
            </Group>
            <Box ml={48}>
              <NumberInput
                maw={430}
                mb="xs"
                allowNegative={false}
                label="Amount (%)"
                required
                clampBehavior="strict"
                placeholder="22%"
                suffix="%"
                min={0}
                max={100}
                decimalScale={2}
                disabled={!isVotingActive}
                {...form.getInputProps(`ships.${index}.shipPerc`)}
              />
              <Progress
                value={shipPerc ? Number(shipPerc) : 0}
                maw={430}
                mb="xs"
                color={colors[index]}
              />
              <Text fz="sm" mb="md">
                {shipPerc}% Voted ({voteAmount.toString()}{' '}
                {tokenData.tokenSymbol})
              </Text>
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
        <Box>
          {!userHasVotes && (
            <Text fz="sm" c="red">
              You have no votes to allocate
            </Text>
          )}
          {exceeds100percent && (
            <Text fz="sm" c="red">
              Total vote allocation exceeds 100%
            </Text>
          )}
        </Box>
        <TxButton
          size="md"
          onClick={handleBatchVote}
          disabled={!isVotingActive || exceeds100percent || !userHasVotes}
        >
          Submit
        </TxButton>
      </Group>
    </Box>
  );
};