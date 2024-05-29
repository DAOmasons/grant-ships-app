import { getBuiltGraphSDK } from '../.graphclient';
import { SUBGRAPH_URL } from '../constants/gameSetup';

const { getRecentTransaction } = getBuiltGraphSDK({
  apiEndpoint: SUBGRAPH_URL,
});

const { getRecentEnvio } = getBuiltGraphSDK();

export const fetchRecentTransaction = async (txHash: string) => {
  const res = await getRecentTransaction({ txHash });

  return res?.transaction?.id;
};

export const fetchRecentEnvio = async (
  txHash: string
): Promise<string | undefined> => {
  const res = await getRecentEnvio({ txHash });

  return res?.EnvioTX?.[0]?.id;
};

type PollSubgraphParams = {
  txHash: string;
  interval?: number;
  tries?: number;
  onPollSuccess?: (txHash: string) => void;
  onPollError?: (error: Error) => void;
  onPollTimeout?: () => void;
};

export const pollSubgraph = async ({
  txHash,
  interval = 3000,
  tries = 10,
  onPollSuccess,
  onPollError,
  onPollTimeout,
}: PollSubgraphParams) => {
  let triesCount = 0;

  const checkRecentTransaction = async () => {
    try {
      const txHashFromGraph = await fetchRecentTransaction(txHash);
      console.log('Given transaction hash (from client): ', txHash);
      console.log(
        'Queried transaction hash (undefined means not yet indexed): ',
        txHashFromGraph
      );
      console.log('Polling attempt:', triesCount + 1);

      if (txHashFromGraph && txHashFromGraph === txHash) {
        console.log('Poll Success!');
        console.log('Transaction has been indexed by the subgraph');
        onPollSuccess?.(txHashFromGraph);
        clearInterval(intervalId);
      } else {
        console.log('Polling again in', interval, 'ms');
        triesCount++;
        if (triesCount >= tries) {
          console.log('Poll Timeout!');
          onPollTimeout?.();
          clearInterval(intervalId);
        }
      }
    } catch (error: any) {
      console.log('Poll Error!');
      console.error(error);
      onPollError?.(error);
      clearInterval(intervalId);
    }
  };
  const intervalId = setInterval(checkRecentTransaction, interval);

  return triesCount;
};

export const pollEnvio = async ({
  txHash,
  interval = 500,
  tries = 20,
  onPollSuccess,
  onPollError,
  onPollTimeout,
}: PollSubgraphParams) => {
  let triesCount = 0;

  const checkRecentTransaction = async () => {
    try {
      const txHashFromEnvio = await fetchRecentEnvio(txHash);
      console.log('Given transaction hash (from client): ', txHash);
      console.log(
        'Queried transaction hash (undefined means not yet indexed): ',
        txHashFromEnvio
      );
      console.log('Polling attempt:', triesCount + 1);

      if (txHashFromEnvio && txHashFromEnvio === txHash) {
        console.log('Poll Success!');
        console.log('Transaction has been indexed by the subgraph');
        onPollSuccess?.(txHashFromEnvio);
        clearInterval(intervalId);
      } else {
        console.log('Polling again in', interval, 'ms');
        triesCount++;
        if (triesCount >= tries) {
          console.log('Poll Timeout!');
          onPollTimeout?.();
          clearInterval(intervalId);
        }
      }
    } catch (error: any) {
      console.log('Poll Error!');
      console.error(error);
      onPollError?.(error);
      clearInterval(intervalId);
    }
  };
  const intervalId = setInterval(checkRecentTransaction, interval);

  return triesCount;
};
