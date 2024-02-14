import { Box, Flex, Overlay, Text } from '@mantine/core';
import classes from './ShipItemStyles.module.css';
import React from 'react';

export const FundingIndicator = ({
  amounts,
}: {
  amounts: [number, number, number];
}) => {
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
