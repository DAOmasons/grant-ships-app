import { isAddress } from 'viem';
import { z } from 'zod';

export const deployGmSchema = z.object({
  versionName: z.string().min(1, { message: 'Project Id is required' }),
  tokenAddress: z
    .string()
    .min(1, { message: 'Send address is required' })
    .refine((val) => isAddress(val), { message: 'Invalid address' }),
  facilitatorHatId: z
    .string()
    .min(1)
    .regex(/^\d+(\.\d+)?$/, 'Must be a number'),
  gmTitle: z.string().min(1, { message: 'GameManager Title is required' }),
  gmDescription: z
    .string()
    .min(1, { message: 'GameManager Description is required' }),
});
