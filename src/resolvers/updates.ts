import { z } from 'zod';
import { UpdateFragment } from '../.graphclient';
import {
  ContentSchema,
  basicUpdateSchema,
} from '../components/forms/validationSchemas/updateSchemas';
import { getIpfsJson } from '../utils/ipfs/get';

type BasicUpdate = z.infer<typeof basicUpdateSchema>;

type ResolvedUpdate = UpdateFragment & {
  content: BasicUpdate;
};

export const resolveUpdates = async (updateData: UpdateFragment[]) => {
  const resolved = await Promise.all(
    updateData.map(async (update) => {
      const res = await getIpfsJson(update.content.pointer);

      if (res.contentSchema === ContentSchema.BasicUpdate) {
        const validated = basicUpdateSchema.safeParse(res);

        if (!validated.success) {
          console.error('Invalid metadata', validated.error);
          return null;
        }

        return {
          ...update,
          content: validated.data as BasicUpdate,
        };
      }

      return null;
    })
  );

  return resolved.filter(Boolean) as ResolvedUpdate[];
};
