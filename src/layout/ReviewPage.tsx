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
      <Box maw={600} miw={300} p="xl" fw={700}>
        <Text fz={20} fw={500} mb="lg">
          {title}
        </Text>
        {sections.map((section, index) =>
          section === null ? null : section === 'DIVIDER' ? (
            <Divider mb={'xl'} key={`reviewPage-${index}`} />
          ) : (
            <Box mb="xl" key={`${section.subtitle}-${index}`}>
              <Text fz="lg" fw={700} mb="md">
                {section.subtitle}
              </Text>
              {typeof section.content === 'string' ? (
                <Text fz="md" mb="xl">
                  {section.content}
                </Text>
              ) : (
                <Box mb="xl"> {section.content} </Box>
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
