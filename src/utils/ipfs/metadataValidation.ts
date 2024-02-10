import { z } from 'zod';

export const ProjectProfileMetadata = z.object({
  name: z.string(),
  description: z.string(),
  avatarHash_IPFS: z.string(),
  email: z.string(),
  x: z.string(),
  github: z.string(),
  discord: z.string(),
  telegram: z.string(),
  website: z.string(),
});
