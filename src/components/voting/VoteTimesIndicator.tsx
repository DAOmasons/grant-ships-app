import {
  Box,
  Flex,
  Group,
  Paper,
  Text,
  Tooltip,
  useMantineTheme,
} from '@mantine/core';
import { useLaptop } from '../../hooks/useBreakpoint';
import { useVoting } from '../../hooks/useVoting';
import { secondsToLongDateTime } from '../../utils/time';
import { IconInfoCircle } from '@tabler/icons-react';
import { VOTING_STAGE_INFO } from '../../constants/copy';
import { VotingStage } from '../../types/common';

export const VoteTimesIndicator = () => {
  const isLaptop = useLaptop();

  const { contest, votingStage } = useVoting();
  const theme = useMantineTheme();

  if (!contest) {
    return null;
  }

  return (
    <Paper
      p={isLaptop ? 0 : 'md'}
      bg={isLaptop ? 'transparent' : theme.colors.dark[6]}
    >
      <Flex direction={isLaptop ? 'column-reverse' : 'column'} gap={'md'}>
        <Flex direction={isLaptop ? 'row' : 'column'}>
          <Box mr={isLaptop ? 'md' : undefined}>
            <Text fz={isLaptop ? 'md' : 'lg'}>Vote Start</Text>
            <Text fz="xs" mb="md">
              {' '}
              {contest.endTime
                ? secondsToLongDateTime(contest.startTime)
                : '--'}
            </Text>
          </Box>
          <Box>
            <Text fz={isLaptop ? 'md' : 'lg'}>Vote End</Text>
            <Text fz="xs">
              {contest.endTime ? secondsToLongDateTime(contest.endTime) : '--'}
            </Text>
          </Box>
        </Flex>
        <Group gap={4} align="center">
          <Text fz="sm">Status: {VotingStage[votingStage]}</Text>
          <Tooltip label={VOTING_STAGE_INFO[votingStage]}>
            <IconInfoCircle
              size={16}
              color={theme.colors.violet[6]}
              style={{
                transform: 'translateY(-1px)',
              }}
            />
          </Tooltip>
        </Group>
      </Flex>
    </Paper>
  );
};
