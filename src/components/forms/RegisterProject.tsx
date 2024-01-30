import {
  Button,
  Group,
  Loader,
  Modal,
  Stack,
  Text,
  TextInput,
  Textarea,
  useMantineTheme,
} from '@mantine/core';

import { FormPageLayout } from '../../layout/FormPageLayout';
import {
  IconBrandDiscord,
  IconBrandGithub,
  IconBrandTelegram,
  IconBrandX,
  IconCheck,
  IconCircleX,
  IconMail,
  IconUfo,
} from '@tabler/icons-react';
import { AvatarPickerIPFS } from '../../components/AvatarPickerIPFS';
import { notifications } from '@mantine/notifications';
import { AddressBox } from '../../components/AddressBox';
import Registry from '../../abi/Registry.json';

import { useForm, zodResolver } from '@mantine/form';
import { FormEvent, ReactNode, useMemo, useState } from 'react';
import { registerProjectSchema } from './validationSchemas/registerProjectSchema';
import { z } from 'zod';
import { generateRandomUint256 } from '../../utils/helpers';
import { pinJSONToIPFS } from '../../utils/ipfs/pin';
import { useAccount } from 'wagmi';
import { createMetadata, shipProfileHash } from '../../utils/metadata';
import { ADDR } from '../../constants/addresses';
import { useDisclosure } from '@mantine/hooks';
import { TxStates } from '../../types/common';
import classes from './txModalStyles.module.css';
import { generateTxNerdLabels } from '../../utils/tx';
import { useTx } from '../../hooks/useTx';

type FormValues = z.infer<typeof registerProjectSchema>;

export const RegisterProject = () => {
  const { address } = useAccount();

  const {
    writeContract,
    isAwaitingSignature,
    isConfirming,
    isConfirmed,
    isError,
  } = useTx();

  const [opened, { open, close }] = useDisclosure(false);
  const [txState, setTxState] = useState<TxStates>(TxStates.Idle);

  const form = useForm({
    initialValues: {
      avatarHash: '',
      name: '',
      projectOwner: address || '',
      teamMembers: [''],
      description: '',
      email: '',
      x: '',
      github: '',
      discord: '',
      telegram: '',
    },
    validate: zodResolver(registerProjectSchema),
  });

  const handleTest = async () => {
    try {
      const nonce = generateRandomUint256();

      const shipMetadata = {
        name: 'test',
        mission: 'test',
        avatarHash_IPFS: 'test',
        email: 'test',
        x: 'test',
        github: 'test',
        discord: 'test',
        telegram: 'test',
        website: 'test',
      };

      open();
      const pinRes = await pinJSONToIPFS(shipMetadata);

      if (!pinRes?.IpfsHash) {
        setTxState(TxStates.Error);
        return;
      }

      const teamMembers = [
        '0xDE6bcde54CF040088607199FC541f013bA53C21E',
        '0x57abda4ee50Bb3079A556C878b2c345310057569',
        '0xD800B05c70A2071BC1E5Eac5B3390Da1Eb67bC9D',
      ];

      writeContract({
        abi: Registry,
        address: ADDR.REGISTRY,
        functionName: 'createProfile',
        args: [
          nonce,
          'test',
          createMetadata({
            protocol: shipProfileHash(),
            ipfsHash: pinRes.IpfsHash,
          }),
          address,
          teamMembers,
        ],
      });
    } catch (error: any) {
      console.error(error);
      setTxState(TxStates.Error);
      notifications.show({
        title: 'Transaction Error',
        message: error.message,
        color: 'red',
      });
    }
  };

  const handleFormSubmit = async (
    values: FormValues,
    e?: FormEvent<HTMLFormElement>
  ) => {
    e?.preventDefault();
    const res = form.validate();

    if (res.hasErrors) return;

    const nonce = generateRandomUint256();

    const metadata = {
      name: values.name,
      description: values.description,
      avatarHash_IPFS: values.avatarHash,
      email: values.email,
      x: values.x,
      github: values.github,
      discord: values.discord,
      telegram: values.telegram,
    };

    const pinRes = await pinJSONToIPFS(metadata);

    if (!pinRes.IpfsHash) {
      notifications.show({
        title: 'IPFS Upload Error',
        message: pinRes.message,
        color: 'red',
      });
      return;
    }
  };

  const handleBlur = (fieldName: string) => {
    form.validateField(fieldName);
  };

  const hasErrors = Object.keys(form.errors).length > 0;

  const txModalContent = useMemo(() => {
    if (isConfirming || isAwaitingSignature) {
      return (
        <LoadingState
          title="Creating Your Project Profile"
          description="Submitting your project profile to the Allo Registry."
          nerdDetails={generateTxNerdLabels(txState)}
          txHash="/"
        />
      );
    }

    if (isConfirmed) {
      return (
        <SuccessState
          title="Project Profile Created"
          description="Your project profile has been created."
          ctaElement={
            <Button onClick={() => {}} w="65%">
              Go Find Grants
            </Button>
          }
          txHash="/"
        />
      );
    }

    if (isError) {
      return (
        <ErrorState
          title="Something went wrong"
          description="Tells which thing failed"
          nerdDetails="State: Possibly tells you how it failed"
          txHash="/"
        />
      );
    }
  }, [isConfirmed, isConfirming, txState, isAwaitingSignature, isError]);

  return (
    <>
      <FormPageLayout
        title="Register Project Profile"
        disableSubmit={hasErrors}
        onSubmit={form.onSubmit((values, e) => handleFormSubmit(values, e))}
        primaryBtn={{
          label: 'Create Project',
          onClick: () => {
            console.log('create project');
          },
        }}
        secondaryBtn={{
          label: 'Back',
          onClick: () => {
            console.log('go back');
          },
        }}
        backBtn={{
          label: 'Back',
          onClick: () => {
            console.log('go back');
          },
        }}
      >
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
        <TextInput
          w="100%"
          label="Project Owner"
          description="Project owner has permissions to edit metadata, team members, apply for grants, and transfer ownership."
          required
          placeholder="0x000"
          {...form.getInputProps('projectOwner')}
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
          label="Short Project Description"
          description="Max 350 characters"
          required
          autosize
          minRows={4}
          maxRows={8}
          placeholder="Project Description"
          {...form.getInputProps('description')}
          onBlur={() => handleBlur('description')}
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
          <Button onClick={() => handleTest()} type="button">
            Test
          </Button>
        </Stack>
      </FormPageLayout>
      <Modal opened={opened} onClose={close} centered>
        {txModalContent}
      </Modal>
    </>
  );
};

