import { useQuery } from '@tanstack/react-query';

import { getBadgeShaman } from '../queries/getBadgeManager';
import { useLocation, useNavigate } from 'react-router-dom';
import { Tabs } from '@mantine/core';
import { BadgeManager } from './BadgeManager';
import { MainSection, PageTitle } from '../layout/Sections';
import { getLeaderboardQuery } from '../queries/getLeaderboard';
import { BadgeRecordsPage } from '../components/dashboard/facilitator/BadgeRecordsPage';
import { Leaderboard } from './Leaderboard';

export const BadgePage = () => {
  const { data: shaman, refetch: refetchShaman } = useQuery({
    queryKey: ['badge-shaman'],
    queryFn: getBadgeShaman,
    enabled: true,
  });

  const navigate = useNavigate();
  const location = useLocation();

  if (!shaman) return null;

  const tab = location.pathname.split('/').pop();

  return (
    <MainSection>
      <PageTitle title="Badge Manager" />
      <Tabs
        value={tab || 'manager'}
        onChange={(tab) => navigate(`/badges/${tab}`)}
      >
        <Tabs.List mb="lg">
          <Tabs.Tab value="manager">Manager</Tabs.Tab>
          <Tabs.Tab value="records">Records</Tabs.Tab>
          <Tabs.Tab value="leaderboard">Leaderboard</Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel value="manager">
          <BadgeManager shaman={shaman} refetchShaman={refetchShaman} />
        </Tabs.Panel>
        <Tabs.Panel value="records">
          <BadgeRecordsPage shaman={shaman} />
        </Tabs.Panel>
        <Tabs.Panel value="leaderboard">
          <Leaderboard />
        </Tabs.Panel>
      </Tabs>
    </MainSection>
  );
};
