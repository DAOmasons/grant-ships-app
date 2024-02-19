import { MainSection, PageTitle } from '../layout/Sections';
import { useMediaQuery } from '@mantine/hooks';
import {
  Button,
  Flex,
  Loader,
  Select,
  TextInput,
  Textarea,
  em,
} from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { IconCalendar, IconExternalLink } from '@tabler/icons-react';
import { DatePickerInput } from '@mantine/dates';
import { GAME_MANAGER, GAME_TOKEN } from '../constants/gameSetup';
import { useUserData } from '../hooks/useUserState';
import { z } from 'zod';
import { applyFundingSchema } from '../components/forms/validationSchemas/applyFundingSchema';
import { useAccount } from 'wagmi';
import { notifications } from '@mantine/notifications';
import { grantApplicationMetadata } from '../utils/ipfs/metadataValidation';
import { pinJSONToIPFS } from '../utils/ipfs/pin';
import {
  Address,
  encodeAbiParameters,
  isAddress,
  parseAbiParameters,
  parseEther,
} from 'viem';
import { useTx } from '../hooks/useTx';
import AlloAbi from '../abi/Allo.json';
import { ADDR } from '../constants/addresses';

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

const defaultValuesFilled = {
  projectId: '',
  dueDate: null,
  totalAmount: '12',
  sendAddress: '0x511449dD36e5dB31980AA0452aAAB95b9a68ae99',
  objectives: `1. Use existing ZK tools to create a new verifiable, private voting protocol
2. Create a small proof of concept app to demonstrate`,
  proposalLink: 'https://google.com',
  extraLink: 'https://google.com',
  extraInfo:
    'We are a team of 3 developers with experience in ZK and voting protocols. We are excited to work on this project and believe we can deliver a working prototype in 2 months.',
};

type FormValues = z.infer<typeof applyFundingSchema>;

export const ApplyFunding = () => {
  const { userData, userLoading } = useUserData();
  const isMobile = useMediaQuery(`(max-width: ${em(750)})`);

  const { address } = useAccount();
  const { tx } = useTx();

  const form = useForm({
    initialValues: defaultValuesFilled,
    validate: zodResolver(applyFundingSchema),
  });

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

      tx({
        writeContractParams: {
          abi: AlloAbi,
          address: ADDR.ALLO,
          functionName: 'registerRecipient',
          args: [GAME_MANAGER.POOL.ID, encoded],
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

  return (
    <MainSection>
      <PageTitle title="Grant Application" />
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
            mr={'md'}
          />
          <DatePickerInput
            w="100%"
            label="Expected Delivery"
            required
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
            mb={isMobile ? 'md' : undefined}
            placeholder={GAME_TOKEN.SYMBOL}
            {...form.getInputProps('totalAmount')}
            onBlur={() => handleBlur('totalAmount')}
            mr={'md'}
          />
          <TextInput
            w="100%"
            required
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
          minRows={4}
          maxRows={8}
          placeholder="Anything else you would like to add?"
          {...form.getInputProps('extraInfo')}
          onBlur={() => handleBlur('extraInfo')}
        />
        <Flex mt="md" justify="flex-end">
          <Button ml="auto" type="submit">
            Finish Application
          </Button>
        </Flex>
      </form>
    </MainSection>
  );
};
