import { Box, Text } from '@mantine/core';

import { Contact } from '../Contact';

type DetailsPanelProps = {
  details: {
    thesis: string;
    apply: string;
    extraInfo: string;
    extraLink: string;
    website: string;
    email: string;
    x: string;
    discord: string;
    telegram: string;
    github: string;
  };
  members: string[];
};

export const DetailsPanel = ({
  details: {
    thesis,
    apply,
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
      <Text fw={700} mb={'md'} fz="lg">
        Funding Vision
      </Text>
      <Text size="sm" fw={600} mb="xs">
        Impact Thesis
      </Text>
      <Text size="sm" mb="xl">
        {thesis}
      </Text>
      <Text size="sm" fw={600} mb="xs">
        How to Apply
      </Text>
      <Text size="sm" mb="xl">
        {apply}
      </Text>
      <Text size="sm" fw={600} mb="xs">
        Additional Information
      </Text>
      <Text size="sm" mb="xl">
        {extraInfo}
      </Text>
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
