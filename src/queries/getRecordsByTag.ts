import { getBuiltGraphSDK } from '../.graphclient';
import { resolvePortfolioReport } from '../resolvers/grantResolvers';

export const getAllRecordsByTag = async (tag: string) => {
  const { getRecordsByTag } = getBuiltGraphSDK();

  const res = await getRecordsByTag({ tag: tag });

  return res.Record;
};

export const getRecentPortfolioReport = async (tag: string) => {
  const res = await getAllRecordsByTag(tag);

  const resolved = await resolvePortfolioReport(res[0].mdPointer);

  return resolved;
};
