import { Button, Modal, Stack } from '@mantine/core';
import { useConnect } from 'wagmi';

export const NetworksModal = ({
  opened,
}: {
  opened: boolean;
  close: () => void;
}) => {
  const { connectors } = useConnect();

  return (
    <Modal opened={opened} onClose={close} centered title="Connect Wallet">
      <Stack>
        {[...connectors]?.reverse()?.map((connector) => (
          <Button
            key={connector.uid}
            onClick={() => {
              close();
            }}
          >
            {connector.name}
          </Button>
        ))}
      </Stack>
    </Modal>
  );
};
