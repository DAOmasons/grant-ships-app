import { Accordion, Avatar, Box, Text } from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { getShipGrants } from '../../queries/getShipGrants';
import { DashGrant } from '../../resolvers/grantResolvers';
import { formatEther } from 'viem';
import { GAME_TOKEN } from '../../constants/gameSetup';
import { AlloStatus } from '../../types/common';

// type Grant = {
//   id: string;
//   milestonesCount: number;
//   milestonesCompleted: number;
//   amount: number;
// };

// type PortfolioGrant = {
//   id: string;
//   name: string;
//   description: string;
//   grants: Grant[];
// };

// const grants: PortfolioGrant[] = [];

export const PortfolioPanel = () => {
  const { id } = useParams();

  const {
    data: grants,
    error,
    isLoading,
  } = useQuery({
    queryKey: [`portfolio-${id}`],
    queryFn: () => getShipGrants(id as string),
    enabled: !!id,
  });

  if (isLoading) return <Box>Loading...</Box>;

  if (error || !grants)
    return <Box>Error: {error?.message || 'No Grants '}</Box>;

  if (grants.length === 0) return <Box>No Grants</Box>;

  return (
    <Box>
      <Accordion defaultValue={grants[0].id}>
        {grants.map((grant) => (
          <Accordion.Item key={grant.id} value={grant.id}>
            <Accordion.Control
              icon={<Avatar src={grant.projectMetadata.imgUrl} size={32} />}
            >
              {grant.projectId.name}
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

  return (
    <Box>
      <Text fz="sm" mb="md" fw={600}>
        Project Description
      </Text>
      <Text fz="sm">{grant.projectMetadata.description}</Text>
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
