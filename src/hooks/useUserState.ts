import React from 'react';
import { GlobalContext } from '../contexts/GlobalState';

export const useUserData = () => {
  const context = React.useContext(GlobalContext);

  if (context === undefined) {
    throw new Error('useUserData must be used within a GlobalStateProvider');
  }

  return {
    userData: context.userData,
    userLoading: context.isLoadingUserData,
    userError: context.userDataError,
    refetchUser: context.refetchUserData,
  };
};
