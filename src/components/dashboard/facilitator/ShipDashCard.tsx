import {
  Avatar,
  Box,
  Button,
  Flex,
  Group,
  Paper,
  Skeleton,
  Text,
  useMantineTheme,
} from '@mantine/core';
import { IconCheck, IconEye, IconFlag, IconX } from '@tabler/icons-react';
import classes from '../../timeline.module.css';
import { GameStatus } from '../../../types/common';
import { useMemo } from 'react';
import { PINATA_GATEWAY } from '../../../utils/ipfs/get';

type ShipDashCardProps = {
  name: string;
  id: string;
  lastUpdate?: string;
  avatarUrl?: string;
  shipStatus: GameStatus;
  onReview?: (id: string) => void;
};

export const ShipDashCard = ({
  name,
  id,
  lastUpdate,
  avatarUrl,
  shipStatus,
  onReview,
}: ShipDashCardProps) => {
  const theme = useMantineTheme();

  const reviewIcon = useMemo(() => {
    if (shipStatus === GameStatus.Pending) {
      return (
        <Flex className={classes.statusIcon}>
          <IconEye size={16} />
        </Flex>
      );
    }
    if (shipStatus === GameStatus.Rejected) {
      return (
        <Flex className={`${classes.statusIcon} ${classes.statusIconSolidRed}`}>
          <IconX size={16} />
        </Flex>
      );
    }

    return (
      <Flex className={`${classes.statusIcon} ${classes.statusIconSolid}`}>
        <IconCheck size={16} />
      </Flex>
    );
  }, [shipStatus]);

  const canFlag =
    shipStatus !== GameStatus.Pending && shipStatus !== GameStatus.Rejected;

  return (
    <Paper mih={144} w="100%" bg={theme.colors.dark[6]}>
      <Flex m="lg" align="start" wrap="wrap">
        <Group align="flex-start" w={200}>
          <Avatar size={65} src={`${PINATA_GATEWAY}/${avatarUrl}`} />
          <Box>
            <Text fw={600} mb={4} size="sm" truncate maw={115}>
              {name}
            </Text>
            <Text fz="sm" mb={2} size="xs" opacity={0.8}>
              Last update
            </Text>
            <Text fz="sm" size="xs" opacity={0.8}>
              {lastUpdate}
            </Text>
          </Box>
        </Group>
        <Group ml="xl" justify="space-between" gap="xl">
          <Flex className={classes.statusBox}>
            {reviewIcon}
            <Text size="sm">Application</Text>
            <Button
              size="xs"
              mt="auto"
              variant="default"
              onClick={() => onReview?.(id)}
            >
              {shipStatus === GameStatus.Pending ? 'Review' : 'See Ship'}
            </Button>
          </Flex>
          <Flex className={classes.statusBox}>
            <Flex
              className={`${classes.statusIcon} ${classes.statusIconYellowBorder}`}
              opacity={canFlag ? 1 : 0.5}
            >
              <IconFlag size={12} />
            </Flex>
            <Text size="sm" opacity={canFlag ? 1 : 0.5}>
              Yellow Flag
            </Text>
            <Button size="xs" mt="auto" variant="default" disabled={!canFlag}>
              Issue
            </Button>
          </Flex>
          <Flex className={classes.statusBox}>
            <Flex
              opacity={canFlag ? 1 : 0.5}
              className={`${classes.statusIcon} ${classes.statusIconRedBorder}`}
            >
              <IconFlag size={12} />
            </Flex>
            <Text size="sm" opacity={canFlag ? 1 : 0.5}>
              Red Flag
            </Text>
            <Button size="xs" mt="auto" variant="default" disabled={!canFlag}>
              Issue
            </Button>
          </Flex>
        </Group>
      </Flex>
    </Paper>
  );
};

export const ShipDashCardSkeleton = () => <Skeleton height={144} />;
