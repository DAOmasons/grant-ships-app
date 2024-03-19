import { isAddress } from 'viem';
import { z } from 'zod';

export const applyFundingSchema = z.object({
  projectId: z.string().min(1, { message: 'Project Id is required' }),
  dueDate: z.date().nullable(),
  totalAmount: z
    .string()
    .min(1)
    .regex(/^\d+(\.\d+)?$/, 'Must be a number')
    .refine((value) => {
      const decimalPart = value.split('.')[1];
      return !decimalPart || decimalPart.length <= 18;
    }, 'Number must not have more than 18 decimal places'),
  sendAddress: z
    .string()
    .min(1, { message: 'Send address is required' })
    .refine((val) => isAddress(val), { message: 'Invalid address' }),
  objectives: z.string().min(1, { message: 'Objectives is required' }),
  proposalLink: z.string().url({ message: 'Invalid url' }),
  extraLink: z.string().url({ message: 'Invalid url' }).or(z.literal('')),
  extraInfo: z.string().or(z.literal('')),
});
