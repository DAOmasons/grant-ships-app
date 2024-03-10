import { Box, Text } from '@mantine/core';

import { Contact } from '../Contact';
import { ShipPageUI } from '../../types/ui';

type DetailsPanelProps = {
  details: ShipPageUI['details'];
  members: string[];
};

export const DetailsPanel = ({
  details: {
    thesis,
    apply,
    fee,
    extraInfo,
    extraLink,
    website,
    email,
    x,
    discord,
    telegram,
    github,
  },
  members,
}: DetailsPanelProps) => {
  return (
    <Box>
      {(!thesis && !apply && !fee) || (
        <Text fw={700} mb={'md'} fz="lg">
          Funding Vision
        </Text>
      )}

      {thesis && (
        <>
          <Text size="sm" fw={600} mb="xs">
            Allocation Strategy
          </Text>
          <Text size="sm" mb="xl" className="ws-pre-wrap">
            {thesis}
          </Text>
        </>
      )}
      {apply && (
        <>
          <Text size="sm" fw={600} mb="xs">
            How to Apply
          </Text>
          <Text size="sm" mb="xl" className="ws-pre-wrap">
            {apply}
          </Text>
        </>
      )}
      {fee && (
        <>
          <Text size="sm" fw={600} mb="xs">
            Management Fee
          </Text>
          <Text size="sm" mb="xl">
            {fee}%
          </Text>
        </>
      )}
      {extraInfo && (
        <>
          <Text size="sm" fw={600} mb="xs">
            Additional Information
          </Text>
          <Text size="sm" mb="xl" className="ws-pre-wrap">
            {extraInfo}
          </Text>
        </>
      )}
      {extraLink && (
        <>
          <Text size="sm" fw={600} mb="xs">
            Read More Here
          </Text>
          <Text
            component={'a'}
            href="#"
            size="sm"
            mb="xl"
            rel="noopener noreferrer"
            target="_blank"
          >
            {extraLink}
          </Text>
        </>
      )}
      <Contact
        members={members}
        website={website}
        email={email}
        x={x}
        discord={discord}
        telegram={telegram}
        github={github}
      />
    </Box>
  );
};
