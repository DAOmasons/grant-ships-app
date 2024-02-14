import { MainSection, PageTitle } from '../layout/Sections';
import { useMediaQuery } from '@mantine/hooks';
import {
  Button,
  Flex,
  Loader,
  Select,
  TextInput,
  Textarea,
  em,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { IconCalendar, IconExternalLink } from '@tabler/icons-react';
import { useQuery } from '@tanstack/react-query';
import { DatePickerInput } from '@mantine/dates';
import { GAME_TOKEN } from '../constants/gameSetup';

const defaultValues = {};

const DummyProjects = [
  { id: '0x123', name: 'Project 1' },
  { id: '0x124', name: 'Project 2' },
];

function getAsyncData() {
  return new Promise((resolve) => {
    setTimeout(() => resolve(DummyProjects), 2000);
  });
}

export const ApplyFunding = () => {
  const { data: userProjects, isLoading } = useQuery<any>({
    queryKey: ['user-projects'],
    queryFn: getAsyncData,
  });
  const isMobile = useMediaQuery(`(max-width: ${em(750)})`);

  const form = useForm({
    initialValues: defaultValues,
    // validate: zodResolver(shipApplicationSchema),
  });

  const handleBlur = (fieldName: string) => {
    form.validateField(fieldName);
  };
  return (
    <MainSection>
      <PageTitle title="Grant Application" />
      <Flex direction={isMobile ? 'column' : 'row'} mb="md">
        <Select
          w="100%"
          label="Project"
          disabled={isLoading}
          rightSection={isLoading ? <Loader /> : undefined}
          required
          mb={isMobile ? 'md' : undefined}
          {...form.getInputProps('projectId')}
          onBlur={() => handleBlur('projectId')}
          data={userProjects?.map((project: any) => ({
            value: project.id,
            label: project.name,
          }))}
          mr={'md'}
        />
        <DatePickerInput
          w="100%"
          label="Expected Delivery"
          required
          placeholder="Date"
          leftSection={<IconCalendar size={16} />}
          {...form.getInputProps('dueDate')}
          onBlur={() => handleBlur('dueDate')}
        />
      </Flex>
      <Flex direction={isMobile ? 'column' : 'row'} mb="md">
        <TextInput
          w="100%"
          label="Total Amount Requested"
          required
          mb={isMobile ? 'md' : undefined}
          placeholder={GAME_TOKEN.SYMBOL}
          {...form.getInputProps('fee')}
          onBlur={() => handleBlur('fee')}
          mr={'md'}
        />
        <TextInput
          w="100%"
          required
          label="Send Address"
          placeholder="0x234..."
          {...form.getInputProps('sendAddress')}
          onBlur={() => handleBlur('sendAddress')}
        />
      </Flex>
      <Textarea
        w="100%"
        required
        mb="md"
        label="Grant Objectives"
        autosize
        minRows={4}
        maxRows={8}
        description="A few short, realistic, and preferably measurable objectives for the grant"
        placeholder="World Peace, End Hunger, Slay Moloch, etc."
        {...form.getInputProps('objectives')}
        onBlur={() => handleBlur('objectives')}
      />
      <Flex direction={isMobile ? 'column' : 'row'} mb="md">
        <TextInput
          w="100%"
          label="Proposal Link"
          required
          mb={isMobile ? 'md' : undefined}
          leftSection={<IconExternalLink />}
          placeholder={'https://your-proposal.com'}
          {...form.getInputProps('proposalLink')}
          onBlur={() => handleBlur('proposalLink')}
          mr={'md'}
        />
        <TextInput
          w="100%"
          label="Additional Link"
          leftSection={<IconExternalLink />}
          placeholder="https://more-info.com"
          {...form.getInputProps('extraLink')}
          onBlur={() => handleBlur('extraLink')}
        />
      </Flex>
      <Textarea
        w="100%"
        mb="md"
        label="Additional Information"
        autosize
        minRows={4}
        maxRows={8}
        placeholder="Anything else you would like to add?"
        {...form.getInputProps('extraInfo')}
        onBlur={() => handleBlur('extraInfo')}
      />
      <Flex mt="md" justify="flex-end">
        <Button ml="auto" type="submit">
          Finish Application
        </Button>
      </Flex>
    </MainSection>
  );
};
