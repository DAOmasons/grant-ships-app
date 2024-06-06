import { z } from 'zod';

export const votingSchema = z.object({
  ships: z.array(
    z.object({
      shipId: z.string(),
      shipPerc: z.string().regex(/^\d+(\.\d+)?$/, 'Must be a number'),
      shipComment: z.string(),
    })
  ),
});
export const voteReasonsSchema = z.object({
  voteReason: z.string().min(1, { message: 'Vote reason is required' }),
});
