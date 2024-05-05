import { useMediaQuery } from '@mantine/hooks';
import {
  Button,
  Flex,
  Group,
  Loader,
  Select,
  Text,
  TextInput,
  Textarea,
  em,
} from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { IconCalendar, IconExternalLink } from '@tabler/icons-react';
import { DatePickerInput } from '@mantine/dates';
import { z } from 'zod';
import { useAccount, useConnect, useSwitchChain } from 'wagmi';
import { notifications } from '@mantine/notifications';
import {
  Address,
  encodeAbiParameters,
  formatEther,
  isAddress,
  parseAbiParameters,
  parseEther,
} from 'viem';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';

import { MainSection, PageTitle } from '../layout/Sections';
import { GAME_TOKEN, SUBGRAPH_URL } from '../constants/gameSetup';
import { useUserData } from '../hooks/useUserState';
import { applyFundingSchema } from '../components/forms/validationSchemas/applyFundingSchema';
import { grantApplicationMetadata } from '../utils/ipfs/metadataValidation';
import { pinJSONToIPFS } from '../utils/ipfs/pin';
import { useTx } from '../hooks/useTx';
import AlloAbi from '../abi/Allo.json';
import { ADDR } from '../constants/addresses';
import { getShipPoolId } from '../queries/getShipPoolId';
import { AppAlert } from '../components/UnderContruction';
import { useEffect, useMemo } from 'react';
import { GrantStatus } from '../types/common';
import { appNetwork } from '../utils/config';
import { injected } from 'wagmi/connectors';
import { useQuery } from '@tanstack/react-query';
import { getBuiltGraphSDK } from '../.graphclient';
import { getGrant } from '../queries/getGrant';

const defaultValues = {
  projectId: '',
  dueDate: null,
  totalAmount: '',
  shipBalance: '',
  sendAddress: '',
  objectives: '',
  proposalLink: '',
  extraLink: '',
  extraInfo: '',
};

type FormValues = z.infer<typeof applyFundingSchema>;

const getShipFunds = async (id: string) => {
  const { getShipFundsAvailable } = getBuiltGraphSDK({
    apiEndpoint: SUBGRAPH_URL,
  });

  const res = await getShipFundsAvailable({ id });

  return res.grantShip?.totalAvailableFunds;
};

