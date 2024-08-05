import { useState } from 'react';
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
import { UseFormReturnType } from '@mantine/form';
import {
  IconBrandDiscord,
  IconBrandGithub,
  IconBrandTelegram,
  IconBrandX,
  IconLink,
  IconMail,
  IconCameraPlus,
  IconWorld,
} from '@tabler/icons-react';
import { pinFileToIPFS } from '../../utils/ipfs/pin';
import { Link } from 'react-router-dom';
import { TxButton } from '../TxButton';
import { getGatewayUrl } from '../../utils/ipfs/get';
import { ProjectFormValues } from '../../pages/RegisterProject';

export const ProjectMetadataForm = ({
  form,
  onSubmit,
  isEditing,
  projectId,
}: {
  form: UseFormReturnType<any>;
  onSubmit: (values: ProjectFormValues) => void;
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
    ? getGatewayUrl(form.values.bannerImage)
    : null;

  return (
    <ProfileSection
      pageTitle="Register Project"
      bannerImg={bannerPreview || ''}
      bannerBg={isEditing ? theme.colors.dark[7] : undefined}
      spaceToRight={isEditing ? false : true}
      addBannerElement={
        <Box style={{ position: 'absolute', bottom: '30%', right: '50%' }}>
          <FileButton
            onChange={handleUpload}
            accept={'image/png,image/jpeg,image/webp'}
          >
            {(props) => (
              <ActionIcon
                {...props}
                radius={50}
                size="lg"
                bg={'rgba(255, 255, 255, 0.05)'}
                style={{ zIndex: 50 }}
                w={'50px'}
                h={'50px'}
              >
                {isUploadingBanner ? <Loader /> : <IconCameraPlus />}
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
