import { Flex, Stack } from '@mantine/core';
import { ReactNode } from 'react';
import { MainSection, PageTitle } from './Sections';

export const SingleItemPageLayout = ({
  mainSection,
  sideSection,
}: {
  mainSection: ReactNode;
  sideSection: ReactNode;
}) => {
  return (
    <Flex>
      <MainSection maw={534}>
        <PageTitle title="   " />
        {mainSection}
      </MainSection>
      <Stack mt={72} w={270}>
        {sideSection}
      </Stack>
    </Flex>
  );
};
