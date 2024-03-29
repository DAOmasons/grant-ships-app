import {
  Stack,
  TextInput,
  Textarea,
  Button,
  Flex,
  Box,
  em,
  Alert,
  Text,
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
import { useEffect } from 'react';
import { CacheKeys } from './cacheKeys';
import { ShipProfileMetadata } from '../../utils/ipfs/metadataValidation';
import { TxButton } from '../TxButton';

type FormValues = z.infer<typeof registerShipSchema>;

const defaultFormValues: FormValues = {
  avatarHash: '',
  name: '',
  teamMembers: [],
  mission: '',
  email: '',
  x: '',
  github: '',
  discord: '',
  telegram: '',
  website: '',
};

export const RegisterShip = ({
  nextStep,
  profileData,
  deleteCache,
}: {
  profileData?: ProfileData;
  nextStep: () => void;
  deleteCache?: () => void;
}) => {
  const { address } = useAccount();
  const { tx } = useTx();
  const isMobile = useMediaQuery(`(max-width: ${em(750)})`);

  const form = useForm({
    initialValues: defaultFormValues,
    validate: zodResolver(registerShipSchema),
  });

  useEffect(() => {
    const storedValues = window.localStorage.getItem(CacheKeys.ShipProfileForm);

    if (storedValues) {
      try {
        form.setValues(JSON.parse(storedValues));
      } catch (error) {
        console.warn('Failed to parse stored values');
      }
    }
    // only want to run this on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(
    () => {
      if (form.isTouched()) {
        window.localStorage.setItem(
          CacheKeys.ShipProfileForm,
          JSON.stringify(form.values)
        );
      }
    },
    // Only want to run this on form change
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [form.values]
  );

  const handleBlur = (fieldName: string) => {
    form.validateField(fieldName);
  };

  const handleFormSubmit = async (values: FormValues) => {
    const results = form.validate();

    if (results.hasErrors) {
      notifications.show({
        title: 'Uncaught validation error',
        message: Object.values(results.errors).join(' || '),
        color: 'red',
      });
      return;
    }
    if (!address) {
      notifications.show({
        title: 'Account Error',
        message: 'No account found',
        color: 'red',
      });
      return;
    }

    try {
      const nonce = generateRandomUint256();

      const projectMetadata = {
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

      const validate = ShipProfileMetadata.safeParse(projectMetadata);

      if (!validate.success) {
        console.error('Invalid metadata', validate.error);
        notifications.show({
          title: 'Invalid Metadata',
          message: "Metadata didn't match validation schema",
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
          args: [nonce, values.name, metadataStruct, address, teamMembers],
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

  const hasSubmitted = profileData !== undefined;

  const handleDeleteCache = () => {
    form.setValues(defaultFormValues);
    deleteCache?.();
  };

  return (
    <form>
      <Stack maw={600} miw={300} w={'100%'}>
        <AvatarPickerIPFS
          defaultValue={form.values.avatarHash || null}
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
          disabled={hasSubmitted}
        />
        {profileData && (
          <Alert>
            <Text fz="md" fw={600} mb={'xs'}>
              Profile Data Submitted
            </Text>
            <Text mb="xs">
              You have already submitted an onchain ship profile. If you would
              like to create a new profile, you can delete your cache and start
              over
            </Text>
            <Button size="xs" onClick={handleDeleteCache}>
              Delete Cache
            </Button>
          </Alert>
        )}
        <TextInput
          label="Grant Ship Name"
          maw={292}
          required
          placeholder="ex. Public Goods Death Star"
          {...form.getInputProps('name')}
          onBlur={() => handleBlur('teamMembers')}
          disabled={hasSubmitted}
        />
        <AddressBox
          w="100%"
          label="Team Members"
          description={`Must be comma separated. Team members can edit metadata and apply for grants. You do not need to enter your own address as you are already the profile owner`}
          placeholder="Paste addresses here. Must be comma separated."
          {...form.getInputProps('teamMembers')}
          onBlur={() => handleBlur('teamMembers')}
          formSetValue={(addresses: string[]) => {
            form.setFieldValue('teamMembers', addresses);
          }}
          disabled={hasSubmitted}
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
          disabled={hasSubmitted}
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
              disabled={hasSubmitted}
            />
            <TextInput
              w="100%"
              placeholder="https://yourwebsite.com"
              leftSection={<IconWorld />}
              {...form.getInputProps('website')}
              onBlur={() => handleBlur('website')}
              disabled={hasSubmitted}
            />
            <TextInput
              w="100%"
              placeholder="X"
              leftSection={<IconBrandX />}
              {...form.getInputProps('x')}
              onBlur={() => handleBlur('x')}
              disabled={hasSubmitted}
            />
            <TextInput
              w="100%"
              placeholder="Github"
              leftSection={<IconBrandGithub />}
              {...form.getInputProps('github')}
              onBlur={() => handleBlur('github')}
              disabled={hasSubmitted}
            />
            <TextInput
              w="100%"
              placeholder="Discord"
              leftSection={<IconBrandDiscord />}
              {...form.getInputProps('discord')}
              onBlur={() => handleBlur('discord')}
              disabled={hasSubmitted}
            />
            <TextInput
              w="100%"
              placeholder="Telegram"
              leftSection={<IconBrandTelegram />}
              {...form.getInputProps('telegram')}
              onBlur={() => handleBlur('telegram')}
              disabled={hasSubmitted}
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
                disabled={hasSubmitted}
              />
              <TextInput
                w="100%"
                label="Website"
                placeholder="https://yourwebsite.com"
                leftSection={<IconWorld />}
                {...form.getInputProps('website')}
                onBlur={() => handleBlur('website')}
                disabled={hasSubmitted}
              />
            </Flex>
            <Flex align={'flex-start'}>
              <TextInput
                w="50%"
                mr={'md'}
                placeholder="https://x.com/daomasons"
                label="Social Media"
                leftSection={<IconBrandX />}
                {...form.getInputProps('x')}
                onBlur={() => handleBlur('x')}
                disabled={hasSubmitted}
              />
              <TextInput
                w="50%"
                label=" "
                placeholder="https://github.com/DAOmasons"
                leftSection={<IconBrandGithub />}
                {...form.getInputProps('github')}
                onBlur={() => handleBlur('github')}
                disabled={hasSubmitted}
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
                disabled={hasSubmitted}
              />
              <TextInput
                w="50%"
                label=" "
                placeholder="https://t.me/your-telegram"
                leftSection={<IconBrandTelegram />}
                {...form.getInputProps('telegram')}
                onBlur={() => handleBlur('telegram')}
                disabled={hasSubmitted}
              />
            </Flex>
          </Box>
        )}
        <Flex w="100%" mt="md">
          {profileData ? (
            <Button ml="auto" type="button" onClick={nextStep}>
              Next Step
            </Button>
          ) : (
            <TxButton ml="auto" onClick={() => handleFormSubmit(form.values)}>
              Create Ship Profile
            </TxButton>
          )}
        </Flex>
      </Stack>
    </form>
  );
};
