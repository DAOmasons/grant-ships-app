import { MainSection, PageDescription, PageTitle } from '../layout/Sections';
import { Tabs } from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import { getGameManagerVersions } from '../queries/getGameManagerVersions';
import { VersionsPanel } from '../components/dashboard/dev/VersionPanel';
import { DeploymentPanel } from '../components/dashboard/dev/DeployPanel';

export const DevPanel = () => {
  const {
    data: versions,
    error,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['gm-versions'],
    queryFn: getGameManagerVersions,
  });

  return (
    <MainSection>
      <PageTitle title="Developer Panel" />
      <PageDescription description="Control panel for managing GameManager verions " />
      <Tabs defaultValue="deploy">
        <Tabs.List mb="xl">
          <Tabs.Tab px={'lg'} value="deploy">
            Deploy
          </Tabs.Tab>
          <Tabs.Tab px={'lg'} value="versions">
            Versions
          </Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel value="versions">
          <VersionsPanel
            versions={versions}
            error={error}
            isLoading={isLoading}
            refetch={refetch}
          />
        </Tabs.Panel>
        <Tabs.Panel value="deploy">
          <DeploymentPanel
            versions={versions}
            versionError={error}
            versionLoading={isLoading}
          />
        </Tabs.Panel>
      </Tabs>
    </MainSection>
  );
};
