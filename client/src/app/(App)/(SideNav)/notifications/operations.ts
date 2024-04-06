import { gql } from '@apollo/client';

export const GET_NOTIFICATIONS = gql`
  query Notifications {
    notifications {
      id
      isSaw
      message
      createdAt
      updatedAt
      from {
        id
        name
        avatar
      }
    }
  }
`;

export const UPDATE_NOTIFICATION = gql`
  mutation UpdateNotification(
    $updateNotificationInput: UpdateNotificationInput!
  ) {
    updateNotification(updateNotificationInput: $updateNotificationInput) {
      id
    }
  }
`;

export const SEND_NOTIFICATION = gql`
  mutation SendNotification(
    $updateNotificationInput: UpdateNotificationInput!
  ) {
    createNotification(createNotificationInput: $createNotificationInput) {
      id
    }
  }
`;

export const MAKE_FRIEND = gql`
  mutation CreateFriend($createFriendInput: CreateFriendInput!) {
    createFriend(createFriendInput: $createFriendInput) {
      id
    }
  }
`;
