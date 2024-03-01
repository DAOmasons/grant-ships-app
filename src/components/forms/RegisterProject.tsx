import { Box, Flex, Stack, TextInput, Textarea, em } from '@mantine/core';

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
import { useAccount } from 'wagmi';
import { createMetadata, projectProfileHash } from '../../utils/metadata';
import { ADDR } from '../../constants/addresses';

import { useTx } from '../../hooks/useTx';
import { useNavigate } from 'react-router-dom';

import { pinJSONToIPFS } from '../../utils/ipfs/pin';
import { useMediaQuery } from '@mantine/hooks';
import { ProjectProfileMetadata } from '../../utils/ipfs/metadataValidation';

type FormValues = z.infer<typeof registerProjectSchema>;

export const RegisterProject = () => {
  const { address } = useAccount();
  const isMobile = useMediaQuery(`(max-width: ${em(750)})`);

  const { tx } = useTx();

  const form = useForm({
    initialValues: {
      avatarHash: '',
      name: '',
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

  const navigate = useNavigate();

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

      const validation = ProjectProfileMetadata.safeParse(projectMetadata);

      if (!validation.success) {
        notifications.show({
          title: 'Validation Error',
          message: validation.error.errors[0].message,
          color: 'red',
        });
        return;
      }

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
      const schemaCode = projectProfileHash();

      const metadataStruct = createMetadata({
        protocol: schemaCode,
        ipfsHash: pinRes.IpfsHash,
      });

      tx({
        writeContractParams: {
          abi: Registry,
          address: ADDR.REGISTRY,
          functionName: 'createProfile',
          args: [nonce, values.name, metadataStruct, address, teamMembers],
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
            onClick: () => navigate('/ships'),
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
        defaultValue={form.values.avatarHash}
      />

      <TextInput
        w="100%"
        label="Project Name"
        required
        maw={292}
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
      {isMobile ? (
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
      ) : (
        <Box>
          <Flex gap="md" mb="lg">
            <TextInput
              w="100%"
              label="Email"
              placeholder="email@email.mail"
              required
              leftSection={<IconMail />}
              {...form.getInputProps('email')}
              onBlur={() => handleBlur('email')}
            />
            <TextInput
              w="100%"
              label="Website"
              placeholder="https://yourwebsite.com"
              leftSection={<IconWorld />}
              {...form.getInputProps('website')}
              onBlur={() => handleBlur('website')}
            />
          </Flex>
          <Flex align={'flex-start'}>
            <TextInput
              w="50%"
              mr={'md'}
              placeholder="X"
              label="https://x.com/daomasons"
              leftSection={<IconBrandX />}
              {...form.getInputProps('x')}
              onBlur={() => handleBlur('x')}
            />
            <TextInput
              w="50%"
              label=" "
              placeholder="https://github.com/DAOmasons"
              leftSection={<IconBrandGithub />}
              {...form.getInputProps('github')}
              onBlur={() => handleBlur('github')}
            />
          </Flex>
          <Flex mb="lg" align={'flex-start'}>
            <TextInput
              w="50%"
              label=" "
              mr={'md'}
              placeholder="https://discord.gg/your-server"
              leftSection={<IconBrandDiscord />}
              {...form.getInputProps('discord')}
              onBlur={() => handleBlur('discord')}
            />
            <TextInput
              w="50%"
              label=" "
              placeholder="https://t.me/your-telegram"
              leftSection={<IconBrandTelegram />}
              {...form.getInputProps('telegram')}
              onBlur={() => handleBlur('telegram')}
            />
          </Flex>
        </Box>
      )}
    </FormPageLayout>
  );
};
