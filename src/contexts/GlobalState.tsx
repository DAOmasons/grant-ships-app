import { useQuery } from '@tanstack/react-query';
import { createContext } from 'react';
import { GameManager, getGameManger } from '../queries/getGameManger';
import { useAccount } from 'wagmi';
import { UserData, getUserData } from '../queries/getUserData';
import { ADDR } from '../constants/addresses';
import { VoteData, getGsVoting } from '../queries/getGsVoting';
import { Address } from 'viem';

type GlobalStateContext = {
  gameManager?: GameManager;
  isLoadingGameManager: boolean;
  gameManagerError: Error | null;
  refetchGameManager: () => void;
  userData?: UserData;
  isLoadingUserData: boolean;
  userDataError: Error | null;
  refetchUserData: () => void;
  gsVotes?: VoteData;
  isLoadingVotes: boolean;
  votesError: Error | null;
  refetchVotes: () => void;
};

export const GlobalContext = createContext<GlobalStateContext>({
  gameManager: undefined,
  isLoadingGameManager: false,
  gameManagerError: null,
  userData: undefined,
  isLoadingUserData: false,
  userDataError: null,
  refetchUserData: () => {},
  refetchGameManager: () => {},
  gsVotes: undefined,
  isLoadingVotes: false,
  votesError: null,
  refetchVotes: () => {},
});

export const GlobalStateProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { address } = useAccount();

  const {
    data: gameManager,
    isLoading: isLoadingGameManager,
    error: gameManagerError,
    refetch: refetchGameManager,
  } = useQuery({ queryKey: ['game-manager-state'], queryFn: getGameManger });

  const {
    data: userState,
    isLoading: isLoadingUserState,
    error: userStateError,
    refetch: refetchUserState,
  } = useQuery({
    queryKey: [`user-state-${address}`],
    queryFn: () => getUserData(address as string),
    enabled: !!address,
  });

  const {
    data: gsVotes,
    isLoading: isLoadingVotes,
    error: votesError,
    refetch: refetchVotes,
  } = useQuery({
    queryKey: ['gsVoting', ADDR.VOTE_CONTEST, address],
    queryFn: () =>
      getGsVoting({
        contestId: ADDR.VOTE_CONTEST,
        userAddress: address as Address,
      }),
    enabled: !!address,
  });

  return (
    <GlobalContext.Provider
      value={{
        gameManager: (gameManager as GameManager) || null,
        isLoadingGameManager,
        gameManagerError,
        userData: userState,
        isLoadingUserData: isLoadingUserState,
        userDataError: userStateError,
        refetchUserData: refetchUserState,
        refetchGameManager,
        gsVotes,
        isLoadingVotes,
        votesError,
        refetchVotes,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
