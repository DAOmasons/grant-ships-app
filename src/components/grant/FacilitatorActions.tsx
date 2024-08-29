import {
  Box,
  Button,
  Group,
  Stack,
  Text,
  Textarea,
  useMantineTheme,
} from '@mantine/core';
import { useDisclosure, useInputState } from '@mantine/hooks';
import { IconExclamationCircle, IconPlus } from '@tabler/icons-react';
import { FacilitatorApprovalDrawer } from './FacilitatorApprovalDrawer';
import { useGrant } from '../../hooks/useGrant';
import { GameStatus, GrantStatus } from '../../types/common';
import { DAO_MASONS, GAME_TOKEN } from '../../constants/gameSetup';
import { Player } from '../../types/ui';
import { PostGrantDrawer } from './PostGrantDrawer';
import { getGatewayUrl, getIpfsJson } from '../../utils/ipfs/get';
import { PageDrawer } from '../PageDrawer';
import { PlayerAvatar } from '../PlayerAvatar';
import { TxButton } from '../TxButton';
import { Address, formatEther } from 'viem';
import { Bold } from '../Typography';
import { useTx } from '../../hooks/useTx';
import GrantShipAbi from '../../abi/GrantShip.json';
import { pinJSONToIPFS } from '../../utils/ipfs/pin';
import { reasonSchema } from '../../utils/ipfs/metadataValidation';
import { notifications } from '@mantine/notifications';

export const FacilitatorActions = () => {
  const theme = useMantineTheme();
  const [approvalOpened, { open: openApprove, close: closeApprove }] =
    useDisclosure();
  const [postOpened, { open: openPost, close: closePost }] = useDisclosure();
  const [clawbackOpened, { open: openClawback, close: closeClawback }] =
    useDisclosure();
  const { grant, project, ship, refetchGrant } = useGrant();

  const isAllocated = grant?.status === GrantStatus.Allocated;
  const isReadyToApprove = grant?.status === GrantStatus.MilestonesApproved;

  return (
    <>
      <Stack pos="fixed" top={'260px'} gap="sm">
        {isReadyToApprove && (
          <Button
            variant="menu"
            leftSection={<IconPlus />}
            onClick={openApprove}
          >
            <Text>Review Grantee</Text>
          </Button>
        )}
        <Button variant="menu" leftSection={<IconPlus />} onClick={openPost}>
          <Text>Message</Text>
        </Button>
        {isAllocated && (
          <Button
            variant="menu"
            c={theme.colors.red[5]}
            leftSection={<IconExclamationCircle />}
            onClick={openClawback}
          >
            <Text>Clawback</Text>
          </Button>
        )}
      </Stack>
      <FacilitatorApprovalDrawer
        opened={approvalOpened}
        onClose={closeApprove}
      />
      <PostGrantDrawer
        opened={postOpened}
        onClose={closePost}
        projectId={project?.id || ''}
        avatarImg={getGatewayUrl(DAO_MASONS.AVATAR_IMG) || ''}
        avatarName={'Facilitators'}
        shipSrcAddress={ship?.shipContractAddress || ''}
        playerType={Player.Facilitators}
        refetch={refetchGrant}
      />
      <ClawbackDrawer
        opened={clawbackOpened}
        onClose={closeClawback}
        projectId={project?.id || ''}
        avatarImg={getGatewayUrl(DAO_MASONS.AVATAR_IMG) || ''}
        avatarName={'Facilitators'}
        shipContractAddress={ship?.shipContractAddress || ''}
        playerType={Player.Facilitators}
        refetch={refetchGrant}
      />
    </>
  );
};

