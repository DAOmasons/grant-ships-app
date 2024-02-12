import { http, createConfig } from 'wagmi';
import { arbitrumSepolia, arbitrum, mainnet } from 'wagmi/chains';
import { safe, walletConnect } from 'wagmi/connectors';

export const config = createConfig({
  chains: [arbitrumSepolia, arbitrum],
  connectors: [
    safe(),
    walletConnect({ projectId: import.meta.env.VITE_RBK_PROJECT_ID }),
  ],
  transports: {
    [arbitrumSepolia.id]: http(import.meta.env.VITE_RPC_URL_TESTNET),
    [arbitrum.id]: http(import.meta.env.VITE_RPC_URL_MAINNET),
  },
});

export const ensConfig = createConfig({
  chains: [mainnet],
  transports: {
    [mainnet.id]: http(import.meta.env.VITE_RPC_URL_ENS_MAINNET),
  },
});
