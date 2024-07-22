import React, { useEffect, useState } from 'react';
import { ProfileSection } from '../../layout/Sections';
import {
  ActionIcon,
  Box,
  Button,
  FileButton,
  Flex,
  Group,
  Loader,
  Stack,
  Text,
  TextInput,
  Textarea,
  useMantineTheme,
} from '@mantine/core';
import { useMobile } from '../../hooks/useBreakpoint';
import { AvatarPickerIPFS } from '../AvatarPickerIPFS';
import { notifications } from '@mantine/notifications';
import { AddressBox } from '../AddressBox';
import { UseFormReturnType, useForm, zodResolver } from '@mantine/form';
import { registerProjectSchema } from './validationSchemas/registerProjectSchema';
import { z } from 'zod';
import {
  IconBrandDiscord,
  IconBrandGithub,
  IconBrandTelegram,
  IconBrandX,
  IconLink,
  IconMail,
  IconPencil,
  IconWorld,
} from '@tabler/icons-react';
import { generateRandomUint256 } from '../../utils/helpers';
import { ProjectProfileMetadata } from '../../utils/ipfs/metadataValidation';
import { pinFileToIPFS, pinJSONToIPFS } from '../../utils/ipfs/pin';
import { createMetadata, projectProfileHash } from '../../utils/metadata';
import { useAccount } from 'wagmi';
import { useUserData } from '../../hooks/useUserState';
import { useTx } from '../../hooks/useTx';
import Registry from '../../abi/Registry.json';
import { ADDR } from '../../constants/addresses';
import { Link, Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import { TxButton } from '../TxButton';
import { MediaForm } from './MediaForm';
import { getGatewayUrl } from '../../utils/ipfs/get';
import { MediaType, ShowcaseLink } from '../../utils/media';
import { ProjectPageUI } from '../../types/ui';

type FormValues = z.infer<typeof registerProjectSchema>;

export const NewRegisterProject = ({
  existingProject,
}: {
  existingProject?: ProjectPageUI;
}) => {
  const { address } = useAccount();
  const { refetchUser } = useUserData();
  const navigate = useNavigate();
  const { tx } = useTx();

  const isEditing = !!existingProject;

  const form = useForm({
    validateInputOnBlur: true,
    initialValues: {
      avatarHash: existingProject?.avatarHash || '',
      name: existingProject?.name || '',
      description: existingProject?.description || '',
      email: existingProject?.email || '',
      x: existingProject?.x || '',
      github: existingProject?.github || '',
      discord: existingProject?.discord || '',
      telegram: existingProject?.telegram || '',
      website: existingProject?.website || '',
      showcaseLinks:
        existingProject?.showcaseLinks ||
        ([
          {
            id: 'showcase-link-0',
            url: '',
            mediaType: MediaType.None,
          },
        ] as ShowcaseLink[]),
      mainDemoLink: existingProject?.mainDemoLink || '',
      bannerImage: existingProject?.bannerImage || '',
    },
    validate: zodResolver(registerProjectSchema),
  });

  const handleSubmit = async (values: FormValues) => {
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
        bannerImage: values.bannerImage || null,
        showcaseLinks:
          values.showcaseLinks && values.showcaseLinks.length
            ? values.showcaseLinks.filter(
                (link) =>
                  link.mediaType !== MediaType.None &&
                  link.mediaType !== MediaType.Unknown
              )
            : null,
        mainDemoLink: values.mainDemoLink || null,
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

      const pinRes = await pinJSONToIPFS(validation.data);

      if (typeof pinRes.IpfsHash !== 'string' && pinRes.IpfsHash[0] !== 'Q') {
        notifications.show({
          title: 'IPFS Upload Error',
          message: pinRes.IpfsHash[1],
          color: 'red',
        });
        return;
      }

      const schemaCode = projectProfileHash();
      const metadataStruct = createMetadata({
        protocol: schemaCode,
        ipfsHash: pinRes.IpfsHash,
      });

      if (isEditing) {
        if (!existingProject || !existingProject?.profileId) {
          notifications.show({
            title: 'Error',
            message: 'Existing project not found',
            color: 'red',
          });
          return;
        }
        console.log('IS EDITING!!!');
        tx({
          writeContractParams: {
            abi: Registry,
            address: ADDR.REGISTRY,
            functionName: 'updateProfileMetadata',
            args: [existingProject?.profileId, [1n, pinRes.IpfsHash]],
          },
          viewParams: {
            successButton: {
              label: 'Go see your project!',
              onClick: () => navigate(`/project/${existingProject.id}`),
            },
          },
          onComplete() {
            // refetch();
            refetchUser();
          },
        });
      } else {
        tx({
          writeContractParams: {
            abi: Registry,
            address: ADDR.REGISTRY,
            functionName: 'createProfile',
            args: [nonce, values.name, metadataStruct, address, []],
          },
          viewParams: {
            successButton: {
              label: 'Go find some Grants!',
              onClick: () => navigate('/ships'),
            },
          },
          onComplete() {
            refetchUser();
          },
        });
      }
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
    <>
      <Routes>
        <Route
          path="/"
          element={
            <RegisterForm
              form={form}
              onSubmit={handleSubmit}
              isEditing={isEditing}
              projectId={existingProject?.id}
            />
          }
        />
        <Route
          path="edit"
          element={
            <RegisterForm
              form={form}
              onSubmit={handleSubmit}
              isEditing={isEditing}
              projectId={existingProject?.id}
            />
          }
        />
        <Route path="edit-media" element={<MediaForm form={form} />} />
      </Routes>
    </>
  );
};

const RegisterForm = ({
  form,
  onSubmit,
  isEditing,
  projectId,
}: {
  form: UseFormReturnType<any>;
  onSubmit: (values: FormValues) => void;
  isEditing?: boolean;
  projectId?: string;
}) => {
  const [isUploadingBanner, setIsUploadingBanner] = useState(false);
  const theme = useMantineTheme();
  const isMobile = useMobile();

  const handleUpload = async (e: File | null) => {
    if (!e) {
      notifications.show({
        title: 'No file selected',
        message: 'Please select an image file to upload',
        color: 'red',
      });
      return;
    }
    setIsUploadingBanner(true);
    try {
      const res = await pinFileToIPFS(e);
      if (typeof res.IpfsHash !== 'string') return;
      form.setFieldValue('bannerImage', res.IpfsHash);
      setIsUploadingBanner(false);

      notifications.show({
        title: 'IPFS Image Uploaded',
        message: `IPFS Hash: ${res.IpfsHash}`,
        color: 'green',
      });
    } catch (error: any) {
      console.error(error);
      setIsUploadingBanner(false);
      notifications.show({
        title: 'Error Uploading Image',
        message: error?.message || 'Error uploading file',
        color: 'red',
      });
    }
  };

  const bannerPreview = form.values.bannerImage
    ? form.values.bannerImage.startsWith('https://')
      ? form.values.bannerImage
      : getGatewayUrl(form.values.bannerImage)
    : null;

  return (
    <ProfileSection
      pageTitle="Register Project"
      bannerImg={bannerPreview || ''}
      bannerBg={isEditing ? theme.colors.dark[7] : undefined}
      spaceToRight={isEditing ? false : true}
      addBannerElement={
        <Box style={{ position: 'absolute', bottom: -20, right: 10 }}>
          <FileButton
            onChange={handleUpload}
            accept={'image/png,image/jpeg,image/webp'}
          >
            {(props) => (
              <ActionIcon {...props} radius={50} variant="secondary">
                {isUploadingBanner ? <Loader /> : <IconPencil />}
              </ActionIcon>
            )}
          </FileButton>
        </Box>
      }
    >
      <Stack maw={600} miw={300} w={'100%'} mb={isMobile ? 72 : 'xl'}>
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
          disabled={isEditing}
          {...form.getInputProps('name')}
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
            />
            <TextInput
              w="100%"
              placeholder="https://yourwebsite.com"
              leftSection={<IconWorld />}
              {...form.getInputProps('website')}
            />
            <TextInput
              w="100%"
              placeholder="X"
              leftSection={<IconBrandX />}
              {...form.getInputProps('x')}
            />
            <TextInput
              w="100%"
              placeholder="Github"
              leftSection={<IconBrandGithub />}
              {...form.getInputProps('github')}
            />
            <TextInput
              w="100%"
              placeholder="Discord"
              leftSection={<IconBrandDiscord />}
              {...form.getInputProps('discord')}
            />
            <TextInput
              w="100%"
              placeholder="Telegram"
              leftSection={<IconBrandTelegram />}
              {...form.getInputProps('telegram')}
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
              />
              <TextInput
                w="100%"
                label="Website"
                placeholder="https://yourwebsite.com"
                leftSection={<IconWorld />}
                {...form.getInputProps('website')}
              />
            </Flex>
            <Flex align={'flex-start'}>
              <TextInput
                w="50%"
                mr={'md'}
                placeholder="https://x.com/daomasons"
                label="Social Links"
                leftSection={<IconBrandX />}
                {...form.getInputProps('x')}
              />
              <TextInput
                w="50%"
                label=" "
                placeholder="https://github.com/DAOmasons"
                leftSection={<IconBrandGithub />}
                {...form.getInputProps('github')}
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
              />
              <TextInput
                w="50%"
                label=" "
                placeholder="https://t.me/your-telegram"
                leftSection={<IconBrandTelegram />}
                {...form.getInputProps('telegram')}
              />
            </Flex>
          </Box>
        )}
        <Box>
          <Text fw={600}>Manage Media</Text>
          <Text fz="sm" opacity={0.8} mb="sm">
            Display media/link to your project (optional).
          </Text>
          <Button
            variant="secondary"
            leftSection={<IconLink />}
            component={Link}
            to={
              isEditing && projectId
                ? `/project/${projectId}/edit-media`
                : 'edit-media'
            }
          >
            Manage
          </Button>
        </Box>
        <Group w="100%" justify="flex-end">
          <TxButton
            onClick={() => onSubmit(form.values)}
            disabled={!form.isValid()}
          >
            {isEditing ? 'Edit Project' : 'Register Project'}
          </TxButton>
        </Group>
      </Stack>
    </ProfileSection>
  );
};
