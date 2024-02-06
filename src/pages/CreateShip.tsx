import { useEffect } from 'react';

import { useAccount, useWatchContractEvent } from 'wagmi';

import Registry from '../abi/Registry.json';
import { ADDR } from '../constants/addresses';
import { MainSection, PageTitle } from '../layout/Sections';
import { Button, Paper, Stepper, Text, useMantineTheme } from '@mantine/core';
import { RegisterShip } from '../components/forms/RegisterShip';
import { ShipApplication } from '../components/forms/ShipApplication';
import { useLocalStorage } from '@mantine/hooks';
import { CacheKeys } from '../components/forms/cacheKeys';

export type ProfileData = {
  anchor: string;
  metadata: {
    protocol: string;
    pointer: string;
  };
  name: string;
  owner: string;
  profileId: string;
};

export const CreateShip = () => {
  const { address } = useAccount();

  const [step, setStep, removeStepStorage] = useLocalStorage({
    key: CacheKeys.Step,
    defaultValue: 0,
  });
  const [profileData, setProfileData, removeProfileStorage] = useLocalStorage<
    ProfileData | undefined
  >({
    key: CacheKeys.ProfileData,
    defaultValue: undefined,
  });

  useWatchContractEvent({
    abi: Registry,
    address: ADDR.Registry,
    eventName: 'ProfileCreated',
    syncConnectedChain: true,
    pollingInterval: 100,
    onError: (error) => {
      console.log('error', error);
    },
    onLogs: (logs: any) => {
      const log = logs[0];

      const owner = log?.args?.owner;
      if (owner && owner.toLowerCase() === address?.toLowerCase()) {
        setProfileData(log.args);
      } else {
        console.warn(
          'Owner address does not match the entity found on the event log'
        );
      }
    },
  });

  const nextStep = () =>
    setStep((current) => (current < 2 ? current + 1 : current));
  const prevStep = () =>
    setStep((current) => (current > 0 ? current - 1 : current));

  const handleFinishForms = () => {
    removeProfileStorage();
    removeStepStorage();
    nextStep();
  };

  return (
    <MainSection>
      <PageTitle title="Grant Ship Application" />
      <Stepper
        active={step}
        maw={600}
        miw={300}
        w={'100%'}
        mt={'lg'}
        mb="xl"
        onStepClick={setStep}
      >
        <Stepper.Step label="First Step" description="Grant Ship Profile">
          <RegisterShip nextStep={nextStep} profileData={profileData} />
        </Stepper.Step>
        <Stepper.Step label="Second Step" description="Ship Application">
          <ShipApplication profileData={profileData} />
        </Stepper.Step>
        <Stepper.Completed>
          <ApplicationComplete removeStepStorage={removeStepStorage} />
        </Stepper.Completed>
      </Stepper>
    </MainSection>
  );
};

const ApplicationComplete = ({
  removeStepStorage,
}: {
  removeStepStorage: () => void;
}) => {
  const theme = useMantineTheme();

  useEffect(
    () => () => {
      removeStepStorage();
    },
    // I only want this to run once on unmount
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return (
    <Paper bg={theme.colors.dark[6]} mt={80} py={68} px={25}>
      <Text component="h2" fz={24} fw={700} mb={'md'} c="white">
        Grant Ship Application Submitted!
      </Text>
      <Text size="md" c={theme.colors.dark[2]} mb="sm">
        Your application has been submitted to the Game Facilitators. Review
        time is around 3-4 days. Please check back in 'My Projects' to see the
        results.
      </Text>
      <Text c={theme.colors.dark[2]} mb="xl">
        In the meantime, you can take some time to familiarize yourself with the
        rules of the game.
      </Text>
      <Button
        component="a"
        href="https://rules.grantships.fun/"
        rel="noopener noreferrer"
        target="_blank"
      >
        See Game Rules
      </Button>
    </Paper>
  );
};
