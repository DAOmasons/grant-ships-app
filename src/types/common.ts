// Arbitrary JSON type to ensure that non-JSON serializable types are not used

export type Json =
  | string
  | number
  | boolean
  | null
  | Json[]
  | { [key: string]: Json };

export type Metadata = {
  pointer: string;
  protocol: number;
};

export type NestedButton = {
  label: string;
  onClick: () => void;
};

export type AlloMetadata = {
  protocol: bigint;
  pointer: string;
};

export const generateNonce = (): string => {
  const array = new Uint8Array(32);
  window.crypto.getRandomValues(array);
  return Array.from(array, (byte) => ('0' + byte.toString(16)).slice(-2)).join(
    ''
  );
};
