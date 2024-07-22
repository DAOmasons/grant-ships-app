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
import { useAccount, useConnect, useSwitchChain } from 'wagmi';
import { createMetadata, projectProfileHash } from '../../utils/metadata';
import { ADDR } from '../../constants/addresses';

import { useTx } from '../../hooks/useTx';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import { pinJSONToIPFS } from '../../utils/ipfs/pin';
import { useMediaQuery } from '@mantine/hooks';
import { ProjectProfileMetadata } from '../../utils/ipfs/metadataValidation';
import { injected } from 'wagmi/connectors';
import { appNetwork } from '../../utils/config';
import { useUserData } from '../../hooks/useUserState';
import { useQuery } from '@tanstack/react-query';
import { getProjectPage } from '../../queries/getProjectPage';
import { useEffect } from 'react';

type FormValues = z.infer<typeof registerProjectSchema>;

export const RegisterProject = () => {
  const { address, isConnected, chainId } = useAccount();
  const { connect } = useConnect();
  const { switchChainAsync } = useSwitchChain();
  const { refetchUser } = useUserData();
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

      const teamMembers = values?.teamMembers?.filter(Boolean);

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
          successButton: {
            label: 'Go find some Grants!',
            onClick: () => navigate('/ships'),
          },
        },
        onComplete() {
          refetchUser();
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
      title={'Register Project Profile'}
      primaryBtn={{
        label: 'Create Project',
        onClick: () => handleFormSubmit(form.values),
      }}
    ></FormPageLayout>
  );
};
