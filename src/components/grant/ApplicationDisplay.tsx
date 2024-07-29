import {
  Box,
  Button,
  Divider,
  Group,
  Spoiler,
  Stack,
  Text,
  Textarea,
  useMantineTheme,
} from '@mantine/core';
import {
  IconCheck,
  IconChevronCompactDown,
  IconChevronCompactUp,
  IconChevronDown,
  IconChevronUp,
  IconClock,
  IconExclamationCircle,
  IconExternalLink,
  IconFileX,
  IconQuestionMark,
} from '@tabler/icons-react';
import { PlayerAvatar } from '../PlayerAvatar';
import { Player } from '../../types/ui';
import { useGrant } from '../../hooks/useGrant';
import { Content } from '@tiptap/react';
import { RTDisplay } from '../RTDisplay';
import { secondsToLongDate } from '../../utils/time';
import { Address, formatEther } from 'viem';
import { GAME_TOKEN, ZER0_ADDRESS } from '../../constants/gameSetup';
import { SCAN_URL } from '../../constants/enpoints';
import { GameStatus } from '../../types/common';
import { useInputState } from '@mantine/hooks';
import { useTx } from '../../hooks/useTx';
import { useState } from 'react';
import { notifications } from '@mantine/notifications';
import GrantShipAbi from '../../abi/GrantShip.json';
import { Tag } from '../../constants/tags';
import { reasonSchema } from '../../utils/ipfs/metadataValidation';
import { pinJSONToIPFS } from '../../utils/ipfs/pin';
import classes from '../../styles/Spoiler.module.css';

export const ApplicationDisplay = ({
  amountRequested,
  receivingAddress,
  dueDate,
  rtContent,
  status,
  id,
}: {
  id: string;
  amountRequested: string;
  receivingAddress: string;
  dueDate: number;
  rtContent: Content;
  status: GameStatus;
}) => {
  const theme = useMantineTheme();
  const { project, ship, grant, isShipOperator } = useGrant();

  const formattedTime = secondsToLongDate(dueDate);
  const formattedAmount = formatEther(BigInt(amountRequested));

  const isCurrentDraft = grant?.currentApplication?.id;

  const color = !isCurrentDraft
    ? theme.colors.dark[2]
    : status === GameStatus.Pending
      ? theme.colors.yellow[6]
      : status === GameStatus.Accepted
        ? theme.colors.green[6]
        : status === GameStatus.Rejected
          ? theme.colors.red[6]
          : theme.colors.dark[2];

  const tagIcon = !isCurrentDraft ? (
    <IconFileX size={18} color={color} />
  ) : status === GameStatus.Pending ? (
    <IconClock size={18} color={color} />
  ) : status === GameStatus.Accepted ? (
    <IconCheck size={18} color={color} />
  ) : status === GameStatus.Rejected ? (
    <IconExclamationCircle size={18} color={color} />
  ) : (
    <IconQuestionMark size={18} color={color} />
  );

  const applicationText = !isCurrentDraft
    ? 'Draft Expired'
    : status === GameStatus.Pending
      ? 'Application in Review'
      : status === GameStatus.Accepted
        ? 'Application Approved'
        : GameStatus.Rejected
          ? 'Application Not Approved'
          : 'Unknown Status';

  const isOldOrRejected = !isCurrentDraft || status === GameStatus.Rejected;

  return (
    <Box>
      <Box
        py={6}
        px={12}
        style={{ borderRadius: '4px' }}
        display="inline-block"
        bg={theme.colors.dark[5]}
        mb="md"
      >
        <Group gap={6}>
          {tagIcon}
          <Text fz={'sm'} c={color}>
            {applicationText}
          </Text>
        </Group>
      </Box>
      <Box pl={50} mb="lg">
        <Group gap={8} mb={'lg'}>
          <PlayerAvatar
            playerType={Player.Project}
            name={project?.name}
            display="grantTimeline"
            imgUrl={project?.metadata?.imgUrl}
          />
          <Text size="sm" opacity={0.8}>
            submitted a grant application to {ship?.name}
          </Text>
        </Group>
        <Divider variant="dotted" mb="lg" />
        <Stack gap="sm" mb="sm">
          <Box>
            <Text size="sm" fw={700} mb={4}>
              Amount Requested
            </Text>
            <Text size="sm" td={isOldOrRejected ? 'line-through' : undefined}>
              {formattedAmount} {GAME_TOKEN.SYMBOL}
            </Text>
          </Box>
          <Box>
            <Text size="sm" fw={700}>
              Expected Delivery
            </Text>
            <Text size="sm" td={isOldOrRejected ? 'line-through' : undefined}>
              {formattedTime}
            </Text>
          </Box>
          <Box>
            <Text size="sm" fw={700}>
              Send Address
            </Text>
            <Text
              td={isOldOrRejected ? 'line-through' : 'underline'}
              size="sm"
              component="a"
              href={`${SCAN_URL}address/${receivingAddress}`}
              target="_blank"
              c={theme.colors.blue[3]}
              rel="noopener noreferrer"
            >
              {receivingAddress} <IconExternalLink size={14} />
            </Text>
          </Box>
        </Stack>
        {isOldOrRejected ? (
          <Spoiler
            hideLabel={<IconChevronUp stroke={1} />}
            showLabel={<IconChevronDown stroke={1} />}
            classNames={{
              root: classes.embedTextBox,
              control: classes.embedTextControl,
            }}
          >
            <RTDisplay content={rtContent} minified />
          </Spoiler>
        ) : (
          <RTDisplay content={rtContent} minified />
        )}
        {isShipOperator && status === GameStatus.Pending && (
          <OperatorControls />
        )}
      </Box>
      <Divider mb="lg" />
    </Box>
  );
};

