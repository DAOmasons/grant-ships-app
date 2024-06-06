import { getBuiltGraphSDK, getVotersQuery } from '../.graphclient';
import { voteReasonsSchema } from '../components/forms/validationSchemas/votingFormSchema';
import { getIpfsJson } from '../utils/ipfs/get';

export type GsVote = {
  id: string;
  amount: string;
  choice: {
    id: string;
  };
  isRetractVote: boolean;
  mdPointer: string;
  mdProtocol: number;
  reason: string | null;
};

export type GsVoter = {
  id: string;
  votes: GsVote[];
};

export const resolveVote = async (res: getVotersQuery) => {
  const resolvedVoters = await Promise.all(
    res.GSVoter.map(async (voter) => {
      const resolvedVotes = await Promise.all(
        voter.votes.map(async (vote) => {
          const ipfsRes = await getIpfsJson(vote.mdPointer);

          const validated = voteReasonsSchema.safeParse(ipfsRes);

          if (!validated.success) {
            console.error('Invalid metadata', validated.error);
            return null;
          }

          return { ...vote, reason: validated.data.voteReason } as GsVote;
        })
      );

      return { ...voter, votes: resolvedVotes } as GsVoter;
    })
  );

  return resolvedVoters as GsVoter[];
};

export const getContestVoters = async (contestId: string) => {
  const { getVoters } = getBuiltGraphSDK();

  const res = await getVoters({ contestId: contestId });
  const resolved = await resolveVote(res);

  return resolved;
};
