import {
  Avatar,
  Box,
  Button,
  Flex,
  Group,
  Paper,
  Text,
  useMantineTheme,
} from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import classes from './ShipItemStyles.module.css';
import { IconInfoCircle } from '@tabler/icons-react';
import { FundingIndicator } from './FundingIndicator';

import { GameStatus } from '../../types/common';
import { ShipsCardUI } from '../../types/ui';

export const ShipCard = ({
  id,
  name,
  imgUrl,
  description,
  status,
  amtAllocated,
  amtDistributed,
  amtAvailable,
}: ShipsCardUI) => {
  const navigate = useNavigate();
  const theme = useMantineTheme();

  return (
    <Paper
      w="100%"
      mih={235}
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
          <Flex w="100%" mb="md" justify="space-between">
            <Box>
              <Text fw={600}>{name}</Text>
              <Group>
                <Text fz="sm" mr="-6">
                  {GameStatus[status]}
                </Text>
                <IconInfoCircle
                  size={16}
                  style={{ transform: 'translateY(-1px)' }}
                />
              </Group>
            </Box>
            <FundingIndicator
              allocated={amtAllocated}
              distributed={amtDistributed}
              available={amtAvailable}
            />
          </Flex>
          <Text size="sm" mb="md" h={60} lineClamp={3}>
            {description}
          </Text>
          <Button
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/apply-funding/${id}`);
            }}
          >
            Apply For Funding
          </Button>
        </Box>
      </Flex>
    </Paper>
  );
};
