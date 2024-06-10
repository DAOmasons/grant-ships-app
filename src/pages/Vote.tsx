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
import { getRecentPortfolioReport } from '../queries/getRecordsByTag';
import { Tag } from '../constants/tags';
import { ADDR } from '../constants/addresses';
import { ContestStatus, GameStatus, VotingStage } from '../types/common';
import { PreVoting } from '../components/voting/PreVoting';
import { useGameManager } from '../hooks/useGameMangers';
import {
  IconExclamationCircle,
  IconEyeQuestion,
  IconQuestionMark,
} from '@tabler/icons-react';

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
  const [step, setStep] = useState(0);
  const {
    data: ships,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['ships-page'],
    queryFn: bigVoteQuery,
  });

  const { userVotes, votingStage, contestStatus } = useVoting();
  const [modalOpen, setModalOpen] = useState(false);
  const { currentRound } = useGameManager();

  const isLaptop = useLaptop();

  const isTablet = useTablet();

  const isMobile = useMobile();

  const form = useForm({
    initialValues: {
      ships: [],
    } as VotingFormValues,
    validate: zodResolver(votingSchema),
    validateInputOnBlur: true,
  });

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

  if (isLoading) {
    return <LoadingSkeleton />;
  }

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

  if (hasVotes || votingStage >= VotingStage.Closed) {
    return <VoteResultsPanel ships={ships} />;
  }

  const nextStep = () => {
    setStep((current) => (current < 3 ? current + 1 : current));
  };
  const prevStep = () =>
    setStep((current) => (current > 0 ? current - 1 : current));

  const closeModal = () => setModalOpen(false);

  return (
    <Flex w="100%">
      <MainSection>
        <Box pos="relative">
          <VoteAffix formValues={form.values} />

          <PageTitle title="Vote" />
          <Button
            variant="light"
            pos="absolute"
            top={0}
            right={0}
            rightSection={<IconExclamationCircle size={20} />}
            onClick={() => setModalOpen(true)}
          >
            Help
          </Button>
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
        title="Welcome to Grant Ships Voting!"
      >
        <Text>We are excited to </Text>
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
