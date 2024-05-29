import { getBuiltGraphSDK } from '../.graphclient';

export const getRecordsByTag = async (tag: string) => {
  const { getRecordsByTag } = getBuiltGraphSDK();

  const res = await getRecordsByTag({ tag: tag });

  console.log(res.Record);
};
