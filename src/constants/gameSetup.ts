import { ADDR_PROD, ADDR_TESTNET } from './addresses';

export const GAME_MANAGER_TESTNET = {
  ADDRESS: ADDR_TESTNET.GAME_MANAGER,
  PROFILE: {
    NAME: 'GameManagerProfile',
    ID: '0xc3a373980a9c3c740245ae38e7eadd2b550612cb7e03613d7edde5abb564dd84',
    ANCHOR: '0xe5F02c198207ab79a812507C7B343Aa26Db444eC',
    NONCE:
      49371134338728562921481680461000959006281654739148812712981382516603748637777n,
  },
  POOL: {
    ID: 224n,
  },
};

export const GAME_MANAGER_PROD = {
  ADDRESS: ADDR_PROD.GAME_MANAGER,
  PROFILE: {
    NAME: '',
    ID: '',
    ANCHOR: '',
    NONCE: 0n,
  },
  POOL: {
    ID: 0n,
  },
};

export const GAME_TOKEN_DEV = {
  NAME: 'Chromatic fake ETH',
  SYMBOL: 'cETH',
  DECIMALS: 18,
  ADDRESS: '0x93252009E644138b906aE1a28792229E577239B9',
};

export const GAME_TOKEN_PROD = {
  NAME: 'Arbitrum Token',
  SYMBOL: 'ARB',
  DECIMALS: 18,
  ADDRESS: '0',
};

export const HATS_DEV = {
  ADDRESS: ADDR_TESTNET.HATS,
  TOP: 2210715626706352463162695237135609715238245842648326943450496040435712n,
  FACILITATOR:
    2210716038082491793464205775877905354575872088332293351845461877587968n,
};

export const HATS_PROD = {
  ADDRESS: ADDR_PROD.HATS,
  TOP: 0n,
  FACILITATOR: 0n,
};

// TODO: Hardcoding is for testing only. We will fetch for Hats/isWearer later on
export const FACILITATORS = ['0xDE6bcde54CF040088607199FC541f013bA53C21E'];

export const GAME_MANAGER =
  import.meta.env.VITE_RUNTIME_ENV === 'dev'
    ? GAME_MANAGER_TESTNET
    : GAME_MANAGER_PROD;

export const GAME_TOKEN =
  import.meta.env.VITE_RUNTIME_ENV === 'dev' ? GAME_TOKEN_DEV : GAME_TOKEN_PROD;

export const HATS =
  import.meta.env.VITE_RUNTIME_ENV === 'dev' ? HATS_DEV : HATS_PROD;

export const SHIP_AMOUNT = 3;
