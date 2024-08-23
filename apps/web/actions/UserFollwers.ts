'use server';

import { GetUserFollowing } from '@repo/lib/GetUser';

export const userFollowings = async (userid: string) => {
  const data = await GetUserFollowing(userid);

  return data;
};
