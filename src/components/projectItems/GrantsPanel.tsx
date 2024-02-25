import { Box, Select, Text } from '@mantine/core';
import { useState } from 'react';
import { AppAlert } from '../UnderContruction';
import { secondsToLongDate } from '../../utils/time';
import { GrantUI } from '../../types/ui';

export const GrantsPanel = () => {
  return null;
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
        <GrantDetails
          grantApplication={selectedGrant.grantApplication}
          shipName={selectedGrant.shipName}
          reason={selectedGrant.reason}
        />
      )}
    </Box>
  );
};

const GrantDetails = ({
  grantApplication,
  shipName,
  reason,
}: {
  grantApplication: GrantUI['grantApplication'];
  shipName: string;
  reason: string;
}) => {
  return (
    <Box>
      <Text fz="sm" fw={600}>
        Expected Delivery
      </Text>
      <Text fz="sm" mb="xl">
        {secondsToLongDate(grantApplication.expectedDelivery)}
      </Text>
      <Text fz="sm" fw={600}>
        Proposal Link
      </Text>
      <Text
        fz="sm"
        mb="xl"
        component="a"
        display={'block'}
        href={grantApplication.proposalLink}
        rel="noopener noreferrer"
        target="_blank"
        td={'underline'}
      >
        {grantApplication.proposalLink}
      </Text>
      <Text fz="sm" fw={600}>
        Grant Objectives
      </Text>
      <Text fz="sm" mb="xl">
        {grantApplication.grantObjectives}
      </Text>
      <Text fz="sm" fw={600}>
        Reason for Funding (from {shipName})
      </Text>
      <Text fz="sm" mb="xl">
        {reason}
      </Text>

      {grantApplication.additionalLink && (
        <>
          <Text fz="sm" fw={600}>
            Additional Link
          </Text>
          <Text
            fz="sm"
            mb="xl"
            component="a"
            display={'block'}
            href={grantApplication.additionalLink}
            rel="noopener noreferrer"
            target="_blank"
            td={'underline'}
          >
            {grantApplication.additionalLink}
          </Text>
        </>
      )}
      {grantApplication.extraInfo && (
        <>
          <Text fz="sm" fw={600}>
            Additional Information
          </Text>
          <Text fz="sm" mb="xl">
            {grantApplication.extraInfo}
          </Text>
        </>
      )}
      <Text fz="sm" fw={600}>
        Receiver Address (from {shipName})
      </Text>
      <Text fz="sm">{grantApplication.receiverAddress}</Text>
    </Box>
  );
};
