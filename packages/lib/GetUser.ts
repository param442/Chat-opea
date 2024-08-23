"use server";

import z from "zod";
import { db } from "@repo/database/db";
export const getUserbyEmail = async (email: string) => {
  try {
    const ValidateEmail = z.string().email().safeParse(email);
    if (!ValidateEmail.success) {
      return null;
    }
    const user = await db.user.findUnique({
      where: { email: ValidateEmail.data },
    });
    return user;
  } catch (error) {
    return null;
  }
};
export const getUserbyId = async (Id: string) => {
  try {
    const user = await db.user.findUnique({
      where: {
        id: Id,
      },
    });

    if (!user) {
      return null;
    }

    return user;
  } catch (error) {
    return null;
  }
};
export const getUserbyId_CheckIfFollowing = async (
  FollowerId: string,
  FollowingId: string
) => {
  try {
    const data = await db.userFollower.findFirst({
      where: {
        followingId: FollowingId,
        followerId: FollowerId,
      },
    });

    const user = await db.user.findUnique({
      where: {
        id: FollowingId,
      },
    });

    if (!user) {
      return null;
    }
    if (!data) {
      return { user, Boolean: false };
    } else {
      return { user, Boolean: true };
    }
  } catch (error) {
    return null;
  }
};
export const getUserbyIdWithFollowing_Followers = async (Id: string) => {
  try {
    const id = Id.trim();

    const user = await db.user.findUnique({
      where: {
        id,
      },
      include: {
        followers: true,
        following: true,
      },
    });

    if (!user) {
      return null;
    }

    return user;
  } catch (error) {
    return null;
  }
};
export const GetAccountByUserID = async (userId: string) => {
  try {
    const Account = await db.account.findFirst({
      where: { userId: userId },
    });
    return Account;
  } catch (error) {
    return null;
  }
};

export const GetUserFollowing = async (userId: string) => {
  if (!userId) {
    console.error("Invalid userId provided");
    return { error: "Invalid userId" };
  }
  try {
    const Followers = await db.userFollower.findMany({
      where: {
        followerId: userId,
      },
      include: {
        following: true,
      },
    });
    if (!Followers) {
      console.error("No followers found");
      return { error: "No followers found" };
    }
    const plainFollowers = Followers.map((follow) => ({
      id: follow.following.id,
      name: follow.following.name,
      email: follow.following.email,
      Image: follow.following.image,
      // Include other fields as needed
    }));

    if (plainFollowers.length === 0) {
      console.error("No followers found");
      return { followers: plainFollowers, message: "No followers found" };
    }

    return { followers: plainFollowers };
  } catch (error) {
    console.error("Error fetching users followed by user:", error);
    return { error: error };
  }
};

export const GetUserFollowers = async (userId: string) => {
  if (!userId) {
    console.error("Invalid userId provided");
    return { error: "Invalid userId" };
  }

  try {
    const followers = await db.userFollower.findMany({
      where: {
        followingId: userId,
      },
      include: {
        following: true,
      },
    });

    // Check if followers data is retrieved correctly
    if (!followers) {
      console.error("No followers found");
      return { error: "No followers found" };
    }

    const plainFollowers = followers.map((follow) => ({
      id: follow.following.id,
      name: follow.following.name,
      email: follow.following.email,
      // Include other fields as needed
    }));

    // Check if any followers are found
    if (plainFollowers.length === 0) {
      console.error("No followers found");
      return { followers: plainFollowers, message: "No followers found" };
    }

    return { followers: plainFollowers };
  } catch (error) {
    console.error("Error fetching users followed by user:", error);
    return { error: error };
  }
};

export const GetUsersNotification = async (userId: string) => {
  try {
    const data = await db.notification.findMany({
      where: {
        userId: userId,
      },
    });
    return data;
  } catch (error) {
    return null;
  }
};
