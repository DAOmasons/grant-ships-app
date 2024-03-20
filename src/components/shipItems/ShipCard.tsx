import {
  Avatar,
  Box,
  Button,
  Flex,
  Group,
  Paper,
  Text,
  Tooltip,
  useMantineTheme,
} from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import classes from './ShipItemStyles.module.css';
import { IconInfoCircle, IconRocket } from '@tabler/icons-react';
import { FundingIndicator } from './FundingIndicator';

import { GameStatus } from '../../types/common';
import { ShipsCardUI } from '../../types/ui';
import { useUserData } from '../../hooks/useUserState';
import { SHIP_STATUS_INFO } from '../../constants/copy';

export const ShipCard = ({
  id,
  name,
  imgUrl,
  description,
  status,
  amtAllocated,
  amtDistributed,
  amtAvailable,
  gameStatus,
}: ShipsCardUI & { gameStatus: GameStatus }) => {
  const theme = useMantineTheme();
  const navigate = useNavigate();
  const { userData } = useUserData();

  const isShipOperator =
    userData && userData.isShipOperator && userData.shipAddress === id;

  const isGameActive = gameStatus === GameStatus.Active;

  return (
    <Paper
      w="100%"
      mih={220}
      className={classes.cardLink}
      mb={'md'}
      onClick={(e) => {
        e.stopPropagation();
        navigate(`/ship/${id}`);
      }}
    >
      <Flex h="100%" p="lg" w="100%">
        <Box mr="md">
          <Avatar size={65} src={imgUrl} />
        </Box>
        <Box w="100%">
          <Flex w="100%" mb="md" justify="space-between" align={'center'}>
            <Box>
              <Group gap={4}>
                <Text fw={600}>{name}</Text>
                {isShipOperator && (
                  <Tooltip label="You are an operator of this ship.">
                    <IconRocket size={18} color={theme.colors.violet[6]} />
                  </Tooltip>
                )}
              </Group>
              <Group gap={4}>
                <Text fz="sm">{GameStatus[status]}</Text>
                <Tooltip
                  label={
                    SHIP_STATUS_INFO[status as GameStatus] || 'Copy not found'
                  }
                >
                  <IconInfoCircle
                    size={16}
                    style={{ transform: 'translateY(-1px)' }}
                    color={theme.colors.violet[6]}
                  />
                </Tooltip>
              </Group>
            </Box>
            {isGameActive && (
              <FundingIndicator
                allocated={amtAllocated}
                distributed={amtDistributed}
                available={amtAvailable}
              />
            )}
          </Flex>
          <Text size="sm" mb="md" h={60} lineClamp={3}>
            {description}
          </Text>
          <Group>
            <Button
              disabled={!isGameActive}
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/apply-funding/${id}`);
              }}
            >
              Apply For Funding
            </Button>
          </Group>
        </Box>
      </Flex>
    </Paper>
  );
};
