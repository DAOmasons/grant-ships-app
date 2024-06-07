import { z } from 'zod';

export function validateNumberWithMaxDecimals(
  input: string,
  maxDecimals: number
) {
  if (typeof input !== 'string') return null;
  const number = Number(input);
  if (Number.isNaN(number)) {
    return 'Must be a number';
  }

  const parts = input.split('.');
  if (parts.length === 2 && parts[1].length > maxDecimals) {
    return `Must have ${maxDecimals} or fewer decimal places`;
  }

  return null;
}
export const votingSchema = z.object({
  ships: z.array(
    z.object({
      shipId: z.string(),
      shipPerc: z.number().min(0).max(100),
      shipComment: z.string(),
    })
  ),
});
export const voteReasonsSchema = z.object({
  voteReason: z.string(),
});
