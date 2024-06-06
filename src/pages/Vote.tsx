import { useEffect, useMemo, useState } from 'react';
import { MainSection, PageTitle } from '../layout/Sections';
import {
  Avatar,
  Box,
  Divider,
  Flex,
  Group,
  Paper,
  Progress,
  Spoiler,
  Stack,
  Stepper,
  Text,
  useMantineTheme,
} from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import { getShipsPageData } from '../queries/getShipsPage';
import { useLaptop, useMobile, useTablet } from '../hooks/useBreakpoint';
import { useForm, zodResolver } from '@mantine/form';
import { votingSchema } from '../components/forms/validationSchemas/votingFormSchema';
import { z } from 'zod';
import { VoteAffix } from '../components/voting/VoteAffix';
import { VoteTimesIndicator } from '../components/voting/VoteTimesIndicator';
import { ShipVotingPanel } from '../components/voting/ShipVotingPanel';
import { ConfirmationPanel } from '../components/voting/ConfirmationPanel';
import { useVoting } from '../hooks/useVoting';
import { ShipsCardUI } from '../types/ui';
import { formatBigIntPercentage } from '../utils/helpers';
import { formatEther } from 'viem';
import classes from '../components/feed/FeedStyles.module.css';
import { IconChevronDown, IconChevronUp } from '@tabler/icons-react';
import { getContestVoters } from '../queries/getVoters';

export type VotingFormValues = z.infer<typeof votingSchema>;

