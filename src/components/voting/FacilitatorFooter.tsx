import { Button, Group, Text, Tooltip, useMantineTheme } from '@mantine/core';
import { PostedRecord } from '../../queries/getRecordsByTag';
import { useTx } from '../../hooks/useTx';
import { notifications } from '@mantine/notifications';
import { addressToBytes32, bytes32toAddress } from '../../utils/helpers';
import { portfolioReportSchema } from '../forms/validationSchemas/portfolioReportSchema';
import { pinJSONToIPFS } from '../../utils/ipfs/pin';
import { Address, encodeAbiParameters, parseAbiParameters } from 'viem';
import { TxButton } from '../TxButton';
import { IconCheck, IconInfoCircle } from '@tabler/icons-react';
import HatsAllowList from '../../abi/HatsAllowList.json';

export const FacilitatorFooter = ({
  isFacilitator,
  recentRecord,
  shipId,
  onSuccess,
  shipChoiceId,
  choicesAddress,
}: {
  isFacilitator?: boolean;
  recentRecord?: PostedRecord | null;
  shipId?: string;
  onSuccess: () => void;
  shipChoiceId?: string;
  choicesAddress?: string;
}) => {
  const theme = useMantineTheme();
  const { tx } = useTx();

  const handleAddChoice = async () => {
    if (!recentRecord) {
      notifications.show({
        title: 'Error',
        message: 'No report submitted',
        color: 'red',
      });
      return;
    }

    if (!isFacilitator) {
      notifications.show({
        title: 'Error',
        message: 'Only facilitator can approve',
        color: 'red',
      });
      return;
    }

    if (!shipId) {
      notifications.show({
        title: 'Error',
        message: 'No ship ID provided',
        color: 'red',
      });
      return;
    }

    const bytes32address = addressToBytes32(shipId);

    const convertedAddress = bytes32toAddress(bytes32address);

    if (convertedAddress !== shipId) {
      notifications.show({
        title: 'Error',
        message: 'Address conversion failed',
        color: 'red',
      });
      return;
    }

    const validated = portfolioReportSchema.safeParse(recentRecord);

    if (!validated.success) {
      notifications.show({
        title: 'Error',
        message: 'Report data is invalid',
        color: 'red',
      });
      return;
    }

    const pinRes = await pinJSONToIPFS(validated.data);

    const encoded = encodeAbiParameters(
      parseAbiParameters('bytes, (uint256, string)'),
      ['0x', [1n, pinRes.IpfsHash]]
    );

    if (!choicesAddress) {
      notifications.show({
        title: 'Error',
        message: 'Choices address not found',
        color: 'red',
      });
      return;
    }

    tx({
      viewParams: {
        awaitEnvioPoll: true,
      },
      writeContractParams: {
        abi: HatsAllowList,
        address: choicesAddress as Address,
        functionName: 'registerChoice',
        args: [bytes32address, encoded],
      },
      writeContractOptions: {
        onPollSuccess() {
          onSuccess?.();
        },
      },
    });
  };

  return (
    <>
      {recentRecord && shipChoiceId == undefined && (
        <Group justify="flex-end" mt="xl">
          {isFacilitator ? (
            <TxButton onClick={handleAddChoice} size="md">
              Approve
            </TxButton>
          ) : (
            <Button
              disabled
              size="md"
              rightSection={
                <Tooltip label="Only facilitator can approve">
                  <IconInfoCircle size={18} />
                </Tooltip>
              }
            >
              Approve
            </Button>
          )}
        </Group>
      )}

      {!recentRecord && (
        <Group gap="xs">
          <IconInfoCircle
            size={18}
            color={theme.colors.yellow[6]}
            style={{ marginLeft: 'auto' }}
          />
          <Text fz="sm" c={theme.colors.yellow[6]}>
            This ship has not submitted a report yet
          </Text>
        </Group>
      )}
      {shipChoiceId && (
        <Group justify="flex-end" gap="xs">
          <IconCheck size={18} color={theme.colors.teal[5]} />
          <Text fz="sm">This ship has been approved</Text>
        </Group>
      )}
    </>
  );
};
