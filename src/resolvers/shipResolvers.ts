import { z } from 'zod';
import { ShipProfileMetadata } from '../utils/ipfs/metadataValidation';
import { getGatewayUrl, getIpfsJson } from '../utils/ipfs/get';

export type ShipMetadata = z.infer<typeof ShipProfileMetadata> & {
  imgUrl: string;
};

export const resolveShipMetadata = async (pointer?: string) => {
  if (!pointer) {
    console.error('No metadata pointer', pointer);
    throw new Error('No metadata pointer');
  }

  const json = await getIpfsJson(pointer);

  const validated = ShipProfileMetadata.safeParse(json);

  if (!validated.success) {
    console.error('Invalid metadata', validated.error);
    throw new Error('Invalid metadata: Data does not match the schema');
  }

  return {
    ...validated.data,
    imgUrl: getGatewayUrl(validated.data.avatarHash_IPFS),
  };
};
