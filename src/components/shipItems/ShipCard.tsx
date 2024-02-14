import { Avatar, Box, Button, Flex, Group, Paper, Text } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import classes from './ShipItemStyles.module.css';
import { IconInfoCircle } from '@tabler/icons-react';
import { FundingIndicator } from './FundingIndicator';
import { useMemo } from 'react';
import { ShipCardProps } from '../../pages/Ships';
import { GameStatus } from '../../types/common';

export const ShipCard = ({
  id,
  name,
  imgUrl,
  description,
  status,
  amtAllocated,
  amtDistributed,
  amtAvailable,
}: ShipCardProps) => {
  const navigate = useNavigate();

  const amounts = useMemo(() => {
    const total =
      Number(amtAllocated) + Number(amtDistributed) + Number(amtAvailable);

    return [amtAllocated, amtDistributed, amtAvailable].map((amt) => {
      return (Number(amt) / total) * 100;
    }) as [number, number, number];
  }, [amtAllocated, amtDistributed, amtAvailable]);

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
            <FundingIndicator amounts={amounts} />
          </Flex>
          <Text size="sm" mb="md" h={80} lineClamp={4}>
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
