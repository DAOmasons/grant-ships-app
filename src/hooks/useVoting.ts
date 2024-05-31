import { useContext } from 'react';
import { GlobalContext } from '../contexts/GlobalState';
import { ContestStatus } from '../types/common';

export const useVoting = () => {
  const context = useContext(GlobalContext);

  const gsVotes = context.gsVotes || null;
  const gsContest = gsVotes?.contest || null;

  return {
    voting: gsVotes,
    isLoadingVoting: context.isLoadingVotes,
    votingError: context.votesError,
    contest: gsContest,
    userVotes: gsVotes?.userVotes,
    refetchGsVotes: context.refetchVotes,
    hasUserVoted: gsVotes?.userVotes?.length ? true : false,
    votingExists: !!gsContest,
    contestStatus: gsContest?.contest?.contestStatus
      ? (Number(gsContest.contest.contestStatus) as ContestStatus)
      : ContestStatus.None,
    isVotingActive: !!gsContest?.isVotingActive,
  };
};
