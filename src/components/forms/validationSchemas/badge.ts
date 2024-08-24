import { z } from 'zod';

export const badgeTemplateSchema = z.object({
  description: z.string().min(1, { message: 'Description is required' }),
  avatarIPFSHash: z.string().min(1, { message: 'Avatar is required' }),
});
