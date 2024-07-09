import { createContext, ReactNode } from 'react';
import { fetchGsVoting, VoteData } from '../queries/getGsVoting';
import { Address } from 'viem';
import { useAccount } from 'wagmi';
import { useQuery } from '@tanstack/react-query';
import { ADDR } from '../constants/addresses';

type VoteContextType = {
  gsVotes?: VoteData;
  isLoadingVotes: boolean;
  votesError: Error | null;
  refetchVotes: () => void;
};

export const VoteContext = createContext<VoteContextType>({
  gsVotes: undefined,
  isLoadingVotes: false,
  votesError: null,
  refetchVotes: () => {},
});

export const VoteProvider = ({
  children,
  contestAddress,
}: {
  children: ReactNode;
  contestAddress: Address;
}) => {
  const { address } = useAccount();

  const {
    data: gsVotes,
    isLoading: isLoadingVotes,
    error: votesError,
    refetch: refetchVotes,
  } = useQuery({
    queryKey: ['gsVoting', ADDR.VOTE_CONTEST, address],
    queryFn: () =>
      fetchGsVoting({
        contestId: contestAddress,
        userAddress: address as string | undefined,
      }),
  });

  return (
    <VoteContext.Provider
      value={{
        gsVotes,
        isLoadingVotes,
        votesError,
        refetchVotes,
      }}
    >
      {children}
    </VoteContext.Provider>
  );
};
