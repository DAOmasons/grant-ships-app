import { z } from 'zod';

export const badgeTemplateSchema = z.object({
  description: z.string().min(1, { message: 'Description is required' }),
  avatarIPFSHash: z.string().min(1, { message: 'Avatar is required' }),
});
export const badgeTemplateForm = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
  description: z.string().min(1, { message: 'Description is required' }),
  amount: z.number(),
  isVotingToken: z.string(),
  hasFixedAmount: z.string(),
  isSlash: z.string(),
});
