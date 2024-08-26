import { useQuery } from '@tanstack/react-query';

import { getBadgeShaman } from '../queries/getBadgeManager';
import { useNavigate, useParams } from 'react-router-dom';
import { Tabs } from '@mantine/core';
import { BadgeManager } from './BadgeManager';
import { MainSection, PageTitle } from '../layout/Sections';

export const BadgePage = () => {
  const { data: shaman, refetch: refetchShaman } = useQuery({
    queryKey: ['badge-shaman'],
    queryFn: getBadgeShaman,
    enabled: true,
  });

  const navigate = useNavigate();
  const { tab } = useParams();

  if (!shaman) return null;

  return (
    <MainSection>
      <PageTitle title="Badge Manager" />
      <Tabs
        value={tab || 'manager'}
        onChange={(tab) => navigate(`/badge/${tab}`)}
      >
        <Tabs.List mb="lg">
          <Tabs.Tab value="manager">Manager</Tabs.Tab>
          <Tabs.Tab value="records">Records</Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel value="manager">
          <BadgeManager shaman={shaman} refetchShaman={refetchShaman} />
        </Tabs.Panel>
        <Tabs.Panel value="records">test</Tabs.Panel>
      </Tabs>
    </MainSection>
  );
};
