import {
  Box,
  Button,
  Group,
  Select,
  Stack,
  Text,
  TextInput,
  Textarea,
} from '@mantine/core';
import { GmVersion } from '../../../queries/getGameManagerVersions';
import { useReadContract } from 'wagmi';
import {
  Address,
  encodeAbiParameters,
  erc20Abi,
  parseAbiParameters,
} from 'viem';
import { GAME_TOKEN, HATS } from '../../../constants/gameSetup';
import { useForm, zodResolver } from '@mantine/form';
import { z } from 'zod';
import { deployGmSchema } from '../../forms/validationSchemas/deployGmSchema';
import { useTx } from '../../../hooks/useTx';
import GameManagerFactory from '../../../abi/GameManagerFactory.json';
import { ADDR } from '../../../constants/addresses';
import { generateRandomUint256 } from '../../../utils/helpers';
import { pinJSONToIPFS } from '../../../utils/ipfs/pin';
import { notifications } from '@mantine/notifications';

const defaultFormValues = {
  versionName: '',
  tokenAddress: GAME_TOKEN.ADDRESS,
  facilitatorHatId: HATS.FACILITATOR.toString(),
  gmTitle: '',
  gmDescription: '',
  rootAccount: '',
};

type FormValues = z.infer<typeof deployGmSchema>;

export const DeploymentPanel = ({
  versions,
  versionError,
  versionLoading,
  deploysRefetch,
}: {
  versions?: GmVersion[];
  versionError: Error | null;
  versionLoading: boolean;
  deploysRefetch: () => void;
}) => {
  const form = useForm({
    initialValues: defaultFormValues,
    validateInputOnBlur: true,
    validate: zodResolver(deployGmSchema),
  });

  const { tx } = useTx();

  const result = useReadContract({
    abi: erc20Abi,
    address: form.values.tokenAddress as Address,
    functionName: 'symbol',
  });

  if (versionLoading) {
    return <div>Loading...</div>;
  }

  if (versionError || !versions) {
    return (
      <div>error: {versionError?.message || 'Error Fetching version data'}</div>
    );
  }

  if (versions.length === 0) {
    return <div>No versions available for deployment</div>;
  }

  const handleCreateWithPool = async (formValues: FormValues) => {
    const {
      versionName,
      tokenAddress,
      facilitatorHatId,
      gmTitle,
      gmDescription,
      rootAccount,
    } = formValues;

    if (
      !versionName ||
      !tokenAddress ||
      !facilitatorHatId ||
      !gmTitle ||
      !gmDescription ||
      !rootAccount
    ) {
      notifications.show({
        title: 'Error',
        message: 'All fields are required',
        color: 'red',
      });
      return;
    }

    try {
      const initData = encodeAbiParameters(
        parseAbiParameters('uint256, address, address'),
        [BigInt(facilitatorHatId), ADDR.HATS, rootAccount as Address]
      );

      const pinRes = await pinJSONToIPFS({
        title: gmTitle,
        description: gmDescription,
      });

      if (typeof pinRes.IpfsHash !== 'string' && pinRes.IpfsHash[0] !== 'Q') {
        notifications.show({
          title: 'IPFS Upload Error',
          message: pinRes.IpfsHash[1],
          color: 'red',
        });
        return;
      }

      tx({
        writeContractParams: {
          abi: GameManagerFactory,
          address: ADDR.GM_FACTORY,
          functionName: 'cloneWithPool',
          args: [
            versionName,
            generateRandomUint256(),
            [0n, ''],
            [1n, pinRes.IpfsHash],
            initData,
            tokenAddress,
          ],
        },
        onComplete: () => {
          deploysRefetch();
          form.reset();
          notifications.show({
            title: 'Success',
            message: 'Game Manager Deployed',
            color: 'green',
          });
        },
      });
    } catch (error: any) {
      console.error(error);
      notifications.show({
        title: 'Error',
        message: error?.message || 'Unknown error: Open Console',
        color: 'red',
      });
    }
  };

  return (
    <Box p="md">
      <Text mb="md" fw={700}>
        Deploy With Pool
      </Text>
      <Text fz="sm" opacity={0.8} mb="md">
        Deploy a new game manager with a pool, which initializes the game with a
        new Allo pool and pool profile.
      </Text>
      <form>
        <Stack mb="xl">
          <Select
            label="Game Manager Version"
            data={versions?.map((v) => v.name)}
            {...form.getInputProps('versionName')}
            placeholder="Select a version"
            required
          />
          <TextInput
            label="Game Title"
            value={form.values.gmTitle}
            placeholder="Enter the game title"
            {...form.getInputProps('gmTitle')}
            required
          />
          <Textarea
            label="Game Description"
            placeholder="Enter the game description"
            value={form.values.gmDescription}
            {...form.getInputProps('gmDescription')}
            required
            autosize
            minRows={4}
            maxRows={8}
          />
          <TextInput
            label="Token Address"
            value={form.values.tokenAddress}
            description={result.data ? result.data : 'Invalid Address'}
            placeholder="0x..."
            {...form.getInputProps('tokenAddress')}
            required
          />
          <TextInput
            label="Root Account Address"
            value={form.values.rootAccount}
            placeholder="0x..."
            {...form.getInputProps('rootAccount')}
            required
          />
          <TextInput
            label="Facilitator Hat ID"
            value={form.values.facilitatorHatId}
            placeholder="Enter a Hat ID for the facilitator"
            {...form.getInputProps('facilitatorHatId')}
            required
          />
        </Stack>
        <Group justify="end">
          <Button onClick={() => handleCreateWithPool(form.values)}>
            Deploy
          </Button>
        </Group>
      </form>
    </Box>
  );
};
