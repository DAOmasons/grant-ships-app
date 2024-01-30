import React, { ReactNode } from 'react';
import {
  WaitForTransactionReceiptErrorType,
  WriteContractErrorType,
} from 'viem';
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
  txError: WaitForTransactionReceiptErrorType | null;
  error: WriteContractErrorType | null;
  txData: ReturnType<typeof useWaitForTransactionReceipt>['data'];
};

export const TXContext = React.createContext<TxContextType | undefined>(
  undefined
);

export const TxProvider = ({ children }: { children: ReactNode }) => {
  const {
    isPending: isAwaitingSignature,
    data: hash,
    writeContract,
    isError,
    reset,
    error,
    isIdle,
  } = useWriteContract();

  const {
    isSuccess: isConfirmed,
    isLoading: isConfirming,
    error: txError,
    data: txData,
  } = useWaitForTransactionReceipt({
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
        txError,
        txData,
        error: error as unknown as WriteContractErrorType | null,
        // TODO: Make sure this is the correct naming
        // this should be true if the transaction is awaiting signature
        isAwaitingSignature,
      }}
    >
      {children}
    </TXContext.Provider>
  );
};
