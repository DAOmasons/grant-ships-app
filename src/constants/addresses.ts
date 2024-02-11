import { Address } from 'viem';

export const ADDR_TESTNET: Record<string, Address> = {
  ALLO: '0x1133eA7Af70876e64665ecD07C0A0476d09465a1',
  REGISTRY: '0x4AAcca72145e1dF2aeC137E1f3C5E3D75DB8b5f3',
  HATS: '0x3bc1A0Ad72417f2d411118085256fC53CBdDd137',
  GAME_MANAGER: '0x2D484ee4395C5ec4c5F1dB5f5CdD7BB9DFeef9Ef',
  FACTORY: '0xB6f1d31D7e9f980c080b4d40FA36d90791275A9f',
};

export const ADDR_PROD: Record<string, Address> = {
  ALLO: '0x00000000',
  REGISTRY: '0x00000000',
  HATS: '0x00000000',
  GAME_MANAGER: '0x00000000',
  FACTORY: '0x00000000',
};

export const ADDR: Record<string, Address> =
  import.meta.env.VITE_RUNTIME_ENV === 'dev' ? ADDR_TESTNET : ADDR_PROD;
