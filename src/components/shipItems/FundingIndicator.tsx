import { Box, Flex, Text, Tooltip, useMantineTheme } from '@mantine/core';
import classes from './ShipItemStyles.module.css';
import { Fragment, useMemo } from 'react';
import { formatEther } from 'viem';
import { GAME_TOKEN } from '../../constants/gameSetup';
import { theme } from '../../theme';

// TODO -  This component sucks.
// Once the data model is more refined, we can make this a lot better.

type IndicatorProps = {
  allocated: string;
  distributed: string;
  available: string;
};

export const FundingIndicator = ({
  allocated,
  distributed,
  available,
}: IndicatorProps) => {
  const theme = useMantineTheme();
  const amounts = useMemo(() => {
    if (
      (!allocated && !distributed && !available) ||
      (allocated === '0' && distributed === '0' && available === '0')
    ) {
      return [34, 33, 33];
    }

    const total = Number(allocated) + Number(distributed) + Number(available);

    return [distributed, allocated, available].map((amt) => {
      return (Number(amt) / total) * 100;
    }) as [number, number, number];
  }, [allocated, distributed, available]);

  return (
    <Box w={238} pos="relative">
      <Flex mb="sm" opacity={0.7} style={{ borderRadius: '100px' }}>
        <Tooltip
          label={`Distributed ${formatEther(BigInt(distributed))} ${GAME_TOKEN.SYMBOL}`}
        >
          <Box
            w={`${amounts[0]}%`}
            className={`${classes.barSegment} ${classes.leftBar}`}
          />
        </Tooltip>
        <Tooltip
          label={`Allocated ${formatEther(BigInt(allocated))} ${GAME_TOKEN.SYMBOL}`}
        >
          <Box
            w={`${amounts[1]}%`}
            className={`${classes.barSegment} ${classes.middleBar}`}
          />
        </Tooltip>
        <Tooltip
          label={`Available ${formatEther(BigInt(available))} ${GAME_TOKEN.SYMBOL}`}
        >
          <Box
            w={`${amounts[2]}%`}
            className={`${classes.barSegment} ${classes.rightBar}`}
          />
        </Tooltip>
      </Flex>
      <Flex gap={'xs'}>
        <Tooltip
          label={
            <Box p={'xs'}>
              <Text fz="sm">Distributed</Text>
              <Text fz="xs">
                Amount sent to projects for milestones completed
              </Text>
            </Box>
          }
          position="bottom"
        >
          <Box w="30%" c="white">
            <Text fz={10} mb={2} c="white">
              Distributed
            </Text>
            <Box className={classes.indicatorRulerDistributed} />
          </Box>
        </Tooltip>
        <Tooltip
          label={
            <Box p={'xs'}>
              <Text fz="sm">Allocated</Text>
              <Text fz="xs">Amount set aside for selected projects</Text>
            </Box>
          }
          position="bottom"
        >
          <Box w="30%" c="white">
            <Text fz={10} mb={2}>
              Allocated
            </Text>
            <Box className={classes.indicatorRulerAllocated} />
          </Box>
        </Tooltip>
        <Box w="30%" c="white">
          <Text fz={10} mb={2}>
            Available
          </Text>
          <Box className={classes.indicatorRulerAvailable} />
        </Box>
      </Flex>
    </Box>
  );
};
