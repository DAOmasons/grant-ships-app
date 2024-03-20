import { useState } from 'react';
import { MainSection, PageDescription, PageTitle } from '../layout/Sections';
import {
  Box,
  Button,
  Divider,
  Group,
  Tabs,
  Text,
  TextInput,
} from '@mantine/core';
import { useTx } from '../hooks/useTx';
import { isAddress } from 'viem';
import { notifications } from '@mantine/notifications';
import GameManagerFactory from '../abi/GameManagerFactory.json';
import { ADDR } from '../constants/addresses';
import { useQuery } from '@tanstack/react-query';
import { getGameManagerVersions } from '../queries/getGameManagerVersions';
import { SCAN_URL } from '../constants/enpoints';
import { IconExternalLink } from '@tabler/icons-react';

export const DevPanel = () => {
  const {
    data: versions,
    error,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['gm-versions'],
    queryFn: getGameManagerVersions,
  });

  return (
    <MainSection>
      <PageTitle title="Developer Panel" />
      <PageDescription description="Control panel for managing GameManager verions " />
      <Tabs defaultValue="versions">
        <Tabs.List mb="xl">
          <Tabs.Tab px={'lg'} value="versions">
            Version Control
          </Tabs.Tab>
          <Tabs.Tab px={'lg'} value="deployment">
            Deployment
          </Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel value="versions">
          <VersionsPanel
            versions={versions}
            error={error}
            isLoading={isLoading}
            refetch={refetch}
          />
        </Tabs.Panel>
        <Tabs.Panel value="deployment">
          <div>Deployment</div>
        </Tabs.Panel>
      </Tabs>
    </MainSection>
  );
};

const VersionsPanel = ({
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

const VersionForm = ({
  contractName,
  setContractName,
  addressText,
  setAddressText,
  handleAddVersion,
}: {
  contractName: string;
  setContractName: (value: string) => void;
  addressText: string;
  setAddressText: (value: string) => void;
  handleAddVersion: () => void;
}) => {
  return (
    <>
      <Text mb="md" fw={700}>
        Add Version
      </Text>
      <TextInput
        value={contractName}
        onChange={(e) => setContractName(e.target.value)}
        label="Contract Version Name"
        placeholder="game_manager_v..."
        required
        mb="lg"
      />
      <TextInput
        value={addressText}
        onChange={(e) => setAddressText(e.target.value)}
        label="Game Manager Template Address"
        placeholder="0x..."
        required
        mb="lg"
      />
      <Group justify="end" w="100%" mb="md">
        <Button onClick={handleAddVersion}>Add Version</Button>
      </Group>
      <Divider mb="xl" />
    </>
  );
};