export const Vote = () => {
  const [step, setStep] = useState(0);
  const { data: ships } = useQuery({
    queryKey: ['ships-page'],
    queryFn: getShipsPageData,
  });

  const { userVotes } = useVoting();

  const isLaptop = useLaptop();

  const isTablet = useTablet();

  const isMobile = useMobile();

  const form = useForm({
    initialValues: {
      ships: [],
    } as VotingFormValues,
    validate: zodResolver(votingSchema),
  });

  useEffect(
    () => {
      if (!ships) return;
      const updatedShips = ships?.map((ship) => ({
        shipId: ship.id,
        shipPerc: '',
        shipComment: '',
      }));
      form.setValues((prev) => ({ ...prev, ships: updatedShips }));
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [ships]
  );

  if (!ships) {
    return null;
  }

  const hasVotes = userVotes && userVotes.length > 0;

  if (hasVotes) {
    return <VoteConfirmationPanel ships={ships} />;
  }

  const nextStep = () =>
    setStep((current) => (current < 3 ? current + 1 : current));
  const prevStep = () =>
    setStep((current) => (current > 0 ? current - 1 : current));

  return (
    <Flex w="100%">
      <MainSection>
        <VoteAffix formValues={form.values} />
        <PageTitle title="Vote" />
        <Stepper
          active={step}
          maw={600}
          miw={300}
          size="xs"
          w={'100%'}
          mt={'lg'}
          mb="xl"
          onStepClick={setStep}
        >
          {ships?.map((ship, index) => (
            <Stepper.Step
              key={ship.id}
              mih={isTablet ? 36 : undefined}
              label={isMobile ? undefined : `Ship ${index + 1}`}
              style={{
                alignItems: 'center',
              }}
            >
              <ShipVotingPanel
                ship={ship}
                form={form}
                index={index}
                nextStep={nextStep}
                prevStep={prevStep}
              />
            </Stepper.Step>
          ))}
          <Stepper.Step
            label={isMobile ? undefined : 'Final'}
            mih={isTablet ? 36 : undefined}
            style={{
              alignItems: 'center',
            }}
          >
            <ConfirmationPanel ships={ships} form={form} />
          </Stepper.Step>
        </Stepper>
      </MainSection>
      {!isLaptop && (
        <Stack gap={'md'} mt={72} w={270}>
          <VoteTimesIndicator />
        </Stack>
      )}
    </Flex>
  );
};

const VoteConfirmationPanel = ({ ships }: { ships: ShipsCardUI[] }) => {
  const { contest, userVotes, tokenData } = useVoting();

  const { data: voters } = useQuery({
    queryKey: ['gs-voters'],
    queryFn: () => getContestVoters(contest?.id as string),
    enabled: !!contest,
  });

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

  const colors = [
    theme.colors.blue[5],
    theme.colors.violet[5],
    theme.colors.pink[5],
  ];
  return (
    <MainSection maw={850}>
      <PageTitle title="Vote" />
      <Text fz={32} fw={600} mt="xl">
        Your vote has been submitted!
      </Text>
      <Flex w="100%" justify="space-between" wrap="wrap" mt={40}>
        <Stack w={350} gap="lg" mb={40}>
          <Text fz="xl" fw={500}>
            Your Vote
          </Text>
          {consolidated.map((ship, index) => {
            const percentage = totals?.totalUserVotes
              ? formatBigIntPercentage(
                  BigInt(ship.vote?.amount),
                  totals?.totalUserVotes
                )
              : '0';
            const tokenAmount = formatEther(BigInt(ship.vote?.amount));

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
            {formatEther(totals?.totalUserVotes || 0n)} {tokenData.tokenSymbol}
          </Text>
        </Stack>
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
            const tokenAmount = formatEther(BigInt(ship.choice?.voteTally));
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
            {formatEther(totals?.totalVotes || 0n)} {tokenData.tokenSymbol}
          </Text>
        </Stack>
      </Flex>
      <Divider />
      <Text fz="xl" my="xl" fw={500}>
        All Votes
      </Text>
      <Flex w={'100%'} wrap="wrap" justify={'space-between'}>
        <VoteCard />
        <VoteCard />
        <VoteCard />
        <VoteCard />
        <VoteCard />
        <VoteCard />
      </Flex>
    </MainSection>
  );
};

const VoteCard = () => {
  const theme = useMantineTheme();
  const colors = [
    theme.colors.blue[5],
    theme.colors.violet[5],
    theme.colors.pink[5],
  ];

  return (
    <Paper w={350} mb="xl" bg={theme.colors.dark[6]} p={'md'}>
      <Group mb="md">
        <Avatar size={48} />
        <Text>0x000...0000</Text>
      </Group>
      <Group w={'100%'} mb="sm">
        <Avatar size={32} />
        <Box maw={250} w="100%">
          <Progress value={30} color={colors[0]} opacity={0.7} />
        </Box>
      </Group>
      <Spoiler
        mb={'xs'}
        maw={300}
        hideLabel={<IconChevronUp stroke={1} />}
        showLabel={<IconChevronDown stroke={1} />}
        classNames={{
          root: classes.embedTextBox,
          control: classes.embedTextControl,
        }}
        maxHeight={48}
      >
        <Text fz="sm" className="ws-pre-wrap">
          The challenge sdfs sd fs sdf sd fs dfsdfsdfajsl;dkfjas;ldkfj
          asdflkja;l df asdl;fj asldkfjlskdfj ;lasd asdfas dfjl;kj as;dlfk asdf
          lkj;a sdf
        </Text>
      </Spoiler>
      <Group w={'100%'} mb="sm">
        <Avatar size={32} />
        <Box maw={250} w="100%">
          <Progress value={20} color={colors[1]} opacity={0.7} />
        </Box>
      </Group>
      <Spoiler
        mb={'xs'}
        maw={300}
        hideLabel={<IconChevronUp stroke={1} />}
        showLabel={<IconChevronDown stroke={1} />}
        classNames={{
          root: classes.embedTextBox,
          control: classes.embedTextControl,
        }}
        maxHeight={48}
      >
        <Text fz="sm" className="ws-pre-wrap">
          The challenge sdfs sd fs sdf sd fs dfsdfsdfajsl;dkfjas;ldkfj
          asdflkja;l df asdl;fj asldkfjlskdfj ;lasd asdfas dfjl;kj as;dlfk asdf
          lkj;a sdf
        </Text>
      </Spoiler>
      <Group w={'100%'} mb="sm">
        <Avatar size={32} />
        <Box maw={250} w="100%">
          <Progress value={50} color={colors[2]} opacity={0.7} />
        </Box>
      </Group>
      <Spoiler
        mb={'xs'}
        maw={300}
        hideLabel={<IconChevronUp stroke={1} />}
        showLabel={<IconChevronDown stroke={1} />}
        classNames={{
          root: classes.embedTextBox,
          control: classes.embedTextControl,
        }}
        maxHeight={48}
      >
        <Text fz="sm" className="ws-pre-wrap">
          The challenge sdfs sd fs sdf sd fs dfsdfsdfajsl;dkfjas;ldkfj
          asdflkja;l df asdl;fj asldkfjlskdfj ;lasd asdfas dfjl;kj as;dlfk asdf
          lkj;a sdf
        </Text>
      </Spoiler>
    </Paper>
  );
};
