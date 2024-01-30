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
