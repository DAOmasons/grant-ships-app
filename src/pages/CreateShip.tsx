import { useState } from 'react';

import { useAccount, useChainId, useWatchContractEvent } from 'wagmi';

import Registry from '../abi/Registry.json';
import { ADDR } from '../constants/addresses';
import { MainSection, PageTitle } from '../layout/Sections';
import { Button, Paper, Stepper, Text, useMantineTheme } from '@mantine/core';
import { RegisterShip } from '../components/forms/RegisterShip';
import { ShipApplication } from '../components/forms/ShipApplication';
import { useLocalStorage } from '@mantine/hooks';
import { CacheKeys } from '../components/forms/cacheKeys';
import { Link } from 'react-router-dom';

export type ProfileData = {
  anchor: string;
  name: string;
  owner: string;
  profileId: string;
};

export const CreateShip = () => {
  const { address } = useAccount();
  const chainId = useChainId();

  const [step, setStep] = useState(0);
  const [profileData, setProfileData, removeProfileStorage] = useLocalStorage<
    ProfileData | ''
  >({
    key: CacheKeys.ProfileData,
    // Initial value is an empty string.
    // Null or undefined caches as 'null' or 'undefined' in localStorage
    defaultValue: '',
  });

  useWatchContractEvent({
    abi: Registry,
    address: ADDR.REGISTRY,
    eventName: 'ProfileCreated',
    chainId,
    pollingInterval: 100,
    onError: (error) => {
      console.error('error', error);
    },
    onLogs: (logs: any) => {
      const log = logs[0];

      const owner = log?.args?.owner;
      if (owner && owner.toLowerCase() === address?.toLowerCase()) {
        const profileData = {
          anchor: log?.args?.anchor,
          name: log.args.name,
          owner: log.args.owner,
          profileId: log.args.profileId,
        };

        setProfileData(profileData);
      } else {
        console.warn(
          'Owner address does not match the entity found on the event log'
        );
      }
    },
  });

  const nextStep = () =>
    setStep((current) => (current < 2 ? current + 1 : current));

  const deleteAllCache = () => {
    removeProfileStorage();

    window.localStorage.removeItem(CacheKeys.ShipApplicationForm);
    window.localStorage.removeItem(CacheKeys.ShipProfileForm);
    setProfileData('');
  };
  const formComplete = () => {
    deleteAllCache();
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
          <RegisterShip
            nextStep={nextStep}
            profileData={profileData !== '' ? profileData : undefined}
            deleteCache={deleteAllCache}
          />
        </Stepper.Step>
        <Stepper.Step label="Second Step" description="Ship Application">
          <ShipApplication
            profileData={profileData !== '' ? profileData : undefined}
            formComplete={formComplete}
          />
        </Stepper.Step>
        <Stepper.Completed>
          <ApplicationComplete />
        </Stepper.Completed>
      </Stepper>
    </MainSection>
  );
};

const ApplicationComplete = () => {
  const { address } = useAccount();
  const theme = useMantineTheme();

  return (
    <Paper bg={theme.colors.dark[6]} mt={80} py={68} px={25}>
      <Text component="h2" fz={24} fw={700} mb={'md'} c="white">
        Grant Ship Application Submitted!
      </Text>
      <Text size="md" c={theme.colors.dark[2]} mb="sm">
        Your application has been submitted to the Game Facilitators. Review
        time is around 3-4 days. Please check back in 'Ship Applications' to see
        the results.
      </Text>
      <Button component={Link} to={`/my-projects/${address}`}>
        See Application
      </Button>
    </Paper>
  );
};
