import { useForm, zodResolver } from '@mantine/form';
import { ProfileData } from '../../pages/CreateShip';

import {
  Button,
  Flex,
  Stack,
  Text,
  TextInput,
  Textarea,
  em,
} from '@mantine/core';
import { IconExternalLink } from '@tabler/icons-react';
import { useMediaQuery } from '@mantine/hooks';
import { shipApplicationSchema } from './validationSchemas/shipApplicationSchema';
import { z } from 'zod';
import { pinJSONToIPFS } from '../../utils/ipfs/pin';
import { notifications } from '@mantine/notifications';
import { createMetadata } from '../../utils/metadata';
import { Address, encodeAbiParameters, parseAbiParameters } from 'viem';

import AlloAbi from '../../abi/Allo.json';
import { ADDR } from '../../constants/addresses';
import { useTx } from '../../hooks/useTx';
import { useNavigate } from 'react-router-dom';
import { testShipApplication } from '../../constants/testCopy';
import { simulateContract } from 'viem/actions';
import { useAccount, useClient } from 'wagmi';
import { publicClient } from '../../scripts/createGameManagerPool';

type FormValues = z.infer<typeof shipApplicationSchema>;

export const ShipApplication = ({
  profileData,
}: {
  profileData?: ProfileData;
}) => {
  const isMobile = useMediaQuery(`(max-width: ${em(750)})`);
  const { tx } = useTx();
  const navigate = useNavigate();
  const form = useForm({
    initialValues: testShipApplication,
    validate: zodResolver(shipApplicationSchema),
  });
  const handleBlur = (fieldName: string) => {
    form.validateField(fieldName);
  };

  const handleFormSubmit = async (formValues: FormValues) => {
    // if (!profileData) {
    //   notifications.show({
    //     title: 'Profile Data Error',
    //     message: 'Profile Data is missing',
    //     color: 'red',
    //   });
    //   return;
    // }

    try {
      const pinRes = await pinJSONToIPFS(formValues);

      if (typeof pinRes.IpfsHash !== 'string' && pinRes.IpfsHash[0] !== 'Q') {
        notifications.show({
          title: 'IPFS Upload Error',
          message: pinRes.IpfsHash[1],
          color: 'red',
        });
        return;
      }

      const initData = encodeAbiParameters(
        parseAbiParameters('address, string, (uint256, string)'),
        [
          // profileData?.anchor as Address,
          '0x41dcc0db16ce272fc3b2cefc591852e9ff1b421c',
          //  profileData?.name,
          'Public Goods Death Star',
          [1n, pinRes.IpfsHash],
        ]
      );

      tx({
        writeContractParams: {
          abi: AlloAbi,
          address: ADDR.ALLO,
          functionName: 'registerRecipient',
          args: [
            224n,
            // profileData.profileId,
            initData,
          ],
        },
        viewParams: {
          loading: {
            title: 'Submitting your Ship Application',
            description: 'Submitting your ship application for review.',
          },
          success: {
            title: 'Your Ship Application has been submitted.',
            description: 'You will hear from Game Facilitators Shortly',
          },
          error: {
            title: 'Something went wrong.',
            fallback:
              'There was an unknown error creating your Ship Application.',
          },
          successButton: {
            label: 'See Ships',
            onClick: () => {
              navigate('/ships');
            },
          },
        },
      });
    } catch (error) {
      console.error(error);
      notifications.show({
        title: 'Error',
        message: 'Error submitting application',
        color: 'red',
      });
    }
  };

  return (
    <form onSubmit={form.onSubmit((values) => handleFormSubmit(values))}>
      <Stack maw={600} miw={300} w={'100%'} mt="xl">
        <Text fw={600}>{profileData?.name || 'Should Not See This'}</Text>
        <Textarea
          w="100%"
          inputWrapperOrder={['label', 'input', 'description', 'error']}
          label="Impact Thesis"
          description="How will your Grant Ship drive impact within the Arbitrum Ecosystem? How will this address Arbitrum's Strategic Initiatives?"
          required
          autosize
          minRows={4}
          maxRows={8}
          placeholder="What is your Ship's funding mission?"
          {...form.getInputProps('thesis')}
          onBlur={() => handleBlur('thesis')}
        />
        <Textarea
          w="100%"
          inputWrapperOrder={['label', 'input', 'description', 'error']}
          label="Submission Guidelines"
          description="What guidelines will you expect grant recipients to follow?"
          required
          autosize
          minRows={4}
          maxRows={8}
          placeholder="What is your Ship's funding mission?"
          {...form.getInputProps('guidelines')}
          onBlur={() => handleBlur('guidelines')}
        />
        <Flex direction={isMobile ? 'column' : 'row'}>
          <TextInput
            w="100%"
            label="Management Fee"
            required
            placeholder="Percentage (%)"
            {...form.getInputProps('fee')}
            onBlur={() => handleBlur('fee')}
            mr={'md'}
          />
          <TextInput
            w="100%"
            label="Additional Link"
            placeholder="https://more-info.com"
            leftSection={<IconExternalLink />}
            {...form.getInputProps('extraLink')}
            onBlur={() => handleBlur('extraLink')}
          />
        </Flex>
        <Textarea
          w="100%"
          label="Additional Information"
          autosize
          minRows={4}
          maxRows={8}
          placeholder="Additional Information"
          {...form.getInputProps('extraInfo')}
          onBlur={() => handleBlur('extraInfo')}
        />
      </Stack>
      <Flex w="100%" mt="md">
        <Button ml="auto" type="submit">
          Finish Application
        </Button>
      </Flex>
    </form>
  );
};
