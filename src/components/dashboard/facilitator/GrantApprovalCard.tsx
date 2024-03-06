import {
  Avatar,
  Box,
  Flex,
  Group,
  Paper,
  Text,
  useMantineTheme,
} from '@mantine/core';
import { Link } from 'react-router-dom';
import { secondsToRelativeTime } from '../../../utils/time';
import { DashGrant } from '../../../resolvers/grantResolvers';
import { FacilitatorReview } from './FacilitatorGrantReview';

export const GrantApprovalCard = ({ grant }: { grant: DashGrant }) => {
  const theme = useMantineTheme();
  return (
    <Paper bg={theme.colors.dark[6]} mih={100} w="100%" p="lg">
      <Flex>
        <Group align="start">
          <Avatar
            size={66}
            component={Link}
            to={`/project/${grant.projectId.id}`}
            src={grant.projectMetadata.imgUrl}
          />
          <Box>
            <Text
              fw={600}
              component={Link}
              to={`/project/${grant.projectId.id}`}
            >
              {grant.projectId.name}
            </Text>
            <Text fz="xs">
              {' '}
              Approved by:{' '}
              <Link
                to={`/ship/${grant.shipId.id}`}
                style={{ color: theme.colors.dark[0] }}
              >
                {grant.shipId.name}
              </Link>
            </Text>
            <Text fz="xs">
              Last Updated: {secondsToRelativeTime(grant.lastUpdated)}
            </Text>
          </Box>
        </Group>
        <FacilitatorReview grant={grant} />
      </Flex>
    </Paper>
  );
};
