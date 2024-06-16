import {
  ActionIcon,
  Avatar,
  Box,
  Divider,
  Flex,
  Group,
  Progress,
  Stack,
  Text,
  useMantineTheme,
} from '@mantine/core';
import { useVoting } from '../../hooks/useVoting';
import { ShipsCardUI } from '../../types/ui';
import { useMemo } from 'react';
import { MainSection, PageTitle } from '../../layout/Sections';
import { formatBigIntPercentage } from '../../utils/helpers';
import { CondensedChoiceData } from '../../pages/Vote';
import { getContestVoters } from '../../queries/getVoters';
import { VoteCard } from './VoteCard';
import { useQuery } from '@tanstack/react-query';
import { formatBalance } from '../../types/common';
import { IconArrowNarrowLeft } from '@tabler/icons-react';

export const VoteResultsPanel = ({
  ships,
  isPeeking,
  setSeeResults,
}: {
  ships: ShipsCardUI[];
  isPeeking: boolean;
  setSeeResults: (see: boolean) => void;
}) => {
  const { contest, userVotes, tokenData } = useVoting();

  const theme = useMantineTheme();

  const consolidated = useMemo(() => {
    if (!ships || !userVotes || !contest) return [];

    return ships.map((ship) => {
      const shipChoice = contest?.choices.find((c) => c.shipId === ship.id);

      const userVote = userVotes.find((v) => v.choice_id === shipChoice?.id);

      return { ...ship, vote: userVote, choice: shipChoice };
    });
  }, [ships, userVotes, contest]);

  const totals = useMemo(() => {
    if (!consolidated || !contest) return null;

    const totalUserVotes =
      consolidated && consolidated.length > 0
        ? consolidated.reduce((acc, ship) => {
            if (!ship.vote) return acc;
            return acc + BigInt(ship.vote.amount);
          }, 0n)
        : 0n;
    const totalVotes = contest?.choices?.length
      ? contest?.choices.reduce((acc, choice) => {
          return acc + BigInt(choice.voteTally);
        }, 0n)
      : 0n;

    return {
      totalUserVotes,
      totalVotes,
    };
  }, [consolidated, contest]);

  const condensed = useMemo(() => {
    return consolidated?.map((ship) => ({
      shipImg: ship.imgUrl,
      shipName: ship.name,
      id: ship.choice?.id as string,
    }));
  }, [consolidated]);

  const colors = [
    theme.colors.blue[5],
    theme.colors.violet[5],
    theme.colors.pink[5],
  ];

  const hasUserVoted = userVotes && userVotes.length > 0;

  return (
    <MainSection maw={850}>
      {isPeeking ? (
        <Group w="100%" mb="lg">
          <ActionIcon variant="subtle" onClick={() => setSeeResults(false)}>
            <IconArrowNarrowLeft />
          </ActionIcon>
          <Text fz={20} fw={500}>
            See Portfolios
          </Text>
        </Group>
      ) : (
        <PageTitle title="Vote" />
      )}
      <Text fz={32} fw={600} mt="xl">
        {hasUserVoted
          ? 'Your vote has been submitted!'
          : isPeeking
            ? 'Voting Results so far'
            : 'Voting is Complete!'}
      </Text>
      <Flex w="100%" justify="space-between" wrap="wrap" mt={40}>
        {hasUserVoted && (
          <Stack w={350} gap="lg" mb={40}>
            <Text fz="xl" fw={500}>
              Your Vote
            </Text>
            {consolidated.map((ship, index) => {
              const percentage = totals?.totalUserVotes
                ? formatBigIntPercentage(
                    BigInt(ship.vote?.amount || 0),
                    totals?.totalUserVotes
                  )
                : '0';

              const tokenAmount = formatBalance(BigInt(ship.vote?.amount || 0));

              return (
                <Box key={`total_v_${ship.id}`}>
                  <Group gap="xs" mb="sm">
                    <Avatar size={32} src={ship.imgUrl} />
                    <Text fz="md" fw={600}>
                      {ship.name}
                    </Text>
                  </Group>
                  <Progress value={Number(percentage)} color={colors[index]} />
                  <Text fz="sm" mt="xs">
                    {Number(percentage)}% Voted ({tokenAmount}{' '}
                    {tokenData.tokenSymbol})
                  </Text>
                </Box>
              );
            })}
            <Text fz="sm" mt="xs">
              <Text fz="sm" component="span" fw={600}>
                Total:{' '}
              </Text>
              {formatBalance(totals?.totalUserVotes || 0n)}{' '}
              {tokenData.tokenSymbol}
            </Text>
          </Stack>
        )}
        <Stack w={350} mb={40} gap="lg">
          <Text fz="xl" fw={500}>
            Total Vote Results
          </Text>
          {consolidated?.map((ship, index) => {
            const percentage = totals?.totalVotes
              ? formatBigIntPercentage(
                  BigInt(ship.choice?.voteTally),
                  totals?.totalVotes
                )
              : '0';
            const tokenAmount = formatBalance(BigInt(ship.choice?.voteTally));

            return (
              <Box key={`total_v_${ship.id}`}>
                <Group gap="xs" mb="sm">
                  <Avatar size={32} src={ship.imgUrl} />
                  <Text fz="md" fw={600}>
                    {ship.name}
                  </Text>
                </Group>
                <Progress value={Number(percentage)} color={colors[index]} />
                <Text fz="sm" mt="xs">
                  {Number(percentage)}% ({tokenAmount} {tokenData.tokenSymbol})
                </Text>
              </Box>
            );
          })}
          <Text fz="sm" mt="xs">
            <Text fz="sm" component="span" fw={600}>
              Total:{' '}
            </Text>
            {formatBalance(totals?.totalVotes || 0n)} {tokenData.tokenSymbol}
          </Text>
        </Stack>
      </Flex>
      <Divider />
      <Text fz="xl" my="xl" fw={500}>
        All Votes
      </Text>
      <AllVotes choices={condensed} />
    </MainSection>
  );
};

const AllVotes = ({ choices }: { choices: CondensedChoiceData[] }) => {
  const { contest, tokenData } = useVoting();
  const { data: voters } = useQuery({
    queryKey: ['gs-voters'],
    queryFn: () => getContestVoters(contest?.id as string),
    enabled: !!contest,
  });

  return (
    <Flex w={'100%'} wrap="wrap" justify={'space-between'}>
      {voters?.map((voter) => (
        <VoteCard
          key={voter.id}
          voter={voter}
          choices={choices}
          tokenSymbol={tokenData?.tokenSymbol || undefined}
        />
      ))}
    </Flex>
  );
};
