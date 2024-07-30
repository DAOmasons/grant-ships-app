import { formatEther } from 'viem';
import { useGrant } from '../../hooks/useGrant';
import { InsetUpdate } from './InsetUpdate';
import { IconLock } from '@tabler/icons-react';
import { Text } from '@mantine/core';
import { Bold } from '../Typography';
import { GAME_TOKEN } from '../../constants/gameSetup';

export const AllocationComplete = ({ timestamp }: { timestamp: number }) => {
  const { ship, grant, project } = useGrant();
  const amount = grant?.currentApplication?.amount
    ? formatEther(grant.currentApplication.amount)
    : 0;
  return (
    <InsetUpdate
      posterName={'Facilitator Crew'}
      tagline=" has approved the grant."
      symbolUI={<IconLock size={20} />}
      timestamp={timestamp}
      bodyUI={
        <Text fz="sm">
          <Bold>{ship?.name}</Bold> has allocated {amount} {GAME_TOKEN.SYMBOL}{' '}
          to <Bold>{project?.name}</Bold>. Application is now locked in.
        </Text>
      }
    />
  );
};
