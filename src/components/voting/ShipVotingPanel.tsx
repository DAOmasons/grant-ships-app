import { UseFormReturnType } from '@mantine/form';
import { ShipsCardUI } from '../../types/ui';
import { VotingFormValues } from '../../pages/Vote';
import { useUserData } from '../../hooks/useUserState';
import { useVoting } from '../../hooks/useVoting';
import { useMemo } from 'react';
import { PostedRecord } from '../../queries/getRecordsByTag';
import { formatEther } from 'viem';
import { Avatar, Box, Flex, Paper, Text, useMantineTheme } from '@mantine/core';
import { PortfolioReport } from '../dashboard/ship/PortfolioReport';
import { ContestStatus, ReportStatus, VotingStage } from '../../types/common';
import { VotingFooter } from './VotingFooter';
import { FacilitatorFooter } from './FacilitatorFooter';
import { DashGrant } from '../../resolvers/grantResolvers';

export const ShipVotingPanel = ({
  ship,
  form,
  index,
  nextStep,
  prevStep,
  grants,
  recentRecord,
}: {
  grants: DashGrant[] | null;
  recentRecord?: PostedRecord | null;
  ship: ShipsCardUI;
  form: UseFormReturnType<
    VotingFormValues,
    (values: VotingFormValues) => VotingFormValues
  >;
  index: number;
  nextStep: () => void;
  prevStep: () => void;
}) => {
  const { contest, contestStatus, refetchGsVotes, votingStage } = useVoting();
  const theme = useMantineTheme();
  const { userData } = useUserData();

  const shipChoiceId = useMemo(() => {
    return contest?.choices.find((choice) => choice.shipId === ship.id)?.id;
  }, [contest?.choices, ship]);

  const totalAmount = formatEther(
    BigInt(ship.amtAllocated) +
      BigInt(ship.amtAvailable) +
      BigInt(ship.amtDistributed)
  );

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
            <Text fz="sm" fw={400} mb={4}>
              Allocation Budget:{' '}
              <Text fz="sm" component="span" fw={600}>
                {totalAmount} GSBT
              </Text>
            </Text>
            <Text fz="sm" fw={400} mb="md">
              Amount Distributed:{' '}
              <Text fz="sm" component="span" fw={600}>
                {formatEther(BigInt(ship.amtDistributed))} GSBT
              </Text>
            </Text>
          </Box>
        </Flex>
      </Paper>

      <PortfolioReport
        grants={grants}
        error={null}
        isLoading={false}
        reportStatus={ReportStatus.Review}
        reportData={recentRecord}
        shipId={ship.id}
      />

      {contestStatus === ContestStatus.Populating && (
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
