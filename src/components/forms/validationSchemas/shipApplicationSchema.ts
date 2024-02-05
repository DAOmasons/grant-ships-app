import { z } from 'zod';

export const shipApplicationSchema = z.object({
  thesis: z
    .string()
    .min(200, { message: 'Thesis should have at least 200 characters' }),
  guidelines: z
    .string()
    .min(200, { message: 'guidelines should have at least 200 characters' }),
  fee: z.number().min(0, { message: 'Fee is required' }),
  extraLink: z.string().url({ message: 'Invalid url' }).or(z.literal('')),
  extraInfo: z.string(),
});
