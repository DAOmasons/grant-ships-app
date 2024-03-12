import { MainSection, PageDescription, PageTitle } from '../layout/Sections';
import { Box, Tabs, Text } from '@mantine/core';

export const DevPanel = () => {
  return (
    <MainSection>
      <PageTitle title="Developer Panel" />
      <PageDescription description="Control panel for managing GameManager verions " />
      <Tabs defaultValue="versions">
        <Tabs.List mb="xl">
          <Tabs.Tab px={'lg'} value="versions">
            Version Control
          </Tabs.Tab>
          <Tabs.Tab px={'lg'} value="deployment">
            Deployment
          </Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel value="versions">
          <div>Version Control</div>
        </Tabs.Panel>
        <Tabs.Panel value="deployment">
          <div>Deployment</div>
        </Tabs.Panel>
      </Tabs>
    </MainSection>
  );
};

const VersionsPanel = () => {
  return (
    <Box p="md">
      <Text>Add Version</Text>
    </Box>
  );
};
