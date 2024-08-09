import { Button, Stack, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconPlus } from '@tabler/icons-react';
import { FacilitatorApprovalDrawer } from './FacilitatorApprovalDrawer';
import { useGrant } from '../../hooks/useGrant';
import { GameStatus, GrantStatus } from '../../types/common';

export const FacilitatorActions = () => {
  const [approvalOpened, { open: openApprove, close: closeApprove }] =
    useDisclosure();

  const { grant } = useGrant();

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
      </Stack>
      <FacilitatorApprovalDrawer
        opened={approvalOpened}
        onClose={closeApprove}
      />
    </>
  );
};
