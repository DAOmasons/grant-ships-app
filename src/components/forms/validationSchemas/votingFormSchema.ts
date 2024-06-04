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
