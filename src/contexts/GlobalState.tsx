import { useQuery } from '@tanstack/react-query';
import { createContext } from 'react';

type GlobalStateContext = {
  gameState?: any;
  isLoadingGameState: boolean;
  gameStateError: Error | null;
};

export const GlobalContext = createContext<GlobalStateContext>({
  gameState: undefined,
  isLoadingGameState: false,
  gameStateError: null,
});

export const GlobalStateProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const {
    data: gameState,
    isLoading: isLoadingGameState,
    error: gameStateError,
  } = useQuery({ queryKey: ['game-manager-state'], queryFn: () => {} });

  return (
    <GlobalContext.Provider
      value={{
        gameState,
        isLoadingGameState,
        gameStateError,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
