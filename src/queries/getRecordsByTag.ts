import { getBuiltGraphSDK } from '../.graphclient';
import { Tag } from '../constants/tags';
import { resolvePortfolioReport } from '../resolvers/grantResolvers';

export const getAllRecordsByTag = async (tag: string) => {
  const { getRecordsByTag } = getBuiltGraphSDK();

  const res = await getRecordsByTag({ tag: tag });

  return res.Record;
};

export const getRecentPortfolioReport = async (tag: string) => {
  const res = await getAllRecordsByTag(tag);

  if (!res.length) {
    return undefined;
  }

  const resolved = await resolvePortfolioReport(res[0].mdPointer);

  return resolved;
};

export const getAllShipReports = async (shipAddresses: string[]) => {
  const promises = shipAddresses.map((shipAddress) =>
    getRecentPortfolioReport(`${Tag.ShipSubmitReport}-${shipAddress}`)
  );

  const res = await Promise.all(promises);

  console.log('res', res);

  return res;
};
