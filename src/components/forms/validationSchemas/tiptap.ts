import { z } from 'zod';

const tiptapMarkSchema = z.object({
  type: z.string(),
  attrs: z.record(z.unknown()).optional(),
});

const tiptapNodeSchema: z.ZodType<any> = z.lazy(() =>
  z.object({
    type: z.string(),
    attrs: z.record(z.unknown()).optional(),
    content: z.array(tiptapNodeSchema).optional(),
    marks: z.array(tiptapMarkSchema).optional(),
    text: z.string().optional(),
  })
);

export const tiptapContentSchema = z.object({
  type: z.literal('doc'),
  content: z.array(tiptapNodeSchema),
});
