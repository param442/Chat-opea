'use server';
import { db } from '@repo/database/db';

export const DeleNotitfications = async (
  FollowerId: string,
  FollowingId: string
) => {
  const existingNotification = await db.notification.findUnique({
    where: {
      userId_followerId: {
        userId: FollowerId,
        followerId: FollowingId,
      },
    },
  });
  if (existingNotification) {
    await db.notification.delete({
      where: {
        userId_followerId: {
          userId: FollowerId,
          followerId: FollowingId,
        },
      },
    });
    return {
      success: true,
      message: 'Notification delete',
    };
  }
};
