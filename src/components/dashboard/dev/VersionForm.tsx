import { Button, Divider, Group, Text, TextInput } from '@mantine/core';

export const VersionForm = ({
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
