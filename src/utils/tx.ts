import { TxStates } from '../types/common';

export const txNerdLabels: Record<TxStates, string> = {
  [TxStates.Idle]: 'Transaction idle',
  [TxStates.Pinning]: 'Pinning to metadata IPFS',
  [TxStates.Signing]: 'Requesting signature',
  [TxStates.Validating]: 'Validating transaction onchain',
  [TxStates.Syncing]: 'Syncing data to subgraph',
  [TxStates.Success]: 'Transaction successfully validated',
  [TxStates.Error]: 'Transaction error',
  [TxStates.SyncError]: 'Subgraph error',
};

export const txModalDescriptions: Record<TxStates, string> = {
  [TxStates.Idle]: 'Please wait for the transaction to begin.',
  [TxStates.Pinning]: 'Archiving Metadata data to IPFS for future reference.',
  [TxStates.Signing]: 'Awaiting user signature.',
  [TxStates.Validating]:
    'Your transaction is being validated. Please wait a few seconds.',
  [TxStates.Syncing]: 'Transaction successful! Syncing data to the subgraph.',
  [TxStates.Success]: 'Transaction and sync process complete.',
  [TxStates.Error]: 'Transaction Error',
  [TxStates.SyncError]:
    'Error Syncing data to the subgraph. However, your transaction was successfully validated. Please try reloading the app in a few minutes.',
};

export const generateTxNerdLabels = (
  state: TxStates,
  customLabels?: Record<TxStates, string>
): string => {
  if (!customLabels) {
    return txNerdLabels[state];
  }
  const overriteCustom = { ...txNerdLabels, ...customLabels };
  return overriteCustom[state];
};
