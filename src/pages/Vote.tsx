import { useEffect, useState } from 'react';
import { MainSection, PageTitle } from '../layout/Sections';
import {
  ActionIcon,
  Box,
  Button,
  Flex,
  Group,
  Modal,
  Skeleton,
  Stack,
  Stepper,
  Text,
  Tooltip,
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
import { VoteResultsPanel } from '../components/voting/VoteResultsPanel';
import { AppAlert } from '../components/UnderContruction';
import { getShipGrants } from '../queries/getShipGrants';
import {
  PostedRecord,
  getRecentPortfolioReport,
} from '../queries/getRecordsByTag';
import { Tag } from '../constants/tags';
import { ADDR } from '../constants/addresses';
import { ContestStatus, GameStatus, VotingStage } from '../types/common';
import { PreVoting } from '../components/voting/PreVoting';
import { useGameManager } from '../hooks/useGameMangers';
import Logo from '../assets/Logo.svg?react';

import { IconExclamationCircle, IconEye } from '@tabler/icons-react';
import { DashGrant } from '../resolvers/grantResolvers';
import { useAccount } from 'wagmi';

export type VotingFormValues = z.infer<typeof votingSchema>;

export type CondensedChoiceData = {
  id: string;
  shipName: string;
  shipImg: string;
};

const bigVoteQuery = async () => {
  const ships = await getShipsPageData();

  const shipVoteData = await Promise.all(
    ships.map(async (ship) => {
      const [grants, recentRecord] = await Promise.all([
        getShipGrants(ship.id),
        getRecentPortfolioReport(
          `${Tag.ShipSubmitReport}-${ADDR.VOTE_CONTEST}-${ship.id}`
        ),
      ]);

      return { ...ship, grants, recentRecord };
    })
  );

  return shipVoteData;
};

export const Vote = () => {
  const {
    data: ships,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['ships-page'],
    queryFn: bigVoteQuery,
  });
  const [seeResults, setSeeResults] = useState(false);
  const { userVotes, votingStage, contestStatus } = useVoting();
  const { currentRound } = useGameManager();

  if (isLoading) {
    return <LoadingSkeleton />;
  }

  console.log('currentRound', currentRound);
  console.log('contestStatus', contestStatus);

  if (error) {
    return (
      <AppAlert
        title="Error loading Ships"
        description={error.message || 'Unknown error message'}
      />
    );
  }

  const hasVotes = userVotes && userVotes.length > 0;

  if (!currentRound) {
    return null;
  }

  if (
    currentRound?.gameStatus < GameStatus.Completed &&
    contestStatus <= ContestStatus.Populating
  ) {
    return <PreVoting />;
  }

  if (!ships) {
    return <AppAlert title="No Ships Found" description="No ships found" />;
  }

  console.log('hasVotes', hasVotes);
  console.log('votingStage', votingStage);
  console.log('seeResults', seeResults);

  if (hasVotes || votingStage >= VotingStage.Closed || seeResults) {
    return (
      <VoteResultsPanel
        ships={ships}
        isPeeking={seeResults}
        setSeeResults={setSeeResults}
      />
    );
  }

  return <VotingOpen ships={ships} setSeeResults={setSeeResults} />;
};

