import { useQuery } from '@tanstack/react-query';
import { createContext } from 'react';
import { GameManager, getGameManger } from '../queries/getGameManger';
import { useAccount, useChainId } from 'wagmi';
import { UserData, getUserData } from '../queries/getUserData';

type GlobalStateContext = {
  gameManager?: GameManager;
  isLoadingGameManager: boolean;
  gameManagerError: Error | null;
  refetchGameManager: () => void;
  userData?: UserData;
  isLoadingUserData: boolean;
  userDataError: Error | null;
  refetchUserData: () => void;
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
  const chainId = useChainId();

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
    queryFn: () => getUserData(address as string, chainId),
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
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
