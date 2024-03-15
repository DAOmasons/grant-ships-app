import { Box } from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { getShipGrants } from '../../queries/getShipGrants';

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

  return (
    <Box>
      {/* {grants.map((grant) => (
        <PortfolioGrantCard grant={grant} />
      ))} */}
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
