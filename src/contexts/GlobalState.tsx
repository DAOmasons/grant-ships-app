import { useQuery } from '@tanstack/react-query';
import { createContext } from 'react';
import { GameManager, getGameManger } from '../queries/getGameManger';
import { useAccount } from 'wagmi';
import { UserData, getUserData } from '../queries/getUserData';
import { ADDR } from '../constants/addresses';
import { getGsVoting } from '../queries/getGsVoting';
import { Address } from 'viem';

type GlobalStateContext = {
  gameManager?: GameManager;
  isLoadingGameManager: boolean;
  gameManagerError: Error | null;
  userData?: UserData;
  isLoadingUserData: boolean;
  userDataError: Error | null;
  refetchUserData: () => void;
  refetchGameManager: () => void;
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
    data: gsVoting,
    isLoading: isLoadingGsVote,
    error: gsVotingError,
  } = useQuery({
    queryKey: ['gsVoting', ADDR.VOTE_CONTEST, address],
    queryFn: () =>
      getGsVoting({
        contestId: ADDR.VOTE_CONTEST,
        userAddress: address as Address,
      }),
    enabled: !!address,
  });

  console.log('gsVoting', gsVoting);

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
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
