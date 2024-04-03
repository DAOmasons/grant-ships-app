import { ActionIcon, Avatar, Box, FileButton, Text } from '@mantine/core';
import { IconPencil, IconUser } from '@tabler/icons-react';
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
      <Box pos="relative" mb="lg" mt="xl">
        <Avatar size={120} src={canPreview ? avatarPreview : undefined}>
          {canPreview || <IconUser size={80} />}
        </Avatar>
        <FileButton onChange={handleUpload} accept={'image/png,image/jpeg'}>
          {(props) => (
            <ActionIcon
              {...props}
              pos={'absolute'}
              bottom={0}
              left={85}
              radius="xl"
              loading={isLoading}
              disabled={isLoading || disabled}
            >
              <IconPencil />
            </ActionIcon>
          )}
        </FileButton>
      </Box>
      {validationError && (
        <Text fz={12} color="red">
          {validationError}
        </Text>
      )}
    </>
  );
};
