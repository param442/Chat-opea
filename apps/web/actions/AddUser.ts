'use server';

import { db } from '@repo/database/db';
import { getUserbyId } from '@repo/lib/GetUser';

export const AddUser = async (
  FollowerId: string,
  FollowingId: string,
  type: 'Follow' | 'FollowBack' = 'Follow'
) => {
  try {
    // Prevent users from following themselves
    if (FollowerId === FollowingId) {
      return { success: false, message: 'The user cannot follow themselves' };
    }
    const user = await getUserbyId(FollowerId);
    if (!user) {
      return { error: 'You are not authorized' };
    }
    console.log(FollowingId);

    const existingFollow = await db.userFollower.findUnique({
      where: {
        followerId_followingId: {
          followerId: FollowerId,
          followingId: FollowingId,
        },
      },
    });
    if (existingFollow) {
      return {
        success: true,
        message: 'You are already following this user',
      };
    }
    // Use Prisma's transaction feature for atomicity
    await db.$transaction(async (prisma) => {
      // Create a follow relationship
      await prisma.userFollower.create({
        data: {
          followerId: FollowerId,
          followingId: FollowingId,
        },
      });

      if (type === 'Follow' || type === 'FollowBack') {
        // Create or update a notification
        await prisma.notification.create({
          data: {
            userId: FollowingId,
            type: type,
            content: `User ${type === 'FollowBack' ? 'followed you back' : 'followed you'}`,
            followerName: user.name,
            followerImage: user.image || 'default-image-url', // Ensure a default image or handle null case
            followerId: user.id,
          },
        });
      }
    });
    return { success: true, message: 'User has been added successfully' };
  } catch (error) {
    console.error('Error during transaction:', error);
    return {
      success: false,
      message: 'Something went wrong, please try again',
    };
  }
};
