import {
  ActionIcon,
  Avatar,
  Box,
  FileButton,
  InputLabel,
  Text,
  useMantineTheme,
} from '@mantine/core';
import { IconCameraPlus } from '@tabler/icons-react';
import { pinFileToIPFS } from '../utils/ipfs/pin';
import { ReactNode, useEffect, useState } from 'react';
import { getGatewayUrl } from '../utils/ipfs/get';

type PickerProps = {
  onUploadSuccess?: (metadata: string) => void;
  onUploadError?: (errMsg: string) => void;
  onUploadLoad?: () => void;
  validationError?: ReactNode;
  defaultValue: string | null;
  disabled?: boolean;
};

export const AvatarPickerIPFS = ({
  onUploadError,
  onUploadSuccess,
  onUploadLoad,
  validationError,
  defaultValue,
  disabled,
}: PickerProps) => {
  const [pfpIpfsHash, setIpfsHash] = useState<string | null>(defaultValue);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const theme = useMantineTheme();

  const handleUpload = async (e: File | null) => {
    if (!e) {
      onUploadError?.('No file selected');
      return;
    }
    setIsLoading(true);
    onUploadLoad?.();
    try {
      const res = await pinFileToIPFS(e);
      if (typeof res.IpfsHash !== 'string') return;
      setIpfsHash(res.IpfsHash);
      onUploadSuccess?.(res.IpfsHash);
      setIsLoading(false);
    } catch (error: any) {
      console.error(error);
      setIsLoading(false);
      onUploadError?.(error?.message || 'Error uploading file');
    }
  };

  useEffect(() => {
    if (!defaultValue) return;
    setIpfsHash(defaultValue);
  }, [defaultValue]);

  const avatarPreview = pfpIpfsHash ? getGatewayUrl(pfpIpfsHash) : null;
  const canPreview = avatarPreview && !isLoading;

  return (
    <>
      <Box pos="relative" mb="lg">
        <Avatar
          size={160}
          src={canPreview ? avatarPreview : undefined}
          bg={theme.colors.dark[5]}
          pos="relative"
        >
          {canPreview || (
            <InputLabel
              c={theme.colors.dark[0]}
              pos="absolute"
              bottom={'51%'}
              right={'35%'}
              required
            ></InputLabel>
          )}
        </Avatar>
        <FileButton
          onChange={handleUpload}
          accept={'image/png,image/jpeg,image/webp'}
        >
          {(props) => (
            <ActionIcon
              {...props}
              pos={'absolute'}
              bottom={'33%'}
              left={'10%'}
              radius="xl"
              bg={'rgba(255, 255, 255, 0.05)'}
              loading={isLoading}
              disabled={isLoading || disabled}
              w={'50px'}
              h={'50px'}
            >
              <IconCameraPlus />
            </ActionIcon>
          )}
        </FileButton>
      </Box>
      {validationError && (
        <Text fz={12} c="red">
          {validationError}
        </Text>
      )}
    </>
  );
};
