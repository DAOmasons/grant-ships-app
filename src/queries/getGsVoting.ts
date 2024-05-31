import { Address } from 'viem';
import {
  Contest,
  GrantShipsVoting,
  ShipChoice,
  ShipVote,
  getBuiltGraphSDK,
} from '../.graphclient';
import { bytes32toAddress } from '../utils/helpers';

export type UserVote = Pick<
  ShipVote,
  'id' | 'choice_id' | 'mdPointer' | 'mdProtocol'
>;

export type RawChoice = Pick<
  ShipChoice,
  'active' | 'id' | 'mdPointer' | 'mdProtocol' | 'voteTally'
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
  | 'isVotingActive'
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
  choices: (RawChoice & { shipId: string })[];
};

export type VoteData = {
  contest: GsVoting | null;
  userVotes: UserVote[] | null;
};

export const handleShipIds = (
  choices: RawChoice[]
): (RawChoice & { shipId: string })[] => {
  return choices.map((choice) => {
    const shipBytes32 = choice?.id?.split('-')?.[1];
    const shipId = bytes32toAddress(shipBytes32);
    return {
      ...(choice as RawChoice),
      shipId,
    };
  });
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
    contest:
      ({
        ...contestRes?.GrantShipsVoting?.[0],
        choices: handleShipIds(
          contestRes.GrantShipsVoting[0].choices as RawChoice[]
        ) as (RawChoice & { shipId: string })[],
      } as GsVoting) || null,
    userVotes: (voterRes?.ShipVote as UserVote[]) || null,
  };
};
