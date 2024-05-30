import { Address } from 'viem';
import {
  Contest,
  GrantShipsVoting,
  ShipChoice,
  ShipVote,
  getBuiltGraphSDK,
} from '../.graphclient';

export type UserVote = Pick<
  ShipVote,
  'id' | 'choice_id' | 'mdPointer' | 'mdProtocol'
>;

export type GsVoting = Pick<
  GrantShipsVoting,
  | 'id'
  | 'endTime'
  | 'startTime'
  | 'totalVotes'
  | 'voteDuration'
  | 'voteTokenAddress'
  | 'votingCheckpoint'
> & {
  contest: Pick<
    Contest,
    | 'votesModule_id'
    | 'choicesModule_id'
    | 'pointsModule_id'
    | 'executionModule_id'
    | 'contestStatus'
  >;
} & {
  choices: Pick<
    ShipChoice,
    'active' | 'id' | 'mdPointer' | 'mdProtocol' | 'voteTally'
  >[];
};

export type VoteData = {
  votes: GsVoting | null;
  userVotes: UserVotes[] | null;
};

export const getGsVoting = async ({
  contestId,
  userAddress,
}: {
  contestId: Address;
  userAddress: Address;
}): Promise<VoteData> => {
  const { getGsVoting, getUserVotes } = getBuiltGraphSDK();

  const contestRes = await getGsVoting({ id: contestId });
  const voterRes = await getUserVotes({ contestId, voterAddress: userAddress });

  return {
    votes: (contestRes?.GrantShipsVoting?.[0] as GsVoting) || null,
    userVotes: (voterRes?.ShipVote as UserVotes[]) || null,
  };
};
