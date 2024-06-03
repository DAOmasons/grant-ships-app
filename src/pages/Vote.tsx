import { useMemo, useState } from 'react';
import { MainSection, PageTitle } from '../layout/Sections';
import {
  Avatar,
  Box,
  Button,
  Flex,
  Group,
  Paper,
  Stack,
  Stepper,
  Text,
  Tooltip,
  useMantineTheme,
} from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import { getShipsPageData } from '../queries/getShipsPage';
import { useLaptop, useMobile, useTablet } from '../hooks/useBreakpoint';
import { ShipsCardUI } from '../types/ui';
import { getShipGrants } from '../queries/getShipGrants';
import { PortfolioReport } from '../components/dashboard/ship/PortfolioReport';
import { ContestStatus, ReportStatus, VotingStage } from '../types/common';
import {
  PostedRecord,
  getRecentPortfolioReport,
} from '../queries/getRecordsByTag';
import { Tag } from '../constants/tags';
import {
  Address,
  encodeAbiParameters,
  erc20Abi,
  formatEther,
  parseAbiParameters,
} from 'viem';
import { useVoting } from '../hooks/useVoting';
import { useUserData } from '../hooks/useUserState';
import { IconCheck, IconInfoCircle } from '@tabler/icons-react';
import { notifications } from '@mantine/notifications';
import { TxButton } from '../components/TxButton';
import { useTx } from '../hooks/useTx';
import HatsAllowList from '../abi/HatsAllowList.json';
import { portfolioReportSchema } from '../components/forms/validationSchemas/portfolioReportSchema';
import { pinJSONToIPFS } from '../utils/ipfs/pin';
import { addressToBytes32, bytes32toAddress } from '../utils/helpers';
import { secondsToLongDateTime } from '../utils/time';
import { VOTING_STAGE_INFO } from '../constants/copy';
import { NETWORK_ID } from '../constants/gameSetup';
import { useAccount, useReadContracts } from 'wagmi';
import { ADDR } from '../constants/addresses';

export const Vote = () => {
  const [step, setStep] = useState(0);
  const theme = useMantineTheme();
  const { data: ships } = useQuery({
    queryKey: ['ships-page'],
    queryFn: getShipsPageData,
  });
  const isLaptop = useLaptop();

  const isTablet = useTablet();

  const isMobile = useMobile();

  if (!ships) {
    return null;
  }

  return (
    <Flex w="100%">
      <MainSection>
        <PageTitle title="Vote" />
        {isLaptop && <VoteTimesIndicator />}

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
              label={isMobile ? undefined : `Ship ${index + 2}`}
              style={{
                alignItems: 'center',
              }}
            >
              <ShipPanel ship={ship} />
            </Stepper.Step>
          ))}
          <Stepper.Step
            label={isMobile ? undefined : 'Final'}
            mih={isTablet ? 36 : undefined}
            style={{
              alignItems: 'center',
            }}
          ></Stepper.Step>
        </Stepper>
      </MainSection>
      {!isLaptop && (
        <Stack gap={'xs'} mt={72} w={270}>
          <VoteTimesIndicator />
          <VotePowerIndicator />
        </Stack>
      )}
    </Flex>
  );
};

const VotePowerIndicator = () => {
  const theme = useMantineTheme();

  const { contest } = useVoting();

  const isLaptop = useLaptop();

  return (
    <Paper
      p={isLaptop ? 0 : 'md'}
      bg={isLaptop ? 'transparent' : theme.colors.dark[6]}
    >
      <Text mb="md">Voting Token: {}</Text>
      <Text>Voting Power: {}</Text>
    </Paper>
  );
};

const VoteTimesIndicator = () => {
  const isLaptop = useLaptop();

  const { contest, votingStage } = useVoting();
  const theme = useMantineTheme();

  if (!contest) {
    return null;
  }

  return (
    <Paper
      p={isLaptop ? 0 : 'md'}
      bg={isLaptop ? 'transparent' : theme.colors.dark[6]}
    >
      <Flex direction={isLaptop ? 'column-reverse' : 'column'} gap={'md'}>
        <Flex direction={isLaptop ? 'row' : 'column'}>
          <Box mr={isLaptop ? 'md' : undefined}>
            <Text fz={isLaptop ? 'md' : 'lg'}>Vote Start</Text>
            <Text fz="xs" mb="md">
              {' '}
              {contest.endTime
                ? secondsToLongDateTime(contest.startTime)
                : '--'}
            </Text>
          </Box>
          <Box>
            <Text fz={isLaptop ? 'md' : 'lg'}>Vote End</Text>
            <Text fz="xs">
              {contest.endTime ? secondsToLongDateTime(contest.endTime) : '--'}
            </Text>
          </Box>
        </Flex>
        <Group gap={4} align="center">
          <Text fz="sm">Status: {VotingStage[votingStage]}</Text>
          <Tooltip label={VOTING_STAGE_INFO[votingStage]}>
            <IconInfoCircle
              size={16}
              color={theme.colors.violet[6]}
              style={{
                transform: 'translateY(-1px)',
              }}
            />
          </Tooltip>
        </Group>
      </Flex>
    </Paper>
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
    <>
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
            choicesAddress={contest?.contest?.choicesModule_id}
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
  choicesAddress,
}: {
  isFacilitator?: boolean;
  recentRecord?: PostedRecord | null;
  shipId?: string;
  onSuccess: () => void;
  shipChoiceId?: string;
  choicesAddress?: string;
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

    if (!choicesAddress) {
      notifications.show({
        title: 'Error',
        message: 'Choices address not found',
        color: 'red',
      });
      return;
    }

    tx({
      viewParams: {
        awaitEnvioPoll: true,
      },
      writeContractParams: {
        abi: HatsAllowList,
        address: choicesAddress as Address,
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
