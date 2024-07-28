import { Box, Button, Divider, Group, Text } from '@mantine/core';
import {
  IconBuildingLighthouse,
  IconChartBar,
  IconFileDescription,
} from '@tabler/icons-react';

export const SettingsPanel = ({
  beacon,
  customApplication,
}: {
  beacon?: string;
  customApplication?: string;
}) => {
  return (
    <Box>
      <Group mb="sm">
        <IconBuildingLighthouse size={24} />
        <Text fz="lg" fw={600}>
          Beacon Message
        </Text>
      </Group>
      <Text fz="sm" mb="md">
        This message will be displayed whenever a project starts a new grant
        with you. In the future, it will also be displayed when you approach
        projects to apply for a grant.
      </Text>
      <Button mb="lg" leftSection={<IconBuildingLighthouse />}>
        Manage Beacon
      </Button>
      <Divider mb="lg" />
      <Group mb="sm">
        <IconFileDescription size={24} />
        <Text fz="lg" fw={600}>
          Custom Application
        </Text>
      </Group>
      <Text fz="sm" mb="md">
        Create a template grant application form to collect the information you
        need.
      </Text>
      <Button mb="lg" leftSection={<IconFileDescription />}>
        Manage Application
      </Button>
      <Divider mb="lg" />
      <Group mb="sm">
        <IconChartBar size={24} />
        <Text fz="lg" fw={600}>
          Portfolio Report
        </Text>
      </Group>
      <Text fz="sm" mb="md">
        Reflect on the round and share your learnings with the community.
        Comment on each project and share a video summary of the round.
      </Text>
      <Button mb="lg" leftSection={<IconChartBar />} disabled>
        Manage Report
      </Button>
      <Divider mb="lg" />
    </Box>
  );
};
