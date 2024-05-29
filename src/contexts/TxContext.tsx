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
  TimeoutState,
} from '../components/modals/txModal/txModalStates';
import { Box, Button, Modal } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { pollSubgraph } from '../queries/getRecentTransaction';

type WriteContractParams = Parameters<
  ReturnType<typeof useWriteContract>['writeContract']
>[0];
type WriteContractOptions = Parameters<
  ReturnType<typeof useWriteContract>['writeContract']
>[1] & {
  onPollSuccess?: () => void;
  onPollError?: () => void;
  onPollTimeout?: () => void;
};

enum PollStatus {
  Idle,
  Polling,
  Error,
  Success,
  Timeout,
}

type ViewParams = {
  awaitGraphPoll?: boolean;
  awaitEnvioPoll?: boolean;
  loading?: {
    title?: string;
    description?: string;
  };
  polling?: {
    title?: string;
    description?: string;
  };
  success?: {
    title?: string;
    description?: string;
    shouldCloseAfterButton?: boolean;
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
    writeContractOptions?: WriteContractOptions;
    viewParams?: ViewParams;
    onComplete?: () => void;
    onError?: (error: WriteContractErrorType) => void;
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
  isModalOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
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
    isError: waitError,
    data: txData,
  } = useWaitForTransactionReceipt({
    hash: hash,
  });

  const [opened, { open, close }] = useDisclosure(false);
  const [viewParams, setViewParams] = useState<ViewParams | undefined>(
    undefined
  );
  const [pollStatus, setPollStatus] = useState(PollStatus.Idle);

  const clearTx = useCallback(() => {
    reset();
    setViewParams(undefined);
  }, [reset, setViewParams]);

  const tx = ({
    viewParams,
    writeContractParams,
    writeContractOptions,
    onComplete,
    onError,
  }: {
    writeContractParams: WriteContractParams;
    writeContractOptions?: WriteContractOptions;
    viewParams?: ViewParams;
    onError?: (error: WriteContractErrorType) => void;
    onComplete?: () => void;
  }) => {
    open();
    writeContract(writeContractParams, {
      ...writeContractOptions,
      onSuccess: (data, variables, context) => {
        writeContractOptions?.onSuccess?.(data, variables, context);
        if (viewParams?.awaitGraphPoll !== false && data) {
          setPollStatus(PollStatus.Polling);
          pollSubgraph({
            txHash: data,
            onPollSuccess: () => {
              writeContractOptions?.onPollSuccess?.();
              setPollStatus(PollStatus.Success);
              onComplete?.();
            },
            onPollError: () => {
              writeContractOptions?.onPollError?.();
              setPollStatus(PollStatus.Error);
            },
            onPollTimeout: () => {
              writeContractOptions?.onPollTimeout?.();
              setPollStatus(PollStatus.Timeout);
            },
          });
        } else if (viewParams?.awaitEnvioPoll !== false && data) {
        } else {
          onComplete?.();
        }
      },
      onError: (error, variables, context) => {
        console.error('error', error);
        onError?.(error as WriteContractErrorType);
        writeContractOptions?.onError?.(error, variables, context);
      },
    });
    setViewParams(viewParams);
  };

  const handleClose = useCallback(() => {
    clearTx();
    close();
    setPollStatus(PollStatus.Idle);
  }, [clearTx, close]);

  const shouldWaitForPoll =
    viewParams?.awaitGraphPoll !== false && pollStatus === PollStatus.Polling;

  const txModalContent = useMemo(() => {
    if (isConfirming || isAwaitingSignature || shouldWaitForPoll) {
      const validateTitle =
        viewParams?.loading?.title || 'Validating Transaction';
      const validateDescription =
        viewParams?.loading?.description || 'Please wait...';
      const pollTitle = viewParams?.polling?.title || 'Polling Subgraph';
      const pollDescription =
        viewParams?.polling?.description ||
        'Transaction successful! Indexing data to the subgraph...';

      const title = shouldWaitForPoll ? pollTitle : validateTitle;
      const description = shouldWaitForPoll
        ? pollDescription
        : validateDescription;

      return (
        <LoadingState title={title} description={description} txHash={hash} />
      );
    }

    if (isError || waitError) {
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

    if (pollStatus === PollStatus.Timeout) {
      return <TimeoutState txHash={hash} />;
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
                <Button
                  onClick={() => {
                    handleClose();
                    viewParams?.successButton?.onClick?.();
                  }}
                  w="65%"
                >
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
  }, [
    isConfirmed,
    waitError,
    isConfirming,
    isAwaitingSignature,
    isError,
    hash,
    viewParams,
    error,
    handleClose,
    shouldWaitForPoll,
    pollStatus,
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
        error: error as WriteContractErrorType | null,
        isAwaitingSignature,
        isModalOpen: opened,
        openModal: open,
        closeModal: handleClose,
      }}
    >
      {children}
      <Modal opened={opened} onClose={handleClose} centered>
        {txModalContent}
      </Modal>
    </TXContext.Provider>
  );
};
