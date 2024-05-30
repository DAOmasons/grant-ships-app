import { useContext } from 'react';
import { GlobalContext } from '../contexts/GlobalState';

export const useVoting = () => {
  const context = useContext(GlobalContext);

  return {
    gsVotes: context.gsVotes,
    gsVotesLoading: context.isLoadingVotes,
    gsVotesError: context.votesError,
    refetchGsVotes: context.refetchVotes,
    hasUserVoted: context.gsVotes?.userVotes?.length ? true : false,
    votingExists: !!context.gsVotes,
  };
};