const VotingOpen = ({
  ships,
  setSeeResults,
}: {
  setSeeResults: (value: boolean) => void;
  ships: {
    grants: DashGrant[] | null;
    recentRecord: PostedRecord | null;
    id: string;
    name: string;
    status: GameStatus;
    imgUrl: string;
    description: string;
    amtAllocated: string;
    amtDistributed: string;
    amtAvailable: string;
    balance: string;
  }[];
}) => {
  const form = useForm({
    initialValues: {
      ships: [],
    } as VotingFormValues,
    validate: zodResolver(votingSchema),
    validateInputOnBlur: true,
  });

  const { votingStage } = useVoting();

  const [step, setStep] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);

  const isLaptop = useLaptop();

  const isTablet = useTablet();

  const isMobile = useMobile();

  const { isConnected } = useAccount();

  useEffect(
    () => {
      if (!ships) return;
      const updatedShips = ships?.map((ship) => ({
        shipId: ship.id,
        shipPerc: 0,
        shipComment: '',
      }));
      form.setValues((prev) => ({ ...prev, ships: updatedShips }));
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [ships]
  );

  useEffect(() => {
    const hasSeenHelp = JSON.parse(
      localStorage.getItem('has-seen-help') || 'false'
    );
    if (!hasSeenHelp) {
      setModalOpen(true);
    }
  }, []);

  const nextStep = () => {
    setStep((current) => (current < 3 ? current + 1 : current));
  };
  const prevStep = () =>
    setStep((current) => (current > 0 ? current - 1 : current));

  const closeModal = () => {
    localStorage.setItem('has-seen-help', JSON.stringify(true));
    setModalOpen(false);
  };
  return (
    <Flex w="100%">
      <MainSection>
        <Box pos="relative">
          {isConnected && <VoteAffix formValues={form.values} />}

          <PageTitle title="Vote" />
          <Group pos="absolute" top={0} right={0} gap={'sm'}>
            {votingStage === VotingStage.Active && (
              <Tooltip label="See Results">
                <ActionIcon
                  variant="light"
                  h={36}
                  w={36}
                  onClick={() => setSeeResults(true)}
                >
                  <IconEye size={20} />
                </ActionIcon>
              </Tooltip>
            )}
            <Button
              variant="light"
              rightSection={<IconExclamationCircle size={20} />}
              onClick={() => setModalOpen(true)}
            >
              Help
            </Button>
          </Group>
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
                  grants={ship.grants}
                  recentRecord={ship.recentRecord}
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
        </Box>
      </MainSection>
      {!isLaptop && (
        <Stack gap={'md'} mt={72} w={270}>
          <VoteTimesIndicator />
        </Stack>
      )}
      <Modal
        opened={modalOpen}
        onClose={closeModal}
        centered
        w={'50%'}
        title={
          <Text fz="lg" fw={600}>
            Grant Ships Voting
          </Text>
        }
      >
        <InfoModalContent closeModal={closeModal} />
      </Modal>
    </Flex>
  );
};

const LoadingSkeleton = () => (
  <Flex w="100%">
    <MainSection>
      <PageTitle title="Vote" />
      <Stepper
        active={0}
        maw={600}
        miw={300}
        size="xs"
        w={'100%'}
        mt={'lg'}
        mb="xl"
      >
        <Stepper.Step label="Ship 1">
          <Text fz="xl" fw={600} mb="md">
            Ship Portfolio Report
          </Text>
          <Skeleton w={'100%'} h={120} mb="xl" />
          <Skeleton h={16} w="50%" mb={'md'} />
          <Skeleton h={89} w="100%" mb="xl" />
          <Skeleton h={16} w="50%" mb={'md'} />
          <Flex h={69} align="center">
            <Skeleton circle h={32} w={32} mr="sm" />
            <Skeleton h={20} w="70%" />
          </Flex>
          <Skeleton h={1} w="100%" />
          <Flex h={69} align="center">
            <Skeleton circle h={32} w={32} mr="sm" />
            <Skeleton h={20} w="70%" />
          </Flex>
          <Skeleton h={1} w="100%" />
          <Flex h={69} align="center">
            <Skeleton circle h={32} w={32} mr="sm" />
            <Skeleton h={20} w="70%" />
          </Flex>
          <Skeleton h={1} w="100%" />
        </Stepper.Step>
        <Stepper.Step label="Ship 2" />
        <Stepper.Step label="Ship 3" />
        <Stepper.Step label="Final" />
      </Stepper>
    </MainSection>
  </Flex>
);

const InfoModalContent = ({ closeModal }: { closeModal: () => void }) => {
  const theme = useMantineTheme();
  return (
    <Box>
      <Flex w="100%" justify="center" mb="md">
        <Logo height={80} width={80} />
      </Flex>
      <Box mb="lg">
        <Text fw={600} mb={'sm'} fz="sm">
          Welcome!
        </Text>
        <Text fz="sm" c={theme.colors.dark[2]}>
          We are excited to have you here for the first "Gaming on Arbitrum"
          Voting Round
        </Text>
      </Box>
      <Box mb="lg">
        <Text fz="sm" fw={600} mb={'sm'}>
          How to vote
        </Text>
        <Text fz="sm" c={theme.colors.dark[2]} mb="sm">
          Read through each ship's (grant program) portfolio and evaluate the
          projects funded. Leave a comment and an estimated %. When you reach
          the final stage, you will be able to review your votes and submit
          them.
        </Text>
        <Text fz="sm" c={theme.colors.dark[2]} mb="sm"></Text>
        <Text fz="sm" c={theme.colors.dark[2]} mb="sm">
          The total percentages will determine the funding each ship receives in
          the following round.
        </Text>
        <Text fz="sm" c={theme.colors.dark[2]} mb="sm">
          If you have any questions or need help, please reach out to us on{' '}
          <a href="https://discord.gg/sqVzFKCf">Discord</a> or{' '}
          <a href="https://t.me/grantships">Telegram.</a>
        </Text>
        <Group justify="flex-end" w="100%">
          <Button onClick={closeModal}>Got it!</Button>
        </Group>
      </Box>
    </Box>
  );
};
