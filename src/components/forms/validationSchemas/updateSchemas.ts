import { z } from 'zod';

export enum ContentSchema {
  BasicUpdate, // { text: string, contentSchema: ContentSchema.BasicUpdate }
  RichText,
}

export const basicUpdateSchema = z.object({
  text: z.string().min(1, { message: 'Text is required' }),
  contentSchema: z.literal(ContentSchema.BasicUpdate),
});
