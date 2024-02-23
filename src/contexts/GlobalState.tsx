import { useQuery } from '@tanstack/react-query';
import { createContext } from 'react';
import { GameManager, getGameManger } from '../queries/getGameManger';
import { useAccount } from 'wagmi';
import { UserData, getUserData } from '../queries/getUserData';

type GlobalStateContext = {
  gameManager?: GameManager;
  isLoadingGameManager: boolean;
  gameManagerError: Error | null;
  userData?: UserData;
  isLoadingUserData: boolean;
  userDataError: Error | null;
};

export const GlobalContext = createContext<GlobalStateContext>({
  gameManager: undefined,
  isLoadingGameManager: false,
  gameManagerError: null,
  userData: undefined,
  isLoadingUserData: false,
  userDataError: null,
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
  } = useQuery({ queryKey: ['game-manager-state'], queryFn: getGameManger });

  const {
    data: userState,
    isLoading: isLoadingUserState,
    error: userStateError,
  } = useQuery({
    queryKey: [`user-state-${address}`],
    queryFn: () => getUserData(address as string),
    enabled: !!address,
  });

  console.log('userState', userState);

  return (
    <GlobalContext.Provider
      value={{
        gameManager: (gameManager as GameManager) || null,
        isLoadingGameManager,
        gameManagerError,
        userData: userState,
        isLoadingUserData: isLoadingUserState,
        userDataError: userStateError,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
