import { createPublicClient, createWalletClient, custom, http } from 'viem';
import { arbitrumSepolia } from 'viem/chains';
import { ADDR } from '../constants/addresses';
import RegistryAbi from '../abi/Registry.json';
import { generateRandomUint256 } from '../utils/helpers';

const client = createWalletClient({
  chain: arbitrumSepolia,
  transport: custom(window.ethereum),
});

const publicClient = createPublicClient({
  chain: arbitrumSepolia,
  transport: http(import.meta.env.VITE_RPC_URL_TESTNET),
});

export const createPoolProfile = async () => {
  const [account] = await client.getAddresses();

  const unwatchProfileCreate = publicClient.watchContractEvent({
    address: ADDR.REGISTRY,
    abi: RegistryAbi,
    eventName: 'ProfileCreated',
    onLogs: (logs: any) => {
      console.log('Profile Created => Event Logs: ', logs);

      console.log('Profile ID:', logs[0]?.args?.profileId);
      unwatchProfileCreate?.();
    },
  });

  await client.writeContract({
    account,
    address: ADDR.REGISTRY,
    abi: RegistryAbi,
    functionName: 'createProfile',
    args: [
      generateRandomUint256(),
      'GameManagerProfile',
      { protocol: 1, pointer: '0' },
      account,
      [],
    ],
  });
};

export const createGameManagerPool = async () => {
  const [account] = await client.getAddresses();

  const unwatchPoolCreate = publicClient.watchContractEvent({
    address: ADDR.GAME_MANAGER,
    abi: RegistryAbi,
    eventName: 'PoolCreated',
    onLogs: (logs: any) => {
      console.log('Pool Created => Event Logs: ', logs);

      console.log('Pool ID:', logs[0]?.args?.poolId);
      unwatchPoolCreate?.();
    },
  });

  await client.writeContract({
    account,
    address: ADDR.GAME_MANAGER,
    abi: RegistryAbi,
    functionName: 'createPool',
    args: [
      generateRandomUint256(),
      'GameManagerPool',
      { protocol: 1, pointer: '0' },
      account,
      [],
    ],
  });
};
