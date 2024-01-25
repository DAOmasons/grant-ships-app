export const generateNonce = (): string => {
  const array = new Uint8Array(32);
  window.crypto.getRandomValues(array);
  return Array.from(array, (byte) => ('0' + byte.toString(16)).slice(-2)).join(
    ''
  );
};
