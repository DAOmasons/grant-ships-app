import { TxStates } from '../types/common';

export const txModalTitles: Record<TxStates, string> = {
  [TxStates.Idle]: 'Transaction Idle',
  [TxStates.Pinning]: 'Pinning to Metadata IPFS',
  [TxStates.Signing]: 'Signing Transaction',
  [TxStates.Validating]: 'Validating Transaction',
  [TxStates.Syncing]: 'Syncing Data to Subgraph',
  [TxStates.Success]: 'Transaction Successful',
  [TxStates.Error]: 'Transaction Error',
  [TxStates.SyncError]: 'Sync Error',
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

export const generateTxModalTitles = (
  state: TxStates,
  customTitles: Record<TxStates, string>
): string => {
  const overriteCustom = { ...txModalTitles, ...customTitles };
  return overriteCustom[state];
};
