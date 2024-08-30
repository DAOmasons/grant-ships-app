import { useDisclosure } from '@mantine/hooks';
import { useGrant } from '../../hooks/useGrant';
import { Button, Group, Stack, Text } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';
import { PostGrantDrawer } from './PostGrantDrawer';
import { Player } from '../../types/ui';
import { GrantStatus } from '../../types/common';
import { EarlyReviewButton } from './EarlyReview';

export const ShipActions = () => {
  const { refetchGrant, project, ship, grant } = useGrant();
  const [postOpened, { open: openPost, close: closePost }] = useDisclosure();

  const canRequestEarly =
    grant?.status != null &&
    grant.status >= GrantStatus.ApplicationSubmitted &&
    grant.status < GrantStatus.MilestonesApproved;

  return (
    <>
      <Stack pos="fixed" top={'260px'} gap="sm">
        <Button variant="menu" leftSection={<IconPlus />} onClick={openPost}>
          <Text>Message</Text>
        </Button>
        {canRequestEarly && <EarlyReviewButton />}
      </Stack>
      <PostGrantDrawer
        opened={postOpened}
        onClose={closePost}
        projectId={project?.id || ''}
        avatarImg={ship?.profileMetadata?.imgUrl || ''}
        avatarName={ship?.name || ''}
        shipSrcAddress={ship?.shipContractAddress || ''}
        playerType={Player.Ship}
        refetch={refetchGrant}
      />
    </>
  );
};

export const ShipActionsMobile = () => {
  const { refetchGrant, project, ship } = useGrant();
  const [postOpened, { open: openPost, close: closePost }] = useDisclosure();

  return (
    <>
      <Group gap="sm">
        <Button
          size="xs"
          variant="menu"
          leftSection={<IconPlus size={14} />}
          onClick={openPost}
        >
          Message
        </Button>
      </Group>
      <PostGrantDrawer
        opened={postOpened}
        onClose={closePost}
        projectId={project?.id || ''}
        avatarImg={ship?.profileMetadata?.imgUrl || ''}
        avatarName={ship?.name || ''}
        shipSrcAddress={ship?.shipContractAddress || ''}
        playerType={Player.Ship}
        refetch={refetchGrant}
      />
    </>
  );
};
