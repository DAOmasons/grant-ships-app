import { useState } from 'react';
import { MainSection, PageTitle } from '../layout/Sections';
import {
  Affix,
  Avatar,
  Box,
  Button,
  Group,
  Paper,
  Stepper,
  Text,
  Tooltip,
  useMantineTheme,
} from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import { getShipsPageData } from '../queries/getShipsPage';
import { useTablet } from '../hooks/useBreakpoint';
import { ShipsCardUI } from '../types/ui';
import { getShipGrants } from '../queries/getShipGrants';
import { PortfolioReport } from '../components/dashboard/ship/PortfolioReport';
import { ContestStatus, ReportStatus } from '../types/common';
import {
  PostedRecord,
  getRecentPortfolioReport,
} from '../queries/getRecordsByTag';
import { Tag } from '../constants/tags';
import { formatEther } from 'viem';
import { useVoting } from '../hooks/useVoting';
import { useUserData } from '../hooks/useUserState';
import { IconInfoCircle } from '@tabler/icons-react';

export const Vote = () => {
  const [step, setStep] = useState(0);
  const theme = useMantineTheme();
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
      <Affix bottom={20} right={20}>
        <Paper bg={theme.colors.dark[6]} h={40} w={200}></Paper>
      </Affix>
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
    isLoading: isLoadingGrants,
  } = useQuery({
    queryKey: [`portfolio-${ship.id}`],
    queryFn: () => getShipGrants(ship.id as string),
    enabled: !!ship.id,
  });

  const { contest, contestStatus, isLoadingVoting } = useVoting();
  const { userData, userLoading } = useUserData();

  const { data: recentRecord, isLoading: isLoadingRecord } = useQuery({
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

  const isLoading =
    isLoadingRecord || isLoadingVoting || isLoadingGrants || userLoading;

  return (
    <>
      <Affix bottom={0} right={0}></Affix>
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
        {contestStatus === ContestStatus.Populating && !isLoading && (
          <FacilitatorFooter
            isFacilitator={userData?.isFacilitator}
            recentRecord={recentRecord}
          />
        )}
      </Box>
    </>
  );
};

const FacilitatorFooter = ({
  isFacilitator,
  recentRecord,
}: {
  isFacilitator?: boolean;
  recentRecord?: PostedRecord | null;
}) => {
  const theme = useMantineTheme();
  const handleAddChoice = () => {};

  return (
    <>
      {recentRecord ? (
        <Group justify="flex-end" mt="xl">
          {isFacilitator ? (
            <Button onClick={handleAddChoice} size="md">
              Approve
            </Button>
          ) : (
            <Button
              disabled
              size="md"
              rightSection={
                <Tooltip label="Only facilitator can approve">
                  <IconInfoCircle size={18} />
                </Tooltip>
              }
            >
              Approve
            </Button>
          )}
        </Group>
      ) : (
        <Group gap="xs">
          <IconInfoCircle
            size={18}
            color={theme.colors.yellow[6]}
            style={{ marginLeft: 'auto' }}
          />
          <Text fz="sm" color={theme.colors.yellow[6]}>
            This ship has not submitted a report yet
          </Text>
        </Group>
      )}
    </>
  );
};
