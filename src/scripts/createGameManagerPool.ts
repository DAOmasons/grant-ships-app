import {
  Address,
  createPublicClient,
  createWalletClient,
  custom,
  encodeAbiParameters,
  http,
} from 'viem';
import { arbitrumSepolia } from 'viem/chains';
import { ADDR } from '../constants/addresses';
import RegistryAbi from '../abi/Registry.json';
import AlloAbi from '../abi/Allo.json';

import { generateRandomUint256 } from '../utils/helpers';
import {
  GAME_MANAGER,
  GAME_MANAGER_TESTNET,
  GAME_TOKEN,
  HATS,
} from '../constants/gameSetup';

const client = createWalletClient({
  chain: arbitrumSepolia,
  transport: custom(window.ethereum),
});

export const publicClient = createPublicClient({
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

export const createGameManagerPoolProfile = async () => {
  const [account] = await client.getAddresses();

  const unwatchProfileCreate = publicClient.watchContractEvent({
    address: ADDR.GAME_MANAGER,
    abi: RegistryAbi,
    eventName: 'ProfileCreated',
    onLogs: (logs: any) => {
      console.log(' Created => Event Logs: ', logs);

      console.log('Pool Profile ID:', logs[0]?.args?.poolId);
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
      'GameManagerPool',
      { protocol: 1, pointer: '0' },
      account,
      [],
    ],
  });
};

export const createGameManagerPool = async () => {
  const [account] = await client.getAddresses();

  const unwatchPoolCreate = publicClient.watchContractEvent({
    address: ADDR.ALLO,
    abi: AlloAbi,
    eventName: 'PoolCreated',
    onLogs: (logs: any) => {
      console.log('Pool Created => Event Logs: ', logs);

      console.log('Pool ID:', logs[0]?.args?.poolId);
      unwatchPoolCreate?.();
    },
  });

  const initData = encodeAbiParameters(
    [
      { name: '_gameFacilitatorId', type: 'uint256' },
      { name: '_hatsAddress', type: 'address' },
      { name: '_rootAccount', type: 'address' },
    ],
    [HATS.FACILITATOR, HATS.ADDRESS, account]
  );

  await client.writeContract({
    account,
    address: ADDR.ALLO,
    abi: AlloAbi,
    functionName: 'createPoolWithCustomStrategy',
    args: [
      GAME_MANAGER.PROFILE.ID,
      GAME_MANAGER.ADDRESS,
      initData,
      GAME_TOKEN.ADDRESS,
      0,
      { protocol: 1, pointer: '0' },
      [],
    ],
  });
};
