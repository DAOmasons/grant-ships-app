import { Box, Divider, Stack, Text } from '@mantine/core';
import { GAME_TOKEN } from '../../constants/gameSetup';
import { AppAlert } from '../UnderContruction';

type Grant = {
  id: string;
  milestonesCount: number;
  milestonesCompleted: number;
  amount: number;
};

type PortfolioGrant = {
  id: string;
  name: string;
  description: string;
  grants: Grant[];
};

const grants: PortfolioGrant[] = [];

export const PortfolioPanel = () => {
  return (
    <Box>
      <AppAlert
        title="This Feature is under construction."
        description="Check back soon to try it out!"
      />
      {grants.map((grant) => (
        <PortfolioGrantCard grant={grant} />
      ))}
    </Box>
  );
};

const PortfolioGrantCard = ({ grant }: { grant: PortfolioGrant }) => {
  return (
    <Box>
      <Text fz="lg" fw={600} mb="md">
        {grant.name}
      </Text>
      <Text fz="sm" mb="md">
        {grant.description}
      </Text>
      <Stack>
        {grant.grants.map((grant) => (
          <GrantCard grant={grant} />
        ))}
      </Stack>
      <Divider />
    </Box>
  );
};

const GrantCard = ({ grant }: { grant: Grant }) => {
  return (
    <>
      <Text fz="sm" mb="xs">
        {grant.amount} {GAME_TOKEN.SYMBOL}
      </Text>
      <Text fz="sm" mb="xs">
        {grant.milestonesCompleted}/{grant.milestonesCount} Milestones Completed
      </Text>
      <Divider />
    </>
  );
};
