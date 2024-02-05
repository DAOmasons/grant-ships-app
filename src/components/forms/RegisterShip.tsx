import {
  Stack,
  TextInput,
  Textarea,
  Button,
  Flex,
  Box,
  em,
} from '@mantine/core';

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
import { registerShipSchema } from './validationSchemas/registerShipSchema';
import { useAccount } from 'wagmi';
import { z } from 'zod';
import Registry from '../../abi/Registry.json';
import { ADDR } from '../../constants/addresses';
import { useTx } from '../../hooks/useTx';
import { generateRandomUint256 } from '../../utils/helpers';
import { pinJSONToIPFS } from '../../utils/ipfs/pin';
import { createMetadata, shipProfileHash } from '../../utils/metadata';
import { useMediaQuery } from '@mantine/hooks';
import { ProfileData } from '../../pages/CreateShip';

type FormValues = z.infer<typeof registerShipSchema>;

export const RegisterShip = ({ nextStep }: { nextStep: () => void }) => {
  const { address } = useAccount();
  const { tx, closeModal } = useTx();
  const isMobile = useMediaQuery(`(max-width: ${em(750)})`);

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
        writeContractOptions: {
          onSuccess(data, variables, context) {
            console.log('data', data);
            console.log('variables', variables);
            console.log('context', context);
          },
          onSettled(data, error) {
            console.log('data', data);
            console.log('error', error);
          },
        },
        viewParams: {
          loading: {
            title: 'Creating Your Ship Profile',
            description:
              'Submitting your Grant Ship profile to the Allo Registry.',
          },
          success: {
            title: 'Grant Ship Profile Created',
            description: 'Your ship profile has been created.',
          },
          error: {
            title: 'Something went wrong.',
            fallback: 'There was an unknown error creating your Ship profile.',
          },
          successButton: {
            label: 'Next Step',
            onClick: () => {
              nextStep();
            },
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
    <form onSubmit={form.onSubmit((values) => handleFormSubmit(values))}>
      <Stack maw={600} miw={300} w={'100%'}>
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
          label="Grant Ship Name"
          maw={292}
          required
          placeholder="ex. Public Goods Death Star"
          {...form.getInputProps('name')}
          onBlur={() => handleBlur('teamMembers')}
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
          description="Max 350 characters"
          required
          autosize
          minRows={4}
          maxRows={8}
          placeholder="What is your Ship's funding mission?"
          {...form.getInputProps('mission')}
          onBlur={() => handleBlur('mission')}
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
                label="Social Media"
                leftSection={<IconBrandX />}
                {...form.getInputProps('x')}
                onBlur={() => handleBlur('x')}
              />
              <TextInput
                w="50%"
                label=" "
                placeholder="Github"
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
                placeholder="Discord"
                leftSection={<IconBrandDiscord />}
                {...form.getInputProps('discord')}
                onBlur={() => handleBlur('discord')}
              />
              <TextInput
                w="50%"
                label=" "
                placeholder="Telegram"
                leftSection={<IconBrandTelegram />}
                {...form.getInputProps('telegram')}
                onBlur={() => handleBlur('telegram')}
              />
            </Flex>
          </Box>
        )}
        <Flex w="100%" mt="md">
          <Button ml="auto" type="submit">
            Create Ship Profile
          </Button>
        </Flex>
      </Stack>
    </form>
  );
};