export const ApplyFunding = () => {
  const { userData, userLoading, refetchUser } = useUserData();
  const { shipId, projectId } = useParams();
  const location = useLocation();

  const canResubmit =
    location.pathname.includes('resubmit-funding') && !!shipId && !!projectId;
  const grantId = canResubmit ? `${projectId}-${shipId}` : undefined;

  const {
    data: shipBalance,
    isLoading: shipBalanceLoading,
    error: shipBalanceError,
  } = useQuery({
    queryKey: [`ship-balance`, shipId],
    queryFn: () => getShipFunds(shipId as string),
    enabled: !!shipId,
  });

  const {
    data: grantData,
    // isLoading: shipBalanceLoading,
    // error: shipBalanceError,
  } = useQuery({
    queryKey: [`grant`, grantId],
    queryFn: () => getGrant(grantId as string),
    enabled: !!grantId,
  });

  const isMobile = useMediaQuery(`(max-width: ${em(750)})`);
  const navigate = useNavigate();

  const { address, isConnected, chainId } = useAccount();
  const { switchChainAsync } = useSwitchChain();
  const { connect } = useConnect();
  const { tx } = useTx();

  const form = useForm({
    initialValues: defaultValues,
    validate: zodResolver(applyFundingSchema),
  });

  const alreadyHasGrantFromShip = useMemo(() => {
    if (!userData?.projects) return false;

    if (!isAddress(form.values.projectId)) return false;

    const currentProject = userData?.projects?.find(
      (project) => project.id === form.values.projectId
    );

    if (!currentProject || !currentProject.grants?.length) return false;

    return currentProject.grants.some(
      (grant) =>
        grant.shipId.id === shipId &&
        // grant.grantStatus !== GrantStatus.Completed && // for now
        grant.grantStatus !== GrantStatus.ShipRejected &&
        grant.grantStatus !== GrantStatus.FacilitatorRejected
    );
  }, [form.values.projectId, shipId, userData]);

  const isAmountFieldDirty = form.isDirty('totalAmount');

  useEffect(() => {
    if (shipBalanceError) {
      return;
    }
    if (shipBalanceLoading) {
      return;
    }

    if (Number(shipBalance) === 0) {
      form.setFieldError('totalAmount', 'Ship does not have any funds');
    }

    if (
      isAmountFieldDirty &&
      form.values.totalAmount != null &&
      Number(form.values.totalAmount) <= 0
    ) {
      form.setFieldError('totalAmount', 'Amount must be greater than 0');
      return;
    }

    if (isAmountFieldDirty && shipBalance && !shipBalanceLoading) {
      const amountExceedsBalance =
        shipBalance &&
        form.values.totalAmount &&
        parseEther(form.values.totalAmount) > BigInt(shipBalance);

      if (amountExceedsBalance) {
        form.setFieldError(
          'totalAmount',
          'Amount Exceeds Available Ship Funds'
        );
      } else {
        form.clearFieldError('totalAmount');
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shipBalance, shipBalanceLoading, form.values, isAmountFieldDirty]);

  useEffect(
    () => {
      if (!grantData || !canResubmit) return;

      form.setValues(
        (prev) =>
          ({
            ...prev,
            projectId: grantData.projectId.id,
            dueDate: new Date(Number(grantData.applicationData.dueDate) * 1000),
            totalAmount: formatEther(grantData.applicationData.grantAmount),
            sendAddress: grantData.applicationData.receivingAddress,
            objectives: grantData.applicationData.objectives,
            proposalLink: grantData.applicationData.proposalLink,
            extraLink: grantData.applicationData.extraLink,
            extraInfo: grantData.applicationData.extraInfo,
          }) as any
      );
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [canResubmit, grantData]
  );

  const handleBlur = (fieldName: string) => {
    form.validateField(fieldName);
  };

  const handleSubmit = async (values: FormValues) => {
    if (!isConnected) {
      if (window?.ethereum?.isMetaMask === true) {
        connect({ connector: injected() });
        return;
      } else {
        notifications.show({
          title: 'Error',
          message: 'Please connect your wallet',
          color: 'red',
        });
        return;
      }
    }

    const isCorrectChain = chainId === appNetwork.id;

    if (!isCorrectChain) {
      await switchChainAsync({ chainId: appNetwork.id });
      return;
    }
    if (!address) {
      notifications.show({
        title: 'Not connected',
        message: 'Please connect your wallet',
        color: 'red',
      });
    }

    if (!shipId) {
      notifications.show({
        title: 'Error',
        message: 'Invalid project anchor in url',
        color: 'red',
      });
    }

    const {
      projectId,
      dueDate,
      totalAmount,
      sendAddress,
      objectives,
      proposalLink,
      extraLink,
      extraInfo,
    } = values;

    if (
      !projectId ||
      !dueDate ||
      !totalAmount ||
      !sendAddress ||
      !objectives ||
      !proposalLink
    ) {
      notifications.show({
        title: 'Error',
        message: 'Please fill out all required fields',
        color: 'red',
      });
      return;
    }

    const amountExceedsBalance =
      shipBalance &&
      values.totalAmount &&
      parseEther(values.totalAmount) > BigInt(shipBalance);

    if (amountExceedsBalance) {
      notifications.show({
        title: 'Error',
        message: 'Amount exceeds available ship funds',
        color: 'red',
      });
      return;
    }

    if (Number(values.totalAmount) <= 0) {
      notifications.show({
        title: 'Error',
        message: 'Amount must be greater than 0',
        color: 'red',
      });
      return;
    }
    const dateInSeconds = BigInt(Math.round(dueDate.getTime() / 1000));

    const metadata = {
      projectId,
      dueDate: dateInSeconds.toString(),
      objectives,
      proposalLink,
      extraLink,
      extraInfo,
    };

    const vMetadata = grantApplicationMetadata.safeParse(metadata);

    if (!vMetadata.success) {
      notifications.show({
        title: 'Validation Error',
        message: 'Invalid application data',
        color: 'red',
      });
      return;
    }

    try {
      const pinRes = await pinJSONToIPFS(metadata);

      if (typeof pinRes.IpfsHash !== 'string' && pinRes.IpfsHash[0] !== 'Q') {
        notifications.show({
          title: 'IPFS Upload Error',
          message: pinRes.IpfsHash[1],
          color: 'red',
        });
        return;
      }

      const currentProject = userData?.projects?.find(
        (project) => project.id === projectId
      );

      const anchor =
        currentProject && isAddress(currentProject?.anchor as string)
          ? (currentProject.anchor as Address)
          : undefined;

      const parsedUnits = parseEther(totalAmount);

      if (!anchor) {
        notifications.show({
          title: 'Error',
          message: 'Invalid anchor address',
          color: 'red',
        });
        return;
      }

      const encoded = encodeAbiParameters(
        parseAbiParameters('address, address, uint256, (uint256, string)'),
        [anchor, sendAddress as Address, parsedUnits, [1n, pinRes.IpfsHash]]
      );

      const shipPoolId = await getShipPoolId(shipId as string);

      tx({
        writeContractParams: {
          abi: AlloAbi,
          address: ADDR.ALLO,
          functionName: 'registerRecipient',
          args: [shipPoolId, encoded],
        },
        writeContractOptions: {
          onPollSuccess() {
            refetchUser();
          },
        },
        viewParams: {
          success: {
            title: 'Grant Application Created',
            description:
              'Your application has been submitted. Track your grant on your Project Page.',
          },
          successButton: {
            label: 'Go to Project Page',
            onClick: () => {
              navigate(`/project/${anchor}`);
            },
          },
        },
      });
    } catch (error) {
      console.error(error);
      notifications.show({
        title: 'Error',
        message: 'Error submitting application',
        color: 'red',
      });
    }
  };

  const noProjects = !userData?.projects.length && !userLoading;

  return (
    <MainSection>
      <PageTitle title="Grant Application" />
      {noProjects && (
        <AppAlert
          mb="xl"
          title="No Projects Profiles Found"
          description={
            <Group gap={0}>
              <Button
                size="xs"
                component={Link}
                to="/create-project"
                p={0}
                h="fit-content"
                variant="subtle"
                mr={4}
              >
                Create a Project
              </Button>
              <Text size="xs" opacity={0.8}>
                to apply for a grant.
              </Text>
            </Group>
          }
        />
      )}
      <Text fw={600}>Funding Available</Text>
      <Text fz="sm" mb="md">
        {shipBalance ? (
          `${formatEther(shipBalance)} ${GAME_TOKEN.SYMBOL}`
        ) : (
          <Text component="span" fs="italic" fz="sm">
            Loading...
          </Text>
        )}
      </Text>
      <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
        <Flex direction={isMobile ? 'column' : 'row'} mb="md">
          <Select
            w="100%"
            label="Project"
            disabled={userLoading || canResubmit}
            rightSection={userLoading ? <Loader /> : undefined}
            required
            mb={isMobile ? 'md' : undefined}
            {...form.getInputProps('projectId')}
            onBlur={() => handleBlur('projectId')}
            data={userData?.projects?.map((project) => ({
              value: project.id,
              label: project.name,
            }))}
            error={
              alreadyHasGrantFromShip && !canResubmit
                ? 'You already have an active grant from this ship'
                : undefined
            }
            mr={'md'}
          />
          <DatePickerInput
            w="100%"
            label="Expected Delivery"
            required
            disabled={noProjects}
            placeholder="Date"
            leftSection={<IconCalendar size={16} />}
            {...form.getInputProps('dueDate')}
            onBlur={() => handleBlur('dueDate')}
          />
        </Flex>
        <Flex direction={isMobile ? 'column' : 'row'} mb="md">
          <TextInput
            w="100%"
            label="Total Amount Requested"
            required
            type="number"
            disabled={noProjects || shipBalanceLoading}
            mb={isMobile ? 'md' : undefined}
            placeholder={
              shipBalanceLoading ? 'Loading ship balance...' : GAME_TOKEN.SYMBOL
            }
            error={'Amount exceeds available ship funds'}
            {...form.getInputProps('totalAmount')}
            mr={'md'}
          />
          <TextInput
            w="100%"
            required
            disabled={noProjects}
            label="Send Address"
            placeholder="0x234..."
            {...form.getInputProps('sendAddress')}
            onBlur={() => handleBlur('sendAddress')}
          />
        </Flex>
        <Textarea
          w="100%"
          required
          mb="md"
          label="Grant Objectives"
          autosize
          disabled={noProjects}
          minRows={4}
          maxRows={8}
          description="A few short, realistic, and preferably measurable objectives for the grant"
          placeholder="World Peace, End Hunger, Slay Moloch, etc."
          {...form.getInputProps('objectives')}
          onBlur={() => handleBlur('objectives')}
        />
        <Flex direction={isMobile ? 'column' : 'row'} mb="md">
          <TextInput
            w="100%"
            label="Proposal Link"
            required
            disabled={noProjects}
            mb={isMobile ? 'md' : undefined}
            leftSection={<IconExternalLink />}
            placeholder={'https://your-proposal.com'}
            {...form.getInputProps('proposalLink')}
            onBlur={() => handleBlur('proposalLink')}
            mr={'md'}
          />
          <TextInput
            w="100%"
            label="Additional Link"
            disabled={noProjects}
            leftSection={<IconExternalLink />}
            placeholder="https://more-info.com"
            {...form.getInputProps('extraLink')}
            onBlur={() => handleBlur('extraLink')}
          />
        </Flex>
        <Textarea
          w="100%"
          mb="md"
          label="Additional Information"
          autosize
          disabled={noProjects}
          minRows={4}
          maxRows={8}
          placeholder="Anything else you would like to add?"
          {...form.getInputProps('extraInfo')}
          onBlur={() => handleBlur('extraInfo')}
        />
        <Flex mt="md" justify="flex-end">
          <Button
            ml="auto"
            type="submit"
            disabled={noProjects || (alreadyHasGrantFromShip && !canResubmit)}
          >
            Finish Application
          </Button>
        </Flex>
      </form>
    </MainSection>
  );
};
