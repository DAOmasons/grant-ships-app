import { createPublicClient } from 'viem';
import { http, createConfig } from 'wagmi';
import { arbitrumSepolia, arbitrum, mainnet } from 'wagmi/chains';
import { safe, walletConnect } from 'wagmi/connectors';

export const appNetwork =
  import.meta.env.VITE_RUNTIME_ENV === 'dev' ? arbitrumSepolia : arbitrum;

const appRpc =
  import.meta.env.VITE_RUNTIME_ENV === 'dev'
    ? import.meta.env.VITE_RPC_URL_TESTNET
    : import.meta.env.VITE_RPC_URL_MAINNET;

export const config = createConfig({
  chains: [appNetwork],
  connectors: [
    safe(),
    walletConnect({ projectId: import.meta.env.VITE_RBK_PROJECT_ID }),
  ],
  // @ts-expect-error: TS is being a jackass
  transports: {
    [appNetwork.id]: http(appRpc),
  },
});

export const ensConfig = createConfig({
  chains: [mainnet],
  transports: {
    [mainnet.id]: http(import.meta.env.VITE_RPC_URL_ENS_MAINNET),
  },
});

export const publicClient = createPublicClient({
  chain: appNetwork,
  transport: http(appRpc, { batch: true }),
});
