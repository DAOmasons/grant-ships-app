import {
  Avatar,
  Box,
  Button,
  Flex,
  Group,
  Paper,
  Skeleton,
  Stack,
  Text,
  useMantineTheme,
} from '@mantine/core';
import { IconEye, IconFlag } from '@tabler/icons-react';
import classes from './dashboard.module.css';

export const ShipDashCard = () => {
  const theme = useMantineTheme();

  return (
    <Paper mih={144} w="100%" bg={theme.colors.dark[6]}>
      <Flex m="lg" align="start" wrap="wrap">
        <Group align="flex-start" w={185}>
          <Avatar size={65} />
          <Box>
            <Text fw={600} mb={0}>
              Project Name
            </Text>
            <Text fz="sm">Last update</Text>
            <Text fz="sm">3 days ago</Text>
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
