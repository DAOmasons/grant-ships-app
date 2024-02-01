import { Stack, TextInput, Textarea } from '@mantine/core';

import { FormPageLayout } from '../../layout/FormPageLayout';
import {
  IconBrandDiscord,
  IconBrandGithub,
  IconBrandTelegram,
  IconBrandX,
  IconMail,
  IconWorld,
} from '@tabler/icons-react';
import { AvatarPickerIPFS } from '../../components/AvatarPickerIPFS';
import { notifications } from '@mantine/notifications';
import { AddressBox } from '../../components/AddressBox';
import Registry from '../../abi/Registry.json';

import { useForm, zodResolver } from '@mantine/form';
import { registerProjectSchema } from './validationSchemas/registerProjectSchema';
import { z } from 'zod';
import { generateRandomUint256 } from '../../utils/helpers';
import { pinJSONToIPFS } from '../../utils/ipfs/pin';
import { useAccount } from 'wagmi';
import { createMetadata, projectProfileHash } from '../../utils/metadata';
import { ADDR } from '../../constants/addresses';

import { useTx } from '../../hooks/useTx';

type FormValues = z.infer<typeof registerProjectSchema>;

export const RegisterProject = () => {
  const { address } = useAccount();

  const { tx } = useTx();

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
      website: '',
    },
    validate: zodResolver(registerProjectSchema),
  });

  const handleFormSubmit = async (values: FormValues) => {
    try {
      const nonce = generateRandomUint256();

      const projectMetadata = {
        name: values.name,
        description: values.description,
        avatarHash_IPFS: values.avatarHash,
        email: values.email,
        x: values.x,
        github: values.github,
        discord: values.discord,
        telegram: values.telegram,
        website: values.website,
      };

      const testData = {
        name: 'test2',
        description: 'test2',
        avatarHash_IPFS: 'test2',
        email: 'test2',
        x: 'test2',
        github: 'test2',
        discord: 'test2',
        telegram: 'test2',
        website: 'test2',
      };

      const pinRes = await pinJSONToIPFS(testData);
      console.log('pinRes', pinRes);
      if (!pinRes?.IpfsHash) {
        notifications.show({
          title: 'IPFS Upload Error',
          message: pinRes.message,
          color: 'red',
        });
        return;
      }

      const teamMembers = values.teamMembers.filter(Boolean);
      const schemaCode = projectProfileHash();

      const metadataStruct = createMetadata({
        protocol: schemaCode,
        ipfsHash: pinRes.IpfsHash,
      });
      console.log('metadataStruct', metadataStruct);
      console.log('schemaCode', schemaCode);
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

  const handleBlur = (fieldName: string) => {
    form.validateField(fieldName);
  };

  return (
    <FormPageLayout
      title="Register Project Profile"
      onSubmit={form.onSubmit((values) => handleFormSubmit(values))}
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
    </FormPageLayout>
  );
};
