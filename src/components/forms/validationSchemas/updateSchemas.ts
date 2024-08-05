import { z } from 'zod';

export enum ContentSchema {
  BasicUpdate, // { text: string}
  RichText,
  Reason,
}

export const basicUpdateSchema = z.object({
  text: z.string().min(1, { message: 'Text is required' }),
});
