import { Button, Modal, Stack } from '@mantine/core';
import { Connector, useConnect } from 'wagmi';

export const NetworksModal = ({
  opened,
}: {
  opened: boolean;
  close: () => void;
}) => {
  console.log('opened', opened);
  const { connectors, connect } = useConnect();

  const handleConnect = (connector: Connector) => {};
  return (
    <Modal opened={opened} onClose={close} centered title="Connect Wallet">
      <Stack>
        {[...connectors]?.reverse()?.map((connector) => (
          <Button
            key={connector.uid}
            onClick={() => {
              close();
              console.log('fired');
            }}
          >
            {connector.name}
          </Button>
        ))}
      </Stack>
    </Modal>
  );
};
