import { useMemo, useState } from 'react';
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
import { encodeAbiParameters, formatEther, parseAbiParameters } from 'viem';
import { useVoting } from '../hooks/useVoting';
import { useUserData } from '../hooks/useUserState';
import { IconCheck, IconInfoCircle } from '@tabler/icons-react';
import { notifications } from '@mantine/notifications';
import { TxButton } from '../components/TxButton';
import { useTx } from '../hooks/useTx';
import HatsAllowList from '../abi/HatsAllowList.json';
import { portfolioReportSchema } from '../components/forms/validationSchemas/portfolioReportSchema';
import { pinJSONToIPFS } from '../utils/ipfs/pin';
import { ADDR } from '../constants/addresses';
import { addressToBytes32, bytes32toAddress } from '../utils/helpers';

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

  const { contest, contestStatus, isLoadingVoting, refetchGsVotes } =
    useVoting();
  const { userData, userLoading } = useUserData();

  const shipChoiceId = useMemo(() => {
    return contest?.choices.find((choice) => {
      const shipBytes32 = choice?.id?.split('-')?.[1];
      return bytes32toAddress(shipBytes32) === ship.id;
    })?.id;
  }, [contest?.choices, ship]);

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
            shipId={ship.id}
            onSuccess={refetchGsVotes}
            shipChoiceId={shipChoiceId}
          />
        )}
      </Box>
    </>
  );
};

const FacilitatorFooter = ({
  isFacilitator,
  recentRecord,
  shipId,
  onSuccess,
  shipChoiceId,
}: {
  isFacilitator?: boolean;
  recentRecord?: PostedRecord | null;
  shipId?: string;
  onSuccess: () => void;
  shipChoiceId?: string;
}) => {
  const theme = useMantineTheme();
  const { tx } = useTx();

  const handleAddChoice = async () => {
    if (!recentRecord) {
      notifications.show({
        title: 'Error',
        message: 'No report submitted',
        color: 'red',
      });
      return;
    }

    if (!isFacilitator) {
      notifications.show({
        title: 'Error',
        message: 'Only facilitator can approve',
        color: 'red',
      });
      return;
    }

    if (!shipId) {
      notifications.show({
        title: 'Error',
        message: 'No ship ID provided',
        color: 'red',
      });
      return;
    }

    const bytes32address = addressToBytes32(shipId);

    const convertedAddress = bytes32toAddress(bytes32address);

    if (convertedAddress !== shipId) {
      notifications.show({
        title: 'Error',
        message: 'Address conversion failed',
        color: 'red',
      });
      return;
    }

    const validated = portfolioReportSchema.safeParse(recentRecord);

    if (!validated.success) {
      notifications.show({
        title: 'Error',
        message: 'Report data is invalid',
        color: 'red',
      });
      return;
    }

    const pinRes = await pinJSONToIPFS(validated.data);

    const encoded = encodeAbiParameters(
      parseAbiParameters('bytes, (uint256, string)'),
      ['0x', [1n, pinRes.IpfsHash]]
    );

    tx({
      viewParams: {
        awaitEnvioPoll: true,
      },
      writeContractParams: {
        abi: HatsAllowList,
        address: ADDR.HATS_ALLOW_LIST,
        functionName: 'registerChoice',
        args: [bytes32address, encoded],
      },
      writeContractOptions: {
        onPollSuccess() {
          onSuccess?.();
        },
      },
    });
  };

  return (
    <>
      {recentRecord && shipChoiceId == undefined && (
        <Group justify="flex-end" mt="xl">
          {isFacilitator ? (
            <TxButton onClick={handleAddChoice} size="md">
              Approve
            </TxButton>
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
      )}

      {!recentRecord && (
        <Group gap="xs">
          <IconInfoCircle
            size={18}
            color={theme.colors.yellow[6]}
            style={{ marginLeft: 'auto' }}
          />
          <Text fz="sm" c={theme.colors.yellow[6]}>
            This ship has not submitted a report yet
          </Text>
        </Group>
      )}
      {shipChoiceId && (
        <Group justify="flex-end" gap="xs">
          <IconCheck size={18} color={theme.colors.teal[5]} />
          <Text fz="sm">This ship has been approved</Text>
        </Group>
      )}
    </>
  );
};
