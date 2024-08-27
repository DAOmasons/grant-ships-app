import { getBuiltGraphSDK } from '../.graphclient';

export const getLeaderboardQuery = async () => {
  try {
    const { getLeaderboard } = getBuiltGraphSDK({});

    const leaderboard = await getLeaderboard();

    return leaderboard.BadgeHolder;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
