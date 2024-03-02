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
import { useAccount } from 'wagmi';
import { notifications } from '@mantine/notifications';
import {
  Address,
  encodeAbiParameters,
  isAddress,
  parseAbiParameters,
  parseEther,
} from 'viem';
import { Link, useNavigate, useParams } from 'react-router-dom';

import { MainSection, PageTitle } from '../layout/Sections';
import { GAME_TOKEN } from '../constants/gameSetup';
import { useUserData } from '../hooks/useUserState';
import { applyFundingSchema } from '../components/forms/validationSchemas/applyFundingSchema';
import { grantApplicationMetadata } from '../utils/ipfs/metadataValidation';
import { pinJSONToIPFS } from '../utils/ipfs/pin';
import { useTx } from '../hooks/useTx';
import AlloAbi from '../abi/Allo.json';
import { ADDR } from '../constants/addresses';
import { getShipPoolId } from '../queries/getShipPoolId';
import { AppAlert } from '../components/UnderContruction';
import { useMemo } from 'react';
import { GrantStatus } from '../types/common';

const defaultValues = {
  projectId: '',
  dueDate: null,
  totalAmount: '',
  sendAddress: '',
  objectives: '',
  proposalLink: '',
  extraLink: '',
  extraInfo: '',
};

type FormValues = z.infer<typeof applyFundingSchema>;

export const ApplyFunding = () => {
  const { userData, userLoading, refetchUser } = useUserData();
  const isMobile = useMediaQuery(`(max-width: ${em(750)})`);
  const { id } = useParams();
  const navigate = useNavigate();

  const { address } = useAccount();
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
        grant.shipId.id === id && grant.grantStatus !== GrantStatus.Completed
    );
  }, [form.values.projectId, id, userData]);

  const handleBlur = (fieldName: string) => {
    form.validateField(fieldName);
  };

  const handleSubmit = async (values: FormValues) => {
    if (!address) {
      notifications.show({
        title: 'Not connected',
        message: 'Please connect your wallet',
        color: 'red',
      });
    }

    if (!id) {
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

      const shipPoolId = await getShipPoolId(id as string);

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
      <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
        <Flex direction={isMobile ? 'column' : 'row'} mb="md">
          <Select
            w="100%"
            label="Project"
            disabled={userLoading}
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
              alreadyHasGrantFromShip
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
            disabled={noProjects}
            mb={isMobile ? 'md' : undefined}
            placeholder={GAME_TOKEN.SYMBOL}
            {...form.getInputProps('totalAmount')}
            onBlur={() => handleBlur('totalAmount')}
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
            disabled={noProjects || alreadyHasGrantFromShip}
          >
            Finish Application
          </Button>
        </Flex>
      </form>
    </MainSection>
  );
};
