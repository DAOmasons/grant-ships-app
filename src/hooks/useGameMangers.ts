import React from 'react';
import { GlobalContext } from '../contexts/GlobalState';

export const useGameManager = () => {
  const context = React.useContext(GlobalContext);

  if (context === undefined) {
    throw new Error('useGameManager must be used within a GlobalStateProvider');
  }

  return {
    gm: context.gameManager,
    isLoadingGm: context.isLoadingGameManager,
    gmError: context.gameManagerError,
    currentRound: context.gameManager?.currentRound,
    refetchGameManager: context.refetchGameManager,
  };
};
