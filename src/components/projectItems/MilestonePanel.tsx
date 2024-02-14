import React, { useState } from 'react';
import { GrantUI } from '../../pages/Project';
import { AppAlert } from '../UnderContruction';
import { Box, Select, Text, Timeline, useMantineTheme } from '@mantine/core';
import { IconCheck, IconEye, IconX } from '@tabler/icons-react';
import { MilestoneStatus } from '../../types/ui';
import { toEther } from '@thirdweb-dev/react';
import { GAME_TOKEN } from '../../constants/gameSetup';

export const MilestonePanel = ({ grants }: { grants: GrantUI[] }) => {
  if (grants.length === 0) {
    return <NoGrants />;
  }

  return <HasGrants grants={grants} />;
};
const NoGrants = () => {
  return (
    <AppAlert
      title="No Grants Approved Yet"
      description="You don't have any grants approved yet. Apply for a grant from a Grant Ship and wait for approval."
    />
  );
};

const HasGrants = ({ grants }: { grants: GrantUI[] }) => {
  const [value, setValue] = useState<string | null>(null);

  const selectedGrant = grants.find(
    (grant) => `From ${grant.shipName}` === value
  );

  return (
    <Box>
      <Select
        value={value}
        data={grants.map((grant) => `From ${grant.shipName}`)}
        w={320}
        onChange={(v) => setValue(v)}
        label="Select a Grant"
        description="Select a grant to view more details"
        mb="xl"
      />
      {selectedGrant && (
        <MilestoneDetails milestones={selectedGrant.milestones} />
      )}
    </Box>
  );
};

const MilestoneDetails = ({
  milestones,
}: {
  milestones: GrantUI['milestones'];
}) => {
  const theme = useMantineTheme();

  return (
    <Timeline bulletSize={32} lineWidth={2} active={milestones?.length - 1}>
      {milestones.map((milestone, i) => (
        <Timeline.Item
          key={`milestone-timeline-${i}`}
          bullet={
            milestone.status === MilestoneStatus.Approved ? (
              <IconCheck />
            ) : milestone.status === MilestoneStatus.InReview ? (
              <IconEye />
            ) : milestone.status === MilestoneStatus.Rejected ? (
              <IconX />
            ) : (
              i + 1
            )
          }
          color={
            milestone.status === MilestoneStatus.Approved
              ? theme.colors.blue[6]
              : milestone.status === MilestoneStatus.InReview
                ? theme.colors.violet[6]
                : milestone.status === MilestoneStatus.Rejected
                  ? theme.colors.pink[6]
                  : theme.colors.dark[5]
          }
        >
          <Text fw={600} component="span">
            Milestone {i + 1}
          </Text>{' '}
          ({toEther(milestone.amount)} {GAME_TOKEN.SYMBOL})
          <Text fz="sm" mt="sm" mb="sm" opacity={0.8}>
            {milestone.description}
          </Text>
        </Timeline.Item>
      ))}
    </Timeline>
  );
};
