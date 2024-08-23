import { GetUsersNotification } from '@repo/lib/GetUser';

const Fetchnotifations = async (UserId: string) => {
  try {
    const Notifications = await GetUsersNotification(UserId);
    if (!Notifications || Notifications.length === 0) {
      return {
        Notifications: null,
        message: 'You have no notifications yet',
      };
    }
    const data = Notifications.map((Notification) => {
      return {
        followerName: Notification.followerName,
        followerImage: Notification.followerImage,
        followerId: Notification.followerId,
        type: Notification.type,
        content: Notification.content,
      };
    });
    return data;
  } catch (error) {
    return { error: 'Something wnet Wrong' };
  }
};

export default Fetchnotifations;
