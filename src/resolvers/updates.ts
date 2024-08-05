import { z } from 'zod';
import { UpdateBodyFragment } from '../.graphclient';
import {
  ContentSchema,
  basicUpdateSchema,
} from '../components/forms/validationSchemas/updateSchemas';
import { getIpfsJson } from '../utils/ipfs/get';
import {
  tipTapApplicationSchema,
  tiptapContentSchema,
} from '../components/forms/validationSchemas/tiptap';
import { Content } from '@tiptap/react';
import { get } from 'http';
import { reasonSchema } from '../utils/ipfs/metadataValidation';

type RTContent = z.infer<typeof tiptapContentSchema>;

export type ResolvedUpdate = UpdateBodyFragment & {
  content: RTContent;
};

export const resolveUpdates = async (updateData: UpdateBodyFragment[]) => {
  const resolved = await Promise.all(
    updateData.map(async (update) => {
      const res = await getIpfsJson(update.content!!.pointer);

      const validated = tiptapContentSchema.safeParse(res);

      if (!validated.success) {
        console.error('Invalid metadata', validated.error);
        return null;
      }

      return {
        ...update,
        content: validated.data as RTContent,
      };
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

export const resolveRTApplication = async (
  rtfPointer: string
): Promise<{
  content: Content;
  dueDate: number;
}> => {
  const rtApplication = await getIpfsJson(rtfPointer);

  const validatedRt = tipTapApplicationSchema.safeParse(rtApplication);

  if (!validatedRt.success) {
    throw new Error('Invalid RTF');
  }

  return validatedRt.data;
};

export const resolveReason = async (pointer?: string) => {
  if (!pointer) {
    return null;
  }

  const json = await getIpfsJson(pointer);

  const validated = reasonSchema.safeParse(json);

  if (!validated.success) {
    console.error('Invalid metadata', validated.error);
    throw new Error('Invalid metadata: Data does not match the schema');
  }

  return validated.data;
};
