import { MainSection, PageDescription, PageTitle } from '../layout/Sections';
import { Tabs } from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import { getGameManagerVersions } from '../queries/getGameManagerVersions';
import { VersionsPanel } from '../components/dashboard/dev/VersionPanel';
import { DeploymentPanel } from '../components/dashboard/dev/DeployPanel';
import { getGameManagerDeployments } from '../queries/getGmDeploymnets';
import { DeploymentsPanel } from '../components/dashboard/dev/DeploymentsPanel';

export const DevPanel = () => {
  const {
    data: versions,
    error: versionsError,
    isLoading: versionsLoading,
    refetch: refetchVersions,
  } = useQuery({
    queryKey: ['gm-versions'],
    queryFn: getGameManagerVersions,
  });

  const {
    data: deploys,
    error: deploysError,
    isLoading: deploysLoading,
    refetch: refetchDeploys,
  } = useQuery({
    queryKey: ['gm-deployments'],
    queryFn: getGameManagerDeployments,
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
          <Tabs.Tab px="lg" value="deployments">
            Deployments
          </Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel value="versions">
          <VersionsPanel
            versions={versions}
            error={versionsError}
            isLoading={versionsLoading}
            refetch={refetchVersions}
          />
        </Tabs.Panel>
        <Tabs.Panel value="deploy">
          <DeploymentPanel
            versions={versions}
            versionError={versionsError}
            versionLoading={versionsLoading}
            deploysRefetch={refetchDeploys}
          />
        </Tabs.Panel>
        <Tabs.Panel value="deployments">
          <DeploymentsPanel
            deploys={deploys}
            error={deploysError}
            isLoading={deploysLoading}
          />
        </Tabs.Panel>
      </Tabs>
    </MainSection>
  );
};
