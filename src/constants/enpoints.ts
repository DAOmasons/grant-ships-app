export const SCAN_KEY =
  import.meta.env.VITE_RUNTIME_ENV === 'dev'
    ? import.meta.env.SCAN_KEY_TESTNET
    : import.meta.env.SCAN_KEY_MAINNET;

export const SCAN_URL =
  import.meta.env.VITE_RUNTIME_ENV === 'dev'
    ? 'https://sepolia.arbiscan.io/'
    : 'https://arbiscan.io/';
