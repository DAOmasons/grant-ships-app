export const PINATA_GATEWAY = 'https://gateway.pinata.cloud/ipfs';

export const getIpfsImage = async (cid: string) => {
  const res = await fetch(`${PINATA_GATEWAY}/${cid}`);

  const data = await res.blob();
  return data;
};
