import { Group, Paper, Text, useMantineTheme } from '@mantine/core';
import { MainSection, PageTitle } from '../../layout/Sections';
import { ShipBadge } from '../RoleBadges';

export const PreVoting = () => {
  const theme = useMantineTheme();
  return (
    <MainSection>
      <PageTitle title="Vote" />
      <Paper p="lg" bg={theme.colors.dark[6]} py={48} px={25} mt={80}>
        <Group mb="xl">
          <ShipBadge size={32} />
          <Text fz={32} fw={600}>
            Voting is not open yet!
          </Text>
        </Group>
        <Text fw={600} mb={'sm'}>
          Stay Tuned!
        </Text>
        <Text mb="xl" c={theme.colors.dark[2]} fz="md">
          The voting round for Grant Ships is opened after the allocation round.
        </Text>
        <Text fw={600} mb={'sm'}>
          How it works
        </Text>
        <Text fz="md" c={theme.colors.dark[2]} mb="sm">
          Ships receive funds from a DAO to distribute as grants for projects in
          one round. At the round's end, DAO members allocate votes to ships
          based on their performance.
        </Text>
        <Text fz="md" c={theme.colors.dark[2]}>
          Ships then receive funds in the next round based on the proportion of
          votes they received.
        </Text>
      </Paper>
    </MainSection>
  );
};
