import { ComponentProps } from 'react';
import { UserUpdate } from './UserUpdate';
import { Text } from '@mantine/core';
import { Bold } from '../Typography';
import { useGrant } from '../../hooks/useGrant';
import { NextStep } from './NextStep';

export const BeaconMessage = (props: ComponentProps<typeof UserUpdate>) => {
  const { grantExists, grant } = useGrant();

  const grantExistsButNoApplication = grantExists && !grant?.currentApplication;
  return (
    <>
      {grantExistsButNoApplication && (
        <NextStep
          text={
            <Text fz="sm">
              Next Step: Submit an <Bold>Application</Bold> once you are ready.
            </Text>
          }
        />
      )}
      {!grantExists && (
        <NextStep
          text={
            <Text fz="sm">
              Next Step: Please submit an <Bold>Application</Bold> or
              <Bold>Send a Message</Bold> to let them know you're interested.
            </Text>
          }
        />
      )}
      <UserUpdate {...props} />
    </>
  );
};
