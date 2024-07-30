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
    .array(
      z.object({
        id: z.string(),
        url: z.string(),
        mediaType: z.string(),
      })
    )
    .optional(),
  bannerImage: z.string().optional(),
  mainDemoLink: z
    .string()
    .url({ message: 'Invalid url' })
    .or(z.literal(''))
    .optional(),
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
  bannerImage: z.string().optional(),
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

export const milestoneSchema = z.object({
  milestoneDetails: z.string(),
  date: z.number(),
});
