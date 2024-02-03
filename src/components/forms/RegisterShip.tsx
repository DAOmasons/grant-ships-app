import { useState } from 'react';
import { Stepper, Stack, TextInput, Textarea } from '@mantine/core';
import { MainSection, PageTitle } from '../../layout/Sections';
import {
  IconBrandGithub,
  IconBrandTelegram,
  IconBrandX,
  IconMail,
  IconWorld,
} from '@tabler/icons-react';
import { IconBrandDiscord } from '@tabler/icons-react';
import { AddressBox } from '../AddressBox';
import { notifications } from '@mantine/notifications';
import { AvatarPickerIPFS } from '../AvatarPickerIPFS';
import { useForm, zodResolver } from '@mantine/form';
import {
  registerProjectSchema,
  registerShipSchema,
} from './validationSchemas/registerProjectSchema';
import { useAccount, useWatchContractEvent } from 'wagmi';
import { z } from 'zod';
import Registry from '../../abi/Registry.json';
import { ADDR } from '../../constants/addresses';
import { useTx } from '../../hooks/useTx';
import { generateRandomUint256 } from '../../utils/helpers';
import { pinJSONToIPFS } from '../../utils/ipfs/pin';
import { createMetadata, shipProfileHash } from '../../utils/metadata';

export const RegisterShip = () => {
  const [step, setStep] = useState(0);
  useWatchContractEvent({
    abi: Registry,
    address: ADDR.Registry,
    eventName: 'ProfileCreated',
    onLogs: (logs) => {
      console.log('ProfileCreated', logs);
    },
  });

  const nextStep = () =>
    setStep((current) => (current < 2 ? current + 1 : current));
  const prevStep = () =>
    setStep((current) => (current > 0 ? current - 1 : current));
  return (
    <MainSection>
      <PageTitle title="Grant Ship Application" />
      <Stepper active={step} maw={375} miw={300} w={'100%'}>
        <Stepper.Step label="First Step" description="Grant Ship Profile">
          <RegisterForm />
        </Stepper.Step>
        <Stepper.Step
          label="Second Step"
          description="Ship Profile"
        ></Stepper.Step>
      </Stepper>
    </MainSection>
  );
};

type FormValues = z.infer<typeof registerShipSchema>;

const RegisterForm = () => {
  const { address } = useAccount();
  const { tx } = useTx();

  const form = useForm({
    initialValues: {
      avatarHash: '',
      name: '',
      projectOwner: address || '',
      teamMembers: [''],
      mission: '',
      email: '',
      x: '',
      github: '',
      discord: '',
      telegram: '',
      website: '',
    },
    validate: zodResolver(registerShipSchema),
  });

  const handleBlur = (fieldName: string) => {
    form.validateField(fieldName);
  };

  const handleFormSubmit = async (values: FormValues) => {
    try {
      const nonce = generateRandomUint256();

      const projectMetadata = {
        notStale: generateRandomUint256().toString(),
        name: values.name,
        mission: values.mission,
        avatarHash_IPFS: values.avatarHash,
        email: values.email,
        x: values.x,
        github: values.github,
        discord: values.discord,
        telegram: values.telegram,
        website: values.website,
      };

      const pinRes = await pinJSONToIPFS(projectMetadata);

      if (typeof pinRes.IpfsHash !== 'string' && pinRes.IpfsHash[0] !== 'Q') {
        notifications.show({
          title: 'IPFS Upload Error',
          message: pinRes.IpfsHash[1],
          color: 'red',
        });
        return;
      }
      const teamMembers = values.teamMembers.filter(Boolean);
      const schemaCode = shipProfileHash();

      const metadataStruct = createMetadata({
        protocol: schemaCode,
        ipfsHash: pinRes.IpfsHash,
      });

      tx({
        writeContractParams: {
          abi: Registry,
          address: ADDR.REGISTRY,
          functionName: 'createProfile',
          args: [
            nonce,
            values.name,
            metadataStruct,
            values.projectOwner,
            teamMembers,
          ],
        },
        viewParams: {
          loading: {
            title: 'Creating Your Project Profile',
            description:
              'Submitting your project profile to the Allo Registry.',
          },
          success: {
            title: 'Project Profile Created',
            description: 'Your project profile has been created.',
          },
          error: {
            title: 'Something went wrong.',
            fallback:
              'There was an unknown error creating your project profile.',
          },
          successButton: {
            label: 'Go find some Grants!',
            onClick: () => {},
          },
        },
      });
    } catch (error: any) {
      console.error(error);
      notifications.show({
        title: 'Transaction Error',
        message: error.message,
        color: 'red',
      });
    }
  };

  return (
    <form>
      <Stack maw={375} miw={300} w={'100%'} align="center" m="xl">
        <AvatarPickerIPFS
          onUploadSuccess={(hash: string) => {
            notifications.show({
              title: 'IPFS Image Uploaded',
              message: `IPFS Hash: ${hash}`,
            });
            form.setFieldValue('avatarHash', hash);
          }}
          onUploadError={(errMsg: string) => {
            notifications.show({
              title: 'IPFS Upload Error',
              message: errMsg,
              color: 'red',
            });
          }}
          validationError={form.errors.avatarHash}
        />

        <TextInput
          w="100%"
          label="Project Name"
          required
          placeholder="Project Name"
          {...form.getInputProps('name')}
        />
        <AddressBox
          w="100%"
          label="Team Members"
          description={`Team members can edit metadata and apply for grants.`}
          placeholder="Paste addresses here. Must be comma separated."
          {...form.getInputProps('teamMembers')}
          onBlur={() => handleBlur('teamMembers')}
          formSetValue={(addresses: string[]) => {
            form.setFieldValue('teamMembers', addresses);
          }}
        />
        <Textarea
          w="100%"
          label="Mission"
          description="What is your Ship's funding mission? Max 350 characters"
          required
          autosize
          minRows={4}
          maxRows={8}
          placeholder="Project Description"
          {...form.getInputProps('mission')}
          onBlur={() => handleBlur('mission')}
        />
        <Stack w="100%" gap={14}>
          <TextInput
            w="100%"
            label="Links/Contact"
            description="Email is required. Please provide at least one other contact "
            placeholder="Email"
            required
            leftSection={<IconMail />}
            {...form.getInputProps('email')}
            onBlur={() => handleBlur('email')}
          />
          <TextInput
            w="100%"
            placeholder="https://yourwebsite.com"
            leftSection={<IconWorld />}
            {...form.getInputProps('website')}
            onBlur={() => handleBlur('website')}
          />
          <TextInput
            w="100%"
            placeholder="X"
            leftSection={<IconBrandX />}
            {...form.getInputProps('x')}
            onBlur={() => handleBlur('x')}
          />
          <TextInput
            w="100%"
            placeholder="Github"
            leftSection={<IconBrandGithub />}
            {...form.getInputProps('github')}
            onBlur={() => handleBlur('github')}
          />
          <TextInput
            w="100%"
            placeholder="Discord"
            leftSection={<IconBrandDiscord />}
            {...form.getInputProps('discord')}
            onBlur={() => handleBlur('discord')}
          />
          <TextInput
            w="100%"
            placeholder="Telegram"
            leftSection={<IconBrandTelegram />}
            {...form.getInputProps('telegram')}
            onBlur={() => handleBlur('telegram')}
          />
        </Stack>
      </Stack>
    </form>
  );
};
