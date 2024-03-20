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
import { useState } from 'react';
import { useReadContract } from 'wagmi';
import { Address, erc20Abi } from 'viem';
import { GAME_TOKEN, HATS } from '../../../constants/gameSetup';
import { useForm } from '@mantine/form';

const defaultFormValues = {
  versionName: null,
  tokenAddress: GAME_TOKEN.ADDRESS,
  facilitatorHatId: HATS.FACILITATOR.toString(),
  gmTitle: '',
  gmDescription: '',
};

export const DeploymentPanel = ({
  versions,
  versionError,
  versionLoading,
}: {
  versions?: GmVersion[];
  versionError: Error | null;
  versionLoading: boolean;
}) => {
  const form = useForm({
    initialValues: defaultFormValues,
    validateInputOnBlur: true,
  });

  const [versionName, setVersionName] = useState<null | string>(null);

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

  const handleCreateWithPool = () => {
    // bytes memory initData = abi.encode(facilitatorHatId, hatsAddress, rootAccount);
    // vm.startPrank(rootAccount);
    // address cloneAddress = _gameManagerFactory.cloneWithPool(
    //     gameManagerStrategyId, 0, dummyMetadata, dummyMetadata, initData, arbAddress
    // );
    // vm.stopPrank();
    // GameManagerStrategy gameManagerStrategy = GameManagerStrategy(payable(cloneAddress));
    // assertEq(gameManagerStrategy.gameFacilitatorHatId(), facilitatorHatId);
    // assertEq(gameManagerStrategy.rootAccount(), rootAccount);
    // assertEq(gameManagerStrategy.token(), arbAddress);
  };

  return (
    <Box p="md">
      <Text mb="md" fw={700}>
        Deploy
      </Text>
      <form>
        <Stack mb="xl">
          <Select
            label="Game Manager Version"
            value={versionName}
            data={versions?.map((v) => v.name)}
            onChange={(v) => setVersionName(v)}
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
            value={form.values.gmTitle}
            {...form.getInputProps('gmTitle')}
            required
            autosize
            minRows={4}
            maxRows={8}
          />
          <TextInput
            label="Token Address"
            value={form.values.tokenAddress}
            description={result.data ? result.data : 'Invalid Address'}
            placeholder="Enter the token address"
            {...form.getInputProps('tokenAddress')}
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
          <Button onClick={handleCreateWithPool}>Deploy</Button>
        </Group>
      </form>
    </Box>
  );
};
