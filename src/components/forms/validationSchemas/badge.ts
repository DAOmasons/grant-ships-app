import { z } from 'zod';

export const badgeTemplateSchema = z.object({
  description: z.string().min(1, { message: 'Description is required' }),
  avatarIPFSHash: z.string().min(1, { message: 'Avatar is required' }),
});
export const badgeTemplateForm = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
  description: z.string().min(1, { message: 'Description is required' }),
  avatarIPFSHash: z.string().min(1, { message: 'Avatar is required' }),
  amount: z.number(),
  isVotingToken: z.boolean(),
  hasFixedAmount: z.boolean(),
  isSlash: z.boolean(),
});
