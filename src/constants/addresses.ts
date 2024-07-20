import { Address } from 'viem';

export const ADDR_TESTNET: Record<string, Address> = {
  ALLO: '0x1133eA7Af70876e64665ecD07C0A0476d09465a1',
  REGISTRY: '0x4AAcca72145e1dF2aeC137E1f3C5E3D75DB8b5f3',
  HATS: '0x3bc1A0Ad72417f2d411118085256fC53CBdDd137',
  GAME_MANAGER: '0x6525E305b79EB0BF8291b4235ee7952Bad130Ed8',
  GM_FACTORY: '0x14e32E7893D6A1fA5f852d8B2fE8c57A2aB670ba',
  GS_FACTORY: '0x1F8cbC9d98E63575F8eE4C21a7BA68A34f66F280',
  HATS_POSTER: '0x168EBDCF12b054d3fD4179817aE1bD0DcF303433',
  ALLO_POSTER: '0x13903f14a935547b353282E3b9656D628A0Ec007',
  VOTE_CONTEST: '0xB60D9C91aBcA9d32a2a543BDFF958Db2d7DFb816',
  SBT_VOTE_CONTEST: '0x0F7B4f1D615e53a62404e30d4b5Ad20EA3AA41f0',
} as const;

export const ADDR_PROD: Record<string, Address> = {
  ALLO: '0x1133eA7Af70876e64665ecD07C0A0476d09465a1',
  REGISTRY: '0x4AAcca72145e1dF2aeC137E1f3C5E3D75DB8b5f3',
  HATS: '0x3bc1A0Ad72417f2d411118085256fC53CBdDd137',
  GAME_MANAGER: '0x4b42362fcbbcdc7b8f35d73288039cad6cb4e9ef',
  GM_FACTORY: '0xdc9787b869e22256a4f4f49f484586fcff0d351f',
  GS_FACTORY: '0xe3c270Bf363f3F55e8Fd488c2728227AeF436243',
  HATS_POSTER: '0x0B2BdeFf847D4AeB51F9f6aA3eC9AB63931E4191',
  ALLO_POSTER: '0xdeeceda1Ab6BCcC70eE2D15AF5e5a19d0B2793dD',
  VOTE_CONTEST: '0x60B753C86D142D7538341B7Fc3Ef6E84499636bB',
  SBT_VOTE_CONTEST: '0xF46DA452C2D3f40Cf8402FFF5EdfdB4D6b6F0C9F',
} as const;

export const ADDR: Record<string, Address> =
  import.meta.env.VITE_RUNTIME_ENV === 'dev' ? ADDR_TESTNET : ADDR_PROD;
