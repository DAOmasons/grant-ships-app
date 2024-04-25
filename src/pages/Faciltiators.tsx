import { Group, Text } from '@mantine/core';
import { AppAlert } from '../components/UnderContruction';
import { MainSection, PageTitle } from '../layout/Sections';
import { FacilitatorBadge } from '../components/RoleBadges';

export const Facilitators = () => {
  return (
    <MainSection>
      <PageTitle
        title={
          <Group gap={'sm'}>
            <Text fz={20} fw={500}>
              Game Facilitators
            </Text>
            <FacilitatorBadge size={24} />
          </Group>
        }
      />
      <AppAlert
        title="This Page is under construction."
        description="Check back soon to try it out!"
      />
    </MainSection>
  );
};
