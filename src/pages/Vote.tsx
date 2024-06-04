import { ComponentProps, useEffect, useMemo, useState } from 'react';
import { MainSection, PageTitle } from '../layout/Sections';
import {
  Affix,
  Avatar,
  Box,
  Button,
  Flex,
  Group,
  NumberInput,
  Paper,
  RingProgress,
  Stack,
  Stepper,
  Text,
  TextInput,
  Textarea,
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
import { ADDR } from '../constants/addresses';
import { UseFormReturnType, useForm, zodResolver } from '@mantine/form';
import { votingSchema } from '../components/forms/validationSchemas/votingFormSchema';
import { z } from 'zod';

export type VotingFormValues = z.infer<typeof votingSchema>;

export const Vote = () => {
  const [step, setStep] = useState(0);
  const { data: ships } = useQuery({
    queryKey: ['ships-page'],
    queryFn: getShipsPageData,
  });

  const isLaptop = useLaptop();

  const isTablet = useTablet();

  const isMobile = useMobile();

  const form = useForm({
    initialValues: {
      ships: [],
    } as VotingFormValues,
    validate: zodResolver(votingSchema),
  });

  useEffect(() => {
    if (!ships) return;
    const updatedShips = ships?.map((ship) => ({
      shipId: ship.id,
      shipPerc: '',
      shipComment: '',
    }));
    form.setValues((prev) => ({ ...prev, ships: updatedShips }));
  }, [ships]);

  if (!ships) {
    return null;
  }

  return (
    <Flex w="100%">
      <MainSection>
        <VotingTokenAffix formValues={form.values} />
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
              label={isMobile ? undefined : `Ship ${index + 2}`}
              style={{
                alignItems: 'center',
              }}
            >
              <ShipPanel ship={ship} form={form} index={index} />
            </Stepper.Step>
          ))}
          <Stepper.Step
            label={isMobile ? undefined : 'Final'}
            mih={isTablet ? 36 : undefined}
            style={{
              alignItems: 'center',
            }}
          />
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

const VotingTokenAffix = ({ formValues }: { formValues: VotingFormValues }) => {
  const { userTokenData, tokenData } = useVoting();
  const theme = useMantineTheme();

  const isMobile = useMobile();

  const shipPercs = formValues.ships.map((s) => s.shipPerc);

  return (
    <Affix bottom={isMobile ? 54 : 32} right={isMobile ? 0 : 30}>
      <Paper bg={theme.colors.dark[6]} py={'sm'} px={'xl'}>
        <Group>
          <VotingWeightProgress
            shipVotePercs={{
              ship1: shipPercs[0] || '0',
              ship2: shipPercs[1] || '0',
              ship3: shipPercs[2] || '0',
            }}
          />
          <Text>
            Your Voting Power:{' '}
            <Tooltip
              offset={24}
              label={
                <Box w={200} p={'sm'}>
                  <Text className="ws-pre-wrap" fz="sm">
                    Your voting power is equal to the amount of{' '}
                    {tokenData.tokenSymbol} delegated to your address before
                    snapshot
                  </Text>
                </Box>
              }
            >
              <Text c={theme.colors.blue[3]} component="span">
                {formatEther(userTokenData.totalUserTokenBalance)}{' '}
                {tokenData.tokenSymbol}{' '}
              </Text>
            </Tooltip>
          </Text>
        </Group>
      </Paper>
    </Affix>
  );
};

const VotingWeightProgress = (
  props: Omit<ComponentProps<typeof RingProgress>, 'sections'> & {
    shipVotePercs: {
      ship1: string;
      ship2: string;
      ship3: string;
    };
  }
) => {
  const { shipVotePercs, ...rest } = props;

  const theme = useMantineTheme();

  const sections = useMemo(() => {
    return [
      {
        value: Number(shipVotePercs.ship1) || 0,
        color: theme.colors.blue[5],
      },
      {
        value: Number(shipVotePercs.ship2) || 0,
        color: theme.colors.violet[5],
      },
      {
        value: Number(shipVotePercs.ship3) || 0,
        color: theme.colors.pink[5],
      },
    ];
  }, [shipVotePercs, theme]);

  return <RingProgress {...rest} size={36} thickness={2} sections={sections} />;
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

export const ShipPanel = ({
  ship,
  form,
  index,
}: {
  ship: ShipsCardUI;
  form: UseFormReturnType<
    VotingFormValues,
    (values: VotingFormValues) => VotingFormValues
  >;
  index: number;
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
        {shipChoiceId && <VotingFooter form={form} index={index} />}
      </Box>
    </>
  );
};

const VotingFooter = ({
  form,
  index,
}: {
  index: number;
  form: UseFormReturnType<
    VotingFormValues,
    (values: VotingFormValues) => VotingFormValues
  >;
}) => {
  const shipPercs = form.values.ships.map((s) => s.shipPerc);
  const totalPercLeft =
    100 - shipPercs.reduce((acc, perc) => acc + Number(perc), 0);
  return (
    <Box mt="xl">
      <Group align="flex-end" mb="md">
        <NumberInput
          label="Amount (%)"
          maw={298}
          min={0}
          max={100}
          placeholder="30%"
          {...form.getInputProps(`ships.${index}.shipPerc`)}
        />
        <Group>
          <VotingWeightProgress
            shipVotePercs={{
              ship1: shipPercs[0],
              ship2: shipPercs[1],
              ship3: shipPercs[2],
            }}
          />
          <Text fz="sm" opacity={0.8}>
            {totalPercLeft}% left
          </Text>
        </Group>
      </Group>
      <Textarea
        label="Vote Allocation Reason"
        w="100%"
        autosize
        minRows={4}
        maxRows={8}
        placeholder="I am awarding this ship 32% of my voting power because..."
        {...form.getInputProps(`ships.${index}.shipComment`)}
      />
    </Box>
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
