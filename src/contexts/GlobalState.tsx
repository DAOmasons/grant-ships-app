import { useQuery } from '@tanstack/react-query';
import { createContext } from 'react';
import { GameManager, getGameManger } from '../queries/getGameManger';

type GlobalStateContext = {
  gameManager?: GameManager;
  isLoadingGameManager: boolean;
  gameManagerError: Error | null;
};

export const GlobalContext = createContext<GlobalStateContext>({
  gameManager: undefined,
  isLoadingGameManager: false,
  gameManagerError: null,
});

export const GlobalStateProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const {
    data: gameManager,
    isLoading: isLoadingGameManager,
    error: gameManagerError,
  } = useQuery({ queryKey: ['game-manager-state'], queryFn: getGameManger });

  return (
    <GlobalContext.Provider
      value={{
        gameManager: (gameManager as GameManager) || null,
        isLoadingGameManager,
        gameManagerError,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
