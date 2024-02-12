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
import { FundingIndicator } from './FundingIndicator';

type ShipCardProps = { title?: string };

export const ShipCard = ({ title }: ShipCardProps) => {
  return (
    <Paper
      component={Link}
      to={`/ship/test`}
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
            <FundingIndicator amounts={[30, 20, 50]} />
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
