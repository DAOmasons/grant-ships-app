import { ResolvedTemplate } from '../../../queries/getBadgeManager';
import { BADGE_SHAMAN } from '../../../constants/addresses';
import ScaffoldShaman from '../../../abi/ScaffoldShaman.json';
import { useTx } from '../../../hooks/useTx';
import {
  Avatar,
  Button,
  Group,
  Modal,
  Text,
  useMantineTheme,
} from '@mantine/core';
import { IconTrash } from '@tabler/icons-react';

export const DeleteBadgeModal = ({
  opened,
  onClose,
  template,
  onPollSuccess,
}: {
  opened: boolean;
  onClose: () => void;
  template: ResolvedTemplate;
  onPollSuccess: () => void;
}) => {
  const { tx } = useTx();

  const theme = useMantineTheme();

  const handleDeleteTemplate = async () => {
    if (!template) return;

    onClose();

    tx({
      writeContractParams: {
        abi: ScaffoldShaman,
        functionName: 'removeBadge',
        address: BADGE_SHAMAN,
        args: [template.badgeId],
      },
      writeContractOptions: {
        onPollSuccess() {
          onPollSuccess?.();
        },
      },
    });
  };
  return (
    <Modal
      opened={opened}
      onClose={onClose}
      centered
      w={'50%'}
      title={<Text>Delete "{template.name}"</Text>}
    >
      <Modal.Body>
        <Group w="100%" justify="center" my="xl">
          <Avatar src={template.templateMetadata.imgUrl || ''} size={248} />
        </Group>
        <Group justify="flex-end" mt="md">
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button
            color={theme.colors.red[7]}
            onClick={handleDeleteTemplate}
            leftSection={<IconTrash />}
          >
            Delete
          </Button>
        </Group>
      </Modal.Body>
    </Modal>
  );
};
