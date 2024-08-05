// import { getBuiltGraphSDK } from '../.graphclient';
// import { ADDR } from '../constants/addresses';
// import { Tag } from '../constants/tags';
// import { resolvePortfolioReport } from '../resolvers/grantResolvers';

// export type PostedRecord = {
//   roundReview: string;
//   grantReviews: Record<string, string>;
//   grantDemos: Record<string, string>;
//   grantExtras: Record<string, string>;
// };

// export const getAllRecordsByTag = async (tag: string) => {
//   const { getRecordsByTag } = getBuiltGraphSDK();

//   const res = await getRecordsByTag({ tag: tag });

//   return res.Record;
// };

// export const getRecentPortfolioReport = async (
//   tag: string
// ): Promise<PostedRecord | null> => {
//   const res = await getAllRecordsByTag(tag);

//   if (!res.length) {
//     return null;
//   }

//   const resolved = await resolvePortfolioReport(res[0].mdPointer);

//   return resolved;
// };

// export const getAllShipReports = async (shipAddresses: string[]) => {
//   const promises = shipAddresses.map((shipAddress) =>
//     getRecentPortfolioReport(
//       `${Tag.ShipSubmitReport}-${ADDR.VOTE_CONTEST}-${shipAddress}`
//     )
//   );

//   const res = await Promise.all(promises);

//   return res;
// };
