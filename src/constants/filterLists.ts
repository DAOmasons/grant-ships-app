export const DEV_PROJECT_FILTER_LIST: string[] = [
  '0x6c44450b4ec16500e0a18122ce60dcd57eb3f763',
  '0xd727c29b19e98453d9051e1889ea529309f33ce9',
];

export const PROD_PROJECT_FILTER_LIST: string[] = [];

export const PROJECT_FILTER_LIST =
  import.meta.env.VITE_RUNTIME_ENV === 'dev'
    ? DEV_PROJECT_FILTER_LIST
    : PROD_PROJECT_FILTER_LIST;
