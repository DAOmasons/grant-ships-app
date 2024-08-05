import { notifications } from '@mantine/notifications';
import { useForm, zodResolver } from '@mantine/form';
import { registerProjectSchema } from '../components/forms/validationSchemas/registerProjectSchema';
import { z } from 'zod';

import { generateRandomUint256 } from '../utils/helpers';
import { ProjectProfileMetadata } from '../utils/ipfs/metadataValidation';
import { pinJSONToIPFS } from '../utils/ipfs/pin';
import { createMetadata, projectProfileHash } from '../utils/metadata';
import { useAccount } from 'wagmi';
import { useUserData } from '../hooks/useUserState';
import { useTx } from '../hooks/useTx';
import Registry from '../abi/Registry.json';
import { ADDR } from '../constants/addresses';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { MediaForm } from '../components/forms/MediaForm';
import { MediaType, ShowcaseLink } from '../utils/media';
import { ProjectPageUI } from '../types/ui';
import { ProjectMetadataForm } from '../components/forms/ProjectMetadataForm';

export type ProjectFormValues = z.infer<typeof registerProjectSchema>;

export const RegisterProject = ({
  existingProject,
  refetchOnEdit,
}: {
  existingProject?: ProjectPageUI;
  refetchOnEdit?: () => void;
}) => {
  const { address } = useAccount();
  const { refetchUser } = useUserData();
  const navigate = useNavigate();
  const { tx } = useTx();

  const isEditing = !!existingProject;

  const form = useForm({
    validateInputOnBlur: true,
    initialValues: {
      avatarHash: existingProject?.avatarHash || '',
      name: existingProject?.name || '',
      description: existingProject?.description || '',
      email: existingProject?.email || '',
      x: existingProject?.x || '',
      github: existingProject?.github || '',
      discord: existingProject?.discord || '',
      telegram: existingProject?.telegram || '',
      website: existingProject?.website || '',
      showcaseLinks:
        existingProject?.showcaseLinks ||
        ([
          {
            id: 'showcase-link-0',
            url: '',
            mediaType: MediaType.None,
          },
        ] as ShowcaseLink[]),
      mainDemoLink: existingProject?.mainDemoLink || '',
      bannerImage: existingProject?.bannerImage || '',
    },
    validate: zodResolver(registerProjectSchema),
  });

  const handleSubmit = async (values: ProjectFormValues) => {
    try {
      const nonce = generateRandomUint256();

      const projectMetadata = {
        name: values.name,
        description: values.description,
        avatarHash_IPFS: values.avatarHash,
        email: values.email,
        x: values.x,
        github: values.github,
        discord: values.discord,
        telegram: values.telegram,
        website: values.website,
        bannerImage: values.bannerImage || '',
        showcaseLinks:
          values.showcaseLinks && values.showcaseLinks.length
            ? values.showcaseLinks.filter(
                (link) =>
                  link.mediaType !== MediaType.None &&
                  link.mediaType !== MediaType.Unknown
              )
            : [],
        mainDemoLink: values.mainDemoLink || '',
      };

      const validation = ProjectProfileMetadata.safeParse(projectMetadata);

      if (!validation.success) {
        notifications.show({
          title: 'Validation Error',
          message: validation.error.errors[0].message,
          color: 'red',
        });
        return;
      }

      const pinRes = await pinJSONToIPFS(validation.data);

      if (typeof pinRes.IpfsHash !== 'string' && pinRes.IpfsHash[0] !== 'Q') {
        notifications.show({
          title: 'IPFS Upload Error',
          message: pinRes.IpfsHash[1],
          color: 'red',
        });
        return;
      }

      const schemaCode = projectProfileHash();
      const metadataStruct = createMetadata({
        protocol: schemaCode,
        ipfsHash: pinRes.IpfsHash,
      });

      if (isEditing) {
        if (!existingProject || !existingProject?.profileId) {
          notifications.show({
            title: 'Error',
            message: 'Existing project not found',
            color: 'red',
          });
          return;
        }
        navigate(-1);
        tx({
          writeContractParams: {
            abi: Registry,
            address: ADDR.REGISTRY,
            functionName: 'updateProfileMetadata',
            args: [existingProject?.profileId, [1n, pinRes.IpfsHash]],
          },
          viewParams: {
            successButton: {
              label: 'Go see your project!',
              onClick: () => navigate(`/project/${existingProject.id}`),
            },
          },
          onComplete() {
            refetchOnEdit?.();
            refetchUser();
          },
        });
      } else {
        tx({
          writeContractParams: {
            abi: Registry,
            address: ADDR.REGISTRY,
            functionName: 'createProfile',
            args: [nonce, values.name, metadataStruct, address, []],
          },
          viewParams: {
            successButton: {
              label: 'Go find some Grants!',
              onClick: () => navigate('/ships'),
            },
          },
          onComplete() {
            refetchUser();
          },
        });
      }
    } catch (error: any) {
      console.error(error);
      notifications.show({
        title: 'Transaction Error',
        message: error.message,
        color: 'red',
      });
    }
  };

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <ProjectMetadataForm
              form={form}
              onSubmit={handleSubmit}
              isEditing={isEditing}
              projectId={existingProject?.id}
            />
          }
        />
        <Route
          path="edit"
          element={
            <ProjectMetadataForm
              form={form}
              onSubmit={handleSubmit}
              isEditing={isEditing}
              projectId={existingProject?.id}
            />
          }
        />
        <Route path="edit-media" element={<MediaForm form={form} />} />
      </Routes>
    </>
  );
};
