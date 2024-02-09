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
import { IconEye, IconFlag } from '@tabler/icons-react';
import classes from './dashboard.module.css';
import { GameStatus } from '../../types/common';

type ShipDashCardProps = {
  name: string;
  lastUpdate?: string;
  avatarUrl?: string;
  shipStatus: GameStatus;
};

export const ShipDashCard = ({
  name,
  lastUpdate,
  avatarUrl,
}: ShipDashCardProps) => {
  const theme = useMantineTheme();

  return (
    <Paper mih={144} w="100%" bg={theme.colors.dark[6]}>
      <Flex m="lg" align="start" wrap="wrap">
        <Group align="flex-start" w={200}>
          <Avatar size={65} src={avatarUrl} />
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
            <Flex className={classes.statusIcon}>
              <IconEye size={12} />
            </Flex>
            <Text size="sm">Application</Text>
            <Button size="xs" mt="auto" variant="default">
              Review
            </Button>
          </Flex>
          <Flex className={classes.statusBox}>
            <Flex
              className={`${classes.statusIcon} ${classes.statusIconYellowBorder}`}
            >
              <IconFlag size={12} />
            </Flex>
            <Text size="sm">Yellow Flag</Text>
            <Button size="xs" mt="auto" variant="default">
              Issue
            </Button>
          </Flex>
          <Flex className={classes.statusBox}>
            <Flex
              className={`${classes.statusIcon} ${classes.statusIconRedBorder}`}
            >
              <IconFlag size={12} />
            </Flex>
            <Text size="sm">Red Flag</Text>
            <Button size="xs" mt="auto" variant="default">
              Issue
            </Button>
          </Flex>
        </Group>
      </Flex>
    </Paper>
  );
};

export const ShipDashCardSkeleton = () => <Skeleton height={144} />;
