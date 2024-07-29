import {
  Box,
  Divider,
  Group,
  Stack,
  Text,
  useMantineTheme,
} from '@mantine/core';
import { IconClock, IconExternalLink } from '@tabler/icons-react';
import { PlayerAvatar } from '../PlayerAvatar';
import { Player } from '../../types/ui';
import { useGrant } from '../../hooks/useGrant';
import { Content } from '@tiptap/react';
import { RTDisplay } from '../RTDisplay';
import { secondsToLongDate } from '../../utils/time';
import { formatEther } from 'viem';
import { GAME_TOKEN } from '../../constants/gameSetup';
import { SCAN_URL } from '../../constants/enpoints';

export const ApplicationDisplay = ({
  amountRequested,
  receivingAddress,
  dueDate,
  rtContent,
}: {
  amountRequested: string;
  receivingAddress: string;
  dueDate: number;
  rtContent: Content;
}) => {
  const theme = useMantineTheme();
  const { project, ship } = useGrant();

  const formattedTime = secondsToLongDate(dueDate);
  const formattedAmount = formatEther(BigInt(amountRequested));

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
          <IconClock size={18} />
          <Text fz={'sm'}>Application in Review</Text>
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
            <Text size="sm">
              {formattedAmount} {GAME_TOKEN.SYMBOL}
            </Text>
          </Box>
          <Box>
            <Text size="sm" fw={700}>
              Expected Delivery
            </Text>
            <Text size="sm">{formattedTime}</Text>
          </Box>
          <Box>
            <Text size="sm" fw={700}>
              Send Address
            </Text>
            <Text
              size="sm"
              component="a"
              href={`${SCAN_URL}address/${receivingAddress}`}
              target="_blank"
              td="underline"
              c={theme.colors.blue[3]}
              rel="noopener noreferrer"
            >
              {receivingAddress} <IconExternalLink size={14} />
            </Text>
          </Box>
        </Stack>
        <RTDisplay content={rtContent} minified />
        <Divider variant="dotted" mt="lg" />
        <Text size="xs" mt="lg" mb="lg" opacity={0.8}>
          Posted By:
        </Text>
      </Box>
      <Divider mb="lg" />
    </Box>
  );
};
