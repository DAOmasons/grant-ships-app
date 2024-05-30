import { useState } from 'react';
import { MainSection, PageTitle } from '../layout/Sections';
import { Avatar, Box, Stepper, Text } from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import { getShipsPageData } from '../queries/getShipsPage';
import { useTablet } from '../hooks/useBreakpoint';
import { ShipsCardUI } from '../types/ui';
import { FundingIndicator } from '../components/shipItems/FundingIndicator';
import { getShipGrants } from '../queries/getShipGrants';
import { PortfolioReport } from '../components/dashboard/ship/PortfolioReport';
import { ReportStatus } from '../types/common';
import { getRecentPortfolioReport } from '../queries/getRecordsByTag';
import { Tag } from '../constants/tags';
import { formatEther } from 'viem';

export const Vote = () => {
  const [step, setStep] = useState(0);
  const {
    data: ships,
    isLoading: isLoadingShips,
    error,
  } = useQuery({
    queryKey: ['ships-page'],
    queryFn: getShipsPageData,
  });

  const isTablet = useTablet();

  if (!ships) {
    return null;
  }

  return (
    <MainSection>
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
        orientation={isTablet ? 'vertical' : 'horizontal'}
      >
        {ships?.map((ship, index) => (
          <Stepper.Step
            key={ship.id}
            mih={isTablet ? 36 : undefined}
            label={`Ship ${index + 2}`}
            style={{
              alignItems: 'center',
            }}
          >
            <ShipPanel ship={ship} />
          </Stepper.Step>
        ))}
        <Stepper.Step
          label="Final"
          mih={isTablet ? 36 : undefined}
          style={{
            alignItems: 'center',
          }}
        ></Stepper.Step>
      </Stepper>
    </MainSection>
  );
};

export const ShipPanel = ({ ship }: { ship: ShipsCardUI }) => {
  const {
    data: grants,
    error,
    isLoading,
  } = useQuery({
    queryKey: [`portfolio-${ship.id}`],
    queryFn: () => getShipGrants(ship.id as string),
    enabled: !!ship.id,
  });

  const { data: recentRecord, refetch: refetchRecentRecord } = useQuery({
    queryKey: [`ship-portfolio-${ship.id}`],
    queryFn: () =>
      getRecentPortfolioReport(`${Tag.ShipSubmitReport}-${ship.id}`),
    enabled: !!ship.id,
  });

  const totalAmount = formatEther(
    BigInt(ship.amtAllocated) +
      BigInt(ship.amtAvailable) +
      BigInt(ship.amtDistributed)
  );
  return (
    <Box>
      <Avatar size={120} mt="xs" mb="md" src={ship.imgUrl} />
      <Text fz="lg" fw={600} mb="xs">
        {ship.name}
      </Text>
      <Text fz="sm" fw={400} mb="xs">
        Total Round Amount{' '}
        <Text fz="sm" component="span" fw={600}>
          {totalAmount} GSBT
        </Text>
      </Text>
      <Text fz="sm" fw={400} mb="md">
        Total Amount Distributed{' '}
        <Text fz="sm" component="span" fw={600}>
          {formatEther(BigInt(ship.amtDistributed))} GSBT
        </Text>
      </Text>

      <PortfolioReport
        grants={grants}
        isLoading={isLoading}
        error={error}
        reportStatus={ReportStatus.Review}
        reportData={recentRecord}
        shipId={ship.id}
      />
    </Box>
  );
};
