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

export function findValueByKey(obj: any, key: string): any {
  console.log({ obj, key });
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
