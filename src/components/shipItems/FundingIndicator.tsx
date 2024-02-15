import { Box, Flex, Text } from '@mantine/core';
import classes from './ShipItemStyles.module.css';
import { useMemo } from 'react';

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
  const amounts = useMemo(() => {
    if (
      (!allocated && !distributed && !available) ||
      (allocated === '0' && distributed === '0' && available === '0')
    ) {
      return [34, 33, 33];
    }

    const total = Number(allocated) + Number(distributed) + Number(available);

    return [allocated, distributed, available].map((amt) => {
      return (Number(amt) / total) * 100;
    }) as [number, number, number];
  }, [allocated, distributed, available]);

  return (
    <Box w={238} pos="relative">
      <Flex mb="sm" opacity={0.7}>
        <Box
          w={`${amounts[0]}%`}
          className={`${classes.barSegment} ${classes.leftBar}`}
        />
        <Box
          w={`${amounts[1]}%`}
          className={`${classes.barSegment} ${classes.middleBar}`}
        />
        <Box
          w={`${amounts[2]}%`}
          className={`${classes.barSegment} ${classes.rightBar}`}
        />
      </Flex>
      <Flex gap={'xs'}>
        <Box w="30%">
          <Text fz={10} mb={2} c="white">
            Distributed
          </Text>
          <Box className={classes.indicatorRulerDistributed} opacity={0.7} />
        </Box>
        <Box w="30%" c="white">
          <Text fz={10} mb={2}>
            Allocated
          </Text>
          <Box className={classes.indicatorRulerAllocated} opacity={0.7} />
        </Box>
        <Box w="30%" c="white">
          <Text fz={10} mb={2}>
            Available
          </Text>
          <Box className={classes.indicatorRulerAvailable} opacity={0.7} />
        </Box>
      </Flex>
    </Box>
  );
};
