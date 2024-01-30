import React from 'react';
import { TXContext } from '../contexts/TxContext';

export const useTx = () => {
  const context = React.useContext(TXContext);

  if (context === undefined) {
    throw new Error('useTx must be used within a TxProvider');
  }

  return context;
};
