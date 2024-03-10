import { MainSection, PageTitle } from '../layout/Sections';
import { Box, Button, Text } from '@mantine/core';
import { Link } from 'react-router-dom';

import { AppAlert } from '../components/UnderContruction';
import { useUserData } from '../hooks/useUserState';

export const Apply = () => {
  const { userLoading, userData } = useUserData();

  const noProjects = !userLoading && userData?.projects.length === 0;

  return (
    <MainSection>
      <PageTitle title="Applications" />
      <Box w="100%">
        {noProjects && (
          <AppAlert
            title="It looks like you haven't started any projects yet"
            description="Don't worry, getting started is easy!"
          />
        )}
        <Text fw={600} mb="xs" mt={noProjects ? undefined : 88}>
          Seeking Funding for your project?
        </Text>
        <Text opacity={0.8} mb="sm">
          Start by creating a project profile to outline your goals, objectives,
          and team. Let's bring your ideas to life! Click below to register your
          project profile.
        </Text>
        <Button component={Link} to="/create-project" mb={56}>
          Register Project Profile
        </Button>
        <Text fw={600} mb="xs">
          Already have a Profile?
        </Text>
        <Text opacity={0.8} mb="sm">
          Submit a Grant Application to a Grant Ship to secure the funding you
          need. Click below to start the application process and fuel your
          project's success.
        </Text>
        <Button component={Link} to="/ships" mb={56}>
          Find a Grant Ship
        </Button>
        <Text fw={600} mb="xs">
          Want to become a Grant Ship?
        </Text>
        <Text opacity={0.8} mb="sm">
          Grant Ships are individual Grant programs that provide funding to
          projects within an ecosystem. If this sounds appealing to you,
          register a ship profile and create an application.
        </Text>
        <Button mb="xl" component={Link} to="/create-ship">
          Create a Grant Ship
        </Button>
      </Box>
    </MainSection>
  );
};
