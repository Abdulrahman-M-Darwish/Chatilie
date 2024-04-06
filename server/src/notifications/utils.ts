import { NotificationType } from './entities/notification.entity';

export const makeNotificationMessage = (type: NotificationType) => {
  switch (type) {
    case NotificationType.FRIEND_REQUEST:
      return 'Is Asking For A Friendship';
    case NotificationType.FRIEND_ACCEPTED:
      return 'Accepted your Friendship Go Chat/Lie';
    case NotificationType.POST_LIKED:
      return 'Liked Your Post';
  }
};
