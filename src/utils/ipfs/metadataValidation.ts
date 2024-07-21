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
  showcaseLinks: z
    .array(z.object({ id: z.string(), url: z.string(), mediaType: z.string() }))
    .optional(),
  bannerImage: z.string().optional(),
});

export const ShipProfileMetadata = z.object({
  name: z.string(),
  mission: z.string(),
  avatarHash_IPFS: z.string(),
  email: z.string(),
  x: z.string(),
  github: z.string(),
  discord: z.string(),
  telegram: z.string(),
  website: z.string(),
});

export const ShipApplicationMetadata = z.object({
  thesis: z.string(),
  guidelines: z.string(),
  fee: z.string(),
  extraLink: z.string(),
  extraInfo: z.string(),
});

export const grantApplicationMetadata = z.object({
  projectId: z.string(),
  dueDate: z.string(),
  objectives: z.string(),
  proposalLink: z.string(),
  extraLink: z.string(),
  extraInfo: z.string(),
});

export const reasonSchema = z.object({
  reason: z.string(),
});

export const gmDeploymentMetadata = z.object({
  title: z.string(),
  description: z.string(),
});
