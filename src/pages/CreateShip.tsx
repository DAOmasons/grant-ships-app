import { useState } from 'react';

import { useAccount, useWatchContractEvent } from 'wagmi';

import Registry from '../abi/Registry.json';
import { ADDR } from '../constants/addresses';
import { MainSection, PageTitle } from '../layout/Sections';
import { Stepper } from '@mantine/core';
import { RegisterShip } from '../components/forms/RegisterShip';
import { ShipApplication } from '../components/forms/ShipApplication';

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
  const [step, setStep] = useState(0);
  const { address } = useAccount();
  const [profileData, setProfileData] = useState<ProfileData | undefined>();
  const [interval, setInterval] = useState(50);

  useWatchContractEvent({
    abi: Registry,
    address: ADDR.Registry,
    eventName: 'ProfileCreated',
    syncConnectedChain: true,
    pollingInterval: interval,
    onError: (error) => {
      console.log('error', error);
    },
    onLogs: (logs: any) => {
      const log = logs[0];

      const owner = log?.args?.owner;
      console.log('fired');
      console.log('log', log);
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

  return (
    <MainSection>
      <PageTitle title="Grant Ship Application" />
      <Stepper active={step} maw={600} miw={300} w={'100%'} mt={'lg'} mb="xl">
        <Stepper.Step label="First Step" description="Grant Ship Profile">
          <RegisterShip nextStep={nextStep} />
        </Stepper.Step>
        <Stepper.Step label="Second Step" description="Ship Application">
          <ShipApplication profileData={profileData} />
        </Stepper.Step>
      </Stepper>
    </MainSection>
  );
};
