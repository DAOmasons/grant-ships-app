import React, { ReactNode, useMemo, useState } from 'react';
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
// import { writeContract } from 'viem/actions';

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
  successButton: {
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

  const clearTx = () => {
    reset();
    setViewParams(undefined);
  };

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

  const handleClose = () => {
    clearTx();
    close();
  };

  const txModalContent = useMemo(() => {
    if (isConfirming || isAwaitingSignature) {
      return (
        <LoadingState
          title="Creating Your Project Profile"
          description="Submitting your project profile to the Allo Registry."
          txHash={hash}
        />
      );
    }

    if (isConfirmed) {
      return (
        <SuccessState
          title="Project Profile Created"
          description="Your project profile has been created."
          ctaElement={
            <Button onClick={() => {}} w="65%">
              Go Find Grants
            </Button>
          }
          txHash={hash}
        />
      );
    }

    if (isError) {
      return (
        <ErrorState
          title="Something went wrong"
          description="Tells which thing failed"
          nerdDetails="State: Possibly tells you how it failed"
          txHash={hash}
        />
      );
    }
  }, [isConfirmed, isConfirming, isAwaitingSignature, isError, hash]);

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
