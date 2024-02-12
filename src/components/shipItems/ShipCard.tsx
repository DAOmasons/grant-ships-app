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
import { Link } from 'react-router-dom';
import classes from './ShipItemStyles.module.css';
import { IconInfoCircle } from '@tabler/icons-react';

type ShipCardProps = { title?: string };

export const ShipCard = ({ title }: ShipCardProps) => {
  const theme = useMantineTheme();

  return (
    <Paper
      component={Link}
      to={`/`}
      w="100%"
      mih={235}
      className={classes.cardLink}
      mb={'md'}
    >
      <Flex h="100%" p="lg" w="100%">
        <Box mr="md">
          <Avatar size={65} />
        </Box>
        <Box>
          <Flex w="100%" mb="md" justify="space-between">
            <Box>
              <Text fw={600}>Ship Name</Text>
              <Group>
                <Text fz="sm" mr="-6">
                  Approved
                </Text>
                <IconInfoCircle
                  size={16}
                  style={{ transform: 'translateY(-1px)' }}
                />
              </Group>
            </Box>
            <Box w={238}>
              <Flex mb="sm">
                <Box
                  w={`${30}%`}
                  className={`${classes.barSegment} ${classes.leftBar}`}
                />
                <Box
                  w={`${20}%`}
                  className={`${classes.barSegment} ${classes.middleBar}`}
                />
                <Box
                  w={`${50}%`}
                  className={`${classes.barSegment} ${classes.rightBar}`}
                />
              </Flex>
              <Flex gap={'xs'}>
                <Box w="30%">
                  <Text
                    fz={10}
                    mb={2}
                    className={classes.indicatorTextAllocated}
                  >
                    Allocated
                  </Text>
                  <Box className={classes.indicatorRulerAllocated} />
                </Box>
                <Box w="30%">
                  <Text
                    fz={10}
                    mb={2}
                    className={classes.indicatorTextDistributed}
                  >
                    Distributed
                  </Text>
                  <Box className={classes.indicatorRulerDistributed} />
                </Box>
                <Box w="30%">
                  <Text
                    fz={10}
                    mb={2}
                    className={classes.indicatorTextAvailable}
                  >
                    Available
                  </Text>
                  <Box className={classes.indicatorRulerAvailable} />
                </Box>
              </Flex>
            </Box>
          </Flex>
          <Text size="sm" mb="md">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book.
          </Text>
          <Button variant="default">Apply For Funding </Button>
        </Box>
      </Flex>
    </Paper>
  );
};
