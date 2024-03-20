import { useState } from 'react';
import { useTx } from '../../../hooks/useTx';
import { isAddress } from 'viem';
import { notifications } from '@mantine/notifications';
import { ADDR } from '../../../constants/addresses';
import { Box, Group, Text } from '@mantine/core';
import { VersionForm } from './VersionForm';
import { IconExternalLink } from '@tabler/icons-react';
import { SCAN_URL } from '../../../constants/enpoints';
import GameManagerFactory from '../../../abi/GameManagerFactory.json';

export const VersionsPanel = ({
  versions,
  error,
  refetch,
  isLoading,
}: {
  versions?: any[];
  error: Error | null;
  isLoading: boolean;
  refetch: () => void;
}) => {
  const { tx } = useTx();
  const [addressText, setAddressText] = useState('');
  const [contractName, setContractName] = useState('');

  const clearForm = () => {
    setAddressText('');
    setContractName('');
  };

  const handleAddVersion = () => {
    if (!isAddress(addressText)) {
      notifications.show({
        title: 'Invalid Address',
        message: 'Please enter a valid address',
        color: 'red',
      });
      return;
    }

    if (!contractName) {
      notifications.show({
        title: 'Invalid Name',
        message: 'Please enter a valid name',
        color: 'red',
      });
      return;
    }

    tx({
      writeContractParams: {
        abi: GameManagerFactory,
        address: ADDR.GM_FACTORY,
        functionName: 'setTemplate',
        args: [contractName, addressText],
      },
      onComplete() {
        refetch();
        clearForm();
      },
    });
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <Box p="md">
      <VersionForm
        contractName={contractName}
        setContractName={setContractName}
        addressText={addressText}
        setAddressText={setAddressText}
        handleAddVersion={handleAddVersion}
      />
      <Text mb="md" fw={700}>
        Previous Versions
      </Text>
      {versions?.map((version) => (
        <Group key={version.name} gap={4}>
          <a
            rel="noreferrer noopener"
            target="_blank"
            href={`${SCAN_URL}/address/${version.address}`}
          >
            {version.name}
          </a>
          <IconExternalLink size={16} />
        </Group>
      ))}
    </Box>
  );
};
