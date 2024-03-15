import {
  Accordion,
  Avatar,
  Box,
  Group,
  Skeleton,
  Stack,
  Text,
  useMantineTheme,
} from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { getShipGrants } from '../../queries/getShipGrants';

import { formatEther } from 'viem';
import { GAME_TOKEN } from '../../constants/gameSetup';
import { IconExclamationCircle, IconExternalLink } from '@tabler/icons-react';
import { SCAN_URL } from '../../constants/enpoints';
import { AppAlert } from '../UnderContruction';
import { DashGrant } from '../../resolvers/grantResolvers';
import { AlloStatus } from '../../types/common';

export const PortfolioPanel = () => {
  const { id } = useParams();
  const theme = useMantineTheme();

  const {
    data: grants,
    error,
    isLoading,
  } = useQuery({
    queryKey: [`portfolio-${id}`],
    queryFn: () => getShipGrants(id as string),
    enabled: !!id,
  });

  if (isLoading)
    return (
      <Stack>
        <Skeleton height={400} />
        <Skeleton height={50} />
        <Skeleton height={50} />
        <Skeleton height={50} />
      </Stack>
    );

  if (error || !grants)
    return (
      <AppAlert
        title="Error"
        icon={<IconExclamationCircle />}
        description={error?.message || 'Grant Data failed to load'}
        bg={theme.colors.pink[8]}
      />
    );

  if (grants.length === 0)
    return (
      <AppAlert
        title="No Grants"
        description={"This ship hasn't approved any grants yet."}
      />
    );

  return (
    <Box>
      <Accordion defaultValue={grants[0].id}>
        {grants.map((grant) => (
          <Accordion.Item key={grant.id} value={grant.id}>
            <Accordion.Control
              px="lg"
              py="xs"
              icon={<Avatar src={grant.projectMetadata.imgUrl} size={32} />}
            >
              {grant.projectId.name} (
              {formatEther(grant.applicationData.grantAmount)}{' '}
              {GAME_TOKEN.SYMBOL})
            </Accordion.Control>
            <Accordion.Panel>
              <PorfolioItem grant={grant} />
            </Accordion.Panel>
          </Accordion.Item>
        ))}
      </Accordion>
    </Box>
  );
};

const PorfolioItem = ({ grant }: { grant: DashGrant }) => {
  const completedMilestones = grant.milestones
    ? grant.milestones.filter(
        (ms) => ms.milestoneStatus === AlloStatus.Accepted
      ).length
    : [];

  const status =
    completedMilestones === grant.milestones?.length ? 'Completed' : 'Active';

  return (
    <Box>
      <Text fz="sm" className="ws-pre-wrap" mb="md">
        <Text component="span" fz="sm" fw={600}>
          Status:{' '}
        </Text>
        {status}
      </Text>
      <Box mb="md">
        <Text fz="sm" mb="md" fw={600}>
          Receiving Address:{' '}
        </Text>
        <Text
          fz="sm"
          component="a"
          td="underline"
          href={`${SCAN_URL}/address/${grant.applicationData.receivingAddress}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Group gap={4}>
            {grant.applicationData.receivingAddress}{' '}
            <IconExternalLink size={14} />
          </Group>
        </Text>
      </Box>
      <Text fz="sm" mb="md" fw={600}>
        Project Description
      </Text>
      <Text fz="sm" mb="md">
        {grant.projectMetadata.description}
      </Text>
      <Text fz="sm" mb="md" fw={600}>
        Grant Details
      </Text>
      <ul style={{ paddingLeft: '1.6rem' }}>
        <Text fz="sm">
          <li>
            <Text component="span" fz="sm" fw={600}>
              Amount:{' '}
            </Text>
            {formatEther(grant.applicationData.grantAmount)} {GAME_TOKEN.SYMBOL}
          </li>
        </Text>
        <Text fz="sm">
          <li>
            <Text component="span" fz="sm" fw={600}>
              Milestones:{' '}
            </Text>
            {completedMilestones}/{grant.milestones?.length} milestones
            completed
          </li>
        </Text>
        <Text fz="sm" className="ws-pre-wrap">
          <li>
            <Text component="span" fz="sm" fw={600}>
              Reason for funding:{' '}
            </Text>
            {grant.shipApprovalReason}
          </li>
        </Text>
        <Text fz="sm" className="ws-pre-wrap">
          <li>
            <Text component="span" fz="sm" fw={600}>
              Facilitator Approval Reason:{' '}
            </Text>
            {grant.facilitatorReason}
          </li>
        </Text>
      </ul>
    </Box>
  );
};

// const PortfolioGrantCard = ({ grant }: { grant: PortfolioGrant }) => {
//   return (
//     <Box>
//       <Text fz="lg" fw={600} mb="md">
//         {grant.name}
//       </Text>
//       <Text fz="sm" mb="md">
//         {grant.description}
//       </Text>
//       <Stack>
//         {grant.grants.map((grant) => (
//           <GrantCard grant={grant} />
//         ))}
//       </Stack>
//       <Divider />
//     </Box>
//   );
// };

// const GrantCard = ({ grant }: { grant: Grant }) => {
//   return (
//     <>
//       <Text fz="sm" mb="xs">
//         {grant.amount} {GAME_TOKEN.SYMBOL}
//       </Text>
//       <Text fz="sm" mb="xs">
//         {grant.milestonesCompleted}/{grant.milestonesCount} Milestones Completed
//       </Text>
//       <Divider />
//     </>
//   );
// };
