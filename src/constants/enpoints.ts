export const RPC_URL = import.meta.env.VITE_RUNTIME_ENV
  ? import.meta.env.RPC_URL_TESTNET
  : import.meta.env.RPC_URL_MAINNET;

export const SCAN_KEY = import.meta.env.VITE_RUNTIME_ENV
  ? import.meta.env.SCAN_KEY_TESTNET
  : import.meta.env.SCAN_KEY_MAINNET;
