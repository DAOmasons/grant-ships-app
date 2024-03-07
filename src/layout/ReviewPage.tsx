import { Box, Divider, Flex, Text } from '@mantine/core';
import { ReactNode } from 'react';

type TextSection = {
  subtitle: string;
  content: ReactNode;
};

export const ReviewPage = ({
  title,
  sections,
  footerSection,
}: {
  title: string;
  sections: (TextSection | 'DIVIDER' | null)[];
  footerSection?: ReactNode;
}) => {
  return (
    <Flex justify={'center'} w="100%" h={'90vh'}>
      <Box maw={600} miw={300} p="xl" fw={700} w="100%">
        <Text fz={'xl'} fw={600} mb="lg">
          {title}
        </Text>
        {sections.map((section, index) =>
          section === null ? null : section === 'DIVIDER' ? (
            <Divider mb={'xl'} key={`reviewPage-${index}`} />
          ) : (
            <Box mb="lg" key={`${section.subtitle}-${index}`}>
              <Text fw={700} mb="sm">
                {section.subtitle}
              </Text>
              {typeof section.content === 'string' ? (
                <Text fz="sm" mb="lg">
                  {section.content}
                </Text>
              ) : (
                <Box component="span" mb="lg">
                  {section.content}{' '}
                </Box>
              )}
            </Box>
          )
        )}
        {footerSection && <Divider mb={'xl'} />}
        <Box pb="xl">{footerSection}</Box>
      </Box>
    </Flex>
  );
};
