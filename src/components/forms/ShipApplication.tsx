import { useForm } from '@mantine/form';
import { ProfileData } from '../../pages/CreateShip';
import { useAccount } from 'wagmi';
import { Flex, Stack, Text, TextInput, Textarea, em } from '@mantine/core';
import { IconExternalLink } from '@tabler/icons-react';
import { useMediaQuery } from '@mantine/hooks';

export const ShipApplication = ({
  profileData,
}: {
  profileData?: ProfileData;
}) => {
  const { address } = useAccount();
  const isMobile = useMediaQuery(`(max-width: ${em(750)})`);

  const form = useForm({
    initialValues: {
      avatarHash: '',
      name: '',
      teamMembers: [''],
      mission: '',
      email: '',
      x: '',
      github: '',
      discord: '',
      telegram: '',
      website: '',
    },
    // validate: zodResolver(registerShipSchema),
  });
  const handleBlur = (fieldName: string) => {
    form.validateField(fieldName);
  };
  return (
    <form>
      <Stack maw={600} miw={300} w={'100%'} mt="xl">
        <Text fw={600}>{profileData?.name || 'Should Not See This'}</Text>
        <Textarea
          w="100%"
          inputWrapperOrder={['label', 'input', 'description', 'error']}
          label="Impact Thesis"
          description="How will your Grant Ship drive impact within the Arbitrum Ecosystem? How will this address Arbitrum's Strategic Initiatives?"
          required
          autosize
          minRows={4}
          maxRows={8}
          placeholder="What is your Ship's funding mission?"
          {...form.getInputProps('thesis')}
          onBlur={() => handleBlur('thesis')}
        />
        <Textarea
          w="100%"
          inputWrapperOrder={['label', 'input', 'description', 'error']}
          label="Submission Guidelines"
          description="What guidelines will you expect grant recipients to follow?"
          required
          autosize
          minRows={4}
          maxRows={8}
          placeholder="What is your Ship's funding mission?"
          {...form.getInputProps('guidelines')}
          onBlur={() => handleBlur('guidelines')}
        />
        <Flex direction={isMobile ? 'column' : 'row'}>
          <TextInput
            w="100%"
            label="Management Fee"
            required
            placeholder="Percentage (%)"
            {...form.getInputProps('fee')}
            onBlur={() => handleBlur('fee')}
            mr={'md'}
          />
          <TextInput
            w="100%"
            label="Additional Link"
            placeholder="https://more-info.com"
            leftSection={<IconExternalLink />}
            {...form.getInputProps('extraLink')}
            onBlur={() => handleBlur('extraLink')}
          />
        </Flex>
        <Textarea
          w="100%"
          label="Additional Information"
          autosize
          minRows={4}
          maxRows={8}
          placeholder="Additional Information"
          {...form.getInputProps('extraInfo')}
          onBlur={() => handleBlur('extraInfo')}
        />
      </Stack>
    </form>
  );
};
