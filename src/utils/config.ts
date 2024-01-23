import { http, createConfig } from 'wagmi';
import { arbitrumSepolia, arbitrum } from 'wagmi/chains';

export const config = createConfig({
  chains: [arbitrumSepolia, arbitrum],
  transports: {
    [arbitrumSepolia.id]: http(import.meta.env.VITE_RPC_URL_TESTNET),
    [arbitrum.id]: http(import.meta.env.VITE_RPC_URL_MAINNET),
  },
});
