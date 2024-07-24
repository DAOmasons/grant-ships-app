import { z } from 'zod';
import { UpdateBodyFragment } from '../.graphclient';
import {
  ContentSchema,
  basicUpdateSchema,
} from '../components/forms/validationSchemas/updateSchemas';
import { getIpfsJson } from '../utils/ipfs/get';
import { tiptapContentSchema } from '../components/forms/validationSchemas/tiptap';
import { Content } from '@tiptap/react';

type BasicUpdate = z.infer<typeof basicUpdateSchema>;

type ResolvedUpdate = UpdateBodyFragment & {
  content: BasicUpdate;
};

export const resolveUpdates = async (updateData: UpdateBodyFragment[]) => {
  const resolved = await Promise.all(
    updateData.map(async (update) => {
      const res = await getIpfsJson(update.content!!.pointer);

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

export const resolveRichTextMetadata = async (rtfPointer: string) => {
  const rtfJSON = await getIpfsJson(rtfPointer);

  const validatedRt = tiptapContentSchema.safeParse(rtfJSON);

  if (!validatedRt.success) {
    throw new Error('Invalid RTF');
  }

  return validatedRt.data as Content;
};