export const FacActionsMobile = () => {
  const [approvalOpened, { open: openApprove, close: closeApprove }] =
    useDisclosure();
  const [postOpened, { open: openPost, close: closePost }] = useDisclosure();
  const [clawbackOpened, { open: openClawback, close: closeClawback }] =
    useDisclosure();

  const { grant, project, ship, refetchGrant } = useGrant();

  const isAllocated = grant?.status === GrantStatus.Allocated;
  const isReadyToApprove = grant?.status === GrantStatus.MilestonesApproved;

  return (
    <>
      <Group gap="sm">
        {isReadyToApprove && (
          <Button
            variant="menu"
            leftSection={<IconPlus />}
            onClick={openApprove}
            size="xs"
          >
            Review Grantee
          </Button>
        )}
        <Button
          variant="menu"
          leftSection={<IconPlus size={14} />}
          onClick={openPost}
          size="xs"
        >
          Message
        </Button>
        {isAllocated && (
          <Button
            variant="menu"
            leftSection={<IconExclamationCircle size={14} />}
            onClick={openClawback}
            size="xs"
          >
            Clawback Funds
          </Button>
        )}
      </Group>
      <FacilitatorApprovalDrawer
        opened={approvalOpened}
        onClose={closeApprove}
      />
      <PostGrantDrawer
        opened={postOpened}
        onClose={closePost}
        projectId={project?.id || ''}
        avatarImg={getGatewayUrl(DAO_MASONS.AVATAR_IMG) || ''}
        avatarName={'Facilitators'}
        shipSrcAddress={ship?.shipContractAddress || ''}
        playerType={Player.Facilitators}
        refetch={refetchGrant}
      />
      <ClawbackDrawer
        opened={clawbackOpened}
        onClose={closeClawback}
        projectId={project?.id || ''}
        shipContractAddress={ship?.shipContractAddress || ''}
        avatarImg={getGatewayUrl(DAO_MASONS.AVATAR_IMG) || ''}
        avatarName={'Facilitators'}
        playerType={Player.Facilitators}
        refetch={refetchGrant}
      />
    </>
  );
};

const ClawbackDrawer = ({
  opened,
  onClose,
  avatarImg,
  avatarName,
  playerType,
  shipContractAddress,
  projectId,
  refetch,
}: {
  opened: boolean;
  onClose: () => void;
  avatarImg: string;
  shipContractAddress: string;
  projectId: string;
  avatarName: string;
  playerType: Player;
  refetch?: () => void;
}) => {
  const [reasonText, setReasonText] = useInputState<string>('');
  const theme = useMantineTheme();
  const { tx } = useTx();
  const { currentMilestoneSet, currentApplication } = useGrant();

  const handleClawback = async () => {
    if (!reasonText) return;

    if (!shipContractAddress || !projectId) {
      notifications.show({
        title: 'Error',
        message: 'Invalid Data for clawback',
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

    const ipfsRes = await pinJSONToIPFS({
      reason: reasonText,
    });

    if (ipfsRes.IpfsHash[0] !== 'Q') {
      notifications.show({
        title: 'Error',
        message: 'Unable to pin JSON to IPFS',
        color: 'red',
      });
      return;
    }

    onClose();

    tx({
      writeContractParams: {
        abi: GrantShipAbi,
        address: shipContractAddress as Address,
        functionName: 'clawbackGrant',
        args: [projectId, [1n, ipfsRes.IpfsHash]],
      },
      writeContractOptions: {
        onPollSuccess() {
          refetch?.();
          setReasonText('');
        },
      },
    });
  };

  return (
    <PageDrawer pageTitle="Clawback Funds" opened={opened} onClose={onClose}>
      <Group mt="40" mb="lg" w="100%" justify="space-between">
        <PlayerAvatar
          playerType={playerType}
          imgUrl={avatarImg}
          name={avatarName}
        />
        <TxButton
          leftSection={<IconExclamationCircle />}
          onClick={handleClawback}
          color={theme.colors.red[9]}
          disabled={!reasonText}
        >
          Clawback
        </TxButton>
      </Group>
      <Box>
        <Group mb="md" gap={8}>
          <IconExclamationCircle size={20} />
          <Text fw={600}>Clawback Milestones</Text>
        </Group>
        <Box mb="sm">
          {currentMilestoneSet?.milestones?.map((milestone) => {
            const perc = Number(formatEther(milestone.percentage)) * 100;

            const milestoneAmount = formatEther(
              (BigInt(currentApplication?.amount) / 100n) * BigInt(perc)
            );

            return (
              <Text
                fz="sm"
                mb="sm"
                opacity={0.8}
                key={milestone.id}
                td={
                  milestone.status === GameStatus.Accepted
                    ? 'line-through'
                    : 'none'
                }
              >
                <Bold>Milestone {milestone.index + 1}: </Bold>
                {perc}% ({milestoneAmount} {GAME_TOKEN.SYMBOL})
              </Text>
            );
          })}
        </Box>
      </Box>
      <Textarea
        value={reasonText}
        onChange={setReasonText}
        label="Reason"
        required
        minRows={5}
        autosize
        mb="lg"
      />
    </PageDrawer>
  );
};