const OperatorControls = () => {
  const { ship, project, refetchGrant } = useGrant();
  const [reason, setReason] = useInputState('');
  const [isLoading, setIsLoading] = useState(false);
  const { tx } = useTx();

  const handleApprove = async (isApproved: boolean) => {
    try {
      setIsLoading(true);
      if (!ship || !ship.shipContractAddress) {
        notifications.show({
          title: 'Error',
          message: 'Ship not found',
          color: 'red',
        });
        setIsLoading(false);
        return;
      }

      if (!project) {
        notifications.show({
          title: 'Error',
          message: 'Project not found',
          color: 'red',
        });
        setIsLoading(false);
        return;
      }

      const metadata = {
        reason: reason,
      };

      const parsed = reasonSchema.safeParse(metadata);

      if (!parsed.success) {
        notifications.show({
          title: 'Error',
          message: 'Invalid metadata',
          color: 'red',
        });
        setIsLoading(false);
        return;
      }

      const pinRes = await pinJSONToIPFS(parsed.data);

      if (typeof pinRes.IpfsHash !== 'string' && pinRes.IpfsHash[0] !== 'Q') {
        notifications.show({
          title: 'IPFS Upload Error',
          message: pinRes.IpfsHash[1],
          color: 'red',
        });
        setIsLoading(false);
        return;
      }

      const TAG = `${Tag.ShipReviewGrant}:${project.id}:${isApproved ? GameStatus.Accepted : GameStatus.Rejected}`;

      tx({
        writeContractParams: {
          abi: GrantShipAbi,
          address: ship.shipContractAddress as Address,
          functionName: 'postUpdate',
          args: [TAG, [1n, pinRes.IpfsHash], ZER0_ADDRESS],
        },
        writeContractOptions: {
          onPollSuccess() {
            refetchGrant();
            setIsLoading(false);
          },
          onError() {
            setIsLoading(false);
          },
          onPollTimeout() {
            setIsLoading(false);
          },
        },
      });
    } catch (error) {
      console.error(error);
      notifications.show({
        title: 'Error',
        message: 'Failed to approve grant',
        color: 'red',
      });
      setIsLoading(false);
    }
  };

  return (
    <Box mt="sm">
      <Textarea
        value={reason}
        onChange={setReason}
        label="Reason"
        placeholder="Provide constructive feedback and reasoning for your decision."
        minRows={3}
        autosize
        required
        mb="lg"
      />
      <Group justify="flex-end">
        <Button
          variant="secondary"
          disabled={isLoading || !reason}
          onClick={() => handleApprove(false)}
        >
          Not Approve
        </Button>
        <Button
          variant="primary"
          disabled={isLoading || !reason}
          onClick={() => handleApprove(true)}
        >
          Approve
        </Button>
      </Group>
    </Box>
  );
};
