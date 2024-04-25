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
import { Dispatch, SetStateAction, useMemo, useState } from 'react';
import { TxButton } from '../../TxButton';
import { useTablet } from '../../../hooks/useBreakpoint';
import { Link } from 'react-router-dom';

type ShipDashCardProps = {
  name: string;
  id: string;
  lastUpdate?: string;
  avatarUrl?: string;
  shipStatus: GameStatus;
  hasCurrentRound?: boolean;
  onReview?: (
    id: string,
    buttonLoading: Dispatch<SetStateAction<boolean>>
  ) => void;
};

export const ShipDashCard = ({
  name,
  id,
  lastUpdate,
  avatarUrl,
  shipStatus,
  onReview,
}: ShipDashCardProps) => {
  const [reviewLoading, setReviewLoading] = useState(false);
  const theme = useMantineTheme();
  const isTablet = useTablet();

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
    <Paper w="100%" bg={theme.colors.dark[6]}>
      <Flex p="lg" align="start" direction={isTablet ? 'column' : 'row'}>
        <Link to={`/ship/${id}`}>
          <Group align="flex-start" w={200} mb={isTablet ? 'lg' : 0}>
            <Avatar size={65} src={avatarUrl} />
            <Box>
              <Text fw={600} mb={4} size="sm" truncate maw={115}>
                {name}
              </Text>
            </Box>
          </Group>
        </Link>
        <Group ml={isTablet ? 0 : 'lg'} gap="xl">
          <Flex className={classes.statusBox}>
            {reviewIcon}
            <Text size="sm">Application</Text>
            <TxButton
              size="xs"
              mt="auto"
              variant="default"
              onClick={() => onReview?.(id, setReviewLoading)}
              loading={reviewLoading}
            >
              {shipStatus === GameStatus.Pending ? 'Review' : 'See Ship'}
            </TxButton>
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
