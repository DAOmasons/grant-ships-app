import { useContext, useMemo } from 'react';
import { GlobalContext } from '../contexts/GlobalState';
import { ContestStatus, VotingStage } from '../types/common';

export const useVoting = () => {
  const context = useContext(GlobalContext);

  const gsVotes = context.gsVotes || null;
  const gsContest = gsVotes?.contest || null;

  const votingStage = useMemo(() => {
    const nowInSeconds = Math.floor(Date.now() / 1000);

    // isNotActive, and not set yet
    if (!gsContest || !gsContest.isVotingActive) {
      return VotingStage.None;
    }
    // isActive, but before start time
    if (gsContest.isVotingActive && nowInSeconds < gsContest.startTime) {
      return VotingStage.Initiated;
    }
    // isActive, and within time range
    if (
      gsContest.isVotingActive &&
      nowInSeconds >= gsContest.startTime &&
      nowInSeconds <= gsContest.endTime
    ) {
      return VotingStage.Active;
    }
    // isActive, but after end time
    if (gsContest.isVotingActive && nowInSeconds > gsContest.endTime) {
      return VotingStage.Closed;
    }
    // isNotActive, but after end time
    if (!gsContest.isVotingActive && nowInSeconds > gsContest.endTime) {
      return VotingStage.Finalized;
    }
    return VotingStage.Unknown;
  }, [gsContest]);

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
    votingStage,
  };
};
