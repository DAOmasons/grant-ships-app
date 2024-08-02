import { ComponentProps } from 'react';
import { UserUpdate } from './UserUpdate';

export const BeaconMessage = (props: ComponentProps<typeof UserUpdate>) => {
  return <UserUpdate {...props} />;
};
