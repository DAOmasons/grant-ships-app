import React, { ReactNode, useCallback, useMemo, useState } from 'react';
import {
  WaitForTransactionReceiptErrorType,
  WriteContractErrorType,
} from 'viem';
import { Config, useWaitForTransactionReceipt, useWriteContract } from 'wagmi';
import { WriteContractMutate } from 'wagmi/query';
import {
  ErrorState,
  LoadingState,
  SuccessState,
} from '../components/modals/txModal/txModalStates';
import { Button, Modal } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

type WriteContractParams = Parameters<
  ReturnType<typeof useWriteContract>['writeContract']
>[0];
type WriteContractOptions = Parameters<
  ReturnType<typeof useWriteContract>['writeContract']
>[1];

type ViewParams = {
  loading?: {
    title?: string;
    description?: string;
  };
  success?: {
    title?: string;
    description?: string;
  };
  error?: {
    title?: string;
    fallback?: string;
  };
  successButton?: {
    label: string;
    onClick: () => void;
  };
};

type TxContextType = {
  tx: (params: {
    writeContractParams: WriteContractParams;
    viewParams?: ViewParams;
  }) => void;
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

  const [opened, { open, close }] = useDisclosure(false);
  const [viewParams, setViewParams] = useState<ViewParams | undefined>(
    undefined
  );

  const clearTx = useCallback(() => {
    reset();
    setViewParams(undefined);
  }, [reset, setViewParams]);

  const tx = ({
    viewParams,
    writeContractParams,
    writeContractOptions,
  }: {
    writeContractParams: WriteContractParams;
    writeContractOptions?: WriteContractOptions;
    viewParams?: ViewParams;
  }) => {
    open();
    writeContract(writeContractParams, writeContractOptions);
    setViewParams(viewParams);
  };

  const handleClose = useCallback(() => {
    clearTx();
    close();
  }, [clearTx, close]);

  const txModalContent = useMemo(() => {
    if (isConfirming || isAwaitingSignature) {
      return (
        <LoadingState
          title={viewParams?.loading?.title || 'Validating Transaction'}
          description={viewParams?.loading?.description || 'Please wait...'}
          txHash={hash}
        />
      );
    }

    if (isConfirmed) {
      return (
        <SuccessState
          title={viewParams?.success?.title || 'Transaction Successful!'}
          description={
            viewParams?.success?.description ||
            'You did it! Your transaction was successfully confirmed onchain.'
          }
          ctaElement={
            <>
              {viewParams?.successButton ? (
                <Button onClick={viewParams?.successButton.onClick} w="65%">
                  {viewParams?.successButton.label}
                </Button>
              ) : (
                <Button onClick={handleClose} w="65%">
                  Close
                </Button>
              )}
            </>
          }
          txHash={hash}
        />
      );
    }

    if (isError) {
      return (
        <ErrorState
          title={viewParams?.error?.title || 'Something went wrong.'}
          description={
            error?.message ||
            viewParams?.error?.fallback ||
            'Error message unknown.'
          }
          txHash={hash}
        />
      );
    }
  }, [
    isConfirmed,
    isConfirming,
    isAwaitingSignature,
    isError,
    hash,
    viewParams,
    error,
    handleClose,
  ]);

  return (
    <TXContext.Provider
      value={{
        tx,
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
      <Modal opened={opened} onClose={handleClose} centered>
        {txModalContent}
      </Modal>
    </TXContext.Provider>
  );
};
