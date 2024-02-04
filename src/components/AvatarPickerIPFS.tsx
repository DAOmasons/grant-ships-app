import {
  ActionIcon,
  Avatar,
  Box,
  Container,
  FileButton,
  Text,
} from '@mantine/core';
import { IconPencil, IconUser } from '@tabler/icons-react';
import { pinFileToIPFS } from '../utils/ipfs/pin';
import { ReactNode, useState } from 'react';
import { PINATA_GATEWAY } from '../utils/ipfs/gateway';

type PickerProps = {
  onUploadSuccess?: (metadata: string) => void;
  onUploadError?: (errMsg: string) => void;
  onUploadLoad?: () => void;
  validationError?: ReactNode;
};

export const AvatarPickerIPFS = ({
  onUploadError,
  onUploadSuccess,
  onUploadLoad,
  validationError,
}: PickerProps) => {
  const [pfpIpfsHash, setIpfsHash] = useState<string | null>(null);
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
      console.log(res);
      onUploadSuccess?.(res.IpfsHash);
      setIsLoading(false);
    } catch (error: any) {
      console.error(error);
      setIsLoading(false);
      onUploadError?.(error?.message || 'Error uploading file');
    }
  };

  const avatarPreview = pfpIpfsHash ? `${PINATA_GATEWAY}/${pfpIpfsHash}` : null;
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
