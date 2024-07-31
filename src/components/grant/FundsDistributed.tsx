import { formatEther } from 'viem';
import { useGrant } from '../../hooks/useGrant';
import { InsetUpdate } from './InsetUpdate';
import { IconArrowRight } from '@tabler/icons-react';
import { GAME_TOKEN } from '../../constants/gameSetup';

export const FundsDistributed = ({
  timestamp,
  amount,
}: {
  timestamp: number;
  amount: string;
}) => {
  const { ship, project } = useGrant();
  const displayAmount = amount ? formatEther(BigInt(amount)) : 0;
  return (
    <InsetUpdate
      posterName={ship?.name || ''}
      tagline={` distributed ${displayAmount} ${GAME_TOKEN.SYMBOL} to ${project?.name || ''}`}
      symbolUI={<IconArrowRight size={20} />}
      timestamp={timestamp}
    />
  );
};
