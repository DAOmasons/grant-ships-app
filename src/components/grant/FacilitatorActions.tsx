import { Button, Stack, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconPlus } from '@tabler/icons-react';
import { FacilitatorApprovalDrawer } from './FacilitatorApprovalDrawer';
import { useGrant } from '../../hooks/useGrant';
import { GameStatus, GrantStatus } from '../../types/common';
import { PostDrawer } from '../PostDrawer';
import { DAO_MASONS, HATS } from '../../constants/gameSetup';
import { Player } from '../../types/ui';
import { PostGrantDrawer } from './PostGrantDrawer';
import { getGatewayUrl } from '../../utils/ipfs/get';

export const FacilitatorActions = () => {
  const [approvalOpened, { open: openApprove, close: closeApprove }] =
    useDisclosure();
  const [postOpened, { open: openPost, close: closePost }] = useDisclosure();

  const { grant, project, ship, refetchGrant } = useGrant();

  const isReadyToApprove = grant?.status === GrantStatus.MilestonesApproved;
  return (
    <>
      <Stack pos="fixed" top={'260px'} gap="sm">
        {isReadyToApprove && (
          <Button
            variant="menu"
            leftSection={<IconPlus />}
            onClick={openApprove}
          >
            <Text>Review Grantee</Text>
          </Button>
        )}
        <Button variant="menu" leftSection={<IconPlus />} onClick={openPost}>
          <Text>Message</Text>
        </Button>
      </Stack>
      <FacilitatorApprovalDrawer
        opened={approvalOpened}
        onClose={closeApprove}
      />
      <PostGrantDrawer
        opened={postOpened}
        onClose={closePost}
        projectId={project?.id || ''}
        avatarImg={getGatewayUrl(DAO_MASONS.AVATAR_IMG) || ''}
        avatarName={'Facilitators'}
        shipSrcAddress={ship?.shipContractAddress || ''}
        playerType={Player.Facilitators}
        refetch={refetchGrant}
      />
    </>
  );
};
