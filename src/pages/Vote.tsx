import { useEffect, useState } from 'react';
import { MainSection, PageTitle } from '../layout/Sections';
import { Flex, Stack, Stepper } from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import { getShipsPageData } from '../queries/getShipsPage';
import { useLaptop, useMobile, useTablet } from '../hooks/useBreakpoint';
import { useForm, zodResolver } from '@mantine/form';
import { votingSchema } from '../components/forms/validationSchemas/votingFormSchema';
import { z } from 'zod';
import { VoteAffix } from '../components/voting/VoteAffix';
import { VoteTimesIndicator } from '../components/voting/VoteTimesIndicator';
import { ShipVotingPanel } from '../components/voting/ShipVotingPanel';

export type VotingFormValues = z.infer<typeof votingSchema>;

export const Vote = () => {
  const [step, setStep] = useState(0);
  const { data: ships } = useQuery({
    queryKey: ['ships-page'],
    queryFn: getShipsPageData,
  });

  const isLaptop = useLaptop();

  const isTablet = useTablet();

  const isMobile = useMobile();

  const form = useForm({
    initialValues: {
      ships: [],
    } as VotingFormValues,
    validate: zodResolver(votingSchema),
  });

  useEffect(
    () => {
      if (!ships) return;
      const updatedShips = ships?.map((ship) => ({
        shipId: ship.id,
        shipPerc: '',
        shipComment: '',
      }));
      form.setValues((prev) => ({ ...prev, ships: updatedShips }));
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [ships]
  );

  if (!ships) {
    return null;
  }

  const nextStep = () =>
    setStep((current) => (current < 3 ? current + 1 : current));
  const prevStep = () =>
    setStep((current) => (current > 0 ? current - 1 : current));

  return (
    <Flex w="100%">
      <MainSection>
        <VoteAffix formValues={form.values} />
        <PageTitle title="Vote" />
        <Stepper
          active={step}
          maw={600}
          miw={300}
          size="xs"
          w={'100%'}
          mt={'lg'}
          mb="xl"
          onStepClick={setStep}
        >
          {ships?.map((ship, index) => (
            <Stepper.Step
              key={ship.id}
              mih={isTablet ? 36 : undefined}
              label={isMobile ? undefined : `Ship ${index + 2}`}
              style={{
                alignItems: 'center',
              }}
            >
              <ShipVotingPanel
                ship={ship}
                form={form}
                index={index}
                nextStep={nextStep}
                prevStep={prevStep}
              />
            </Stepper.Step>
          ))}
          <Stepper.Step
            label={isMobile ? undefined : 'Final'}
            mih={isTablet ? 36 : undefined}
            style={{
              alignItems: 'center',
            }}
          />
        </Stepper>
      </MainSection>
      {!isLaptop && (
        <Stack gap={'md'} mt={72} w={270}>
          <VoteTimesIndicator />
        </Stack>
      )}
    </Flex>
  );
};
