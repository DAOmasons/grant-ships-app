import React, { ReactNode } from 'react';
import { Config, useWaitForTransactionReceipt, useWriteContract } from 'wagmi';
import { WriteContractMutate } from 'wagmi/query';

type TxContextType = {
  writeContract: WriteContractMutate<Config, unknown>;
  isAwaitingSignature: boolean;
  isConfirming: boolean;
  isConfirmed: boolean;
  isError: boolean;
  txHash?: string;
  isIdle: boolean;
};

const TXContext = React.createContext<TxContextType | undefined>(undefined);

export const TxProvider = ({ children }: { children: ReactNode }) => {
  const {
    isPending: isAwaitingSignature,
    data: hash,
    writeContract,
    isError,
    reset,
    isIdle,
  } = useWriteContract();

  const { isSuccess: isConfirmed, isLoading: isConfirming } =
    useWaitForTransactionReceipt({
      hash: hash,
    });

  return (
    <TXContext.Provider
      value={{
        isConfirmed,
        isConfirming,
        txHash: hash,
        writeContract,
        isError,
        isIdle,
        // TODO: Make sure this is the correct naming
        // this should be true if the transaction is awaiting signature
        isAwaitingSignature,
      }}
    >
      {children}
    </TXContext.Provider>
  );
};

export const useTx = () => {
  const context = React.useContext(TXContext);

  if (context === undefined) {
    throw new Error('useTx must be used within a TxProvider');
  }

  return context;
};
