import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import { Button, Stack, TextInput, Textarea } from '@mantine/core';

import { FormPageLayout } from '../../layout/FormPageLayout';
import {
  IconBrandDiscord,
  IconBrandGithub,
  IconBrandTelegram,
  IconBrandX,
  IconMail,
} from '@tabler/icons-react';
import { AvatarPickerIPFS } from '../../components/AvatarPickerIPFS';
import { notifications } from '@mantine/notifications';
import { AddressBox } from '../../components/AddressBox';
import Registry from '../../abi/Registry.json';

import { useForm, zodResolver } from '@mantine/form';
import { FormEvent } from 'react';
import { registerProjectSchema } from './validationSchemas/registerProjectSchema';
import { z } from 'zod';
import { generateNonce } from '../../utils/helpers';
import { pinJSONToIPFS } from '../../utils/ipfs/pin';
import { useAccount, useConfig, useWriteContract } from 'wagmi';
import { createMetadata, projectProfileHash } from '../../utils/metadata';
import { ADDR } from '../../constants/addresses';
import { arbitrumSepolia } from 'viem/chains';

type FormValues = z.infer<typeof registerProjectSchema>;

export const RegisterProject = () => {
  const { address, isConnected } = useAccount();

  const { data: hash, writeContract, error } = useWriteContract();

  console.log('hash', hash);
  console.log('error', error);

  const config = useConfig();

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
    console.log('test');

    const nonce = generateNonce();

    const metadata = {
      name: 'test',
      description: 'test',
      avatarHash_IPFS: 'test',
      email: 'test',
      x: 'test',
      github: 'test',
      discord: 'test',
      telegram: 'test',
    };

    const pinRes = await pinJSONToIPFS(metadata);

    if (!pinRes?.IpfsHash) {
      notifications.show({
        title: 'IPFS Upload Error',
        message: "Pin to IPFS didn't return an IPFS hash",
        color: 'red',
      });
      return;
    }

    console.log('isConnected', isConnected);

    const teamMembers = [
      '0xDE6bcde54CF040088607199FC541f013bA53C21E',
      '0x57abda4ee50Bb3079A556C878b2c345310057569',
      '0xD800B05c70A2071BC1E5Eac5B3390Da1Eb67bC9D',
    ];

    console.log('config', config);

    writeContract({
      abi: Registry,

      chainId: arbitrumSepolia.id,
      address: ADDR.REGISTRY,
      functionName: 'createProfile',
      args: [
        33,
        // nonce,
        'test',

        createMetadata({
          protocol: projectProfileHash(),
          ipfsHash: pinRes.IpfsHash,
        }),
        address,
        teamMembers,
      ],
    });
  };

  const handleFormSubmit = async (
    values: FormValues,
    e?: FormEvent<HTMLFormElement>
  ) => {
    e?.preventDefault();
    const res = form.validate();

    if (res.hasErrors) return;

    const nonce = generateNonce();

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
    console.log('isConnected', isConnected);
    console.log('Registry', Registry);
    console.log('ADDR.REGISTRY', ADDR.REGISTRY);
    console.log('nonce', nonce);
    console.log('values.name', values.name);
    console.log(
      'createMetadata',
      createMetadata({
        protocol: projectProfileHash(),
        ipfsHash: pinRes.IpfsHash,
      })
    );
    console.log('address', address);
    console.log('values.teamMembers', values.teamMembers);

    const tx = await writeContract({
      abi: Registry,
      address: ADDR.REGISTRY,
      functionName: 'createProfile',
      args: [
        nonce,
        values.name,
        createMetadata({
          protocol: projectProfileHash(),
          ipfsHash: pinRes.IpfsHash,
        }),
        address,
        values.teamMembers,
      ],
    });

    console.log('tx', tx);
  };

  const handleBlur = (fieldName: string) => {
    form.validateField(fieldName);
  };

  const hasErrors = Object.keys(form.errors).length > 0;
  return (
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
        <Button onClick={() => handleTest()}>Test</Button>
      </Stack>
    </FormPageLayout>
  );
};
