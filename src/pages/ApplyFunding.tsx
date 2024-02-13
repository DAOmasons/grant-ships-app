import React from 'react';
import { AppAlert } from '../components/UnderContruction';
import { MainSection, PageTitle } from '../layout/Sections';

export const ApplyFunding = () => {
  return (
    <MainSection>
      <PageTitle title="Apply for Funding" />
      <AppAlert
        title="This Feature is under construction."
        description="Check back soon to try it out!"
      />
    </MainSection>
  );
};
