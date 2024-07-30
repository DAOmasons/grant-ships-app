import { ReactNode } from 'react';
import { PageDrawer } from '../PageDrawer';
import { PlayerAvatar } from '../PlayerAvatar';
import { getGatewayUrl, getIpfsImage } from '../../utils/ipfs/get';
import { DAO_MASONS } from '../../constants/gameSetup';
import { Player } from '../../types/ui';
import { Box, Group, Textarea } from '@mantine/core';
import { useInputState } from '@mantine/hooks';
import { TxButton } from '../TxButton';

export const FacilitatorApprovalDrawer = ({
  opened,
  onClose,
}: {
  opened: boolean;
  onClose: () => void;
}) => {
  const [reasonText, setReasonText] = useInputState<string>('');
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
            console.log('Not Approve');
          }}
        >
          Not Approve
        </TxButton>
        <TxButton
          disabled={!reasonText}
          onClick={() => {
            console.log('Not Approve');
          }}
        >
          Not Approve
        </TxButton>
      </Group>
    </PageDrawer>
  );
};
