import { PageDrawer } from '../PageDrawer';
import { PlayerAvatar } from '../PlayerAvatar';
import { getGatewayUrl } from '../../utils/ipfs/get';
import { DAO_MASONS } from '../../constants/gameSetup';
import { Player } from '../../types/ui';
import { Box, Group, Textarea } from '@mantine/core';
import { useInputState } from '@mantine/hooks';
import { TxButton } from '../TxButton';
import { useTx } from '../../hooks/useTx';
import AlloAbi from '../../abi/Allo.json';
import { ADDR } from '../../constants/addresses';
import { AlloStatus } from '../../types/common';
import { useGrant } from '../../hooks/useGrant';
import { Address, encodeAbiParameters, parseAbiParameters } from 'viem';
import { notifications } from '@mantine/notifications';
import { reasonSchema } from '../../utils/ipfs/metadataValidation';
import { pinJSONToIPFS } from '../../utils/ipfs/pin';

export const FacilitatorApprovalDrawer = ({
  opened,
  onClose,
}: {
  opened: boolean;
  onClose: () => void;
}) => {
  const [reasonText, setReasonText] = useInputState<string>('');
  const { grant, project, ship, refetchGrant } = useGrant();
  const { tx } = useTx();

  const handleApprove = async (isApproved: boolean) => {
    if (!project || !ship || !grant) {
      notifications.show({
        title: 'Error',
        message: 'Invalid Data for review',
        color: 'red',
      });
      return;
    }

    const validated = reasonSchema.safeParse({ reason: reasonText });

    if (!validated.success) {
      notifications.show({
        title: 'Error',
        message: validated.error.message,
        color: 'red',
      });
      return;
    }

    onClose();

    const pinRes = await pinJSONToIPFS({
      reason: reasonText,
    });

    const encoded = encodeAbiParameters(
      parseAbiParameters('address, uint8, uint256, (uint256, string)'),
      [
        project.id as Address,
        isApproved ? AlloStatus.Accepted : AlloStatus.Rejected,
        grant?.amount,
        [1n, pinRes.IpfsHash],
      ]
    );

    tx({
      writeContractParams: {
        abi: AlloAbi,
        functionName: 'allocate',
        address: ADDR.ALLO,
        args: [ship.poolId, encoded],
      },
      writeContractOptions: {
        onPollSuccess() {
          refetchGrant();
        },
      },
    });
  };

  return (
    <PageDrawer opened={opened} onClose={onClose}>
      <PlayerAvatar
        imgUrl={getGatewayUrl(DAO_MASONS.AVATAR_IMG)}
        playerType={Player.Facilitators}
        name="Facilitators"
      />
      <Box mt="sm">
        <Textarea
          value={reasonText}
          onChange={setReasonText}
          label="Reason"
          required
          minRows={5}
          autosize
          mb="lg"
        />
      </Box>
      <Group justify="flex-end">
        <TxButton
          variant="secondary"
          disabled={!reasonText}
          onClick={() => {
            handleApprove(false);
          }}
        >
          Not Approve
        </TxButton>
        <TxButton
          disabled={!reasonText}
          onClick={() => {
            handleApprove(true);
          }}
        >
          Approve
        </TxButton>
      </Group>
    </PageDrawer>
  );
};