const LoadingState = ({
  title,
  description,
  nerdDetails,
  txHash,
}: {
  title?: string;
  description?: string;
  nerdDetails?: string;
  txHash?: string;
}) => {
  const theme = useMantineTheme();
  return (
    <Stack align="center" mt={-14} pb={'xl'}>
      <Loader type="ring" style={{ width: '8rem', height: '8rem' }} />
      <Text size="lg">{title}</Text>
      <Text size="sm" c={theme.colors.dark[2]}>
        {description}
      </Text>
      <Text size="sm" c={theme.colors.dark[2]}>
        {nerdDetails}
      </Text>
      {txHash && (
        <Text
          component={'a'}
          size="sm"
          rel="noopener noreferrer"
          target="_blank"
          td="underline"
          style={{ cursor: 'pointer' }}
          c={theme.colors.dark[3]}
        >
          View on Etherscan
        </Text>
      )}
    </Stack>
  );
};

const SuccessState = ({
  title,
  description,
  ctaElement,
  txHash,
}: {
  title?: string;
  description?: string;
  ctaElement?: ReactNode;
  txHash?: string;
}) => {
  const theme = useMantineTheme();
  return (
    <Stack align="center" pb={'xl'}>
      <div className={classes.ufo}>
        <IconUfo size={80} color={theme.colors.blue[4]} />
      </div>
      <Group gap={6}>
        <Text size="lg">{title}</Text>
        <IconCheck size={24} />
      </Group>
      <Text size="sm" c={theme.colors.dark[2]}>
        {description}
      </Text>
      {ctaElement}
      {txHash && (
        <Text
          component={'a'}
          size="sm"
          rel="noopener noreferrer"
          target="_blank"
          td="underline"
          style={{ cursor: 'pointer' }}
          c={theme.colors.dark[3]}
        >
          View on Etherscan
        </Text>
      )}
    </Stack>
  );
};

const ErrorState = ({
  title,
  description,
  nerdDetails,
  txHash,
}: {
  title?: string;
  description?: string;
  nerdDetails?: string;
  txHash?: string;
}) => {
  const theme = useMantineTheme();
  return (
    <Stack align="center" pb={'xl'}>
      <IconCircleX size={80} color={theme.colors.red[4]} />
      <Text size="lg">{title}</Text>
      <Text size="sm" c={theme.colors.dark[2]}>
        {description}
      </Text>
      <Text size="sm" c={theme.colors.dark[2]}>
        {nerdDetails}
      </Text>
      {txHash && (
        <Text
          component={'a'}
          size="sm"
          rel="noopener noreferrer"
          target="_blank"
          td="underline"
          style={{ cursor: 'pointer' }}
          c={theme.colors.dark[3]}
        >
          View on Etherscan
        </Text>
      )}
    </Stack>
  );
};
