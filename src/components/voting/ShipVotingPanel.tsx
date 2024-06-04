import { UseFormReturnType } from '@mantine/form';
import { ShipsCardUI } from '../../types/ui';
import { VotingFormValues } from '../../pages/Vote';
import { useQuery } from '@tanstack/react-query';
import { getShipGrants } from '../../queries/getShipGrants';
import { useUserData } from '../../hooks/useUserState';
import { useVoting } from '../../hooks/useVoting';
import { useMemo } from 'react';
import { getRecentPortfolioReport } from '../../queries/getRecordsByTag';
import { ADDR } from '../../constants/addresses';
import { formatEther } from 'viem';
import { Avatar, Box, Flex, Paper, Text, useMantineTheme } from '@mantine/core';
import { PortfolioReport } from '../dashboard/ship/PortfolioReport';
import { ContestStatus, ReportStatus, VotingStage } from '../../types/common';
import { Tag } from '../../constants/tags';
import { VotingFooter } from './VotingFooter';
import { FacilitatorFooter } from './FacilitatorFooter';

export const ShipVotingPanel = ({
  ship,
  form,
  index,
  nextStep,
  prevStep,
}: {
  ship: ShipsCardUI;
  form: UseFormReturnType<
    VotingFormValues,
    (values: VotingFormValues) => VotingFormValues
  >;
  index: number;
  nextStep: () => void;
  prevStep: () => void;
}) => {
  const {
    data: grants,
    error,
    isLoading: isLoadingGrants,
  } = useQuery({
    queryKey: [`portfolio-${ship.id}`],
    queryFn: () => getShipGrants(ship.id as string),
    enabled: !!ship.id,
  });

  const {
    contest,
    contestStatus,
    isLoadingVoting,
    refetchGsVotes,
    votingStage,
  } = useVoting();
  const theme = useMantineTheme();
  const { userData, userLoading } = useUserData();

  const shipChoiceId = useMemo(() => {
    return contest?.choices.find((choice) => choice.shipId === ship.id)?.id;
  }, [contest?.choices, ship]);

  const { data: recentRecord, isLoading: isLoadingRecord } = useQuery({
    queryKey: [`ship-portfolio-${ship.id}`],
    queryFn: () =>
      getRecentPortfolioReport(
        `${Tag.ShipSubmitReport}-${ADDR.VOTE_CONTEST}-${ship.id}`
      ),
    enabled: !!ship.id,
  });

  const totalAmount = formatEther(
    BigInt(ship.amtAllocated) +
      BigInt(ship.amtAvailable) +
      BigInt(ship.amtDistributed)
  );

  const isLoading =
    isLoadingRecord || isLoadingVoting || isLoadingGrants || userLoading;
  return (
    <Box>
      <Text fz="xl" fw={600} mb="md">
        Ship Portfolio Report
      </Text>
      <Paper bg={theme.colors.dark[6]} p="xs" mb="xl">
        <Flex align="center">
          <Avatar size={120} mr="xl" src={ship.imgUrl} />
          <Box>
            <Text fz="md" fw={600} mb="xs">
              {ship.name}
            </Text>
            <Text fz="xs" fw={400} mb={4}>
              Total Round Amount{' '}
              <Text fz="xs" component="span" fw={600}>
                {totalAmount} GSBT
              </Text>
            </Text>
            <Text fz="xs" fw={400} mb="md">
              Total Amount Distributed{' '}
              <Text fz="xs" component="span" fw={600}>
                {formatEther(BigInt(ship.amtDistributed))} GSBT
              </Text>
            </Text>
          </Box>
        </Flex>
      </Paper>

      <PortfolioReport
        grants={grants}
        isLoading={isLoading}
        error={error}
        reportStatus={ReportStatus.Review}
        reportData={recentRecord}
        shipId={ship.id}
      />

      {contestStatus === ContestStatus.Populating && !isLoading && (
        <FacilitatorFooter
          isFacilitator={userData?.isFacilitator}
          recentRecord={recentRecord}
          shipId={ship.id}
          onSuccess={refetchGsVotes}
          shipChoiceId={shipChoiceId}
          choicesAddress={contest?.contest?.choicesModule_id}
        />
      )}
      {shipChoiceId && (
        <VotingFooter
          form={form}
          index={index}
          nextStep={nextStep}
          prevStep={prevStep}
          isVotingActive={votingStage === VotingStage.Active}
        />
      )}
    </Box>
  );
};
