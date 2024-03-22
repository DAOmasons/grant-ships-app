import { z } from 'zod';
import { GmDeploymentFragment } from '../.graphclient';
import { getIpfsJson } from '../utils/ipfs/get';
import { gmDeploymentMetadata } from '../utils/ipfs/metadataValidation';

type PoolMetadata = z.infer<typeof gmDeploymentMetadata>;

export type GmDeployment = GmDeploymentFragment & {
  poolMetadata: PoolMetadata;
};

export const resolveDeployments = async (
  deployments: GmDeploymentFragment[]
) => {
  try {
    const res = await Promise.all(
      deployments.map(async (deployment) => {
        if (!deployment || !deployment.poolMetadata.pointer) {
          return null;
        }

        const json = await getIpfsJson(deployment.poolMetadata.pointer);

        const validated = gmDeploymentMetadata.safeParse(json);

        if (!validated.success) {
          console.error('Invalid metadata', validated.error);
          throw new Error('Invalid metadata: Data does not match the schema');
        }

        return {
          ...deployment,
          poolMetadata: validated.data,
        };
      })
    );

    return res.filter(Boolean) as GmDeployment[];
  } catch (error) {
    console.error('Failed to resolve deployments', error);
    throw new Error(`Failed to resolve deployments: ${error}`);
  }
};
