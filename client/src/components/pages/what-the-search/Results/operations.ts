import { gql } from '@apollo/client';

export const SEARCH = gql`
  query SEARCH($q: String!) {
    search(q: $q) {
      posts {
        id
        createdAt
        privacy
        mediaUrls
        text
        rePostedPostId
        author {
          id
          avatar
          username
          name
        }
      }
      users {
        id
        name
        username
        avatar
        profile {
          bio
        }
      }
    }
  }
`;

export const SEND_NOTIFICATIONS = gql`
  mutation SEND_NOTIFICATIONS(
    $createNotificationInput: CreateNotificationInput!
  ) {
    createNotification(createNotificationInput: $createNotificationInput) {
      id
      message
      from {
        avatar
      }
    }
  }
`;
