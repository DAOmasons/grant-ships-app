import crypto from 'crypto';

export const generateRandomUint256 = (): bigint => {
  const bits = 256;
  const randomBytes = crypto.randomBytes(bits / 8); // 256 bits / 8 = 32 bytes
  let randomBigInt = BigInt('0x' + randomBytes.toString('hex'));

  // Ensure the BigInt is unsigned
  const maxUint256 = BigInt(
    '0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF'
  );
  randomBigInt = randomBigInt % (maxUint256 + BigInt(1));

  return randomBigInt;
};

export const generateRandomBytes32 = (): string => {
  return `0x${crypto.randomBytes(32).toString('hex')}`;
  // const randomBytes = crypto.getRandomValues(new Uint8Array(32));
  // const bytes32 = Array.from(randomBytes)
  //   .map((b) => b.toString(16).padStart(2, '0'))
  //   .join('');

  // return `0x${bytes32}`;
};

export function findValueByKey(obj: any, key: string): any {
  let result: any;

  function search(obj: any) {
    if (result !== undefined) return; // Stop searching if we've found a result
    for (const k in obj) {
      if (obj[k]) {
        if (k === key && obj[k]) {
          result = obj[k];
          return;
        }
        if (typeof obj[k] === 'object' && obj[k] !== null) {
          search(obj[k]);
        }
      }
    }
  }

  search(obj);
  return result;
}

export const isFieldNumber = (value: string): boolean => {
  return !isNaN(+value) && value.trim() !== '';
};

export const addressToBytes32 = (address: string): string => {
  return `0x${address.slice(2).padStart(64, '0')}`;
};

export const bytes32toAddress = (bytes32: string): string => {
  return `0x${bytes32.slice(26)}`;
};

// export const formatPercentage = (
//   numerator: bigint,
//   denominator: bigint,
//   scale: bigint = 1000000000000000n // Scale factor to determine decimal places in output
// ): string => {
//   const percentage = (numerator * 100n * scale) / denominator / scale;
//   return `${Number(percentage) / 100}%`;
// };
export const formatBigIntPercentage = (
  numerator: bigint,
  denominator: bigint,
  displayDecimals: number = 2
) => {
  if (numerator === 0n || denominator === 0n) return '0';

  return ((Number(numerator) / Number(denominator)) * 100).toFixed(
    displayDecimals
  );
};
