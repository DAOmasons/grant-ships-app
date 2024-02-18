import { isAddress } from 'viem';
import { z } from 'zod';

export const registerShipSchema = z.object({
  avatarHash: z.string().min(1, { message: 'Avatar is required' }),
  name: z
    .string()
    .min(3, { message: 'Name should have at least 3 characters' })
    .max(50, { message: 'Name should not have more than 50 characters' }),

  teamMembers: z.array(z.string()).refine(
    (val) => {
      return val.every((address) => isAddress(address));
    },
    { message: 'Must be valid Ethereum addresses' }
  ),
  mission: z
    .string()
    .min(50, {
      message: 'Mission should have at least 100 characters',
    })
    .max(350, {
      message: 'Mission should not have more than 350 characters',
    }),
  email: z.string().email({ message: 'Invalid email address' }),
  website: z.string().url({ message: 'Invalid url' }).or(z.literal('')),
  x: z.string().url({ message: 'Invalid x url' }).or(z.literal('')),
  github: z.string().url({ message: 'Invalid github url' }).or(z.literal('')),
  discord: z.string().url({ message: 'Invalid discord url' }).or(z.literal('')),
  telegram: z
    .string()
    .url({ message: 'Invalid telegram url' })
    .or(z.literal('')),
});
