import { z } from 'zod';

export const portfolioReportSchema = z.object({
  roundReview: z.string().min(1, { message: 'Round Review is required' }),
  grantReviews: z.record(
    z.string().min(1, { message: 'Grant Review is required' })
  ),
});
