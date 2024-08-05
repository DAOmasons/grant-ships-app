import { Button, Stack, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconPlus } from '@tabler/icons-react';
import { FacilitatorApprovalDrawer } from './FacilitatorApprovalDrawer';

export const FacilitatorActions = () => {
  const [approvalOpened, { open: openApprove, close: closeApprove }] =
    useDisclosure();
  return (
    <>
      <Stack pos="fixed" top={'260px'} gap="sm">
        <Button variant="menu" leftSection={<IconPlus />} onClick={openApprove}>
          <Text>Review Grantee</Text>
        </Button>
      </Stack>
      <FacilitatorApprovalDrawer
        opened={approvalOpened}
        onClose={closeApprove}
      />
    </>
  );
};
