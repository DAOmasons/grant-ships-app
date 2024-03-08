import { getBuiltGraphSDK } from '../.graphclient';

const { getRecentTransaction } = getBuiltGraphSDK();

export const fetchRecentTransaction = async (txHash: string) => {
  const res = await getRecentTransaction({ txHash });

  return res?.transaction?.id;
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

  console.log('****POLL STARTED****');
  console.log('Polling subgraph for transaction', txHash);

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

const test = async () => {
  const res = await fetchRecentTransaction(
    '0x3b358b4c363d30c586d1e097fa4812ff59eda66051116aaf7fdee99ab92ccc6c'
  );
  console.log(res);
};

test();
